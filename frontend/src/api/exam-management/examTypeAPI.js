import axiosPrivate from "../../utils/axiosPrivate";

// ✅  POST - method
export const addExamTypeAPI = async (payload) => {
  console.log(" payload data ", payload);
  const res = await axiosPrivate.post(
    "/exam-management/add-exam-type",
    payload,
  );

  // console.log(" 🚀 addExamTypeAPI: ", res.data);

  return res.data?.success ? res.data : [];
};

// ✅  GET - method (paginated)
export const fetchedPaginatedExamTypesAPI = async (page, limit, keyword) => {
  const res = await axiosPrivate.get("/exam-management/exam-types-paginated", {
    params: { page, limit, keyword },
  });
  console.log(" 🚀 fetchedPaginatedExamTypesAPI: ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅ PATCH
export const updateExamTypeAPI = async ({ id, payload }) => {
  console.log("updateExamTypeAPI inside before check : ", id, payload);
  const res = await axiosPrivate.patch(
    `/exam-management/update-exam-types/${id}`,
    payload,
  );

  console.log(" updateExamTypeAPI : ", res.data);

  return res.data?.success ? res.data : [];
};

// ✅  Delete - method
export const deleteExamTypeAPI = async (id) => {
  const res = await axiosPrivate.delete(`/exam-management/exam-type/${id}`);

  console.log(" 🚀 deleteExamTypeAPI : ", res.data);
  return res.data?.success ? res.data : [];
};
