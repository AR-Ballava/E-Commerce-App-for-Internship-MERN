import API from "./api"

export const createPayment = () => {
  return API.post("/payment/create")
}

export const verifyPayment = (data) => {
  return API.post("/payment/verify", data)
}