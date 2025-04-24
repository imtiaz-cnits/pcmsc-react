import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchEligibleStudentsResultAPI } from "../api/exam-management/resultAPI";

//✅  GET - method
export const useFetchStudentsResults = (filters) => {
  const isFilterValid =
    filters.classRoll &&
    filters.section &&
    filters.className &&
    filters.shift &&
    filters.session &&
    filters.examination;

  return useQuery({
    queryKey: ["results", filters],
    queryFn: () => fetchEligibleStudentsResultAPI(filters),
    enabled: !!isFilterValid,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};
