import { useEffect, useState } from "react"
import { getProducts } from "../services/productService"
import ProductCard from "../components/ProductCard"
import "../styles/Home.css"

const Home = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await getProducts()

        setProducts(res.data)

      } catch (error) {

        console.error("Error fetching products", error)

      } finally {

        setLoading(false)

      }

    }

    fetchProducts()

  }, [])

  if (loading) {
    return <div className="home-message">Loading products...</div>
  }

  if (products.length === 0) {
    return <div className="home-message">No products available</div>
  }

  return (

    <div className="home-container">

      <h2 className="home-title">Products</h2>

      <div className="products-grid">

        {products.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>

    </div>

  )

}

export default Home