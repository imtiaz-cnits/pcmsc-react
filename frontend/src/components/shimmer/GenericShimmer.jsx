import '../../assets/css/shimmer/generic-shimmer.css';

const GenericShimmer = ({ limit = 5, columns = 4 }) => {
  const createShimmerRows = () => {
    return Array.from({ length: limit }).map((_, rowIndex) => (
      <tr key={rowIndex} className="shimmer-row">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <td key={colIndex}>
            <div className="shimmer-box" />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <table className="shimmer-table">
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, idx) => (
            <th key={idx}><div className="shimmer-box" /></th>
          ))}
        </tr>
      </thead>
      <tbody>{createShimmerRows()}</tbody>
    </table>
  );
};

export default GenericShimmer;
