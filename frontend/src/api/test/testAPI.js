// ✅  GET - method (paginated)
import axiosPrivate from "../../utils/axiosPrivate.jsx";

export const fetchOkAPI = async (page, limit) => {
  console.log("fetchOkAPI - page , limit :", page, limit);
  const res = await axiosPrivate().get(
    `/test/test-paginated?page=${page}&limit=${limit}`,
  );
  console.log(" fetchOkAPI -paginated value and total", res.data);
  return res.data?.success ? res.data : [];
};
