import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/food-app/backend/getOrders.php")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, o) => sum + parseFloat(o.total_price),
    0
  );

  const deliveredOrders = orders.filter(
    o => o.status === "delivered"
  ).length;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      <div style={styles.grid}>

        {/* Total Orders */}
        <div style={styles.card}>
          <div style={styles.icon}>📦</div>
          <h3>Total Orders</h3>
          <p style={styles.value}>{totalOrders}</p>
        </div>

        {/* Revenue */}
        <div style={styles.card}>
          <div style={styles.icon}>💰</div>
          <h3>Total Revenue</h3>
          <p style={styles.value}>₹{totalRevenue}</p>
        </div>

        {/* Delivered */}
        <div style={styles.card}>
          <div style={styles.icon}>✅</div>
          <h3>Delivered Orders</h3>
          <p style={styles.value}>{deliveredOrders}</p>
        </div>

      </div>

      {/* Action Button */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          style={styles.button}
          onClick={() => navigate("/admin-orders")}
        >
          View All Orders →
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;

const styles = {
  container: {
    padding: "30px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#fff",
  },

  heading: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "28px",
    letterSpacing: "1px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    transition: "0.3s",
    cursor: "pointer",
  },

  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  value: {
    fontSize: "30px",
    fontWeight: "bold",
    marginTop: "10px",
  },

  button: {
    padding: "12px 28px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(45deg,#4BB543,#2ecc71)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    transition: "0.3s",
  },
};