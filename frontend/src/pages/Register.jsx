import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost/food-app/backend/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    // 🎉 Show popup instead of alert
    setMessage(data.message);
    setShowPopup(true);

    // Auto hide after 2 sec
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      
      {/* Popup */}
      {showPopup && (
        <div style={styles.popup}>
          {message}
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Name"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            style={styles.input}
            placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <button style={styles.button} type="submit">
            Register
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <a href="/" style={{ color: "#6c63ff", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;

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
  popup: {
    position: "absolute",
    top: "20px",
    background: "#4BB543",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  }
};