import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/table-funtion.css";
import { useFetchClasses } from "../../hook/useClass";
import { useFetchSections } from "../../hook/useSection";
import { useFetchSessions } from "../../hook/useSession";
import { useFetchShifts } from "../../hook/useShift";

const AdmitCardPage = () => {
  const navigate = useNavigate();
  const [studentRoll, setStudentRoll] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedSection, setSelectedSsection] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);

  const { data: classes } = useFetchClasses();
  const { data: sessions } = useFetchSessions();
  const { data: sections } = useFetchSections();
  const { data: shifts } = useFetchShifts();

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

  const isButtonDisabled =
    !selectedClass || !selectedShift || !selectedSection || !selectedSession;

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      roll: studentRoll,
      className: selectedClass.value,
      section: selectedSection.value,
      shift: selectedShift.value,
      session: selectedSession.value,
    }).toString();

    navigate(`/exam-management/generated-admit-card?${query}`);
  };

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card mark-entry-wrap">
              <div className="card-body">
                {/* <!-- Class heading Start --> */}
                <div className="exam-heading">
                  <h3 className="heading">Admit Card</h3>
                </div>
                {/* <!-- Class heading End --> */}

                {/* <!-- Form Start --> */}
                <div className="class-wise-form mb-2">
                  <div className="mark-entry-form">
                    <div className="form-row"></div>
                    <form
                      className="form-wrapper row"
                      style={{ width: "auto" }}
                    >
                      <div className="form-group">
                        <label htmlFor="search-students">
                          Student's Roll *
                        </label>
                        <input
                          type="text"
                          id="search-students"
                          placeholder="Student roll..."
                          value={studentRoll}
                          onChange={(e) => setStudentRoll(e.target.value)}
                        />
                      </div>

                      <div className="form-row col-lg-6">
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
                      </div>
                      <div className="form-row col-lg-6">
                        <div className="form-group select-input-box">
                          <label htmlFor="select-to">Section*</label>

                          <Select
                            options={sectionOptions}
                            value={selectedSection}
                            onChange={setSelectedSsection}
                            placeholder="Select Section"
                          ></Select>
                        </div>
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
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End -->

        <!-- Table Action Button Modal Start -->
        <!-- Confirmation Modal Start --> */}
          <div id="confirmationModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-buttons">
                <button id="confirmYes">Yes</button>
                <button id="confirmNo">No</button>
              </div>
            </div>
          </div>
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
        <!-- Table Action Button Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default AdmitCardPage;
