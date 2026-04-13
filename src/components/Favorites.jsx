import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("fav")) || [];
    setFavorites(data);
  }, []);

  const remove = (id) => {
    const updated = favorites.filter((s) => s.id !== id);
    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  return (
    <div className="favorites-container">
      {/* Subtle Background Pattern */}
      <div className="bg-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="favorites-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <Link to="/home" className="back-link">
            <button className="back-btn">
              <span className="back-icon">←</span>
              <span>Back to Home</span>
            </button>
          </Link>
          
          <div className="title-section">
            <div className="title-icon"></div>
            <h1>Favorite Students</h1>
            {favorites.length > 0 && (
              <span className="favorites-count">{favorites.length}</span>
            )}
          </div>
          
          <div className="spacer"></div>
        </div>

        {/* Main Content */}
        <div className="content-card">
          {favorites.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"></div>
              <h3>No favorites yet</h3>
              <p>Go to the Home page and add some students to your favorites!</p>
              <Link to="/home" className="empty-action-btn">
                <button className="action-btn">Browse Students →</button>
              </Link>
            </div>
          ) : (
            <>
              <div className="favorites-header">
                <p className="favorites-subtitle">
                  You have <strong>{favorites.length}</strong> favorite student{favorites.length !== 1 ? "s" : ""}
                </p>
              </div>
              
              <div className="favorites-grid">
                {favorites.map((student, index) => (
                  <div 
                    className="favorite-card" 
                    key={student.id}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="card-left">
                      <div className="student-avatar">
                        <span>{student.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="student-details">
                        <h3 className="student-name">{student.name}</h3>
                        <p className="student-id">ID: {student.id}</p>
                      </div>
                    </div>
                    
                    <button
                      className="remove-btn"
                      onClick={() => remove(student.id)}
                    >
                      <span className="remove-icon">✕</span>
                      <span>Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

    
    </div>
  );
}

export default Favorites;