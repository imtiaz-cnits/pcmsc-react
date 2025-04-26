import axiosPrivate from "../../utils/axiosPrivate";

// ✅  GET - method
export const fetchStudentMarksheetAPI = async (filters) => {
  console.log("before fetchStudentMarksheetAPI ", filters);
  const query = new URLSearchParams(filters).toString();
  console.log("after query : ", query);
  const res = await axiosPrivate.get(
    `/exam-management/students/result/mark-sheet?${query}`,
  );
  console.log("🚀 fetchStudentMarksheetAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};
