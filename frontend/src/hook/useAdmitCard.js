import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchGAdmitCardAPI } from "../api/exam-management/admitCardAPI";

//✅  GET - method
export const useFetchGAdmitCardSheet = (filters) => {
  return useQuery({
    queryKey: ["admit-card", filters],
    queryFn: () => fetchGAdmitCardAPI(filters),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};
