import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await api.get("/cart/");
        setCart(response.data);
      } catch (error) {
        console.log(error);
        setError("Unable to load your cart.");
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, []);

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    setError("");

    try {
      await api.post("/orders/");

      setSuccess("Your order has been placed successfully.");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);

      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Unable to place your order.");
      }
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading checkout...</h4>
      </div>
    );
  }

  const items = cart?.items || [];

  const total = items.reduce((sum, item) => {
    return sum + Number(item.product_price) * item.quantity;
  }, 0);

  if (items.length === 0 && !success) {
    return (
      <div className="container my-5 text-center">
        <h3>Your cart is empty.</h3>

        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Checkout</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      {!success && (
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <h4>Order Items</h4>

                <hr />

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between mb-3"
                  >
                    <div>
                      <h6 className="mb-1">
                        {item.product_name}
                      </h6>

                      <small className="text-secondary">
                        Quantity: {item.quantity}
                      </small>
                    </div>

                    <span>
                      ₦
                      {(
                        Number(item.product_price) *
                        item.quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card">
              <div className="card-body">
                <h4>Order Summary</h4>

                <hr />

                <div className="d-flex justify-content-between">
                  <span>Total</span>

                  <strong className="text-danger">
                    ₦{total.toLocaleString()}
                  </strong>
                </div>

                <button
                  className="btn btn-dark w-100 mt-4"
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                >
                  {placingOrder
                    ? "Placing Order..."
                    : "Place Order"}
                </button>

                <button
                  className="btn btn-outline-secondary w-100 mt-2"
                  onClick={() => navigate("/cart")}
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;