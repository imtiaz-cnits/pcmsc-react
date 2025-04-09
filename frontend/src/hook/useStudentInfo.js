// student information hook

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addStudentInfoAPI,
  deleteStudentInfoAPI,
  fetchAllStudentsAPI, updateStudentAPI,
} from "../api/student-management/studentInfoAPI";
import toast from "react-hot-toast";

// ✅  POST - method
export const useAddSutdent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStudentInfoAPI,
    onError: (error) => {
      console.log("⚙️ error adding student : ", error);
    },

    onSuccess: async (data) => {
      console.log("🚀 Student added successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["students"] });
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
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
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

    onSuccess: async (data, { studentID, payload }) => {
      console.log("🚀 update student onSuccess data value :", data);
      console.log("🚀 update  :", payload, studentID);

      await queryClient.invalidateQueries({ queryKey: ["students", studentID] });
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
