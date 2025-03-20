import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteShiftAPI,
  fetchedPaginatedShifts,
  fetchedShifts,
} from "../api/academic-management/shiftApi.js";
import shift from "../pages/Shift/Shift.jsx";
import toast from "react-hot-toast";

//without pagination
export const useFetchShifts = () => {
  return useQuery({
    queryKey: ["shifts"],
    queryFn: fetchedShifts,
    gcTime: 1000 * 60 * 10, // remove garbage collection after 10 minutes
    staleTime: 1000 * 60 * 3, // for 3 minutes stale
    // refetchInterval: 1000 * 60 * 3,
    // refetchIntervalInBackground: true,
    onError: (error) => {
      console.log(
        "Error fetching shifts",
        error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
      );
      alert(
        error.response?.data?.message ||
          "Something went wrong while fetching shifts.",
      );
    },
  });
};

//with paginated
export const useFetchPaginatedShifts = (limit = 10, skip = 0) => {
  return useQuery({
    queryKey: ["shifts", limit, skip], // 🔑 Memoized query key
    queryFn: async () => await fetchedPaginatedShifts(limit, skip), // ⚡ Ensure function safety
    gcTime: 1000 * 60 * 10, // 🗑️ Garbage collection time (10 min)
    staleTime: 1000 * 60 * 3, // ⏳ Data remains fresh for 3 min
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";

      console.error("❌ Error fetching shifts:", errorMessage); // 📌 Better logging

      alert(errorMessage); // ⚠️ Show user-friendly error alert
    },
    placeholderData: keepPreviousData,
  });
};

//! delete mutation

export const useDeleteShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteShiftAPI,
    onSuccess: (data, shiftId) => {
      toast.success("Shift deleted successfully!");

      // Optimistically update the cache
      queryClient.setQueryData(
        ["shifts"],

        (oldData) =>
          oldData ? oldData?.filter((shift) => shift._id !== shiftId) : [],
      );

      // refetch the shifts list
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
    },

    onError: (error) => {
      console.log("Error in Deleted class ", error);
      console.log(
        "Error fetching shifts",
        error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
      );
      toast.error("Failed to delete shift");
    },
  });
};
