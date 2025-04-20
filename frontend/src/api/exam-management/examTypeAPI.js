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
export const fetchedPaginatedExamTypesAPI = async (page, limit) => {
  const res = await axiosPrivate.get("/exam-management/exam-types-paginated", {
    params: { page, limit },
  });
  console.log(" 🚀 fetchedPaginatedExamTypesAPI: ", res.data);
  return res.data?.success ? res.data : [];
};
