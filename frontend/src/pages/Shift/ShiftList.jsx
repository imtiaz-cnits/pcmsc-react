import { useFetchPaginatedShifts } from "../../hook/useShift.js";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";

const ShiftList = () => {
  //todo : converted limit , skip into useParams value
  const [limit] = useState(2);
  const [skip, setSkip] = useState(0);

  const { data, isPending, isError, error } = useFetchPaginatedShifts(
    limit,
    skip,
  );

  const { data: shifts, total } = data || {};

  if (isPending) {
    return <p>Loading.... </p>;
  }

  if (isError) {
    if (error instanceof Error) {
      console.log("inside shifts list ", error);
      return <p>Error : {error.message}</p>;
    } else {
      return <p>Something went wrong. Please! try again later.</p>;
    }
  }

  return (
    <>
      {/* <!-- Table --> */}
      <div className="table-wrapper">
        <table id="printTable" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Sl No:</th>
              <th>Shift Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shifts?.map((item, index) => {
              console.log(item, index);
              return (
                <tr key={item?._id}>
                  <td>{index + skip + 1}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    {item?.name}
                  </td>
                  <td
                    style={{
                      color:
                        item?.status === "active" ? "lightgreen" : "lightcoral",
                      fontWeight: "normal",
                      texAlign: "center",
                    }}
                  >
                    {item?.status}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <FaRegEdit
                        style={{ color: "lightgreen", fontSize: "25px" }}
                      />
                    </button>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <FaRegTrashAlt
                        style={{ color: "red", fontSize: "25px" }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="my-3">
        <span id="display-info"></span>
      </div>

      <div id="pagination" className="pagination">
        <button
          id="prevBtn"
          className="btn"
          style={{ cursor: "pointer" }}
          disabled={skip < limit}
          onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
        >
          Prev
        </button>

        <span>
          Page : {Math.floor(skip / limit) + 1} of {Math.ceil(total / limit)}
        </span>
        <button
          id="nextBtn"
          className="btn"
          disabled={skip + limit >= total}
          onClick={() => setSkip((prev) => prev + limit)}
        >
          Next
        </button>
      </div>
      {/* <!-- Table End --> */}
    </>
  );
};
export default ShiftList;
