import axiosPrivate from "../../utils/axiosPrivate.jsx";

// ✅  POST - method
export const addMigrateStudentAPI = async (payload) => {
  // console.log(" addMigrateStudentAPI payload before ", payload);
  const res = await axiosPrivate.post(
    "/exam-management/migrate-student",
    payload,
  );
  // console.log(" 🚀 addMigrateStudentAPI ,", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (id)

export const fetchStudentBySIdAPI = async (sid) => {
  // console.log("s id ", sid);
  const res = await axiosPrivate.get(`/exam-management/student-id?sid=${sid}`);
  // console.log("🚀 fetchStudentBySIdAPI : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (paginated)
export const fetchMigratePaginatedStudentAPI = async (
  page,
  limit,
  filterChecker,
  keyword,
  className,
  session,
  section,
  shift,
) => {
  let params = { page, limit, filterChecker, keyword };

  if (className && session && section && shift) {
    params = {
      ...params,
      className,
      session,
      section,
      shift,
    };
  }
  // console.log("className value : ", className);
  // console.log("fetchMigratePaginatedStudentAPI params : ", params);

  const res = await axiosPrivate.get(
    `/exam-management/paginated-student-migrations`,
    {
      // params: { page, limit, filterChecker, keyword },
      params,
    },
  );

  console.log("🚀 fetchMigratePaginatedStudentAPI ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  Delete - method
export const deleteMigrationAPI = async (id) => {
  const res = await axiosPrivate.delete(
    `/exam-management/migrate-student/${id}`,
  );

  console.log("🚀 deleteMigrationAPI: ", res.data);
  return res.data?.success ? res.data : [];
};
