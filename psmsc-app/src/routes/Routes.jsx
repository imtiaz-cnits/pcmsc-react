import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AcademicManagement from "../pages/AcademicManagement/AcademicManagement";
import AdmitCard from "../pages/AdmitCard/AdmitCard";
import Class from "../pages/Class/Class";
import ClassWiseStudent from "../pages/ClassWiseStudent/ClassWiseStudent";
import CombineResult from "../pages/CombineResult/CombineResult";
import Dahsboard from "../pages/Dashboard/Dashboard";
import ExamManagement from "../pages/Exam Management/ExamManagement";
import ExamAssignToclassName from "../pages/ExamAssignToClass/ExamAssignToClass";
import ExamType from "../pages/ExamType/ExamType";
import GeneratedAdmitCard from "../pages/GeneratedAdmitCard/GeneratedAdmitCard";
import GeneratedTBSheet from "../pages/GeneratedTBSheet/GeneratedTBSheet";
import GenerateIDCard from "../pages/GenerateIDCard/GenerateIDCard";
import MarkEntry from "../pages/MarkEntry/MarkEntry";
import MarkSheet from "../pages/MarkSheet/MarkSheet";
import Migration from "../pages/Migration/Migration";
import Result from "../pages/Result/Result";
import SeatPlan from "../pages/SeatPlan/SeatPlan";
import Section from "../pages/Section/Section";
import Session from "../pages/Session/Session";
import Shift from "../pages/Shift/Shift";
import SMSManagement from "../pages/SMSManagement/SMSManagement";
import StudentInformation from "../pages/StudentInformation/StudentInformation";
import StudentManagement from "../pages/StudentManagement/StudentManagement";
import Subject from "../pages/Subject/Subject";
import TabulationSheet from "../pages/TabulationSheet/TabulationSheet";
import Test from "../pages/Test/Test";

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
            path: "exam-assign-to-class",
            element: <ExamAssignToclassName />,
          },
          {
            path: "mark-entry",
            element: <MarkEntry />,
          },
          {
            path: "result",
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
    path: "test",
    element: <Test />,
  },
]);
