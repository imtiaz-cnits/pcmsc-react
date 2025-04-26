import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchEligibleStudentAPI,
  fetchStudentMarksheetAPI,
} from "../api/exam-management/markSheetAPI";

//✅  GET - method
export const useFetchMarkSheet = (filters) => {
  return useQuery({
    queryKey: ["mark-sheet", filters],
    queryFn: () => fetchStudentMarksheetAPI(filters),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

//✅  GET - method
export const useFetchEligibleStudent = (studentFilters) => {
  return useQuery({
    queryKey: ["mark-sheet", studentFilters],
    queryFn: () => fetchEligibleStudentAPI(studentFilters),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};
