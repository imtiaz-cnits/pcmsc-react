
const Ok = () => {
return(
  <>
  
  {/* <!-- Hero Main Content Start --> */}
    <div class="main-content">
      <div class="page-content">
        <div class="data-table">
          <div class="card">
            <div class="card-body">
              {/* <!-- Class heading Start --> */}
              <div class="class-heading">
                <h3 class="heading">Class List</h3>
                <button class="create-cls-btn" id="classModalBtn">
                  Add Class
                </button>
              </div>
              {/* <!-- Class heading End --> */}

              {/* <!-- Action Buttons --> */}
              <div class="button-wrapper mb-3">
                {/* <!-- Search and Filter --> */}
                <div class="input-group class-group">
                  {/* <!-- Entries per page --> */}
                  <div>
                    <div class="entries-page">
                      <label for="entries" class="mr-2">Entries:</label>
                      <div class="select-container dropdown-button">
                        <select
                          id="entries"
                          class="form-control"
                          style="width: auto"
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                        <span class="dropdown-icon">&#9662;</span>
                        {/* <!-- Dropdown icon --> */}
                      </div>
                    </div>
                  </div>
                  <div class="class-search">
                    <input
                      style="width: 20%; margin: 0"
                      type="text"
                      id="searchInput"
                      class="form-control"
                      placeholder="Search Class..."
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Table --> */}
              <div class="table-wrapper">
                <table id="printTable" class="table table-bordered table-hover">
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
                            <input type="checkbox" class="toggler" />
                            <div class="dots">
                              <div></div>
                            </div>
                            <div class="menu">
                              <div>
                                <ul>
                                  <li>
                                    <a
                                      href="#"
                                      class="link custom-open-modal-btn openModalBtn editButton"
                                      data-modal="action-editmodal"
                                      >Edit</a
                                    >
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      class="link custom-open-modal-btn openModalBtn deleteButton"
                                      data-modal="action-deletemodal"
                                      >Delete</a
                                    >
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
                            <input type="checkbox" class="toggler" />
                            <div class="dots">
                              <div></div>
                            </div>
                            <div class="menu">
                              <div>
                                <ul>
                                  <li>
                                    <a
                                      href="#"
                                      class="link custom-open-modal-btn openModalBtn editButton"
                                      data-modal="action-editmodal"
                                      >Edit</a
                                    >
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      class="link custom-open-modal-btn openModalBtn deleteButton"
                                      data-modal="action-deletemodal"
                                      >Delete</a
                                    >
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
              <div class="my-3">
                <span id="display-info"></span>
              </div>

              <div id="pagination" class="pagination">
                <button id="prevBtn" class="btn">Prev</button>
                <a href="#" class="page-link page-link--1">1</a>
                <a href="#" class="page-link page-link--2">2</a>
                <a href="#" class="page-link page-link--3">3</a>
                <button id="nextBtn" class="btn">Next</button>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; 2023. All Rights Reserved.</p>
        </div>
        {/* <!-- Table End -->

        <!-- Table Action Button Modal Start -->
        <!-- Confirmation Modal Start --> */}
        <div id="confirmationModal" class="modal">
          <div class="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <div class="modal-buttons">
              <button id="confirmYes">Yes</button>
              <button id="confirmNo">No</button>
            </div>
          </div>
        </div>
        {/* <!-- Confirmation Modal End -->
        <!-- Edit Modal Start --> */}
        <div id="editModal" class="modal">
          <div class="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <div class="modal-buttons">
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
         <div class="createClassModal">

          <section id="createClassModal" class="modal">
            <div class="modal-content">
              <div id="popup-modal">
                <div class="form-container">
                  <h3>Add Class</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div class="form-row">
                      <div class="form-group">
                        <label for="search-students">Class Name *</label>
                        <input
                          type="text"
                          id="search-students"
                          placeholder="Class"
                        />
                      </div>
                    </div>
  
                    {/* <!-- Actions --> */}
                    <div class="form-actions">
                      <button
                        type="button"
                        id="classBtn"
                        class="button close closeBtn"
                      >
                        Close
                      </button>
                      <button type="button" class="button save">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
         </div>
        
        {/* <!-- Create Class Pop Up Modal Start --> */}
      </div>
    </div>
    {/* <!-- Hero Main Content End --> */}
  </>
)
};

export default Ok;
