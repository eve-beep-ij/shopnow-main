import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import img from "../assets/shop.png";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  async function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      setError("Somthing went wrong, please try again.", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 mt-5" style={{ paddingLeft: "5rem" }}>
            <div className="intro-top border-bottom pb-2">
              <h1 className="mb-3">
                <span className="me-2">
                  <img src={img} alt="Logo" style={{ width: "5rem" }} />
                </span>
                Welcome to Shopnow!
              </h1>

              <p className="fs-5 text-secondary">
                We offer the best services to help you achieve your goals.
              </p>
            </div>

            <div className="intro-body mt-4">
              <p className="text-secondary">
                Discover a world of endless possibilities where you can shop
                from a diverse range of vendors, find unique products, and enjoy
                a seamless shopping experience. Join Upfront today and elevate
                your online shopping journey!
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 my-5">
            <div className="card p-4">
              <h3 className="text-secondary py-4 text-center">Login</h3>

              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label text-secondary fs-5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="form-control"
                    placeholder="yourmail@shopnow.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-secondary fs-5">
                    Password
                  </label>
                  <div className="position-relative w-100">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      placeholder="*******"
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        top: "15%",
                        right: "2%",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? (
                        <LuEyeClosed size={20} />
                      ) : (
                        <LuEye size={20} />
                      )}
                    </span>
                  </div>
                </div>

                <div className="my-2 text-center">
                  <button className="btn btn-outline-dark" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                <p className="text-secondary text-center">
                  Don't have an account?{" "}
                  <span>
                    <Link
                      className="text-black text-decoration-underline font-semibold"
                      to="/register"
                    >
                      Click Here
                    </Link>
                  </span>{" "}
                  to signup.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
