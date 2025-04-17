import { useRef, useState } from "react";
import Select from "react-select";
import "../../assets/css/all-modal.css";
import DatepickerComponent from "../../components/DatepickerComponent ";
import Shimmer from "../../components/Shimmer";
import { useAddClass, useFetchClasses } from "../../hook/useClass";
import { useAddGroup, useFetchGroups } from "../../hook/useGroup";
import { useAddSections, useFetchSections } from "../../hook/useSection";
import { useAddSession, useFetchSessions } from "../../hook/useSession";
import { useAddShifts, useFetchShifts } from "../../hook/useShift";
import { useAddSutdent } from "../../hook/useStudentInfo";

import { useEffect } from "react";

const AddNewStudentPages = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const [newClassName, setNewClassName] = useState("");
  const [newShift, sestNewShift] = useState("");
  const [newSection, sestNewSection] = useState("");
  const [newSession, sestNewSession] = useState("");
  const [newGroup, sestNewGroup] = useState("");

  const [classStatus, setClassStatus] = useState("");
  const [shiftStatus, setShiftStatus] = useState("");
  const [sectionStatus, setSectionStatus] = useState("");
  const [sessionStatus, setSessionStatus] = useState("");
  const [groupStatus, setGroupStatus] = useState("");

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
  const [className, setClassName] = useState("");
  const [shift, setShift] = useState(null);
  const [section, setSection] = useState(null);
  const [session, setSession] = useState(null);
  const [group, setGroup] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const formRef = useRef(null);

  const { mutate: addStudent } = useAddSutdent();
  const { mutate: addClass } = useAddClass();
  const { mutate: addShift } = useAddShifts();
  const { mutate: addSection } = useAddSections();
  const { mutate: addSession } = useAddSession();
  const { mutate: addGroup } = useAddGroup();

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

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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

  const classNameOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  const shiftStatusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const sectionStatusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  const sessionStatusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  const groupStatusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  useEffect(() => {
    console.log("session api : ", sessions);
    console.log("session value : ", session);
  }, [session, sessions]);

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

  const MAX_FILE_SIZE_MB = 2; // Limit to 2MB
  const allowedTypes = ["image/gif", "image/jpeg", "image/png"];
  const handleFileChange = (e) => {
    e.preventDefault();
    console.log("img button clicked");

    const file = e.target.files[0];

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert("Only GIF, JPEG, and PNG files are allowed.");
      return;
    }
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      alert("File size should not exceed 2MB.");
      return;
    }

    const previewURL = URL.createObjectURL(file);
    console.log("Selected file:", file);
    console.log("Preview URL:", previewURL);
    setImgFile(file);
    setPreview(previewURL);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "admissionNumber":
        if (!value) error = "Admission number is required.";
        break;

      case "studentRoll":
        if (!value) error = "Student's Roll is required.";
        break;

      case "sutdentName":
        if (!value) error = "Student name is required.";
        break;

      case "sutdentNameInBangla":
        if (!value) error = "Student name is required.";
        break;

      case "birthCertificate":
        if (!value) error = "Birth Certificate is required.";
        break;

      case "bloodGroup":
        if (!value) error = "Blood group information is mandatory.";
        break;

      case "religion":
        if (!value) error = "Religion is required.";
        break;

      case "fatherName":
        if (!value) error = "Father name is required.";
        break;

      case "fatherNID": {
        const nidRegExp = /^(?:\d{10}|\d{13}|\d{17})$/;

        if (!value) {
          error = "Father's NID is required.";
        } else if (!nidRegExp.test(value)) {
          error = "Invalid NID. Must be 10, 13, or 17 digits.";
        }
        break;
      }

      case "fatherPhoneNo": {
        const phoneNoRegExp = /^(?:\+88|88)?01[3-9]\d{8}$/;

        if (!value) {
          error = "Father's Mobile No is required.";
        } else if (!phoneNoRegExp.test(value)) {
          error = "Invalid Bangladeshi phone number.";
        }
        break;
      }

      case "motherName":
        if (!value) error = "Mother name is required.";
        break;

      case "motherNID": {
        const nidRegExp = /^(?:\d{10}|\d{13}|\d{17})$/;

        if (!value) {
          error = "NID is required.";
        } else if (!nidRegExp.test(value)) {
          error = "Invalid NID";
        }
        break;
      }

      case "motherPhoneNo":
        if (!value) error = "Mobile No is required.";
        break;

      default:
        break;
    }
    setWarn((prev) => ({ ...prev, [name]: error }));
  };

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
    setImgFile(null);
    setPreview(null);
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!admissionNumber) {
      return;
    }

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

    if (imgFile) {
      formData.append("avatar", imgFile);
    }

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key} -> ${value}`);
    // }

    addStudent(formData);
  };

  const handleAddClass = () => {
    if (!newClassName) {
      setWarn("Please fill out all fields.");
      return;
    }

    const label = classStatus?.charAt(0).toUpperCase() + classStatus.slice(1);
    console.log("status : ", classStatus);
    console.log("class name ", newClassName);
    const payload = {
      name: newClassName,
      label: label || "Active",
      status: classStatus || "active",
    };

    addClass(payload);
    setWarn("");
    setNewClassName("");
    setClassStatus("");
    setIsAddModalOpen(false);
  };

  const handleAddShift = (e) => {
    e.preventDefault();

    if (!newShift) {
      setWarn("Shift name is required and cannot be empty");
      return;
    }

    const label = shiftStatus?.charAt(0).toUpperCase() + shiftStatus.slice(1);
    console.log("status : ", shiftStatus);
    console.log("shift name ", newShift);
    const payload = {
      name: newShift,
      status: shiftStatus || "active",
      label: label || "Active",
    };

    console.log("payload", payload);
    addShift(payload);
    setWarn("");
    sestNewShift("");
    setShiftStatus("");
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    if (!newSection) {
      setWarn("section is required and cannot be empty");
      return;
    }

    const label =
      sectionStatus?.charAt(0).toUpperCase() + sectionStatus.slice(1);

    const payload = {
      name: newSection,
      status: sectionStatus || "active",
      label: label || "Active",
    };

    console.log("before payload : ", payload);

    console.log("payload", payload);
    addSection(payload);
    setWarn("");
    sestNewSection("");
    setSectionStatus("");
  };

  const handleAddSession = (e) => {
    e.preventDefault();

    if (!newSession) {
      setWarn("Session name is required and cannot be empty");
      return;
    }

    const label =
      sessionStatus?.charAt(0).toUpperCase() + sessionStatus.slice(1);
    console.log("session status : ", sessionStatus);
    const payload = {
      name: newSession,
      label: label || "Active",
      status: sessionStatus || "active",
    };
    console.log("payload", payload);
    addSession(payload);
    setWarn("");
    sestNewSession("");
    setSessionStatus("");
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroup) {
      setWarn("Group name is required and cannot be empty");
      return;
    }
    const label = groupStatus?.charAt(0).toUpperCase() + groupStatus.slice(1);
    console.log("group status : ", groupStatus);
    const payload = {
      name: newGroup,
      label: label || "Active",
      status: groupStatus || "active",
    };
    console.log("payload", payload);
    addGroup(payload);
    setWarn("");
    sestNewGroup("");
    setGroupStatus("");
  };

  if (
    isclassPending ||
    isshiftPending ||
    isSectionPending ||
    isSessionPending ||
    isGroupsPending
  )
    return <Shimmer count={10} />;

  if (
    isClassError ||
    isShiftError ||
    isSectionError ||
    isSessionError ||
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
          {/* <!-- Add Students - Pop Up Modal Start -->  */}
          <section id="studentModal" className=" studentModal ">
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
                          onChange={(e) => {
                            setAdmissionNumber(e.target.value);
                            validateField("admissionNumber", e.target.value);
                          }}
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
                          onChange={(e) => {
                            setStudentRoll(e.target.value);
                            validateField("studentRoll", e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="student-name">Student's Name *</label>
                        <input
                          type="text"
                          id="student-name"
                          placeholder="Enter student's name"
                          value={studentName}
                          onChange={(e) => {
                            setStudentName(e.target.value);
                            validateField("sutdentName", e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="name-bangla">Name in Bangla</label>
                        <input
                          type="text"
                          id="name-bangla"
                          placeholder="বাংলায় নাম লিখুন"
                          value={nameBangla}
                          onChange={(e) => {
                            setNameBangla(e.target.value);
                            validateField(
                              "sutdentNameInBangla",
                              e.target.value,
                            );
                          }}
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
                          onChange={(e) => {
                            setBirthCertificate(e.target.value);
                            validateField("birthCertificate", e.target.value);
                          }}
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
                              {preview ? (
                                <img
                                  src={preview}
                                  alt="preview"
                                  width={76}
                                  height={68}
                                  style={{
                                    borderRadius: "6px",
                                    objectFit: "fit",
                                  }}
                                />
                              ) : (
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
                              )}
                            </div>

                            <div className="profile-wrapper">
                              <label className="custom-file-input-wrapper m-0">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  name="avatar"
                                  aria-label="Upload Photo"
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
                          onChange={(e) => {
                            setReligion(e.target.value);
                            validateField("religion", e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="father-name">Father's Name *</label>
                        <input
                          type="text"
                          id="father-name"
                          placeholder="Enter father's name"
                          value={fatherName}
                          onChange={(e) => {
                            setFatherName(e.target.value);
                            validateField("fatherName", e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="father-nid">Father's NID</label>
                        <input
                          type="text"
                          id="father-nid"
                          placeholder="Enter father's NID"
                          value={fatherNID}
                          onChange={(e) => {
                            setFatherNID(e.target.value);
                            validateField("fatherNID", e.target.value);
                          }}
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
                          onChange={(e) => {
                            setFatherPhoneNo(e.target.value);
                            validateField("fatherPhoneNo", e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="mother-name">Mother's Name *</label>
                        <input
                          type="text"
                          id="mother-name"
                          placeholder="Enter mother's name"
                          value={motherName}
                          onChange={(e) => {
                            setMotherName(e.target.value);
                            validateField("motherName", e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="mother-nid">Mother's NID</label>
                        <input
                          type="text"
                          id="mother-nid"
                          placeholder="Enter mother's NID"
                          value={motherNID}
                          onChange={(e) => {
                            setMotherNID(e.target.value);
                            validateField("motherNID", e.target.value);
                          }}
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
                          onChange={(e) => {
                            setMotherPhoneNo(e.target.value);
                            validateField("motherPhoneNo", e.target.value);
                          }}
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
                          onChange={(e) => {
                            setPresentAddress(e.target.value);
                            validateField("presentAddress", e.target.value);
                          }}
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
                          onChange={(e) => {
                            setPermanentAddress(e.target.value);
                            validateField("permanentAddress", e.target.value);
                          }}
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
                          onChange={(e) => {
                            setGuardian(e.target.value);
                            validateField("guardian", e.target.value);
                          }}
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
                          onChange={(e) => {
                            setGuardianPhone(e.target.value);
                            validateField("guardianPhone", e.target.value);
                          }}
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
                            menuPlacement="top"
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
                          onChange={(e) => {
                            setStudentEmail(e.target.value);
                            validateField("studentEmail", e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">SMS Status</label>

                        <Select
                          options={smsStatusOPtions}
                          onChange={setSmsStatus}
                          value={smsStatus}
                          placeholder="Select Status"
                          menuPlacement="top"
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

                      {/* <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Class Name</label>
                        <Select
                          options={classOptions}
                          onChange={setClassName}
                          value={className}
                          placeholder="Select Class"
                          menuPlacement="top"
                        />
                      </div> */}

                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Class Name</label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Select
                            options={classOptions}
                            onChange={setClassName}
                            value={className}
                            placeholder="Select Class"
                            menuPlacement="top"
                          />
                          <button
                            type="button"
                            onClick={() => setIsAddModalOpen(true)}
                            className="btn-add-class"
                            style={{ marginLeft: "10px" }}
                          >
                            Add Class
                          </button>
                        </div>
                      </div>

                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Shift Name</label>
                        <Select
                          options={shiftOptions}
                          onChange={setShift}
                          value={shift}
                          placeholder="Select Shift"
                          menuPlacement="top"
                        />
                        <button
                          type="button"
                          onClick={() => setIsShiftModalOpen(true)}
                          className="btn-add-class"
                          style={{ marginLeft: "10px" }}
                        >
                          Add Shift
                        </button>
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
                          menuPlacement="top"
                        />
                        <button
                          type="button"
                          onClick={() => setIsSectionModalOpen(true)}
                          className="btn-add-class"
                          style={{ marginLeft: "10px" }}
                        >
                          Add Section
                        </button>
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="session">Session Name</label>

                        <Select
                          options={sessionOPtions}
                          onChange={setSession}
                          value={session}
                          placeholder="Enter section name"
                          menuPlacement="top"
                        />
                        <button
                          type="button"
                          onClick={() => setIsSessionModalOpen(true)}
                          className="btn-add-class"
                          style={{ marginLeft: "10px" }}
                        >
                          Add Session
                        </button>
                      </div>

                      <div className="form-group col-lg-4">
                        <label htmlFor="group">Group Name</label>

                        <Select
                          options={groupOPtions}
                          onChange={setGroup}
                          value={group}
                          placeholder="Enter group name"
                          menuPlacement="top"
                        />
                        <button
                          type="button"
                          onClick={() => setIsGroupModalOpen(true)}
                          className="btn-add-class"
                          style={{ marginLeft: "10px" }}
                        >
                          Add Group
                        </button>
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
                        Save
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
      <div className="createClassModal">
        {isAddModalOpen && (
          <section id="createClassModal" className="modal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Add Class</h3>
                  <form>
                    {/* Row 1 */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="class-name">Class Name *</label>
                        <input
                          type="text"
                          id="class-name"
                          placeholder="Class Name"
                          value={newClassName}
                          onChange={(e) => setNewClassName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="class-status">Status *</label>
                        <select
                          id="class-status"
                          value={classStatus}
                          onChange={(e) => setClassStatus(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Status
                          </option>
                          {classNameOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="form-actions">
                      <button
                        type="button"
                        className="button close closeBtn"
                        onClick={() => setIsAddModalOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="button save"
                        onClick={handleAddClass}
                      >
                        save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* // shift modal  */}

      <div className="shift-modal">
        {isShiftModalOpen && (
          <section id="createClassModal" className="modal migrateModal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Add Shift</h3>
                  <form>
                    {/* ✅ Shift Name Input */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="search-students">Shift Name *</label>
                        <input
                          type="text"
                          id="search-students"
                          placeholder="Shift Name"
                          value={newShift}
                          onChange={(e) => sestNewShift(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* ✅ Shift Status Input */}

                    <div className="form-group">
                      <label htmlFor="search-students">Status *</label>
                      <select
                        value={shiftStatus}
                        onChange={(e) => setShiftStatus(e.target.value)}
                      >
                        <option value="" disabled>
                          Select status
                        </option>
                        {shiftStatusOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ✅ Buttons for modal actions */}
                    <div className="form-actions">
                      <button
                        type="button"
                        className="button close closeBtn"
                        onClick={() => setIsShiftModalOpen(false)} // ✅ Close modal on click
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="button save"
                        onClick={handleAddShift}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* <!-- Section Add Pop Up Modal Start -->  */}
      <div className="section-modal">
        {isSectionModalOpen && (
          <section id="createClassModal" className="modal migrateModal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Add Section</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div
                      className="form-row"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div className="form-group">
                        <label htmlFor="search-students">Section Name *</label>
                        <input
                          type="text"
                          id="search-students"
                          placeholder="Section Name"
                          value={newSection}
                          onChange={(e) => sestNewSection(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="search-students">Status *</label>
                        <select
                          value={sectionStatus}
                          onChange={(e) => setSectionStatus(e.target.value)}
                        >
                          <option value="" disabled>
                            Select status
                          </option>
                          {sectionStatusOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="classBtn"
                        className="button close closeBtn"
                        onClick={() =>
                          setIsSectionModalOpen(!isSectionModalOpen)
                        }
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="button save"
                        onClick={handleAddSection}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* <!-- Section Add Pop Up Modal Start --> */}

      {/* <!-- Session Pop Up Modal Start -->  */}

      <div className="session-modal">
        {isSessionModalOpen && (
          <section id="createClassModal" className="modal migrateModal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Create Session</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div
                      className="form-row"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div className="form-group">
                        <label htmlFor="search-students">Session Name *</label>
                        <input
                          type="text"
                          id="search-students"
                          placeholder="Session Name"
                          value={newSession}
                          onChange={(e) => sestNewSession(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="search-students">Status *</label>
                        <select
                          id="search-students"
                          placeholder="Class"
                          value={sessionStatus}
                          onChange={(e) => setSessionStatus(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Status
                          </option>

                          {sessionStatusOptions?.map((option, index) => (
                            <option key={index} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="classBtn"
                        className="button close closeBtn"
                        onClick={() =>
                          setIsSessionModalOpen(!isSessionModalOpen)
                        }
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="button save"
                        onClick={handleAddSession}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* <!-- Session Pop Up Modal Start --> */}

      {/*  <!-- Table Action Button Modal Start --> 

        <!-- Group Pop Up Modal Start --> */}
      <div className="shift-modal">
        {isGroupModalOpen && (
          <section id="createClassModal" className="modal migrateModal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Add Group </h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="search-students"> Group Name *</label>
                        <input
                          type="text"
                          id="search-students"
                          value={newGroup}
                          onChange={(e) => sestNewGroup(e.target.value)}
                          placeholder={`Group Name`}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="search-students">Status Name *</label>
                        <select
                          id="search-students"
                          placeholder="Class"
                          value={groupStatus}
                          onChange={(e) => setGroupStatus(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Status
                          </option>

                          {groupStatusOptions?.map((option, index) => (
                            <option key={index} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="classBtn"
                        className="button close closeBtn"
                        onClick={() => setIsGroupModalOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="button save"
                        onClick={handleAddGroup}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* <!-- Group Pop Up Modal Start --> */}
    </>
  );
};
export default AddNewStudentPages;
