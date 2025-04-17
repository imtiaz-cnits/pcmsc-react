// Student Information API

import axiosPrivate from "../../utils/axiosPrivate";

// POST - method

export const addStudentInfoAPI = async (formData) => {
  const res = await axiosPrivate.post(
    "/student-management/student-info",
    formData,
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

// ✅  GET - method (id)
export const fetchStudentByIDAPI = async (id) => {
  console.log("id -> ", id);
  if (!id) {
    return "ID is required";
  }

  const res = await axiosPrivate.get(`/student-management/student/${id}`);
  console.log("🚀 fetchStudentByIDAPI : ", res.data);
  return res.data?.success ? res.data : [];
};


// ✅  GET - method (paginated)
export const fetchPaginatedStudentAPI = async(page,limit , filterChecker)=>{
  const res = await axiosPrivate.get(`/student-management/students-paginated`,
    {
      params: {page,limit , filterChecker}
    }
  )

  console.log("🚀 fetchPaginatedStudentAPI", res.data);
  return res.data?.success ? res.data : []

}

// ✅ PATCH - method
export const updateStudentAPI = async ({ studentID, formData }) => {
  console.log('form data ',formData)
  console.log('form data id',studentID)
  const res = await axiosPrivate.patch(
    `/student-management/student/${studentID}`,
    formData,
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
