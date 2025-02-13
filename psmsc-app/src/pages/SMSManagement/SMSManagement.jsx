import '../../assets/css/style.css'
import '../../assets/css/all-modal.css'
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/table-funtion.css'


const SMSManagement = ()=>{

    return(

        <>
         {/* <!-- Hero Main Content Start --> */}
    <div class="main-content">
      <div class="page-content">
        <form>
          <div class="sms-bredcam">
            <div class="bredcam-title">
              <h1>SMS Management</h1>
            </div>
          </div>
          <div class="sms-wrapper">
            <div class="wrap">
              <div class="form-row">
                <div class="form-group select-input-box">
                  <label for="select-to">Select SMS To*</label>
                  <div class="select-box-dropdown">
                    <div class="select-dropdown-selected">
                      <span>Select SMS</span>
                      <span class="icon"
                        ><i class="fas fa-angle-down"></i>
                      </span>
                      {/* <!-- Font Awesome angle-down icon --> */}
                    </div>
                    <div class="select-dropdown-items">
                      <input
                        type="text"
                        class="select-search-box"
                        placeholder="Search..."
                      />
                      <div class="option">SMS</div>
                      <div class="option">SMS</div>
                    </div>
                  </div>
                </div>
                <div class="form-group select-input-box">
                  <label for="select-to">Select Class*</label>
                  <div class="select-box-dropdown">
                    <div class="select-dropdown-selected">
                      <span>Select Class</span>
                      <span class="icon"
                        ><i class="fas fa-angle-down"></i>
                      </span>
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
                  <label for="select-to">Select Section*</label>
                  <div class="select-box-dropdown">
                    <div class="select-dropdown-selected">
                      <span>Select Section</span>
                      <span class="icon"
                        ><i class="fas fa-angle-down"></i>
                      </span>
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
                  <label for="select-to">Select Session*</label>
                  <div class="select-box-dropdown">
                    <div class="select-dropdown-selected">
                      <span>Select Session</span>
                      <span class="icon"
                        ><i class="fas fa-angle-down"></i >
                     </span>
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
                <button class="search-btn">Search</button>
              </div>
            </div>
            <div class="sms-balance">
              <h3>SMS Balance</h3>
              <h4>Total Sent SMS: <span>39</span></h4>
              <h4>Total Remaining SMS: <span>429</span></h4>
            </div>
          </div>

          <div class="textarea">
            <div class="form-row">
              <div class="form-group">
                <label for="number">SMS Sending Number:</label>
                <textarea type="text" placeholder="Enter Number..."> </textarea>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="number">Notice:</label>
                <textarea type="text" placeholder="Enter Number..."> </textarea>
              </div>
            </div>
            <button class="send-btn">Send</button>
          </div>
        </form>
        <div class="copyright">
          <p>&copy; 2023. All Rights Reserved.</p>
        </div>
      </div>
    </div>
    {/* <!-- Hero Main Content End --> */}
        </>
    )
}

export default SMSManagement; 