import Select from "react-select";

const EditSubject = ({
  isEditModalOpen,
  classOptions,
  setClassName,
  className,
  subjectCode,
  setSubjectCode,
  statusOptions,
  selectedStatus,
  setSelectedStatus,
  passMark,
  setPassMark,
  oralMark,
  setOralMark,
  writtenMark,
  setWrittenMark,
  totalMark,
  setTotalMark,
  subjectName,
  setSubjectName,
  handleUpdateModalClose,
  handleEditSubmit,
}) => {
  return (
    <>
      {/* <!-- Subject Edit Pop Up Modal Start --> */}
      {isEditModalOpen && (
        <div className="subject-modal">
          <section id="exmModal" className="modal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Update Subject</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div className="form-row row">
                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Class*</label>

                        <Select
                          options={classOptions}
                          onChange={setClassName}
                          value={className}
                          placeholder="Select Class"
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="shift">Subject Code*</label>
                        <input
                          type="text"
                          placeholder="Select Code"
                          value={subjectCode}
                          onChange={(e) => setSubjectCode(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="shift">Subject Name*</label>
                        <input
                          type="text"
                          placeholder="Select Name"
                          value={subjectName}
                          onChange={(e) => setSubjectName(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <!-- Row 2 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-4">
                        <label htmlFor="shift">Total Mark *</label>
                        <input
                          type="number"
                          placeholder="Select Mark"
                          value={totalMark}
                          onChange={(e) => setTotalMark(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="shift">Writing Mark *</label>
                        <input
                          type="number"
                          placeholder="Select Mark"
                          value={writtenMark}
                          onChange={(e) => setWrittenMark(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="shift">Oral Mark *</label>
                        <input
                          type="number"
                          placeholder="Select Mark"
                          value={oralMark}
                          onChange={(e) => setOralMark(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <!-- Row 3 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-4">
                        <label htmlFor="shift">Pass Mark *</label>
                        <input
                          type="number"
                          placeholder="Select Mark"
                          value={passMark}
                          onChange={(e) => setPassMark(e.target.value)}
                        />
                      </div>
                      <div className="form-group select-input-box col-lg-4">
                        <label htmlFor="select-to">Status*</label>

                        <Select
                          options={statusOptions}
                          value={selectedStatus}
                          onChange={setSelectedStatus}
                        />
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="exmClose"
                        className="button close closeBtn"
                        onClick={handleUpdateModalClose}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="button save"
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
        </div>
      )}
    </>
  );
};
export default EditSubject;
