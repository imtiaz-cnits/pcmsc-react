import '../../assets/css/shimmer/shimmer-table.css';

const ShimmerTable = ({ row = 5, col = 11 }) => {
 

  return (
    <tbody>
      {Array.from({ length: row }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: col }).map((_, colIndex) => (
            <td key={colIndex}>
              <div className="shimmer-box" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default ShimmerTable;
