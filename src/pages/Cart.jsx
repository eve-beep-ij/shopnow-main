import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();

  const { refreshCart } = useAuth();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCart = async () => {
    try {
      const response = await api.get("/cart/");

      setCart(response.data);
    } catch (error) {
      console.log(error);
      setError("Unable to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}/`);

      await getCart();
      await refreshCart();
    } catch (error) {
      console.log(error);
      setError("Unable to remove item.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading cart...</h4>
      </div>
    );
  }

  if (error && !cart) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  const items = cart?.items || [];

  const total = items.reduce((sum, item) => {
    return (
      sum +
      Number(item.product_price) * Number(item.quantity)
    );
  }, 0);

  return (
    <div className="container my-5">

      <h2 className="mb-4">
        Shopping Cart
      </h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {items.length === 0 ? (

        <div className="text-center py-5">

          <h4>Your cart is empty.</h4>

          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="row">

          <div className="col-lg-8">

            {items.map((item) => (

              <div
                className="card mb-3"
                key={item.id}
              >

                <div className="card-body">

                  <div className="row align-items-center">

                    {/* Product Image */}
                    <div className="col-4 col-md-3">

                      {item.product_image ? (
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="img-fluid rounded"
                          style={{
                            height: "120px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          className="bg-light text-secondary d-flex justify-content-center align-items-center rounded"
                          style={{
                            height: "120px",
                          }}
                        >
                          No image
                        </div>
                      )}

                    </div>

                    {/* Product Details */}
                    <div className="col-8 col-md-6">

                      <h5>
                        {item.product_name}
                      </h5>

                      <p className="text-secondary mb-1">
                        ₦
                        {Number(
                          item.product_price
                        ).toLocaleString()}
                      </p>

                      <p className="mb-0">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    {/* Price + Remove */}
                    <div className="col-md-3 text-md-end mt-3 mt-md-0">

                      <h5>
                        ₦
                        {(
                          Number(item.product_price) *
                          Number(item.quantity)
                        ).toLocaleString()}
                      </h5>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}
          <div className="col-lg-4">

            <div className="card">

              <div className="card-body">

                <h4>
                  Order Summary
                </h4>

                <hr />

                <div className="d-flex justify-content-between">

                  <span>
                    Items
                  </span>

                  <span>
                    {items.length}
                  </span>

                </div>

                <div className="d-flex justify-content-between mt-3">

                  <strong>
                    Total
                  </strong>

                  <strong className="text-danger">
                    ₦{total.toLocaleString()}
                  </strong>

                </div>

                <button
                  className="btn btn-dark w-100 mt-4"
                  onClick={() =>
                    navigate("/checkout")
                  }
                >
                  Proceed to Checkout
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;