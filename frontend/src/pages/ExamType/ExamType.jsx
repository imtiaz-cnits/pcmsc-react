import { FilePenLine, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import Shimmer from "../../components/Shimmer";
import {
  useAddExamType,
  useFetchPaginatedExamTypes,
} from "../../hook/useExamType";

const ExamType = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [examTypeName, setExamTypeName] = useState("");
  const [examTypeStatus, setExamTypeStatus] = useState("");

  const { mutate: addExamType } = useAddExamType();
  const {
    data: examTypes,
    isPending,
    isError,
    error,
  } = useFetchPaginatedExamTypes({ page, limit });

  useEffect(() => {
    document.body.style.overflow = isAddModalOpen ? "hidden" : "";
  }, [isAddModalOpen]);

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const payload = {
      examTypeName: examTypeName,
      label: examTypeStatus || "Active",
      status: examTypeStatus || "active",
    };

    console.log("payload : ", payload);
    console.log(addExamType);
    addExamType(payload);
  };

  useEffect(() => {
    console.log("exam types data : ", examTypes);
  }, [examTypes]);

  return (
    <>
      <Toaster position="top-center" richColors />

      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card">
              <div className="card-body">
                {/* <!-- Class heading Start --> */}
                <div className="exam-heading">
                  <h3 className="heading">Exam List</h3>
                  <button
                    className="create-cls-btn"
                    id="exmModalBtn"
                    onClick={() => setIsAddModalOpen(!isAddModalOpen)}
                  >
                    Add Exam Type
                  </button>
                </div>
                {/* <!-- Class heading End --> */}

                {/* <!-- Action Buttons --> */}
                <div className="button-wrapper mb-3">
                  {/* <!-- Search and Filter --> */}
                  <div className="input-group exam-group">
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
                    <div className="exam-search">
                      <input
                        style={{ width: "20%", margin: "0" }}
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Search Exam..."
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
                        <th>Exam Type Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isError ? (
                        { error }
                      ) : isPending ? (
                        <Shimmer count={5} />
                      ) : examTypes?.data?.length > 0 ? (
                        examTypes?.data?.map((item, index) => (
                          <tr key={item?._id}>
                            <td>
                              {String((page - 1) * limit + index + 1).padStart(
                                2,
                                "0",
                              )}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item?.examTypeName}
                            </td>
                            <td>{item?.label}</td>
                            <td>
                              <div id="action_btn">
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <button
                                    href="#"
                                    className="link editButton"
                                    data-modal="action-editmodal"
                                  >
                                    <FilePenLine style={{ color: "#1f4529" }} />
                                  </button>

                                  <button
                                    href="#"
                                    className="link custom-open-modal-btn openModalBtn deleteButton"
                                    data-modal="action-deletemodal"
                                  >
                                    <Trash style={{ color: "lightcoral" }} />
                                  </button>
                                </div>

                                {/* <!-- <button class="quick-view quickButton">
                            <i class="fa-regular fa-eye"></i>
                          </button> --> */}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        "not found"
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <!-- Pagination and Display Info --> */}
                <div className="my-3">
                  <span id="display-info">
                    {examTypes?.totalEntries
                      ? `Showing ${examTypes?.count} of ${examTypes?.totalEntries} entries`
                      : "Loading Entries...."}
                  </span>
                </div>

                <div id="pagination" className="pagination">
                  {page > 1 && (
                    <button
                      id="prevBtn"
                      className="btn"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                      Prev
                    </button>
                  )}

                  {[...Array(examTypes?.totalPages)].map((_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <Link
                        key={index}
                        href="#"
                        className={`page-link page-link--${pageNumber} ${page === pageNumber ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}

                  {page < examTypes?.totalPages && (
                    <button
                      id="nextBtn"
                      className="btn"
                      onClick={() =>
                        setPage((prev) =>
                          Math.min(prev + 1, examTypes?.totalPages),
                        )
                      }
                    >
                      Next
                    </button>
                  )}
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

        <!-- Exam Type Pop Up Modal Start --> */}
          {isAddModalOpen && (
            <div className="exam-type">
              <section id="exmModal" className="modal show">
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Add Exam Type</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Exam Type Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Exam Type Name"
                              value={examTypeName}
                              onChange={(e) => setExamTypeName(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <!-- Row 2 --> */}
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Exam Status *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Exam Status"
                              value={examTypeStatus}
                              onChange={(e) =>
                                setExamTypeStatus(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {/* <!-- Actions --> */}
                        <div className="form-actions">
                          <button
                            type="button"
                            id="exmClose"
                            className="button close closeBtn"
                            onClick={() => setIsAddModalOpen(false)}
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
            </div>
          )}
          {/* <!-- Create Class Pop Up Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};
export default ExamType;
