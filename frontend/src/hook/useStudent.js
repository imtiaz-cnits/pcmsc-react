// student information hook

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchStudentBySIdAPI } from "../api/exam-management/migrationAPI.js";
import {
  addStudentInfoAPI,
  deleteStudentInfoAPI,
  fetchAllStudentsAPI,
  fetchPaginatedStudentAPI,
  updateStudentAPI,
} from "../api/student-management/studentAPI";

// ✅  POST - method
export const useAddSutdent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStudentInfoAPI,
    onError: (error) => {
      console.log("⚙️ error adding student : ", error);
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      }
    },

    onSuccess: async (data) => {
      console.log("🚀 Student added successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["students"] });
      if (data?.success) {
        toast.success(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

// ✅  GET - method
export const useFetchStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: fetchAllStudentsAPI,
    placeholderData: keepPreviousData,

    refetchOnWindowFocus: true,
  });
};

// ✅  GET - method (id)
export const useFetchStudentByID = (id) => {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => fetchStudentBySIdAPI(id),
    placeholderData: keepPreviousData,

    refetchOnWindowFocus: true,
    enabled: !!id,
  });
};

// ✅  GET - method (paginated)
export const useFetchPaginatedStudent = ({
  page,
  limit,
  filterChecker,
  keyword,
  className,
  session,
  section,
  shift,
}) => {
  console.log(
    "useFetchPaginatedStudent search value : ",
    className,
    session,
    section,
    shift,
  );
  return useQuery({
    queryKey: [
      "students",
      {
        page,
        limit,
        filterChecker,
        keyword,
        className,
        session,
        section,
        shift,
      },
    ],
    queryFn: () =>
      fetchPaginatedStudentAPI(
        page,
        limit,
        filterChecker,
        keyword,
        className,
        session,
        section,
        shift,
      ),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

//✅  PATCH - method
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStudentAPI,
    onError: (error, variables) => {
      console.log("⚙️ error updating student : ", error);
      console.log("⚙️ error updating student variables : ", variables);

      if (error?.response) {
        alert(
          error.response?.data?.message ||
            "An error occurred while updating the student. Please try again.",
        );
      }

      console.log(
        "❌ An error occurred while updating student. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update group . Try again!",
      );
    },

    onSuccess: async (data, { studentID, formData }) => {
      console.log("🚀 update student onSuccess data value :", data);
      console.log("🚀 update  :", formData, studentID);

      await queryClient.invalidateQueries({
        queryKey: ["students", studentID],
      });
      if (data?.success) {
        alert(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

//✅  DELETE - method
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudentInfoAPI,

    onError: (error) => {
      console.log("⚙️  error useDeleteStudent : ", error);
      if (error?.response) {
        alert(
          error.response?.data?.message ||
            "An error occurred !. Please try again",
        );
      }
      console.log(
        "❌ An error occurred while deleting the student. Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete student . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 Student deleted successfully: ", data);

      await queryClient.invalidateQueries({ queryKey: ["students"] });

      if (data?.success) {
        alert(data?.message || "Student deleted successfully!");
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
