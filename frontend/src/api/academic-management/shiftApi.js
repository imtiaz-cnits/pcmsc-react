import axiosPrivate from "../../utils/axiosPrivate.jsx";

// to add
export const addShiftAPI = async (payload) => {
  const res = await axiosPrivate.post(
    "/academic-management/add-shift",
    payload,
  );
  // console.log("value of ,", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method (pagination)
export const fetchedShiftsAPI = async () => {
  const res = await axiosPrivate.get("/academic-management/shifts");
  console.log("🚀 fetchedShifts api : ", res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchedPaginatedShifts = async (page, limit, keyword) => {
  const res = await axiosPrivate.get(`/academic-management/shifts-paginated`, {
    params: { page, limit, keyword },
  });
  console.log("🚀 paginated value and total", res.data);
  return res.data?.success ? res.data : {};
};

//with entries
export const fetchShiftEntries = async (limit) => {
  const res = await axiosPrivate.get(
    `/academic-management/shifts-entries?limit=${limit}`,
  );
  console.log("✅  Entries value :", res.data);
  return res.data?.success ? res.data : {};
};

// PATCH - method
export const updateShiftAPI = async ({ shiftId, payload }) => {
  console.log("inside mutation session id : ", shiftId, payload);
  const res = await axiosPrivate.patch(
    `/academic-management/shift/${shiftId}`,
    payload,
  );
  console.log("updateShiftAPI", res.data);
  return res.data?.success ? res.data : [];
};

// DELETE - method
export const deleteShiftAPI = async (shiftId) => {
  if (!shiftId) throw new Error("❌ Shift ID is required");
  const res = await axiosPrivate.delete(
    `/academic-management/shift/${shiftId}`,
  );
  console.log("delete api : ", res.data);
  return res.data?.success ? res.data : [];
};
