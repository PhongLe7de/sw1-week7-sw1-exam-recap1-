import { Link } from "react-router-dom";

const ProductListings = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="Product-preview" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <h2>{product.title}</h2>
          </Link>
          <p>Category: {product.category}</p>
          <p>Supplier: {product.supplier.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListings;