import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchEligibleStudentAPI,
  fetchHighestMarkAPI,
  fetchStudentMarksheetAPI,
} from "../api/exam-management/markSheetAPI";

//✅  GET - method
export const useFetchMarkSheet = (filters) => {
  return useQuery({
    queryKey: ["mark-sheet", filters],
    queryFn: () => fetchStudentMarksheetAPI(filters),
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
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};


//✅  GET - method
export const useFetchHighestMark = (markFilter) => {
  console.log('checker ', markFilter)
  return useQuery({
    queryKey: ["mark-sheet-mark", markFilter],
    queryFn: () => fetchHighestMarkAPI(markFilter),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};
