const ClassList = () => {
  return (
    <div className="table-wrapper">
      <table id="printTable" className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Sl No:</th>
            <th>Student Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Md. Mizan Shekh</td>
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
            <td>Md. Siyam</td>
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
  );
};

export default ClassList;
