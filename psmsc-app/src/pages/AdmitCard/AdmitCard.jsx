/* eslint-disable react/no-unknown-property */
const AdmitCard=()=>{


    return(

        <>
         {/* <!-- Hero Main Content Start --> */}
    <div className="main-content">
      <div className="page-content">
        <div className="data-table">
          <div className="card mark-entry-wrap">
            <div className="card-body">
              {/* <!-- className heading Start --> */}
              <div className="exam-heading">
                <h3 className="heading">Admit Card</h3>
              </div>
              {/* <!-- className heading End -->

              <!-- Form Start --> */}
              <div className="className-wise-form mb-2">
                <div className="mark-entry-form">
                  <form className="form-wrapper row" style={{ width: 'auto' }}
                  >
                    <div className="form-row col-lg-6">
                      <div className="form-group select-input-box">
                        <label for="select-to">className*</label>
                        <div className="select-box-dropdown">
                          <div className="select-dropdown-selected">
                            <span>Select className</span>
                            <span className="icon"
                              ><i className="fas fa-angle-down"></i
                            ></span>
                            {/* <!-- Font Awesome angle-down icon --> */}
                          </div>
                          <div className="select-dropdown-items">
                            <input
                              type="text"
                              className="select-search-box"
                              placeholder="Search..."
                            />
                            <div className="option">One</div>
                            <div className="option">Two</div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group select-input-box">
                        <label for="select-to">Session*</label>
                        <div className="select-box-dropdown">
                          <div className="select-dropdown-selected">
                            <span>Select Session</span>
                            <span className="icon"
                              ><i className="fas fa-angle-down"></i
                            ></span>
                            {/* <!-- Font Awesome angle-down icon --> */}
                          </div>
                          <div className="select-dropdown-items">
                            <input
                              type="text"
                              className="select-search-box"
                              placeholder="Search..."
                            />
                            <div className="option">2024</div>
                            <div className="option">2025</div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div className="form-row col-lg-6">
                      <div className="form-group select-input-box">
                        <label for="select-to">Section*</label>
                        <div className="select-box-dropdown">
                          <div className="select-dropdown-selected">
                            <span>Select Section</span>
                            <span className="icon"
                              ><i className="fas fa-angle-down"></i
                            ></span>
                            {/* <!-- Font Awesome angle-down icon --> */}
                          </div>
                          <div className="select-dropdown-items">
                            <input
                              type="text"
                              className="select-search-box"
                              placeholder="Search..."
                            />
                            <div className="option">Science</div>
                            <div className="option">Commerce</div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group select-input-box">
                        <label for="select-to">Shift*</label>
                        <div className="select-box-dropdown">
                          <div className="select-dropdown-selected">
                            <span>Select Shift</span>
                            <span className="icon"
                              ><i className="fas fa-angle-down"></i
                            ></span>
                            {/* <!-- Font Awesome angle-down icon --> */}
                          </div>
                          <div className="select-dropdown-items">
                            <input
                              type="text"
                              className="select-search-box"
                              placeholder="Search..."
                            />
                            <div className="option">Morning</div>
                            <div className="option">Day</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <button className="search-btn">Search</button>
              </div>
              {/* <!-- Form Start --> */}
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
        <!-- Table Action Button Modal Start --> */}
      </div>
    </div>
    {/* <!-- Hero Main Content End -->  */}
        
        </>
    )
}

export default AdmitCard; 