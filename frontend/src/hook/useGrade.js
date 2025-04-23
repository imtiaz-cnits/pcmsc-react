import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addGradeAPI,
  fetchedPaginatedGradingAPI,
} from "../api/exam-management/gradeAPI";

//📌  POST - method
export const useAddGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addGradeAPI,
    onError: (error) => {
      console.log("⚙️ error adding useAddGrade : ", error);
      if (error.response) {
        alert(
          error.response?.data?.message ||
            "Failed to add grading system . Try again!",
        );
      }
      console.log(
        "❌ An error occurred while saving the grading system. Please try again. : ",
        error.response?.data?.message ||
          "Failed to add grading system . Try again!",
      );
    },
    onSuccess: async (data) => {
      console.log("🚀 Grading system added successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["grading-system"] });

      if (data?.success) {
        alert(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["grading-system"] });
    },
  });
};

//✅  GET - method
export const useFetchPaginatedGrade = ({ page, limit, keyword }) => {
  return useQuery({
    queryKey: ["grading-system", { page, limit, keyword }],
    queryFn: () => fetchedPaginatedGradingAPI(page, limit, keyword),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};
