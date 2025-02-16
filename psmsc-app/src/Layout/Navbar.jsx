import logo from "../assets/img/logo.png";
import "../assets/css/navbar-sidebar.css";
import usjpg from "../assets/img/flags/us.jpg";
import spainjpg from "../assets/img/flags/spain.jpg";
import germanyjpg from "../assets/img/flags/germany.jpg";
import italyjpg from "../assets/img/flags/italy.jpg";
import russiajpg from "../assets/img/flags/russia.jpg";
import navbparProfileImg from "../assets/img/navbar-profile-logo.png";
import "../assets/css/navbar-sidebar.css";
import "../assets/css/table-funtion.css";
import "../assets/css/style.css";
import "../assets/css/dark-mode.css";
import productMemberPng from "../assets/img/projuct-member-img-3.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* <!-- Navbar Start --> */}
      <nav id="page-topbar" className="isvertical-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            {/* <!-- LOGO --> */}
            <div className="navbar-brand-box">
              <Link to="index.html" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" width="38" height="38" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn"
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </button>

            {/* <!-- navbar searchbar --> */}
            <div className="search-bar-box d-flex align-items-center">
              <input type="text" placeholder="Search..." />
              <button className="nav-src-btn">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2967 16.9811H18.0695L17.6449 16.5566C19.1578 14.8045 20.0686 12.5274 20.0686 10.0343C20.0686 4.49228 15.5763 0 10.0343 0C4.49228 0 0 4.49228 0 10.0343C0 15.5763 4.49228 20.0686 10.0343 20.0686C12.5274 20.0686 14.8045 19.1578 16.5566 17.6527L16.9811 18.0772V19.2967L24.6998 27L27 24.6998L19.2967 16.9811ZM10.0343 16.9811C6.19811 16.9811 3.08748 13.8705 3.08748 10.0343C3.08748 6.19811 6.19811 3.08748 10.0343 3.08748C13.8705 3.08748 16.9811 6.19811 16.9811 10.0343C16.9811 13.8705 13.8705 16.9811 10.0343 16.9811Z"
                    fill="#192045"
                  />
                </svg>
              </button>
            </div>
            {/* <!-- end navbar searchbar --> */}
          </div>

          <div className="d-flex align-items-center dropdown-container">
            <button
              className="light-mode-button"
              aria-label="Toggle Light Mode"
              onClick="toggle_light_mode()"
            >
              <span></span>
              <span></span>
            </button>

            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item search-icon"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2967 16.9811H18.0695L17.6449 16.5566C19.1578 14.8045 20.0686 12.5274 20.0686 10.0343C20.0686 4.49228 15.5763 0 10.0343 0C4.49228 0 0 4.49228 0 10.0343C0 15.5763 4.49228 20.0686 10.0343 20.0686C12.5274 20.0686 14.8045 19.1578 16.5566 17.6527L16.9811 18.0772V19.2967L24.6998 27L27 24.6998L19.2967 16.9811ZM10.0343 16.9811C6.19811 16.9811 3.08748 13.8705 3.08748 10.0343C3.08748 6.19811 6.19811 3.08748 10.0343 3.08748C13.8705 3.08748 16.9811 6.19811 16.9811 10.0343C16.9811 13.8705 13.8705 16.9811 10.0343 16.9811Z"
                    fill="#192045"
                  />
                </svg>
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
                <form className="p-2">
                  <div className="search-box">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control rounded border-0"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="d-flex align-items-center toggle-full-screen">
              <button
                className="js-toggle-fullscreen-btn toggle-fullscreen-btn"
                aria-label="Enter fullscreen mode"
                hidden
              >
                <svg
                  width="27"
                  height="27"
                  className="toggle-fullscreen-svg"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="icon-fullscreen-enter">
                    <path
                      d="M2 7.5H0V3C0 2.20435 0.31607 1.44129 0.87868 0.87868C1.44129 0.31607 2.20435 0 3 0H7.5V2H2V7.5Z"
                      fill="#192045"
                    />
                    <path
                      d="M30 7.5H28V2H22.5V0H27C27.7956 0 28.5587 0.31607 29.1213 0.87868C29.6839 1.44129 30 2.20435 30 3V7.5Z"
                      fill="#192045"
                    />
                    <path
                      d="M7.5 30H3C2.20435 30 1.44129 29.6839 0.87868 29.1213C0.31607 28.5587 0 27.7956 0 27V22.5H2V28H7.5V30Z"
                      fill="#192045"
                    />
                    <path
                      d="M27 30H22.5V28H28V22.5H30V27C30 27.7956 29.6839 28.5587 29.1213 29.1213C28.5587 29.6839 27.7956 30 27 30Z"
                      fill="#192045"
                    />
                    <path
                      d="M9.00052 10.5C8.80311 10.5011 8.60742 10.4633 8.42466 10.3887C8.24191 10.314 8.07568 10.204 7.93552 10.065L6.43552 8.565C6.15307 8.28255 5.99438 7.89946 5.99438 7.5C5.99438 7.10055 6.15307 6.71746 6.43552 6.435C6.71798 6.15255 7.10107 5.99387 7.50052 5.99387C7.89998 5.99387 8.28307 6.15255 8.56552 6.435L10.0655 7.935C10.2061 8.07445 10.3177 8.24035 10.3939 8.42314C10.47 8.60593 10.5092 8.80199 10.5092 9C10.5092 9.19802 10.47 9.39408 10.3939 9.57687C10.3177 9.75966 10.2061 9.92556 10.0655 10.065C9.92536 10.204 9.75914 10.314 9.57638 10.3887C9.39363 10.4633 9.19793 10.5011 9.00052 10.5Z"
                      fill="#192045"
                    />
                    <path
                      d="M20.9995 10.5C20.8021 10.5011 20.6064 10.4633 20.4237 10.3887C20.2409 10.314 20.0747 10.204 19.9345 10.065C19.7939 9.92556 19.6824 9.75966 19.6062 9.57687C19.5301 9.39408 19.4908 9.19802 19.4908 9C19.4908 8.80199 19.5301 8.60593 19.6062 8.42314C19.6824 8.24035 19.7939 8.07445 19.9345 7.935L21.4345 6.435C21.717 6.15255 22.1001 5.99387 22.4995 5.99387C22.899 5.99387 23.2821 6.15255 23.5645 6.435C23.847 6.71746 24.0057 7.10055 24.0057 7.5C24.0057 7.89946 23.847 8.28255 23.5645 8.565L22.0645 10.065C21.9244 10.204 21.7582 10.314 21.5754 10.3887C21.3926 10.4633 21.197 10.5011 20.9995 10.5Z"
                      fill="#192045"
                    />
                    <path
                      d="M7.49991 24C7.3025 24.0011 7.10681 23.9633 6.92405 23.8887C6.74129 23.814 6.57507 23.704 6.43491 23.565C6.29432 23.4256 6.18272 23.2597 6.10657 23.0769C6.03042 22.8941 5.99121 22.698 5.99121 22.5C5.99121 22.302 6.03042 22.1059 6.10657 21.9231C6.18272 21.7403 6.29432 21.5744 6.43491 21.435L7.93491 19.935C8.21736 19.6525 8.60046 19.4939 8.99991 19.4939C9.39936 19.4939 9.78245 19.6525 10.0649 19.935C10.3474 20.2175 10.506 20.6006 10.506 21C10.506 21.3995 10.3474 21.7825 10.0649 22.065L8.56491 23.565C8.42475 23.704 8.25852 23.814 8.07577 23.8887C7.89301 23.9633 7.69732 24.0011 7.49991 24Z"
                      fill="#192045"
                    />
                    <path
                      d="M22.5 24C22.3026 24.0011 22.1069 23.9633 21.9242 23.8887C21.7414 23.814 21.5752 23.704 21.435 23.565L19.935 22.065C19.6526 21.7825 19.4939 21.3995 19.4939 21C19.4939 20.8022 19.5329 20.6064 19.6085 20.4236C19.6842 20.2409 19.7952 20.0749 19.935 19.935C20.0749 19.7951 20.2409 19.6842 20.4237 19.6085C20.6064 19.5328 20.8022 19.4939 21 19.4939C21.3995 19.4939 21.7826 19.6525 22.065 19.935L23.565 21.435C23.7056 21.5744 23.8172 21.7403 23.8934 21.9231C23.9695 22.1059 24.0087 22.302 24.0087 22.5C24.0087 22.698 23.9695 22.8941 23.8934 23.0769C23.8172 23.2597 23.7056 23.4256 23.565 23.565C23.4249 23.704 23.2587 23.814 23.0759 23.8887C22.8931 23.9633 22.6974 24.0011 22.5 24Z"
                      fill="#192045"
                    />
                  </g>
                  <g className="icon-fullscreen-leave">
                    <path
                      d="M9.00052 10.5C8.80311 10.5011 8.60742 10.4633 8.42466 10.3887C8.24191 10.314 8.07568 10.204 7.93552 10.065L6.43552 8.565C6.15307 8.28255 5.99438 7.89946 5.99438 7.5C5.99438 7.10055 6.15307 6.71746 6.43552 6.435C6.71798 6.15255 7.10107 5.99387 7.50052 5.99387C7.89998 5.99387 8.28307 6.15255 8.56552 6.435L10.0655 7.935C10.2061 8.07445 10.3177 8.24035 10.3939 8.42314C10.47 8.60593 10.5092 8.80199 10.5092 9C10.5092 9.19802 10.47 9.39408 10.3939 9.57687C10.3177 9.75966 10.2061 9.92556 10.0655 10.065C9.92536 10.204 9.75914 10.314 9.57638 10.3887C9.39363 10.4633 9.19793 10.5011 9.00052 10.5Z"
                      fill="#192045"
                    />
                    <path
                      d="M20.9995 10.5C20.8021 10.5011 20.6064 10.4633 20.4237 10.3887C20.2409 10.314 20.0747 10.204 19.9345 10.065C19.7939 9.92556 19.6824 9.75966 19.6062 9.57687C19.5301 9.39408 19.4908 9.19802 19.4908 9C19.4908 8.80199 19.5301 8.60593 19.6062 8.42314C19.6824 8.24035 19.7939 8.07445 19.9345 7.935L21.4345 6.435C21.717 6.15255 22.1001 5.99387 22.4995 5.99387C22.899 5.99387 23.2821 6.15255 23.5645 6.435C23.847 6.71746 24.0057 7.10055 24.0057 7.5C24.0057 7.89946 23.847 8.28255 23.5645 8.565L22.0645 10.065C21.9244 10.204 21.7582 10.314 21.5754 10.3887C21.3926 10.4633 21.197 10.5011 20.9995 10.5Z"
                      fill="#192045"
                    />
                    <path
                      d="M7.49991 24C7.3025 24.0011 7.10681 23.9633 6.92405 23.8887C6.74129 23.814 6.57507 23.704 6.43491 23.565C6.29432 23.4256 6.18272 23.2597 6.10657 23.0769C6.03042 22.8941 5.99121 22.698 5.99121 22.5C5.99121 22.302 6.03042 22.1059 6.10657 21.9231C6.18272 21.7403 6.29432 21.5744 6.43491 21.435L7.93491 19.935C8.21736 19.6525 8.60046 19.4939 8.99991 19.4939C9.39936 19.4939 9.78245 19.6525 10.0649 19.935C10.3474 20.2175 10.506 20.6006 10.506 21C10.506 21.3995 10.3474 21.7825 10.0649 22.065L8.56491 23.565C8.42475 23.704 8.25852 23.814 8.07577 23.8887C7.89301 23.9633 7.69732 24.0011 7.49991 24Z"
                      fill="#192045"
                    />
                    <path
                      d="M22.5 24C22.3026 24.0011 22.1069 23.9633 21.9242 23.8887C21.7414 23.814 21.5752 23.704 21.435 23.565L19.935 22.065C19.6526 21.7825 19.4939 21.3995 19.4939 21C19.4939 20.8022 19.5329 20.6064 19.6085 20.4236C19.6842 20.2409 19.7952 20.0749 19.935 19.935C20.0749 19.7951 20.2409 19.6842 20.4237 19.6085C20.6064 19.5328 20.8022 19.4939 21 19.4939C21.3995 19.4939 21.7826 19.6525 22.065 19.935L23.565 21.435C23.7056 21.5744 23.8172 21.7403 23.8934 21.9231C23.9695 22.1059 24.0087 22.302 24.0087 22.5C24.0087 22.698 23.9695 22.8941 23.8934 23.0769C23.8172 23.2597 23.7056 23.4256 23.565 23.565C23.4249 23.704 23.2587 23.814 23.0759 23.8887C22.8931 23.9633 22.6974 24.0011 22.5 24Z"
                      fill="#192045"
                    />
                  </g>
                </svg>
              </button>
            </div>

            {/* <!-- <div className="dropdown d-inline-block">
        <button
          type="button"
          className="btn header-item noti-icon right-bar-toggle notification-icon"
          id="right-bar-toggle-v"
        >
          <svg
            className="topbar-setting"
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9998 20.6154C18.7551 20.6154 20.9888 18.549 20.9888 16C20.9888 13.451 18.7551 11.3846 15.9998 11.3846C13.2444 11.3846 11.0108 13.451 11.0108 16C11.0108 18.549 13.2444 20.6154 15.9998 20.6154Z"
              stroke="#192045"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M30.6649 9.49923L29.4176 7.50077C28.7291 6.39654 27.2037 6.01923 26.0101 6.65615L25.3541 7.00692C22.8596 8.33846 19.7415 6.67346 19.7415 4.00923V3.30769C19.7415 2.03269 18.6252 1 17.247 1H14.7525C13.3743 1 12.258 2.03269 12.258 3.30769V4.00923C12.258 6.67346 9.13986 8.33962 6.64537 7.00692L5.98931 6.65615C4.7957 6.01923 3.27031 6.39654 2.58183 7.50077L1.33459 9.49923C0.646106 10.6035 1.05396 12.0146 2.24757 12.6515L2.90362 13.0023C5.39812 14.335 5.39812 17.665 2.90362 18.9977L2.24757 19.3485C1.05396 19.9854 0.646106 21.3965 1.33459 22.5008L2.58183 24.4992C3.27031 25.6035 4.7957 25.9808 5.98931 25.3438L6.64537 24.9931C9.13986 23.6604 12.258 25.3265 12.258 27.9908V28.6923C12.258 29.9673 13.3743 31 14.7525 31H17.247C18.6252 31 19.7415 29.9673 19.7415 28.6923V27.9908C19.7415 25.3265 22.8596 23.6604 25.3541 24.9931L26.0101 25.3438C27.2037 25.9808 28.7291 25.6035 29.4176 24.4992L30.6649 22.5008C31.3533 21.3965 30.9455 19.9854 29.7519 19.3485L29.0958 18.9977C26.6013 17.665 26.6013 14.335 29.0958 13.0023L29.7519 12.6515C30.9455 12.0146 31.3546 10.6035 30.6649 9.49923Z"
              stroke="#192045"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div> -->
*/}
            {/* <!-- <div className="dropdown d-inline-block language-switch">
        <button
          type="button"
          className="btn header-item language-switch-icon"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 0C6.72937 0 0 6.72937 0 15C0 23.2706 6.72937 30 15 30C23.2706 30 30 23.2706 30 15C30 6.72937 23.2706 0 15 0ZM16.25 1.30938V2.86625L14.1163 5H13.3837L10.4206 2.03687C11.8538 1.52875 13.3944 1.25 15 1.25C15.4219 1.25 15.8381 1.27188 16.25 1.30938ZM1.25 15C1.25 11.9625 2.24187 9.15312 3.91625 6.875H9.11625L10.625 8.38375V10.9913L8.49125 13.125L10.3663 15L9.11625 16.25H4.7025L6.4525 20.625H11.875V24.1162L8.75 27.2412C4.3025 24.9612 1.25 20.3319 1.25 15ZM15 28.75C13.2238 28.75 11.5269 28.4075 9.96688 27.7919L13.125 24.6338V19.375H7.29813L6.54813 17.5H9.63438L12.1344 15L10.2594 13.125L11.8756 11.5087V7.86625L9.63375 5.625H4.95438C6.14437 4.35063 7.5725 3.3025 9.16813 2.55188L12.8663 6.25H14.6337L17.5 3.38375V1.48188C19.1644 1.78875 20.7256 2.39313 22.1231 3.2425L17.5 7.86625V13.125H20.625V20.2588L24.8969 24.5306C22.3944 27.1287 18.8838 28.75 15 28.75ZM25.7244 23.5906L21.875 19.7412V11.875H18.75V8.38375L23.1787 3.955C26.5569 6.4625 28.75 10.4794 28.75 15C28.75 18.2488 27.615 21.235 25.7244 23.5906Z"
              fill="#192045"
            />
          </svg>
        </button>
        <div className="dropdown-menu dropdown-menu-end">
          <Link
            to="javascript:void(0);"
            className="dropdown-item notify-item language"
            data-lang="eng"
          >
            <img
              src="./assets/img/flags/us.jpg"
              alt="user-image"
              className="me-1"
              height="12"
            />
            <span className="align-middle">English</span>
          </Link>

          <Link
            to="javascript:void(0);"
            className="dropdown-item notify-item language"
            data-lang="sp"
          >
            <img
              src="assets/img/flags/spain.jpg"
              alt="user-image"
              className="me-1"
              height="12"
            />
            <span className="align-middle">Spanish</span>
          </Link>

          <Link
            to="javascript:void(0);"
            className="dropdown-item notify-item language"
            data-lang="gr"
          >
            <img
              src="assets/img/flags/germany.jpg"
              alt="user-image"
              className="me-1"
              height="12"
            />
            <span className="align-middle">German</span>
          </Link>

          <Link
            to="javascript:void(0);"
            className="dropdown-item notify-item language"
            data-lang="it"
          >
            <img
              src="assets//img/flags/italy.jpg"
              alt="user-image"
              className="me-1"
              height="12"
            />
            <span className="align-middle">Italian</span>
          </Link>

          <Link
            to="javascript:void(0);"
            className="dropdown-item notify-item language"
            data-lang="ru"
          >
            <img
              src="assets/img/flags/russia.jpg"
              alt="user-image"
              className="me-1"
              height="12"
            />
            <span className="align-middle">Russian</span>
          </Link>
        </div>
      </div> --> */}

            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item noti-icon"
                id="page-header-notifications-dropdown-v"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.45455 3.4881C6.04947 4.61889 3.63669 7.33014 3.63653 10.5164V16.7253L0.375499 19.3629C0.144442 19.5409 0 19.7945 0 20.0759V20.2035C0 21.2802 1.05824 22.153 2.36364 22.153H8.30287C8.56913 24.0982 10.5705 25.6098 13 25.6098C15.4295 25.6098 17.4309 24.0982 17.6971 22.153H23.6364C24.9418 22.153 26 21.2802 26 20.2035V20.0761C26.0001 19.7947 25.8557 19.541 25.6245 19.3629L22.3638 16.7256V10.5167C22.3637 7.33036 19.9507 4.61872 16.5455 3.48799V2.43688C16.5455 1.16681 15.3593 0.540947 14.8932 0.348687C14.2864 0.0983808 13.6138 0 13 0C12.3862 0 11.7136 0.0983808 11.1068 0.348687C10.6407 0.540947 9.45455 1.16681 9.45455 2.43688V3.4881ZM14.0955 2.92425C14.0894 2.94107 14.083 2.95765 14.0764 2.97398C13.723 2.94113 13.364 2.92425 13.0001 2.92425C12.6362 2.92425 12.2771 2.94114 11.9237 2.97401C11.917 2.95767 11.9106 2.94108 11.9045 2.92425H11.8182V2.43688C11.8182 2.16773 12.3468 1.9495 13 1.9495C13.6532 1.9495 14.1818 2.16773 14.1818 2.43688V2.92425H14.0955ZM15.3025 22.153H10.6975C10.9403 23.0167 11.879 23.6603 13 23.6603C14.121 23.6603 15.0597 23.0167 15.3025 22.153ZM6.00016 10.5164C6.00035 7.41792 9.11241 4.87375 13.0001 4.87375C16.8879 4.87375 20 7.41792 20.0001 10.5164H6.00016ZM6.00016 10.5164H20.0001V16.7256C20.0001 17.2493 20.2555 17.7509 20.7089 18.1175L23.288 20.2035H2.71208L5.6376 17.8373C5.86065 17.6605 6.00016 17.4119 6.00016 17.1347V10.5164Z"
                    fill="#192045"
                  />
                </svg>

                <span className="noti-dot"></span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 page-header-notifications-dropdown-v"
                aria-labelledby="page-header-notifications-dropdown-v"
              >
                <div className="p-3">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="m-0 font-size-15">Notifications</h5>
                    </div>
                    <div className="col-auto">
                      <Link
                        to="#!"
                        className="small fw-semibold text-decoration-underline"
                      >
                        Mark all as read
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  data-simplebar
                  style={{ maxHeight: "250px", marginTop: "0px" }}
                >
                  <Link to="#!" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <img
                          src={navbparProfileImg}
                          className="rounded-circle avatar-sm"
                          alt="user-pic"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <p className="text-muted font-size-13 mb-0 float-end">
                          1 hour ago
                        </p>
                        <h6 className="mb-1">James Lemire</h6>
                        <div>
                          <p className="mb-0">
                            It will seem like simplified English.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link to="#!" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 avatar-sm me-3">
                        <span className="avatar-title bg-primary rounded-circle font-size-18">
                          <i className="fa-regular fa-user"></i>
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <p className="text-muted font-size-13 mb-0 float-end">
                          3 min ago
                        </p>
                        <h6 className="mb-1">Your order is placed</h6>
                        <div>
                          <p className="mb-0">
                            If several languages coalesce the grammar
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link to="#!" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 avatar-sm me-3">
                        <span className="avatar-title bg-success rounded-circle font-size-18">
                          <i className="fa-regular fa-user"></i>
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <p className="text-muted font-size-13 mb-0 float-end">
                          8 min ago
                        </p>
                        <h6 className="mb-1">Your item is shipped</h6>
                        <div>
                          <p className="mb-0">
                            If several languages coalesce the grammar
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link to="#!" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <img
                          // src={"assets/img/navbar-profile-logo.png"}
                          src={navbparProfileImg}
                          className="rounded-circle avatar-sm"
                          alt="user-pic"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <p className="text-muted font-size-13 mb-0 float-end">
                          1 hour ago
                        </p>
                        <h6 className="mb-1">Salena Layfield</h6>
                        <div>
                          <p className="mb-1">
                            As a skeptical Cambridge friend of mine occidental.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="p-2 border-top d-grid">
                  <Link
                    className="btn btn-link font-size-14 btn-block text-center"
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                      zIndex: 1,
                    }}
                  >
                    <i className="uil-arrow-circle-right me-1"></i>
                    <span>View More..</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item user text-start d-flex align-items-center"
                id="page-header-user-dropdown-v"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className="rounded-circle header-profile-user"
                  // src="assets/img/navbar-profile-logo.png"
                  src={navbparProfileImg}
                  alt="Header Avatar"
                />
              </button>
              <div className="dropdown-menu dropdown-menu-end pt-0 profile-dropdown">
                <div className="p-3 border-bottom">
                  <h6 className="mb-0">Martin Gurley</h6>
                  <Link to="# " className="mb-0 font-size-11 text-muted">
                    martin.gurley@email.com
                  </Link>
                </div>
                <Link className="dropdown-item" to="contacts-profile.html">
                  <i className="mdi mdi-account-circle text-muted font-size-16 align-middle me-2"></i>
                  <span className="align-middle">Profile</span>
                </Link>

                <Link className="dropdown-item" to="apps-chat.html">
                  <i className="mdi mdi-message-text-outline text-muted font-size-16 align-middle me-2"></i>
                  <span className="align-middle">Messages</span>
                </Link>

                <Link className="dropdown-item" to="pages-faqs.html">
                  <i className="mdi mdi-lifebuoy text-muted font-size-16 align-middle me-2"></i>
                  <span className="align-middle">Help</span>
                </Link>

                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="#"
                >
                  <i className="mdi mdi-cog-outline text-muted font-size-16 align-middle me-2"></i>
                  <span className="align-middle me-3">Settings</span>
                  <span className="badge badge-soft-success ms-auto">New</span>
                </Link>

                <Link className="dropdown-item" to="auth-lock-screen.html">
                  <i className="mdi mdi-lock text-muted font-size-16 align-middle me-2"></i>
                  <span className="align-middle">Lock screen</span>
                </Link>

                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="auth-logout.html">
                  <i className="mdi mdi-logout text-muted font-size-16 align-middle me-2"></i>
                  <span className="align-middle">Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- Right Sidebar setting Start --> */}
      {/* <!-- <div className="right-bar">
  <div data-simplebar className="h-100">
    <div className="rightbar-title d-flex align-items-center bg-dark p-3">
      <h5 className="m-0 me-2 text-white">Theme Customizer</h5>

      <Link to="javascript:void(0);" className="right-bar-toggle-close ms-auto">
        <i className="fa-solid fa-x"></i>
      </Link>
    </div>
    <hr className="m-0" />

    <div className="p-4">
      <h6 className="mt-4 mb-3">Layout Mode</h6>

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="layout-mode"
          id="layout-mode-light"
          value="light"
        />
        <label className="form-check-label" for="layout-mode-light"
          >Light</label
        >
      </div>

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="layout-mode"
          id="layout-mode-dark"
          value="dark"
        />
        <label className="form-check-label" for="layout-mode-dark">Dark</label>
      </div>

      <h6 className="mt-4 mb-3">Topbar Type</h6>

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="topbar-color"
          id="topbar-color-light"
          value="light"
          onchange="document.body.setAttribute('data-topbar', 'light')"
        />
        <label className="form-check-label" for="topbar-color-light"
          >Light</label
        >
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="topbar-color"
          id="topbar-color-dark"
          value="dark"
          onchange="document.body.setAttribute('data-topbar', 'dark')"
        />
        <label className="form-check-label" for="topbar-color-dark">Dark</label>
      </div>

      <div id="sidebar-setting">
        <h6 className="mt-4 mb-3 sidebar-setting">Sidebar Size</h6>

        <div className="form-check sidebar-setting mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="sidebar-size"
            id="sidebar-size-default"
            value="default"
            onchange="document.body.setAttribute('data-sidebar-size', 'lg')"
          />
          <label className="form-check-label" for="sidebar-size-default"
            >Default</label
          >
        </div>
        <div className="form-check sidebar-setting mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="sidebar-size"
            id="sidebar-size-small"
            value="small"
            onchange="document.body.setAttribute('data-sidebar-size', 'sm')"
          />
          <label className="form-check-label" for="sidebar-size-small"
            >Small (Icon View)</label
          >
        </div>

        <h6 className="mt-4 mb-3 sidebar-setting">Sidebar Color</h6>

        <div className="form-check sidebar-setting mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="sidebar-color"
            id="sidebar-color-light"
            value="light"
            onchange="document.body.setAttribute('data-sidebar', 'light')"
          />
          <label className="form-check-label" for="sidebar-color-light"
            >Light</label
          >
        </div>
        <div className="form-check sidebar-setting mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="sidebar-color"
            id="sidebar-color-dark"
            value="dark"
            onchange="document.body.setAttribute('data-sidebar', 'dark')"
          />
          <label className="form-check-label" for="sidebar-color-dark"
            >Dark</label
          >
        </div>
      </div>
    </div>
  </div>
</div> -->
<!-- Right Sidebar bar overlay--> */}
      <div className="rightbar-overlay"></div>
      {/* <!-- Navbar End --> */}

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
          <Link to="index.html" className="logo logo-dark">
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
                    <Link to="./index.html">
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
                  <li className="submenu-active">
                    <Link>
                      <svg
                        width="40"
                        height="42"
                        viewBox="0 0 40 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.1865 26.6287C25.4944 28.2748 27.349 28.1711 30.657 26.6287M22.1865 26.6287C20.6173 24.4579 19.9264 23.1265 19.2748 20.4012M22.1865 26.6287C21.1843 26.9349 20.3069 27.2684 19.5395 27.6329M30.657 26.6287C32.6303 27.2892 34.0415 28.1237 35.0671 29.1444M30.657 26.6287C32.4213 24.4979 33.178 23.1693 33.8334 20.4012C37.7093 19.976 38.0686 15.8503 33.8978 15.8503M17.1572 29.1444C19.0175 30.4198 20.6592 31.3769 22.1865 32.0082M17.1572 29.1444C16.4532 29.7539 15.9194 30.4292 15.5182 31.1796M17.1572 29.1444C17.8 28.5879 18.5845 28.0864 19.5395 27.6329M35.0671 29.1444C37.7171 31.7819 38.4588 35.6632 39 41H30.657M35.0671 29.1444C33.3687 30.4293 31.849 31.3816 30.4102 32.0082M22.1865 32.0082V41M22.1865 32.0082C25.1031 33.2137 27.6024 33.231 30.4102 32.0082M22.1865 41H14.5102C14.4785 40.3354 14.45 39.6971 14.4293 39.0838M22.1865 41H30.657M30.4102 32.0082L30.657 41M19.2748 20.4012C17.6222 20.296 16.6927 19.2506 16.661 18.2455M19.2748 20.4012C18.3089 23.1661 17.6931 24.5958 15.8337 25.9102M19.2748 16.3293V17.7665C19.1171 15.5991 19.0201 13.8702 19.194 12.497M19.2748 16.3293C20.121 14.6747 20.6946 14.024 22.1865 14.1737C24.7447 14.6554 26.0558 14.9477 28.2747 13.8216C31.1657 14.3317 32.2233 14.7831 33.8334 17.0479C33.8587 16.63 33.8806 16.2312 33.8978 15.8503M19.2748 16.3293C17.448 16.3293 16.6302 17.2684 16.661 18.2455M21.9218 8.66467V7.46707M21.9218 8.66467V11.2994C25.5747 11.9857 27.6601 11.998 31.4511 11.2994V8.66467M21.9218 8.66467C20.1642 9.42592 19.4298 10.6343 19.194 12.497M21.9218 7.46707L26.9511 9.14371L31.4511 7.27286M21.9218 7.46707L20.5983 6.86826M35.951 5.40201L36.7451 5.07186L26.9511 1L19.2748 4.02779M35.951 5.40201V12.018M35.951 5.40201L31.4511 7.27286M31.4511 7.27286V8.66467M31.4511 8.66467C33.7472 9.8151 34.0802 11.8291 33.8978 15.8503M14.4293 39.0838C14.3179 35.7811 14.4344 33.2066 15.5182 31.1796M14.4293 39.0838H9.02553M9.48086 25.9102C7.95868 26.4779 6.74174 27.1074 5.77503 27.8652M9.48086 25.9102C12.1115 27.1115 13.4854 26.9747 15.8337 25.9102M9.48086 25.9102C7.3115 23.3547 6.58089 21.5836 6.56913 17.5269H9.48086L10.5397 15.3713L12.3926 18.2455H16.661M5.77503 27.8652C6.92932 29.0532 7.9508 29.8996 9.02553 30.4611M5.77503 27.8652C5.49993 28.0809 5.24509 28.3069 5.00925 28.5449M15.5182 31.1796C12.6738 31.5346 10.7788 31.377 9.02553 30.4611M9.02553 30.4611V39.0838M9.02553 39.0838H1.00056C0.962584 33.8323 2.87417 30.6995 5.00925 28.5449M19.5395 27.6329C18.3292 26.709 17.5671 26.2794 15.8337 25.9102M5.00925 28.5449C2.08911 20.2875 3.05902 16.4766 8.42204 10.8204M8.42204 10.8204V8.18563M8.42204 10.8204C12.1778 12.254 14.2113 12.3052 17.6866 10.8204M8.42204 8.18563L3.39272 5.79042L13.1867 1.95808L19.2748 4.02779M8.42204 8.18563L13.1867 9.86228L17.6866 8.04448M19.2748 4.02779L16.6278 5.07186L20.5983 6.86826M20.5983 6.86826L17.6866 8.04448M17.6866 10.8204V8.04448M17.6866 10.8204C18.4777 11.2684 18.7519 11.6925 19.194 12.497"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="text">Academic Management</span>
                      <i className="arrow fa-solid fa-angle-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="./className.html">
                          <span className="text">className</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./shift.html">
                          <span className="text">Shift</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./section.html">
                          <span className="text">Section</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./session.html">
                          <span className="text">Session</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu-active">
                    <Link>
                      <svg
                        width="40"
                        height="42"
                        viewBox="0 0 40 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.1865 26.6287C25.4944 28.2748 27.349 28.1711 30.657 26.6287M22.1865 26.6287C20.6173 24.4579 19.9264 23.1265 19.2748 20.4012M22.1865 26.6287C21.1843 26.9349 20.3069 27.2684 19.5395 27.6329M30.657 26.6287C32.6303 27.2892 34.0415 28.1237 35.0671 29.1444M30.657 26.6287C32.4213 24.4979 33.178 23.1693 33.8334 20.4012C37.7093 19.976 38.0686 15.8503 33.8978 15.8503M17.1572 29.1444C19.0175 30.4198 20.6592 31.3769 22.1865 32.0082M17.1572 29.1444C16.4532 29.7539 15.9194 30.4292 15.5182 31.1796M17.1572 29.1444C17.8 28.5879 18.5845 28.0864 19.5395 27.6329M35.0671 29.1444C37.7171 31.7819 38.4588 35.6632 39 41H30.657M35.0671 29.1444C33.3687 30.4293 31.849 31.3816 30.4102 32.0082M22.1865 32.0082V41M22.1865 32.0082C25.1031 33.2137 27.6024 33.231 30.4102 32.0082M22.1865 41H14.5102C14.4785 40.3354 14.45 39.6971 14.4293 39.0838M22.1865 41H30.657M30.4102 32.0082L30.657 41M19.2748 20.4012C17.6222 20.296 16.6927 19.2506 16.661 18.2455M19.2748 20.4012C18.3089 23.1661 17.6931 24.5958 15.8337 25.9102M19.2748 16.3293V17.7665C19.1171 15.5991 19.0201 13.8702 19.194 12.497M19.2748 16.3293C20.121 14.6747 20.6946 14.024 22.1865 14.1737C24.7447 14.6554 26.0558 14.9477 28.2747 13.8216C31.1657 14.3317 32.2233 14.7831 33.8334 17.0479C33.8587 16.63 33.8806 16.2312 33.8978 15.8503M19.2748 16.3293C17.448 16.3293 16.6302 17.2684 16.661 18.2455M21.9218 8.66467V7.46707M21.9218 8.66467V11.2994C25.5747 11.9857 27.6601 11.998 31.4511 11.2994V8.66467M21.9218 8.66467C20.1642 9.42592 19.4298 10.6343 19.194 12.497M21.9218 7.46707L26.9511 9.14371L31.4511 7.27286M21.9218 7.46707L20.5983 6.86826M35.951 5.40201L36.7451 5.07186L26.9511 1L19.2748 4.02779M35.951 5.40201V12.018M35.951 5.40201L31.4511 7.27286M31.4511 7.27286V8.66467M31.4511 8.66467C33.7472 9.8151 34.0802 11.8291 33.8978 15.8503M14.4293 39.0838C14.3179 35.7811 14.4344 33.2066 15.5182 31.1796M14.4293 39.0838H9.02553M9.48086 25.9102C7.95868 26.4779 6.74174 27.1074 5.77503 27.8652M9.48086 25.9102C12.1115 27.1115 13.4854 26.9747 15.8337 25.9102M9.48086 25.9102C7.3115 23.3547 6.58089 21.5836 6.56913 17.5269H9.48086L10.5397 15.3713L12.3926 18.2455H16.661M5.77503 27.8652C6.92932 29.0532 7.9508 29.8996 9.02553 30.4611M5.77503 27.8652C5.49993 28.0809 5.24509 28.3069 5.00925 28.5449M15.5182 31.1796C12.6738 31.5346 10.7788 31.377 9.02553 30.4611M9.02553 30.4611V39.0838M9.02553 39.0838H1.00056C0.962584 33.8323 2.87417 30.6995 5.00925 28.5449M19.5395 27.6329C18.3292 26.709 17.5671 26.2794 15.8337 25.9102M5.00925 28.5449C2.08911 20.2875 3.05902 16.4766 8.42204 10.8204M8.42204 10.8204V8.18563M8.42204 10.8204C12.1778 12.254 14.2113 12.3052 17.6866 10.8204M8.42204 8.18563L3.39272 5.79042L13.1867 1.95808L19.2748 4.02779M8.42204 8.18563L13.1867 9.86228L17.6866 8.04448M19.2748 4.02779L16.6278 5.07186L20.5983 6.86826M20.5983 6.86826L17.6866 8.04448M17.6866 10.8204V8.04448M17.6866 10.8204C18.4777 11.2684 18.7519 11.6925 19.194 12.497"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="text">Student Management</span>
                      <i className="arrow fa-solid fa-angle-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="./student-list.html">
                          <span className="text">Student Information</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./className-wise-student.html">
                          <span className="text">
                            className Wise Student List
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./migration.html">
                          <span className="text">Migration</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu-active">
                    <Link>
                      <svg
                        width="40"
                        height="42"
                        viewBox="0 0 40 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.1865 26.6287C25.4944 28.2748 27.349 28.1711 30.657 26.6287M22.1865 26.6287C20.6173 24.4579 19.9264 23.1265 19.2748 20.4012M22.1865 26.6287C21.1843 26.9349 20.3069 27.2684 19.5395 27.6329M30.657 26.6287C32.6303 27.2892 34.0415 28.1237 35.0671 29.1444M30.657 26.6287C32.4213 24.4979 33.178 23.1693 33.8334 20.4012C37.7093 19.976 38.0686 15.8503 33.8978 15.8503M17.1572 29.1444C19.0175 30.4198 20.6592 31.3769 22.1865 32.0082M17.1572 29.1444C16.4532 29.7539 15.9194 30.4292 15.5182 31.1796M17.1572 29.1444C17.8 28.5879 18.5845 28.0864 19.5395 27.6329M35.0671 29.1444C37.7171 31.7819 38.4588 35.6632 39 41H30.657M35.0671 29.1444C33.3687 30.4293 31.849 31.3816 30.4102 32.0082M22.1865 32.0082V41M22.1865 32.0082C25.1031 33.2137 27.6024 33.231 30.4102 32.0082M22.1865 41H14.5102C14.4785 40.3354 14.45 39.6971 14.4293 39.0838M22.1865 41H30.657M30.4102 32.0082L30.657 41M19.2748 20.4012C17.6222 20.296 16.6927 19.2506 16.661 18.2455M19.2748 20.4012C18.3089 23.1661 17.6931 24.5958 15.8337 25.9102M19.2748 16.3293V17.7665C19.1171 15.5991 19.0201 13.8702 19.194 12.497M19.2748 16.3293C20.121 14.6747 20.6946 14.024 22.1865 14.1737C24.7447 14.6554 26.0558 14.9477 28.2747 13.8216C31.1657 14.3317 32.2233 14.7831 33.8334 17.0479C33.8587 16.63 33.8806 16.2312 33.8978 15.8503M19.2748 16.3293C17.448 16.3293 16.6302 17.2684 16.661 18.2455M21.9218 8.66467V7.46707M21.9218 8.66467V11.2994C25.5747 11.9857 27.6601 11.998 31.4511 11.2994V8.66467M21.9218 8.66467C20.1642 9.42592 19.4298 10.6343 19.194 12.497M21.9218 7.46707L26.9511 9.14371L31.4511 7.27286M21.9218 7.46707L20.5983 6.86826M35.951 5.40201L36.7451 5.07186L26.9511 1L19.2748 4.02779M35.951 5.40201V12.018M35.951 5.40201L31.4511 7.27286M31.4511 7.27286V8.66467M31.4511 8.66467C33.7472 9.8151 34.0802 11.8291 33.8978 15.8503M14.4293 39.0838C14.3179 35.7811 14.4344 33.2066 15.5182 31.1796M14.4293 39.0838H9.02553M9.48086 25.9102C7.95868 26.4779 6.74174 27.1074 5.77503 27.8652M9.48086 25.9102C12.1115 27.1115 13.4854 26.9747 15.8337 25.9102M9.48086 25.9102C7.3115 23.3547 6.58089 21.5836 6.56913 17.5269H9.48086L10.5397 15.3713L12.3926 18.2455H16.661M5.77503 27.8652C6.92932 29.0532 7.9508 29.8996 9.02553 30.4611M5.77503 27.8652C5.49993 28.0809 5.24509 28.3069 5.00925 28.5449M15.5182 31.1796C12.6738 31.5346 10.7788 31.377 9.02553 30.4611M9.02553 30.4611V39.0838M9.02553 39.0838H1.00056C0.962584 33.8323 2.87417 30.6995 5.00925 28.5449M19.5395 27.6329C18.3292 26.709 17.5671 26.2794 15.8337 25.9102M5.00925 28.5449C2.08911 20.2875 3.05902 16.4766 8.42204 10.8204M8.42204 10.8204V8.18563M8.42204 10.8204C12.1778 12.254 14.2113 12.3052 17.6866 10.8204M8.42204 8.18563L3.39272 5.79042L13.1867 1.95808L19.2748 4.02779M8.42204 8.18563L13.1867 9.86228L17.6866 8.04448M19.2748 4.02779L16.6278 5.07186L20.5983 6.86826M20.5983 6.86826L17.6866 8.04448M17.6866 10.8204V8.04448M17.6866 10.8204C18.4777 11.2684 18.7519 11.6925 19.194 12.497"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="text">Exam Management</span>
                      <i className="arrow fa-solid fa-angle-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="./exam-type.html">
                          <span className="text">Exam Type</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./subject.html">
                          <span className="text">Subject</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./grade.html">
                          <span className="text">Grade</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./exam-assign.html">
                          <span className="text">Exam Assign To className</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./mark-entry.html">
                          <span className="text">Mark Entry</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./result-sheet.html">
                          <span className="text">Result</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./combine-result.html">
                          <span className="text">Combine Result</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./mark-sheet.html">
                          <span className="text">Mark Sheet</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./admit-card.html">
                          <span className="text">Admit Card</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./generated-admit-card.html">
                          <span className="text">Generated Admit Card</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./tabulation-sheet.html">
                          <span className="text">Tabulation Sheet</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./generated-tb-sheet.html">
                          <span className="text">Generated TB Sheet</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./seat-plan.html">
                          <span className="text">Seat Plan</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="./generate-id-card.html">
                          <span className="text">Generate ID Card</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="active-link">
                    <Link to="./sms-management.html">
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
          <Link to="./index.html">
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

      {/* changessss  */}
    </>
  );
};

export default Navbar;
