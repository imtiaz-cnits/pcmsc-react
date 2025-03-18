// 🛠 API calls and services

// to fetch classes
import axiosPrivate from "../../utils/axiosPrivate.jsx";

export const fetchClass = async () => {
  try {
    const res = await axiosPrivate.get("/academic-management/get-classes");
    return res.data;
  } catch (error) {
    console.error("Error in class api call: ", error);
    throw new Error("Failed to fetch classes! ");
  }
};

// 📝 to add class
export const addClass = async (payload) => {
  try {
    const res = await axiosPrivate.post(
      "/academic-management/add-class",
      payload,
    );
    return res.data;
  } catch (error) {
    console.error("Error in class api call: ", error);
    throw new Error("Failed to add class api call!");
  }
};
