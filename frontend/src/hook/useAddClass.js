// useAddClass.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClassAPI } from "../api/academic-management/classApi.js";
import toast from "react-hot-toast";

const useAddClass = () => {
  const queryClient = useQueryClient(); // Get the query client

  return useMutation({
    mutationFn: addClassAPI, // API function
    onMutate: async (payload) => {
      console.log("Before Payload:", payload);
      const toastId = toast.loading("Adding Class...");
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss(context.toastId);
      if (data.success) {
        toast.success(data.message || "Class added successfully!");
        // Invalidate the query to refetch the data
        queryClient.invalidateQueries(["classes"]);
      } else {
        toast.error(data.message || "Failed to add class");
      }
    },
    onError: (error, variables, context) => {
      console.error("Error adding class:", error);
      toast.dismiss(context.toastId);
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      console.log("Error adding class:", errorMessage);
      toast.error(errorMessage);
    },
    onSettled: () => {
      // Ensure to invalidate the query after any mutation
      queryClient.invalidateQueries(["classes"]);
    },
  });
};
export default useAddClass;
