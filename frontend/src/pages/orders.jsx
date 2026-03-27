import { useEffect, useState } from "react";
import "./orders.css";
import BASE_URL from "../config";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/order?token=${token}`);
      const data = await res.json();

      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders.</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>

       <div className="order-header">
  <span className="date">
    {new Date(order.createdAt).toLocaleDateString()}
  </span>
  <span className={`status ${order.status}`}>
    {order.status}
  </span>
</div>

          {order.items.map((item) => {
            const product = item.product;

            return (
              <div className="order-item" key={item._id}>
                <img
                  src={`${BASE_URL}${product?.images?.[0]}`}
                  alt={product?.name}
                />

                <div>
                  <h4>{product?.name}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
            );
          })}

          <div className="order-footer">
            <p>Total: ${order.totalPrice}</p>
            <p>Address: {order.shippingAddress}</p>
            <p>Shipping Method: {order.shippingMethod}</p>
          </div>

        </div>
      ))}
    </div>
  );
}

export default Orders;