// import { useState } from "react";
// import useAddModal from "../../hook/useAddModal.jsx";
// import axiosPrivate from "../../utils/axiosPrivate.jsx";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast, { Toaster } from "react-hot-toast";
// import { useUpdateShift } from "../../hook/useShift.js";
//
// const ShiftForm = () => {
//   const [shift, setShift] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [warn, setWarn] = useState("");
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [editShiftId, setEditShiftId] = useState("");
//   // const { data: shifts, isPending, isError, error } = useFetchShifts();
//   const { mutate: updateShift } = useUpdateShift();
//
//   useAddModal("createClassModal", "classModalBtn", "classBtn");
//
//   // add shift modal options
//   const shiftStatusOptions = [
//     { value: "active", label: "Active" },
//     { value: "inactive", label: "Inactive" },
//   ];
//
//   // fields required check
//   // fetch shifts
//
//   //mutation for adding a shift
//
//   //  add a shift
//   const queryClient = useQueryClient();
//   const { mutate: addShift } = useMutation({
//     mutationFn: async (newShift) => {
//       const response = await axiosPrivate.post(
//         "/academic-management/add-shift",
//         newShift,
//       );
//       return response.data;
//     },
//
//     onSuccess: async (data) => {
//       toast.success("Shift successfully added!");
//
//       await queryClient.invalidateQueries({ queryKey: ["shifts"] });
//
//       setShift("");
//       setSelectedStatus(null);
//     },
//     onError: (error) => {
//       console.error("Error in add shifts", error);
//       console.log("Error Msg in add shifts", error.response?.data?.message);
//
//       if (error.response) {
//         toast.error(`${error.response.data.message}`);
//       } else if (error.request) {
//         toast.error("Network error. Please try again later.");
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     },
//   });
//
//   // Handle form submission
//   const handleAddShift = (e) => {
//     e.preventDefault();
//     if (!shift) {
//       setWarn("Please fill in all fields.");
//       return;
//     }
//     const newShift = {
//       shift,
//       status: selectedStatus?.value,
//       label: selectedStatus?.label,
//     };
//     addShift(newShift);
//   };
//
//   // Handle Edit Click
//   const handleEditClick = (session) => {
//     console.log("Edit button clicked for session:", session);
//     setEditShiftId(session._id);
//     setShift(session.session);
//     setSelectedStatus({
//       value: session.status,
//       label: session.label,
//     });
//     setEditModalOpen(true);
//   };
//
//   // Handle Edit Submit
//   const handleEditSubmit =  (e) => {
//     e.preventDefault();
//
//     if (!shift || !selectedStatus) {
//       return setWarn("Please fill in all fields ");
//     }
//
//     const updatedData = {
//       shift,
//       status: selectedStatus?.value,
//       label: selectedStatus?.label,
//     };
//
//     updateShift({ shiftId: editShiftId, updatedData });
//
//     setEditModalOpen(false);
//     setShift("");
//     setSelectedStatus(null);
//     setEditShiftId(null);
//   };
//
//   // 📝 handle the form submission
//   // const handleAddShift = async (e) => {
//   //   e.preventDefault();
//   //
//   //   // prepare payload
//   //   const payload = {
//   //     shift,
//   //     status: selectedStatus?.value,
//   //   };
//   //
//   //   console.log("before sending payload :", payload);
//   //
//   //   try {
//   //     const res = await axiosPrivate.post(
//   //       "/academic-management/add-shift",
//   //       payload,
//   //     );
//   //
//   //     if (res.data) console.log("res data of shift : ", res.data);
//   //     if (res.data.success) {
//   //       alert("successfully added!");
//   //       setShift("");
//   //       setSelectedStatus(null);
//   //     }
//   //
//   //     // toaster
//   //   } catch (error) {
//   //     //custom error message
//   //     if (error.response) {
//   //       console.error("Error from backend:", error.response.data);
//   //       alert(error.response.data.message);
//   //     }
//   //     //! no response server error
//   //     else if (error.request) {
//   //       console.error("Error in request:", error.request);
//   //       alert("Error in connecting to the server. Please try again later.");
//   //     }
//   //     // an unexpected error
//   //     else {
//   //       console.error("Error:", error.message);
//   //       alert("An unexpected error occurred.");
//   //     }
//   //     const errorMsg = error.response?.data?.message;
//   //     console.log("error msg ", errorMsg);
//   //   }
//   // };
//
//   return (
//     <>
//       {/* <!-- Shift Pop Up Modal Start --> */}
//       <section id="createClassModal" className="modal migrateModal">
//         <div className="modal-content">
//           <div id="popup-modal">
//             <div className="form-container">
//               <h3>Add Shift</h3>
//               <form>
//                 {/* <!-- Row 1 --> */}
//                 <div
//                   className="form-row"
//                   style={{ display: "flex", flexDirection: "column" }}
//                 >
//                   <div className="form-group">
//                     <label htmlFor="search-students">Shift Name *</label>
//                     <input
//                       type="text"
//                       id="search-students"
//                       placeholder="Shift Name"
//                       value={shift}
//                       onChange={(e) => setShift(e.target.value)}
//                     />
//                   </div>
//
//                   {warn && <span style={{ color: "lightcoral" }}>{warn}</span>}
//
//                   <div className="form-group">
//                     <label htmlFor="search-students">Status *</label>
//                     <select
//                       value={selectedStatus}
//                       onChange={(e) => setSelectedStatus(e.target.value)}
//                       placeholder="Status"
//                     >
//                       <option value="" disabled>
//                         Select Status
//                       </option>
//                       {shiftStatusOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//
//                 {/* <!-- Actions --> */}
//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     id="classBtn"
//                     className="button close closeBtn"
//                   >
//                     Close
//                   </button>
//                   <button
//                     type="button"
//                     className="button save"
//                     onClick={handleAddShift}
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* <!-- Shift Pop Up Modal Start --> */}
//       <Toaster />
//     </>
//   );
// };
//
// export default ShiftForm;
