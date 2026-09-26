function TextInput({ placeholder, value, onChange, onKeyDown, size = "medium", color }) {
  return (
    <input
      type="text"
      className={`neon-input ${color || ""} ${size}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default TextInput;
