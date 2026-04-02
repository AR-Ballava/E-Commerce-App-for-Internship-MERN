import API from "./api"

export const createOrder = () => {
  return API.post("/orders/create")
}

export const getMyOrders = () => {
  return API.get("/orders/my-orders")
}