import { Link } from "react-router-dom";
import "../../assets/css/all-modal.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/dark-mode.css";
import "../../assets/css/navbar-sidebar.css";
import "../../assets/css/style.css";
import "../../assets/css/table-funtion.css";
import logo from "../../assets/img/logo.png";
import Toggle from "../Toggle/Toggle";

const Sidebar = () => {
  return (
    <>
      {/* <!-- Left Sidebar Start --> */}
      <div className="vertical-menu">
        <button
          type="button"
          className="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn vertical-menu-btn2"
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
        {/* <!-- LOGO Box --> */}
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" width="38" height="38" />
            </span>
            <span className="logo-sm2">
              <img src={logo} alt="" width="38" height="38" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" width="38" height="38" />

              <span className="brand-name">
                PCMSC <span>Pabna</span>
              </span>
            </span>
          </Link>
        </div>
        {/* <!-- Logo Box End --> */}

        {/* <!--- Side Menu --> */}
        <div data-simplebar className="sidebar-menu-scroll">
          <div id="sidebar-menu">
            {/* <!-- Left Menu Start --> */}
            <div className="nav">
              <div className="menu">
                <ul>
                  <li className="active-link">
                    <Link to="/">
                      <svg
                        width="54"
                        height="53"
                        viewBox="0 0 54 53"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="35.5"
                          y="34.5"
                          width="17"
                          height="17"
                          rx="1.5"
                          stroke="#2E97A7"
                          strokeWidth="3"
                        />
                        <rect
                          x="35.5"
                          y="8.5"
                          width="17"
                          height="17"
                          rx="1.5"
                          stroke="#2E97A7"
                          strokeWidth="3"
                        />
                        <rect
                          x="1.5"
                          y="1.5"
                          width="25"
                          height="24"
                          rx="1.5"
                          stroke="#2E97A7"
                          strokeWidth="3"
                        />
                        <rect
                          x="9.5"
                          y="34.5"
                          width="17"
                          height="17"
                          rx="1.5"
                          stroke="#2E97A7"
                          strokeWidth="3"
                        />
                      </svg>

                      <span className="text">Dashboard</span>
                    </Link>
                  </li>

                  <Toggle />

                  <li className="active-link">
                    <Link to="/sms-management">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.57692 15.25H1.54808C1.40272 15.25 1.26331 15.1874 1.16053 15.0761C1.05774 14.9647 1 14.8137 1 14.6562V8.125C1 6.23533 1.69292 4.42306 2.92634 3.08686C4.15975 1.75067 5.83261 1 7.57692 1C9.32123 1 10.9941 1.75067 12.2275 3.08686C13.4609 4.42306 14.1538 6.23533 14.1538 8.125C14.1538 10.0147 13.4609 11.8269 12.2275 13.1631C10.9941 14.4993 9.32123 15.25 7.57692 15.25Z"
                          stroke="#008AEE"
                          strokeWidth="1.44471"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.2207 15.25C7.67415 16.6394 8.51414 17.8424 9.62496 18.6931C10.7358 19.5438 12.0628 20.0004 13.4231 20H19.4519C19.5973 20 19.7367 19.9375 19.8395 19.8261C19.9423 19.7148 20 19.5637 20 19.4063V12.875C20.0024 11.0514 19.3583 9.29634 18.2007 7.9723C17.0431 6.64826 15.4604 5.8563 13.7794 5.75992"
                          stroke="#008AEE"
                          strokeWidth="1.44471"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect
                          x="4.42004"
                          y="7.45999"
                          width="0.76"
                          height="0.76"
                          fill="#AF2222"
                          stroke="#008AEE"
                          strokeWidth="0.76"
                        />
                        <rect
                          x="7.46008"
                          y="7.45999"
                          width="0.76"
                          height="0.76"
                          fill="#AF2222"
                          stroke="#008AEE"
                          strokeWidth="0.76"
                        />
                        <rect
                          x="10.5001"
                          y="7.45999"
                          width="0.76"
                          height="0.76"
                          fill="#AF2222"
                          stroke="#008AEE"
                          strokeWidth="0.76"
                        />
                      </svg>
                      <span className="text">SMS Management</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- Sidebar --> */}
        </div>
        <li className="log-out">
          <Link href="/">
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0556 2.76261H23.2222C24.7564 2.76261 26 3.96443 26 5.44695V6.78912M19.0556 24.2374H23.2222C24.7564 24.2374 26 23.0356 26 21.553V20.2108M2.97958 23.4691L11.3129 25.885C13.0951 26.4018 14.8889 25.1121 14.8889 23.3138V3.6861C14.8889 1.88797 13.0951 0.598274 11.3129 1.11497L2.97958 3.53088C1.80464 3.87151 1 4.91658 1 6.10201V20.8979C1 22.0834 1.80464 23.1285 2.97958 23.4691Z"
                stroke="#008AEE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33431 13.5H9.33331"
                stroke="#008AEE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.0555 13.5H26M26 13.5L23.2222 10.8156M26 13.5L23.2222 16.1843"
                stroke="#008AEE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text">Log Out</span>
          </Link>
        </li>
      </div>
      {/* <!-- Left Sidebar End --> */}
    </>
  );
};

export default Sidebar;
