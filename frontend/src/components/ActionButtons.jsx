// Edit Delete Button - ActionButtons

import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const ActionButtons = ({
  isEditModalOpen,
  setIsEditModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  item,
  deleteAcademic,
  setWarn,
  stateValue,
  setStateValue,
  status,
  setStatus,
  setEditId,
  handleEdit,
}) => {
  const [itemToDelete, setItemToDelete] = useState(null);

  // const handleEdit = () => {
  //   console.log("handleEdit", item);
  //   setStateValue(item?.name);
  //   setStatus(item?.status);
  //   setEditId(item?._id);
  //   setIsEditModalOpen(true);
  // };

  const handleDeleteClick = (e, item) => {
    e.preventDefault();
    setItemToDelete(item?._id);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    console.log("item to delete : ", itemToDelete);
    deleteAcademic(item?._id);
    setIsDeleteModalOpen(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setWarn("");
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Action State */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "8px 12px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid #e0e0e0",
          }}
        >
          {/* Edit Button */}
          <button
            onClick={(e) => handleEdit(e, item)}
            style={{
              background: "none",
              border: "none",
              color: "#0a84ff",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              padding: "4px 8px",
              borderRadius: "8px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#eaf4ff";
              e.currentTarget.style.color = "#006ae6";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "#0a84ff";
            }}
          >
            <FaRegEdit style={{ fontSize: "18px" }} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "8px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#fff0f0")}
            onMouseOut={(e) => (e.currentTarget.style.background = "none")}
          >
            <FaRegTrashAlt
              style={{ color: "lightcoral", fontSize: "18px" }}
              onClick={(e) => handleDeleteClick(e, item)}
            />
          </button>
        </div>

        {/* Quick View Button */}
        <button
          title="Quick View"
          style={{
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            padding: "6px 10px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            color: "#333",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#f1f1f1";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#f9f9f9";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <i className="fa-regular fa-eye" />
        </button>
      </div>

      {/* <!-- Table Action Button Modal Start --> */}
      {/* <!-- Confirmation Modal Start --> */}
      {isDeleteModalOpen && (
        <div
          id="confirmationModal"
          className="modal"
          style={{ display: "flex" }}
        >
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-buttons">
              <button id="confirmYes" onClick={handleDelete}>
                Yes
              </button>
              <button id="confirmNo" onClick={handleClose}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <!-- Confirmation Modal End --> */}
    </>
  );
};
export default ActionButtons;
