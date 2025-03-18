// 🎣  to add classes

import { addClass } from "../api/academic-management/classApi.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddClass = () => {
  // to refresh the data
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addClass,

    onError: (error) => {
      console.error("Error adding class", error);
    },
    onSuccess: (data) => {
      console.log("class bal added successfully", data);
      // 🚀 Automatically Table Refresh
      queryClient.invalidateQueries(["classes"]);
    },
  });
};

export default useAddClass;
