import { Link } from "react-router-dom"
import "../styles/AdminDashboard.css"

const AdminDashboard = () => {

  return (

    <div className="admin-dashboard">

      <div className="dashboard-card">

        <h2 className="dashboard-title">Admin Dashboard</h2>
        <p className="dashboard-subtitle">
          Manage your store products and orders
        </p>

        <div className="dashboard-actions">

          <Link
            to="/admin/add-product"
            className="dashboard-btn primary-btn"
          >
            Add Product
          </Link>
    
          <Link
            to="/admin/products"
            className="btn btn-info"
            >
            Manage Products
          </Link>

          <Link
            to="/admin/orders"
            className="dashboard-btn success-btn"
          >
            Manage Orders
          </Link>


        </div>

      </div>

    </div>

  )

}

export default AdminDashboard