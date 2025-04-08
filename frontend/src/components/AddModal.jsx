const AddModal = ({ title, isModalOpen, setIsModalOpen }) => {
  return (
    <>
      {/*  <!-- Table Action Button Modal Start --> 

        <!-- Group Pop Up Modal Start --> */}
      <div className="shift-modal">
        {isModalOpen && (
          <section id="createClassModal" className="modal migrateModal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Add {title}</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="search-students">{title} Name *</label>
                        <input
                          type="text"
                          id="search-students"
                          placeholder="Group Name"
                        />
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="classBtn"
                        className="button close closeBtn"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Close
                      </button>
                      <button type="button" className="button save">
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
export default AddModal;
