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
  console.log("value : ", page, limit, keyword);

  const res = await axiosPrivate.get(
    `/exam-management/grading-system-paginated`,
    {
      params: { page, limit, keyword },
    },
  );
  console.log(" 🚀 fetchedPaginatedGradingAPI : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅ PATCH
export const updateGradingAPI = async ({ id, payload }) => {
  console.log(" 🚀 updateGradingAPI inside before check : ", id, payload);
  const res = await axiosPrivate.patch(
    `/exam-management/grading-system/${id}`,
    payload,
  );

  console.log(" 🚀 updateGradingAPI : ", res.data);

  return res.data?.success ? res.data : [];
};

// ✅  Delete - method
export const deleteGradingAPI = async (id) => {
  const res = await axiosPrivate.delete(
    `/exam-management/grading-system/${id}`,
  );

  console.log("🚀 deleteGradingAPI: ", res.data);
  return res.data?.success ? res.data : [];
};
