const Dropdown = ({ options, onSelectedValueChange, selectedValue }) => (
  <select
    name="pets"
    id="pet-select"
    onChange={(evt) => onSelectedValueChange(evt.target.value)}
  >
    <option value="">--Please choose an option--</option>
    {options.map(({ option, value }) => (
      <option key={value} value={value} selected={value === selectedValue}>
        {option}
      </option>
    ))}
  </select>
);

export default Dropdown;
