import { Link, useLocation } from "react-router-dom";

const Toggle = ({
  activeMenu,
  handleToggle,
  academicRef,
  studentRef,
  examRef,
}) => {
  const location = useLocation();

  return (
    <>
      <li
        className="submenu-active"
        ref={academicRef}
        onClick={() => handleToggle("academic")}
        style={{
          maxHeight: activeMenu === "academic" ? "800px" : "42px", // Transitions between 0 and 800px
          transformOrigin: "top",
          overflow: "hidden", // Hide overflow when collapsed
          transition: "max-height 0.8s ease-in-out, opacity 0.8s ease-in-out", // Smooth transitions for max-height and opacity
        }}
      >
        <a>
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
          <i
            className="arrow fa-solid fa-angle-down"
            style={{
              transform:
                activeMenu === "academic" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the arrow based on activeMenu
              transition: "transform 0.5s ease-in-out", // Smooth transition for the rotation
              transitionDelay: activeMenu === "academic" ? "0s" : "0.3s", // Delay rotation when closing
            }}
          ></i>
        </a>

        <ul className="sub-menu">
          <li
            className={
              location.pathname === "/academic-management/class" ? "active" : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/academic-management/class">
              <span className="text">Class</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/academic-management/shift" ? "active" : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/academic-management/shift">
              <span className="text">Shift</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/academic-management/section"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/academic-management/section">
              <span className="text">Section</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/academic-management/session"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/academic-management/session">
              <span className="text">Session</span>
            </Link>
          </li>

          <li
            className={
              location.pathname === "/academic-management/group" ? "active" : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/academic-management/group">
              <span className="text">Group</span>
            </Link>
          </li>
        </ul>
      </li>
      <li
        className="submenu-active"
        ref={studentRef}
        onClick={() => handleToggle("studentM")}
        style={{
          maxHeight: activeMenu === "studentM" ? "800px" : "42px", // Transitions between 0 and 800px
          transformOrigin: "top",
          overflow: "hidden", // Hide overflow when collapsed
          transition: "max-height 0.8s ease-in-out, opacity 0.8s ease-in-out", // Smooth transitions for max-height and opacity
        }}
      >
        <a>
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
          <i
            className="arrow fa-solid fa-angle-down"
            style={{
              transform:
                activeMenu === "studentM" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the arrow based on activeMenu
              transition: "transform 0.5s ease-in-out", // Smooth transition for the rotation
              transitionDelay: activeMenu === "studentM" ? "0s" : "0.3s", // Delay rotation when closing
            }}
          ></i>
        </a>

        <ul className="sub-menu">
          <li
            className={
              location.pathname === "/student-management/student-information"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/student-management/student-information">
              <span className="text">Student Information</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/student-management/class-wise-student"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/student-management/class-wise-student">
              <span className="text">Class Wise Student List</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/student-management/migration"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/student-management/migration">
              <span className="text">Migration</span>
            </Link>
          </li>
        </ul>
      </li>

      <li
        className="submenu-active"
        ref={examRef}
        onClick={() => handleToggle("examM")}
        style={{
          maxHeight: activeMenu === "examM" ? "800px" : "42px", // Transitions between 0 and 800px
          transformOrigin: "top",
          overflow: "hidden", // Hide overflow when collapsed
          transition: "max-height 0.8s ease-in-out, opacity 0.8s ease-in-out", // Smooth transitions for max-height and opacity
        }}
      >
        <a>
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
          <i
            className="arrow fa-solid fa-angle-down"
            style={{
              transform:
                activeMenu === "examM" ? "rotate(180deg)" : "rotate(0deg)", // Rotate the arrow based on activeMenu
              transition: "transform 0.5s ease-in-out", // Smooth transition for the rotation
              transitionDelay: activeMenu === "examM" ? "0s" : "0.3s", // Delay rotation when closing
            }}
          ></i>
        </a>
        <ul className="sub-menu">
          <li
            className={
              location.pathname === "/exam-management/exam-type" ? "active" : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/exam-type">
              <span className="text">Exam Type</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/subject" ? "active" : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/subject">
              <span className="text">Subject</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/grade" ? "active" : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/grade">
              <span className="text">Grade</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/exam-assign"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/exam-assign">
              <span className="text">Exam Assign To Class</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/mark-entry"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/mark-entry">
              <span className="text">Mark Entry</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/result-sheet"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/result-sheet">
              <span className="text">Result</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/combine-result"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/combine-result">
              <span className="text">Combine Result</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/mark-sheet"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/mark-sheet">
              <span className="text">Mark Sheet</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/admit-card"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/admit-card">
              <span className="text">Admit Card</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/generated-admit-card"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/generated-admit-card">
              <span className="text">Generated Admit Card</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/tabulation-sheet"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/tabulation-sheet">
              <span className="text">Tabulation Sheet</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/generated-tb-sheet"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/generated-tb-sheet">
              <span className="text">Generated TB Sheet</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/seat-plan" ? "active" : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/seat-plan">
              <span className="text">Seat Plan</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/exam-management/generate-id-card"
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to="/exam-management/generate-id-card">
              <span className="text">Generate ID Card</span>
            </Link>
          </li>
        </ul>
      </li>
    </>
  );
};

export default Toggle;
