import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { verifyOTP } from "../services/authService"

const VerifyOTP = () => {

  const [otp, setOtp] = useState("")

  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email

  const handleVerify = async (e) => {

    e.preventDefault()

    try {

      await verifyOTP({
        email,
        otp
      })

      alert("Account verified successfully")

      navigate("/login")

    } catch (error) {

      alert("OTP verification failed")

    }

  }

  return (

    <div className="container">

      <h2>Verify OTP</h2>

      <form onSubmit={handleVerify}>

        <input
          className="form-control mb-3"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />

        <button className="btn btn-success">
          Verify
        </button>

      </form>

    </div>

  )

}

export default VerifyOTP