import { useState } from "react"
import API from "../services/api"
import "../styles/AddProduct.css"

const AddProduct = () => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {

    e.preventDefault()

    const formData = new FormData()

    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("stock", stock)
    formData.append("category", category)
    formData.append("image", image)

    try {

      await API.post("/products", formData)

      alert("Product added successfully")

      setName("")
      setDescription("")
      setPrice("")
      setStock("")
      setCategory("")
      setImage(null)

    } catch (error) {

      console.error(error)
      alert("Failed to add product")

    }

  }

  return (

    <div className="add-product-page">

      <div className="add-product-card">

        <h2 className="title">Add New Product</h2>

        <form onSubmit={handleSubmit} className="product-form">

          <input
            value={name}
            placeholder="Product Name"
            onChange={(e)=>setName(e.target.value)}
          />

          <textarea
            value={description}
            placeholder="Product Description"
            onChange={(e)=>setDescription(e.target.value)}
          />

          <input
            type="number"
            value={price}
            placeholder="Price"
            onChange={(e)=>setPrice(e.target.value)}
          />

          <input
            type="number"
            value={stock}
            placeholder="Stock Quantity"
            onChange={(e)=>setStock(e.target.value)}
          />

          <input
            value={category}
            placeholder="Category"
            onChange={(e)=>setCategory(e.target.value)}
          />

          <input
            type="file"
            onChange={(e)=>setImage(e.target.files[0])}
          />

          <button type="submit" className="submit-btn">
            Add Product
          </button>

        </form>

      </div>

    </div>

  )

}

export default AddProduct