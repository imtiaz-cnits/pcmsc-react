import { FilePenLine, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import ShimmerTable from "../../components/shimmer/ShimmerTable";
import {
  useAddGrade,
  useDeleteGrading,
  useFetchPaginatedGrade,
  useUpdateGrading,
} from "../../hook/useGrade";
import EditGradePage from "./EditGradePage";

const GradePage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [editClickID, setEditClickID] = useState("");
  const [deletedID, setDeletedID] = useState("");
  const [gradeName, setGradeName] = useState("");
  const [gradePoint, setGradePoint] = useState("");
  const [totalSubjectMark, setTotalSubjectMark] = useState("");
  const [markFrom, setMarkFrom] = useState("");
  const [markUpTo, setMarkUpTo] = useState("");

  const { mutate: addGrading } = useAddGrade();
  const { mutate: updateGrading } = useUpdateGrading();
  const { mutate: deleteGrade, isPending: isDeletePending } =
    useDeleteGrading();
  const {
    data: grades,
    isPending,
    isError,
    error,
  } = useFetchPaginatedGrade({ page, limit, keyword });

  // ✅ Enable-Disable scrolling when modal is open-close
  useEffect(() => {
    document.body.style.overflow = isAddModalOpen ? "hidden" : "";
  }, [isAddModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "";
  }, [isEditModalOpen]);

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

    if (
      isNaN(gradePoint) ||
      isNaN(totalSubjectMark) ||
      isNaN(markFrom) ||
      isNaN(markUpTo)
    ) {
      alert("Grade point and total marks must be valid numbers.");
      return;
    }

    const payload = {
      gradeName: gradeName,
      totalSubjectMark: Number(totalSubjectMark),
      markFrom: Number(markFrom),
      markUpTo: Number(markUpTo),
      gradePoint: Number(gradePoint),
    };

    console.log("payload", payload);
    addGrading(payload);
    setGradeName("");
    setTotalSubjectMark("");
    setMarkFrom("");
    setMarkUpTo("");
    setGradePoint("");
  };

  const handleEditClickID = (e, item) => {
    e.preventDefault();
    console.log("edited click id : ", item);
    setEditClickID(item?._id);
    setGradeName(item?.gradeName);
    setGradePoint(item?.gradePoint);
    setMarkFrom(item?.markFrom);
    setMarkUpTo(item?.markUpTo);
    setTotalSubjectMark(item?.totalSubjectMark);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (
      isNaN(gradePoint) ||
      isNaN(totalSubjectMark) ||
      isNaN(markFrom) ||
      isNaN(markUpTo)
    ) {
      alert("Grade point and total marks must be valid numbers.");
      return;
    }

    const payload = {
      gradeName: gradeName,
      totalSubjectMark: Number(totalSubjectMark),
      markFrom: Number(markFrom),
      markUpTo: Number(markUpTo),
      gradePoint: Number(gradePoint),
    };
    updateGrading(
      { id: editClickID, payload },
      {
        onSuccess: () => {
          setGradeName("");
          setTotalSubjectMark("");
          setMarkFrom("");
          setMarkUpTo("");
          setGradePoint("");
          setIsEditModalOpen(false);
        },
      },
    );

    console.log("handle pyaload : ", payload, editClickID);
  };

  const handleDeletedID = (e, item) => {
    e.preventDefault();
    console.log("deleted id : ", item?._id);
    setDeletedID(item?._id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteSubject = (e) => {
    e.preventDefault();
    console.log("deleted id : ", deletedID);
    deleteGrade(deletedID);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card">
              <div className="card-body">
                {/* <!-- className heading Start --> */}
                <div className="exam-heading">
                  <h3 className="heading">Grade List</h3>
                  <button
                    className="create-cls-btn"
                    id="exmModalBtn"
                    onClick={() => setIsAddModalOpen(!isAddModalOpen)}
                  >
                    Add Grade
                  </button>
                </div>
                {/* <!-- className heading End --> */}

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
                        style={{ width: "20%", margin: 0 }}
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Search Subject..."
                        value={keyword}
                        onChange={(e) => {
                          e.preventDefault;
                          setKeyword(e.target.value);
                          setPage(1);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Table --> */}
                <div className="table-wrapper grade-table-wrapper">
                  <table
                    id="printTable"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Sl No:</th>
                        <th>Grade Name</th>
                        <th>Grade Point</th>
                        <th>Total Sub Mark</th>
                        <th>Mark Form</th>
                        <th>Mark Up To</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isPending || isDeletePending ? (
                        <ShimmerTable rows={limit} cols={7} />
                      ) : isError ? (
                        <tr>
                          <td colSpan="7">
                            <div className="error-msg">
                              {error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong. Please try again!"}
                            </div>
                          </td>
                        </tr>
                      ) : grades?.totalEntries <= 0 ? (
                        <tr>
                          <td colSpan={10} style={{ textAlign: "center" }}>
                            Not found
                          </td>
                        </tr>
                      ) : (
                        grades?.data?.length > 0 &&
                        grades?.data?.map((item, idx) => (
                          <tr key={item?._id}>
                            <td>
                              {" "}
                              {String((page - 1) * limit + idx + 1).padStart(
                                2,
                                "0",
                              )}
                            </td>
                            <td>{item?.gradeName}</td>
                            <td>{item?.gradePoint}</td>
                            <td>{item?.totalSubjectMark}</td>
                            <td>{item?.markFrom}</td>
                            <td>{item?.markUpTo}</td>

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
                                  >
                                    <Trash
                                      style={{ color: "lightcoral" }}
                                      onClick={(e) => handleDeletedID(e, item)}
                                    />
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
                      {grades?.totalEntries
                        ? `Showing ${Math.min(
                            limit * grades?.currentPage,
                            grades?.totalEntries,
                          )} of ${grades?.totalEntries} entries`
                        : ""}
                    </span>
                  </div>
                )}
                {/* <div id="pagination" className="pagination">
                  <button id="prevBtn" className="btn">
                    Prev
                  </button>
                  <a href="#" className="page-link page-link--1">
                    1
                  </a>
                  <a href="#" className="page-link page-link--2">
                    2
                  </a>
                  <a href="#" className="page-link page-link--3">
                    3
                  </a>
                  <button id="nextBtn" className="btn">
                    Next
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End -->

        <!-- Table Action Button Modal Start -->
        <!-- Confirmation Modal Start -->
        <div id="confirmationModal" className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-buttons">
              <button id="confirmYes">Yes</button>
              <button id="confirmNo">No</button>
            </div>
          </div>
        </div>

        
        <!-- Confirmation Modal End -->
        <!-- Edit Modal Start --> */}

          {isDeleteModalOpen && (
            <div
              id="confirmationModal"
              className="modal"
              style={{ display: "flex" }}
            >
              <div className="modal-content">
                <p>Are you sure you want to delete this item?</p>
                <div className="modal-buttons">
                  <button id="confirmYes" onClick={handleDeleteSubject}>
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
        <!-- <div id="quickViewModal" className="modal">
          <div className="modal-content">
            <p>Quick View</p>
            <div className="modal-buttons">
              <button id="quickClose">X</button>
            </div>
          </div>
        </div> -->
        <!-- Quick View Modal End -->
        <!-- Table Action Button Modal Start -->

        <!-- Grade Pop Up Modal Start --> */}
          {isAddModalOpen && (
            <div className="grade-modal">
              <section id="exmModal" className="modal show">
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Add Grade</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-6">
                            <label htmlFor="shift">Grade Name *</label>
                            <input
                              type="text"
                              placeholder="Type Name"
                              value={gradeName}
                              onChange={(e) => setGradeName(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-lg-6">
                            <label htmlFor="shift">Grade Point *</label>
                            <input
                              type="text"
                              placeholder="Type Point"
                              value={gradePoint}
                              onChange={(e) => setGradePoint(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <!-- Row 2 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-6">
                            <label htmlFor="shift">Mark Form *</label>
                            <input
                              type="text"
                              placeholder="Type Form mark"
                              value={markFrom}
                              onChange={(e) => setMarkFrom(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-lg-6">
                            <label htmlFor="shift">Mark Up TO*</label>
                            <input
                              type="text"
                              placeholder="Type Up To"
                              value={markUpTo}
                              onChange={(e) => setMarkUpTo(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <!-- Row 3 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-6">
                            <label htmlFor="shift">Total Subject Mark *</label>
                            <input
                              type="number"
                              placeholder="Type Mark"
                              value={totalSubjectMark}
                              onChange={(e) =>
                                setTotalSubjectMark(e.target.value)
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
          {/* <!-- Grade Pop Up Modal Start --> */}
          {/* <!-- Grade Edit Pop Up Modal Start --> */}
          <EditGradePage
            isEditModalOpen={isEditModalOpen}
            gradeName={gradeName}
            setGradeName={setGradeName}
            gradePoint={gradePoint}
            setGradePoint={setGradePoint}
            markFrom={markFrom}
            setMarkFrom={setMarkFrom}
            markUpTo={markUpTo}
            setMarkUpTo={setMarkUpTo}
            totalSubjectMark={totalSubjectMark}
            setTotalSubjectMark={setTotalSubjectMark}
            setIsEditModalOpen={setIsEditModalOpen}
            handleEditSubmit={handleEditSubmit}
          />
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default GradePage;
