import { useEffect, useState } from "react";
import { useFetchSessions } from "../../hook/useSession";
import { useFetchExamTypes } from "../../hook/useExamType";
import { useFetchClasses } from "../../hook/useClass";
import Select from "react-select";
import DatepickerComponent from "../../components/DatepickerComponent ";
import { useAddExamAssign, useFetchPaginatedAssignedExam } from "../../hook/useExamAssign";
import ShimmerTable from "../../components/shimmer/ShimmerTable";
import { FilePenLine, Trash } from "lucide-react";



const ExamAssignToclassName = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [editClickID, setEditClickID] = useState("");
  const [deletedID, setDeletedID] = useState("");
  const [examDate, setExamDate] = useState("");
  const [resultDateTime,setResultDateTime]=useState('')
  const [session, setSession] = useState(null);
  const [semesterName, setSemesterName] = useState(null);
   const [className, setClassName] = useState(null);
  const {mutate: addExam}=useAddExamAssign()

   const {
      data: sessions,
     
    } = useFetchSessions();

    const {data: exams}=useFetchExamTypes(); 
  const {
    data: classes,
   
  } = useFetchClasses()


  const {data:assignedExam , isPending, isError , error}=useFetchPaginatedAssignedExam({ page, limit, keyword })





  useEffect(()=>{
    console.log('examoptions value : ',examOptions)
  })



    // ✅ Enable-Disable scrolling when modal is open-close
    useEffect(() => {
      document.body.style.overflow = isAddModalOpen ? "hidden" : "";
    }, [isAddModalOpen]);
  
    useEffect(() => {
      document.body.style.overflow = isEditModalOpen ? "hidden" : "";
    }, [isEditModalOpen]);
  

    const entriesOptions = [
      { value: 5, label: "5" },
      { value: 10, label: "10" },
      { value: 25, label: "25" },
      { value: 50, label: "50" },
      { value: 75, label: "75" },
      { value: 100, label: "100" },
    ];

    const sessionOPtions = sessions?.data.map((item) => {
      return { value: item._id, label: item.nameLabel };
    });

    const examOptions = exams?.data?.map((item)=>{
      return {value:item?._id , label:item?.examTypeName}
    })

    const classOptions = classes?.data.map((item) => {
      return { value: item._id, label: item.nameLabel };
    });

   const  handleSubmit=(e)=>{
    e.preventDefault(); 

    if(!examDate || !session || !semesterName || !className || !examDate || !resultDateTime ){
      alert('fill all the required fields')
      return
    }

    const payload ={

      session: session ? session.value : null,
      examName: semesterName ? semesterName.value : null,
      className: className ? className.value : null,
      examDate,
      resultDateTime
    }

    addExam(payload)

    console.log('payload : ',payload)
   }
 

  useEffect(() => {
    // Initialize Vanilla Datepicker
    const vanillaInputs = document.querySelectorAll(".datepicker-input");

    vanillaInputs.forEach((input) => {
      // Initialize each datepicker instance
      const picker = new Datepicker(input, {
        format: "dd/mm/yyyy",
        autohide: true,
      });

      // Open the picker when the input field is clicked
      input.addEventListener("click", function () {
        picker.show();
      });

      // Open the picker when the calendar icon is clicked
      input.nextElementSibling.addEventListener("click", function () {
        picker.show();
      });

      // Insert slashes automatically as the user types
      input.addEventListener("input", function (event) {
        let value = input.value.replace(/\D/g, "").substring(0, 8); // Remove non-numeric characters and limit to 8 digits (DDMMYYYY)

        // Clear the entire input (numeric and non-numeric) if backspace is pressed
        if (event.inputType === "deleteContentBackward") {
          value = ""; // Remove everything when backspace is pressed
          picker.setDate(new Date()); // Set to today's date
          picker.show(); // Show the picker again
        }

        // Insert slashes after every 2 digits
        if (value.length >= 2) {
          value = value.slice(0, 2) + "/" + value.slice(2);
        }
        if (value.length >= 5) {
          value = value.slice(0, 5) + "/" + value.slice(5);
        }

        // Update the input field with the formatted value
        input.value = value;
      });
    });
  }, []);







  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="data-table">
            <div className="card">
              <div className="card-body">
                {/* <!-- className heading Start --> */}
                <div className="exam-heading">
                  <h3 className="heading">Exam Assign To Class List</h3>
                  <button className="create-cls-btn" id="exmModalBtn"
                  
                  onClick={() => setIsAddModalOpen(!isAddModalOpen)}
                  
                  >
                    Add Exam
                  </button>
                </div>
                {/* <!-- className heading End --> */}

                {/* <!-- Action Buttons --> */}
                <div className="button-wrapper mb-3">
                  {/* <!-- Search and Filter --> */}
                  <div className="input-group exam-group">
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
                            onChange={(e) => {
                              e.preventDefault();
                              setLimit(e.target.value);
                              setPage(1);
                            }}
                          >
                              {entriesOptions.map((item, index) => (
                              <option key={index} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                          <span className="dropdown-icon">&#9662;</span>
                          {/* <!-- Dropdown icon --> */}
                        </div>
                      </div>
                    </div>
                    <div className="exam-search">
                      <input
                        style={{ width: "20%", margin: 0 }}
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Search Subject..."
                        onChange={(e) => {
                          e.preventDefault;
                          setKeyword(e.target.value);
                          setPage(1);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Table --> */}
                <div className="table-wrapper grade-table-wrapper">
                  <table
                    id="printTable"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Sl No:</th>
                        <th>Session</th>
                        <th>Exam Name</th>
                        <th>Class Name</th>
                        <th>Exam Date</th>
                        <th>Result Date & Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>



                   {isPending ? (
                        <ShimmerTable rows={limit} cols={10} />
                      ) : isError ? (
                        <tr>
                          <td colSpan="10">
                            <div className="error-msg">
                              {error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong. Please try again!"}
                            </div>
                          </td>
                        </tr>
                      ) : assignedExam?.totalEntries <= 0 ? (
                        <tr>
                          <td colSpan={10} style={{ textAlign: "center" }}>
                            No Subjects found
                          </td>
                        </tr>
                      ) : assignedExam?.data?.length > 0 && assignedExam?.data?.map((item,idx)=>(

                        <tr key={item._id}>
                        <td> {String((page - 1) * limit + idx + 1).padStart(
                                2,
                                "0",
                              )}</td>
                        <td>{item?.session?.nameLabel}</td>
                        <td>{item?.examName?.examTypeName}</td>
                        <td>{item?.className?.nameLabel}</td>
                        <td>{item?.examDate}</td>
                        <td>{new Date(item?.resultDateTime).toLocaleString('en-BD', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).replaceAll('/','-')}</td>


                    
<td>
                              <div id="action_btn">
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <button
                                    href="#"
                                    className="link editButton"
                                    data-modal="action-editmodal"
                                  >
                                    <FilePenLine style={{ color: "#1f4529" }} />
                                  </button>

                                  <button
                                    href="#"
                                    className="link custom-open-modal-btn openModalBtn deleteButton"
                                    data-modal="action-deletemodal"
                                  >
                                    <Trash
                                      style={{ color: "lightcoral" }}
                                    />
                                  </button>
                                </div>

                                {/* <!-- <button class="quick-view quickButton">
                            <i class="fa-regular fa-eye"></i>
                          </button> --> */}
                              </div>
                            </td>


                      </tr>

                      ))}



               


                    </tbody>
                  </table>
                </div>
                {/* <!-- Pagination and Display Info --> */}
                {isPending || (
                  <div className="my-3">
                    <span id="display-info">
                      {assignedExam?.totalEntries
                        ? `Showing ${Math.min(
                            limit * assignedExam?.currentPage,
                            assignedExam?.totalEntries,
                          )} of ${assignedExam?.totalEntries} entries`
                        : ""}
                    </span>
                  </div>
                )}

{assignedExam?.totalPages > 1 && !isPending && (
                  <div id="pagination" className="pagination">
                    {page > 1 && (
                      <button
                        id="prevBtn"
                        className="btn"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                      >
                        Prev
                      </button>
                    )}

                    {`${page} of ${Number(assignedExam?.totalPages)}`}

                    {page < assignedExam?.totalPages && (
                      <button
                        id="nextBtn"
                        className="btn"
                        onClick={() =>
                          setPage((prev) =>
                            Math.min(prev + 1, assignedExam?.totalPages),
                          )
                        }
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End -->

        <!-- Table Action Button Modal Start -->
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
        <!-- Quick View Modal Start -->
        <!-- <div id="quickViewModal" className="modal">
          <div className="modal-content">
            <p>Quick View</p>
            <div className="modal-buttons">
              <button id="quickClose">X</button>
            </div>
          </div>
        </div> -->
        <!-- Quick View Modal End -->
        <!-- Table Action Button Modal Start -->

        <!-- Exam Assign Pop Up Modal Start --> */}
         {isAddModalOpen && (

<div className="exam-assign">
<section id="exmModal" className="modal show">
  <div className="modal-content">
    <div id="popup-modal">
      <div className="form-container">
        <h3>Add Exam</h3>
        <form onSubmit={handleSubmit}>
          {/* <!-- Row 1 --> */}
          <div className="form-row row">
            <div className="form-group select-input-box col-12">
              <label htmlFor="select-to">Session Name*</label>

              <Select
                name=""
                id=""
                options={sessionOPtions}
                          onChange={setSession}
                          value={session}
                          placeholder='Select Name'
              >
                
              </Select>
            </div>
            <div className="form-group select-input-box col-12">
              <label htmlFor="select-to">Exam Name*</label>
              

              <Select
                
                options={examOptions}
                onChange={setSemesterName}
                value={semesterName}
                placeholder='Select Name'
              >
               
              </Select>
            </div>
            <div className="form-group col-12">
              <label htmlFor="shift">Class Name*</label>
              <Select
                
                options={classOptions}
                value={className}
                onChange={setClassName}
                placeholder='Type Name'
              >
               
              </Select>
              
            </div>
            <div className="form-group col-12">
            <DatepickerComponent
                        title={"Exam Date *"}
                        selectedDate={examDate}
                        setSelectedDate={setExamDate}
                      />

              {/* <label htmlFor="vanilla-datepicker">
                Date of Birth *
              </label>
              <div className="input-datepicker-wrapper">
                <input
                  type="text"
                  className="datepicker-input"
                  placeholder="dd/mm/yyyy"
                />
                <i className="fas fa-calendar-alt icon"></i>
              </div> */}
            </div>
            <div className="form-group col-12">
              <label htmlFor="dob">Result Date*</label>
              <input type="datetime-local" id="dob" 
              value={resultDateTime}
              onChange={(e)=> setResultDateTime(e.target.value)}
              
              />
            </div>
          </div>

          {/* <!-- Actions --> */}
          <div className="form-actions">
            <button
              type="button"
              id="exmClose"
              className="button close closeBtn"
              onClick={()=> setIsAddModalOpen(false)}
            >
              Close
            </button>
            <button type="submit" className="button save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
</div>
         )}

          {/* <!-- Exam Assign Pop Up Modal Start --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default ExamAssignToclassName;
