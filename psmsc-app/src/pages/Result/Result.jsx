import { useState } from "react";


const Result = () => {
  const [sclass, setSclass] = useState("");
  const [session, setSession] = useState("");
  const [ssection, setSsection] = useState("");
  const [shift, setShift] = useState("");
  const [examination, setExamination] = useState("");

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
                          <label htmlFor="sms-status">Class Roll*</label>
                          <br />
                          <input type="number" placeholder="Enter Roll" />
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Class*</label>
                          <select
                            value={sclass}
                            onChange={(e) => setSclass(e.target.value)}
                          >
                            <option value="" disabled>
                              <span>Select Class</span>
                            </option>
                            <option value="One">One</option>
                            <option value="Two">Two</option>
                          </select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Session*</label>
                          <select
                            name=""
                            id=""
                            onChange={(e) => setSession(e.target.value)}
                            value={session}
                          >
                            <option value="" disabled>
                              Select Session
                            </option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Section*</label>

                          <select
                            value={ssection}
                            onChange={(e) => setSsection(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Section
                            </option>
                            <option value="Science">Science</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Arts">Arts</option>
                          </select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Shift*</label>
                          <select
                            name=""
                            id=""
                            value={shift}
                            onChange={(e) => setShift(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Shift
                            </option>
                            <option value="Morning">Morning</option>
                            <option value="Day">Day</option>
                          </select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Examination*</label>

                          <select
                            name=""
                            id=""
                            value={examination}
                            onChange={(e) => setExamination(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Examination
                            </option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                          </select>
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
