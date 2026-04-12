import { useState } from "react";
import "./App.css";

function App() {
  const students = [
    { id: 1, name: "Arun" },
    { id: 2, name: "Kumar" },
    { id: 3, name: "Divya" },
    { id: 4, name: "Priya" }
  ];

  const [favorites, setFavorites] = useState([]);

  const addFavorite = (student) => {
    if (!favorites.find((s) => s.id === student.id)) {
      setFavorites([...favorites, student]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((s) => s.id !== id));
  };

  return (
    <div className="container">

      <h1 className="title">🎓 Student Favorite List</h1>

      <div className="grid">

        {/* Student List */}
        <div className="card">
          <h2>All Students</h2>

          {students.map((student) => {
            const isFav = favorites.some((s) => s.id === student.id);

            return (
              <div className="item" key={student.id}>
                <span>{student.name}</span>

                <button
                  className={`btn ${isFav ? "disabled" : "add"}`}
                  onClick={() => addFavorite(student)}
                  disabled={isFav}
                >
                  {isFav ? "Added ✓" : "Add ❤️"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Favorite List */}
        <div className="card">
          <h2>Favorite Students</h2>

          {favorites.length === 0 ? (
            <p className="empty">No favorites yet</p>
          ) : (
            favorites.map((student) => (
              <div className="item fav" key={student.id}>
                <span>{student.name}</span>

                <button
                  className="btn remove"
                  onClick={() => removeFavorite(student.id)}
                >
                  Remove ❌
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;