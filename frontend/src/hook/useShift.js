import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addShiftAPI,
  deleteShiftAPI,
  fetchedPaginatedShifts,
  fetchedShifts,
} from "../api/academic-management/shiftApi.js";
import toast from "react-hot-toast";
import axiosPrivate from "../utils/axiosPrivate.jsx";

//POST - method
export const useAddShifts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addShiftAPI,

    // 📝 Optimistic Update: Before API Call
    onMutate: async (variables) => {
      console.log("⏳ [Shift] Attempting to add shift:", variables);

      await queryClient.cancelQueries({ queryKey: ["shifts"] });

      const prevShifts = queryClient.getQueryData(["shifts"]);

      console.log("🔍 Before Update (Cache Data):", prevShifts);

      const afterOptimistic = queryClient.setQueryData(
        ["shifts"],
        (oldData) => {
          return [
            ...(Array.isArray(oldData) ? oldData : []),
            { ...variables, id: Date.now() }
          ];
        },
      );

      console.log("✅ After Optimistic Update (Cache Data):", afterOptimistic);

      return { prevShifts };
    },

    onError: (error, _, context) => {
      console.log("error adding session : ", error);
      // ⚙️ rollback cache
      if (context?.prevShifts) {
        queryClient.setQueryData(["shifts"], context.prevShifts);
      }

      if (error.response) {
        toast(
          error.response?.data?.message || "Failed to add session . Try again!",
        );
      }

      console.log(
        "❌ An error occurred while saving the shift. Please try again. : ",
        error.response?.data?.message || "Failed to add session . Try again!",
      );
    },

    // ✅ Success: Invalidate and Refetch Data
    onSuccess: async (data, variables) => {
      console.log("✅ Shifts added successfully: ", data);
      console.log("Shifts variables : ", variables);

      if (data?.success) {
        toast("Shifts added successfully");
      }

      await queryClient.invalidateQueries({ queryKey: ["shifts"] });
      console.log(
        "✅ After Backend Response (Cache Data): ",
        queryClient.getQueryData(["shifts"]),
      );
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shifts"] });
    },
  });
};

//without pagination
export const useFetchShifts = () => {
  return useQuery({
    queryKey: ["shifts"],
    queryFn: fetchedShifts,
    gcTime: 1000 * 60 * 10, // remove garbage collection after 10 minutes
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

//todo fade-out optimistic
// DELETE - method
export const useDeleteShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteShiftAPI,

    // 📝 Optimistic Update: Before API Call
    onMutate: async (shiftId) => {
      console.log("⏳ [Shift] Attempting to add shift:", shiftId);

      await queryClient.cancelQueries({ queryKey: ["shifts"] });

      const prevShift = queryClient.getQueryData(["shifts"]);
      console.log("🔍 Before Update (Cache Data):", prevShift);

      // const afterOptimistic = queryClient.setQueryData(
      //   ["shifts"],
      //   (oldData) => {
      //     return oldData?.filter((shift) => shift?._id !== shiftId);
      //   },
      // );

      const afterOptimistic = queryClient.setQueryData(
        ["shifts"],
        (oldData) => {
          return oldData?.map((shift) =>
            shift._id === shiftId ? { ...shift, isDeleting: true } : shift,
          );
        },
      );

      console.log("✅ After Optimistic Update (Cache Data):", afterOptimistic);
      return { prevShift, shiftId };
    },

    onError: (error, shiftId, context) => {
      console.log("error deleting shift : ", error);

      // ⚙️ rollback cache
      if (context?.prevShift) {
        queryClient.setQueryData(["shifts"], context.prevShift);
      }

      if (error?.response) {
        toast(error.response?.data?.message);
      }

      console.log(
        "❌ An error occurred while deleting the shift. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete shift . Try again!",
      );
    },

    // ✅ Success: Invalidate and Refetch Data
    onSuccess: async (data) => {
      console.log("✅ Shift deleted successfully: ", data);
      toast.success(data?.message || "Shift deleted successfully!");

      await queryClient.invalidateQueries({ queryKey: ["shifts"] });

      // queryClient.setQueryData(["shifts"], (oldData) =>
      //   oldData?.filter((shift) => shift._id !== variables),
      // );

      console.log(
        "✅ After Backend Response (Cache Data): ",
        queryClient.getQueryData(["shifts"]),
      );
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shifts"] });
      console.log(
        "✅ After Backend Response (Cache Data - onSettled): ",
        queryClient.getQueryData(["shifts"]),
      );
    },
  });
};

//with paginated
export const useFetchPaginatedShifts = (limit, skip) => {
  return useQuery({
    queryKey: ["shifts", limit, skip], // 🔑 Memoized query key
    queryFn: async () => await fetchedPaginatedShifts(limit, skip), // ⚡ Ensure function safety
    gcTime: 1000 * 60 * 10, // 🗑️ Garbage collection time (10 min)
    staleTime: 1000 * 60 * 3, // ⏳ Data remains fresh for 3 min
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

//* delete mutation

// update
//todo module structure
export const useUpdateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ shiftId, updatedData }) => {
      console.log("inside mutation session id : ", shiftId);
      const res = await axiosPrivate.patch(
        `/academic-management/shift/${shiftId}`,
        updatedData,
      );
      console.log('mutation updated', res)
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shifts"] });
    },
  });
};
