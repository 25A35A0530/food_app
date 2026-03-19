import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost/food-app/backend/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.status === "success") {

          // ✅ store user
          localStorage.setItem("user", JSON.stringify(data.user));

          setMessage("Login Successful 🎉");
          setShowPopup(true);

          setTimeout(() => {
            setShowPopup(false);

            // 🔥 role based redirect
            if (data.user.role === "admin") {
              navigate("/admin-dashboard");
            } else {
              navigate("/home");
            }

          }, 1500);

        } else {
          setMessage(data.message);
          setShowPopup(true);

          setTimeout(() => setShowPopup(false), 2000);
        }
      });
  };

  return (
    <div style={styles.container}>

      {/* Popup */}
      {showPopup && (
        <div style={{
          ...styles.popup,
          background: message.includes("Successful") ? "#4BB543" : "#ff4d4d"
        }}>
          {message}
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={{ marginTop: "10px" }}>
          <a href="/forgot-password" style={styles.link}>
            Forgot Password?
          </a>
        </p>

        <p style={{ marginTop: "10px" }}>
          Don’t have an account?{" "}
          <a href="/register" style={styles.link}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

// 🎨 STYLES (same theme as register)
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
    cursor: "pointer",
    transition: "0.3s"
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