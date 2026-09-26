function Buttons({ text, color = "blue", size = "medium", onClick, active = false }) {
  return (
    <button className={`neon-button ${color} ${size} ${active ? "active" : ""}`} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}

export default Buttons;
