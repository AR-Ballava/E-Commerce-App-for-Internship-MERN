import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import VerifyOTP from "./pages/VerifyOTP"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import Navbar from "./components/Navbar"
import AdminRoute from "./routes/AdminRoute"
import AdminDashboard from "./pages/AdminDashboard"
import AddProduct from "./pages/AddProduct"
import ManageOrders from "./pages/ManageOrders"
import ManageProducts from "./pages/ManageProducts"
import EditProduct from "./pages/EditProduct"
import ProtectedRoute from "./routes/ProtectedRoute"
import SearchResults from "./pages/SearchResults"

const App = () => {

  return (

    <>
      <Navbar />

      <div className="container mt-4">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/verify-otp" element={<VerifyOTP />} />

          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/search" element={<SearchResults />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard/>
              </AdminRoute>
            }
            />

            <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <AddProduct/>
              </AdminRoute>
            }
            />

            <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <ManageOrders/>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ManageProducts/>
              </AdminRoute>
            }
            />

            <Route
            path="/admin/edit-product/:id"
            element={
              <AdminRoute>
                <EditProduct/>
              </AdminRoute>
            }
          />

        </Routes>

      </div>
    </>



  )

}

export default App