import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = ({setProductAdded}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [rating, setRating] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();

  const addProduct = async (newProduct) => {
    try {
      console.log("Adding product:", newProduct);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      return true;
    } catch (error) {
      console.error("Error adding product:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Category before submit:", category);
    const newProduct = {
      title,
      category,
      description,
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      supplier: {
        name: supplierName,
        contactEmail,
        contactPhone,
        rating: Number(rating)
      },
    };

    const success = await addProduct(newProduct);
    if (success) {
      console.log("Product Added Successfully");
      setProductAdded(true);
      navigate("/");
    } else {
      console.error("Failed to add the product");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
      <form onSubmit={submitForm}>
        <label>Product title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Product category:</label>
        <input
          type="text"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          />


        <label>Product Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price:</label>
        <input
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Stock Quantity:</label>
        <input
          type="number"
          required
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
        <label>Supplier name:</label>
        <input
          type="text"
          required
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
         <label>Contact email:</label>
        <input
          type="text"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
         <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
         <label>Rating :</label>
        <input
          type="number"
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;