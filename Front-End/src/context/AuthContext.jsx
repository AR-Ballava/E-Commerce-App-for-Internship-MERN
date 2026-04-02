import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

    useEffect(() => {

    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken) {
        setToken(storedToken)
        setIsAuthenticated(true)
    }

    if (storedUser) {
        setUser(JSON.parse(storedUser))
    }

    setLoading(false)

    }, [])

    const login = (token, userData) => {

        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))

        setToken(token)
        setUser(userData)
        setIsAuthenticated(true)

    }

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setToken(null)
    setUser(null)
    setIsAuthenticated(false)

  }

  return (
    <AuthContext.Provider value={{
      token,
      user,
      isAuthenticated,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider