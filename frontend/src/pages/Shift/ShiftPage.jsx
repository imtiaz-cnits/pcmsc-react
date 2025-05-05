import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import {
  useAddShifts,
  useDeleteShift,
  useFetchPaginatedShifts,
  useUpdateShift,
} from "../../hook/useShift.js";
import ShimmerTable from "../../components/shimmer/ShimmerTable.jsx";
import { FilePenLine, Trash } from "lucide-react";

const ShiftPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [shift, setShift] = useState("");
  const [shiftStatus, setShiftStatus] = useState("");
  const [editSectionId, setEditSectionId] = useState("");
  const [deletedID, setDeletedID] = useState("");
  const [warn, setWarn] = useState("");
  const { mutate: addSection } = useAddShifts();
  const { mutate: updateShift } = useUpdateShift();
  const { mutate: deleteSection } = useDeleteShift();

  const {
    data: shifts,
    isPending,
    isError,
    error,
  } = useFetchPaginatedShifts({ page, limit, keyword });

  useEffect(() => {
    document.body.style.overflow = isAddModalOpen ? "hidden" : "";
  }, [isAddModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "";
  }, [isEditModalOpen]);

  const shiftStatusOptions = [
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

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!shift.trim()) {
      setWarn("name is required and cannot be empty");
      return;
    }

    const label = shiftStatus?.charAt(0).toUpperCase() + shiftStatus.slice(1);

    const payload = {
      name: shift,
      status: shiftStatus || "active",
      label: label || "Active",
    };

    console.log("before payload : ", payload);

    console.log("payload", payload);
    addSection(payload);
    setWarn("");
    setShift("");
    setShiftStatus("");
    setIsAddModalOpen(false);
  };

  const handleEditClick = (e, item) => {
    e.preventDefault();
    setEditSectionId(item?._id);
    setShift(item?.name);
    setShiftStatus(item?.status);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!shift) {
      setWarn("Name cannot be empty");
      return;
    }

    const label = shiftStatus?.charAt(0).toUpperCase() + shiftStatus.slice(1);

    const updatedPayload = {
      name: shift,
      label: label || "Active",
      status: shiftStatus || "active",
    };

    console.log("now checker : ", updatedPayload);

    updateShift({ shiftId: editSectionId, payload: updatedPayload });
    setShift("");
    setShiftStatus("");
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
        if (shifts?.data?.length === 1 && page > 1) {
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
                  <h3 className="heading">Shift List</h3>
                  <button
                    className="create-cls-btn"
                    onClick={() => setIsAddModalOpen(!isAddModalOpen)}
                  >
                    Add Shift
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
                        placeholder="Search Shift..."
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
                        <th>Shift Name</th>
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
                      ) : shifts?.totalEntries <= 0 ? (
                        <tr>
                          <td colSpan={4} style={{ textAlign: "center" }}>
                            No Entries found
                          </td>
                        </tr>
                      ) : (
                        shifts?.data?.length > 0 &&
                        shifts?.data?.map((item, idx) => {
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
                      {shifts?.totalEntries
                        ? `Showing ${Math.min(
                            limit * shifts?.currentPage,
                            shifts?.totalEntries,
                          )} of ${shifts?.totalEntries} entries`
                        : ""}
                    </span>
                  </div>
                )}

                {shifts?.totalPages > 1 && !isPending && (
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

                    {`${page} of ${Number(shifts?.totalPages)}`}

                    {page < shifts?.totalPages && (
                      <button
                        id="nextBtn"
                        className="btn"
                        onClick={() =>
                          setPage((prev) =>
                            Math.min(prev + 1, shifts?.totalPages),
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
                      <h3>Add Shift</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div
                          className="form-row"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Shift Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Section Name"
                              value={shift}
                              onChange={(e) => setShift(e.target.value)}
                            />
                          </div>

                          {warn && (
                            <p style={{ color: "lightcoral" }}>{warn}</p>
                          )}

                          <div className="form-group">
                            <label htmlFor="search-students">Status *</label>
                            <select
                              value={shiftStatus}
                              onChange={(e) => setShiftStatus(e.target.value)}
                            >
                              <option value="" disabled>
                                Select status
                              </option>
                              {shiftStatusOptions.map((option, index) => (
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

          <div className="section-modal">
            {isEditModalOpen && (
              <section
                id="createClassModal"
                className="modal migrateModal show"
              >
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Update Shift</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div
                          className="form-row"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Shift Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Section Name"
                              value={shift}
                              onChange={(e) => setShift(e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="search-students">Status *</label>
                            <select
                              value={shiftStatus}
                              onChange={(e) => setShiftStatus(e.target.value)}
                            >
                              <option value="" disabled>
                                Select status
                              </option>
                              {shiftStatusOptions.map((option, index) => (
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
export default ShiftPage;
