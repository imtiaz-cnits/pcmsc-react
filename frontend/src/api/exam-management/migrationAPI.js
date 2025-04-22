
// ✅  POST - method
export const addMigrateStudentAPI = async (payload) => {
  console.log(" addMigrateStudentAPI payload before ", payload);
  const res = await axiosPrivate.post("/exam-management/migrate-student", payload);
  console.log(" 🚀 addMigrateStudentAPI ,", res.data);
  return res.data?.success ? res.data : [];
};



// ✅  GET - method (id)
import axiosPrivate from "../../utils/axiosPrivate.jsx";

export const fetchStudentBySIdAPI = async (sid) => {
  console.log("s id ", sid);
  const res = await axiosPrivate.get(`/exam-management/student-id?sid=${sid}`,);
  console.log("🚀 fetchStudentBySIdAPI : ", res.data);
  return res.data?.success ? res.data : [];
};
