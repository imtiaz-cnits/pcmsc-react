import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchOkAPI } from "../api/test/testAPI.js";

export const useTest = ({ page, limit }) => {
  return useQuery({
    queryKey: ["classes", page],
    queryFn: () => fetchOkAPI(page, limit),
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    retry: 2,
  });
};
