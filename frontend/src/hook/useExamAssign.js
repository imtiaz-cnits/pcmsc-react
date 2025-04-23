import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addExamAssignAPI, fetchedPaginatedExamAssignAPI } from "../api/exam-management/examAssignAPI";


//📌  POST - method
export const useAddExamAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExamAssignAPI,
    onError: (error) => {
      console.log("⚙️ error adding useAddExamAssign : ", error);
      if (error.response) {
        alert(
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
        alert(data?.message);
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
