import { useEffect, useState } from "react";
import Select from "react-select";

const Ok = () => {
  const [o, setO] = useState(null);

  const Options = [{ value: "Try", label: "Try" }];

  const testvalue = "Try";
  useEffect(() => {
    const matched = Options.find((option) => option.value === testvalue);
    console.log("matched : ", matched);
    setO(matched);
  }, [Options]);

  return (
    <>
      <form>
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
