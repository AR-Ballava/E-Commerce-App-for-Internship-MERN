import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


const Navbar = () => {

  const { isAuthenticated, logout, user } = useContext(AuthContext)

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link className="navbar-brand" to="/">
          MyStore
        </Link>

        <div>

          <Link className="btn btn-outline-light me-2" to="/">
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link className="btn btn-outline-light me-2" to="/cart">
                Cart
              </Link>

              <Link className="btn btn-outline-light me-2" to="/orders">
                Orders
              </Link>
            </>
          )}

          {/* ADMIN BUTTON */}
          {user?.role === "admin" && (
            <Link className="btn btn-warning me-2" to="/admin">
              Admin
            </Link>
          )}

          {isAuthenticated ? (
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">
                Login
              </Link>

              <Link className="btn btn-primary" to="/register">
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>

  )

}

export default Navbar