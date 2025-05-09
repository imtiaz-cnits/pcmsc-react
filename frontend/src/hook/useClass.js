//todo optimistic opacity
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addClassAPI,
  deleteClassAPI,
  fetchedClassesAPI,
  fetchedPaginatedClasses,
  updateClassAPI,
} from "../api/academic-management/classApi.js";

//📌  POST - method
export const useAddClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClassAPI,
    onError: (error) => {
      console.log("⚙️ error adding session : ", error);
      if (error.response) {
        toast.error(
          error.response?.data?.message || "Failed to add class . Try again!",
        );
      }
      console.log(
        "❌ An error occurred while saving the shift. Please try again. : ",
        error.response?.data?.message || "Failed to add shift . Try again!",
      );
    },
    onSuccess: async (data) => {
      console.log("🚀 Class added successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["classes"] });

      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

//✅  GET - method
export const useFetchClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchedClassesAPI,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

//✅  GET - method (paginated)
export const useFetchPaginatedClasses = ({ page, limit, keyword }) => {
  return useQuery({
    queryKey: ["classes", { page, limit, keyword }],
    queryFn: () => fetchedPaginatedClasses(page, limit, keyword),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

//✅  PATCH - method
export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClassAPI,
    onError: (error, variables) => {
      console.log("⚙️ error updating class : ", error);
      console.log("⚙️ error updating class variables : ", variables);

      if (error?.response) {
        toast.error(
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

    onSuccess: async (data, { classID, payload }) => {
      console.log("🚀 update class onSuccess data value :", data);
      console.log("🚀 update  :", payload, classID);

      await queryClient.invalidateQueries({ queryKey: ["classes", classID] });

      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

//✅  DELETE - method
export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClassAPI,

    onError: (error) => {
      console.log("⚙️  error deleting class : ", error);
      if (error?.response) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred !. Please try again",
        );
      }

      console.log(
        "❌ An error occurred while deleting the class. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete shift . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 Class deleted successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["classes"] });
      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
