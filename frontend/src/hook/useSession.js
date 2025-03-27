import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  addSessionAPI,
  deleteSessionAPI,
  fetchedPaginatedSessions,
  updateSessionAPI,
} from "../api/academic-management/sessionApi.js";

export const useAddSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSessionAPI,

    onError: (error) => {
      console.log("error adding session : ", error);

      console.log(
        "❌ An error occurred while saving the session. Please try again. : ",
        error.response?.data?.message || "Failed to add session . Try again!",
      );
    },

    // ✅ Success: Invalidate and Refetch Data
    onSuccess: async (data, variables) => {
      console.log("✅ Session added successfully: ", data);
      console.log("data", data);
      console.log("variables", variables);

      toast.success(data?.message || "Session added!");
      await queryClient.invalidateQueries({ queryKey: ["sessions"] });
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

//✅  GET - method (paginated)
export const useFetchPaginatedSessions = (page) => {
  return useQuery({
    queryKey: ["sessions", page],
    queryFn: async () => await fetchedPaginatedSessions(page),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 4,
  });
};

//✅  PATCH - method
export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSessionAPI,
    onError: (error, variables) => {
      console.log("⚙️ error updating class : ", error);
      console.log("⚙️ error updating class variables : ", variables);

      if (error?.response) {
        toast(
          error.response?.data?.message ||
            "An error occurred while updating the class. Please try again.",
        );
      }

      console.log(
        "❌ An error occurred while updating the class. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update class . Try again!",
      );
    },

    onSuccess: async (data, { sessionId, payload }) => {
      console.log("🚀 update class onSuccess data value :", data);
      console.log("🚀 update  :", payload, sessionId);

      if (data?.success) {
        toast(data?.message);
      }

      await queryClient.invalidateQueries({ queryKey: ["sessions"] });
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

    onMutate: async (sessionId) => {
      console.log("⏳ [Session] Attempting to add session:", sessionId);

      await queryClient.cancelQueries({ queryKey: ["sessions"] });

      const prevSessions = queryClient.getQueryData(["sessions"]);

      console.log("🔍 Before Update (Cache Data):", prevSessions);

      queryClient.setQueryData(["sessions", sessionId], (oldData) => {
        return oldData?.filter((session) => session._id !== sessionId);
      });

      return { prevSessions };
    },

    onError: (error, _, context) => {
      console.log("Error in deleting session: ", error);

      // rollback
      if (context?.prevSessions) {
        queryClient.setQueryData(["sessions"], context.prevSessions);
      }
    },

    onSuccess: async (data) => {
      console.log("Session deleted successfully: ", data);

      await queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
