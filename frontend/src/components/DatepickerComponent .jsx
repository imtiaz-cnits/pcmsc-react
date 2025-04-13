import { useEffect, useRef } from "react";
import { Datepicker } from "vanillajs-datepicker";

const DatepickerComponent = ({ title,selectedDate, setSelectedDate }) => {
  const dateInputRef = useRef(null);

  useEffect(() => {
    const inputElement = dateInputRef.current;
    if (inputElement) {
      const datepicker = new Datepicker(inputElement, {
        format: "dd-mm-yyyy",
        autohide: true,
      });

      // // Set default date in input field
      // inputElement.value = new Date().toLocaleDateString("en-GB");
      // console.log(inputElement.value)

      const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        datepicker.hide(); // Hide the datepicker
      };

      inputElement.addEventListener("changeDate", handleDateChange);

      // Cleanup function
      return () => {
        inputElement.removeEventListener("changeDate", handleDateChange);
        datepicker.destroy(); // Properly remove the datepicker instance
      };
    }
  }, [setSelectedDate]); // Keep dependencies minimal

    // ✅ Pre-fill the input field when selectedDate changes
    useEffect(() => {
      if (dateInputRef.current && selectedDate) {
        dateInputRef.current.value = selectedDate;
      }
    }, [selectedDate]);

  return (
    <div className="form-group col-lg-4">
      <label htmlFor="vanilla-datepicker">{title}</label>
      <div className="input-datepicker-wrapper">
        <input
          ref={dateInputRef}
          type="text"
          className="datepicker-input"
          placeholder="dd-mm-yyyy"
        />
        <i className="fas fa-calendar-alt icon"></i>
      </div>
    </div>
  );
};

export default DatepickerComponent;
