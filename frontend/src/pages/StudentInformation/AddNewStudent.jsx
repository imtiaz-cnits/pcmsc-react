import "../../assets/css/all-modal.css";

const AddNewStudent = () => {

   

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          {/* <!-- Table Start --> */}
         
        
      
       

        {/* <!-- Add Students - Pop Up Modal Start -->  */}
          <section id="studentModal" className=" studentModal ">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>New Student Admission</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-4">
                        <label htmlFor="admission-number">
                          Admission Number
                        </label>
                        <input
                          type="text"
                          id="admission-number"
                          placeholder="Enter admission number"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="vanilla-datepicker">
                          Admission Date *
                        </label>
                        <div className="input-datepicker-wrapper">
                          <input
                            type="text"
                            className="datepicker-input"
                            placeholder="dd/mm/yyyy"
                          />
                          <i className="fas fa-calendar-alt icon"></i>
                        </div>
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="student-name">Student's Name *</label>
                        <input
                          type="text"
                          id="student-name"
                          placeholder="Enter student's name"
                        />
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="name-bangla">Name in Bangla</label>
                        <input
                          type="text"
                          id="name-bangla"
                          placeholder="বাংলায় নাম লিখুন"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="birth-certificate">
                          Birth Certificate
                        </label>
                        <input
                          type="text"
                          id="birth-certificate"
                          placeholder="Enter birth certificate number"
                        />
                      </div>
                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Blood Group</label>
                        <div className="select-box-dropdown">
                          <div className="select-dropdown-selected">
                            <span>Select Blood Group</span>
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
                            <div className="option">A</div>
                            <div className="option">B</div>
                            <div className="option">AB</div>
                            <div className="option">B+</div>
                            <div className="option">O+</div>
                            <div className="option">AB-</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Row 3 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-4">
                        <label htmlFor="religion">Religion</label>
                        <input
                          type="text"
                          id="religion"
                          placeholder="Enter religion"
                        />
                      </div>
                      <div className="form-group col-lg-8">
                        <label htmlFor="photo">Photo</label>
                        <div className="upload-profile">
                          <div className="item">
                            <div className="img-box">
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              >
                                <rect
                                  width="50"
                                  height="50"
                                  fill="url(#pattern0_1204_6)"
                                  fillOpacity="0.5"
                                />
                                <defs>
                                  <pattern
                                    id="pattern0_1204_6"
                                    patternContentUnits="objectBoundingBox"
                                    width="1"
                                    height="1"
                                  >
                                    <use
                                      xlinkHref="#image0_1204_6"
                                      transform="scale(0.005)"
                                    />
                                  </pattern>
                                  <image
                                    id="image0_1204_6"
                                    width="200"
                                    height="200"
                                    xlinkHref="data:image/png;base64,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"
                                  />
                                </defs>
                              </svg>
                            </div>

                            <div className="profile-wrapper">
                              <label className="custom-file-input-wrapper m-0">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  aria-label="Upload Photo"
                                />
                              </label>
                              <p>PNG,JPEG or GIF (up to 1 MB)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Row 4 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-4">
                        <label htmlFor="father-name">Father's Name *</label>
                        <input
                          type="text"
                          id="father-name"
                          placeholder="Enter father's name"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="father-nid">Father's NID</label>
                        <input
                          type="text"
                          id="father-nid"
                          placeholder="Enter father's NID"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="father-mobile">
                          Father's Mobile No *
                        </label>
                        <input
                          type="text"
                          id="father-mobile"
                          placeholder="Enter father's mobile number"
                        />
                      </div>
                    </div>

                    {/* <!-- Row 5 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-4">
                        <label htmlFor="mother-name">Mother's Name *</label>
                        <input
                          type="text"
                          id="mother-name"
                          placeholder="Enter mother's name"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="mother-nid">Mother's NID</label>
                        <input
                          type="text"
                          id="mother-nid"
                          placeholder="Enter mother's NID"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="mother-mobile">
                          Mother's Mobile No *
                        </label>
                        <input
                          type="text"
                          id="mother-mobile"
                          placeholder="Enter mother's mobile number"
                        />
                      </div>
                    </div>

                    {/* <!-- Row 6 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-4">
                        <label htmlFor="present-address">
                          Present Address *
                        </label>
                        <input
                          type="text"
                          id="present-address"
                          placeholder="Enter present address"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="permanent-address">
                          Permanent Address *
                        </label>
                        <input
                          type="text"
                          id="permanent-address"
                          placeholder="Enter permanent address"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="guardian">
                          Guardian (In Absence of F/M)
                        </label>
                        <input
                          type="text"
                          id="guardian"
                          placeholder="Enter guardian's name"
                        />
                      </div>
                    </div>

                    {/* <!-- Row 7 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-4">
                        <label htmlFor="guardian-mobile">
                          Guardian Mobile *
                        </label>
                        <input
                          type="text"
                          id="guardian-mobile"
                          placeholder="Enter guardian's mobile number"
                        />
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="vanilla-datepicker">
                          Date of Birth *
                        </label>
                        <div className="input-datepicker-wrapper">
                          <input
                            type="text"
                            className="datepicker-input"
                            placeholder="dd/mm/yyyy"
                          />
                          <i className="fas fa-calendar-alt icon"></i>
                        </div>
                      </div>
                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Student Gender</label>
                        <div className="select-box-dropdown">
                          <div className="select-dropdown-selected">
                            <span>Select Gender</span>
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
                            <div className="option">Male</div>
                            <div className="option">Female</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Row 8 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-4">
                        <label htmlFor="student-email">Student Email</label>
                        <input
                          type="email"
                          id="student-email"
                          placeholder="Enter student email"
                        />
                      </div>
                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">SMS Status</label>
                        <div className="select-box-dropdown">
                          <div className="select-dropdown-selected">
                            <span>Select Status</span>
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
                            <div className="option">Active</div>
                            <div className="option">Inactive</div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="vanilla-datepicker">
                          Registration Date *
                        </label>
                        <div className="input-datepicker-wrapper">
                          <input
                            type="text"
                            className="datepicker-input"
                            placeholder="dd/mm/yyyy"
                          />
                          <i className="fas fa-calendar-alt icon"></i>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Row 9 --> */}
                    <div className="form-row row">
                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Shift Name</label>
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
                            <div className="option">Evening</div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="section">Section Name</label>
                        <input
                          type="text"
                          id="section"
                          placeholder="Enter section name"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="session">Session Name</label>
                        <input
                          type="text"
                          id="session"
                          placeholder="Enter session name"
                        />
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="closBtn"
                        className="button close"
                      >
                        Close
                      </button>
                      <button type="reset" className="button reset">
                        Reset
                      </button>
                      <button type="submit" className="button save">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Add Students - Pop Up Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};
export default AddNewStudent;
