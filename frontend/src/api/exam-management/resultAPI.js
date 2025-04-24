import axiosPrivate from "../../utils/axiosPrivate";

export const fetchEligibleStudentsResultAPI = async (payload) => {
  console.log("params value before enter : ", payload);

  const query = new URLSearchParams(payload).toString();
  console.log("query : ", new URLSearchParams(payload));
  console.log("query jo dene wala hai : ", query);

  const res = await axiosPrivate.get(
    `/exam-management/students/result/search?${query}`,
  );
  console.log("🚀 fetchEligibleStudentsResultAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};
