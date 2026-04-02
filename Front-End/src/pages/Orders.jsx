import { useEffect, useState } from "react"
import { getMyOrders } from "../services/orderService"

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {

    try {

      const res = await getMyOrders()

      setOrders(res.data)

    } catch (error) {

      console.error("Error fetching orders", error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    fetchOrders()

  }, [])

  if (loading) {
    return <h2>Loading orders...</h2>
  }

  if (orders.length === 0) {
    return <h2>No orders found</h2>
  }

  return (

    <div>

      <h2 className="mb-4">My Orders</h2>

      {orders.map((order) => (

        <div key={order._id} className="card mb-4">

          <div className="card-body">

            <h5>Order ID: {order._id}</h5>

            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>

            <p>
              <strong>Order Status:</strong> {order.orderStatus}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <hr />

            <h6>Products:</h6>

            {order.products.map((item) => (

              <div key={item.product._id} className="d-flex align-items-center mb-3">

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  width="60"
                  className="me-3"
                />

                <div>

                  <p className="mb-0">{item.product.name}</p>

                  <small>
                    ₹{item.product.price} × {item.quantity}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>

  )

}

export default Orders