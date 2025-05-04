import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchGTBSheetAPI } from "../api/exam-management/GTBSheetAPI";

//✅  GET - method
export const useFetchGTBSheet = (filters) => {
  return useQuery({
    queryKey: ["gtb-sheet", filters],
    queryFn: () => fetchGTBSheetAPI(filters),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};
