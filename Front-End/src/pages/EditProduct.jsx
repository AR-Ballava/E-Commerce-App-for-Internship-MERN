import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"

const EditProduct = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState("")

  useEffect(() => {

    const fetchProduct = async () => {

      const res = await API.get(`/products/${id}`)
      const p = res.data

      setName(p.name)
      setPrice(p.price)
      setStock(p.stock)
      setDescription(p.description)
      setPreview(p.image)

    }

    fetchProduct()

  }, [id])

  const handleSubmit = async (e) => {

    e.preventDefault()

    const formData = new FormData()

    formData.append("name", name)
    formData.append("price", price)
    formData.append("stock", stock)
    formData.append("description", description)

    if (image) {
      formData.append("image", image)
    }

    await API.put(`/products/${id}`, formData)

    alert("Product updated")

    navigate("/admin/products")

  }

  return (

    <div className="container">

      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          value={name}
          placeholder="Product Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          value={price}
          placeholder="Price"
          onChange={(e)=>setPrice(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          value={stock}
          placeholder="Stock"
          onChange={(e)=>setStock(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          value={description}
          placeholder="Description"
          onChange={(e)=>setDescription(e.target.value)}
        />

        {/* Current Image */}
        {preview && (
          <div className="mb-3">
            <p>Current Image:</p>
            <img
              src={preview}
              alt="product"
              width="120"
              className="mb-2"
            />
          </div>
        )}

        {/* Upload New Image */}
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e)=>{
            setImage(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
          }}
        />

        <button className="btn btn-success">
          Update Product
        </button>

      </form>

    </div>

  )

}

export default EditProduct