import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addSessionAPI,
  deleteSessionAPI,
  fetchedEntriesSessionsAPI,
  fetchedPaginatedSessions,
  fetchSessionAPI,
  updateSessionAPI,
} from "../api/academic-management/sessionApi.js";

export const useAddSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSessionAPI,

    onError: (error) => {
      console.log("error adding session : ", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the session. Please try again.",
      );

      console.log(
        "❌ An error occurred while saving the session. Please try again. : ",
        error.response?.data?.message || "Failed to add session . Try again!",
      );
    },

    // ✅ Success: Invalidate and Refetch Data
    onSuccess: async (data) => {
      console.log("✅ Session added successfully: ", data);
      console.log("data", data);

      await queryClient.invalidateQueries({ queryKey: ["sessions"] });
      if (data?.success) {
        toast.success(data?.message);
      }
      console.log(
        "✅ After Backend Response (Cache Data): ",
        queryClient.getQueryData(["sessions"]),
      );
    },

    // 🔄 Ensure cache consistency
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

//✅  GET - method
export const useFetchSessions = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessionAPI,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

//✅  GET - method (paginated)
export const useFetchPaginatedSessions = ({ page, limit, keyword }) => {
  return useQuery({
    queryKey: ["sessions", { page, limit, keyword }],
    queryFn: async () => await fetchedPaginatedSessions(page, limit, keyword),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

//✅  GET - method (entries)
export const useFetchEntriesSessions = (limit) => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => fetchedEntriesSessionsAPI(limit),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 2,
  });
};

//✅  PATCH - method
export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSessionAPI,
    onError: (error) => {
      console.log("⚙️ error updating session : ", error);

      if (error?.response) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while updating the session. Please try again.",
        );
      }

      console.log(
        "❌ An error occurred while updating the session. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update session . Try again!",
      );
    },

    onSuccess: async (data, { sessionId, payload }) => {
      console.log("🚀 update class onSuccess data value :", data);
      console.log("🚀 update  :", payload, sessionId);

      await queryClient.invalidateQueries({ queryKey: ["sessions"] });

      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

// todo optimized
export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSessionAPI,

    onError: (error) => {
      console.log("Error in deleting session: ", error);
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

    onSuccess: async (data) => {
      console.log("Session deleted successfully: ", data);
      if (data?.success) {
        toast.success(data?.message);
      }
      await queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
