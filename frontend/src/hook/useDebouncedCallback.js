import debounce from "lodash.debounce";
import { useMemo } from "react";

const useDebouncedCallback = (callback, delay = 500) => {
  return useMemo(() => debounce(callback, delay), [callback, delay]);
};

export default useDebouncedCallback;
