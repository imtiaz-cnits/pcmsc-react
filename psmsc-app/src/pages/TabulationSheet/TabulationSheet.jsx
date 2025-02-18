/* eslint-disable react/no-unknown-property */
import "../../assets/css/all-modal.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/table-funtion.css";

import { useEffect } from "react";

const TabulationSheet = () => {
  useEffect(() => {
    const dropdowns = document.querySelectorAll(".select-box-dropdown");

    dropdowns.forEach(function (dropdown) {
      const dropdownSelected = dropdown.querySelector(
        ".select-dropdown-selected",
      );
      const dropdownItems = dropdown.querySelector(".select-dropdown-items");
      const searchBox = dropdown.querySelector(".select-search-box");
      const icon = dropdown.querySelector(".icon i");

      // Function to toggle visibility of search box based on number of items
      function toggleSearchInput() {
        const itemCount = dropdownItems.querySelectorAll("div").length;
        if (itemCount >= 3) {
          searchBox.style.display = "block";
        } else {
          searchBox.style.display = "none";
        }
      }

      // Function to position the dropdown dynamically
      function positionDropdown() {
        const rect = dropdown.getBoundingClientRect(); // Get the position of the dropdown container
        const dropdownHeight = dropdownItems.offsetHeight;
        const spaceBelow = window.innerHeight - rect.bottom; // Available space below the dropdown
        const spaceAbove = rect.top; // Available space above the dropdown

        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
          // If there's not enough space below, show the dropdown above
          dropdownItems.style.bottom = `${dropdownHeight + 10}px`; // Add some space between the dropdown and the container
          dropdownItems.style.top = "auto";
        } else {
          // Otherwise, show the dropdown below
          dropdownItems.style.top = "100%";
          dropdownItems.style.bottom = "auto";
        }
      }

      // Toggle dropdown visibility
      dropdownSelected.addEventListener("click", function (e) {
        e.stopPropagation();

        // Close all other dropdowns
        dropdowns.forEach(function (otherDropdown) {
          if (otherDropdown !== dropdown) {
            otherDropdown
              .querySelector(".select-dropdown-items")
              .classList.remove("show");
            otherDropdown
              .querySelector(".icon i")
              .classList.remove("fa-angle-up");
            otherDropdown
              .querySelector(".icon i")
              .classList.add("fa-angle-down");
          }
        });

        // Toggle current dropdown visibility
        dropdownItems.classList.toggle("show");

        // Toggle icon rotation
        if (dropdownItems.classList.contains("show")) {
          icon.classList.remove("fa-angle-down");
          icon.classList.add("fa-angle-up");
        } else {
          icon.classList.remove("fa-angle-up");
          icon.classList.add("fa-angle-down");
        }

        // Call function to toggle search input visibility
        toggleSearchInput();

        // Position the dropdown based on available space
        if (dropdownItems.classList.contains("show")) {
          positionDropdown();
        }
      });

      // Filter dropdown items based on search
      searchBox.addEventListener("input", function () {
        const filter = searchBox.value.toLowerCase();
        const items = dropdownItems.querySelectorAll("div");

        items.forEach(function (item) {
          const text = item.textContent.toLowerCase();
          if (text.includes(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });

      // Close the dropdown if clicked outside
      document.addEventListener("click", function (e) {
        if (!e.target.closest(".select-box-dropdown")) {
          dropdownItems.classList.remove("show");
          icon.classList.remove("fa-angle-up");
          icon.classList.add("fa-angle-down");
          searchBox.style.display = "none";
        }
      });

      // Select dropdown item
      dropdownItems.addEventListener("click", function (e) {
        if (e.target.tagName === "DIV") {
          dropdownSelected.querySelector("span").textContent =
            e.target.textContent;
          dropdownItems.classList.remove("show");
          icon.classList.remove("fa-angle-up");
          icon.classList.add("fa-angle-down");
          searchBox.style.display = "none";
        }
      });
    });
  }, []);

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card mark-entry-wrap">
              <div className="card-body">
                {/* <!-- className heading Start --> */}
                <div className="exam-heading">
                  <h3 className="heading">Tabulation Sheet</h3>
                </div>
                {/* <!-- className heading End --> */}

                {/* <!-- Form Start --> */}
                <div className="className-wise-form mb-2">
                  <div className="mark-entry-form">
                    <form
                      className="form-wrapper row"
                      style={{ width: "auto" }}
                    >
                      <div className="form-row col-lg-6">
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
                      <div className="form-row col-lg-6">
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
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default TabulationSheet;
