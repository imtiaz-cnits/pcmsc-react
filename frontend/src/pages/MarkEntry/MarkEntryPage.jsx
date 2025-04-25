import { useEffect, useState } from "react";
import Select from "react-select";
import { Toaster } from "sonner";
import { useFetchClasses } from "../../hook/useClass";
import { useFetchExamTypes } from "../../hook/useExamType";
import { useFetchEligibleStudents, useMarkEntry } from "../../hook/useMark";
import { useFetchSections } from "../../hook/useSection";
import { useFetchSessions } from "../../hook/useSession";
import { useFetchShifts } from "../../hook/useShift";
import { useFetchSubjects } from "../../hook/useSubject";


const MarkEntryPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedSection, setSelectedSsection] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [marksData, setMarksData] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    className: null,
    session: null,
    section: null,
    shift: null,
    subject: null,
    examName: null,
  });

  const { mutate: markEntry } = useMarkEntry({examName : selectedExam ?  selectedExam?.label : null});
  const { data: classes } = useFetchClasses();
  const { data: sessions } = useFetchSessions();
  const { data: sections } = useFetchSections();
  const { data: shifts } = useFetchShifts();
  const { data: subjects } = useFetchSubjects();
  const { data: exams } = useFetchExamTypes();

  const {
    data: eligibleStudents,
    isPending,
    isError,
    error,
  } = useFetchEligibleStudents(searchFilters);


  useEffect(()=>{
    console.log('exam types : ', selectedExam)
  }, [selectedExam])


  const classOptions = classes?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const sessionOPtions = sessions?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const sectionOptions = sections?.data?.map((item) => {
    return { value: item?._id, label: item?.nameLabel };
  });

  const shiftOptions = shifts?.data?.map((item) => {
    return { value: item?._id, label: item?.nameLabel };
  });

  const subjectOptions = subjects?.data?.map((item) => {
    return { value: item?._id, label: item?.subjectName };
  });

  const examsOptions = exams?.data?.map((item) => {
    return { value: item?._id, label: item?.examTypeName };
  });

  const isButtonDisabled =
    !selectedClass ||
    !selectedShift ||
    !selectedSection ||
    !selectedSession ||
    !selectedSubject ||
    !selectedExam;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("handle search button is clicked ");
    setSearchFilters({
      className: selectedClass ? selectedClass.value : null,
      session: selectedSession ? selectedSession.value : null,
      section: selectedSection ? selectedSection.value : null,
      shift: selectedShift ? selectedShift.value : null,
      subject: selectedSubject ? selectedSubject.value : null,
      examName: selectedExam ? selectedExam.value : null,
    });
  };

  const handleMarkChange = (index, field, value) => {
    const updated = [...marksData];
    updated[index][field] = value;
    setMarksData(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const payload = marksData.map((entry) => {
      const mcq = Number(entry.mcqMark) || 0; 
      const written = Number(entry.writtenMark) || 0;
      const CA = Number(entry.caMark) || 0; 
      const CT = Number(entry.ctMark) || 0;

      const total = mcq + written + CA + CT;

      return {
        student:entry.student,
        studentID: entry.studentId,
        studentName: entry.studentName,
        studentRoll: entry.studentRoll,
        className: selectedClass ? selectedClass.value : null,
        session: selectedSession ? selectedSession.value : null,
        section: selectedSection ? selectedSection.value : null,
        shift: selectedShift ? selectedShift.value : null,
        subject: selectedSubject ? selectedSubject.value : null,
        examType: selectedExam ? selectedExam.value : null,
        mcqMark: mcq,
        writtenMark: written,
        caMark: CA,
        ctMark:CT,
        totalMark: total,
      };
    });

    markEntry(payload);

    console.log("payload of backend data : ", payload);
  };

  useEffect(() => {
    console.log("now value : ", eligibleStudents?.data);
    if (eligibleStudents?.data?.length > 0) {
      const initialized = eligibleStudents?.data?.map((stu) => ({
        student: stu?._id,
        studentId: stu?.studentID,
        studentName: stu?.name,
        studentRoll: stu?.studentRoll,
        mcqMark: "",
        writtenMark: "",
        caMark: "",
        ctMark: "",
      }));
      setMarksData(initialized);
    }
  }, [eligibleStudents]);

  useEffect(() => {
    console.log("search filter value : ", marksData);
  }, [marksData]);

  return (
    <>
          <Toaster position="bottom-right" richColors />
    
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card mark-entry-wrap">
              <div className="card-body">
                {/* <!-- Class heading Start --> */}
                <div className="exam-heading">
                  <h3 className="heading">Mark Entry</h3>
                </div>

                {/* <!-- Class heading End --> */}

                {/* <!-- Form Start --> */}
                <div className="class-wise-form">
                  <div className="mark-entry-form">
                    <form className="form-wrapper">
                      <div className="form-row">
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Class*</label>

                          <Select
                            name=""
                            id=""
                            options={classOptions}
                            value={selectedClass}
                            onChange={setSelectedClass}
                            placeholder="Select Class"
                          ></Select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Session*</label>

                          <Select
                            name=""
                            options={sessionOPtions}
                            onChange={setSelectedSession}
                            value={selectedSession}
                          ></Select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Section*</label>

                          <Select
                            options={sectionOptions}
                            value={selectedSection}
                            onChange={setSelectedSsection}
                            placeholder="Select Section"
                          ></Select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Shift*</label>
                          <Select
                            name=""
                            id=""
                            options={shiftOptions}
                            value={selectedShift}
                            onChange={setSelectedShift}
                            placeholder="Select Shift"
                          ></Select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Subject*</label>

                          <Select
                            name=""
                            id=""
                            options={subjectOptions}
                            value={selectedSubject}
                            onChange={setSelectedSubject}
                            placeholder="Select Subject"
                          ></Select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Exam Name*</label>
                          <Select
                            name=""
                            id=""
                            options={examsOptions}
                            value={selectedExam}
                            onChange={setSelectedExam}
                            placeholder="Select Name"
                          ></Select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <button
                    className="search-btn"
                    disabled={isButtonDisabled}
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
                {/* <!-- Form Start --> */}

                {/* <!-- Table --> */}
                <div className="table-wrapper grade-table-wrapper">
                  <table className="table table-bordered mark-entry-table">
                    <thead>
                      <tr>
                        <th>Sl No:</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Roll</th>
                        <th>MCQ Mark</th>
                        <th>Written Mark</th>
                        <th>CA Mark</th>
                        <th>CT Mark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isPending ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center" }}>
                            Choose Class, Session, Section & Shift to
                            proceed.....
                          </td>
                        </tr>
                      ) : isError ? (
                        <tr>
                          <td colSpan="10">
                            <div className="error-msg">
                              {error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong. Please try again!"}
                            </div>
                          </td>
                        </tr>
                      ) : eligibleStudents?.totalEntries <= 0 ? (
                        <tr>
                          <td colSpan={10} style={{ textAlign: "center" }}>
                            No Entries Found !
                          </td>
                        </tr>
                      ) : (
                        marksData.map((item, idx) => (
                          <tr key={idx}>
                            <td>{String(idx + 1).padStart(2, "0")}</td>
                            <td>{item?.studentId}</td>
                            <td>{item?.studentName}</td>
                            <td>{item?.studentRoll}</td>

                            <td>
                              <input
                                type="number"
                                value={item.mcq}
                                onChange={(e) =>
                                  handleMarkChange(
                                    idx,
                                    "mcqMark",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                value={item.writtenMark}
                                onChange={(e) =>
                                  handleMarkChange(
                                    idx,
                                    "writtenMark",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={item.oralMark}
                                onChange={(e) =>
                                  handleMarkChange(
                                    idx,
                                    "caMark",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                value={item.oralMark}
                                onChange={(e) =>
                                  handleMarkChange(
                                    idx,
                                    "ctMark",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {isPending || (
                  <div className="button-wrap">
                    <button className="mark-btn" onClick={handleSave}>
                      Save Mark
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End --> */}

          {/* <!-- Table Action Button Modal Start --> */}
          {/* <!-- Confirmation Modal Start --> */}
          <div id="confirmationModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-buttons">
                <button id="confirmYes">Yes</button>
                <button id="confirmNo">No</button>
              </div>
            </div>
          </div>
          {/* <!-- Confirmation Modal End --> */}
          {/* <!-- Edit Modal Start --> */}
          <div id="editModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-buttons">
                <button id="editYes">Yes</button>
                <button id="editNo">No</button>
              </div>
            </div>
          </div>
          {/* <!-- Edit Modal End --> */}
          {/* <!-- Table Action Button Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};
export default MarkEntryPage;
