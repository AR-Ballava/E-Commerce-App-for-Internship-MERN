import { useState, useContext } from "react"
import { loginUser } from "../services/authService"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await loginUser({ email, password })

      const token = res.data.token
      const user = res.data.user

      login(token, user)

      navigate(from, { replace: true })

    } catch (error) {
        const message =
        error.response?.data?.message || "Something went wrong"
        alert(message)
    }

  }

  return (

    <div className="container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary">
          Login
        </button>

      </form>

    </div>

  )

}

export default Login