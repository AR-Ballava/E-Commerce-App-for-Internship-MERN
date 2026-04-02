import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../services/productService"
import { addToCart } from "../services/cartService"

const ProductDetails = () => {

  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await getProductById(id)

        setProduct(res.data)

      } catch (error) {

        console.error("Error fetching product", error)

      } finally {

        setLoading(false)

      }

    }

    fetchProduct()

  }, [id])

  const handleAddToCart = async () => {

    try {

      await addToCart({
        productId: product._id,
        quantity: 1
      })

      alert("Product added to cart")

    } catch (error) {

      alert("Failed to add product to cart, Please Login First")

    }

  }

  if (loading) {
    return <h2>Loading product...</h2>
  }

  return (

    <div className="row">

      <div className="col-md-6">

        <img
          src={product.image}
          className="img-fluid"
          alt={product.name}
        />

      </div>

      <div className="col-md-6">

        <h2>{product.name}</h2>

        <h4 className="text-success">
          ₹{product.price}
        </h4>

        <p>
          {product.description}
        </p>

        <button
          className="btn btn-primary"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

      </div>

    </div>

  )

}

export default ProductDetails