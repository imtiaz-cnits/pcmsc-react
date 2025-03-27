import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "../../assets/css/all-modal.css";
import Shimmer from "../../components/Shimmer";
import {
  useAddSession,
  useDeleteSession,
  useFetchPaginatedSessions,
  useUpdateSession,
} from "../../hook/useSession.js";

const Test = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [session, setSession] = useState("");
  const [sessionStatus, setSessionStatus] = useState("");
  const [editSessionId, setEditSessionId] = useState("");
  const [warn, setWarn] = useState("");
  const { mutate: addSession } = useAddSession();
  const { mutate: updateSession } = useUpdateSession();
  const { mutate: deleteSession } = useDeleteSession();

  const {
    data: sessions,
    isPending,
    isError,
    error,
  } = useFetchPaginatedSessions(page);

  // ✅ Enable-Disable scrolling when modal is open-close
  useEffect(() => {
    document.body.style.overflow = isAddModalOpen ? "hidden" : "";
  }, [isAddModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "";
  }, [isEditModalOpen]);

  // add session modal options
  const sessionStatusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  const handleAddSession = (e) => {
    e.preventDefault();

    if (!session.trim()) {
      setWarn("Session name is required and cannot be empty");
      return;
    }

    const label =
      sessionStatus?.charAt(0).toUpperCase() + sessionStatus.slice(1);
    console.log("session status : ", sessionStatus);
    const payload = {
      name: session,
      label: label || "Active",
      status: sessionStatus || "active",
    };
    console.log("payload", payload);
    addSession(payload);
    setWarn("");
    setSession("");
    setSessionStatus("");
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleSessionEditClick = (e, item) => {
    e.preventDefault();
    console.log("Edit button clicked for session:", item);
    console.log("Edit button clicked for session id :", item?._id);
    setEditSessionId(item?._id);
    setSession(item?.name);
    setSessionStatus(item?.status);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleSessionEditSubmit = (e) => {
    e.preventDefault();

    if (!session) {
      setWarn("Session name is required and cannot be empty");
      return;
    }

    const label =
      sessionStatus?.charAt(0).toUpperCase() + sessionStatus.slice(1);

    const updatedPayload = {
      name: session,
      label: label || "Active",
      status: sessionStatus || "active",
    };

    updateSession({ sessionId: editSessionId, payload: updatedPayload });
    setSession("");
    setSessionStatus("");
    setWarn("");
    setEditSessionId("");
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleSessionDelete = (e, item) => {
    e.preventDefault();
    console.log("after deleting  session value : ", item);
    deleteSession(item?._id, {
      onSuccess: () => {
        if (sessions?.data?.length === 1 && page > 1) {
          setPage((prevState) => prevState - 1);
        }
      },
    });
  };


  if (isError) {
    console.log("inside session list error : ", error);
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
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card">
              <div className="card-body">
                {/* <!-- Class heading Start --> */}
                <div className="class-heading">
                  <h3 className="heading">Session List</h3>
                  <button
                    className="create-cls-btn"
                    onClick={() => setIsAddModalOpen(!isAddModalOpen)}
                  >
                    Create Session
                  </button>
                </div>
                {/* <!-- Class heading End --> */}

                {sessions?.total <= 0  ? (<tr>
      <td colSpan="4" style={{ textAlign: "center" }}>No Sessions Found</td>
    </tr>) : (


<>


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
                        <th>Session Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
  {isPending ? (
    <Shimmer count={5} />
  ) : sessions?.data?.length > 0 && (
    sessions?.data?.map((item, index) => (
      <tr key={item?._id}>
        <td>{(page - 1) * 5 + index + 1}</td>
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
            onClick={(e) => handleSessionEditClick(e, item)}
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
            onClick={(e) => handleSessionDelete(e, item)}
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
  ) }
 
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
                  {page} of {sessions?.totalPages}
                  <button
                    id="nextBtn"
                    className="btn"
                    onClick={() =>
                      setPage((prevState) =>
                        Math.min(prevState + 1, sessions?.totalPages),
                      )
                    }
                    disabled={page === sessions?.totalPages}
                  >
                    Next
                  </button>
                </div>


</>

    )
    
  
  
  }





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

        <!-- Session Pop Up Modal Start --> */}
          <div className="session-modal">
            {isAddModalOpen && (
              <section
                id="createClassModal"
                className="modal migrateModal show"
              >
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Create Session</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div
                          className="form-row"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Session Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Session Name"
                              value={session}
                              onChange={(e) => setSession(e.target.value)}
                            />
                          </div>
                          {warn && (
                            <p style={{ color: "lightcoral" }}>{warn}</p>
                          )}
                          <div className="form-group">
                            <label htmlFor="search-students">Status *</label>
                            <select
                              id="search-students"
                              placeholder="Class"
                              value={sessionStatus}
                              onChange={(e) => setSessionStatus(e.target.value)}
                            >
                              <option value="" disabled>
                                Select Status
                              </option>

                              {sessionStatusOptions?.map((option, index) => (
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
                            id="classBtn"
                            className="button close closeBtn"
                            onClick={() => setIsAddModalOpen(!isAddModalOpen)}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="button save"
                            onClick={handleAddSession}
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
          {/* <!-- Session Pop Up Modal Start --> */}

          {/* <!-- Edit Class Pop Up Modal Start --> */}
          <div className="createClassModal">
            {isEditModalOpen && (
              <section id="createClassModal" className="modal show">
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>Update Session</h3>
                      <form>
                        {/* <!-- Row 1 --> */}
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="search-students">
                              Session Name *
                            </label>
                            <input
                              type="text"
                              id="search-students"
                              placeholder="Class"
                              value={session}
                              onChange={(e) => setSession(e.target.value)}
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
                              value={sessionStatus}
                              onChange={(e) => setSessionStatus(e.target.value)}
                            >
                              <option value="" disabled>
                                Select Status
                              </option>

                              {sessionStatusOptions?.map((option, index) => (
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
                            onClick={handleSessionEditSubmit}
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
      <Toaster />
    </>
  );
};

export default Test;
