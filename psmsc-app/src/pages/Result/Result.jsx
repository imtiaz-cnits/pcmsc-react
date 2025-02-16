/* eslint-disable react/no-unknown-property */
const Result = () => {
  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card mark-entry-wrap">
              <div className="card-body" style={{ paddingBottom: "40px" }}>
                {/* <!-- className heading Start --> */}
                <div className="exam-heading text-center d-block">
                  <h3 className="heading d-block">Search Result</h3>
                </div>
                {/* <!-- className heading End -->

              <!-- Form Start --> */}
                <div className="result-sheet-form">
                  <form className="form-wrapper">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label for="sms-status">className Roll*</label>
                          <br />
                          <input type="number" placeholder="Enter Roll" />
                        </div>
                        <div className="form-group select-input-box">
                          <label for="select-to">className*</label>
                          <div className="select-box-dropdown">
                            <div className="select-dropdown-selected">
                              <span>Select className</span>
                              <span className="icon">
                                <i className="fas fa-angle-down"></i>
                              </span>
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
                              <span className="icon">
                                <i className="fas fa-angle-down"></i>
                              </span>
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
                      <div className="col-lg-6">
                        <div className="form-group select-input-box">
                          <label for="select-to">Section*</label>
                          <div className="select-box-dropdown">
                            <div className="select-dropdown-selected">
                              <span>Select Section</span>
                              <span className="icon">
                                <i className="fas fa-angle-down"></i>
                              </span>
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
                              <span className="icon">
                                <i className="fas fa-angle-down"></i>
                              </span>
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
                        <div className="form-group select-input-box">
                          <label for="select-to">Examination*</label>
                          <div className="select-box-dropdown">
                            <div className="select-dropdown-selected">
                              <span>Select Examination</span>
                              <span className="icon">
                                <i className="fas fa-angle-down"></i>
                              </span>
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
                    </div>
                  </form>
                  <button className="search-btn">Search</button>
                </div>
                {/* <!-- Form Start --> */}
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default Result;
