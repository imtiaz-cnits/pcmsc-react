import { useState } from "react";

import AddModal from "../../components/AddModal";
import {
  useAddGroup,
  useDeleteGroup,
  useFetchGroups,
  useUpdateGroup,
} from "../../hook/useGroup";
import Shimmer from "../../components/Shimmer";
import ActionButtons from "../../components/ActionButtons";
import EditModal from "../../components/EditModal";

const GroupPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [group, setGroup] = useState("");
  const [groupStatus, setGroupStatus] = useState("");
  const [editId, setEditId] = useState("");

  const [warn, setWarn] = useState("");
  const { mutate: addGroup } = useAddGroup();
  const { mutate: updateGroup } = useUpdateGroup();
  const { mutate: deleteGroup } = useDeleteGroup();
  const { data: groups, isPening, isError, error } = useFetchGroups();

  if (isError) {
    console.log("GroupPage error : ", error);
    if (error instanceof Error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please! try again later!";

      return <p>{errorMsg}</p>;
    }
  }

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
                  <h3 className="heading">Group List</h3>
                  <button
                    className="create-cls-btn"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    Add Group
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
                        <th>Group Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isPening ? (
                        <Shimmer count={5} />
                      ) : (
                        groups?.data?.length > 0 &&
                        groups?.data?.map((item, index) => (
                          <tr key={item?._id}>
                            <td>{index + 1}</td>
                            <td style={{ textAlign: "center" }}>
                              {item?.nameLabel}
                            </td>
                            <td>{item?.label}</td>
                            <td>
                              <ActionButtons
                                item={item}
                                group={group}
                                setGroup={setGroup}
                                status={groupStatus}
                                setStatus={setGroupStatus}
                                isDeleteModalOpen={isDeleteModalOpen}
                                setIsDeleteModalOpen={setIsDeleteModalOpen}
                                deleteAcademic={deleteGroup}
                                setWarn={setWarn}
                                isEditModalOpen={isEditModalOpen}
                                setIsEditModalOpen={setIsEditModalOpen}
                                setEditId={setEditId}
                              />
                            </td>
                          </tr>
                        ))
                      )}
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

          {/* <!-- Table Action Button Modal Start --> */}

          {/* <!-- Edit Modal Start --> */}
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
        <!-- Quick View Modal Start -->
        <!-- <div id="quickViewModal" className="modal">
          <div className="modal-content">
            <p>Quick View</p>
            <div className="modal-buttons">
              <button id="quickClose">X</button>
            </div>
          </div>
        </div> --> 
        <!-- Quick View Modal End -->   */}
          {/*  <!-- Table Action Button Modal Start --> 

        <!-- Group Pop Up Modal Start --> */}

          <AddModal
            title={"Group"}
            stateValue={group}
            setState={setGroup}
            status={groupStatus}
            setStatus={setGroupStatus}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            addAcademic={addGroup}
            warn={warn}
            setWarn={setWarn}
          />

          {/* <!-- Group Pop Up Modal Start --> */}

          {/* <!-- Edit Modal Start --> */}
          <EditModal
            title={"Group"}
            stateValue={group}
            setState={setGroup}
            status={groupStatus}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            updateAcademic={updateGroup}
            editId={editId}
            setEditId={setEditId}
            warn={warn}
            setWarn={setWarn}
          />

          {/* <!-- Edit Modal End -->*/}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default GroupPage;
