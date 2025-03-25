import { useEffect, useState } from "react";

//todo modal component module structure
const AcademicModal = ({
  titleName,
  setTitle,
  statusValue,
  setStatus,
  StatusOptions,
  handleSubmit,
  title,
  titleValue,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warn, setWarn] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // ✅ Disable scrolling when modal is open
    } else {
      document.body.style.overflow = ""; // ✅ Enable scrolling when modal is closed
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="shift-modal">
        {isModalOpen && (
          <section id="createClassModal" className="modal migrateModal">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  {/*title hoga */}
                  {/*<h3>Add Shift</h3>*/}
                  <h3>Add{title}</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div className="form-row">
                      <div className="form-group">
                        {/*title name */}
                        <label htmlFor="search-students">{title} Name *</label>

                        <input
                          type="text"
                          id="search-students"
                          placeholder="Shift Name"
                          value={titleValue}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>

                    {warn && <p style={{ color: "lightcoral" }}>{warn}</p>}

                    <div className="form-group">
                      <label htmlFor="search-students">Status *</label>
                      <select
                        value={statusValue}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="" disabled>
                          Select status
                        </option>
                        {StatusOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="classBtn"
                        className="button close closeBtn"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {/*close button */}
                        Close
                      </button>
                      <button
                        type="button"
                        className="button save"
                        onClick={handleSubmit}
                      >
                        {/*save button */}
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
    </>
  );
};
export default AcademicModal;
