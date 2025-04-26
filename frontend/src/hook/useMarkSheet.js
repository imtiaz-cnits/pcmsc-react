import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchStudentMarksheetAPI } from "../api/exam-management/markSheetAPI";

//✅  GET - method
export const useFetchMarkSheet = (filters) => {
  console.log("inside useFetchMarkSheet : ", filters);
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
