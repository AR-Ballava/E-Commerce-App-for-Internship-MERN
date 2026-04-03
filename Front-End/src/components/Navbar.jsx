import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "../styles/Navbar.css"

const Navbar = () => {

  const { isAuthenticated, logout, user } = useContext(AuthContext)

  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()

    if (query.trim() !== "") {
      navigate(`/search?q=${query}`)
    }
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        {/* LEFT SIDE */}
        <Link className="navbar-brand" to="/">
          MyStore
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* CENTER SEARCH BAR */}
          <form className="d-flex mx-auto navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />

            <button className="btn btn-warning ms-2">
              Search
            </button>
          </form>

          {/* RIGHT SIDE */}
          <div className="navbar-actions">

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

      </div>

    </nav>

  )

}

export default Navbar