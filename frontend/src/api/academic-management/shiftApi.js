// to add

// to fetch all shifts
import axiosPrivate from "../../utils/axiosPrivate.jsx";

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
