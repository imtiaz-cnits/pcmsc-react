import axiosPrivate from "../../utils/axiosPrivate";

// ✅  POST - method
export const addExamAssignAPI = async (payload) => {
    const res = await axiosPrivate.post("/exam-management/assigned-exam", payload);
    console.log(" 🚀 addExamAssignAPI ,", res.data);
    return res.data?.success ? res.data : [];
  };



  // ✅  GET - method
export const fetchExamAssignAPI = async () => {
    const res = await axiosPrivate.get("/exam-management/all-assigned-exams");
    console.log("🚀 fetchExamAssignAPI api : ", res.data);
    return res.data?.success ? res.data : [];
  };

// ✅  GET - method (paginated)
export const fetchedPaginatedExamAssignAPI = async (page, limit, keyword) => {
    const res = await axiosPrivate.get(`/exam-management/assigned-exams-paginated`, {
      params: { page, limit, keyword },
    });
    console.log("🚀 fetchedPaginatedExamAssignAPI : ", res.data);
    return res.data?.success ? res.data : [];
  };

// ✅ PATCH
export const updateAssignExamAPI = async ({ id, payload }) => {
    console.log(" 🚀 updateAssignExamAPI inside before check : ", id, payload);
    const res = await axiosPrivate.patch(
      `/exam-management/up-assigned-exam/${id}`,
      payload,
    );
  
    console.log(" 🚀 updateAssignExamAPI : ", res.data);
  
    return res.data?.success ? res.data : [];
  };
  

  // ✅  Delete - method
export const deleteAssignedExamAPI = async (id) => {
    const res = await axiosPrivate.delete(`/exam-management/d-assigned-exam/${id}`);
  
    console.log("🚀 deleteAssignedExamAPI: ", res.data);
    return res.data?.success ? res.data : [];
  };
  