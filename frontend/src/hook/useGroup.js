import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addGroupAPI,
  deleteGroupAPI,
  fetchedGroupsAPI,
  updateGroupAPI,
} from "../api/academic-management/groupAPI";

//📌  POST - method
export const useAddGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addGroupAPI,
    onError: (error) => {
      console.log("⚙️ error adding group : ", error);

      if (error.response) {
        alert(
          error.response?.data?.message || "Failed to add group . Try again!",
        );
      }
      console.log(
        "❌ An error occurred while saving the group. Please try again. : ",
        error.response?.data?.message || "Failed to add group . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 Group added successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["groups"] });

      if (data?.success) {
        alert(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

//✅  GET - method
export const useFetchGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: fetchedGroupsAPI,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

//✅  PATCH - method
export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGroupAPI,
    onError: (error, variables) => {
      console.log("⚙️ error updating group : ", error);
      console.log("⚙️ error updating group variables : ", variables);

      if (error?.response) {
        alert(
          error.response?.data?.message ||
            "An error occurred while updating the group. Please try again.",
        );
      }

      console.log(
        "❌ An error occurred while updating group. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update group . Try again!",
      );
    },

    onSuccess: async (data, { groupID, payload }) => {
      console.log("🚀 update group onSuccess data value :", data);
      console.log("🚀 update  :", payload, groupID);

      await queryClient.invalidateQueries({ queryKey: ["groups", groupID] });
      if (data?.success) {
        alert(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

//✅  DELETE - method
export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroupAPI,

    onError: (error) => {
      console.log("⚙️  error deleting group : ", error);
      if (error?.response) {
        alert(
          error.response?.data?.message ||
            "An error occurred !. Please try again",
        );
      }

      console.log(
        "❌ An error occurred while deleting the group. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete group . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 Group deleted successfully: ", data);

      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      if (data?.success) {
        alert(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
