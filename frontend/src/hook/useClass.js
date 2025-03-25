//POST - method
//todo optimistic opacity
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addClassAPI,
  deleteClassAPI,
  fetchedPaginatedClasses,
  updateClassAPI,
} from "../api/academic-management/classApi.js";
import toast from "react-hot-toast";
import { useDeleteShift } from "./useShift.js";

//POST - method
export const useAddClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClassAPI,
    onError: (error) => {
      console.log("error adding session : ", error);
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
      console.log("✅ Shifts added successfully: ", data);

      await queryClient.invalidateQueries({ queryKey: ["classes"] });

      if (data?.success) {
        toast(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

//GET - method (paginated)
export const useFetchPaginatedClasses = (page) => {
  return useQuery({
    queryKey: ["classes", page],
    queryFn: () => fetchedPaginatedClasses(page),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 4,
  });
};

// PATCH - method
export const useUpdateShift = () => {
  return useMutation({
    mutationFn: updateClassAPI,
    onError: (error) => {
      console.log("error updating class : ", error);

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
  });
};

// DELETE - method

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClassAPI,

    onError: (error) => {
      console.log("error deleting class : ", error);
      if (error?.response) {
        toast(
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
      console.log("✅ Class deleted successfully: ", data);
      toast.success(data?.message || "Shift deleted successfully!");
      await queryClient.invalidateQueries({ queryKey: ["classes"] });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
