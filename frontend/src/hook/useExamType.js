import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addExamTypeAPI,
  fetchedPaginatedExamTypesAPI,
} from "../api/exam-management/examTypeAPI";

//📌  POST - method
export const useAddExamType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExamTypeAPI,

    onError: (error) => {
      console.log("⚙️ error adding exam-type : ", error);
      if (error.response) {
        alert(
          error.response?.data?.message ||
            "Failed to add exam-type . Try again!",
        );
      }
      console.log(
        "❌ An error occurred while saving the exam-type. Please try again. : ",
        error.response?.data?.message || "Failed to add exam-type . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 Exam type added successfully: ", data);

      await queryClient.invalidateQueries({ queryKey: ["exam-types"] });
      if (data?.success) {
        alert(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exam-types"] });
    },
  });
};

//✅  GET - method (paginated)
export const useFetchPaginatedExamTypes = ({ page, limit }) => {
  return useQuery({
    queryKey: ["exam-types", { page, limit }],
    queryFn: () => fetchedPaginatedExamTypesAPI(page, limit),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 2,
  });
};
