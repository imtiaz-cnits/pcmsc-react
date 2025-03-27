import "../assets/css/shimmer.css";

const Shimmer = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <tr key={index} className="shimmer-row">
          <td>
            <div className="shimmer-box"></div>
          </td>
          <td>
            <div className="shimmer-box"></div>
          </td>
          <td>
            <div className="shimmer-box"></div>
          </td>
          <td>
            <div className="shimmer-box action"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default Shimmer;
