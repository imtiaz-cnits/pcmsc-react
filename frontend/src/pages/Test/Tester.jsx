import { useState } from "react";
import { useFetchClasses } from "../../hook/useClass";
import { useFetchSessions } from "../../hook/useSession";
import { useFetchSections } from "../../hook/useSection";
import { useFetchShifts } from "../../hook/useShift";
import { useFetchSubjects } from "../../hook/useSubject";
import { useFetchExamTypes } from "../../hook/useExamType";
import { useFetchEligibleStudents } from "../../hook/useMark";
import Select from "react-select";
import { Toaster } from "sonner";

const Tester = () => {
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
                        <th>Written Mark</th>
                        <th>Oral Mark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>202423</td>
                        <td>MD: Shanto</td>
                        <td>03</td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td>202443</td>
                        <td>MD: siyam</td>
                        <td>06</td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="button-wrap">
                  <button className="mark-btn">Save Mark</button>
                </div>
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
export default Tester;