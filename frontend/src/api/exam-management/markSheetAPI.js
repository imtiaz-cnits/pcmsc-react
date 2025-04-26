import axiosPrivate from "../../utils/axiosPrivate";

// ✅  GET - method
export const fetchStudentMarksheetAPI = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const res = await axiosPrivate.get(
    `/exam-management/students/result/mark-sheet?${query}`,
  );
  console.log("🚀 fetchStudentMarksheetAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchEligibleStudentAPI = async (studentFilters) => {
  const query = new URLSearchParams(studentFilters).toString();
  const res = await axiosPrivate.get(
    `/exam-management/students/result/mark-sheet/eligible-student?${query}`,
  );
  console.log("🚀 fetchEligibleStudentAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};
