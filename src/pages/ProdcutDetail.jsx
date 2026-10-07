import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { refreshCart } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${id}/`);

        setProduct(response.data);

        if (response.data.images?.length > 0) {
          setSelectedImage(response.data.images[0].image);
        }
      } catch (error) {
        console.log(error);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setAdding(true);
    setMessage("");
    setError("");

    try {
      await api.post("/cart/", {
        product: product.id,
        quantity: quantity,
      });

      await refreshCart();

      setMessage("Product added to cart.");
    } catch (error) {
      console.log(error);

      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Unable to add product to cart.");
      }
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading product...</h4>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row">
        {/* Images */}
        <div className="col-md-6">
          <div className="border rounded p-3">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="img-fluid rounded w-100"
                style={{
                  height: "450px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center bg-light text-secondary"
                style={{ height: "450px" }}
              >
                No image available
              </div>
            )}
          </div>

          {product.images?.length > 0 && (
            <div className="d-flex gap-2 mt-3 flex-wrap">
              {product.images.map((image) => (
                <button
                  key={image.id}
                  className="border-0 bg-transparent p-0"
                  onClick={() => setSelectedImage(image.image)}
                >
                  <img
                    src={image.image}
                    alt={product.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    className="rounded border"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product information */}
        <div className="col-md-6 mt-4 mt-md-0">
          <h1>{product.name}</h1>

          <h3 className="text-danger my-3">
            ₦{Number(product.price).toLocaleString()}
          </h3>

          <p className="text-secondary">
            {product.description}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          {product.stock > 0 ? (
            <>
              <div className="d-flex align-items-center gap-3 my-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={decreaseQuantity}
                >
                  -
                </button>

                <span className="fs-5">{quantity}</span>

                <button
                  className="btn btn-outline-secondary"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-dark btn-lg"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </>
          ) : (
            <button className="btn btn-secondary btn-lg" disabled>
              Out of Stock
            </button>
          )}

          {message && (
            <div className="alert alert-success mt-4">
              {message}
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-4">
              {error}
            </div>
          )}

          {message && (
            <button
              className="btn btn-outline-dark mt-2"
              onClick={() => navigate("/cart")}
            >
              View Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;