
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import img from "../assets/shop.png";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

import api from "../services/api";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
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
      await api.post("/auth/register/", formData);

      // localStorage.setItem("verification-email", formData.email);
      navigate("/login");
    } catch (error) {
      if (error.response?.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError("Something went wrong, plaese try again.");
      }
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
              <form onSubmit={handleSubmit}>
                <h3 className="text-secondary py-4 text-center">Register</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="" className="form-label text-secondary fs-5">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                      name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Your First Name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-secondary fs-5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Your Last Name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-secondary fs-5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                      name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
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
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>

                <p className="text-secondary text-center">
                  If you already have an account,{" "}
                  <span>
                    <Link
                      className="text-black text-decoration-underline font-semibold"
                      to="/login"
                    >
                      Click Here
                    </Link>
                  </span>{" "}
                  to login.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;