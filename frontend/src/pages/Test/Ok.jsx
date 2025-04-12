import { useState } from "react";
import Select from "react-select";

const Ok = () => {
  const [o, setO] = useState(null);

  const Options = [{ value: "Try", label: "Try" }];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted .. ", o);
    setO(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Select
          options={Options}
          onChange={setO}
          value={o}
          placeholder="Enter tester ... "
        />

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
export default Ok;
