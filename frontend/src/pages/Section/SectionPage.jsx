import { useEffect, useState } from "react";
import "../../assets/css/all-modal.css";
import {
  useAddSections,
  useDeleteSection,
  useFetchPaginatedSections,
  useUpdateSection,
} from "../../hook/useSection.js";
import { FilePenLine, Trash } from "lucide-react";
import { Toaster } from "sonner";
import ShimmerTable from "../../components/shimmer/ShimmerTable.jsx";

const SectionPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [section, setSection] = useState("");
  const [sectionStatus, setSectionStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [editSectionId, setEditSectionId] = useState("");
  const [deletedID, setDeletedID] = useState("");
  const [warn, setWarn] = useState("");
  const { mutate: addSection } = useAddSections();
  const { mutate: updateSection } = useUpdateSection();
  const { mutate: deleteSection } = useDeleteSection();

  const {
    data: sections,
    isPending,
    isError,
    error,
  } = useFetchPaginatedSections({ page, limit, keyword });

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

  const entriesOptions = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 75, label: "75" },
    { value: 100, label: "100" },
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
    setIsAddModalOpen(false);
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
    setIsEditModalOpen(false);
  };

  const handleDeletedID = (e, item) => {
    e.preventDefault();
    console.log("deleted id : ", item?._id);
    setDeletedID(item?._id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleSectionDelete = (e) => {
    e.preventDefault();
    deleteSection(deletedID, {
      onSuccess: () => {
        if (sections?.data?.length === 1 && page > 1) {
          setPage((prev) => prev - 1);
        }
      },
    });
    setKeyword("");
    setIsDeleteModalOpen(false);
  };

  const handleSearchQuery = (e) => {
    e.preventDefault();
    setPage(1);
    setKeyword(e.target.value);
  };

  return (
    <>
      <Toaster position="top-right" richColors />

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
                            value={limit}
                            onChange={(e) => {
                              e.preventDefault();
                              setLimit(Number(e.target.value));
                              setPage(1);
                              setKeyword("");
                            }}
                            style={{ width: "auto" }}
                          >
                            {entriesOptions.map((item, index) => (
                              <option key={index} value={item.value}>
                                {item.label}
                              </option>
                            ))}
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
                        placeholder="Search Section..."
                        value={keyword}
                        onChange={handleSearchQuery}
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
                      {isPending ? (
                        <ShimmerTable rows={limit} cols={4} />
                      ) : isError ? (
                        <tr>
                          <td colSpan="4">
                            <div className="error-msg">
                              {error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong. Please try again!"}
                            </div>
                          </td>
                        </tr>
                      ) : sections?.totalEntries <= 0 ? (
                        <tr>
                          <td colSpan={4} style={{ textAlign: "center" }}>
                            No Entries found
                          </td>
                        </tr>
                      ) : (
                        sections?.data?.length > 0 &&
                        sections?.data?.map((item, idx) => {
                          return (
                            <tr key={item?._id}>
                              <td>
                                {String((page - 1) * limit + idx + 1).padStart(
                                  2,
                                  "0",
                                )}
                              </td>
                              <td>{item?.nameLabel}</td>
                              <td>{item?.label}</td>

                              <td>
                                <div id="action_btn">
                                  <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                      href="#"
                                      className="link editButton"
                                      data-modal="action-editmodal"
                                      style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                      }}
                                      onClick={(e) => handleEditClick(e, item)}
                                    >
                                      <FilePenLine
                                        style={{ color: "#1f4529" }}
                                      />
                                    </button>

                                    <button
                                      href="#"
                                      className="link custom-open-modal-btn openModalBtn deleteButton"
                                      data-modal="action-deletemodal"
                                      style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <Trash
                                        style={{ color: "lightcoral" }}
                                        onClick={(e) =>
                                          handleDeletedID(e, item)
                                        }
                                      />
                                    </button>
                                  </div>

                                  {/* <!-- <button class="quick-view quickButton">
                            <i class="fa-regular fa-eye"></i>
                          </button> --> */}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <!-- Pagination and Display Info --> */}
                {isPending || (
                  <div className="my-3">
                    <span id="display-info">
                      {sections?.totalEntries
                        ? `Showing ${Math.min(
                            limit * sections?.currentPage,
                            sections?.totalEntries,
                          )} of ${sections?.totalEntries} entries`
                        : ""}
                    </span>
                  </div>
                )}

                {sections?.totalPages > 1 && !isPending && (
                  <div id="pagination" className="pagination">
                    {page > 1 && (
                      <button
                        id="prevBtn"
                        className="btn"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                      >
                        Prev
                      </button>
                    )}

                    {`${page} of ${Number(sections?.totalPages)}`}

                    {page < sections?.totalPages && (
                      <button
                        id="nextBtn"
                        className="btn"
                        onClick={() =>
                          setPage((prev) =>
                            Math.min(prev + 1, sections?.totalPages),
                          )
                        }
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End -->

        <!-- Table Action Button Modal Start -->
        <!-- Confirmation Modal Start --> */}
          {isDeleteModalOpen && (
            <div
              id="confirmationModal"
              className="modal"
              style={{ display: "flex" }}
            >
              <div className="modal-content">
                <p>Are you sure you want to delete this item?</p>
                <div className="modal-buttons">
                  <button id="confirmYes" onClick={handleSectionDelete}>
                    Yes
                  </button>
                  <button
                    id="confirmNo"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
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
    </>
  );
};
export default SectionPage;
