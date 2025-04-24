import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addExamAssignAPI,
  deleteAssignedExamAPI,
  fetchedPaginatedExamAssignAPI,
  updateAssignExamAPI,
} from "../api/exam-management/examAssignAPI";

//📌  POST - method
export const useAddExamAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExamAssignAPI,
    onError: (error) => {
      console.log("⚙️ error adding useAddExamAssign : ", error);
      if (error.response) {
        toast.error(
          error.response?.data?.message || "Failed to add exam . Try again!",
        );
      }
      console.log(
        "❌ An error occurred while saving the exam. Please try again. : ",
        error.response?.data?.message || "Failed to add exam . Try again!",
      );
    },
    onSuccess: async (data) => {
      console.log("🚀 Exam added successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["exam-assign"] });

      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exam-assign"] });
    },
  });
};

//✅  GET - method
export const useFetchPaginatedAssignedExam = ({ page, limit, keyword }) => {
  return useQuery({
    queryKey: ["exam-assign", { page, limit, keyword }],
    queryFn: () => fetchedPaginatedExamAssignAPI(page, limit, keyword),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

//✅  PATCH - method
export const useUpdateAssignExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAssignExamAPI,

    onError: (error) => {
      console.log("⚙️ error useUpdateAssignExam : ", error);
      if (error?.response) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            '"An error occurred !. Please try again"',
        );
      }

      console.log(
        "❌ An error occurred useUpdateAssignExam. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update assigned exam . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 useUpdateAssignExam data : ", data);

      await queryClient.invalidateQueries({ queryKey: ["exam-assign"] });
      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exam-assign"] });
    },
  });
};

//✅  DELETE - method
export const useDeleteAssignedExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAssignedExamAPI,

    onError: (error) => {
      console.log("⚙️  error useDeleteAssignedExam : ", error);
      if (error?.response) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred !. Please try again",
        );
      }

      console.log(
        "❌ An error occurred while deleting the assigned exam. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete assigned exam . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 useDeleteAssignedExam data : ", data);
      if (data?.success) {
        toast.success(data?.message);
      }
      await queryClient.invalidateQueries({ queryKey: ["exam-assign"] });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exam-assign"] });
    },
  });
};
