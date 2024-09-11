const Dropdown = ({ options, id, onSelectedValueChange, selectedValue }) => (
  <select
    id={id}
    onChange={(evt) => onSelectedValueChange(evt.target.value)}
    defaultValue={selectedValue}
  >
    <option value="">--Please choose an option--</option>
    {options.map(({ option, value }) => (
      <option
        key={value}
        value={value} /* defaultValue={value === selectedValue} */
      >
        {option}
      </option>
    ))}
  </select>
);

export default Dropdown;
