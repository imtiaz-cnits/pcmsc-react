import "../../assets/css/shimmer/shimmer-table.css"; // You'll create this CSS below

const ShimmerRow = ({ cols = 4 }) => {
  return (
    <tr className="shimmer-row">
      {[...Array(cols)].map((_, index) => (
        <td key={index}>
          <div className="shimmer-box"></div>
        </td>
      ))}
    </tr>
  );
};

const ShimmerTable = ({ rows = 5, cols = 4 }) => {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <ShimmerRow key={index} cols={cols} />
      ))}
    </>
  );
};

export default ShimmerTable;
