import { FilePenLine, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";

import ShimmerTable from "../../components/shimmer/ShimmerTable";
import { useFetchClasses } from "../../hook/useClass";
import {
  useAddSubject,
  useDeleteSubjects,
  useFetchPaginatedSubject,
  useUpdateSubject,
} from "../../hook/useSubject";
import EditSubject from "./EditSubject";

const Subject = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [className, setClassName] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [writtenMark, setWrittenMark] = useState("");
  const [oralMark, setOralMark] = useState("");
  const [passMark, setPassMark] = useState("");
  const [editClickID, setEditClickID] = useState("");
  const [deletedID, setDeletedID] = useState("");
  const { data: classes } = useFetchClasses();
  const { mutate: addSubject } = useAddSubject();
  const { mutate: updateSubject } = useUpdateSubject();
  const { mutate: deleteSubject } = useDeleteSubjects();

  const {
    data: subjects,
    isPending,
    isError,
    error,
  } = useFetchPaginatedSubject({ page, limit, keyword });

  useEffect(() => {
    document.body.style.overflow = isCreateModalOpen ? "hidden" : "";
  }, [isCreateModalOpen]);

  const classOptions = classes?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Pending", label: "Pending" },
    { value: "Inactive", label: "Inactive" },
  ];

  const entriesOptions = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 75, label: "75" },
    { value: 100, label: "100" },
  ];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const payload = {
      subjectCode: subjectCode,
      subjectName: subjectName,
      totalMark: Number(totalMark),
      writtenMark: Number(writtenMark),
      oralMark: Number(oralMark),
      passMark: Number(passMark),
      className: className.value,
      status: selectedStatus.value || "Active",
    };

    console.log("payload", payload);
    addSubject(payload);
    setSubjectCode("");
    setSubjectName("");
    setTotalMark("");
    setWrittenMark("");
    setOralMark("");
    setPassMark("");
    setClassName(null);
    setSelectedStatus(null);
  };

  const handleUpdateModalClose = (e) => {
    e.preventDefault();
    setIsEditModalOpen(false);
    setSubjectCode("");
    setSubjectName("");
    setTotalMark("");
    setWrittenMark("");
    setOralMark("");
    setPassMark("");
    setClassName(null);
    setSelectedStatus(null);
  };

  const handleEditClickID = (e, item) => {
    e.preventDefault();
    console.log("edited click id : ", item);
    setEditClickID(item?._id);
    setClassName(
      item?.className
        ? { value: item?.className?._id, label: item?.className?.nameLabel }
        : null,
    );
    setSubjectCode(item?.subjectCode);
    setSubjectName(item?.subjectName);
    setTotalMark(item?.totalMark);
    setWrittenMark(item?.writtenMark);
    setOralMark(item?.oralMark);
    setPassMark(item?.passMark);
    setSelectedStatus(
      item?.status ? { value: item?.status, label: item?.status } : null,
    );
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const payload = {
      subjectCode,
      subjectName,
      totalMark,
      writtenMark,
      oralMark,
      passMark,
      className: className.value,
      status: selectedStatus.value || "Active",
    };

    updateSubject(
      { id: editClickID, payload },
      {
        onSuccess: () => {
          setSubjectCode("");
          setSubjectName("");
          setTotalMark("");
          setWrittenMark("");
          setOralMark("");
          setPassMark("");
          setClassName(null);
          setSelectedStatus(null);
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
    deleteSubject(deletedID, {
      onSuccess: () => {
        if (subjects?.count === 1 && page > 1) {
          setIsShimmering(true);
          setTimeout(() => {
            setIsShimmering(false);
            setPage((prev) => prev - 1);
          }, 500);
        }
      },
    });
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    console.log("classoptions value : ", keyword);
  }, [keyword]);

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
                  <h3 className="heading">Subject List</h3>
                  <button
                    className="create-cls-btn"
                    id="exmModalBtn"
                    onClick={() => setCreateModalOpen(!isCreateModalOpen)}
                  >
                    Create Subject
                  </button>
                </div>
                {/* <!-- className heading End -->

              <!-- Action Buttons --> */}
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
                <div className="table-wrapper subject-table-wrapper">
                  <table
                    id="printTable"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Sl No:</th>
                        <th>Class Name</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Total Mark</th>
                        <th>Writing Mark</th>
                        <th>Oral Mark</th>
                        <th>Pass Mark</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isPending || isShimmering ? (
                        <ShimmerTable rows={limit} cols={10} />
                      ) : isError ? (
                        <tr>
                          <td colSpan="10">
                            <div className="error-msg">
                              {error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong. Please try again!"}
                            </div>
                          </td>
                        </tr>
                      ) : subjects?.totalEntries <= 0 ? (
                        <tr>
                          <td colSpan={10} style={{ textAlign: "center" }}>
                            No Subjects found
                          </td>
                        </tr>
                      ) : (
                        subjects?.data?.length > 0 &&
                        subjects?.data?.map((item, idx) => (
                          <tr key={item?._id}>
                            <td>
                              {String((page - 1) * limit + idx + 1).padStart(
                                2,
                                "0",
                              )}
                            </td>
                            <td>{item?.className?.nameLabel}</td>
                            <td>{item?.subjectCode}</td>
                            <td>{item?.subjectName}</td>
                            <td>{item?.totalMark}</td>
                            <td>{item?.writtenMark}</td>
                            <td>{item?.oralMark}</td>
                            <td>{item?.passMark}</td>
                            <td>{item?.status}</td>

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
                      {subjects?.totalEntries
                        ? `Showing ${Math.min(
                            limit * subjects?.currentPage,
                            subjects?.totalEntries,
                          )} of ${subjects?.totalEntries} entries`
                        : ""}
                    </span>
                  </div>
                )}

                {subjects?.totalPages > 1 && !isPending && (
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

                    {`${page} of ${Number(subjects?.totalPages)}`}

                    {page < subjects?.totalPages && (
                      <button
                        id="nextBtn"
                        className="btn"
                        onClick={() =>
                          setPage((prev) =>
                            Math.min(prev + 1, subjects?.totalPages),
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

        <!-- Subject Pop Up Modal Start --> */}
          {isCreateModalOpen && (
            <div className="subject-modal">
              <section id="exmModal" className="modal show">
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Add Subject</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div className="form-row row">
                          <div className="form-group select-input-box col-lg-4">
                            <label htmlFor="select-to">Class*</label>

                            <Select
                              options={classOptions}
                              onChange={setClassName}
                              value={className}
                              placeholder="Select Class"
                            />
                          </div>
                          <div className="form-group col-lg-4">
                            <label htmlFor="shift">Subject Code*</label>
                            <input
                              type="text"
                              placeholder="Select Code"
                              value={subjectCode}
                              onChange={(e) => setSubjectCode(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-lg-4">
                            <label htmlFor="shift">Subject Name*</label>
                            <input
                              type="text"
                              placeholder="Select Name"
                              value={subjectName}
                              onChange={(e) => setSubjectName(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <!-- Row 2 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-4">
                            <label htmlFor="shift">Total Mark *</label>
                            <input
                              type="number"
                              placeholder="Select Mark"
                              value={totalMark}
                              onChange={(e) => setTotalMark(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-lg-4">
                            <label htmlFor="shift">Writing Mark *</label>
                            <input
                              type="number"
                              placeholder="Select Mark"
                              value={writtenMark}
                              onChange={(e) => setWrittenMark(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-lg-4">
                            <label htmlFor="shift">Oral Mark *</label>
                            <input
                              type="number"
                              placeholder="Select Mark"
                              value={oralMark}
                              onChange={(e) => setOralMark(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <!-- Row 3 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-4">
                            <label htmlFor="shift">Pass Mark *</label>
                            <input
                              type="number"
                              placeholder="Select Mark"
                              value={passMark}
                              onChange={(e) => setPassMark(e.target.value)}
                            />
                          </div>
                          <div className="form-group select-input-box col-lg-4">
                            <label htmlFor="select-to">Status*</label>

                            <Select
                              options={statusOptions}
                              value={selectedStatus}
                              onChange={setSelectedStatus}
                            />
                          </div>
                        </div>

                        {/* <!-- Actions --> */}
                        <div className="form-actions">
                          <button
                            type="button"
                            id="exmClose"
                            className="button close closeBtn"
                            onClick={() => setCreateModalOpen(false)}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="button save"
                            onClick={handleCreateSubmit}
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
          {/* <!-- Subject Pop Up Modal End --> */}

          {/* <!-- Subject Edit Pop Up Modal Start --> */}
          <EditSubject
            isEditModalOpen={isEditModalOpen}
            classOptions={classOptions}
            setClassName={setClassName}
            className={className}
            subjectCode={subjectCode}
            setSubjectCode={setSubjectCode}
            statusOptions={statusOptions}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            passMark={passMark}
            setPassMark={setPassMark}
            oralMark={oralMark}
            setOralMark={setOralMark}
            writtenMark={writtenMark}
            setWrittenMark={setWrittenMark}
            totalMark={totalMark}
            setTotalMark={setTotalMark}
            subjectName={subjectName}
            setSubjectName={setSubjectName}
            handleUpdateModalClose={handleUpdateModalClose}
            handleEditSubmit={handleEditSubmit}
          />
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default Subject;
