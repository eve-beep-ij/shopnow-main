import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function VerifyEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(
    localStorage.getItem("verification-email") || "",
  );
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(e) {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await api.post("/auth/verify-email/", {
        email,
        otp,
      });

      localStorage.removeItem("verification-email");
      setMessage("Email verified successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response?.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError("Something went wrong, Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");

    try {
      const response = await api.post("/auth/resend-otp/", {
        email,
      });

      setMessage(response.data.message);
    } catch (error) {
      if (error.response?.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError("Unable to resend OTP.");
      }
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card p-4">
            <h3 className="text-secondary py-4 text-center">Verify Email</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            {message && <div className="alert alert-success">{message}</div>}

            <form onSubmit={handleVerify}>
              <div className="mb-3">
                <label htmlFor="verification-email" className="form-label">
                  Email
                </label>
                <input
                  id="verification-email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourmail@shopnow.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="verification-otp" className="form-label">
                  OTP
                </label>
                <input
                  id="verification-otp"
                  type="text"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter your OTP"
                  required
                />
              </div>

              <div className="text-center">
                <button className="btn btn-outline-dark" type="submit" disabled={loading}>
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </form>
            <button className="btn btn-link mt-3" onClick={handleResend}>
                Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
