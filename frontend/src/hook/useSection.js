import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addSectionAPI,
  deleteSectionAPI,
  fetchedPaginatedSections,
} from "../api/academic-management/sectionAPI.js";
import toast from "react-hot-toast";

//POST - method
//todo optimistic opacity
export const useAddSections = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSectionAPI,

    // 📝 Optimistic Update: Before API Call
    onMutate: async (variables) => {
      console.log("⏳ [Section] Attempting to add shift:", variables);

      await queryClient.cancelQueries({ queryKey: ["sections"] });

      const prevSections = queryClient.getQueryData(["sections"]);

      console.log("🔍 Before Update (Cache Data):", prevSections);

      const afterOptimistic = queryClient.setQueryData(
        ["sections"],
        (oldData) => {
          console.log("inside optimistic old dat : ", oldData);

          return [
            ...(Array.isArray(oldData) ? oldData : []),
            { ...variables, id: Date.now() },
          ];
        },
      );

      console.log("✅ After Optimistic Update (Cache Data):", afterOptimistic);

      return { prevSections };
    },

    onError: (error, _, context) => {
      console.log("error adding section : ", error);
      // ⚙️ rollback cache
      if (context?.prevShifts) {
        queryClient.setQueryData(["sections"], context.prevSections);
      }

      if (error.response) {
        toast(
          error.response?.data?.message || "Failed to add section . Try again!",
        );
      }

      console.log(
        "❌ An error occurred while saving the section. Please try again. : ",
        error.response?.data?.message || "Failed to add section . Try again!",
      );
    },

    // ✅ Success: Invalidate and Refetch Data
    onSuccess: async (data, variables) => {
      console.log("✅ Sections added successfully: ", data);
      console.log("Sections variables : ", variables);

      if (data?.success) {
        toast("Sections added successfully");
      }

      queryClient.setQueryData(["sections"], (oldData) => {
        return [...oldData, data];
      });
      // await queryClient.invalidateQueries({ queryKey: ["shifts"] });
      console.log(
        "✅ After Backend Response (Cache Data): ",
        queryClient.getQueryData(["sections"]),
      );
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log(
        "✅ After Backend Response (onSettled Cache Data): ",
        queryClient.getQueryData(["sections"]),
      );
    },
  });
};

// GET - method
//todo optimistic opacity
export const useFetchPaginatedShifts = (page) => {
  return useQuery({
    queryKey: ["sections", page], // 🔑 Memoized query key
    queryFn: () => fetchedPaginatedSections(page), // ⚡ Ensure function safety
    gcTime: 1000 * 60 * 10, // 🗑️ Garbage collection time (10 min)
    staleTime: 1000 * 60 * 3, // ⏳ Data remains fresh for 3 min
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

// DELETE - method
//todo optimistic opacity
export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSectionAPI,

    // 📝 Optimistic Update: Before API Call
    onMutate: async (sectionId) => {
      console.log("⏳ [Section] Attempting to add section:", sectionId);

      await queryClient.cancelQueries({ queryKey: ["sections"] });

      const prevSection = queryClient.getQueryData(["sections"]);
      console.log("🔍 Before Update (Cache Data):", prevSection);

      const afterOptimistic = queryClient.setQueryData(
        ["sections"],
        (oldData) => {
          return oldData?.filter((section) => section?._id !== sectionId);
        },
      );

      // const afterOptimistic = queryClient.setQueryData(
      //   ["shifts"],
      //   (oldData) => {
      //     return oldData?.map((shift) =>
      //       shift._id === shiftId ? { ...shift, isDeleting: true } : shift,
      //     );
      //   },
      // );

      console.log("✅ After Optimistic Update (Cache Data):", afterOptimistic);
      return { prevSection, sectionId };
    },

    onError: (error, sectionId, context) => {
      console.log("error deleting section : ", error);

      // ⚙️ rollback cache
      if (context?.prevSection) {
        queryClient.setQueryData(["sections"], context.prevSection);
      }

      if (error?.response) {
        toast(error.response?.data?.message);
      }

      console.log(
        "❌ An error occurred while deleting the section. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete section . Try again!",
      );
    },

    // ✅ Success: Invalidate and Refetch Data
    onSuccess: async (data) => {
      console.log("✅ Section deleted successfully: ", data);
      toast.success(data?.message || "Section deleted successfully!");

      await queryClient.invalidateQueries({ queryKey: ["sections"] });

      // queryClient.setQueryData(["shifts"], (oldData) =>
      //   oldData?.filter((shift) => shift._id !== variables),
      // );

      console.log(
        "✅ After Backend Response (Cache Data): ",
        queryClient.getQueryData(["sections"]),
      );
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log(
        "✅ After Backend Response (Cache Data - onSettled): ",
        queryClient.getQueryData(["sections"]),
      );
    },
  });
};
