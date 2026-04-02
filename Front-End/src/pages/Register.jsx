import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService"

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await registerUser({
        name,
        email,
        password
      })

      alert("OTP sent to your email")

      navigate("/verify-otp", { state: { email } })

    } catch (error) {

      console.log(error.response.data)
      alert(error.response.data.message || "Registration failed")

    }

  }

  return (

    <div className="container">

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="btn btn-primary">
          Register
        </button>

      </form>

    </div>

  )

}

export default Register