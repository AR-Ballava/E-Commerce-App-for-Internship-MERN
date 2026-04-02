import { useNavigate } from "react-router-dom"
import { createPayment, verifyPayment } from "../services/paymentService"

const Checkout = () => {

  const navigate = useNavigate()

  const handlePayment = async () => {

    try {

      const res = await createPayment()

      const { razorpayOrderId, amount, key } = res.data

      const options = {

        key: key,

        amount: amount,

        currency: "INR",

        name: "MyStore",

        description: "Ecommerce Purchase",

        order_id: razorpayOrderId,

        handler: async function (response) {

          try {

            await verifyPayment({

              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature

            })

            alert("Payment Successful")

            navigate("/orders")

          } catch (error) {

            alert("Payment verification failed")

          }

        }

      }

      const rzp = new window.Razorpay(options)

      rzp.open()

    } catch (error) {

      console.error(error)

      alert("Payment failed to start")

    }

  }

  return (

    <div className="text-center">

      <h2>Checkout</h2>

      <p>Click below to complete your purchase</p>

      <button
        className="btn btn-success"
        onClick={handlePayment}
      >
        Pay Now
      </button>

    </div>

  )

}

export default Checkout