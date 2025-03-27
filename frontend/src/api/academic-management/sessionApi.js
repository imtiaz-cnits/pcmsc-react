// add session
import axiosPrivate from "../../utils/axiosPrivate.jsx";

// ✅  POST - method
export const addSessionAPI = async (payload) => {
  const res = await axiosPrivate.post(
    "/academic-management/add-session",
    payload,
  );
  console.log("full response api : ", res);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (without paginated)
export const fetchSessionAPI = async () => {
  const res = await axiosPrivate.get("/academic-management/sessions");

  // console.log("full response api : ", res);
  // console.log("fetch api data ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (paginated)
export const fetchedPaginatedSessions = async (page) => {
  const res = await axiosPrivate.get(
    `/academic-management/session-paginated?page=${page}`,
  );
  console.log("full response api : ", res);
  console.log("paginated value and total", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (entries)
export const fetchedEntriesSessionsAPI = async (limit) => {
  const res = await axiosPrivate.get(
    `/academic-management/session-entries?limit=${limit}`,
  );
  console.log("full response api : ", res);
  console.log("entries value and total", res.data);
  return res.data?.success ? res.data : [];
};

// ✅ UPDATE
export const updateSessionAPI = async ({ sessionId, payload }) => {
  const res = await axiosPrivate.patch(
    `/academic-management/session/${sessionId}`,
    payload,
  );

  console.log("⚙️ updated api :", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  Delete - method
export const deleteSessionAPI = async (id) => {
  const res = await axiosPrivate.delete(`/academic-management/session/${id}`);

  // console.log("delete api : ", res.data);
  return res.data?.success ? res.data : [];
};
