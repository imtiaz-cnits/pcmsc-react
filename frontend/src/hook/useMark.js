import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from 'sonner';
import {
  fetchEligibleStudentsAPI,
  markEntryAPI,
} from "../api/exam-management/markAPI";
//✅  GET - method
export const useFetchEligibleStudents = (filters) => {
  const isFilterValid =
    filters.className &&
    filters.examName &&
    filters.section &&
    filters.session &&
    filters.shift &&
    filters.subject;

  return useQuery({
    queryKey: ["mark-entry", filters],
    queryFn: () => fetchEligibleStudentsAPI(filters),
    enabled: !!isFilterValid,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};

//📌  POST - method
export const useMarkEntry = ({examName}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markEntryAPI,
    onError: (error) => {
      console.log("⚙️ error adding useMarkEntry : ", error);
      if (error.response) {
        alert(
          error.response?.data?.message ||
            "Failed to add mark-entry . Try again!",
        );
      }
      console.log(
        "❌ An error occurred while entering the mark. Please try again. : ",
        error.response?.data?.message || "Failed to entry mark . Try again!",
      );
    },
    onSuccess: async (data) => {
      console.log("🚀 Mark entred successfully: ", data);
      await queryClient.invalidateQueries({ queryKey: ["mark-entry"] });

      if (data?.success) {
        toast.success(`${data?.message} ${examName}!.`);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mark-entry"] });
    },
  });
};
