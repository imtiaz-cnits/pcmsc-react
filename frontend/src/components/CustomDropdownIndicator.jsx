import { components } from "react-select";

const CustomDropdownIndicator = (props) => {
  const { selectProps } = props;
  return (
    <components.DropdownIndicator {...props}>
      {selectProps.menuIsOpen ? "▲" : "▼"}
    </components.DropdownIndicator>
  );
};

export default CustomDropdownIndicator;
