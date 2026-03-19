import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state || []);
  const [toast, setToast] = useState(""); // For popup messages

  // Show toast for 2 seconds, optional callback
  const showToast = (message, callback) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
      if (callback) callback();
    }, 2000);
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
    showToast("Quantity increased ✅");
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
    showToast("Quantity decreased ✅");
  };

  // Remove item
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showToast("Item removed 🗑️");
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Place Order
  const placeOrder = () => {
    if (cart.length === 0) {
      showToast("Cart is empty!");
      return;
    }

    fetch("http://localhost/food-app/backend/placeOrder.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, total }),
    })
      .then(res => res.json())
      .then(data => {
        // Show success toast, then clear cart & redirect
        showToast("Order Placed Successfully 🎉", () => {
          setCart([]);
          navigate("/home"); // Redirect to home page
        });
      })
      .catch(err => console.error("Error:", err));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={styles.empty}>No items in cart 😢</p>
      ) : (
        <>
          <div style={styles.itemsContainer}>
            {cart.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <img
                  src={`http://localhost/food-app/backend/images/${item.image}`}
                  alt={item.name}
                  style={styles.img}
                />
                <div style={styles.details}>
                  <h4 style={styles.name}>{item.name}</h4>
                  <p style={styles.price}>₹{item.price}</p>

                  <div style={styles.qtyControls}>
                    <button style={styles.qtyBtn} onClick={() => decreaseQty(item.id)}>-</button>
                    <span style={styles.qty}>{item.quantity}</span>
                    <button style={styles.qtyBtn} onClick={() => increaseQty(item.id)}>+</button>
                    <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr style={{ margin: "20px 0" }} />
          <h3>Total: ₹{total}</h3>
          <button style={styles.placeBtn} onClick={placeOrder}>Place Order</button>
        </>
      )}

      {/* Toast popup */}
      {toast && (
        <div style={styles.toast}>{toast}</div>
      )}
    </div>
  );
}

export default CartPage;

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    minHeight: "100vh",
    color: "#fff",
    position: "relative",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  empty: { textAlign: "center", fontSize: "18px" },
  itemsContainer: { display: "flex", flexDirection: "column", gap: "15px" },
  cartItem: {
    display: "flex",
    background: "#fff",
    color: "#000",
    padding: "10px",
    borderRadius: "12px",
    alignItems: "center",
    boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },
  img: { width: "100px", height: "80px", objectFit: "cover", borderRadius: "8px" },
  details: { marginLeft: "15px", flex: 1 },
  name: { margin: "0 0 5px 0" },
  price: { margin: "0 0 10px 0", fontWeight: "bold" },
  qtyControls: { display: "flex", alignItems: "center", gap: "10px" },
  qtyBtn: {
    padding: "5px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#6c63ff",
    color: "#fff",
    fontWeight: "bold",
  },
  qty: { minWidth: "20px", textAlign: "center" },
  removeBtn: {
    padding: "5px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#ff4d4d",
    color: "#fff",
    fontWeight: "bold",
    marginLeft: "80%",
    transition: "0.3s",
  },
  placeBtn: {
    background: "#4BB543",
    color: "#fff",
    padding: "10px 25px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    display: "block",
    margin: "0 auto",
  },
  toast: {
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#6c63ff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    fontWeight: "bold",
    animation: "toastAnim 2s forwards",
    zIndex: 999,
  },
};

/* Add this to App.css or inside <style> for toast animation:
@keyframes toastAnim {
  0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  90% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}
*/