import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import "../../assets/css/all-modal.css";
import DatepickerComponent from "../../components/DatepickerComponent ";
import Shimmer from "../../components/Shimmer";
import { useFetchClasses } from "../../hook/useClass";
import { useFetchGroups } from "../../hook/useGroup";
import { useFetchSections } from "../../hook/useSection";
import { useFetchSessions } from "../../hook/useSession";
import { useFetchShifts } from "../../hook/useShift";
import { useFetchStudentByID, useUpdateStudent } from "../../hook/useStudentInfo";

const EditStudentProfilePages = () => {
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
  const [smsStatus, setSmsStatus] = useState(null);
  const [registrationDate, setRegistrationDate] = useState("");
  const [className, setClassName] = useState(null);
  const [shift, setShift] = useState(null);
  const [section, setSection] = useState(null);
  const [session, setSession] = useState(null);
  const [group, setGroup] = useState(null);
  const [warn, setWarn] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const formRef = useRef(null);
  const { id } = useParams();
  const { data: students, isPending, isError, error } = useFetchStudentByID(id);
    const { mutate: updateStudent } = useUpdateStudent()

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

  // selector option
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

  useEffect(() => {
    setAdmissionNumber(students?.data?.admissionNumber || "");
    setAdmissionDate(students?.data?.admissionDate || "");
    setStudentRoll(students?.data?.studentRoll || "");
    setStudentName(students?.data?.name || "");
    setNameBangla(students?.data?.nameInBangla || "");
    setBirthCertificate(students?.data?.birthCertificate || "");
    setReligion(students?.data?.religion || "");
    setFatherName(students?.data?.fatherName || "");
    setFatherNID(students?.data?.fatherNID || "");
    setFatherPhoneNo(students?.data?.fatherPhone || "");
    setMotherName(students?.data?.motherName || "");
    setMotherNID(students?.data?.motherNID || "");
    setMotherPhoneNo(students?.data?.motherPhone || "");
    setPresentAddress(students?.data?.presentAddress || "");
    setPermanentAddress(students?.data?.permanentAddress || "");
    setGuardian(students?.data?.guardianName || "");
    setGuardianPhone(students?.data?.guardianPhone || "");
    setDOB(students?.data?.dateOfBirth || "");
    setStudentGender(students?.data?.studentGender || null);
    setStudentEmail(students?.data?.studentEmail || "");
    setSmsStatus(students?.data?.smsStatus || null);
    setRegistrationDate(students?.data?.registrationDate || "")
    setClassName({
      value: students?.data?.className?.name,
      label: students?.data?.className?.nameLabel
    })
    setShift({
      value: students?.data?.shiftName?.name,
      label: students?.data?.shiftName?.nameLabel,
    });
    setSection({
      value: students?.data?.sectionName?.name,
      label: students?.data?.sectionName?.nameLabel
    });
    setSession({
      value: students?.data?.sessionName?.name,
      label: students?.data?.sessionName?.nameLabel
    });
    setBloodGroup({
      value: students?.data?.bloodGroup,
      label: students?.data?.bloodGroup
    })
    setStudentGender({
      value: students?.data?.studentGender,
      label: students?.data?.studentGender
    })
   
    setSmsStatus({
      value: students?.data?.smsStatus,
      label: students?.data?.smsStatus
    })
   
 
  

    setGroup({
      value: students?.data?.groupName?.name,
      label: students?.data?.groupName?.nameLabel
    })
  }, [students]);

  useEffect(()=>{
    console.log('drop',shift )
  },[shift])

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

  const reset = () => {
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
    setStudentGender(null);
    setStudentEmail("");
    setSmsStatus(null);
    setRegistrationDate("");
    setClassName(null);
    setShift(null);
    setSection(null);
    setSession(null);
    setGroup(null);
    setAvatar(null);
    setPreviewImage(null);
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  const MAX_FILE_SIZE_MB = 1;
  const allowedTypes = ["image/gif", "image/jpeg", "image/png"];
  const handleFileChange = (e)=>{
    e.preventDefault(); 
    console.log("img button clicked");
    const file = e.target.files[0]
    if(!file) return
    if(!allowedTypes.includes(file.type)){
      alert("Only GIF, JPEG, and PNG files are allowed.");
      return;
    }
    const fileSizeMB = file.size / (1024 * 1024);
    if(fileSizeMB > MAX_FILE_SIZE_MB){
      alert("File size should not exceed 2MB.");
      return;
    }

    const previewURL = URL.createObjectURL(file)
    console.log("Selected file:", file);
    console.log("Preview URL:", previewURL);
    setPreviewImage(previewURL)
    setAvatar(file)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("admissionNumber", admissionNumber);
    formData.append("admissionDate", admissionDate);
    formData.append("studentRoll", studentRoll);
    formData.append("studentName", studentName);
    formData.append("nameBangla", nameBangla);
    formData.append("birthCertificate", birthCertificate);
    formData.append("bloodGroup", bloodGroup ? bloodGroup.value : null);
    formData.append("religion", religion);
    formData.append("fatherName", fatherName);
    formData.append("fatherNID", fatherNID);
    formData.append("fatherPhoneNo", fatherPhoneNo);
    formData.append("motherName", motherName);
    formData.append("motherNID", motherNID);
    formData.append("motherPhoneNo", motherPhoneNo);
    formData.append("presentAddress", presentAddress);
    formData.append("permanentAddress", permanentAddress);
    formData.append("guardian", guardian);
    formData.append("guardianPhone", guardianPhone);
    formData.append("dob", dob);
    formData.append(
      "studentGender",
      studentGender ? studentGender.value : null,
    );
    formData.append("studentEmail", studentEmail);
    formData.append("smsStatus", smsStatus ? smsStatus.value : null);
    formData.append("registrationDate", registrationDate);
    formData.append("className", className ? className.value : null);
    formData.append("shift", shift ? shift.value : null);
    formData.append("section", section ? section.value : null);
    formData.append("session", session ? session.value : null);
    formData.append("group", group ? group.value : null);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    for(const [key,value] of formData.entries()){
      console.log(`${key} -> ${value}`);
    }
    // todo: update functionality not working
    updateStudent({studentID:id,formData});
    
  };

  if (isPending) return <Shimmer />;

  if (isError && error instanceof Error) {
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again later!";
    return <p>{errorMsg}</p>;
  }

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          {/* <!-- Table Start --> */}
          {/* <!-- Add Students - Pop Up Modal Start -->  */}
          <section id="studentModal" className=" studentModal ">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Update Student Information</h3>
                  <form ref={formRef} onSubmit={handleEditSubmit}>
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
                          onChange={(e) => setBirthCertificate(e.target.value)}
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
                          value={bloodGroup}
                          placeholder="Select Blood Group"
                        />
                      </div>

                      <div className="form-group col-lg-8">
                        <label htmlFor="photo">Photo</label>
                        <div className="upload-profile">
                          <div className="item">
                            <div className="img-box">
                              {previewImage ? (
                                <img src={previewImage} alt="preview" width={76} height={68}  style={{
                                  borderRadius: "6px",
                                  objectFit: "fit",
                                }}/>
                              ) : (<svg
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
                              </svg>)}
                            </div>

                            <div className="profile-wrapper">
                              <label className="custom-file-input-wrapper m-0">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  aria-label="Upload Photo"
                                  name="avatar"
                                  onChange={handleFileChange}
                                  accept="image/png,image/jpg, image/jpeg ,'image/gif'"
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
                          onChange={(e) => setPermanentAddress(e.target.value)}
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
                        selectedDate={dob}
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
                            value={studentGender}
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
                          value={smsStatus}
                          placeholder="Select Status"
                        />
                      </div>
                    </div>

                    {/* <!-- Row 9 --> */}
                    <div className="form-row row">
                      <DatepickerComponent
                        title={" Registration Date *"}
                        selectedDate={registrationDate}
                        setSelectedDate={setRegistrationDate}
                      />

                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Class Name</label>
                        <Select
                          options={classOptions}
                          onChange={setClassName}
                          value={className}
                          placeholder="Select Class"
                        />
                      </div>

                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Shift Name</label>
                        <Select
                          options={shiftOptions}
                          onChange={setShift}
                          value={shift}
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
                          value={section}
                          placeholder="Enter section name"
                        />
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="session">Session Name</label>

                        <Select
                          options={sessionOPtions}
                          onChange={setSession}
                          value={session}
                          placeholder="Enter section name"
                        />
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="group">Group Name</label>

                        <Select
                          options={groupOPtions}
                          onChange={setGroup}
                          value={group}
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
                      >
                        Close
                      </button>
                      <button
                        type="reset"
                        className="button reset"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <button type="submit" className="button save">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Add Students - Pop Up Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};
export default EditStudentProfilePages;
