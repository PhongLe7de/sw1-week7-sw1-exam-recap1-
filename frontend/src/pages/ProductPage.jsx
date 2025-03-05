import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`https://sw1-week7-sw1-exam-recap1.onrender.com/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("id: ", id);
        const res = await fetch(`https://sw1-week7-sw1-exam-recap1.onrender.com/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const onDeleteClick = (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + productId
    );
    if (!confirm) return;

    deleteProduct(productId);
    navigate("/");
  };

  return (
    <div className="product-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{product.title}</h2>
          <p>Type: {product.type}</p>
          <p>Description: {product.description}</p>
          <p>Company: {product.supplier.name}</p>
          <p>Email: {product.supplier.contactEmail}</p>
          <p>Phone: {product.supplier.contactPhone}</p>
          <button onClick={() => onDeleteClick(product._id)}>delete</button>

          <button>
            <Link to={`/edit-product/${product.id}`}>Edit product</Link>
          </button>

        </>
      )}
    </div>
  );
};

export default ProductPage;
