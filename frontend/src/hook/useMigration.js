import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMigrateStudentAPI, fetchStudentBySIdAPI } from "../api/exam-management/migrationAPI.js";



//✅    POST - method
export const useMigrateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMigrateStudentAPI,
    onError: (error) => {
      console.log("⚙️ error adding useAddMigrateStudent : ", error);
      if (error.response) {
        alert(
          error.response?.data?.message || "Failed to migrate student . Try again!",
        );
      }
      console.log(
        "❌ An error occurred while migrating the student. Please try again. : ",
        error.response?.data?.message || "Failed to migrate student . Try again!",
      );
    },
    onSuccess: async (data) => {
      console.log("🚀 Migrated successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["migration"] });

      if (data?.success) {
        alert(data?.message);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["migration"] });
    },
  });
};

// ✅  GET - method (student id)
export const useFetchStudentByStudentID = ({ sid }) => {
  return useQuery({
    queryKey: ["migration", sid],
    queryFn: () => fetchStudentBySIdAPI(sid),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    enabled: !!sid
  });
};


