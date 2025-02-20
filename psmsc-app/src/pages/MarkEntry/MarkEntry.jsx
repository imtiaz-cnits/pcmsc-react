import { useState } from "react";


const MarkEntry = () => {
  const [sclass, setSclass] = useState("");
  const [session, setSession] = useState("");
  const [ssection, setSsection] = useState("");
  const [shift, setShift] = useState("");
  const [subject, setSubject] = useState("");
  const [examinationName, setExaminationName] = useState("");

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card mark-entry-wrap">
              <div className="card-body">
                {/* <!-- Class heading Start --> */}
                <div className="exam-heading">
                  <h3 className="heading">Mark Entry</h3>
                </div>

                {/* <!-- Class heading End --> */}

                {/* <!-- Form Start --> */}
                <div className="class-wise-form">
                  <div className="mark-entry-form">
                    <form className="form-wrapper">
                      <div className="form-row">
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Class*</label>

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
                      </div>
                      <div className="form-row">
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
                          <label htmlFor="select-to">Subject*</label>

                          <select
                            name=""
                            id=""
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Subject
                            </option>
                            <option value="Bangla">Bangla</option>
                            <option value="English">English</option>
                          </select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Exam Name*</label>
                          <select
                            name=""
                            id=""
                            value={examinationName}
                            onChange={(e) => setExaminationName(e.target.value)}
                          >
                            <option value="" disabled>
                              {" "}
                              Select Name
                            </option>
                            <option value="1st Semester">1st Semester</option>
                            <option value="2nd Semester">2nd Semester</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <button className="search-btn">Search</button>
                </div>
                {/* <!-- Form Start --> */}

                {/* <!-- Table --> */}
                <div className="table-wrapper grade-table-wrapper">
                  <table className="table table-bordered mark-entry-table">
                    <thead>
                      <tr>
                        <th>Sl No:</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Roll</th>
                        <th>Written Mark</th>
                        <th>Oral Mark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>202423</td>
                        <td>MD: Shanto</td>
                        <td>03</td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td>202443</td>
                        <td>MD: siyam</td>
                        <td>06</td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="button-wrap">
                  <button className="mark-btn">Save Mark</button>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End --> */}

          {/* <!-- Table Action Button Modal Start --> */}
          {/* <!-- Confirmation Modal Start --> */}
          <div id="confirmationModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-buttons">
                <button id="confirmYes">Yes</button>
                <button id="confirmNo">No</button>
              </div>
            </div>
          </div>
          {/* <!-- Confirmation Modal End --> */}
          {/* <!-- Edit Modal Start --> */}
          <div id="editModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-buttons">
                <button id="editYes">Yes</button>
                <button id="editNo">No</button>
              </div>
            </div>
          </div>
          {/* <!-- Edit Modal End --> */}
          {/* <!-- Table Action Button Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};
export default MarkEntry;
