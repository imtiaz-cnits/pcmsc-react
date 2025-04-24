import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addMigrateStudentAPI,
  deleteMigrationAPI,
  fetchMigratePaginatedStudentAPI,
  fetchStudentBySIdAPI,
} from "../api/exam-management/migrationAPI.js";

//✅    POST - method
export const useMigrateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMigrateStudentAPI,
    onError: (error) => {
      console.log("⚙️ error adding useAddMigrateStudent : ", error);
      if (error.response) {
        alert(
          error.response?.data?.message ||
            "Failed to migrate student . Try again!",
        );
      }
      console.log(
        "❌ An error occurred while migrating the student. Please try again. : ",
        error.response?.data?.message ||
          "Failed to migrate student . Try again!",
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
    enabled: !!sid,
  });
};

// ✅  GET - method (paginated)
export const useFetchMigratePaginatedStudent = ({
  page,
  limit,
  filterChecker,
  keyword,
  className,
  session,
  section,
  shift,
}) => {
  // console.log(
  //   "useFetchPaginatedStudent search value : ",
  //  { className,
  //   session,
  //   section,
  //   shift,
  //   page,
  //   limit,
  //   filterChecker,
  //   keyword}
  // );
  return useQuery({
    queryKey: [
      "migration",
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
      fetchMigratePaginatedStudentAPI(
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
    retry: 1,
  });
};

//✅  DELETE - method
export const useDeleteMigrateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMigrationAPI,

    onError: (error) => {
      console.log("⚙️  error useDeleteMigrateStudent : ", error);
      if (error?.response) {
        alert(
          error.response?.data?.message ||
            "An error occurred !. Please try again",
        );
      }

      console.log(
        "❌ An error occurred while deleting the migrate-student . Please try again. : ",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete migrate-student . Try again!",
      );
    },

    onSuccess: async (data) => {
      console.log("🚀 useDeleteMigrateStudent data : ", data);
      if (data?.success) {
        alert(data?.message);
      }
      await queryClient.invalidateQueries({ queryKey: ["migration"] });
    },

    // onSettled: async () => {
    //   await queryClient.invalidateQueries({ queryKey: ["migration"] });
    // },
  });
};
