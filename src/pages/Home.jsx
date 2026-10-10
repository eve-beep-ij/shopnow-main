
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import img from "../assets/banner.webp";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    is_available: true,
  });

  const [images, setImages] = useState([]);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await api.get("/products/");
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  const getCategories = async () => {
    try {
      const response = await api.get("/product-categories/");
      setCategories(response.data);
    } catch (err) {
      console.log(err);
      setCreateError("Unable to load categories");
    }
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  const handleImages = (e) => {
    setImages(e.target.files);
  };

  async function handleCreateProduct(e) {
    e.preventDefault();

    setCreating(true);
    setCreateError("");

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("is_available", formData.is_available);

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const response = await api.post("/products/", data);

      setProducts((prev) => [response.data, ...prev]);

      setFormData({
        category: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        is_available: "",
      });

      setImages([]);

      document.getElementById("closeCreateProductModal").click();
    } catch (error) {
      console.log(error);
      setCreateError("Unable to create product.");
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading products...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="container border-bottom pb-4 my-5"
        style={{ height: "70vh" }}
      >
        <div className="row align-items-center py-5">
          <div className="col-12 col-md-6">
            <p
              className="pb-4"
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                lineHeight: "47px",
              }}
            >
              One-Stop Shopping Destination
            </p>

            <p className="text-secondary pb-4" style={{ fontSize: "1.4rem" }}>
              With Shopnow, You can find everything you need from a variety of
              trusted vendors all in one place. Enjoy a simple, easy, and
              enjoyable shopping experience every time you visit.
            </p>

            <button className="btn btn-danger btn-lg mt-4">
              Start Shopping
            </button>
          </div>

          <div className="col-12 col-md-6">
            <img src={img} className="rounded img-fluid" alt="Banner" />
          </div>
        </div>

        <div className="featured my-5 border-bottom pb-5">
          <h2 className="text-center" style={{ fontSize: "2.3rem" }}>
            Featured Products
          </h2>

          <p
            className="my-4 text-secondary text-center"
            style={{ fontSize: "1.4rem", width: "60%", margin: "0 auto" }}
          >
            Explore our handpicked featured products below—each selected for its
            quality and appeal. Find your next favorite item today!
          </p>
        </div>

        <div className="text-center my-3">
          <button
            type="button"
            className="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#createProductModal"
            onClick={getCategories}
          >
            Create Product
          </button>
        </div>

        <div
          className="modal fade"
          id="createProductModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="createProductModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitleId">
                  Create Product
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleCreateProduct}>
                <div class="modal-body">
                  {createError && (
                    <div className="alert alert-danger">{createError}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Category</label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select category</option>

                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>

                    <textarea
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_available"
                      name="is_available"
                      checked={formData.is_available}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="is_available">
                      Product is available
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="form-label"> Product Images </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      multiple
                      onChange={handleImages}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={creating}
                  >
                    {creating ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <script>
          const myModal = new bootstrap.Modal(
          document.getElementById("modalId"), options, );
        </script>

        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
              <div className="card mx-auto h-100">
                {product.images.length > 0 && (
                  <img
                    src={product.images[0].image}
                    className="card-img-top"
                    alt={product.name}
                    style={{
                      height: "20rem",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <h5 className="text-danger">
                    ₦{Number(product.price).toLocaleString()}
                  </h5>
                  <p className="text-secondary">Stock: {product.stock}</p>

                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() => navigate(`/product-detail/${product.id}`)}
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;