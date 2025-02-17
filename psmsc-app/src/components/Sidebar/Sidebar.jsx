import { Link } from "react-router-dom";
import "../../assets/css/navbar-sidebar.css";
import logo from "../../assets/img/logo.png";

const Sidebar = () => {

  useEffect(()=>{

    // Sidebar Start.................................
$(".menu > ul > li").click(function (e) {
  // Store the active parent link in localStorage
  const activeLink = $(this).find("> a").attr("href");
  localStorage.setItem("activeSidebarLink", activeLink);

  // Update active classes and toggle submenu
  $(this).siblings().removeClass("active");
  $(this).siblings().find("ul").slideUp(); // Close other submenus
  $(this).toggleClass("active");
  $(this).find("ul").slideToggle();
});

$(".menu > ul > li > a").click(function (e) {
  // Remove submenu active state when clicking a parent menu link
  localStorage.removeItem("activeSubmenuLink");
});

$(".menu > ul > li ul li a").click(function (e) {
  // Store the clicked submenu child link in localStorage
  const activeChildLink = $(this).attr("href");
  localStorage.setItem("activeSubmenuLink", activeChildLink);

  // Store parent link for submenu
  const parentLink = $(this)
    .closest("ul")
    .closest("li")
    .find("> a")
    .attr("href");
  localStorage.setItem("activeSidebarLink", parentLink);
});

// Highlight the active link and keep submenu open on page load
$(document).ready(function () {
  const activeLink = localStorage.getItem("activeSidebarLink");
  const activeSubmenuLink = localStorage.getItem("activeSubmenuLink");

  if (activeSubmenuLink) {
    // Highlight the active submenu child link
    const activeSubElement = $(
      `.menu ul li a[href="${activeSubmenuLink}"]`,
    ).parent();
    activeSubElement.addClass("active");

    // Open the parent menu of the active submenu
    const parentMenu = activeSubElement.closest("ul").closest("li");
    parentMenu.addClass("active");
    parentMenu.find("> ul").slideDown();
  } else if (activeLink) {
    // Highlight the parent menu link even if no submenu is active
    const activeElement = $(
      `.menu > ul > li > a[href="${activeLink}"]`,
    ).parent();
    activeElement.addClass("active");
    activeElement.find("> ul").slideDown(); // Open submenu if it's a parent
  } else {
    // Ensure all menus are closed by default
    $(".menu > ul > li > ul").slideUp();
    $(".menu > ul > li").removeClass("active");
  }
});

// Close active submenu when clicking outside the menu......
$(document).on("click", function (e) {
  // Check if body has data-sidebar-size="sm"
  if ($("body").attr("data-sidebar-size") === "sm") {
    // Check if the click is outside the sidebar (.menu)
    if (!$(e.target).closest(".menu").length) {
      // Close all submenus and remove active state
      $(".menu > ul > li").removeClass("active");
      $(".menu > ul > li > ul").slideUp();
      localStorage.removeItem("activeSidebarLink");
      localStorage.removeItem("activeSubmenuLink");
    }
  }
});

// Prevent closing when clicking inside the sidebar
$(".menu").on("click", function (e) {
  e.stopPropagation();
});

//   ................................................
//   ................................................
//   ................................................
//   ................................................

// Counter Animation
function counterAnimation() {
  const counters = document.querySelectorAll(".counter-value");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const speed = target / 250;
    const updateCounter = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + speed);
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}

// Sidebar Close on Outside Click
document.addEventListener("click", function (event) {
  const sidebar = document.querySelector(".vertical-menu");
  const toggleButton = document.querySelector(".vertical-menu-btn");

  if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
    document.body.classList.remove("sidebar-enable");
  }
});

// Initialize Sidebar Active State on Page Load
document.addEventListener("DOMContentLoaded", function () {
  setSidebarMenuActive();
});

// Responsive Sidebar Toggle
function toggleSidebar() {
  const currentSize = document.body.getAttribute("data-sidebar-size");

  document.body.classList.toggle("sidebar-enable");
  if (window.innerWidth >= 992) {
    document.body.setAttribute(
      "data-sidebar-size",
      currentSize === "sm" ? "lg" : "sm",
    );
  }
}
document.querySelectorAll(".vertical-menu-btn").forEach((button) => {
  button.addEventListener("click", toggleSidebar);
});

// Tooltip Initialization
document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((tooltip) => {
  new bootstrap.Tooltip(tooltip);
});

// Popover Initialization
document.querySelectorAll("[data-bs-toggle='popover']").forEach((popover) => {
  new bootstrap.Popover(popover);
});

// Horizontal Layout Toggle
function toggleLayout() {
  const body = document.body;
  const layout = body.getAttribute("data-layout");

  if (layout === "horizontal") {
    body.setAttribute("data-layout", "vertical");
  } else {
    body.setAttribute("data-layout", "horizontal");
  }
}
document.querySelectorAll(".layout-toggle").forEach((button) => {
  button.addEventListener("click", toggleLayout);
});

// Initialize All Functions on Page Load
document.addEventListener("DOMContentLoaded", function () {
  counterAnimation();
  setActiveMenu();
});

// Right sidebar toggle functionality
document.querySelectorAll(".right-bar-toggle").forEach(function (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("right-bar-enabled");
  });
});

// Close the right sidebar when clicking outside of it
document.body.addEventListener("click", function (event) {
  const isClickInside = event.target.closest(".right-bar-toggle, .right-bar");
  if (!isClickInside) {
    document.body.classList.remove("right-bar-enabled");
  }
});

// Toggle light/dark mode based on radio button selection
document
  .querySelectorAll('input[name="layout-mode"]')
  .forEach(function (toggleBtn) {
    toggleBtn.addEventListener("change", function () {
      const selectedMode = document.querySelector(
        'input[name="layout-mode"]:checked',
      ).value;
      document.body.setAttribute("data-layout-mode", selectedMode);
    });
  });

  },[])


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
    </>
  );
};

export default Sidebar;
