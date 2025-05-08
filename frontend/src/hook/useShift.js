import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addShiftAPI,
  deleteShiftAPI,
  fetchedPaginatedShifts,
  fetchedShiftsAPI,
  fetchShiftEntries,
  updateShiftAPI,
} from "../api/academic-management/shiftApi.js";

export const useAddShifts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addShiftAPI,

    onError: (error) => {
      console.log("error adding session : ", error);

      if (error.response) {
        toast.error(
          error.response?.data?.message || "Failed to add session . Try again!",
        );
      }

      console.log(
        "❌ An error occurred while saving the shift. Please try again. : ",
        error.response?.data?.message || "Failed to add shift . Try again!",
      );
    },

    // ✅ Success: Invalidate and Refetch Data
    onSuccess: async (data, variables) => {
      console.log("✅ Shifts added successfully: ", data);
      console.log("Shifts variables : ", variables);
      await queryClient.invalidateQueries({ queryKey: ["shifts"] });

      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shifts"] });
      console.log(
        "✅ After Backend Response (onSettled Cache Data): ",
        queryClient.getQueryData(["shifts"]),
      );
    },
  });
};

// ✅  GET  - method
export const useFetchShifts = () => {
  return useQuery({
    queryKey: ["shifts"],
    queryFn: fetchedShiftsAPI,
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

// ✅  GET - method (paginated)
export const useFetchPaginatedShifts = ({ page, limit, keyword }) => {
  return useQuery({
    queryKey: ["shifts", { page, limit, keyword }],
    queryFn: () => fetchedPaginatedShifts(page, limit, keyword),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

// GET - method
export const useFetchEntriesShifts = (limit) => {
  return useQuery({
    queryKey: ["shifts", limit],
    queryFn: () => fetchShiftEntries(limit),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

//todo module structure + optimistic
// PATCH - method
export const useUpdateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateShiftAPI,

    onError: (error) => {
      console.log("error updating shift : ", error);

      if (error?.response) {
        toast.error(error.response?.data?.message);
      }

      console.log(
        "❌ An error occurred while updating the shift. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete shift . Try again!",
      );
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["shifts"] });
      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shifts"] });
    },
  });
};

//todo optimistic opacity
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

      const afterOptimistic = queryClient.setQueryData(
        ["shifts"],
        (oldData) => {
          return oldData?.filter((shift) => shift?._id !== shiftId);
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

      await queryClient.invalidateQueries({ queryKey: ["shifts"] });
      if (data?.success) {
        toast.success(data?.message);
      }

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
