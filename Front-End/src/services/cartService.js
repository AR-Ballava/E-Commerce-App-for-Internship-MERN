import API from "./api"

export const addToCart = (data) => {
  return API.post("/cart/add", data)
}

export const getCart = () => {
  return API.get("/cart")
}

export const updateCart = (data) => {
  return API.put("/cart/update", data)
}

export const removeFromCart = (productId) => {
  return API.delete(`/cart/remove/${productId}`)
}