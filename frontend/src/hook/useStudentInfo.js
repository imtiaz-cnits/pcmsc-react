// student information hook

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addStudentInfoAPI,
  fetchAllStudentsAPI,
} from "../api/student-management/studentInfoAPI";

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
export const useFetchSutdents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: fetchAllStudentsAPI,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};
