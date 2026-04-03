import { Link } from "react-router-dom"
import "../styles/ProductCard.css"

const ProductCard = ({ product }) => {

  return (

    <div className="product-card">

      <div className="product-image-container">

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

      </div>

      <div className="product-info">

        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-price">
          ₹{product.price}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="product-btn"
        >
          View Details
        </Link>

      </div>

    </div>

  )

}

export default ProductCard