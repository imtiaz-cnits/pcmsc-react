import "../../assets/css/all-modal.css";
import { useState } from "react";
import Select from "react-select";
import CustomDropdownIndicator from "../../components/CustomDropdownIndicator.jsx";
import { Toaster } from "react-hot-toast";
import {
  useAddSession,
  useDeleteSession,
  useFetchPaginatedSession,
  useUpdateSession,
} from "../../hook/useSession.js";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "../../assets/css/all-modal.css";
import useAddModal from "../../hook/useAddModal.jsx";

const Session = () => {
  const [session, setSession] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [warn, setWarn] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editSessionId, setEditSessionId] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit] = useState(5);
  const {
    data: sessions,
    isPending,
    isError,
  } = useFetchPaginatedSession(limit, skip);
  const { mutate: addSession } = useAddSession();
  const { mutate: deleteSession } = useDeleteSession();
  const { mutate: updateSession } = useUpdateSession();

  //todo fixed modal open closed
  useAddModal("createClassModal", "classModalBtn", "classBtn");

  // add session modal options
  const sessionStatusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  // total documents
  const total = sessions?.total;

  // 📝 handle the form submission
  const handleAddSession = async (e) => {
    e.preventDefault();

    if (!sessions) {
      return setWarn("Please fill in all fields ");
    }

    //prepare payload
    const payload = {
      session,
      label: selectedSession.label,
      status: selectedSession.value,
    };

    console.log("payload", payload);

    await addSession(payload);

    setSelectedSession("");
    setSession("");
    setSelectedSession(null);

    /*
    // loader toast
    const toastId = toast.loading("Adding session...");

    try {
      const res = await axiosPrivate.post(
        "/academic-management/add-session",
        payload,
      );
      console.log("res data of session ", res.data);

      if (res.data.success) {
        setSession(null);
        setSelectedSession(null);
        toast.success(res.data.message || "Successfully added!", {
          id: toastId,
        });
      } else {
        toast.error(res.data.message || "Failed to add session!", {
          id: toastId,
        });
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e.response?.data?.message || "Something went wrong!";
      toast.error("Failed to add session!", {
        id: toastId,
      });
      console.log(errorMessage);
    } finally {
      setLoader(false);
    }


     */
  };

  console.log("data sessions: ", sessions);
  // Handle Edit Click
  const handleEditClick = (session) => {
    console.log("Edit button clicked for session:", session);
    setEditSessionId(session._id);
    setSession(session.session);
    setSelectedSession({
      value: session.status,
      label: session.label,
    });
    setEditModalOpen(true);
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!session || !selectedSession) {
      return setWarn("Please fill in all fields ");
    }

    const updatedData = {
      session,
      label: selectedSession.label,
      status: selectedSession.value,
    };

    await updateSession({ sessionId: editSessionId, updatedData });

    setEditModalOpen(false);
    setSession("");
    setSelectedSession(null);
    setEditSessionId(null);
  };

  if (isPending) return <p>Loading.....</p>;
  if (isError) return <p>Error....</p>;

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
                  <button className="create-cls-btn" id="classModalBtn">
                    Create Session
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
                        <th>Session Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/*todo shimmer effect add with isFetching*/}
                      {sessions?.data &&
                        sessions?.data?.map((session, index) => {
                          return (
                            <tr key={session?._id}>
                              <td>{index + skip + 1}</td>
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {session?.session}
                              </td>
                              <td>{session?.label}</td>
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "20px",
                                }}
                              >
                                <button
                                  onClick={() => handleEditClick(session)}
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
                                >
                                  <FaRegTrashAlt
                                    style={{ color: "red", fontSize: "25px" }}
                                    onClick={() => deleteSession(session?._id)}
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
                    onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
                    disabled={skip === 0}
                  >
                    Prev
                  </button>

                  <button
                    id="nextBtn"
                    className="btn"
                    onClick={() => setSkip((prev) => Math.max(prev + limit))}
                    disabled={limit + skip >= total}
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
            <section id="createClassModal" className="modal migrateModal">
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

                        {warn && <p style={{ color: "lightcoral" }}>{warn}</p>}

                        <div className="form-group">
                          <label htmlFor="search-students">Status *</label>
                          <Select
                            options={sessionStatusOptions}
                            value={selectedSession}
                            onChange={setSelectedSession}
                            placeholder="Status"
                            components={{
                              DropdownIndicator: CustomDropdownIndicator,
                            }}
                          />
                        </div>
                      </div>

                      {/* <!-- Actions --> */}
                      <div className="form-actions">
                        <button
                          type="button"
                          id="classBtn"
                          className="button close closeBtn"
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
          </div>

          {/* <!-- Session Pop Up Modal Start --> */}

          {/* Edit Modal */}
          {/* Edit Modal */}
          {editModalOpen && (
            <div
              style={{
                position: "fixed",
                zIndex: 1000,
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "5px",
                  width: "40%",
                  boxShadow: "0px 0px 10px #000",
                }}
              >
                <h3>Edit Session</h3>
                <form onSubmit={handleEditSubmit}>
                  <div style={{ marginBottom: "10px" }}>
                    <label>Session Name *</label>
                    <input
                      type="text"
                      placeholder="Session Name"
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label>Status *</label>
                    <Select
                      options={sessionStatusOptions}
                      value={selectedSession}
                      onChange={setSelectedSession}
                      placeholder="Status"
                      components={{
                        DropdownIndicator: CustomDropdownIndicator,
                      }}
                      menuIsOpen={isDropdownOpen} // 🛠️ CHANGED CODE: Controlled dropdown state
                      onMenuOpen={() => setIsDropdownOpen(true)} // 🛠️ Keep open state when manually opened
                      onMenuClose={() => setIsDropdownOpen(false)} // 🛠️ Close on outside click
                    />
                  </div>

                  {warn && <p style={{ color: "red" }}>{warn}</p>}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setEditModalOpen(false)}
                      style={{
                        padding: "10px 15px",
                        background: "gray",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 15px",
                        background: "lightgreen",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
      <Toaster />
    </>
  );
};

export default Session;
