import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "../../assets/css/all-modal.css";
import {
  useAddSections,
  useDeleteSection,
  useFetchPaginatedShifts,
  useUpdateSection,
} from "../../hook/useSection.js";

const Section = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [section, setSection] = useState("");
  const [sectionStatus, setSectionStatus] = useState("");
  const [page, setPage] = useState(1);
  const [editSectionId, setEditSectionId] = useState("");
  const [warn, setWarn] = useState("");
  const { mutate: addSection } = useAddSections();
  const { mutate: updateSection } = useUpdateSection();
  const { mutate: deleteSection } = useDeleteSection();

  const {
    data: sections,
    isPending,
    isError,
    error,
  } = useFetchPaginatedShifts(page);

  useEffect(() => {
    if (isAddModalOpen) {
      document.body.style.overflow = "hidden"; // ✅ Disable scrolling when modal is open
    } else {
      document.body.style.overflow = ""; // ✅ Enable scrolling when modal is closed
    }
  }, [isAddModalOpen]);

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = "hidden"; // ✅ Disable scrolling when modal is open
    } else {
      document.body.style.overflow = ""; // ✅ Enable scrolling when modal is closed
    }
  }, [isEditModalOpen]);

  // add class modal options
  const sectionStatusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  //
  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!section.trim()) {
      setWarn("name is required and cannot be empty");
      return;
    }

    const label =
      sectionStatus?.charAt(0).toUpperCase() + sectionStatus.slice(1);

    const payload = {
      name: section,
      status: sectionStatus || "active",
      label: label || "Active",
    };

    console.log("before payload : ", payload);

    console.log("payload", payload);
    addSection(payload);
    setWarn("");
    setSection("");
    setSectionStatus("");
  };

  const handleEditClick = (e, item) => {
    e.preventDefault();
    console.log("Edit button clicked for section:", item);
    console.log("Edit button clicked for section id :", item?._id);
    setEditSectionId(item?._id);
    setSection(item?.name);
    setSectionStatus(item?.status);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!section) {
      setWarn("Section name is required and cannot be empty");
      return;
    }

    const label =
      sectionStatus?.charAt(0).toUpperCase() + sectionStatus.slice(1);

    const updatedPayload = {
      name: section,
      label: label || "Active",
      status: sectionStatus || "active",
    };

    updateSection({ sectionId: editSectionId, payload: updatedPayload });
    setSection("");
    setSectionStatus("");
    setWarn("");
    setEditSectionId("");
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleSectionDelete = (e, item) => {
    e.preventDefault();
    console.log("after deleting  section value : ", item);
    deleteSection(item?._id, {
      onSuccess: () => {
        if (sections?.data?.length === 1 && page > 1) {
          setPage((prev) => prev - 1);
        }
      },
    });
  };

  useEffect(() => {
    console.log("edit modal value ", isEditModalOpen);
  }, [isEditModalOpen]);

  //todo shimmer effect
  if (isPending) return <>Loading ...</>;

  if (isError) {
    if (error instanceof Error) {
      console.log("inside section list ", error);

      return (
        <p>{error.response?.data?.message}</p> || <p>{error.message}</p> || (
          <p>Something went wrong. Please! try again later!</p>
        )
      );
    }
  }

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card">
              <div className="card-body">
                {/* <!-- Class heading Start --> */}
                <div className="class-heading">
                  <h3 className="heading">Section List</h3>
                  <button
                    className="create-cls-btn"
                    onClick={() => setIsAddModalOpen(!isAddModalOpen)}
                  >
                    Add Section
                  </button>
                </div>
                {/* <!-- Class heading End --> */}

                {/* <!-- Action Buttons --> */}
                <div className="button-wrapper mb-3">
                  {/* <!-- Search and Filter --> */}
                  <div className="input-group class-group">
                    {/* <!-- Entries per page --> */}
                    <div>
                      <div className="entries-page">
                        <label htmlFor="entries" className="mr-2">
                          Entries:
                        </label>
                        <div className="select-container dropdown-button">
                          <select
                            id="entries"
                            className="form-control"
                            style={{ width: "auto" }}
                          >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          <span className="dropdown-icon">&#9662;</span>
                          {/* <!-- Dropdown icon --> */}
                        </div>
                      </div>
                    </div>
                    <div className="class-search">
                      <input
                        style={{ width: "20%", margin: "0" }}
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Search Class..."
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Table --> */}
                <div className="table-wrapper">
                  <table
                    id="printTable"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Sl No:</th>
                        <th>Section Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sections?.data &&
                        sections?.data?.map((item, index) => {
                          return (
                            <tr key={item?._id}>
                              <td>{(page - 1) * 5 + index + 1}</td>
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "20px",
                                }}
                              >
                                {item?.nameLabel}
                              </td>
                              <td>{item?.label}</td>
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "20px",
                                }}
                              >
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => handleEditClick(e, item)}
                                >
                                  <FaRegEdit
                                    style={{
                                      color: "lightgreen",
                                      fontSize: "25px",
                                    }}
                                  />
                                </button>
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: 0,
                                  }}
                                  onClick={(e) => handleSectionDelete(e, item)}
                                >
                                  <FaRegTrashAlt
                                    style={{
                                      color: "red",
                                      fontSize: "25px",
                                    }}
                                  />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                {/* <!-- Pagination and Display Info --> */}
                <div className="my-3">
                  <span id="display-info"></span>
                </div>

                <div id="pagination" className="pagination">
                  <button
                    id="prevBtn"
                    className="btn"
                    onClick={() =>
                      setPage((prevState) => Math.max(prevState - 1, 1))
                    }
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  {page} of {sections?.totalPages}
                  <button
                    id="nextBtn"
                    className="btn"
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(prev + 1, sections?.totalPages),
                      )
                    }
                    disabled={page === sections?.totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End -->

        <!-- Table Action Button Modal Start -->
        <!-- Confirmation Modal Start --> */}
          <div id="confirmationModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-buttons">
                <button id="confirmYes">Yes</button>
                <button id="confirmNo">No</button>
              </div>
            </div>
          </div>
          {/* <!-- Confirmation Modal End -->
        <!-- Edit Modal Start --> */}
          <div id="editModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-buttons">
                <button id="editYes">Yes</button>
                <button id="editNo">No</button>
              </div>
            </div>
          </div>
          {/* <!-- Edit Modal End -->
        <!-- Quick View Modal Start -->
        <!-- <div id="quickViewModal" class="modal">
          <div class="modal-content">
            <p>Quick View</p>
            <div class="modal-buttons">
              <button id="quickClose">X</button>
            </div>
          </div>
        </div> -->
        <!-- Quick View Modal End -->
        <!-- Table Action Button Modal Start -->

        <!-- Section Add Pop Up Modal Start --> */}
          <div className="section-modal">
            {isAddModalOpen && (
              <section
                id="createClassModal"
                className="modal migrateModal show"
              >
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Add Section</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div
                          className="form-row"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Section Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Section Name"
                              value={section}
                              onChange={(e) => setSection(e.target.value)}
                            />
                          </div>

                          {warn && (
                            <p style={{ color: "lightcoral" }}>{warn}</p>
                          )}

                          <div className="form-group">
                            <label htmlFor="search-students">Status *</label>
                            <select
                              value={sectionStatus}
                              onChange={(e) => setSectionStatus(e.target.value)}
                            >
                              <option value="" disabled>
                                Select status
                              </option>
                              {sectionStatusOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* <!-- Actions --> */}
                        <div className="form-actions">
                          <button
                            type="button"
                            id="classBtn"
                            className="button close closeBtn"
                            onClick={() => setIsAddModalOpen(!isAddModalOpen)}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="button save"
                            onClick={handleAddSubmit}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
          {/* <!-- Section Add Pop Up Modal Start --> */}

          {/* <!-- Section Edit Pop Up Modal Start --> */}

          <div className="section-modal">
            {isEditModalOpen && (
              <section
                id="createClassModal"
                className="modal migrateModal show"
              >
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Update Section</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div
                          className="form-row"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Section Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Section Name"
                              value={section}
                              onChange={(e) => setSection(e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="search-students">Status *</label>
                            <select
                              value={sectionStatus}
                              onChange={(e) => setSectionStatus(e.target.value)}
                            >
                              <option value="" disabled>
                                Select status
                              </option>
                              {sectionStatusOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* <!-- Actions --> */}
                        <div className="form-actions">
                          <button
                            type="button"
                            id="classBtn"
                            className="button close closeBtn"
                            onClick={() => setIsEditModalOpen(!isEditModalOpen)}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="button save"
                            onClick={handleEditSubmit}
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* <!-- Section Edit Pop Up Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
      <Toaster />
    </>
  );
};
export default Section;
