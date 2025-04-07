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
