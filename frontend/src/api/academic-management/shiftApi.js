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
export const fetchedPaginatedShifts = async (limit, skip) => {
  const res = await axiosPrivate.get(
    `/academic-management/shifts-paginated?limit=${limit}&skip=${skip}`,
  );
  console.log("paginated value and total", {
    data: res.data?.data,
    total: res.data?.total,
  });
  return res.data?.success
    ? { data: res.data?.data, total: res.data?.total }
    : { data: [], total: 0 };
};

// PATCH - method

// DELETE - method
export const deleteShiftAPI = async (shiftId) => {
  if (!shiftId) throw new Error("❌ Shift ID is required");
  const res = await axiosPrivate.delete(
    `/academic-management/shift/${shiftId}`,
  );
  console.log("delete api : ", res.data);
  return res.data?.success ? res.data : [];
};
