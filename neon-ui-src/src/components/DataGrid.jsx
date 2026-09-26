import { useState, useEffect } from "react";
import Buttons from "./Buttons";

function DataGrid({ theme = "blue" }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchUsers() {
    setLoading(true);
    setError(null);

    fetch("https://randomuser.me/api/?results=6")
      .then((res) => (res.ok ? res.json() : Promise.reject("Network error")))
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="data-grid-wrapper">
      {loading && (
        <div className="loading-spinner-wrapper">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      )}

      {error && !loading && <p className="data-error">Something went wrong: {error}</p>}

      {!loading && !error && (
        <div className="data-grid">
          {users.map((u) => (
            <div className="data-card" key={u.login.uuid}>
              <img src={u.picture.medium} alt={u.name.first} className="data-card-img" />
              <h4>{u.name.first} {u.name.last}</h4>
              <p className="data-card-email">{u.email}</p>
              <p className="data-card-location">{u.location.city}, {u.location.country}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="data-grid-refresh">
          <Buttons text="🔄 FETCH NEW DATA" color={theme} size="medium" onClick={fetchUsers} />
        </div>
      )}
    </div>
  );
}

export default DataGrid;
