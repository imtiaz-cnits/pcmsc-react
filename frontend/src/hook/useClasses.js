// 🔍 for fetching classes
import { useQuery } from "@tanstack/react-query";
import { fetchClass } from "../api/academic-management/classApi.js";

const useClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchClass,
    retry: 2,
    staleTime: 1000 * 60 * 5,
    onError: (error) => {
      console.error("Error in useClasses hook call: ", error);
    },
    onSuccess: (data) => {
      console.log("fetched successfully  : ", data);
    },
  });
};

export default useClasses;
