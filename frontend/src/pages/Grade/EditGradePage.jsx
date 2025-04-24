const EditGradePage = ({
  isEditModalOpen,
  gradeName,
  setGradeName,
  gradePoint,
  setGradePoint,
  markFrom,
  setMarkFrom,
  markUpTo,
  setMarkUpTo,
  totalSubjectMark,
  setTotalSubjectMark,
  handleEditSubmit,
  setIsEditModalOpen,
}) => {
  return (
    <>
      {isEditModalOpen && (
        <div className="grade-modal">
          <section id="exmModal" className="modal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Update Grade</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-6">
                        <label htmlFor="shift">Grade Name *</label>
                        <input
                          type="text"
                          placeholder="Type Name"
                          value={gradeName}
                          onChange={(e) => setGradeName(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-lg-6">
                        <label htmlFor="shift">Grade Point *</label>
                        <input
                          type="text"
                          placeholder="Type Point"
                          value={gradePoint}
                          onChange={(e) => setGradePoint(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <!-- Row 2 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-6">
                        <label htmlFor="shift">Mark Form *</label>
                        <input
                          type="text"
                          placeholder="Type Form mark"
                          value={markFrom}
                          onChange={(e) => setMarkFrom(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-lg-6">
                        <label htmlFor="shift">Mark Up TO*</label>
                        <input
                          type="text"
                          placeholder="Type Up To"
                          value={markUpTo}
                          onChange={(e) => setMarkUpTo(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <!-- Row 3 --> */}
                    <div className="form-row row">
                      <div className="form-group col-lg-6">
                        <label htmlFor="shift">Total Subject Mark *</label>
                        <input
                          type="number"
                          placeholder="Type Mark"
                          value={totalSubjectMark}
                          onChange={(e) => setTotalSubjectMark(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="exmClose"
                        className="button close closeBtn"
                        onClick={(e) => {
                          e.preventDefault();

                          setIsEditModalOpen(false);
                        }}
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

export default EditGradePage;
