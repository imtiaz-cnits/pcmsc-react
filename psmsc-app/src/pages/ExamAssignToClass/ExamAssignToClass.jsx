import { useEffect, useState } from "react";

const ExamAssignToclassName = () => {
  const [session, setSession] = useState("");
  const [semesterName, setSemesterName] = useState("");

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

<<<<<<< HEAD
  useEffect(() => {
    // Initialize Vanilla Datepicker on specific elements
    const vanillaInputs = document.querySelectorAll(".datepicker-input");

    vanillaInputs.forEach((input) => {
      const picker = new Datepicker(input, {
        format: "dd/mm/yyyy",
        autohide: true,
      });

      // Open the picker when the input field is clicked
      input.addEventListener("click", function () {
        picker.show();
      });

      // Open the picker when the calendar icon is clicked
      input.nextElementSibling?.addEventListener("click", function () {
        picker.show();
      });

      // Insert slashes automatically as the user types
      input.addEventListener("input", function (event) {
        let value = input.value.replace(/\D/g, "").substring(0, 8); // Remove non-numeric characters and limit to 8 digits (DDMMYYYY)

        if (event.inputType === "deleteContentBackward") {
          value = "";
          picker.setDate(new Date()); // Reset to today's date
          picker.show();
        }

        if (value.length >= 2) {
          value = value.slice(0, 2) + "/" + value.slice(2);
        }
        if (value.length >= 5) {
          value = value.slice(0, 5) + "/" + value.slice(5);
        }

        input.value = value;
      });
    });

    // Cleanup: Remove event listeners when component unmounts
    return () => {
      vanillaInputs.forEach((input) => {
        input.removeEventListener("click", () => {});
        input.removeEventListener("input", () => {});
      });
    };
  }, []);
=======
  useEffect(()=>{


    // Initialize Vanilla Datepicker
const vanillaInputs = document.querySelectorAll(".datepicker-input");

vanillaInputs.forEach((input) => {
  // Initialize each datepicker instance
  const picker = new Datepicker(input, {
    format: "dd/mm/yyyy",
    autohide: true,
  });

  // Open the picker when the input field is clicked
  input.addEventListener("click", function () {
    picker.show();
  });

  // Open the picker when the calendar icon is clicked
  input.nextElementSibling.addEventListener("click", function () {
    picker.show();
  });

  // Insert slashes automatically as the user types
  input.addEventListener("input", function (event) {
    let value = input.value.replace(/\D/g, "").substring(0, 8); // Remove non-numeric characters and limit to 8 digits (DDMMYYYY)

    // Clear the entire input (numeric and non-numeric) if backspace is pressed
    if (event.inputType === "deleteContentBackward") {
      value = ""; // Remove everything when backspace is pressed
      picker.setDate(new Date()); // Set to today's date
      picker.show(); // Show the picker again
    }

    // Insert slashes after every 2 digits
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + "/" + value.slice(5);
    }

    // Update the input field with the formatted value
    input.value = value;
  });
});

  },[])
>>>>>>> branch-6

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
                  <h3 className="heading">Exam Assign To Class List</h3>
                  <button className="create-cls-btn" id="exmModalBtn">
                    Add Exam
                  </button>
                </div>
                {/* <!-- className heading End --> */}

                {/* <!-- Action Buttons --> */}
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
                <div className="table-wrapper grade-table-wrapper">
                  <table
                    id="printTable"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Sl No:</th>
                        <th>Session</th>
                        <th>Exam Name</th>
                        <th>Class Name</th>
                        <th>Exam Date</th>
                        <th>Result Date & Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>2024</td>
                        <td>1st Semester</td>
                        <td>One</td>
                        <td>2024-12-04</td>
                        <td>2024-12-04 12:45:53</td>
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
                        <td>0</td>
                        <td>2024</td>
                        <td>2st Semester</td>
                        <td>Two</td>
                        <td>2024-02-04</td>
                        <td>2024-12-04 12:45:53</td>
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

        <!-- Exam Assign Pop Up Modal Start --> */}
          <div className="exam-assign">
            <section id="exmModal" className="modal">
              <div className="modal-content">
                <div id="popup-modal">
                  <div className="form-container">
                    <h3>Add Exam</h3>
                    <form>
                      {/* <!-- Row 1 --> */}
                      <div className="form-row row">
                        <div className="form-group select-input-box col-12">
                          <label htmlFor="select-to">Session Name*</label>

                          <select
                            name=""
                            id=""
                            value={session}
                            onChange={(e) => setSession(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Session
                            </option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                          </select>
                        </div>
                        <div className="form-group select-input-box col-12">
                          <label htmlFor="select-to">Exam Name*</label>

                          <select
                            name=""
                            id=""
                            value={semesterName}
                            onChange={(e) => setSemesterName(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Name
                            </option>
                            <option value="1st Semester">1st Semester</option>
                            <option value="2nd Semester">2nd Semester</option>
                          </select>
                        </div>
                        <div className="form-group col-12">
                          <label htmlFor="shift">Class Name*</label>
                          <input type="text" placeholder="Type Name" />
                        </div>
                        <div className="form-group col-12">
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
                        <div className="form-group col-12">
                          <label htmlFor="dob">Date of Birth</label>
                          <input type="datetime-local" id="dob" />
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

          {/* <!-- Exam Assign Pop Up Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default ExamAssignToclassName;
