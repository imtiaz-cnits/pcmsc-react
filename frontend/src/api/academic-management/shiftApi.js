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

// GET - method

// without pagination
export const fetchedShifts = async () => {
  const res = await axiosPrivate.get("/academic-management/shifts");
  return res.data?.success ? res.data?.data : [];
};

//with paginated
export const fetchedPaginatedShifts = async (page) => {
  const res = await axiosPrivate.get(
    `/academic-management/shifts-paginated?page=${page}`,
  );
  console.log("paginated value and total", res.data);
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
export const updateShiftAPI = async ({ shiftId, updatedData }) => {
  console.log("inside mutation session id : ", shiftId);
  const res = await axiosPrivate.patch(
    `/academic-management/shift/${shiftId}`,
    updatedData,
  );
  console.log("mutation updated", res.data);
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
