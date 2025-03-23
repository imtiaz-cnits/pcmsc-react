// add session
import axiosPrivate from "../../utils/axiosPrivate.jsx";

export const addSessionAPI = async (payload) => {
  const res = await axiosPrivate.post(
    "/academic-management/add-session",
    payload,
  );
  console.log("full response api : ", res);
  return res.data;
};

// fetch
export const fetchSessionAPI = async () => {
  const res = await axiosPrivate.get("/academic-management/sessions");

  console.log("full response api : ", res);
  console.log("fetch api data ", res.data);
  return res.data?.data;
};

// to delete post

export const deleteSessionAPI = async (id) => {
  const res = await axiosPrivate.delete(`/academic-management/session/${id}`);
  console.log("full response delete-api ", res);
  console.log("deleting session api : ", res.data);
  return res.data;
};

//with paginated
export const fetchedPaginatedSessions = async (limit, skip) => {
  const res = await axiosPrivate.get(
    `/academic-management/session-paginated?limit=${limit}&skip=${skip}`,
  );
  console.log("paginated value and total", {
    data: res.data?.data,
    total: res.data?.total,
  });
  return res.data?.success
    ? { data: res.data?.data, total: res.data?.total }
    : { data: [], total: 0 };
};
