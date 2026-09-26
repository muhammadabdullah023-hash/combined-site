import { useState } from "react";
import Buttons from "./components/Buttons";
import ProfileCard from "./components/ProfileCard";
import TextInput from "./components/TextInput";
import DataGrid from "./components/DataGrid";
import myPhoto from "./assets/MyProfilePic.png";
import Ahrampic from "./assets/AhramPic.jpg";
import "./App.css";

function App() {
  const myName = "Muhammad Abdullah";
  const githubLink = "https://github.com/muhammadabdullah023-hash/Reusable-UI";

  const [theme, setTheme] = useState("blue");
  const [username, setUsername] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter" && username.trim() !== "") setSubmittedName(username.trim());
  }

  return (
    <div className={`app ${theme}`}>

      {/* HEADER */}
      <header className="hero">
        <p className="eyebrow">REACT COMPONENT LIBRARY</p>
        <h1>Neon <span>UI</span></h1>
        <p className="subtitle">Reusable. Interactive. Customizable.</p>
      </header>

      {/* 01 - COLOR CONTROLS */}
      <section className="section">
        <div className="section-title">
          <span className="number">01</span>
          <div>
            <h2>Choose your color</h2>
            <p>Click a color and watch the entire interface change.</p>
          </div>
        </div>

        <div className="color-buttons">
          {["blue", "red", "green", "orange"].map((c) => (
            <Buttons
              key={c}
              text={c.toUpperCase()}
              color={c}
              size="medium"
              active={theme === c}
              onClick={() => setTheme(c)}
            />
          ))}
        </div>

        <div className="current-theme">CURRENT THEME: <strong>{theme.toUpperCase()}</strong></div>
      </section>

      {/* 02 - TEXT INPUT */}
      <section className="section">
        <div className="section-title">
          <span className="number">02</span>
          <div>
            <h2>Text Input</h2>
            <p>Type something and press Enter to see React update the interface.</p>
          </div>
        </div>

        <TextInput
          placeholder="Enter your name and press Enter..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          size="large"
        />

        {submittedName && (
          <div className="hello-message">You have written: <span>{submittedName}</span> 👋</div>
        )}

        <div style={{ marginTop: "20px" }}>
          <TextInput placeholder="Always green, independent of theme" size="small" color="green" value="" onChange={() => {}} />
        </div>
      </section>

      {/* 03 - PROFILE CARD */}
      <section className="section">
        <div className="section-title">
          <span className="number">03</span>
          <div>
            <h2>Profile Card</h2>
            <p>The card automatically follows the selected color.</p>
          </div>
        </div>

       <div className="profile-cards-row">
  <ProfileCard name={myName} role="React Developer" image={myPhoto} github={githubLink} theme={theme} />
  <ProfileCard name="Ahram Tahir" role="UI/UX Designer" image={Ahrampic} github="https://github.com/example" theme="orange" />
</div>
      </section>

      {/* 04 - API DATA GRID */}
      <section className="section">
        <div className="section-title">
          <span className="number">04</span>
          <div>
            <h2>Fetching Live Data (API)</h2>
            <p>Pulls real user data from a public API and displays it in a grid, with a loading state.</p>
          </div>
        </div>

        <DataGrid theme={theme} />
      </section>

      {/* FOOTER */}
      <footer>
        <span>BUILT WITH REACT</span>
        <span>•</span>
        <span>NEON UI</span>
      </footer>

    </div>
  );
}

export default App;
