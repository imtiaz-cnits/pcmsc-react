import { useState } from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/table-funtion.css";

/* eslint-disable react/no-unknown-property */
const AdmitCard = () => {
  const [sclass, setSclass] = useState("");
  const [session, setSession] = useState("");
  const [ssection, setSsection] = useState("");
  const [shift, setShift] = useState("");

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div class="main-content">
        <div class="page-content">
          <div class="data-table">
            <div class="card mark-entry-wrap">
              <div class="card-body">
                {/* <!-- Class heading Start --> */}
                <div class="exam-heading">
                  <h3 class="heading">Admit Card</h3>
                </div>
                {/* <!-- Class heading End --> */}

                {/* <!-- Form Start --> */}
                <div class="class-wise-form mb-2">
                  <div class="mark-entry-form">
                    <form class="form-wrapper row" style={{ width: "auto" }}>
                      <div class="form-row col-lg-6">
                        <div class="form-group select-input-box">
                          <label for="select-to">Class*</label>

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
                        <div class="form-group select-input-box">
                          <label for="select-to">Session*</label>

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
                      <div class="form-row col-lg-6">
                        <div class="form-group select-input-box">
                          <label for="select-to">Section*</label>
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
                        <div class="form-group select-input-box">
                          <label for="select-to">Shift*</label>
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
                      </div>
                    </form>
                  </div>
                  <button class="search-btn">Search</button>
                </div>
                {/* <!-- Form Start --> */}
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
        <!-- Table Action Button Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default AdmitCard;
