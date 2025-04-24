import axiosPrivate from "../../utils/axiosPrivate";

// ✅  GET - method
export const fetchEligibleStudentsAPI = async (filters) => {
  console.log("params value before enter : ", filters);

  const query = new URLSearchParams(filters).toString();
  console.log("query : ", new URLSearchParams(filters));
  console.log("query jo dene wala hai : ", query);

  const res = await axiosPrivate.get(
    `/exam-management/students/search?${query}`,
  );
  console.log("🚀 fetchEligibleStudentsAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};
