import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { FaHeart, FaRegHeart, FaPlus, FaUserGraduate } from "react-icons/fa";

function Home() {
  const [students, setStudents] = useState([]);
  const [input, setInput] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedFav = JSON.parse(localStorage.getItem("fav")) || [];
    setFavorites(savedFav);
    
    const user = localStorage.getItem("user") || "Guest";
    setUserName(user);
  }, []);

  const addStudent = () => {
    if (input.trim() === "") return;

    const newStudent = {
      id: Date.now(),
      name: input.trim()
    };

    setStudents([...students, newStudent]);
    setInput("");
  };

  const addFavorite = (student) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === student.id);
    
    if (!isAlreadyFavorite) {
      const updated = [...favorites, student];
      setFavorites(updated);
      localStorage.setItem("fav", JSON.stringify(updated));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addStudent();
    }
  };

  return (
    <div className="home-container">
      
      <div className="bg-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="home-wrapper">
       
        <div className="header-section">
          <div className="user-greeting">
            <div className="avatar">
              <span className="avatar-emoji"></span>
            </div>
            <div className="greeting-text">
              <p className="greeting-label">Welcome back,</p>
              <h1 className="user-name">{userName}</h1>
            </div>
          </div>
          
          <Link to="/favorites" className="favorites-link">
            <button className="favorites-btn">
              <span className="btn-icon"></span>
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="fav-badge">{favorites.length}</span>
              )}
            </button>
          </Link>
        </div>

        {/* Add Student Form */}
        <div className="form-card">
          <div className="form-header">
            <h2>Add New Student</h2>
            <p>Enter the student's name to get started</p>
          </div>
          
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="e.g., Muthupandi"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="student-input"
                autoFocus
              />
              <span className="input-highlight"></span>
            </div>
            
            <button 
  className={`add-btn ${input.trim() !== "" ? "active" : ""}`}
  onClick={addStudent}
  disabled={input.trim() === ""}
>
  <FaPlus />
  <span>Add Student</span>
</button>
          </div>
        </div>

        {/* Students List */}
        <div className="students-section">
          <div className="section-header">
            <h2>
              <span className="header-icon"><img src="../assets/img/student-icon.png" alt="Student Icon" /></span>
              Student Directory
            </h2>
            <span className="student-count">{students.length} students</span>
          </div>

          {students.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"></div>
              <h3>No students yet</h3>
              <p>Add your first student using the form above</p>
            </div>
          ) : (
            <div className="students-grid">
              {students.map((student, index) => (
                <div 
                  className="student-card" 
                  key={student.id}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="student-avatar">
                    <span>{student.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="student-info">
                    <h3 className="student-name">{student.name}</h3>
                    <p className="student-id">ID: {student.id}</p>
                  </div>
                  <button
                    className={`fav-add-btn ${favorites.some(fav => fav.id === student.id) ? "added" : ""}`}
                    onClick={() => addFavorite(student)}
                    disabled={favorites.some(fav => fav.id === student.id)}
                  >
                    {favorites.some(fav => fav.id === student.id) ? (
                      <>
                        <span>❤️</span>
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <span>🤍</span>
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;