import "../../assets/css/style.css";
import "../../assets/css/all-modal.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/table-funtion.css";

const SMSManagement = () => {
  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <form>
            <div className="sms-bredcam">
              <div className="bredcam-title">
                <h1>SMS Management</h1>
              </div>
            </div>
            <div className="sms-wrapper">
              <div className="wrap">
                <div className="form-row">
                  <div className="form-group select-input-box">
                    <label htmlFor="select-to">Select SMS To*</label>
                    <div className="select-box-dropdown">
                      <div className="select-dropdown-selected">
                        <span>Select SMS</span>
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
                        <div className="option">SMS</div>
                        <div className="option">SMS</div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group select-input-box">
                    <label htmlFor="select-to">Select Class*</label>
                    <div className="select-box-dropdown">
                      <div className="select-dropdown-selected">
                        <span>Select Class</span>
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
                    <label htmlFor="select-to">Select Section*</label>
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
                    <label htmlFor="select-to">Select Session*</label>
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
                  <button className="search-btn">Search</button>
                </div>
              </div>
              <div className="sms-balance">
                <h3>SMS Balance</h3>
                <h4>
                  Total Sent SMS: <span>39</span>
                </h4>
                <h4>
                  Total Remaining SMS: <span>429</span>
                </h4>
              </div>
            </div>

            <div className="textarea">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="number">SMS Sending Number:</label>
                  <textarea type="text" placeholder="Enter Number...">
                    {" "}
                  </textarea>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="number">Notice:</label>
                  <textarea type="text" placeholder="Enter Number...">
                    {" "}
                  </textarea>
                </div>
              </div>
              <button className="send-btn">Send</button>
            </div>
          </form>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default SMSManagement;
