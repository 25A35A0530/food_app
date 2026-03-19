import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function OrderDetails() {
  const { orderId } = useParams(); 
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/food-app/backend/getUserOrders.php")
      .then(res => res.json())
      .then(data => {
        const foundOrder = data.find(o => o.id == orderId); 
        setOrder(foundOrder);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p style={{ padding: "20px" }}>Loading order details...</p>;
  if (!order) return <p style={{ padding: "20px" }}>Order not found 😢</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/track-order")} style={styles.backBtn}>
        ← Back to Orders
      </button>

      <h2>Order #{order.id}</h2>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ₹{order.total_price}</p>

      <h3 style={{ marginTop: "20px" }}>Items:</h3>

      {order.items.length === 0 ? (
        <p>No items found 😢</p>
      ) : (
        <div style={styles.itemsContainer}>
          {order.items.map(item => (
            <div key={item.food_id} style={styles.itemCard}>
              <img
                src={`http://localhost/food-app/backend/images/${item.image}`}
                alt={item.name}
                style={styles.img}
              />
              <div style={styles.details}>
                <h4>{item.name}</h4>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p><strong>Total: ₹{item.price * item.quantity}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;

const styles = {
  container: {
    padding: "20px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    minHeight: "100vh",
    color: "#fff"
  },
  backBtn: {
    marginBottom: "15px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    background: "#6c63ff",
    color: "#fff",
    cursor: "pointer"
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  itemCard: {
    display: "flex",
    background: "#fff",
    color: "#000",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  },
  img: {
    width: "100px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px"
  },
  details: {
    marginLeft: "15px"
  }
};