import { useEffect, useState } from "react"
import { getProducts } from "../services/productService"
import ProductCard from "../components/ProductCard"

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
    return <h2>Loading products...</h2>
  }

  if (products.length === 0) {
    return <h2>No products available</h2>
  }

  return (

    <div>

      <h2 className="mb-4">Products</h2>

      <div className="row">

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