import { useRef, useState } from "react";
import { useAddSutdent, useDeleteStudent, useFetchStudents, useUpdateStudent } from "../../hook/useStudentInfo";
import { useFetchClasses } from "../../hook/useClass";
import { useFetchShifts } from "../../hook/useShift";
import { useFetchSections } from "../../hook/useSection";
import { useFetchSessions } from "../../hook/useSession";
import { useFetchGroups } from "../../hook/useGroup";
import Shimmer from "../../components/Shimmer";
import DatepickerComponent from "../../components/DatepickerComponent ";
import Select from "react-select";

const Ok = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
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
    const { mutate: updateStudent } = useUpdateStudent();
  
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
       <section id="studentModal" className="studentModal">
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
    </>
  );
};

export default Ok;
