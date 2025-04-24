import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addGradeAPI,
  deleteGradingAPI,
  fetchedPaginatedGradingAPI,
  updateGradingAPI,
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

//✅  PATCH - method
export const useUpdateGrading = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGradingAPI,

    onError: (error) => {
      console.log("⚙️ error useUpdateGrading : ", error);
      if (error?.response) {
        alert(
          error.response?.data?.message ||
            error.message ||
            '"An error occurred !. Please try again"',
        );
      }

      console.log(
        "❌ An error occurred useUpdateGrading. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update grading system . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 useUpdateGrading data : ", data);

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

//✅  DELETE - method
export const useDeleteGrading = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGradingAPI,

    onError: (error) => {
      console.log("⚙️  error useDeleteGrading : ", error);
      if (error?.response) {
        alert(
          error.response?.data?.message ||
            "An error occurred !. Please try again",
        );
      }

      console.log(
        "❌ An error occurred while deleting the grade. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete grade . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 useDeleteGrading data : ", data);
      if (data?.success) {
        alert(data?.message);
      }
      await queryClient.invalidateQueries({ queryKey: ["grading-system"] });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["grading-system"] });
    },
  });
};
