import axiosPrivate from "../../utils/axiosPrivate";

// ✅  POST - method
export const addSubjectAPI = async (payload) => {
  console.log(" addSubjectAPI payload ", payload);
  const res = await axiosPrivate.post("/exam-management/add-subject", payload);
  // console.log(" 🚀 addSubjectAPI ,", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchSubjectAPI = async () => {
  const res = await axiosPrivate.get("/exam-management/classes");
  // console.log("🚀 fetchedClasses api : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchedSubjectsAPI = async () => {
  const res = await axiosPrivate.get("/exam-management/subjects");
  console.log("🚀 fetchedSubjectsAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (paginated)
export const fetchedPaginatedSubjectsAPI = async (page, limit, keyword) => {
  const res = await axiosPrivate.get(`/exam-management/subjects-paginated`, {
    params: { page, limit, keyword },
  });
  console.log("fetchedPaginatedSubjectsAPI : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅ PATCH
export const updateSubjectAPI = async ({ id, payload }) => {
  console.log(" 🚀 updateSubjectAPI inside before check : ", id, payload);
  const res = await axiosPrivate.patch(
    `/exam-management/update-subject/${id}`,
    payload,
  );

  console.log(" 🚀 updateExamTypeAPI : ", res.data);

  return res.data?.success ? res.data : [];
};

// ✅  Delete - method
export const deleteSubjectAPI = async (id) => {
  const res = await axiosPrivate.delete(`/exam-management/subject/${id}`);

  console.log("🚀 deleteSubjectAPI: ", res.data);
  return res.data?.success ? res.data : [];
};
