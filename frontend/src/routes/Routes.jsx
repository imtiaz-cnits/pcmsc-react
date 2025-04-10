import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AcademicManagement from "../pages/AcademicManagement/AcademicManagement";
import AdmitCard from "../pages/AdmitCard/AdmitCard";
import Admin from "../pages/Auth/Admin/Admin";
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/Signup/Signup";
import ClassPages from "../pages/Class/Class";
import ClassWiseStudent from "../pages/ClassWiseStudent/ClassWiseStudent";
import CombineResult from "../pages/CombineResult/CombineResult";
import Dahsboard from "../pages/Dashboard/Dashboard";
import ExamManagement from "../pages/Exam Management/ExamManagement";
import ExamAssignToclassName from "../pages/ExamAssignToClass/ExamAssignToClass";
import ExamType from "../pages/ExamType/ExamType";
import GeneratedAdmitCard from "../pages/GeneratedAdmitCard/GeneratedAdmitCard";
import GeneratedTBSheet from "../pages/GeneratedTBSheet/GeneratedTBSheet";
import GenerateIDCard from "../pages/GenerateIDCard/GenerateIDCard";
import Grade from "../pages/Grade/Grade";
import GroupPage from "../pages/Group/GroupPage";
import MarkEntry from "../pages/MarkEntry/MarkEntry";
import MarkSheet from "../pages/MarkSheet/MarkSheet";
import Migration from "../pages/Migration/Migration";
import Result from "../pages/Result/Result";
import SeatPlan from "../pages/SeatPlan/SeatPlan";
import Section from "../pages/Section/Section";
import Session from "../pages/Session/Session";
import Shift from "../pages/Shift/Shift.jsx";
import SMSManagement from "../pages/SMSManagement/SMSManagement";
import StudentInformation from "../pages/StudentInformation/StudentInformation";
import StudentManagement from "../pages/StudentManagement/StudentManagement";
import Subject from "../pages/Subject/Subject";
import TabulationSheet from "../pages/TabulationSheet/TabulationSheet";
import Ok from "../pages/Test/Ok";
import Test from "../pages/Test/Test";
import TodoComponent from "../pages/Test/Todo.jsx";
import ProtectedRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
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
            element: <ClassPages />,
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
          {
            path: "group",
            element: <GroupPage />,
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
            path: "class-wise-student",
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
            path: "grade",
            element: <Grade />,
          },
          {
            path: "exam-assign",
            element: <ExamAssignToclassName />,
          },
          {
            path: "mark-entry",
            element: <MarkEntry />,
          },
          {
            path: "result-sheet",
            element: <Result />,
          },
          {
            path: "combine-result",
            element: <CombineResult />,
          },
          {
            path: "mark-sheet",
            element: <MarkSheet />,
          },
          {
            path: "admit-card",
            element: <AdmitCard />,
          },
          {
            path: "generated-admit-card",
            element: <GeneratedAdmitCard />,
          },
          {
            path: "tabulation-sheet",
            element: <TabulationSheet />,
          },
          {
            path: "generated-tb-sheet",
            element: <GeneratedTBSheet />,
          },
          {
            path: "seat-plan",
            element: <SeatPlan />,
          },
          {
            path: "generate-id-card",
            element: <GenerateIDCard />,
          },
        ],
      },
      {
        path: "sms-management",
        element: <SMSManagement />,
      },
    ],
  },
  {
    path: "admin-panel",
    element: <Admin />,
    children: [
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: "sign-in",
        element: <Login />,
      },
    ],
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "todo",
    element: <TodoComponent />,
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "ok",
    element: <Ok />,
  },
]);
