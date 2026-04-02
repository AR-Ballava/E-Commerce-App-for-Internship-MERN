import { useState } from "react"
import API from "../services/api"

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

    <div>

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          onChange={(e)=>setPrice(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Stock"
          onChange={(e)=>setStock(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Category"
          onChange={(e)=>setCategory(e.target.value)}
        />

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e)=>setImage(e.target.files[0])}
        />

        <button className="btn btn-primary">
          Add Product
        </button>

      </form>

    </div>

  )

}

export default AddProduct