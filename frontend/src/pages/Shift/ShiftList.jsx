import {
  useDeleteShift,
  useFetchPaginatedShifts,
} from "../../hook/useShift.js";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import shift from "./Shift.jsx";

const ShiftList = () => {
  //todo : converted limit , skip into useParams value
  const [limit] = useState(2);
  const [skip, setSkip] = useState(0);
  const { mutate: deleteShift } = useDeleteShift();

  const { data, isPending, isError, error } = useFetchPaginatedShifts(
    limit,
    skip,
  );

  const { data: shifts, total } = data || {};

  const handleDelete = (e, shiftId) => {
    e.preventDefault();

    deleteShift(shiftId);
  };

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
                        onClick={(e) => handleDelete(e, item?._id)}
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

      <div className="d-flex justify-content-between align-items-center">
        <div className="entries-page">
          <label htmlFor="entries" className="mr-2">
            Entries:
          </label>
          <div className="select-container dropdown-button">
            <select
                id="entries"
                className="form-control"
                style={{ width: "auto" }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="dropdown-icon">&#9662;</span>
            {/* <!-- Dropdown icon --> */}
          </div>
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

          <>
            Page : {Math.floor(skip / limit) + 1} of {Math.ceil(total / limit)}
          </>
          <button
              id="nextBtn"
              className="btn"
              disabled={skip + limit >= total}
              onClick={() => setSkip((prev) => prev + limit)}
          >
            Next
          </button>
        </div>
      </div>


      {/* <!-- Table End --> */}
    </>
  );
};
export default ShiftList;
