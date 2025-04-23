import axiosPrivate from "../../utils/axiosPrivate";

// ✅  POST - method
export const addGradeAPI = async (payload) => {
  console.log(" addGradeAPI payload ", payload);
  const res = await axiosPrivate.post(
    "/exam-management/add-grading-system",
    payload,
  );
  console.log(" 🚀 addGradeAPI ,", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchGradeAPI = async () => {
  const res = await axiosPrivate.get("/exam-management/grading-systems");
  // console.log("🚀 fetchGradeAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (paginated)
export const fetchedPaginatedGradingAPI = async (page, limit, keyword) => {
  const res = await axiosPrivate.get(
    `/exam-management/grading-system-paginated`,
    {
      params: { page, limit, keyword },
    },
  );
  console.log(" 🚀 fetchedPaginatedGradingAPI : ", res.data);
  return res.data?.success ? res.data : [];
};
