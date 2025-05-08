// to add
import axiosPrivate from "../../utils/axiosPrivate.jsx";

export const addSectionAPI = async (payload) => {
  const res = await axiosPrivate.post(
    "/academic-management/add-section",
    payload,
  );
  console.log("value of and type of ,", res.data, typeof res.data);
  return res.data?.success ? res.data : [];
};

// ✅  GET - method
export const fetchedSectionsAPI = async () => {
  const res = await axiosPrivate.get("/academic-management/sections");
  console.log("🚀 fetchedSectionsAPI api : ", res.data);
  return res.data?.success ? res.data : [];
};

//with paginated
export const fetchedPaginatedSections = async (page, limit, keyword) => {
  const res = await axiosPrivate.get(`/academic-management/section-paginated`, {
    params: { page, limit, keyword },
  });
  console.log("paginated value and total", res.data);
  return res.data?.success ? res.data : {};
};

// PATCH - method
export const updateSectionAPI = async ({ sectionId, payload }) => {
  console.log("inside mutation section id : ", sectionId);
  const res = await axiosPrivate.patch(
    `/academic-management/section/${sectionId}`,
    payload,
  );
  console.log("full section api : ", res.data);
  return res.data?.success ? res.data : [];
};

// DELETE - method
export const deleteSectionAPI = async (sectionId) => {
  if (!sectionId) throw new Error("❌ Section ID is required");
  const res = await axiosPrivate.delete(
    `/academic-management/section/${sectionId}`,
  );
  console.log("delete api : ", res.data);
  return res.data?.success ? res.data : [];
};
