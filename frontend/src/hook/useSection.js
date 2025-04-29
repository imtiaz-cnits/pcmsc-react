import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addSectionAPI,
  deleteSectionAPI,
  fetchedPaginatedSections,
  fetchedSectionsAPI,
  updateSectionAPI,
} from "../api/academic-management/sectionAPI.js";

//POST - method
export const useAddSections = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSectionAPI,

    onError: (error) => {
      console.log("error adding section : ", error);
      // ⚙️ rollback cache

      if (error.response) {
        toast.error(
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
      await queryClient.invalidateQueries({ queryKey: ["sections"] });

      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
};

// GET - method
export const useFetchSections = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: fetchedSectionsAPI,
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

// GET - method
export const useFetchPaginatedSections = ({ page, limit, keyword }) => {
  return useQuery({
    queryKey: ["sections", { page, limit, keyword }],
    queryFn: () => fetchedPaginatedSections(page, limit, keyword),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

//✅  PATCH - method
export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSectionAPI,
    onError: (error, variables) => {
      console.log("⚙️ error updating section : ", error);
      console.log("⚙️ error updating section variables : ", variables);

      if (error?.response) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while updating the section. Please try again.",
        );
      }

      console.log(
        "❌ An error occurred while updating the section. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update section . Try again!",
      );
    },

    onSuccess: async (data, { sectionId, payload }) => {
      console.log("🚀 update section onSuccess data value :", data);
      console.log("🚀 update section payload , id  :", payload, sectionId);
      await queryClient.invalidateQueries({ queryKey: ["sections"] });

      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
};

// DELETE - method
export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSectionAPI,

    onError: (error) => {
      console.log("error deleting section : ", error);

      if (error?.response) {
        toast.error(error.response?.data?.message);
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

      await queryClient.invalidateQueries({ queryKey: ["sections"] });

      if (data?.success) {
        toast.success(data?.message);
      }

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
