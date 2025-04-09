import axiosPrivate from "../../utils/axiosPrivate.jsx";

// ✅  POST - method
export const addClassAPI = async (payload) => {
  const res = await axiosPrivate.post(
    "/academic-management/add-class",
    payload,
  );
  // console.log(" 🚀 value of ,", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchedClassesAPI = async () => {
  const res = await axiosPrivate.get("/academic-management/classes");
  console.log("🚀 fetchedClasses api : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (paginated)
export const fetchedPaginatedClasses = async (page) => {
  const res = await axiosPrivate.get(
    `/academic-management/class-paginated?page=${page}`,
  );
  // console.log("paginated value and total", res.data);
  return res.data?.success ? res.data : [];
};

// ✅ UPDATE
export const updateClassAPI = async ({ classId, payload }) => {
  const res = await axiosPrivate.patch(
    `/academic-management/class/${classId}`,
    payload,
  );

  console.log("⚙️ updated api :", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  Delete - method
export const deleteClassAPI = async (id) => {
  const res = await axiosPrivate.delete(`/academic-management/class/${id}`);

  // console.log("delete api : ", res.data);
  return res.data?.success ? res.data : [];
};
