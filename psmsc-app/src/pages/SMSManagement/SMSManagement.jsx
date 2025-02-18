import { useState } from "react";
import "../../assets/css/all-modal.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/table-funtion.css";

const SMSManagement = () => {
  const [sms, setSMS] = useState("");
  const [sclass, setSclass] = useState("");
  const [ssection, setSsection] = useState("");
  const [session, setSession] = useState("");

 

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

                    <select
                      id="sms-to"
                      value={sms}
                      onChange={(e) => setSMS(e.target.value)}
                    >
                      <option value="" disabled>Select SMS</option>
                      <option value="SMS">SMS</option>
                      <option value="SMS">SMS</option>
                    </select>
                  </div>
                  <div className="form-group select-input-box">
                    <label htmlFor="select-to">Select Class*</label>

                    <select
                      value={sclass}
                      onChange={(e) => setSclass(e.target.value)}
                    >
                      <option value=""  disabled>Select Class</option>
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                    </select>
                  </div>
                  <div className="form-group select-input-box">
                    <label htmlFor="select-to">Select Section*</label>

                    <select
                      id="course"
                      value={ssection}
                      onChange={(e) => setSsection(e.target.value)}
                    >
                      <option value="" disabled>Select Section</option>
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                    </select>
                  </div>
                  <div className="form-group select-input-box">
                    <label htmlFor="select-to">Select Session*</label>

                    <select
                      name=""
                      id=""
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                    >
                      <option value="" disabled>Select Session</option>
                      <option className="option">2024</option>
                      <option className="option">2025</option>
                    </select>
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
