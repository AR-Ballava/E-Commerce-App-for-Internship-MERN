import { Link } from "react-router-dom"

const AdminDashboard = () => {

  return (

    <div>

      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="d-flex gap-3">

        <Link
          to="/admin/add-product"
          className="btn btn-primary"
        >
          Add Product
        </Link>

        <Link
          to="/admin/orders"
          className="btn btn-success"
        >
          Manage Orders
        </Link>

      </div>

    </div>

  )

}

export default AdminDashboard