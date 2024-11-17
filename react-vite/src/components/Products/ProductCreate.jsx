import { useDispatch } from "react-redux";
import { productCreate } from "../../redux/products";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";


export default function CreateProduct() {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const sessionUser = useSelector((category) => category.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!name) validationErrors.name = "Name is required.";
    if (!price) validationErrors.price = "Price is required.";
    if (!description) validationErrors.description = "Description is required.";
    if (!category) validationErrors.category = "State is required.";
    if (description.length < 20)
      validationErrors.description =
        "Description must be at least 20 characters long.";
    if (!name) validationErrors.name = "Name is required.";
    if (price <= 0) validationErrors.price = "Price must be greater than 0.";
    if (!imageUrl) validationErrors.imageUrl = "Please include an image url"

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (!sessionUser) throw new Error("Not logged in");

      const newProduct = {
        quantity,
        price,
        description,
        name,
        category,
        imageUrl,
        owner_id: sessionUser.id,
      };

      console.log(newProduct)

      const createdProduct = await dispatch(productCreate(newProduct));
      console.log(createdProduct);

      if (createdProduct.errors) {
        setErrors(createdProduct.errors);
        setDisabled(true);
        return;
      }


      setCategory("");
      setPrice("");
      setQuantity("");
      setDescription("");
      setName("");
      setPrice(0);

      navigate(`/products/${createdProduct.id}`);
    } catch (error) {
      setErrors({ general: error.message });
      setDisabled(false);
    }
  };

  return (
    <div className="space">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="create-product-form"
        data-testid="create-product-form"
      >
        <h1>Create a New Product</h1>

        {errors.general && <p className="error">{errors.general}</p>}

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your product"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="ex: Decorations, Clothing, etc..."
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>
        <div className="form-inline-group">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              placeholder="Quantity"
            />
            {errors.category && <p className="error">{errors.category}</p>}
          </div>
        </div>
        <div className="form-inline-group">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder="USD"
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Image Url</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image Url"
          />
          {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <button disabled={disabled} type="submit" className="submit-button">
          {disabled ? "Submitting..." : "Create Product"}
        </button>

      </form>
    </div>
  );
}
