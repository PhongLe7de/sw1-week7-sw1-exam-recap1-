import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [rating, setRating] = useState("");

  const navigate = useNavigate();

  const updateProduct = async (product) => {
    try {
      const res = await fetch(`https://sw1-week7-sw1-exam-recap1.onrender.com/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.ok;
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {

        const res = await fetch(`https://sw1-week7-sw1-exam-recap1.onrender.com/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProduct(product);
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
        setPrice(data.price);
        setStockQuantity(data.stockQuantity)
        setSupplierName(data.supplier.name)
        setContactEmail(data.supplier.contactEmail);
        setContactPhone(data.supplier.contactPhone);
        setRating(data.supplier.rating);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const submitForm = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id,
      title,
      category,
      description,
      price,
      stockQuantity,
      supplier: {
        name: supplierName,
        contactEmail,
        contactPhone,
        rating,
      },
    };
    console.log(updatedProduct);
    const success = await updateProduct(updatedProduct);
    if (success) {
      navigate(`/products/${id}`);
    } else {
    throw new Error("Network response was not ok");
    }
  };

return (
  <div className="create">
    <h2>Update Product</h2>

    {loading && <p>Loading product details...</p>}
    {error && <p style={{ color: "red" }}>Error: {error}</p>}

    {!loading && !error && (
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
        <button type="submit">Update Product</button>
      </form>
    )}
  </div>
);

};

export default EditProductPage;