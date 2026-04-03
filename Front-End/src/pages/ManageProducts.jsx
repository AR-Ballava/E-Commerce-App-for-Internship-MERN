import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"

const ManageProducts = () => {

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const res = await API.get("/products")
    setProducts(res.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) return

    await API.delete(`/products/${id}`)

    fetchProducts()
  }

  return (

    <div>

      <h2 className="mb-4">Manage Products</h2>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {products.map(product => (

            <tr key={product._id}>

              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  width="60"
                />
              </td>

              <td>{product.name}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>

                <Link
                  to={`/admin/edit-product/${product._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default ManageProducts