import axiosPrivate from "../../utils/axiosPrivate.jsx";
import toast from "react-hot-toast";

// POST - method

export const addClassAPI = async (payload) => {
  const res = await axiosPrivate.post();
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
