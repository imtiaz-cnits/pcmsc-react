import useAddModal from "../../hook/useAddModal.jsx";
import Select from "react-select";
import { useState } from "react";
import CustomDropdownIndicator from "../../components/CustomDropdownIndicator.jsx";
import axiosPrivate from "../../utils/axiosPrivate.jsx";
import toast, {Toaster} from 'react-hot-toast'
import { useDeleteShift, useFetchPaginatedShifts, useUpdateShift } from "../../hook/useShift.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Shift = () => {
  const [shift, setShift] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [warn, setWarn] = useState("");
   const { mutate: updateShift } = useUpdateShift();
   const [limit] = useState(2);
     const [skip, setSkip] = useState(0);
     const { mutate: deleteShift } = useDeleteShift();
       const { data, isPending, isError, error } = useFetchPaginatedShifts(
         limit,
         skip,
       );

       const { data: shifts, total } = data || {};

  useAddModal("createClassModal", "classModalBtn", "classBtn");

  // add shift modal options
  const shiftStatusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  // add shift 

  const queryClient = useQueryClient();
  const { mutate: addShift } = useMutation({
    mutationFn: async (newShift) => {
      const response = await axiosPrivate.post(
        "/academic-management/add-shift",
        newShift,
      );
      return response.data;
    },

    onSuccess: async (data) => {
      toast.success("Shift successfully added!");

      await queryClient.invalidateQueries({ queryKey: ["shifts"] });

      setShift("");
      setSelectedStatus(null);
    },
    onError: (error) => {
      console.error("Error in add shifts", error);
      console.log("Error Msg in add shifts", error.response?.data?.message);

      if (error.response) {
        toast.error(`${error.response.data.message}`);
      } else if (error.request) {
        toast.error("Network error. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });


  // 📝 handle the form submission
  const handleAddShift = (e) => {
    e.preventDefault();
    if (!shift) {
      setWarn("Please fill in all fields.");
      return;
    }
    const newShift = {
      shift,
      status: selectedStatus?.value,
      label: selectedStatus?.label,
    };
    addShift(newShift);
  };


  if (isPending) {
    return <p>Loading.... </p>;
  }


if(isError) return <span>Errrorr....</span>


//   const handleAddShift = async (e) => {
//     e.preventDefault();

//     // prepare payload
//     const payload = {
//       shift,
//       status: selectedStatus,
//     };

//     console.log("before sending payload :", payload);

//     try {
//       const res = await axiosPrivate.post(
//         "/academic-management/add-shift",
//         payload,
//       );
//       console.log("res data of shift : ", res.data);
//       setShift("");
//       setSelectedStatus(null);
//       // toaster
//     } catch (error) {
//       console.error("Error in adding shift ", error);
//       const errorMsg = error.response?.data?.message;
//       console.log(errorMsg);
//     }
//   };

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card">
              <div className="card-body">
                {/* <!-- Class heading Start --> */}
                <div className="class-heading">
                  <h3 className="heading">Shift List</h3>
                  <button className="create-cls-btn" id="classModalBtn">
                    Add Shift
                  </button>
                </div>
                {/* <!-- Class heading End --> */}

                {/* <!-- Action Buttons --> */}
                <div className="button-wrapper mb-3">
                  {/* <!-- Search and Filter --> */}
                  <div className="input-group class-group">
                    {/* <!-- Entries per page --> */}
                    <div>
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
                    </div>
                    <div className="class-search">
                      <input
                        style={{ width: "20%", margin: "0" }}
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Search Class..."
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Table --> */}
                <div className="table-wrapper">
                  <table
                    id="printTable"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Sl No:</th>
                        <th>Shift Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Day</td>
                        <td>
                          <div id="action_btn">
                            <div id="menu-wrap">
                              <input type="checkbox" className="toggler" />
                              <div className="dots">
                                <div></div>
                              </div>
                              <div className="menu">
                                <div>
                                  <ul>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn editButton"
                                        data-modal="action-editmodal"
                                      >
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn deleteButton"
                                        data-modal="action-deletemodal"
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {/* <!-- <button class="quick-view quickButton">
                            <i class="fa-regular fa-eye"></i>
                          </button> --> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td>Morning</td>
                        <td>
                          <div id="action_btn">
                            <div id="menu-wrap">
                              <input type="checkbox" className="toggler" />
                              <div className="dots">
                                <div></div>
                              </div>
                              <div className="menu">
                                <div>
                                  <ul>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn editButton"
                                        data-modal="action-editmodal"
                                      >
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="link custom-open-modal-btn openModalBtn deleteButton"
                                        data-modal="action-deletemodal"
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {/* <!-- <button class="quick-view quickButton">
                            <i class="fa-regular fa-eye"></i>
                          </button> --> */}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <!-- Pagination and Display Info --> */}
                <div className="my-3">
                  <span id="display-info"></span>
                </div>

                <div id="pagination" className="pagination">
                  <button id="prevBtn" className="btn">
                    Prev
                  </button>
                  <a href="#" className="page-link page-link--1">
                    1
                  </a>
                  <a href="#" className="page-link page-link--2">
                    2
                  </a>
                  <a href="#" className="page-link page-link--3">
                    3
                  </a>
                  <button id="nextBtn" className="btn">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End --> */}

          {/* <!-- Table Action Button Modal Start -->
        <!-- Confirmation Modal Start --> */}
          <div id="confirmationModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-buttons">
                <button id="confirmYes">Yes</button>
                <button id="confirmNo">No</button>
              </div>
            </div>
          </div>
          {/* <!-- Confirmation Modal End -->
        <!-- Edit Modal Start --> */}
          <div id="editModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-buttons">
                <button id="editYes">Yes</button>
                <button id="editNo">No</button>
              </div>
            </div>
          </div>
          {/* <!-- Edit Modal End -->
        <!-- Quick View Modal Start --> */}
          {/* <!-- <div id="quickViewModal" class="modal">
          <div class="modal-content">
            <p>Quick View</p>
            <div class="modal-buttons">
              <button id="quickClose">X</button>
            </div>
          </div>
        </div> --> */}
          {/* <!-- Quick View Modal End -->
        <!-- Table Action Button Modal Start -->

        <!-- Shift Pop Up Modal Start --> */}
          <div className="shift-modal">
            <section id="createClassModal" className="modal migrateModal">
              <div className="modal-content">
                <div id="popup-modal">
                  <div className="form-container">
                    <h3>Add Shift</h3>
                    <form>
                      {/* <!-- Row 1 --> */}
                      <div
                        className="form-row"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <div className="form-group">
                          <label htmlFor="search-students">Shift Name *</label>
                          <input
                            type="text"
                            id="search-students"
                            placeholder="Shift Name"
                            value={shift}
                            onChange={(e) => setShift(e.target.value)}
                          />
                        </div>

                        {warn && <span style={{ color: "lightcoral" }} >{warn}</span>}

                        <div className="form-group">
                          <label htmlFor="search-students">Status *</label>
                          <Select
                            options={shiftStatusOptions}
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                            components={{
                              DropdownIndicator: CustomDropdownIndicator,
                            }}
                            placeholder="Status"
                          />
                        </div>
                      </div>

                      {/* <!-- Actions --> */}
                      <div className="form-actions">
                        <button
                          type="button"
                          id="classBtn"
                          className="button close closeBtn"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="button save"
                          onClick={handleAddShift}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* <!-- Shift Pop Up Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};
export default Shift;