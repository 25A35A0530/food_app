import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function OrderAnalytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost/food-app/backend/orderStats.php")
      .then(res => res.json())
      .then(resData => setData(resData));
  }, []);

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: "Orders per Day",
        data: data.map(d => d.total_orders),
      },
    ],
  };

  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <h2>Orders Analytics</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default OrderAnalytics;