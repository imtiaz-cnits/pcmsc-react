import { FilePenLine, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import ShimmerTable from "../../components/shimmer/ShimmerTable";
import {
  useAddExamType,
  useDeleteExamType,
  useFetchPaginatedExamTypes,
  useUpdateExamType,
} from "../../hook/useExamType";
import EditExamType from "./EditExamType";

const ExamType = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [isPageShifting, setIsPageShifting] = useState(false);
  const [editClickID, setEditClickID] = useState("");
  const [deletedID, setDeletedID] = useState("");
  const [examTypeName, setExamTypeName] = useState("");
  const [examTypeStatus, setExamTypeStatus] = useState("");
  const { mutate: addExamType } = useAddExamType();
  const { mutate: updateExamType } = useUpdateExamType();
  const { mutate: deleteExamType } = useDeleteExamType();

  const {
    data: examTypes,
    isPending,
    isError,
    error,
  } = useFetchPaginatedExamTypes({ page, limit, keyword });

  useEffect(() => {
    document.body.style.overflow = isAddModalOpen ? "hidden" : "";
  }, [isAddModalOpen]);

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

    const payload = {
      examTypeName: examTypeName,
      label: examTypeStatus || "Active",
      status: examTypeStatus || "Active",
    };

    console.log("payload : ", payload);
    console.log(addExamType);
    addExamType(payload);

    setExamTypeName("");
    setExamTypeStatus("");
  };

  const handleEditModalClose = (e) => {
    e.preventDefault();
    setExamTypeName("");
    setExamTypeStatus("");
    setIsEditModalOpen(false);
  };

  const handleEditClickID = (e, item) => {
    e.preventDefault();
    console.log(
      "edited click id : ",
      item?._id,
      item?.examTypeName,
      item?.label,
    );
    setEditClickID(item?._id);
    setExamTypeName(item?.examTypeName);
    setExamTypeStatus(item?.status);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const payload = {
      examTypeName: examTypeName,
      label: examTypeStatus || "Active",
      status: examTypeStatus || "Active",
    };
    console.log("handle pyaload : ", payload, editClickID);
    updateExamType({ id: editClickID, payload });
    setExamTypeName("");
    setExamTypeStatus("");
  };

  const handleDeleteClick = (e, item) => {
    e.preventDefault();
    console.log("item id : ", item);
    setDeletedID(item?._id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    deleteExamType(deletedID, {
      onSuccess: () => {
        if (examTypes?.count === 1 && page > 1) {
          setIsPageShifting(true);
          setTimeout(() => {
            setIsPageShifting(false);
            setPage((prev) => Math.max(prev - 1, 1));
          }, 500);
        }
      },
    });
    setIsDeleteModalOpen(false);
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
                            value={limit}
                            onChange={(e) => {
                              e.preventDefault();
                              setLimit(e.target.value);
                              setPage(1);
                            }}
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
                    <div className="exam-search">
                      <input
                        style={{ width: "20%", margin: "0" }}
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Search Exam..."
                        value={keyword}
                        onChange={(e) => {
                          e.preventDefault();
                          setKeyword(e.target.value);
                          setPage(1);
                        }}
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
                      {isError && examTypes?.totalEntries <= 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            style={{ textAlign: "center", color: "#1f4529" }}
                          >
                            {error?.response?.data?.message ||
                              error?.message ||
                              "Something went wrong. Please try again!"}
                          </td>
                        </tr>
                      ) : isPending || isPageShifting ? (
                        <ShimmerTable rows={5} cols={4} />
                      ) : (
                        examTypes?.totalEntries > 0 &&
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
                                    onClick={(e) => handleEditClickID(e, item)}
                                  >
                                    <FilePenLine style={{ color: "#1f4529" }} />
                                  </button>

                                  <button
                                    href="#"
                                    className="link custom-open-modal-btn openModalBtn deleteButton"
                                    data-modal="action-deletemodal"
                                    onClick={(e) => handleDeleteClick(e, item)}
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
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <!-- Pagination and Display Info --> */}
                {isPending || (
                  <div className="my-3">
                    <span id="display-info">
                      {examTypes?.totalEntries
                        ? `Showing ${Math.min(limit * examTypes?.currentPage, examTypes?.totalEntries)} of ${examTypes?.totalEntries} entries`
                        : ""}
                    </span>
                  </div>
                )}

                {examTypes?.totalPages > 1 && !isPending && (
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
                )}
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
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
                  <button id="confirmYes" onClick={handleDeleteSubmit}>
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
                            onClick={(e) => {
                              e.preventDefault();
                              setExamTypeName("");
                              setExamTypeStatus("");
                              setIsAddModalOpen(false);
                            }}
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

          {/* Edit MOdal Start  */}
          <EditExamType
            examTypeName={examTypeName}
            setExamTypeName={setExamTypeName}
            examTypeStatus={examTypeStatus}
            setExamTypeStatus={setExamTypeStatus}
            isEditModalOpen={isEditModalOpen}
            handleEditModalClose={handleEditModalClose}
            handleEditSubmit={handleEditSubmit}
          />
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};
export default ExamType;
