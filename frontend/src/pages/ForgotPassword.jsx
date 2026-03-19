import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleReset = async () => {
    const res = await fetch("http://localhost/food-app/backend/forgotPassword.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    setMessage(data.message);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);

      // 👉 redirect to login after success
      if (data.message.includes("success")) {
        navigate("/");
      }
    }, 2000);
  };

  return (
    <div style={styles.container}>

      {/* Popup */}
      {showPopup && (
        <div style={{
          ...styles.popup,
          background: message.includes("success") ? "#4BB543" : "#ff4d4d"
        }}>
          {message}
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleReset}>
          Reset Password
        </button>

        <p style={{ marginTop: "10px" }}>
          <a href="/" style={styles.link}>
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

// 🎨 SAME DESIGN SYSTEM
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#6c63ff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  link: {
    color: "#6c63ff",
    textDecoration: "none"
  },
  popup: {
    position: "absolute",
    top: "20px",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  }
};