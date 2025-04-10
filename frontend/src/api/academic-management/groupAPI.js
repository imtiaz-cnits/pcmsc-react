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

// ✅ UPDATE
export const updateGroupAPI = async ({ editId, payload }) => {
  console.log("updateGroupAPI", editId, payload);
  const res = await axiosPrivate.patch(
    `/academic-management/group/${editId}`,
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
