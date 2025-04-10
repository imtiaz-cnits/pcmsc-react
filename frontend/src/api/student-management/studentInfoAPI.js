// Student Information API

import axiosPrivate from "../../utils/axiosPrivate";

// POST - method

export const addStudentInfoAPI = async (payload) => {
  const res = await axiosPrivate.post(
    "/student-management/student-info",
    payload,
  );
  // console.log('addStudentInfoAPI : ',res.data)
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchAllStudentsAPI = async () => {
  const res = await axiosPrivate.get("/student-management/students");
  console.log("🚀 fetchAllStudentsAPI : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅ PATCH - method
export const updateStudentAPI = async ({ studentID, payload }) => {
  const res = await axiosPrivate.patch(
    `/student-management/student/${studentID}`,
    payload,
  );

  console.log("⚙️ updateStudentAPI api :", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  DELETE - method
export const deleteStudentInfoAPI = async (id) => {
  const res = await axiosPrivate.delete(`/student-management/student/${id}`);
  console.log("🚀 deleteStudentInfoAPI : ", res.data);
  return res.data?.success ? res.data : [];
};
