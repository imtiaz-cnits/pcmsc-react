import { useEffect } from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';


/* eslint-disable react/no-unknown-property */
const AdmitCard = () => {


    useEffect(()=>{
      const dropdowns = document.querySelectorAll(".select-box-dropdown");
  
    dropdowns.forEach(function (dropdown) {
      const dropdownSelected = dropdown.querySelector(".select-dropdown-selected");
      const dropdownItems = dropdown.querySelector(".select-dropdown-items");
      const searchBox = dropdown.querySelector(".select-search-box");
      const icon = dropdown.querySelector(".icon i");
  
      // Function to toggle visibility of search box based on number of items
      function toggleSearchInput() {
        const itemCount = dropdownItems.querySelectorAll("div").length;
        if (itemCount >= 3) {
          searchBox.style.display = 'block';
        } else {
          searchBox.style.display = 'none';
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
          dropdownItems.style.top = 'auto';
        } else {
          // Otherwise, show the dropdown below
          dropdownItems.style.top = '100%';
          dropdownItems.style.bottom = 'auto';
        }
      }
  
      // Toggle dropdown visibility
      dropdownSelected.addEventListener("click", function (e) {
        e.stopPropagation();
        
        // Close all other dropdowns
        dropdowns.forEach(function (otherDropdown) {
          if (otherDropdown !== dropdown) {
            otherDropdown.querySelector(".select-dropdown-items").classList.remove("show");
            otherDropdown.querySelector(".icon i").classList.remove("fa-angle-up");
            otherDropdown.querySelector(".icon i").classList.add("fa-angle-down");
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
          searchBox.style.display = 'none';
        }
      });
  
      // Select dropdown item
      dropdownItems.addEventListener("click", function (e) {
        if (e.target.tagName === "DIV") {
          dropdownSelected.querySelector("span").textContent = e.target.textContent;
          dropdownItems.classList.remove("show");
          icon.classList.remove("fa-angle-up");
          icon.classList.add("fa-angle-down");
          searchBox.style.display = 'none';
        }
      });
    });
    })

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
                  <form class="form-wrapper row" style={{ width: 'auto' }}>
                    <div class="form-row col-lg-6">
                      <div class="form-group select-input-box">
                        <label for="select-to">Class*</label>
                        <div class="select-box-dropdown">
                          <div class="select-dropdown-selected">
                            <span>Select Class</span>
                            <span class="icon"
                              ><i class="fas fa-angle-down"></i></span>
                            {/* <!-- Font Awesome angle-down icon --> */}
                          </div>
                          <div class="select-dropdown-items">
                            <input
                              type="text"
                              class="select-search-box"
                              placeholder="Search..."
                            />
                            <div class="option">One</div>
                            <div class="option">Two</div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group select-input-box">
                        <label for="select-to">Session*</label>
                        <div class="select-box-dropdown">
                          <div class="select-dropdown-selected">
                            <span>Select Session</span>
                            <span class="icon"
                              ><i class="fas fa-angle-down"></i></span>
                            {/* <!-- Font Awesome angle-down icon --> */}
                          </div>
                          <div class="select-dropdown-items">
                            <input
                              type="text"
                              class="select-search-box"
                              placeholder="Search..."
                            />
                            <div class="option">2024</div>
                            <div class="option">2025</div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div class="form-row col-lg-6">
                      <div class="form-group select-input-box">
                        <label for="select-to">Section*</label>
                        <div class="select-box-dropdown">
                          <div class="select-dropdown-selected">
                            <span>Select Section</span>
                            <span class="icon"
                              ><i class="fas fa-angle-down"></i></span>
                            {/* <!-- Font Awesome angle-down icon --> */}
                          </div>
                          <div class="select-dropdown-items">
                            <input
                              type="text"
                              class="select-search-box"
                              placeholder="Search..."
                            />
                            <div class="option">Science</div>
                            <div class="option">Commerce</div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group select-input-box">
                        <label for="select-to">Shift*</label>
                        <div class="select-box-dropdown">
                          <div class="select-dropdown-selected">
                            <span>Select Shift</span>
                            <span class="icon"
                              ><i class="fas fa-angle-down"></i></span>
                            {/* <!-- Font Awesome angle-down icon --> */}
                          </div>
                          <div class="select-dropdown-items">
                            <input
                              type="text"
                              class="select-search-box"
                              placeholder="Search..."
                            />
                            <div class="option">Morning</div>
                            <div class="option">Day</div>
                          </div>
                        </div>
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
