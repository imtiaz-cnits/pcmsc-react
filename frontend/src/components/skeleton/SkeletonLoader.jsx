import "../../assets/css/skeleton/mark-sheet-skeleton.css";

const SkeletonLoader = () => {
  return (
    <div className="marksheet-container marksheet-warermark-bg">
      <div className="marksheet-container-wrap">
        {/* Header Skeleton */}
        <header>
          <div className="info-wrapper">
            <div className="logo">
              <div className="skeleton skeleton-logo"></div>
            </div>
            <div className="board-info">
              <div className="skeleton skeleton-title"></div>
              <div
                className="skeleton skeleton-text"
                style={{ width: "80%" }}
              ></div>
              <div className="code-info">
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "100px" }}
                ></div>
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "100px" }}
                ></div>
              </div>
              <div className="button">
                <div className="skeleton skeleton-button"></div>
              </div>
            </div>
            <div className="skeleton-table">
              <div className="skeleton skeleton-table-header"></div>
              {[...Array(6)].map((_, idx) => (
                <div className="skeleton-table-row" key={idx}>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Result Section Skeleton */}
        <div className="result-section">
          <div
            className="skeleton skeleton-title"
            style={{ width: "40%" }}
          ></div>
          <div className="student-info-table">
            <div className="skeleton-table">
              {[...Array(5)].map((_, idx) => (
                <div className="skeleton-table-row" key={idx}>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell-long"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grade Sheet Skeleton */}
        <div className="grade-sheet">
          <div className="grade-sheet-table">
            <div className="skeleton-table">
              <div className="skeleton skeleton-table-header"></div>
              <div className="skeleton skeleton-table-header"></div>
              {[...Array(5)].map((_, idx) => (
                <div className="skeleton-table-row" key={idx}>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell-long"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                </div>
              ))}
              <div className="skeleton-table-row">
                <div className="skeleton skeleton-table-cell-long"></div>
                <div className="skeleton skeleton-table-cell"></div>
                <div className="skeleton skeleton-table-cell-long"></div>
                <div className="skeleton skeleton-table-cell"></div>
                <div className="skeleton skeleton-table-cell"></div>
                <div className="skeleton skeleton-table-cell"></div>
              </div>
            </div>
          </div>

          {/* Second Table Skeleton */}
          <div className="second-table d-flex align-items-start gap-2">
            <div className="skeleton-table">
              {[...Array(7)].map((_, idx) => (
                <div className="skeleton-table-row" key={idx}>
                  <div className="skeleton skeleton-table-cell-long"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                </div>
              ))}
            </div>
            <div className="skeleton-table">
              <div className="skeleton skeleton-table-header"></div>
              {[...Array(4)].map((_, idx) => (
                <div className="skeleton-table-row" key={idx}>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                  <div className="skeleton skeleton-table-cell"></div>
                </div>
              ))}
              <div className="skeleton-table-row">
                <div className="skeleton skeleton-table-cell-long"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Skeleton */}
        <div className="signature">
          <div className="guardian">
            <div className="skeleton skeleton-signature"></div>
          </div>
          <div className="className-teacher">
            <div className="skeleton skeleton-signature"></div>
          </div>
          <div className="vice-principal">
            <div className="skeleton skeleton-signature"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
