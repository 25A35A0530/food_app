import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TrackOrder() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/food-app/backend/getUserOrders.php")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  const statusStep = (status) => {
    switch (status.toLowerCase()) {
      case "placed": return 1;
      case "packing": return 2;
      case "delivered": return 3;
      default: return 0;
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', sans-serif", color: "#fff", background: "linear-gradient(135deg,#667eea,#764ba2)", minHeight: "100vh" }}>
      <h2>Track Your Orders</h2>

      {orders.length === 0 ? <p>No orders found 😢</p> : (
        orders.map(order => {
          const currentStep = statusStep(order.status);
          return (
            <div key={order.id} style={{ background: "#fff", color: "#000", padding: "15px", borderRadius: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Total:</strong> ₹{order.total_price}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
  {[
    { icon: "📦", label: "Placed" },
    { icon: "🧑‍🍳", label: "Preparing" },
    { icon: "🚚", label: "Delivered" }
  ].map((step, index) => (
    <div key={index} style={{ display: "flex", alignItems: "center", flex: 1, position: "relative" }}>
      
      {/* Circle with Icon */}
      <div
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          backgroundColor: currentStep > index ? "#4BB543" : "#ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          zIndex: 2,
          transition: "0.3s"
        }}
      >
        {step.icon}
      </div>

      {/* Line */}
      {index < 2 && (
        <div
          style={{
            height: "4px",
            flex: 1,
            marginLeft: "-2px",
            marginRight: "-2px",
            borderRadius: "2px",
            backgroundColor: currentStep > index ? "#4BB543" : "#ccc",
          }}
        ></div>
      )}
    </div>
  ))}
</div>
              <p style={{ marginTop: "10px", fontWeight: "bold", color: "#4BB543" }}>Status: {order.status}</p>

              <button
                style={{ marginTop: "10px", padding: "8px 15px", borderRadius: "6px", border: "none", background: "#6c63ff", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => navigate(`/order-details/${order.id}`)}
              >
                View Details
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TrackOrder;