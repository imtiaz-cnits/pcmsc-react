import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addExamTypeAPI,
  deleteExamTypeAPI,
  fetchedExamTypesAPI,
  fetchedPaginatedExamTypesAPI,
  updateExamTypeAPI,
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

//✅  GET - method
export const useFetchExamTypes = () => {
  return useQuery({
    queryKey: ["exam-types"],
    queryFn: fetchedExamTypesAPI,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

//✅  GET - method (paginated)
export const useFetchPaginatedExamTypes = ({ page, limit, keyword }) => {
  return useQuery({
    queryKey: ["exam-types", { page, limit, keyword }],
    queryFn: () => fetchedPaginatedExamTypesAPI(page, limit, keyword),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

//✅  PATCH - method
export const useUpdateExamType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExamTypeAPI,

    onError: (error) => {
      console.log("⚙️ error useUpdateExamType : ", error);
      if (error?.response) {
        alert(
          error.response?.data?.message ||
            error.message ||
            '"An error occurred !. Please try again"',
        );
      }

      console.log(
        "❌ An error occurred useUpdateExamType. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete exam-type . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 useUpdateExamType data : ", data);

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

//✅  DELETE - method
export const useDeleteExamType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExamTypeAPI,

    onError: (error) => {
      console.log("⚙️  error useDeleteExamType : ", error);
      if (error?.response) {
        alert(
          error.response?.data?.message ||
            error.message ||
            '"An error occurred !. Please try again"',
        );
      }
      console.log(
        "❌ An error occurred useDeleteExamType. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete exam-type . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 useDeleteExamType data : ", data);

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
