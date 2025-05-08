import "../../assets/css/skeleton/admit-card-skeleton.css";

const AdmitCardLoader = () => {
  return (
    <div className="admit-card admit-container">
      {[...Array(3)].map((_, idx) => (
        <div className="admit-wrapper skeleton-wrapper" key={idx}>
          {/* Header Section */}
          <div className="header">
            <div className="serial">
              <div className="skeleton-text skeleton-serial"></div>
            </div>
            <div className="logo">
              <div className="skeleton-logo"></div>
            </div>
            <div className="info">
              <div className="skeleton-text skeleton-title"></div>
              <div className="skeleton-text skeleton-subtitle"></div>
              <div className="skeleton-text skeleton-badge"></div>
            </div>
            <button className="print-admit">
              <div className="skeleton-button"></div>
            </button>
          </div>

          {/* Info Table Section */}
          <div className="section table-wrapper">
            <div className="info">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                {[...Array(4)].map((_, rowIdx) => (
                  <tr key={rowIdx}>
                    <td>
                      <div className="skeleton-text skeleton-table-label"></div>
                    </td>
                    <td>
                      <div className="skeleton-text skeleton-table-value"></div>
                    </td>
                    <td>
                      <div className="skeleton-text skeleton-table-label"></div>
                    </td>
                    <td>
                      <div className="skeleton-text skeleton-table-value"></div>
                    </td>
                  </tr>
                ))}
              </table>
              <div className="profile">
                <div className="image">
                  <div className="skeleton-image"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="footer">
            <div className="skeleton-text skeleton-footer"></div>
            <div className="skeleton-text skeleton-footer-center"></div>
            <div className="skeleton-text skeleton-footer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AdmitCardLoader;
