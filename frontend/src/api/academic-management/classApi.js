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
  try {
    const res = await axiosPrivate.delete(
      `/academic-management/classes/${classId}`,
    );
    return res.data.success ? res.data.deletedItem : null;
  } catch (error) {
    console.error("inside deleteClass ", error);
    toast.error("Failed to delete class");
    throw new Error(error.response?.data?.message || "Error deleting class");
  }
};

export const addClassAPI = async (payload) => {
  try {
    const response = await axiosPrivate.post(
      "/academic-management/add-class",
      payload,
    );
    return response.data; // Expected format: { success: true, message: 'Class added successfully', newClass: {...} }
  } catch (error) {
    throw error; // This will be caught in the mutation hook's onError
  }
};
