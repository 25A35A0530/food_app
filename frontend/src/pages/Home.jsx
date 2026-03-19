import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/food-app/backend/getFoods.php")
      .then(res => res.json())
      .then(data => setFoods(data));
  }, []);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    setToast(`${item.name} added to cart!`);
    setTimeout(() => setToast(""), 2000);
  };

  // ✅ Search filter
  const filteredFoods = foods.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Food Menu</h2>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // ✅ reset page on search
        }}
        style={styles.search}
      />

      <div style={styles.actions}>
        <button style={styles.cartBtn} onClick={() => navigate("/cart", { state: cart })}>
          🛒 Cart ({cart.length})
        </button>
        <button style={styles.trackBtn} onClick={() => navigate("/track-order")}>
          🚚 Track Order
        </button>
      </div>

      {/* Toast */}
      {toast && <div style={styles.toast}>{toast}</div>}

      {/* Cards */}
      <div style={styles.cardsContainer}>
        {currentItems.length > 0 ? (
          currentItems.map(item => (
            <div key={item.id} style={styles.card}>
              <div style={styles.imgWrapper}>
                <img
                  src={`http://localhost/food-app/backend/images/${item.image}`}
                  alt={item.name}
                  style={styles.foodImg}
                />
                <div style={styles.overlay}>
                  <p style={styles.overlayText}>{item.category}</p>
                  <p style={styles.overlayText}>₹{item.price}</p>
                </div>
              </div>
              <h3 style={styles.foodName}>{item.name}</h3>
              <button style={styles.addBtn} onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noItems}>No items found 😢</p>
        )}
      </div>

      {/* ✅ Pagination UI */}
      {filteredFoods.length > 0 && (
        <div style={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            style={styles.pageBtn}
          >
            ⬅
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                ...styles.pageBtn,
                background: currentPage === index + 1 ? "#ff914d" : "#fff",
                color: currentPage === index + 1 ? "#fff" : "#333"
              }}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            style={styles.pageBtn}
          >
            ➡
          </button>
        </div>
      )}

      {/* ✅ Showing info */}
      {filteredFoods.length > 0 && (
        <p style={styles.rangeText}>
          Showing {indexOfFirstItem + 1} -{" "}
          {Math.min(indexOfLastItem, filteredFoods.length)} of{" "}
          {filteredFoods.length} items
        </p>
      )}
    </div>
  );
}

export default Home;

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    minHeight: "100vh",
  },
  heading: { textAlign: "center", color: "#fff", marginBottom: "20px" },

  search: {
    display: "block",
    margin: "0 auto 20px auto",
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px"
  },

  cartBtn: {
    background: "#ff914d",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  trackBtn: {
    background: "#4BB543",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  toast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#4BB543",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    zIndex: 1000,
    fontWeight: "bold",
  },

  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  },

  card: {
    background: "#fff",
    width: "200px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },

  imgWrapper: { position: "relative", height: "150px" },

  foodImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px",
    color: "#fff",
    fontSize: "12px",
  },

  overlayText: { margin: 0 },

  foodName: { margin: "10px 0" },

  addBtn: {
    background: "#6c63ff",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    marginBottom: "10px",
    cursor: "pointer",
  },

  noItems: {
    color: "#fff",
    fontSize: "18px",
    textAlign: "center",
    width: "100%"
  },

  // ✅ Pagination styles
  pagination: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap"
  },

  pageBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  rangeText: {
    textAlign: "center",
    marginTop: "10px",
    color: "#fff",
    fontWeight: "bold"
  }
};