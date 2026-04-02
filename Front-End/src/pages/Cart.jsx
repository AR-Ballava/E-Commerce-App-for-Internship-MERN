import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCart, updateCart, removeFromCart } from "../services/cartService"

const Cart = () => {

  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  const fetchCart = async () => {

    try {

      const res = await getCart()

      setCart(res.data.products)

    } catch (error) {

      console.error("Error fetching cart", error)

    }

  }

  useEffect(() => {

    fetchCart()

  }, [])

  const handleQuantityChange = async (productId, quantity) => {

    try {

      await updateCart({
        productId,
        quantity
      })

      fetchCart()

    } catch (error) {

      console.error("Failed to update cart")

    }

  }

  const handleRemove = async (productId) => {

    try {

      await removeFromCart(productId)

      fetchCart()

    } catch (error) {

      console.error("Failed to remove item")

    }

  }

  const totalPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  if (cart.length === 0) {
    return <h2>Your cart is empty</h2>
  }

  return (

    <div>

      <h2 className="mb-4">Your Cart</h2>

      {cart.map((item) => (

        <div key={item.product._id} className="card mb-3">

          <div className="row g-0">

            <div className="col-md-2">

              <img
                src={item.product.image}
                className="img-fluid"
                alt={item.product.name}
              />

            </div>

            <div className="col-md-6">

              <div className="card-body">

                <h5>{item.product.name}</h5>

                <p>₹{item.product.price}</p>

              </div>

            </div>

            <div className="col-md-2 d-flex align-items-center">

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    item.product._id,
                    Number(e.target.value)
                  )
                }
                className="form-control"
              />

            </div>

            <div className="col-md-2 d-flex align-items-center">

              <button
                className="btn btn-danger"
                onClick={() => handleRemove(item.product._id)}
              >
                Remove
              </button>

            </div>

          </div>

        </div>

      ))}

      <h4>Total: ₹{totalPrice}</h4>

      <button
        className="btn btn-success mt-3"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>

    </div>

  )

}

export default Cart