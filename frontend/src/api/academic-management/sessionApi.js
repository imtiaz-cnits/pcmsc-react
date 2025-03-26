// add session
import axiosPrivate from "../../utils/axiosPrivate.jsx";

export const addSessionAPI = async (payload) => {
  const res = await axiosPrivate.post(
    "/academic-management/add-session",
    payload,
  );
  // console.log("full response api : ", res);
  return res.data?.success ? res.data : [];
};

// fetch
export const fetchSessionAPI = async () => {
  const res = await axiosPrivate.get("/academic-management/sessions");

  // console.log("full response api : ", res);
  // console.log("fetch api data ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (paginated)
export const fetchedPaginatedSessions= async (page) => {
  const res = await axiosPrivate.get(
      `/academic-management/session-paginated?page=${page}`,
  );
  console.log("full response api : ", res);
  console.log("paginated value and total", res.data);
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
