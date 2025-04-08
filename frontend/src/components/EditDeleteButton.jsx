// Edit Delete Button - ActionButtons

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const ActionButtons = ({ setIsDeleteModalOpen }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
          padding: "12px",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Action Group */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "10px 14px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            border: "1px solid #e0e0e0",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Edit Button */}
          <button
            onClick={() => console.log("Edit clicked")}
            style={{
              background: "none",
              border: "none",
              color: "#0a84ff",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              padding: "6px 10px",
              borderRadius: "8px",
              transition: "background 0.2s ease, color 0.2s ease",
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
            <FaRegEdit
              style={{
                color: "#rgba(6, 8, 126, 0.06)",
                fontSize: "20px",
              }}
            />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "8px",
              transition: "background 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#fff0f0")}
            onMouseOut={(e) => (e.currentTarget.style.background = "none")}
          >
            <FaRegTrashAlt
              style={{
                color: "lightcoral",
                fontSize: "20px",
              }}
            />
          </button>
        </div>

        {/* Quick View Button */}
        <button
          title="Quick View"
          style={{
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            padding: "8px 12px",
            borderRadius: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            color: "#333",
            transition: "all 0.2s ease-in-out",
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
    </>
  );
};
export default ActionButtons;
