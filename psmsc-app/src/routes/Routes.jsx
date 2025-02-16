import { createBrowserRouter } from "react-router-dom";
import Dahsboard from "../pages/Dashboard/Dashboard";
import Main from "../Layout/Main";
import AcademicManagement from "../pages/AcademicManagement/academicManagement";
import Class from "../pages/Class/Class";
import Shift from "../pages/Shift/Shift";
import Section from "../pages/Section/Section";
import Session from "../pages/Session/Session";
import StudentManagement from "../pages/StudentManagement/StudentManagement";
import StudentInformation from "../pages/StudentInformation/StudentInformation";
import SMSManagement from "../pages/SMSManagement/SMSManagement";
import ClassWiseStudent from "../pages/ClassWiseStudent/ClassWiseStudent";
import Migration from "../pages/Migration/Migration";
import ExamType from "../pages/ExamType/ExamType";
import ExamManagement from "../pages/Exam Management/ExamManagement";
import Subject from "../pages/Subject/Subject";
import ExamAssignToclassName from "../pages/ExamAssignToClass/ExamAssignToClass";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Dahsboard />,
      },
      {
        path: "/academic-management",
        element: <AcademicManagement />,
        children: [
          {
            path: "class",
            element: <Class />,
          },
          {
            path: "shift",
            element: <Shift />,
          },
          {
            path: "section",
            element: <Section />,
          },
          {
            path: "session",
            element: <Session />,
          },
        ],
      },
      {
        path: "student-management",
        element: <StudentManagement />,
        children: [
          {
            path: "student-information",
            element: <StudentInformation />,
          },
          {
            path: "class-wise-student-list",
            element: <ClassWiseStudent />,
          },
          {
            path: "migration",
            element: <Migration />,
          },
        ],
      },
      {
        path: "exam-management",
        element: <ExamManagement />,
        children: [
          {
            path: "exam-type",
            element: <ExamType />,
          },
          {
            path: "subject",
            element: <Subject />,
          },
          {
            path: 'exam-assign-to-class',
            element: <ExamAssignToclassName />
          }
        ],
      },
      {
        path: "sms-management",
        element: <SMSManagement />,
      },
    ],
  },
]);
