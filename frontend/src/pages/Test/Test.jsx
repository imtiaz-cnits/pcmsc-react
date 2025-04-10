import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "../../assets/css/all-modal.css";

import productMemberPng from "../../assets/img/projuct-member-img-3.png";
import DatepickerComponent from "../../components/DatepickerComponent ";
import ActionButtons from "../../components/ActionButtons";
import Shimmer from "../../components/Shimmer";
import { useFetchClasses } from "../../hook/useClass";
import { useFetchSections } from "../../hook/useSection";
import { useFetchSessions } from "../../hook/useSession";
import { useFetchShifts } from "../../hook/useShift";
import {
  useAddSutdent,
  useDeleteStudent,
  useFetchStudents, useUpdateStudent,
} from "../../hook/useStudentInfo";
import { useFetchGroups } from "../../hook/useGroup";

const Test = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen,setIsEditModalOpen] = useState(false)
  const [editId, setEditId] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [studentRoll, setStudentRoll] = useState("");
  const [studentName, setStudentName] = useState("");
  const [nameBangla, setNameBangla] = useState("");
  const [birthCertificate, setBirthCertificate] = useState("");
  const [bloodGroup, setBloodGroup] = useState(null);
  const [religion, setReligion] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherNID, setFatherNID] = useState("");
  const [fatherPhoneNo, setFatherPhoneNo] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherNID, setMotherNID] = useState("");
  const [motherPhoneNo, setMotherPhoneNo] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [guardian, setGuardian] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [dob, setDOB] = useState("");
  const [studentGender, setStudentGender] = useState(null);
  const [studentEmail, setStudentEmail] = useState("");
  const [smsStatus, setSmsStatus] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [className, setClassName] = useState("");
  const [shift, setShift] = useState(null);
  const [section, setSection] = useState(null);
  const [session, setSession] = useState(null);
  const [group, setGroup] = useState(null);
  const [warn, setWarn] = useState("");
  const formRef = useRef(null);
  const { mutate: addStudent } = useAddSutdent();
  const { mutate: deleteStudent } = useDeleteStudent();
  const {mutate: updateStudent} = useUpdateStudent()

  const {
    data: students,
    isPending: isStudentsPending,
    isError: isStudentsError,
    error: studentsError,
  } = useFetchStudents();
  const {
    data: classes,
    isPending: isclassPending,
    isError: isClassError,
    error: classError,
  } = useFetchClasses();
  const {
    data: shifts,
    isPending: isshiftPending,
    isError: isShiftError,
    error: shiftError,
  } = useFetchShifts();
  const {
    data: sections,
    isPending: isSectionPending,
    isError: isSectionError,
    error: sectionError,
  } = useFetchSections();

  const {
    data: sessions,
    isPending: isSessionPending,
    isError: isSessionError,
    error: sessionError,
  } = useFetchSessions();

  const {
    data: groups,
    isPending: isGroupsPending,
    isError: isGroupsError,
    error: groupsError,
  } = useFetchGroups();
  //  Close the modal by clicking outside it
  const handleOutSideClick = (e) => {
    if (e.target.classList.contains("studentModal")) {
      setIsModalOpen(false);
    }
  };

  // Close the modal when Esc key is pressed
  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";

    document.addEventListener("click", handleOutSideClick);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("click", handleOutSideClick);
      document.addEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  // Delate Confirmation Modal Start....................

  useEffect(() => {
    $(document).ready(function () {
      // Copy table to clipboard
      $("#copyBtn").click(function () {
        const range = document.createRange();
        range.selectNode(document.querySelector("table"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        alert("Table copied to clipboard!");
      });

      // Export table to CSV
      $("#csvBtn").click(function () {
        let csv = [];
        const rows = document.querySelectorAll("table tr");

        rows.forEach((row) => {
          const cols = row.querySelectorAll("td, th");
          let rowData = [];
          cols.forEach((col) => rowData.push(col.innerText));
          csv.push(rowData.join(","));
        });

        const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
        const downloadLink = document.createElement("a");
        downloadLink.download = "data.csv";
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.click();
      });

      // Export table to PDF
      $("#pdfBtn").click(function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add the table content to the PDF
        doc.autoTable({
          html: "table",
          startY: 10,
        });

        // Save the PDF
        doc.save("data.pdf");
      });

      // Export table to XLSX
      $("#xlsxBtn").click(function () {
        const wb = XLSX.utils.table_to_book(document.querySelector("table"));
        XLSX.writeFile(wb, "data.xlsx");
      });
    });
  }, []);

  const printTable = () => {
    const tableElement = document.getElementById("printTable");
    const originalContent = document.body.innerHTML;

    // Replace the body's content with the table
    document.body.innerHTML = tableElement.outerHTML;

    // Trigger the print dialog
    window.print();

    // Restore the original content
    document.body.innerHTML = originalContent;
  };

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const classOptions = classes?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const shiftOptions = shifts?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const sectionOptions = sections?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const sessionOPtions = sessions?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const groupOPtions = groups?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const genderOPtions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const smsStatusOPtions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];


  const handleEdit = (e,item)=>{
    e.preventDefault()
    setEditId(item?._id)
    setAdmissionNumber(item?.admissionNumber)
    setStudentRoll(item?.studentRoll)
    setStudentName(item?.name)
    setNameBangla(item?.nameInBangla)
    setBirthCertificate(item?.birthCertificate)
    setBloodGroup(item?.bloodGroup)
    setReligion(item?.religion)
    setFatherName(item?.fatherName)
    setFatherNID(item?.fatherNID)
    setFatherPhoneNo(item?.fatherPhone)
    setMotherName(item?.motherName)
    setMotherNID(item?.motherNID)
    setMotherPhoneNo(item?.motherPhone)
    setPresentAddress(item?.presentAddress)
    setPermanentAddress(item?.permanentAddress)
    setGuardian(item?.guardianName)
    setGuardianPhone(item?.guardianPhone)
    setDOB(item?.dateOfBirth)
    setStudentGender(item?.studentGender)
    setStudentEmail(item?.studentEmail)
    setSmsStatus(item?.smsStatus)
    setRegistrationDate(item?.registrationDate)
    setClassName(item?.className?.name)
    setShift(item?.shift?.name)
    setSection(item?.section?.name)
    setSession(item?.session?.name)
    setGroup(item?.group?.name)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (e)=>{
    e.preventDefault()

    const payload = {
      studentID:admissionNumber,
      admissionNumber,
      admissionDate,
      studentRoll,
      name: studentName,
      nameInBangla: nameBangla,
      birthCertificate,
      bloodGroup: bloodGroup ? bloodGroup.value : null,
      religion,
      fatherName,
      fatherNID,
      fatherPhone: fatherPhoneNo,
      motherName,
      motherNID,
      motherPhone: motherPhoneNo,
      presentAddress,
      permanentAddress,
      guardianName: guardian,
      guardianPhone,
      dateOfBirth: dob,
      studentGender: studentGender ? studentGender.value : null,
      studentEmail,
      smsStatus: smsStatus ? smsStatus.value : null,
      registrationDate,
      className: className ? className.value : null,
      shiftName: shift ? shift.value : null,
      sectionName: section ? section.value : null,
      sessionName: session ? session.value : null,
      groupName: group ? group.value : null,
    };

    console.log("payload : ", payload);




    updateStudent({studentID:editId , payload})
    formRef.current.reset();
    setAdmissionNumber("");
    setStudentRoll("");
    setStudentName("");
    setNameBangla("");
    setBirthCertificate("");
    setBloodGroup(null);
    setReligion("");
    setFatherName("");
    setFatherNID("");
    setFatherPhoneNo("");
    setMotherName("");
    setMotherNID("");
    setMotherPhoneNo("");
    setPresentAddress("");
    setPermanentAddress("");
    setGuardian("");
    setGuardianPhone("");
    setStudentGender("");
    setStudentEmail("");
    setSmsStatus("");
    setRegistrationDate("");
    setClassName(null);
    setShift(null);
    setSection(null);
    setSession(null);
    setGroup(null);
    setIsModalOpen(false);
  }

  const handleResetForm = () => {
    console.log("button is clicked");
    console.log(formRef.current);

    setAdmissionNumber("");
    setStudentRoll("");
    setStudentName("");
    setNameBangla("");
    setBirthCertificate("");
    setBloodGroup(null);
    setReligion("");
    setFatherName("");
    setFatherNID("");
    setFatherPhoneNo("");
    setMotherName("");
    setMotherNID("");
    setMotherPhoneNo("");
    setPresentAddress("");
    setPermanentAddress("");
    setGuardian("");
    setGuardianPhone("");
    setDOB(null);
    setStudentGender("");
    setStudentEmail("");
    setSmsStatus("");
    setRegistrationDate("");
    setClassName("");
    setShift(null);
    setSection(null);
    setSession(null);
    setGroup(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      admissionNumber,
      admissionDate,
      studentRoll,
      studentName,
      nameBangla,
      birthCertificate,
      bloodGroup: bloodGroup ? bloodGroup.value : null,
      religion,
      fatherName,
      fatherNID,
      fatherPhoneNo,
      motherName,
      motherNID,
      motherPhoneNo,
      presentAddress,
      permanentAddress,
      guardian,
      guardianPhone,
      dob,
      studentGender: studentGender ? studentGender.value : null,
      studentEmail,
      smsStatus: smsStatus ? smsStatus.value : null,
      registrationDate,
      className: className ? className.value : null,
      shift: shift ? shift.value : null,
      section: section ? section.value : null,
      session: session ? session.value : null,
      group: group ? group.value : null,
    };

    console.log("payload : ", payload);

    addStudent(payload);
    formRef.current.reset();
    setAdmissionNumber("");
    setStudentRoll("");
    setStudentName("");
    setNameBangla("");
    setBirthCertificate("");
    setBloodGroup(null);
    setReligion("");
    setFatherName("");
    setFatherNID("");
    setFatherPhoneNo("");
    setMotherName("");
    setMotherNID("");
    setMotherPhoneNo("");
    setPresentAddress("");
    setPermanentAddress("");
    setGuardian("");
    setGuardianPhone("");
    setStudentGender("");
    setStudentEmail("");
    setSmsStatus("");
    setRegistrationDate("");
    setClassName(null);
    setShift(null);
    setSection(null);
    setSession(null);
    setGroup(null);
    setIsModalOpen(false);
  };

  if (
    isclassPending ||
    isshiftPending ||
    isSectionPending ||
    isSessionPending ||
    isStudentsPending ||
    isGroupsPending
  )
    return <Shimmer count={10} />;

  if (
    isClassError ||
    isShiftError ||
    isSectionError ||
    isSessionError ||
    isStudentsError ||
    isGroupsError
  ) {
    let errorMsg = "Something went wrong. Please try again later!";

    if (isClassError && classError instanceof Error) {
      console.log("Class Error: ", classError);
      errorMsg = classError?.response?.data?.message || classError?.message;
    }
    if (isShiftError && shiftError instanceof Error) {
      console.log("Shift Error: ", shiftError);
      errorMsg = shiftError?.response?.data?.message || shiftError?.message;
    }

    if (isSectionError && sectionError instanceof Error) {
      console.log("Section Error: ", sectionError);
      errorMsg = sectionError?.response?.data?.message || sectionError?.message;
    }

    if (isSessionError && sessionError instanceof Error) {
      console.log("Session Error: ", sessionError);
      errorMsg = sessionError?.response?.data?.message || sessionError?.message;
    }

    if (isStudentsError && studentsError instanceof Error) {
      console.log("Students Error: ", studentsError);
      errorMsg =
        studentsError?.response?.data?.message || studentsError?.message;
    }

    if (isGroupsError && groupsError instanceof Error) {
      console.log("Students Error: ", groupsError);
      errorMsg = groupsError?.response?.data?.message || groupsError?.message;
    }

    return <p>{errorMsg}</p>;
  }

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          {/* <!-- Table Start --> */}
          <div className="bredcam">
            <div className="bredcam-title">
              <h1>Student Information</h1>
              <button
                id="studentModalBtn"
                type="button"
                className="create-invoice"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                + Add New Student
              </button>
            </div>
          </div>
          <div className="data-table">
            <div className="card">
              <div className="card-body">
                {/* <!-- Action Buttons --> */}
                <div className="button-wrapper mb-3">
                  {/* <!-- Search and Filter --> */}
                  <div className="d-flex">
                    <div className="input-group">
                      <input
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Search Student..."
                      />
                      {/* <!-- Entries per page --> */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center", // Using camelCase for CSS properties
                          gap: "10px", // Adding the unit 'px'
                          justifyContent: "center", // Using camelCase for CSS properties
                        }}
                      >
                        <div className="entries-page">
                          <label htmlFor="entries" className="mr-2">
                            Entries:
                          </label>
                          <div className="select-container">
                            <select
                              id="entries"
                              className="form-control"
                              style={{ width: "auto" }}
                            >
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                            <span className="dropdown-icon">&#9662;</span>
                            {/* <!-- Dropdown icon --> */}
                          </div>
                        </div>

                        <div className="input-group-append">
                          <div className="dropdown-custom">
                            <button className="dropdown-button">
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 39 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  y="1"
                                  width="25"
                                  height="3"
                                  rx="1.5"
                                  fill="#192045"
                                />
                                <rect
                                  y="11"
                                  width="25"
                                  height="3"
                                  rx="1.5"
                                  fill="#192045"
                                />
                                <rect
                                  y="21"
                                  width="25"
                                  height="3"
                                  rx="1.5"
                                  fill="#192045"
                                />
                                <path
                                  d="M32 1C32 0.447715 31.5523 -2.41411e-08 31 0C30.4477 2.41411e-08 30 0.447715 30 1L32 1ZM30.2929 37.7071C30.6834 38.0976 31.3166 38.0976 31.7071 37.7071L38.0711 31.3431C38.4616 30.9526 38.4616 30.3195 38.0711 29.9289C37.6805 29.5384 37.0474 29.5384 36.6569 29.9289L31 35.5858L25.3431 29.9289C24.9526 29.5384 24.3195 29.5384 23.9289 29.9289C23.5384 30.3195 23.5384 30.9526 23.9289 31.3431L30.2929 37.7071ZM30 1L30 37L32 37L32 1L30 1Z"
                                  fill="#192045"
                                />
                              </svg>
                              <span>Filter</span>
                            </button>
                            <div className="dropdown-menus">
                              <a href="#" data-filter="all">
                                All time
                              </a>
                              <a href="#" data-filter="today">
                                Today
                              </a>
                              <a href="#" data-filter="7">
                                Last 7 Days
                              </a>
                              <a href="#" data-filter="30">
                                Last Month
                              </a>
                              <a href="#" data-filter="365">
                                Last Year
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="button-item">
                    <div className="icon-buttons">
                      <button id="copyBtn">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 44 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="43"
                            height="43"
                            rx="5.5"
                            stroke="#192045"
                          />
                          <path
                            d="M33.3002 17.45H21.1502C19.659 17.45 18.4502 18.6588 18.4502 20.15V32.3C18.4502 33.7912 19.659 35 21.1502 35H33.3002C34.7914 35 36.0002 33.7912 36.0002 32.3V20.15C36.0002 18.6588 34.7914 17.45 33.3002 17.45Z"
                            stroke="#192045"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.05 25.55H11.7C10.9839 25.55 10.2972 25.2655 9.79081 24.7592C9.28446 24.2528 9 23.5661 9 22.85V10.7C9 9.98392 9.28446 9.29716 9.79081 8.79081C10.2972 8.28446 10.9839 8 11.7 8H23.85C24.5661 8 25.2528 8.28446 25.7592 8.79081C26.2655 9.29716 26.55 9.98392 26.55 10.7V12.05"
                            stroke="#192045"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button id="csvBtn">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 44 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="43"
                            height="43"
                            rx="5.5"
                            stroke="#192045"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M36 14.7144V33.1114C36 34.1386 35.5936 35.1238 34.8703 35.8501C34.1469 36.5765 33.1658 36.9845 32.1429 36.9845H30.2143V35.048H32.1429C32.6543 35.048 33.1449 34.8439 33.5066 34.4808C33.8682 34.1176 34.0714 33.625 34.0714 33.1114V14.7144H30.2143C29.4471 14.7144 28.7112 14.4084 28.1687 13.8636C27.6262 13.3188 27.3214 12.58 27.3214 11.8096V7.93653H16.7143C16.2028 7.93653 15.7123 8.14056 15.3506 8.50373C14.9889 8.8669 14.7857 9.35946 14.7857 9.87306V27.3018H12.8571V9.87306C12.8571 8.84586 13.2635 7.86073 13.9869 7.13439C14.7102 6.40805 15.6913 6 16.7143 6H27.3214L36 14.7144ZM15.7828 34.7401C15.7938 35.0452 15.8683 35.3446 16.0015 35.6191C16.1347 35.8936 16.3236 36.1371 16.5561 36.3338C16.8069 36.543 17.1135 36.7056 17.478 36.8218C17.8444 36.94 18.2706 36.9981 18.7605 36.9981C19.4124 36.9981 19.9639 36.8954 20.4171 36.6921C20.8723 36.4888 21.2194 36.2041 21.4566 35.84C21.6977 35.474 21.8173 35.0499 21.8173 34.5697C21.8173 34.1359 21.7305 33.7757 21.5589 33.4852C21.3823 33.195 21.1329 32.9566 20.8356 32.7939C20.494 32.6043 20.1261 32.4673 19.7441 32.3872L18.5464 32.1083C18.2641 32.0562 17.9975 31.9396 17.7673 31.7675C17.6793 31.6994 17.6084 31.6115 17.5602 31.511C17.5119 31.4105 17.4878 31.3 17.4896 31.1885C17.4896 30.8864 17.6091 30.6385 17.8464 30.4448C18.0874 30.2493 18.4172 30.1505 18.8338 30.1505C19.1096 30.1505 19.3468 30.195 19.5474 30.2822C19.732 30.3577 19.895 30.4782 20.0218 30.6327C20.1405 30.7764 20.2202 30.9485 20.2532 31.1323H21.6996C21.6756 30.7379 21.5419 30.3582 21.3139 30.0362C21.0702 29.6886 20.7368 29.4142 20.3496 29.2423C19.8761 29.0336 19.3623 28.9331 18.8454 28.9479C18.2803 28.9479 17.7827 29.0447 17.3488 29.2384C16.9149 29.4301 16.5774 29.7031 16.3324 30.0537C16.0875 30.4061 15.966 30.8186 15.966 31.2911C15.966 31.6803 16.0431 32.0192 16.2013 32.3058C16.3594 32.5944 16.587 32.8287 16.8801 33.0166C17.1733 33.2005 17.5204 33.34 17.9196 33.429L19.1115 33.7079C19.5107 33.8028 19.8077 33.9267 20.0044 34.0816C20.1005 34.1552 20.1774 34.2511 20.2285 34.361C20.2795 34.471 20.3033 34.5918 20.2976 34.713C20.3013 34.9126 20.2441 35.1085 20.1336 35.2745C20.0095 35.4446 19.8385 35.5745 19.6419 35.6483C19.4278 35.7393 19.1616 35.7839 18.8454 35.7839C18.6197 35.7839 18.4153 35.7587 18.2282 35.7064C18.0577 35.659 17.8961 35.5837 17.7499 35.4837C17.6215 35.4003 17.5116 35.2912 17.427 35.1632C17.3424 35.0353 17.2849 34.8913 17.2581 34.7401H15.7828ZM10.5544 32.5169C10.5544 32.0367 10.62 31.6261 10.7511 31.2911C10.8655 30.9817 11.0681 30.713 11.3336 30.5184C11.6042 30.3368 11.9243 30.2441 12.2496 30.2531C12.5389 30.2531 12.7954 30.3151 13.0172 30.441C13.2346 30.5576 13.416 30.7317 13.5418 30.9445C13.6762 31.1685 13.7555 31.4214 13.7732 31.6823H15.2486V31.5429C15.2358 31.1861 15.1493 30.836 14.9946 30.5146C14.8399 30.1933 14.6203 29.9077 14.3499 29.676C14.0728 29.4403 13.7524 29.2613 13.4068 29.1493C13.0305 29.0214 12.6354 28.9579 12.2381 28.9615C11.5515 28.9615 10.9652 29.1048 10.4811 29.3933C9.999 29.6799 9.63257 30.0885 9.378 30.6172C9.12729 31.1478 9 31.7791 9 32.5131V33.4774C9 34.2114 9.12343 34.8408 9.37221 35.3675C9.62486 35.8923 9.99321 36.297 10.4754 36.5798C10.9575 36.8606 11.5438 37 12.2381 37C12.8031 37 13.3065 36.8935 13.752 36.6824C14.1956 36.4694 14.5504 36.1789 14.8127 35.8032C15.0788 35.4187 15.23 34.9659 15.2486 34.498V34.3508H13.7751C13.757 34.6002 13.6789 34.8414 13.5476 35.0538C13.419 35.2594 13.2379 35.4266 13.023 35.5379C12.7822 35.6549 12.5171 35.7127 12.2496 35.7064C11.9238 35.7157 11.6027 35.6266 11.3278 35.4508C11.0637 35.262 10.8627 34.9973 10.7511 34.6917C10.6101 34.3029 10.5434 33.891 10.5544 33.4774V32.5189V32.5169ZM26.4439 36.8509H24.606L22.0256 29.1067H23.7941L25.5221 35.1835H25.5954L27.3079 29.1067H29.0031L26.4439 36.8528V36.8509Z"
                            fill="#192045"
                          />
                        </svg>
                      </button>
                      <button id="pdfBtn">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 44 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="43"
                            height="43"
                            rx="5.5"
                            stroke="#192045"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M36 15V34C36 35.0609 35.5936 36.0783 34.8703 36.8284C34.1469 37.5786 33.1658 38 32.1429 38H30.2143V36H32.1429C32.6543 36 33.1449 35.7893 33.5066 35.4142C33.8682 35.0391 34.0714 34.5304 34.0714 34V15H30.2143C29.4471 15 28.7112 14.6839 28.1687 14.1213C27.6262 13.5587 27.3214 12.7956 27.3214 12V8H16.7143C16.2028 8 15.7123 8.21071 15.3506 8.58579C14.9889 8.96086 14.7857 9.46957 14.7857 10V28H12.8571V10C12.8571 8.93913 13.2635 7.92172 13.9869 7.17157C14.7102 6.42143 15.6913 6 16.7143 6H27.3214L36 15ZM12.0857 29.7H9V37.698H10.5255V35.014H12.0741C12.6276 35.014 13.0982 34.9 13.4859 34.668C13.8774 34.434 14.1763 34.118 14.3788 33.72C14.589 33.3024 14.6957 32.8371 14.6893 32.366C14.6893 31.866 14.5871 31.414 14.3846 31.012C14.1832 30.6124 13.8752 30.2812 13.4974 30.058C13.1117 29.818 12.6431 29.7 12.0857 29.7ZM13.1368 32.366C13.1437 32.6295 13.0874 32.8907 12.9729 33.126C12.8701 33.3309 12.7101 33.4989 12.5139 33.608C12.2893 33.7232 12.041 33.7795 11.7906 33.772H10.5197V30.96H11.7926C12.213 30.96 12.5428 31.08 12.78 31.322C13.0172 31.566 13.1368 31.914 13.1368 32.366ZM15.4839 29.7V37.698H18.2996C19.0729 37.698 19.7151 37.538 20.2243 37.224C20.7395 36.9043 21.1419 36.4212 21.3718 35.846C21.6225 35.246 21.7498 34.522 21.7498 33.678C21.7498 32.838 21.6244 32.122 21.3718 31.528C21.1446 30.9594 20.7461 30.4824 20.2359 30.168C19.7267 29.856 19.0806 29.7 18.2976 29.7H15.4839ZM17.0094 30.99H18.0951C18.5734 30.99 18.963 31.09 19.2696 31.294C19.5879 31.5099 19.8281 31.8293 19.9524 32.202C20.1047 32.604 20.1799 33.106 20.1799 33.708C20.1859 34.1069 20.1418 34.5049 20.0488 34.892C19.9801 35.1973 19.8514 35.4846 19.6708 35.736C19.503 35.9603 19.2807 36.1342 19.0266 36.24C18.729 36.3555 18.4129 36.4111 18.0951 36.404H17.0094V30.99ZM24.228 34.516V37.698H22.7044V29.7H27.6184V31.006H24.228V33.24H27.3253V34.516H24.228Z"
                            fill="#192045"
                          />
                        </svg>
                      </button>
                      <button id="printBtn" onClick={printTable}>
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 44 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="43"
                            height="43"
                            rx="5.5"
                            stroke="#192045"
                          />
                          <path
                            d="M29.817 17.0382H14.1692C13.8755 17.0382 13.5939 16.9216 13.3863 16.714C13.1787 16.5063 13.062 16.2247 13.062 15.9311V8.10716C13.062 7.81352 13.1787 7.53191 13.3863 7.32428C13.5939 7.11665 13.8755 7 14.1692 7H29.817C30.1107 7 30.3923 7.11665 30.5999 7.32428C30.8075 7.53191 30.9242 7.81352 30.9242 8.10716V15.9311C30.9242 16.2247 30.8075 16.5063 30.5999 16.714C30.3923 16.9216 30.1107 17.0382 29.817 17.0382ZM15.2763 14.8239H28.7099V9.21432H15.2763V14.8239Z"
                            fill="#192045"
                          />
                          <path
                            d="M29.817 36.6719H14.1692C13.8755 36.6719 13.5939 36.5552 13.3863 36.3476C13.1787 36.14 13.062 35.8584 13.062 35.5647V23.5402C13.062 23.2466 13.1787 22.965 13.3863 22.7573C13.5939 22.5497 13.8755 22.4331 14.1692 22.4331H29.817C30.1107 22.4331 30.3923 22.5497 30.5999 22.7573C30.8075 22.965 30.9242 23.2466 30.9242 23.5402V35.5647C30.9242 35.8584 30.8075 36.14 30.5999 36.3476C30.3923 36.5552 30.1107 36.6719 29.817 36.6719ZM15.2763 34.4576H28.7099V24.6474H15.2763V34.4576Z"
                            fill="#192045"
                          />
                          <path
                            d="M33.3784 31.4313H29.8171C29.5234 31.4313 29.2418 31.3147 29.0342 31.107C28.8266 30.8994 28.7099 30.6178 28.7099 30.3242C28.7099 30.0305 28.8266 29.7489 29.0342 29.5413C29.2418 29.3337 29.5234 29.217 29.8171 29.217H33.3784C33.7479 29.2166 34.1021 29.0697 34.3634 28.8084C34.6247 28.5472 34.7716 28.1929 34.772 27.8235V18.4325C34.7718 18.0629 34.6249 17.7085 34.3637 17.4471C34.1024 17.1857 33.748 17.0386 33.3784 17.0382H10.6079C10.2383 17.0386 9.88393 17.1857 9.62265 17.4471C9.36137 17.7085 9.21451 18.0629 9.21432 18.4325V27.8235C9.21471 28.1929 9.36165 28.5472 9.62291 28.8084C9.88417 29.0697 10.2384 29.2166 10.6079 29.217H14.1692C14.4629 29.217 14.7445 29.3337 14.9521 29.5413C15.1597 29.7489 15.2764 30.0305 15.2764 30.3242C15.2764 30.6178 15.1597 30.8994 14.9521 31.107C14.7445 31.3147 14.4629 31.4313 14.1692 31.4313H10.6079C9.65136 31.4302 8.73437 31.0497 8.05801 30.3733C7.38166 29.697 7.00117 28.78 7 27.8235V18.4325C7.00098 17.4759 7.38138 16.5587 8.05775 15.8822C8.73413 15.2057 9.65123 14.8251 10.6079 14.8239H33.3784C34.3351 14.8251 35.2522 15.2057 35.9286 15.8822C36.6049 16.5587 36.9853 17.4759 36.9863 18.4325V27.8235C36.9851 28.78 36.6046 29.697 35.9283 30.3733C35.2519 31.0497 34.335 31.4302 33.3784 31.4313Z"
                            fill="#192045"
                          />
                          <path
                            d="M12.9884 20.8764C12.9519 20.8765 12.9155 20.8748 12.8792 20.8712C12.8437 20.8675 12.8054 20.8616 12.7721 20.855C12.7389 20.8484 12.6983 20.8388 12.6666 20.8284C12.6349 20.8181 12.598 20.8055 12.5647 20.7915C12.5315 20.7775 12.499 20.762 12.4673 20.745C12.435 20.7284 12.4037 20.7099 12.3736 20.6897C12.344 20.6697 12.3145 20.6483 12.2865 20.6254C12.2584 20.6026 12.2311 20.5775 12.2053 20.5516C12.1794 20.5258 12.1551 20.4985 12.1315 20.4704C12.1086 20.4425 12.0872 20.4135 12.0673 20.3833C12.0471 20.3528 12.0286 20.3218 12.0119 20.2903C11.9949 20.2586 11.9794 20.2254 11.9654 20.1922C11.9514 20.159 11.9396 20.1243 11.9285 20.0903C11.9174 20.0564 11.9093 20.0165 11.9019 19.9848C11.8945 19.953 11.8894 19.911 11.8857 19.8777C11.8786 19.8041 11.8786 19.73 11.8857 19.6563C11.8894 19.6209 11.8953 19.5825 11.9019 19.5493C11.9086 19.5161 11.9182 19.4755 11.9285 19.4437C11.9388 19.412 11.9514 19.3751 11.9654 19.3419C11.9794 19.3087 11.9949 19.2754 12.0119 19.2437C12.0289 19.212 12.0473 19.181 12.0673 19.1507C12.0872 19.1206 12.1086 19.0915 12.1315 19.0636C12.1543 19.0356 12.1794 19.0083 12.2053 18.9824C12.2311 18.9566 12.2584 18.9322 12.2865 18.9086C12.3145 18.885 12.344 18.8643 12.3736 18.8444C12.4037 18.8241 12.435 18.8056 12.4673 18.789C12.4993 18.7723 12.5318 18.7568 12.5647 18.7425C12.598 18.7285 12.6326 18.7167 12.6666 18.7056C12.7005 18.6946 12.7404 18.6864 12.7721 18.6791C12.8039 18.6717 12.846 18.6665 12.8792 18.6628C12.9516 18.6562 13.0245 18.6562 13.0969 18.6628C13.1331 18.6665 13.1707 18.6724 13.2047 18.6791C13.2386 18.6857 13.2785 18.6953 13.3095 18.7056C13.3405 18.716 13.3789 18.7285 13.4121 18.7425C13.4453 18.7566 13.4778 18.7721 13.5095 18.789C13.5417 18.8058 13.573 18.8243 13.6033 18.8444C13.6328 18.8643 13.6623 18.8857 13.6903 18.9086C13.7184 18.9315 13.7457 18.9566 13.7715 18.9824C13.7974 19.0083 13.821 19.0356 13.8454 19.0636C13.8697 19.0917 13.8896 19.1212 13.9096 19.1507C13.9295 19.1802 13.9479 19.212 13.9649 19.2437C13.9819 19.2754 13.9974 19.3087 14.0114 19.3419C14.0254 19.3751 14.0373 19.4098 14.0483 19.4437C14.0594 19.4777 14.0675 19.5175 14.0749 19.5493C14.0823 19.581 14.0875 19.6231 14.0911 19.6563C14.0982 19.73 14.0982 19.8041 14.0911 19.8777C14.0875 19.9132 14.0815 19.9516 14.0749 19.9848C14.0683 20.018 14.0587 20.0586 14.0483 20.0903C14.038 20.1221 14.0254 20.159 14.0114 20.1922C13.9974 20.2254 13.9819 20.2586 13.9649 20.2903C13.9479 20.3221 13.9295 20.3531 13.9096 20.3833C13.8896 20.4136 13.8675 20.4424 13.8454 20.4704C13.8232 20.4985 13.7974 20.5258 13.7715 20.5516C13.7457 20.5775 13.7184 20.6018 13.6903 20.6254C13.6623 20.6491 13.6328 20.6697 13.6033 20.6897C13.573 20.7098 13.5417 20.7283 13.5095 20.745C13.4775 20.7617 13.4451 20.7772 13.4121 20.7915C13.3789 20.8055 13.3442 20.8174 13.3095 20.8284C13.2748 20.8395 13.2401 20.8476 13.2047 20.855C13.1692 20.8624 13.1309 20.8675 13.0969 20.8712C13.0609 20.8748 13.0246 20.8765 12.9884 20.8764Z"
                            fill="#192045"
                          />
                          <path
                            d="M16.236 20.8764C16.1998 20.8764 16.1622 20.8764 16.1267 20.8712C16.0913 20.8661 16.0529 20.8616 16.0197 20.855C15.9865 20.8484 15.9459 20.8388 15.9142 20.8284C15.8824 20.8181 15.8455 20.8055 15.8123 20.7915C15.7791 20.7775 15.7459 20.762 15.7141 20.745C15.6824 20.728 15.6514 20.7096 15.6211 20.6897C15.591 20.6698 15.5619 20.6483 15.534 20.6254C15.506 20.6026 15.4787 20.5775 15.4528 20.5516C15.427 20.5258 15.4026 20.4985 15.379 20.4704C15.3554 20.4424 15.3347 20.4129 15.3148 20.3833C15.2946 20.3531 15.2758 20.3218 15.2587 20.2896C15.2425 20.2579 15.227 20.2254 15.213 20.1922C15.1989 20.159 15.1871 20.1243 15.176 20.0903C15.165 20.0564 15.1569 20.0165 15.1495 19.9848C15.1421 19.953 15.1369 19.911 15.1332 19.8777C15.1262 19.8041 15.1262 19.7299 15.1332 19.6563C15.1369 19.6209 15.1428 19.5825 15.1495 19.5493C15.1561 19.5161 15.1657 19.4755 15.176 19.4437C15.1864 19.412 15.1989 19.3751 15.213 19.3419C15.227 19.3087 15.2425 19.2762 15.2587 19.2444C15.2758 19.2123 15.2946 19.181 15.3148 19.1507C15.3347 19.1212 15.3561 19.0917 15.379 19.0636C15.4019 19.0356 15.427 19.0083 15.4528 18.9824C15.4787 18.9566 15.506 18.9322 15.534 18.9086C15.5619 18.8857 15.591 18.8643 15.6211 18.8444C15.6516 18.8242 15.6826 18.8058 15.7141 18.789C15.7459 18.7721 15.7791 18.7566 15.8123 18.7425C15.8455 18.7285 15.8802 18.7167 15.9142 18.7056C15.9481 18.6946 15.988 18.6864 16.0197 18.6791C16.0514 18.6717 16.0935 18.6665 16.1267 18.6628C16.2004 18.656 16.2745 18.656 16.3482 18.6628C16.3836 18.6665 16.422 18.6724 16.4552 18.6791C16.4884 18.6857 16.529 18.6953 16.5607 18.7056C16.5925 18.716 16.6294 18.7285 16.6626 18.7425C16.6958 18.7566 16.7283 18.7721 16.76 18.789C16.7918 18.806 16.8235 18.8245 16.8538 18.8444C16.884 18.8643 16.9128 18.8857 16.9409 18.9086C16.9689 18.9315 16.9962 18.9566 17.0221 18.9824C17.0479 19.0083 17.0715 19.0356 17.0959 19.0636C17.1202 19.0917 17.1401 19.1212 17.1601 19.1507C17.1801 19.181 17.1986 19.2123 17.2154 19.2444C17.2322 19.2764 17.2477 19.3089 17.2619 19.3419C17.276 19.3751 17.2878 19.4098 17.2988 19.4437C17.3099 19.4777 17.318 19.5175 17.3254 19.5493C17.3328 19.581 17.338 19.6231 17.3417 19.6563C17.3487 19.7299 17.3487 19.8041 17.3417 19.8777C17.338 19.9132 17.3321 19.9516 17.3254 19.9848C17.3188 20.018 17.3092 20.0586 17.2988 20.0903C17.2885 20.1221 17.276 20.159 17.2619 20.1922C17.2479 20.2254 17.2324 20.2579 17.2154 20.2896C17.1986 20.3218 17.1801 20.3531 17.1601 20.3833C17.1401 20.4129 17.118 20.4424 17.0959 20.4704C17.0737 20.4985 17.0479 20.5258 17.0221 20.5516C16.9962 20.5775 16.9689 20.6018 16.9409 20.6254C16.9128 20.6491 16.8833 20.6697 16.8538 20.6897C16.8242 20.7096 16.7918 20.728 16.76 20.745C16.7283 20.762 16.6958 20.7775 16.6626 20.7915C16.6294 20.8055 16.5947 20.8174 16.5607 20.8284C16.5268 20.8395 16.4869 20.8476 16.4552 20.855C16.4234 20.8624 16.3814 20.8675 16.3482 20.8712C16.3149 20.8749 16.2721 20.8764 16.236 20.8764Z"
                            fill="#192045"
                          />
                          <path
                            d="M26.3481 28.8479H17.6384C17.3448 28.8479 17.0632 28.7313 16.8555 28.5237C16.6479 28.316 16.5312 28.0344 16.5312 27.7408C16.5312 27.4472 16.6479 27.1655 16.8555 26.9579C17.0632 26.7503 17.3448 26.6336 17.6384 26.6336H26.3481C26.6417 26.6336 26.9233 26.7503 27.1309 26.9579C27.3386 27.1655 27.4552 27.4472 27.4552 27.7408C27.4552 28.0344 27.3386 28.316 27.1309 28.5237C26.9233 28.7313 26.6417 28.8479 26.3481 28.8479Z"
                            fill="#192045"
                          />
                          <path
                            d="M26.3481 32.7599H17.6384C17.3448 32.7599 17.0632 32.6433 16.8555 32.4356C16.6479 32.228 16.5312 31.9464 16.5312 31.6528C16.5312 31.3591 16.6479 31.0775 16.8555 30.8699C17.0632 30.6622 17.3448 30.5456 17.6384 30.5456H26.3481C26.6417 30.5456 26.9233 30.6622 27.1309 30.8699C27.3386 31.0775 27.4552 31.3591 27.4552 31.6528C27.4552 31.9464 27.3386 32.228 27.1309 32.4356C26.9233 32.6433 26.6417 32.7599 26.3481 32.7599Z"
                            fill="#192045"
                          />
                        </svg>
                      </button>
                      <button id="xlsxBtn">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 44 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="43"
                            height="43"
                            rx="5.5"
                            stroke="#192045"
                          />
                          <path
                            d="M31.311 37.6837H12.689C11.4457 37.6821 10.2539 37.1874 9.37488 36.3082C8.49586 35.429 8.00142 34.2371 8 32.9938V10.689C8.00165 9.44591 8.4962 8.25421 9.3752 7.37521C10.2542 6.49621 11.4459 6.00166 12.689 6.00001H24.5811C25.1989 5.99879 25.8107 6.11998 26.3814 6.35658C26.9521 6.59318 27.4702 6.94051 27.9059 7.37849L34.6206 14.087C35.5011 14.9717 35.9968 16.1681 36 17.4162V32.9938C35.9986 34.2371 35.5041 35.429 34.6251 36.3082C33.7461 37.1874 32.5543 37.6821 31.311 37.6837ZM12.689 8.23201C12.0376 8.23272 11.413 8.49181 10.9524 8.95243C10.4918 9.41305 10.2327 10.0376 10.232 10.689V32.9938C10.2327 33.6453 10.4918 34.27 10.9524 34.7307C11.413 35.1915 12.0375 35.4508 12.689 35.4517H31.311C31.9625 35.4508 32.587 35.1915 33.0476 34.7307C33.5082 34.27 33.7673 33.6453 33.768 32.9938V17.4136C33.7664 16.7578 33.5059 16.1292 33.043 15.6646L26.3274 8.95518C26.0986 8.7252 25.8264 8.54287 25.5267 8.41874C25.2269 8.29461 24.9055 8.23114 24.5811 8.23201H12.689Z"
                            fill="#192045"
                          />
                          <path
                            d="M33.8932 17.1279H29.7363C28.4971 17.1267 27.309 16.6339 26.4327 15.7576C25.5565 14.8814 25.0637 13.6933 25.0625 12.4541V7.11958H27.2945V12.4541C27.2952 13.1014 27.5527 13.7221 28.0105 14.1799C28.4682 14.6377 29.0889 14.8952 29.7363 14.8959H33.8932V17.1279Z"
                            fill="#192045"
                          />
                          <path
                            d="M30.0858 31.4564H13.9136V16.7431H30.0858V31.4564ZM16.1456 29.2244H27.8538V18.9751H16.1456V29.2244Z"
                            fill="#192045"
                          />
                          <path
                            d="M28.6242 25.2157H15.4643C15.1792 25.1996 14.9111 25.075 14.715 24.8675C14.5189 24.66 14.4097 24.3853 14.4097 24.0997C14.4097 23.8142 14.5189 23.5395 14.715 23.332C14.9111 23.1245 15.1792 22.9999 15.4643 22.9837H28.6242C28.9092 22.9999 29.1773 23.1245 29.3734 23.332C29.5695 23.5395 29.6788 23.8142 29.6788 24.0997C29.6788 24.3853 29.5695 24.66 29.3734 24.8675C29.1773 25.075 28.9092 25.1996 28.6242 25.2157Z"
                            fill="#192045"
                          />
                          <path
                            d="M20.2146 31.2511C19.8916 31.2209 19.5934 31.0648 19.3846 30.8165C19.1757 30.5683 19.073 30.2478 19.0986 29.9244V18.2751C19.073 17.9517 19.1757 17.6312 19.3846 17.383C19.5934 17.1347 19.8916 16.9786 20.2146 16.9484C20.5376 16.9786 20.8357 17.1347 21.0446 17.383C21.2534 17.6312 21.3561 17.9517 21.3306 18.2751V29.9244C21.3561 30.2478 21.2534 30.5683 21.0446 30.8165C20.8357 31.0648 20.5376 31.2209 20.2146 31.2511Z"
                            fill="#192045"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* <!-- Table --> */}
                <div className="table-wrapper">
                  <table
                    id="printTable"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Sl No:</th>
                        <th>Action</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Father Name</th>
                        <th>Mother Name</th>
                        <th>Mobile Number</th>
                        <th>Photo</th>
                        <th>Class</th>
                        <th>Group</th>
                        <th>Roll</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isStudentsPending ? (
                        <Shimmer count={10} />
                      ) : (
                        students?.data?.length > 0 &&
                        students?.data?.map((item, index) => (
                          <tr key={item?._id} data-date="2024-08-05">
                            <td>{index + 1}</td>
                            <td>
                              {/* <div className="menu">
                                <div>
                                  <ul>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn editButton"
                                        data-modal="action-editmodal"
                                      >
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn deleteButton"
                                        data-modal="action-deletemodal"
                                        onClick={()=> setIsDeleteModalOpen(!isDeleteModalOpen)}
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div> */}

                              <ActionButtons
                                item={item}
                                isDeleteModalOpen={isDeleteModalOpen}
                                setIsDeleteModalOpen={setIsDeleteModalOpen}
                                setIsEditModalOpen={setIsEditModalOpen}
                                deleteAcademic={deleteStudent}
                                setWarn={setWarn}
                                handleEdit={handleEdit}
                              />
                            </td>
                            <td>{item?.studentID}</td>
                            <td>{item?.name}</td>
                            <td>{item?.fatherName}</td>
                            <td>{item?.motherName}</td>
                            <td>{item?.fatherPhone}</td>
                            <td>
                              <div className="client-item">
                                <div className="image">
                                  <img
                                    src={productMemberPng}
                                    alt="client"
                                    className="rounded-circle mr-2"
                                    width="30"
                                  />
                                </div>
                              </div>
                            </td>
                            <td>{item?.className?.nameLabel}</td>
                            <td>{item?.groupName?.nameLabel}</td>
                            <td>{item?.studentRoll}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <!-- Pagination and Display Info --> */}
                <div className="my-3">
                  <span id="display-info"></span>
                </div>

                <div id="pagination" className="pagination">
                  <button id="prevBtn" className="btn">
                    Prev
                  </button>
                  <a href="#" className="page-link page-link--1">
                    1
                  </a>
                  <a href="#" className="page-link page-link--2">
                    2
                  </a>
                  <a href="#" className="page-link page-link--3">
                    3
                  </a>
                  <button id="nextBtn" className="btn">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End -->

        <!-- Table Action Button Modal Start -->
        <!-- Confirmation Modal Start --> */}
          {isDeleteModalOpen && (
            <div id="confirmationModal" className="modal">
              <div className="modal-content">
                <p>Are you sure you want to delete this item?</p>
                <div className="modal-buttons">
                  <button id="confirmYes">Yes</button>
                  <button
                    id="confirmNo"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
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
        <!-- Quick View Modal Start --> */}
          <div id="quickViewModal" className="modal">
            <div className="modal-content">
              <p>Quick View</p>
              <div className="items">
                <div className="row">
                  <div className="col-6">
                    <div className="item">
                      <div className="profile-img">
                        <img src={productMemberPng} alt="" />
                      </div>
                      <h3>
                        Student Name: <span>Shanto</span>
                      </h3>
                      <h3>
                        Student ID: <span>121777</span>
                      </h3>
                      <h3>
                        Blood Group: <span>A+</span>
                      </h3>
                      <h3>
                        Birth Certificate: <span>3453453435445</span>
                      </h3>
                      <h3>
                        Father Name: <span>Jahangir</span>
                      </h3>
                      <h3>
                        Father NID: <span>12132323424</span>
                      </h3>
                      <h3>
                        Father Mobile: <span>01713223424</span>
                      </h3>
                      <h3>
                        Mother Name: <span>shithi</span>
                      </h3>
                      <h3>
                        Mother NID: <span>12132323424</span>
                      </h3>
                      <h3>
                        Mother Mobile: <span>01732323424</span>
                      </h3>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item">
                      <h3>
                        Admission Number: <span>232434545</span>
                      </h3>
                      <h3>
                        Admission Date: <span>2024-11-22</span>
                      </h3>
                      <h3>
                        Present Address: <span>Pabna</span>
                      </h3>
                      <h3>
                        Permanent Address: <span>Pabna</span>
                      </h3>
                      <h3>
                        Guardian (In Absence of F/M): <span>Riyad</span>
                      </h3>
                      <h3>
                        Guardian Mobile: <span>01832424343</span>
                      </h3>
                      <h3>
                        Date of Birth: <span>2024-12-1</span>
                      </h3>
                      <h3>
                        Student Email: <span>info@gmail.com</span>
                      </h3>
                      <h3>
                        SMS Status: <span>Active</span>
                      </h3>
                      <h3>
                        Registration Date: <span>2023-12-22</span>
                      </h3>
                      <h3>
                        Shift Name: <span>Day</span>
                      </h3>
                      <h3>
                        Session Name: <span>1st Semester</span>
                      </h3>
                      <h3>
                        Student Gender: <span>Male</span>
                      </h3>
                      <h3>
                        Section Name: <span>Science</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-buttons">
                <button id="quickClose">
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Quick View Modal End -->
        <!-- Table Action Button Modal Start -->

        <!-- Add Students - Pop Up Modal Start --> */}
          {isModalOpen && (
            <section id="studentModal" className="modal studentModal show">
              <div className="modal-content">
                <div id="popup-modal">
                  <div className="form-container">
                    <h3>New Student Admission</h3>
                    <form ref={formRef} onSubmit={handleSubmit}>
                      {/* <!-- Row 1 --> */}
                      <div className="form-row row">
                        <div className="form-group col-lg-4">
                          <label htmlFor="admission-number">
                            Admission Number
                          </label>
                          <input
                            type="text"
                            id="admission-number"
                            placeholder="Enter admission number"
                            value={admissionNumber}
                            onChange={(e) => setAdmissionNumber(e.target.value)}
                          />
                        </div>

                        <DatepickerComponent
                          title={"Admission Date *"}
                          selectedDate={admissionDate}
                          setSelectedDate={setAdmissionDate}
                        />

                        <div className="form-group col-lg-4">
                          <label htmlFor="student-name">
                            Student's roll number *
                          </label>
                          <input
                            type="text"
                            id="student-roll"
                            placeholder="Enter student's Roll Number"
                            value={studentRoll}
                            onChange={(e) => setStudentRoll(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="student-name">Student's Name *</label>
                          <input
                            type="text"
                            id="student-name"
                            placeholder="Enter student's name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="name-bangla">Name in Bangla</label>
                          <input
                            type="text"
                            id="name-bangla"
                            placeholder="বাংলায় নাম লিখুন"
                            value={nameBangla}
                            onChange={(e) => setNameBangla(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="birth-certificate">
                            Birth Certificate
                          </label>
                          <input
                            type="text"
                            id="birth-certificate"
                            placeholder="Enter birth certificate number"
                            value={birthCertificate}
                            onChange={(e) =>
                              setBirthCertificate(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      {/* <!-- Row 3 --> */}
                      <div className="form-row row">
                        <div className="form-group select-input-box col-lg-4">
                          <label htmlFor="select-to">Blood Group</label>
                          <Select
                            options={bloodGroupOptions}
                            onChange={setBloodGroup}
                            placeholder="Select Blood Group"
                          />
                        </div>

                        <div className="form-group col-lg-8">
                          <label htmlFor="photo">Photo</label>
                          <div className="upload-profile">
                            <div className="item">
                              <div className="img-box">
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                  <rect
                                    width="50"
                                    height="50"
                                    fill="url(#pattern0_1204_6)"
                                    fillOpacity="0.5"
                                  />
                                  <defs>
                                    <pattern
                                      id="pattern0_1204_6"
                                      patternContentUnits="objectBoundingBox"
                                      width="1"
                                      height="1"
                                    >
                                      <use
                                        xlinkHref="#image0_1204_6"
                                        transform="scale(0.005)"
                                      />
                                    </pattern>
                                    <image
                                      id="image0_1204_6"
                                      width="200"
                                      height="200"
                                      xlinkHref="data:image/png;base64,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"
                                    />
                                  </defs>
                                </svg>
                              </div>

                              <div className="profile-wrapper">
                                <label className="custom-file-input-wrapper m-0">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    aria-label="Upload Photo"
                                  />
                                </label>
                                <p>PNG,JPEG or GIF (up to 1 MB)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Row 4 --> */}
                      <div className="form-row row">
                        <div className="form-group col-lg-4">
                          <label htmlFor="religion">Religion</label>
                          <input
                            type="text"
                            id="religion"
                            placeholder="Enter religion"
                            value={religion}
                            onChange={(e) => setReligion(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="father-name">Father's Name *</label>
                          <input
                            type="text"
                            id="father-name"
                            placeholder="Enter father's name"
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-lg-4">
                          <label htmlFor="father-nid">Father's NID</label>
                          <input
                            type="text"
                            id="father-nid"
                            placeholder="Enter father's NID"
                            value={fatherNID}
                            onChange={(e) => setFatherNID(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <!-- Row 5 --> */}
                      <div className="form-row row">
                        <div className="form-group col-lg-4">
                          <label htmlFor="father-mobile">
                            Father's Mobile No *
                          </label>
                          <input
                            type="text"
                            id="father-mobile"
                            placeholder="Enter father's mobile number"
                            value={fatherPhoneNo}
                            onChange={(e) => setFatherPhoneNo(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="mother-name">Mother's Name *</label>
                          <input
                            type="text"
                            id="mother-name"
                            placeholder="Enter mother's name"
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-lg-4">
                          <label htmlFor="mother-nid">Mother's NID</label>
                          <input
                            type="text"
                            id="mother-nid"
                            placeholder="Enter mother's NID"
                            value={motherNID}
                            onChange={(e) => setMotherNID(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <!-- Row 6 --> */}
                      <div className="form-row row">
                        <div className="form-group col-lg-4">
                          <label htmlFor="mother-mobile">
                            Mother's Mobile No *
                          </label>
                          <input
                            type="text"
                            id="mother-mobile"
                            placeholder="Enter mother's mobile number"
                            value={motherPhoneNo}
                            onChange={(e) => setMotherPhoneNo(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="present-address">
                            Present Address *
                          </label>
                          <input
                            type="text"
                            id="present-address"
                            placeholder="Enter present address"
                            value={presentAddress}
                            onChange={(e) => setPresentAddress(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-lg-4">
                          <label htmlFor="permanent-address">
                            Permanent Address *
                          </label>
                          <input
                            type="text"
                            id="permanent-address"
                            placeholder="Enter permanent address"
                            value={permanentAddress}
                            onChange={(e) =>
                              setPermanentAddress(e.target.value)
                            }
                          />
                        </div>
                      </div>

                      {/* <!-- Row 7 --> */}
                      <div className="form-row row">
                        <div className="form-group col-lg-4">
                          <label htmlFor="guardian">
                            Guardian (In Absence of F/M)
                          </label>
                          <input
                            type="text"
                            id="guardian"
                            placeholder="Enter guardian's name"
                            value={guardian}
                            onChange={(e) => setGuardian(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="guardian-mobile">
                            Guardian Mobile *
                          </label>
                          <input
                            type="text"
                            id="guardian-mobile"
                            placeholder="Enter guardian's mobile number"
                            value={guardianPhone}
                            onChange={(e) => setGuardianPhone(e.target.value)}
                          />
                        </div>

                        <DatepickerComponent
                          title={"Date of Birth *"}
                          setSelectedDate={setDOB}
                        />
                      </div>

                      {/* <!-- Row 8 --> */}
                      <div className="form-row row">
                        <div className="form-group select-input-box col-lg-4">
                          <label htmlFor="select-to">Student Gender</label>

                          <div className="select-box-dropdown">
                            <Select
                              options={genderOPtions}
                              onChange={setStudentGender}
                              placeholder="Select Gender"
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="student-email">Student Email</label>
                          <input
                            type="email"
                            id="student-email"
                            placeholder="Enter student email"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group select-input-box col-lg-4">
                          <label htmlFor="select-to">SMS Status</label>

                          <Select
                            options={smsStatusOPtions}
                            onChange={setSmsStatus}
                            placeholder="Select Status"
                          />
                        </div>
                      </div>

                      {/* <!-- Row 9 --> */}
                      <div className="form-row row">
                        <DatepickerComponent
                          title={" Registration Date *"}
                          setSelectedDate={setRegistrationDate}
                        />

                        <div className="form-group select-input-box col-lg-4">
                          <label htmlFor="select-to">Class Name</label>
                          <Select
                            options={classOptions}
                            onChange={setClassName}
                            placeholder="Select Class"
                          />
                        </div>

                        <div className="form-group select-input-box col-lg-4">
                          <label htmlFor="select-to">Shift Name</label>
                          <Select
                            options={shiftOptions}
                            onChange={setShift}
                            placeholder="Select Shift"
                          />
                        </div>
                      </div>

                      {/* <!-- Row 10 --> */}
                      <div className="form-row row">
                        <div className="form-group col-lg-4">
                          <label htmlFor="section">Section Name</label>
                          <Select
                            options={sectionOptions}
                            onChange={setSection}
                            placeholder="Enter section name"
                          />
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="session">Session Name</label>

                          <Select
                            options={sessionOPtions}
                            onChange={setSession}
                            placeholder="Enter section name"
                          />
                        </div>

                        <div className="form-group col-lg-4">
                          <label htmlFor="group">Group Name</label>

                          <Select
                            options={groupOPtions}
                            onChange={setGroup}
                            placeholder="Enter group name"
                          />
                        </div>
                      </div>
                      {/* <!-- Actions --> */}
                      <div className="form-actions">
                        <button
                          type="button"
                          id="closBtn"
                          className="button close"
                          onClick={() => setIsModalOpen(!isModalOpen)}
                        >
                          Close
                        </button>
                        <button
                          type="reset"
                          className="button reset"
                          onClick={handleResetForm}
                        >
                          Reset
                        </button>
                        <button type="submit" className="button save">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* <!-- Add Students - Pop Up Modal Start --> */}





          {/*// edit modal*/}

          {/* <!-- Quick View Modal End -->
        <!-- Table Action Button Modal Start -->

        <!-- Add Students - Pop Up Modal Start --> */}
          {isEditModalOpen && (
              <section id="studentModal" className="modal studentModal show">
                <div className="modal-content">
                  <div id="popup-modal">
                    <div className="form-container">
                      <h3>New Student Admission</h3>
                      <form ref={formRef} onSubmit={handleSubmit}>
                        {/* <!-- Row 1 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-4">
                            <label htmlFor="admission-number">
                              Admission Number
                            </label>
                            <input
                                type="text"
                                id="admission-number"
                                placeholder="Enter admission number"
                                value={admissionNumber}
                                onChange={(e) => setAdmissionNumber(e.target.value)}
                            />
                          </div>

                          <DatepickerComponent
                              title={"Admission Date *"}
                              selectedDate={admissionDate}
                              setSelectedDate={setAdmissionDate}
                          />

                          <div className="form-group col-lg-4">
                            <label htmlFor="student-name">
                              Student's roll number *
                            </label>
                            <input
                                type="text"
                                id="student-roll"
                                placeholder="Enter student's Roll Number"
                                value={studentRoll}
                                onChange={(e) => setStudentRoll(e.target.value)}
                            />
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="student-name">Student's Name *</label>
                            <input
                                type="text"
                                id="student-name"
                                placeholder="Enter student's name"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                            />
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="name-bangla">Name in Bangla</label>
                            <input
                                type="text"
                                id="name-bangla"
                                placeholder="বাংলায় নাম লিখুন"
                                value={nameBangla}
                                onChange={(e) => setNameBangla(e.target.value)}
                            />
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="birth-certificate">
                              Birth Certificate
                            </label>
                            <input
                                type="text"
                                id="birth-certificate"
                                placeholder="Enter birth certificate number"
                                value={birthCertificate}
                                onChange={(e) =>
                                    setBirthCertificate(e.target.value)
                                }
                            />
                          </div>
                        </div>
                        {/* <!-- Row 3 --> */}
                        <div className="form-row row">
                          <div className="form-group select-input-box col-lg-4">
                            <label htmlFor="select-to">Blood Group</label>
                            <Select
                                options={bloodGroupOptions}
                                onChange={setBloodGroup}
                                placeholder="Select Blood Group"
                            />
                          </div>

                          <div className="form-group col-lg-8">
                            <label htmlFor="photo">Photo</label>
                            <div className="upload-profile">
                              <div className="item">
                                <div className="img-box">
                                  <svg
                                      width="32"
                                      height="32"
                                      viewBox="0 0 50 50"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                  >
                                    <rect
                                        width="50"
                                        height="50"
                                        fill="url(#pattern0_1204_6)"
                                        fillOpacity="0.5"
                                    />
                                    <defs>
                                      <pattern
                                          id="pattern0_1204_6"
                                          patternContentUnits="objectBoundingBox"
                                          width="1"
                                          height="1"
                                      >
                                        <use
                                            xlinkHref="#image0_1204_6"
                                            transform="scale(0.005)"
                                        />
                                      </pattern>
                                      <image
                                          id="image0_1204_6"
                                          width="200"
                                          height="200"
                                          xlinkHref="data:image/png;base64,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"
                                      />
                                    </defs>
                                  </svg>
                                </div>

                                <div className="profile-wrapper">
                                  <label className="custom-file-input-wrapper m-0">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        aria-label="Upload Photo"
                                    />
                                  </label>
                                  <p>PNG,JPEG or GIF (up to 1 MB)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <!-- Row 4 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-4">
                            <label htmlFor="religion">Religion</label>
                            <input
                                type="text"
                                id="religion"
                                placeholder="Enter religion"
                                value={religion}
                                onChange={(e) => setReligion(e.target.value)}
                            />
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="father-name">Father's Name *</label>
                            <input
                                type="text"
                                id="father-name"
                                placeholder="Enter father's name"
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-lg-4">
                            <label htmlFor="father-nid">Father's NID</label>
                            <input
                                type="text"
                                id="father-nid"
                                placeholder="Enter father's NID"
                                value={fatherNID}
                                onChange={(e) => setFatherNID(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* <!-- Row 5 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-4">
                            <label htmlFor="father-mobile">
                              Father's Mobile No *
                            </label>
                            <input
                                type="text"
                                id="father-mobile"
                                placeholder="Enter father's mobile number"
                                value={fatherPhoneNo}
                                onChange={(e) => setFatherPhoneNo(e.target.value)}
                            />
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="mother-name">Mother's Name *</label>
                            <input
                                type="text"
                                id="mother-name"
                                placeholder="Enter mother's name"
                                value={motherName}
                                onChange={(e) => setMotherName(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-lg-4">
                            <label htmlFor="mother-nid">Mother's NID</label>
                            <input
                                type="text"
                                id="mother-nid"
                                placeholder="Enter mother's NID"
                                value={motherNID}
                                onChange={(e) => setMotherNID(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* <!-- Row 6 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-4">
                            <label htmlFor="mother-mobile">
                              Mother's Mobile No *
                            </label>
                            <input
                                type="text"
                                id="mother-mobile"
                                placeholder="Enter mother's mobile number"
                                value={motherPhoneNo}
                                onChange={(e) => setMotherPhoneNo(e.target.value)}
                            />
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="present-address">
                              Present Address *
                            </label>
                            <input
                                type="text"
                                id="present-address"
                                placeholder="Enter present address"
                                value={presentAddress}
                                onChange={(e) => setPresentAddress(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-lg-4">
                            <label htmlFor="permanent-address">
                              Permanent Address *
                            </label>
                            <input
                                type="text"
                                id="permanent-address"
                                placeholder="Enter permanent address"
                                value={permanentAddress}
                                onChange={(e) =>
                                    setPermanentAddress(e.target.value)
                                }
                            />
                          </div>
                        </div>

                        {/* <!-- Row 7 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-4">
                            <label htmlFor="guardian">
                              Guardian (In Absence of F/M)
                            </label>
                            <input
                                type="text"
                                id="guardian"
                                placeholder="Enter guardian's name"
                                value={guardian}
                                onChange={(e) => setGuardian(e.target.value)}
                            />
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="guardian-mobile">
                              Guardian Mobile *
                            </label>
                            <input
                                type="text"
                                id="guardian-mobile"
                                placeholder="Enter guardian's mobile number"
                                value={guardianPhone}
                                onChange={(e) => setGuardianPhone(e.target.value)}
                            />
                          </div>

                          <DatepickerComponent
                              title={"Date of Birth *"}
                              setSelectedDate={setDOB}
                          />
                        </div>

                        {/* <!-- Row 8 --> */}
                        <div className="form-row row">
                          <div className="form-group select-input-box col-lg-4">
                            <label htmlFor="select-to">Student Gender</label>

                            <div className="select-box-dropdown">
                              <Select
                                  options={genderOPtions}
                                  onChange={setStudentGender}
                                  placeholder="Select Gender"
                              />
                            </div>
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="student-email">Student Email</label>
                            <input
                                type="email"
                                id="student-email"
                                placeholder="Enter student email"
                                value={studentEmail}
                                onChange={(e) => setStudentEmail(e.target.value)}
                            />
                          </div>
                          <div className="form-group select-input-box col-lg-4">
                            <label htmlFor="select-to">SMS Status</label>

                            <Select
                                options={smsStatusOPtions}
                                onChange={setSmsStatus}
                                placeholder="Select Status"
                            />
                          </div>
                        </div>

                        {/* <!-- Row 9 --> */}
                        <div className="form-row row">
                          <DatepickerComponent
                              title={" Registration Date *"}
                              setSelectedDate={setRegistrationDate}
                          />

                          <div className="form-group select-input-box col-lg-4">
                            <label htmlFor="select-to">Class Name</label>
                            <Select
                                options={classOptions}
                                onChange={setClassName}
                                placeholder="Select Class"
                            />
                          </div>

                          <div className="form-group select-input-box col-lg-4">
                            <label htmlFor="select-to">Shift Name</label>
                            <Select
                                options={shiftOptions}
                                onChange={setShift}
                                placeholder="Select Shift"
                            />
                          </div>
                        </div>

                        {/* <!-- Row 10 --> */}
                        <div className="form-row row">
                          <div className="form-group col-lg-4">
                            <label htmlFor="section">Section Name</label>
                            <Select
                                options={sectionOptions}
                                onChange={setSection}
                                placeholder="Enter section name"
                            />
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="session">Session Name</label>

                            <Select
                                options={sessionOPtions}
                                onChange={setSession}
                                placeholder="Enter section name"
                            />
                          </div>

                          <div className="form-group col-lg-4">
                            <label htmlFor="group">Group Name</label>

                            <Select
                                options={groupOPtions}
                                onChange={setGroup}
                                placeholder="Enter group name"
                            />
                          </div>
                        </div>
                        {/* <!-- Actions --> */}
                        <div className="form-actions">
                          <button
                              type="button"
                              id="closBtn"
                              className="button close"
                              onClick={() => setIsEditModalOpen(!isEditModalOpen)}
                          >
                            Close
                          </button>
                          <button
                              type="reset"
                              className="button reset"
                              onClick={handleResetForm}
                          >
                            Reset
                          </button>
                          <button type="submit" className="button save"

                          onClick={handleEditSubmit}
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
          )}
          {/* <!-- Add Students - Pop Up Modal Start --> */}








        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default Test;
