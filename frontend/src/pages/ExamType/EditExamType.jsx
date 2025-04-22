const EditExamType = ({
  examTypeName,
  setExamTypeName,
  examTypeStatus,
  setExamTypeStatus,
  isEditModalOpen,
  handleEditModalClose,
  handleEditSubmit,
}) => {
  return (
    <>
      {isEditModalOpen && (
        <div className="exam-type">
          <section id="exmModal" className="modal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Update Exam Type</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="search-students">
                          Exam Type Name *
                        </label>
                        <input
                          type="text"
                          id="search-students"
                          placeholder="Exam Type Name"
                          value={examTypeName}
                          onChange={(e) => setExamTypeName(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <!-- Row 2 --> */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="search-students">Exam Status *</label>
                        <input
                          type="text"
                          id="search-students"
                          placeholder="Exam Status"
                          value={examTypeStatus}
                          onChange={(e) => setExamTypeStatus(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="exmClose"
                        className="button close closeBtn"
                        onClick={handleEditModalClose}
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
export default EditExamType;
