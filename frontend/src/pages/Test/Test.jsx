import { useEffect, useState } from "react";
import "../../assets/css/all-modal.css";
const Test = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [classStatus, setClassStatus] = useState("");

  // ✅ Enable-Disable scrolling when modal is open-close
  useEffect(() => {
    document.body.style.overflow = isAddModalOpen ? "hidden" : "";
  }, [isAddModalOpen]);

  const classNameOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  // value checker test
  useEffect(() => {
    console.log(classStatus);
    console.log("name , ", className);
  }, [classStatus, className]);

  return (
    <>
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
                        <th>Student Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Md. Mizan Shekh</td>
                        <td>
                          <div id="action_btn">
                            <div id="menu-wrap">
                              <input type="checkbox" className="toggler" />
                              <div className="dots">
                                <div></div>
                              </div>
                              <div className="menu">
                                <div>
                                  <ul>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn editButton"
                                        data-modal="action-editmodal"
                                      >
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn deleteButton"
                                        data-modal="action-deletemodal"
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {/* <!-- <button class="quick-view quickButton">
                            <i class="fa-regular fa-eye"></i>
                          </button> --> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td>Md. Siyam</td>
                        <td>
                          <div id="action_btn">
                            <div id="menu-wrap">
                              <input type="checkbox" className="toggler" />
                              <div className="dots">
                                <div></div>
                              </div>
                              <div className="menu">
                                <div>
                                  <ul>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn editButton"
                                        data-modal="action-editmodal"
                                      >
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn deleteButton"
                                        data-modal="action-deletemodal"
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {/* <!-- <button class="quick-view quickButton">
                            <i class="fa-regular fa-eye"></i>
                          </button> --> */}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <!-- Pagination and Display Info --> */}
                <div className="my-3">
                  <span id="display-info"></span>
                </div>

                <div id="pagination" className="pagination">
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
                          <button type="button" className="button save">
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
        </div>
      </div>

      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default Test;
