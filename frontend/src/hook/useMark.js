import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchEligibleStudentsAPI } from "../api/exam-management/markAPI";

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
