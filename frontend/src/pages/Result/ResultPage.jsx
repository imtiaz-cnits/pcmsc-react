import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useFetchClasses } from "../../hook/useClass";
import { useFetchExamTypes } from "../../hook/useExamType";
import { useFetchStudentsResults } from "../../hook/useResult";
import { useFetchSections } from "../../hook/useSection";
import { useFetchSessions } from "../../hook/useSession";
import { useFetchShifts } from "../../hook/useShift";

const ResultPage = () => {
  const navigate = useNavigate();
  const [classRoll, setClassRoll] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedSection, setSelectedSsection] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedExamination, setSelectedExamination] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    classRoll: "",
    section: null,
    className: null,
    shift: null,
    session: null,
    examination: null,
  });

  const { data: sections } = useFetchSections();
  const { data: classes } = useFetchClasses();
  const { data: shifts } = useFetchShifts();
  const { data: sessions } = useFetchSessions();
  const { data: examtypes } = useFetchExamTypes();
  const { data: results } = useFetchStudentsResults(searchFilters);

  const classOptions = classes?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const sectionOptions = sections?.data?.map((item) => {
    return { value: item?._id, label: item?.nameLabel };
  });

  const shiftOptions = shifts?.data?.map((item) => {
    return { value: item?._id, label: item?.nameLabel };
  });

  const sessionOPtions = sessions?.data.map((item) => {
    return { value: item._id, label: item.nameLabel };
  });

  const examinationOptions = examtypes?.data.map((item) => {
    return { value: item._id, label: item.examTypeName };
  });

  const handleSearchQuery = (e) => {
    e.preventDefault();

    console.log("button is clicked ");

    setSearchFilters({
      classRoll,
      section: selectedSection ? selectedSection.value : null,
      className: selectedClass ? selectedClass.value : null,
      shift: selectedShift ? selectedShift.value : null,
      session: selectedSession ? selectedSession.value : null,
      examination: selectedExamination ? selectedExamination.value : null,
    });

    const query = new URLSearchParams({
      roll: classRoll,
      section: selectedClass.value,
      className: selectedClass.value,
      shift: selectedShift.value,
      session: selectedSession.value,
      examination: selectedExamination.value,
    }).toString();

    console.log(
      "url search params : ",
      new URLSearchParams({
        roll: classRoll,
        section: selectedClass.value,
        className: selectedClass.value,
        shift: selectedShift.value,
        session: selectedSession.value,
        examination: selectedExamination.value,
      }),
    );
    console.log("query string : ", query);

    navigate(`/ok/mark-sheet?${query}`);
  };

  useEffect(() => {
    console.log("filters value ", searchFilters);
  }, [searchFilters]);

  const isButtonDisabled =
    !selectedClass ||
    !selectedSession ||
    !selectedSection ||
    !selectedShift ||
    !selectedExamination ||
    !classRoll;

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card mark-entry-wrap">
              <div className="card-body" style={{ paddingBottom: "40px" }}>
                {/* <!-- className heading Start --> */}
                <div className="exam-heading text-center d-block">
                  <h3 className="heading d-block">Search Result</h3>
                </div>
                {/* <!-- className heading End -->

              <!-- Form Start --> */}
                <div className="result-sheet-form">
                  <form className="form-wrapper">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="sms-status">Class Roll*</label>
                          <br />
                          <input
                            type="number"
                            placeholder="Enter Roll"
                            value={classRoll}
                            onChange={(e) => setClassRoll(e.target.value)}
                          />
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Class*</label>
                          <Select
                            options={classOptions}
                            value={selectedClass}
                            onChange={setSelectedClass}
                            placeholder="Select Class"
                          ></Select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Session*</label>
                          <Select
                            options={sessionOPtions}
                            value={selectedSession}
                            onChange={setSelectedSession}
                            placeholder="Select Session"
                          ></Select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Section*</label>

                          <Select
                            options={sectionOptions}
                            value={selectedSection}
                            onChange={setSelectedSsection}
                          ></Select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Shift*</label>
                          <Select
                            options={shiftOptions}
                            value={selectedShift}
                            onChange={setSelectedShift}
                          ></Select>
                        </div>
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Examination*</label>

                          <Select
                            options={examinationOptions}
                            value={selectedExamination}
                            onChange={setSelectedExamination}
                            placeholder="Select Examination"
                          ></Select>
                        </div>
                      </div>
                    </div>
                  </form>
                  <button
                    className="search-btn"
                    disabled={isButtonDisabled}
                    onClick={handleSearchQuery}
                  >
                    Search
                  </button>
                </div>
                {/* <!-- Form Start --> */}
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default ResultPage;
