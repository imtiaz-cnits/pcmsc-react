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
  fetchedSubjectsAPI,
  updateSubjectAPI,
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
export const useFetchSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: fetchedSubjectsAPI,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
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

//✅  PATCH - method
export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubjectAPI,

    onError: (error) => {
      console.log("⚙️ error useUpdateSubject : ", error);
      if (error?.response) {
        alert(
          error.response?.data?.message ||
            error.message ||
            '"An error occurred !. Please try again"',
        );
      }

      console.log(
        "❌ An error occurred useUpdateSubject. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update subject . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 useUpdateSubject data : ", data);

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
