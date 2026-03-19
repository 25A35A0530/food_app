import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  fetch("http://localhost/food-app/backend/getOrders.php")
    .then(res => res.json())
    .then(data => {
      console.log(data); 
      setOrders(data);
    });
}, []);

  const updateStatus = (id, status) => {
    fetch("http://localhost/food-app/backend/updateOrderStatus.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: id,
        status: status,
      }),
    })
      .then(res => res.json())
      .then(() => {
        fetch("http://localhost/food-app/backend/getOrders.php")
          .then(res => res.json())
          .then(data => setOrders(data));
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Orders Dashboard</h2>

      {orders.length === 0 ? (
        <p style={styles.empty}>No orders found 😢</p>
      ) : (
        <div style={styles.grid}>
          {orders.map((o) => (
            <div key={o.id} style={styles.card}>
              
              <div style={styles.topRow}>
                <h3>Order #{o.id}</h3>
                <span style={{
                  ...styles.status,
                  background:
                    o.status === "placed" ? "#ff9800" :
                    o.status === "preparing" ? "#2196f3" :
                    "#4caf50"
                }}>
                  {o.status}
                </span>
              </div>

              <p><strong>User ID:</strong> {o.user_id}</p>
              <p><strong>Total:</strong> ₹{o.total_price}</p>
              <p><strong>Date:</strong> {o.created_at}</p>

              <div style={styles.btnContainer}>
                <button
                  style={styles.prepareBtn}
                  onClick={() => updateStatus(o.id, "preparing")}
                >
                  Preparing
                </button>

                <button
                  style={styles.deliverBtn}
                  onClick={() => updateStatus(o.id, "delivered")}
                >
                  Delivered
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#fff",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },

  empty: {
    textAlign: "center",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    color: "#000",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  status: {
    padding: "5px 10px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  btnContainer: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },

  prepareBtn: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    background: "#2196f3",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deliverBtn: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    background: "#4caf50",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};