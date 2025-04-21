import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addSubjectAPI,
  deleteSubjectAPI,
  fetchedPaginatedSubjectsAPI,
} from "../api/exam-management/subjectAPI";

//📌  POST - method
export const useAddSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSubjectAPI,
    onError: (error) => {
      console.log("⚙️ error adding useAddSubject : ", error);
      if (error.response) {
        alert(
          error.response?.data?.message || "Failed to add subject . Try again!",
        );
      }
      console.log(
        "❌ An error occurred while saving the subject. Please try again. : ",
        error.response?.data?.message || "Failed to add subject . Try again!",
      );
    },
    onSuccess: async (data) => {
      console.log("🚀 Subject added successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["subjects"] });

      if (data?.success) {
        alert(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};

//✅  GET - method
export const useFetchPaginatedSubject = ({ page, limit, keyword }) => {
  return useQuery({
    queryKey: ["subjects", { page, limit, keyword }],
    queryFn: () => fetchedPaginatedSubjectsAPI(page, limit, keyword),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

//✅  DELETE - method
export const useDeleteSubjects = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubjectAPI,

    onError: (error) => {
      console.log("⚙️  error useDeleteSubjects : ", error);
      if (error?.response) {
        alert(
          error.response?.data?.message ||
            "An error occurred !. Please try again",
        );
      }

      console.log(
        "❌ An error occurred while deleting the subject. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete subject . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 useDeleteSubjects data : ", data);
      if (data?.success) {
        alert(data?.message);
      }
      await queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};
