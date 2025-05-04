import axiosPrivate from "../../utils/axiosPrivate";

// ✅  GET - method
export const fetchStudentMarksheetAPI = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const res = await axiosPrivate.get(
    `/exam-management/students/result/mark-sheet?${query}`,
  );
  // console.log("🚀 fetchStudentMarksheetAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchEligibleStudentAPI = async (studentFilters) => {
  console.log('inside studentfilter ', studentFilters)
  const query = new URLSearchParams(studentFilters).toString();
  const res = await axiosPrivate.get(
    `/exam-management/students/result/mark-sheet/eligible-student?${query}`,
  );
  // console.log("🚀 fetchEligibleStudentAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};


// ✅  GET - method
export const fetchHighestMarkAPI = async (markFilter) => {
  console.log('inside mark api : ', markFilter)
  const query = new URLSearchParams(markFilter).toString();
  console.log('highest mark query :', query)
  const res = await axiosPrivate.get(
    `/exam-management/students/result/mark-sheet/mark-student?${query}`,
  );
  console.log("🚀 fetchHighestMarkAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};
