import {
  addSessionAPI,
  deleteSessionAPI,
  fetchedPaginatedSessions,
  fetchSessionAPI,
} from "../api/academic-management/sessionApi.js";
import {
  useMutation,
  useQueryClient,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosPrivate from "../utils/axiosPrivate.jsx";

//todo twitter toast
export const useAddSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSessionAPI,

    // 📝 Optimistic Update: Before API Call
    onMutate: async (variables) => {
      console.log("⏳ [Session] Attempting to add session:", variables);

      await queryClient.cancelQueries({ queryKey: ["sessions"] });

      const previousSessions = queryClient.getQueryData(["sessions"]);

      console.log("🔍 Before Update (Cache Data):", previousSessions);

      const afterOptimistic = queryClient.setQueryData(
        ["sessions"],
        (oldData) => {
          return [...oldData, { variables, id: Date.now(), opacity: 0.5 }];
        },
      );

      console.log("✅ After Optimistic Update (Cache Data):", afterOptimistic);

      return { previousSessions };
    },

    onError: (error, _, context) => {
      console.log("error adding session : ", error);

      // ⚙️ rollback cache
      if (context?.previousSessions) {
        queryClient.setQueryData(["sessions"], context.previousSessions);
      }
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
      // await queryClient.invalidateQueries({ queryKey: ["sessions"] });
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

// to fetch
export const useFetchSessionAPI = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessionAPI,
    gcTime: 1000 * 60 * 10000,
    startTime: 1000 * 60 * 5000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};

//with paginated
export const useFetchPaginatedSession = (limit, skip) => {
  return useQuery({
    queryKey: ["sessions", limit, skip],
    queryFn: async () => await fetchedPaginatedSessions(limit, skip),
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
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

export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sessionId, updatedData }) => {
      console.log("inside mutation session id : ", sessionId);
      const { data } = await axiosPrivate.patch(
        `/academic-management/session/${sessionId}`,
        updatedData,
      );
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["sessions"]);
    },
  });
};
