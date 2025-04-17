import "../../assets/css/student-table-shimmer.css";

const StudentTableShimmer = ({ count = 5 }) => {
  const columns = [
    "Sl No",
    "Action",
    "Student ID",
    "Student Name",
    "Father Name",
    "Mother Name",
    "Mobile Number",
    "Photo",
    "Class",
    "Group",
    "Roll",
  ];

  return (
    <table className="student-table">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: count }).map((_, rowIdx) => (
          <tr className="shimmer-row" key={rowIdx}>
            {Array.from({ length: columns.length }).map((_, colIdx) => (
              <td key={colIdx}>
                <div className="shimmer-box" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTableShimmer;
