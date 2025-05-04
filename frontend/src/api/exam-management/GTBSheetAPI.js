import axiosPrivate from "../../utils/axiosPrivate";

// ✅  GET - method
export const fetchGTBSheetAPI = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const res = await axiosPrivate.get(
    `/exam-management/students/result/all/gtb-sheet?${query}`,
  );
  // console.log("🚀 fetchGTBSheetAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};
