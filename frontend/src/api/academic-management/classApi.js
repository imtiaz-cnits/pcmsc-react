import axiosPrivate from "../../utils/axiosPrivate.jsx";
import toast from "react-hot-toast";

export const fetchClass = async () => {
  try {
    const res = await axiosPrivate.get("/academic-management/classes");
    console.log("in fetch  : ", res.data.data);

    // if (!res.data.success) {
    //   throw new Error(res.data.message || "Failed to fetch classes");
    // }

    return res.data.success ? res.data.data : [];
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch classes");
    throw new Error(error.response?.data?.message || "Error fetching classes");
  }
};

// to delete

export const deleteClass = async (classId) => {
  const res = await axiosPrivate.delete(
    `/academic-management/class/${classId}`,
  );
  return res.data.success ? res.data.deletedItem : null;
};

export const addClassAPI = async (payload) => {
  const response = await axiosPrivate.post(
    "/academic-management/add-class",
    payload,
  );
  return response.data;
};
