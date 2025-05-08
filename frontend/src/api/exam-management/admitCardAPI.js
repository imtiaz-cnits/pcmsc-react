import axiosPrivate from "../../utils/axiosPrivate";

// ✅  GET - method
export const fetchGAdmitCardAPI = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const res = await axiosPrivate.get(
    `/exam-management/students/result/all/generated/admit-card?${query}`,
  );
  // console.log("🚀 fetchGAdmitCardAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};
