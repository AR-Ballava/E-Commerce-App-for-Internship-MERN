import { useEffect, useState } from "react"
import API from "../services/api"

const ManageOrders = () => {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const res = await API.get("/orders")
    setOrders(res.data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id, status) => {
    await API.put(`/orders/status/${id}`, { status })
    fetchOrders()
  }

  // color map for order status
  const statusColor = {
    processing: "bg-warning",
    shipped: "bg-primary",
    delivered: "bg-success",
    cancelled: "bg-danger"
  }

  return (

    <div>

      <h2 className="mb-4">Manage Orders</h2>

      {orders.map(order => (

        <div key={order._id} className="card mb-4">

          <div className="card-body">

            <h5>Order ID: {order._id}</h5>

            <div className="row mb-3">

              <div className="col-md-6 mb-2">
                <strong>Order ID:</strong>
                <div>{order._id}</div>
              </div>

              <div className="col-md-6 mb-2">
                <strong>Order Date:</strong>
                <div>{new Date(order.createdAt).toLocaleString()}</div>
              </div>

              <div className="col-md-6 mb-2">
                <strong>Total Amount:</strong>
                <div>₹{order.totalAmount}</div>
              </div>

              <div className="col-md-6 mb-2">
                <strong>Payment Status:</strong>
                <div>
                  <span className={`badge ${
                    order.paymentStatus === "paid"
                      ? "bg-success"
                      : "bg-warning"
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="col-md-6 mb-2">
                <strong>Order Status:</strong>
                <div>
                  <span className={`badge ${statusColor[order.orderStatus]}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                </div>
              </div>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Update Order Status
              </label>

              <select
                className="form-select"
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
              >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

            </div>

          </div>

        </div>

      ))}

    </div>

  )

}

export default ManageOrders