import { useEffect, useState } from "react";

const Subject = () => {
  const [sclass, setSclass] = useState("");
  const [selectStatus, setSelectStatus] = useState("");

  useEffect(() => {
    const exmModal = document.getElementById("exmModal");
    const exmModalBtn = document.getElementById("exmModalBtn");
    const exmClose = document.getElementById("exmClose");

    // Function to disable scrolling
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    // Function to enable scrolling
    const enableScroll = () => {
      document.body.style.overflow = "";
    };

    // Open the migrate modal and hide scroll
    exmModalBtn.addEventListener("click", () => {
      exmModal.classList.add("show");
      disableScroll();
    });

    // Close the migrate modal and show scroll
    exmClose.addEventListener("click", () => {
      exmModal.classList.remove("show");
      enableScroll();
    });

    // Close the migrate modal by clicking outside it and show scroll
    document.addEventListener("click", (e) => {
      if (e.target === exmModal) {
        exmModal.classList.remove("show");
        enableScroll();
      }
    });
  }, []);

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
                  <button className="create-cls-btn" id="exmModalBtn">
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
                        style={{ width: "20%", margin: 0 }}
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Search Subject..."
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
                      <tr>
                        <td>01</td>
                        <td>One</td>
                        <td>127217</td>
                        <td>Bangla</td>
                        <td>10</td>
                        <td>30</td>
                        <td>35</td>
                        <td>40</td>
                        <td>Active</td>
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
                            {/* <!-- <button className="quick-view quickButton">
                            <i className="fa-regular fa-eye"></i>
                          </button> --> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td>Two</td>
                        <td>127257</td>
                        <td>English</td>
                        <td>15</td>
                        <td>32</td>
                        <td>38</td>
                        <td>40</td>
                        <td>Active</td>
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
                            {/* <!-- <button className="quick-view quickButton">
                            <i className="fa-regular fa-eye"></i>
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
          <div className="subject-modal">
            <section id="exmModal" className="modal">
              <div className="modal-content">
                <div id="popup-modal">
                  <div className="form-container">
                    <h3>Add Subject</h3>
                    <form>
                      {/* <!-- Row 1 --> */}
                      <div className="form-row row">
                        <div className="form-group select-input-box col-lg-4">
                          <label htmlFor="select-to">Class Name*</label>

                          <select
                            name=""
                            id=""
                            value={sclass}
                            onChange={(e) => setSclass(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Class
                            </option>
                            <option value="One">One</option>
                            <option value="Two">Two</option>
                          </select>
                        </div>
                        <div className="form-group col-lg-4">
                          <label htmlFor="shift">Subject Code*</label>
                          <input type="text" placeholder="Select Code" />
                        </div>
                        <div className="form-group col-lg-4">
                          <label htmlFor="shift">Subject Name*</label>
                          <input type="text" placeholder="Select Name" />
                        </div>
                      </div>
                      {/* <!-- Row 2 --> */}
                      <div className="form-row row">
                        <div className="form-group col-lg-4">
                          <label htmlFor="shift">Total Mark *</label>
                          <input type="number" placeholder="Select Mark" />
                        </div>
                        <div className="form-group col-lg-4">
                          <label htmlFor="shift">Writing Mark *</label>
                          <input type="number" placeholder="Select Mark" />
                        </div>
                        <div className="form-group col-lg-4">
                          <label htmlFor="shift">Oral Mark *</label>
                          <input type="number" placeholder="Select Mark" />
                        </div>
                      </div>
                      {/* <!-- Row 3 --> */}
                      <div className="form-row row">
                        <div className="form-group col-lg-4">
                          <label htmlFor="shift">Total Mark *</label>
                          <input type="number" placeholder="Select Mark" />
                        </div>
                        <div className="form-group select-input-box col-lg-4">
                          <label htmlFor="select-to">Status*</label>

                          <select
                            name=""
                            id=""
                            value={selectStatus}
                            onChange={(e) => setSelectStatus(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Two">Two</option>
                          </select>
                        </div>
                      </div>

                      {/* <!-- Actions --> */}
                      <div className="form-actions">
                        <button
                          type="button"
                          id="exmClose"
                          className="button close closeBtn"
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
          </div>
          {/* <!-- Subject Pop Up Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default Subject;
