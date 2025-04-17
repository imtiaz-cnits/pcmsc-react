import { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Toaster } from "sonner";
import Shimmer from "../../components/Shimmer.jsx";
import {
  useAddClass,
  useDeleteClass,
  useFetchPaginatedClasses,
  useUpdateClass,
} from "../../hook/useClass.js";

const ClassPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");

  const [className, setClassName] = useState("");
  const [classStatus, setClassStatus] = useState("");
  const [editClassId, setEditClassId] = useState("");
  const [warn, setWarn] = useState("");
  const {
    data: classes,
    isPending,
    isError,
    error,
  } = useFetchPaginatedClasses({ page, limit, keyword });
  const { mutate: addClass } = useAddClass();
  const { mutate: deleteClass } = useDeleteClass();
  const { mutate: updateClass } = useUpdateClass();

  const entriesOptions = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 75, label: "75" },
    { value: 100, label: "100" },
  ];

  // ✅ Enable-Disable scrolling when modal is open-close
  useEffect(() => {
    document.body.style.overflow = isAddModalOpen ? "hidden" : "";
  }, [isAddModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "";
  }, [isEditModalOpen]);

  const classNameOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!className.trim()) {
      setWarn("Class name is required and cannot be empty");
      return;
    }

    const label = classStatus?.charAt(0).toUpperCase() + classStatus.slice(1);
    console.log("status : ", classStatus);
    console.log("class name ", className);
    const payload = {
      name: className,
      label: label || "Active",
      status: classStatus || "active",
    };
    console.log("payload", payload);
    addClass(payload);
    setWarn("");
    setClassName("");
    setClassStatus("");
    setIsAddModalOpen(false);
  };

  const handleEditClick = (e, item) => {
    e.preventDefault();
    console.log("Edit button clicked for class:", item);
    console.log("Edit button clicked for class id :", item?._id);
    setEditClassId(item?._id);
    setClassName(item?.name);
    setClassStatus(item?.status);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!className) {
      setWarn("Class name is required and cannot be empty");
      return;
    }

    const label = classStatus?.charAt(0).toUpperCase() + classStatus.slice(1);

    const updatedPayload = {
      name: className,
      label: label || "Active",
      status: classStatus || "active",
    };

    updateClass({ classId: editClassId, payload: updatedPayload });
    setClassName("");
    setClassStatus("");
    setWarn("");
    setEditClassId("");
    setIsEditModalOpen(false);
  };

  const handleClassDelete = (e, id) => {
    e.preventDefault();
    console.log("after deleting  class value : ", classes);
    deleteClass(id, {
      onSuccess: () => {
        if (classes?.count === 1 && page > 1) {
          setPage((prev) => prev - 1);
        }
      },
    });
  };

  const handleSearchQuery = (e) => {
    e.preventDefault();
    setPage(1);
    setKeyword(e.target.value);
  };

  if (isError) {
    console.log("inside class list error : ", error);
    if (error instanceof Error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please! try again later!";

      return <p>{errorMsg}</p>;
    }
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      {/* <!-- Hero Main Content Start --> */}

      {/* Sidebar */}

      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card">
              <div className="card-body">
                {/* <!-- Class heading Start --> */}
                <div className="class-heading">
                  <h3 className="heading">Class List</h3>
                  <button
                    className="create-cls-btn"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    Add Class
                  </button>
                </div>

                {classes?.total <= 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No Sessions Found
                    </td>
                  </tr>
                ) : (
                  <>
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
                            placeholder="Search Class..."
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
                            <th>Student Name</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isPending ? (
                            <Shimmer count={5} />
                          ) : (
                            classes?.data?.length > 0 &&
                            classes?.data?.map((item, index) => (
                              <tr key={item?._id}>
                                <td>
                                  {String((page - 1) * 5 + index + 1).padStart(
                                    2,
                                    "0",
                                  )}
                                </td>
                                <td>{item?.nameLabel}</td>
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
                                    onClick={(e) => {
                                      handleClassDelete(e, item?._id);
                                      setKeyword("");
                                    }}
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
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    {/* <!-- Pagination and Display Info --> */}
                    <div className="my-3">
                      <span id="display-info">{`Showing ${Math.min(limit * page, classes?.total)} of ${classes?.total} entries`}</span>
                    </div>

                    <div id="pagination" className="pagination">
                      <button
                        id="prevBtn"
                        className="btn"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                      >
                        Prev
                      </button>
                      {classes?.currentPage} of {classes?.totalPages}
                      <button
                        id="nextBtn"
                        className="btn"
                        onClick={() =>
                          setPage((prev) =>
                            Math.min(prev + 1, classes?.totalPages),
                          )
                        }
                        disabled={page === classes?.totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
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

        <!-- Create Class Pop Up Modal Start --> */}
          <div className="createClassModal">
            {isAddModalOpen && (
              <section id="createClassModal" className="modal show">
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Add Class</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Class Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Class"
                              value={className}
                              onChange={(e) => setClassName(e.target.value)}
                            />
                          </div>
                        </div>
                        {warn && <p style={{ color: "lightcoral" }}>{warn}</p>}
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Status Name *
                            </label>
                            <select
                              id="search-students"
                              placeholder="Class"
                              value={classStatus}
                              onChange={(e) => setClassStatus(e.target.value)}
                            >
                              <option value="" disabled>
                                Select Status
                              </option>

                              {classNameOptions?.map((option, index) => (
                                <option key={index} value={option?.value}>
                                  {option?.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* <!-- Actions --> */}
                        <div className="form-actions">
                          <button
                            type="button"
                            className="button close closeBtn"
                            onClick={() => setIsAddModalOpen(false)}
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

          {/* <!-- Create Class Pop Up Modal Start --> */}

          {/* <!-- Edit Class Pop Up Modal Start --> */}
          <div className="createClassModal">
            {isEditModalOpen && (
              <section id="createClassModal" className="modal show">
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Update Class</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Class Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Class"
                              value={className}
                              onChange={(e) => setClassName(e.target.value)}
                            />
                          </div>
                        </div>
                        {warn && <p style={{ color: "lightcoral" }}>{warn}</p>}
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Status Name *
                            </label>
                            <select
                              id="search-students"
                              placeholder="Class"
                              value={classStatus}
                              onChange={(e) => setClassStatus(e.target.value)}
                            >
                              <option value="" disabled>
                                Select Status
                              </option>

                              {classNameOptions?.map((option, index) => (
                                <option key={index} value={option?.value}>
                                  {option?.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* <!-- Actions --> */}
                        <div className="form-actions">
                          <button
                            type="button"
                            className="button close closeBtn"
                            onClick={() => setIsEditModalOpen(false)}
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

          {/* <!-- Edit Class Pop Up Modal Start --> */}
        </div>
      </div>

      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default ClassPage;
