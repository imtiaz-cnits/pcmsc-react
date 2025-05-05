import axiosPrivate from "../../utils/axiosPrivate";

// ✅  POST - method
export const addGroupAPI = async (payload) => {
  const res = await axiosPrivate.post(
    "/academic-management/add-group",
    payload,
  );
  //   console.log(" 🚀 addGroupAPI : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchedGroupsAPI = async () => {
  const res = await axiosPrivate.get("/academic-management/groups");
  //   console.log("🚀 fetchedGroupsAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (paginated)
export const fetchedPaginatedGroup = async (page, limit, keyword) => {
  console.log("fetchedPaginatedGroup api : ", page, limit);
  const res = await axiosPrivate.get(`/academic-management/group-paginated`, {
    params: { page, limit, keyword },
  });
  console.log("fetchedPaginatedGroup :", res.data);
  return res.data?.success ? res.data : [];
};

// ✅ UPDATE
export const updateGroupAPI = async ({ groupID, payload }) => {
  console.log("updateGroupAPI", groupID, payload);
  const res = await axiosPrivate.patch(
    `/academic-management/group/${groupID}`,
    payload,
  );

  console.log("⚙️ updated api :", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  Delete - method
export const deleteGroupAPI = async (id) => {
  console.log("deleted id : ", id);
  const res = await axiosPrivate.delete(`/academic-management/group/${id}`);

  console.log("🚀 delete api : ", res.data);
  return res.data?.success ? res.data : [];
};
