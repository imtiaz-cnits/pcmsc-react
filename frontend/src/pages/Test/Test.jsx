import { useState, useEffect } from "react";
import "../../assets/css/all-modal.css";
import {
  useAddShifts,
  useDeleteShift,
  useFetchPaginatedShifts,
  useUpdateShift,
} from "../../hook/useShift";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const Test = () => {
  const [limit] = useState(5);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [shift, setShift] = useState("");
  const [shiftStatus, setShiftStatus] = useState("");
  const [warn, setWarn] = useState("");
  // const { data: shifts, isPending, isError, error } = useFetchShifts();
  const { mutate: addShift } = useAddShifts();
  const { mutate: deleteShift } = useDeleteShift();
  const skip = (page - 1) * limit; // calculate skip
  const { data, isPending, isError, error } = useFetchPaginatedShifts(
    limit,
    skip,
  );
  const { data: updateShift } = useUpdateShift();
  const { data: shifts, total } = data || {};
  console.log("shifts value", shifts);
  console.log("total value : ", total);

  // useEffect(() => {
  //   if (shifts?.length !== 0 && page > 1 && total > 0) {
  //     setPage((old) => old - 1);
  //   }
  // }, [shifts, page, total]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // ✅ Disable scrolling when modal is open
    } else {
      document.body.style.overflow = ""; // ✅ Enable scrolling when modal is closed
    }
  }, [isModalOpen]);

  const shiftStatusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  // handle pop modal save button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shift.trim()) {
      setWarn("Shift name is required and cannot be empty");
      return;
    }

    console.log("status", shiftStatus);

    const label = shiftStatus.charAt(0).toUpperCase() + shiftStatus.slice(1);

    const payload = {
      shift,
      status: shiftStatus,
      label: label,
    };

    console.log("payload", payload);
    addShift(payload);
    setWarn("");
    setShift("");
    setShiftStatus("");
  };

  //todo shimmer effect
  if (isPending) return <>Loading ...</>;

  if (isError) {
    if (error instanceof Error) {
      console.log("inside shifts list ", error);

      return (
        <p>{error.response?.data?.message}</p> || <p>{error.message}</p> || (
          <p>Something went wrong. Please! try again later!</p>
        )
      );
    }
  }
  // Ensure that `total` is a valid number and use fallback to 0 if not
  const validTotal = typeof total === "number" && !isNaN(total) ? total : 0;

  // Calculate total pages safely
  const totalPages = validTotal ? Math.ceil(validTotal / limit) : 0;

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
                  <h3 className="heading">Shift List</h3>
                  <button
                    className="create-cls-btn"
                    onClick={() => setIsModalOpen(true)}
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

                        <th>Shift Name</th>
                        <th>Status Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shifts &&
                        shifts?.map((item, index) => {
                          return (
                            <tr
                              key={item?._id}
                              // style={{
                              //   transition: "opacity 0.3s ease",
                              //   opacity: shift.isDeleting ? 0.5 : 1,
                              // }}
                            >
                              <td>{(page - 1) * limit + index + 1}</td>
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "20px",
                                }}
                              >
                                {item?.name}
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
                                  onClick={() => deleteShift(item?._id)}
                                >
                                  <FaRegTrashAlt
                                    style={{ color: "red", fontSize: "25px" }}
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
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  {page}
                  <button
                    id="nextBtn"
                    className="btn"
                    onClick={() =>
                      setPage((old) => Math.min(old + 1, totalPages))
                    }
                    disabled={page === totalPages}
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
          {/* <!-- Table End --> */}

          {/* <!-- Table Action Button Modal Start -->
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
        <!-- Quick View Modal Start --> */}
          {/* <!-- <div id="quickViewModal" class="modal">
          <div class="modal-content">
            <p>Quick View</p>
            <div class="modal-buttons">
              <button id="quickClose">X</button>
            </div>
          </div>
        </div> --> */}
          {/* <!-- Quick View Modal End -->
        <!-- Table Action Button Modal Start -->

        <!-- Shift Pop Up Modal Start --> */}
          <div className="shift-modal">
            {isModalOpen && (
              <section
                id="createClassModal"
                className="modal migrateModal show"
              >
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Add Shift</h3>
                      <form>
                        {/* ✅ Shift Name Input */}
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Shift Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Shift Name"
                              value={shift}
                              onChange={(e) => setShift(e.target.value)}
                            />
                          </div>
                        </div>

                        {warn && <p style={{ color: "lightcoral" }}>{warn}</p>}

                        {/* ✅ Shift Status Input */}

                        <div className="form-group">
                          <label htmlFor="search-students">Status *</label>
                          <select
                            value={shiftStatus}
                            onChange={(e) => setShiftStatus(e.target.value)}
                          >
                            <option value="" disabled>
                              Select status
                            </option>
                            {shiftStatusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* ✅ Buttons for modal actions */}
                        <div className="form-actions">
                          <button
                            type="button"
                            className="button close closeBtn"
                            onClick={() => setIsModalOpen(false)} // ✅ Close modal on click
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="button save"
                            onClick={handleSubmit}
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
          {/* <!-- Shift Pop Up Modal Start --> */}

          {/* <!-- Shift Edit Pop Up Modal Start --> */}

          {/*https://chatgpt.com/share/67e10b2a-bb58-8003-8bb9-b292d798e9f4*/}

          {/* <!-- Shift Edit Pop Up Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
      <Toaster />
    </>
  );
};
export default Test;
