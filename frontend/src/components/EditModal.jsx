import { useState } from "react";

const EditModal = ({
  title,
  isEditModalOpen,
  setIsEditModalOpen,
  stateValue,
  setState,
  warn,
  setWarn,
  updateAcademic,
  editId,
  setEditId,
}) => {
  const [status, setStatus] = useState("");

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!stateValue) {
      setWarn(`${title} name is required and cannot be empty`);
      return;
    }

    const label = status?.charAt(0).toUpperCase() + status.slice(1);

    const payload = {
      name: stateValue,
      label: label || "Active",
      status: status || "active",
    };

    updateAcademic({ editId, payload });
    setWarn("");
    setState("");
    setStatus("");
    setEditId("");
    console.log("payload : ", payload);
  };

  return (
    <>
      {/*  <!-- Table Action Button Modal Start --> 

       {/* <!-- Edit Modal Start --> */}
      <div className="shift-modal">
        {isEditModalOpen && (
          <section id="createClassModal" className="modal migrateModal show">
            <div className="modal-content">
              <div id="popup-modal">
                <div className="form-container">
                  <h3>Update {title}</h3>
                  <form>
                    {/* <!-- Row 1 --> */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="search-students">{title} Name *</label>
                        <input
                          type="text"
                          id="search-students"
                          value={stateValue}
                          onChange={(e) => setState(e.target.value)}
                          placeholder={`${title} Name`}
                        />

                        {warn && <p style={{ color: "lightcoral" }}>{warn}</p>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="search-students">Status Name *</label>
                        <select
                          id="search-students"
                          placeholder="Class"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Status
                          </option>

                          {statusOptions?.map((option, index) => (
                            <option key={index} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* <!-- Actions --> */}
                    <div className="form-actions">
                      <button
                        type="button"
                        id="classBtn"
                        className="button close closeBtn"
                        onClick={() => setIsEditModalOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="button save"
                        onClick={handleSubmit}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* <!-- Edit Modal End -->*/}
    </>
  );
};
export default EditModal;
