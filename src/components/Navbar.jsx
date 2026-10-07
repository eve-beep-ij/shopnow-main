import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import img from "../assets/shop.png";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const {
    accessToken,
    logout,
    cartCount,
  } = useAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark navbar-gradient sticky-top">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
            <img
              src={img}
              alt="Logo"
              style={{ width: "4rem" }}
            />
          </Link>

          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="collapsibleNavId"
          >
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <div className="d-flex gap-3 mt-4 mt-md-0">

                  {accessToken ? (
                    <button
                      className="btn btn-outline-light"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="btn btn-outline-light me-2"
                    >
                      Login
                    </Link>
                  )}

                  <Link
                    to="/register"
                    className="btn btn-danger me-2 text-white"
                  >
                    Register
                  </Link>

                  <Link
                    to="/cart"
                    className="btn btn-danger me-2 text-white position-relative"
                  >
                    <FaShoppingCart size={18} />

                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;