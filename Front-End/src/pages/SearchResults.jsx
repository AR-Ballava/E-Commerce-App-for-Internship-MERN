import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import API from "../services/api"

const SearchResults = () => {

  const [products, setProducts] = useState([])

  const query = new URLSearchParams(useLocation().search).get("q")

  const fetchProducts = async () => {

    const res = await API.get(`/products/search?q=${query}`)
    setProducts(res.data)

  }

  useEffect(() => {
    fetchProducts()
  }, [query])

  return (

    <div className="container mt-4">

      <h3>Search Results for "{query}"</h3>

      <div className="row">

        {products.map(product => (

          <div key={product._id} className="col-md-3 mb-4">

            <div className="card">

              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />

              <div className="card-body">

                <h5>{product.name}</h5>

                <p>₹{product.price}</p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default SearchResults