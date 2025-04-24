import Select from "react-select";
import DatepickerComponent from "../../components/DatepickerComponent ";

const EditExamAssignToClassPage = ({
  isEditModalOpen,
  setIsEditModalOpen,
  sessionOPtions,

  setSession,
  session,
  examOptions,
  setSemesterName,
  semesterName,
  classOptions,
  className,
  setClassName,
  examDate,
  setExamDate,
  resultDateTime,
  setResultDateTime,
  handleEditSubmit,
}) => {
  return (
    <>
      {isEditModalOpen && (
        <div className="exam-assign">
          <section id="exmModal" className="modal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Update Exam</h3>
                  <form onSubmit={handleEditSubmit}>
                    {/* <!-- Row 1 --> */}
                    <div className="form-row row">
                      <div className="form-group select-input-box col-12">
                        <label htmlFor="select-to">Session Name*</label>

                        <Select
                          name=""
                          id=""
                          options={sessionOPtions}
                          onChange={setSession}
                          value={session}
                          placeholder="Select Name"
                        ></Select>
                      </div>
                      <div className="form-group select-input-box col-12">
                        <label htmlFor="select-to">Exam Name*</label>

                        <Select
                          options={examOptions}
                          onChange={setSemesterName}
                          value={semesterName}
                          placeholder="Select Name"
                        ></Select>
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="shift">Class Name*</label>
                        <Select
                          options={classOptions}
                          value={className}
                          onChange={setClassName}
                          placeholder="Type Name"
                        ></Select>
                      </div>
                      <div className="form-group col-12">
                        <DatepickerComponent
                          title={"Exam Date *"}
                          selectedDate={examDate}
                          setSelectedDate={setExamDate}
                        />

                        {/* <label htmlFor="vanilla-datepicker">
                Date of Birth *
              </label>
              <div className="input-datepicker-wrapper">
                <input
                  type="text"
                  className="datepicker-input"
                  placeholder="dd/mm/yyyy"
                />
                <i className="fas fa-calendar-alt icon"></i>
              </div> */}
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="dob">Result Date*</label>
                        <input
                          type="datetime-local"
                          id="dob"
                          value={resultDateTime}
                          onChange={(e) => setResultDateTime(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="exmClose"
                        className="button close closeBtn"
                        onClick={() => setIsEditModalOpen(false)}
                      >
                        Close
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
        </div>
      )}
    </>
  );
};

export default EditExamAssignToClassPage;
