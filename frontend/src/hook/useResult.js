import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchEligibleStudentsResultAPI } from "../api/exam-management/resultAPI";

//✅  GET - method
export const useFetchStudentsResults = (payload) => {
  const isFilterValid =
    payload.selectedClass &&
    payload.selectedSession &&
    payload.selectedSection &&
    payload.selectedShift &&
    payload.selectedExamination &&
    payload.classRoll;

  return useQuery({
    queryKey: ["results"],
    queryFn: () => fetchEligibleStudentsResultAPI(payload),
    enabled: !!isFilterValid,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};
