import { useRef, useState } from "react";

const Ok = () => {
  const [okvalue, setokvalue] = useState("");
  const formRef = useRef(null);

  const handleReset = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleReset}>
        <input
          ref={formRef}
          type="text"
          value={okvalue}
          onChange={(e) => setokvalue(e.target.value)}
        />

        <input type="submit" value="reset" />
      </form>
    </>
  );
};

export default Ok;
