import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient/axiosClient";
import Errors from "../components/Errors.jsx";
import { ClipLoader, BeatLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Auto-clear errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // ===========================
  // 1. SEND CODE TO EMAIL
  // ===========================
  const handleSendCode = () => {
    if (!form.email) {
      setErrors({ email: ["Email is required"] });
      return;
    }

    setLoading(true);

    axiosClient
      .post("/forgot-password", { email: form.email })
      .then(({data}) => {
        setLoading(false);
        setStep(2); // Move to code verification step
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        const msg =
          error.response?.data?.message || "Unable to send reset code.";
        setErrors({ general: [msg] });
      });
  };

  // ===========================
  // 2. VERIFY CODE
  // ===========================
  const handleVerifyCode = () => {
    if (!form.code) {
      setErrors({ code: ["Enter the code sent to your email"] });
      return;
    }

    setLoading(true);

    axiosClient
      .post("/verify-reset-code", {
        email: form.email,
        code: form.code,
      })
      .then(({data}) => {
        setLoading(false);
        setStep(3); // Correct code → show password fields
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        const msg =
          error.response?.data?.message || "Invalid code. Try again.";
        setErrors({ code: [msg] });
      });
  };

  // ===========================
  // 3. RESET PASSWORD
  // ===========================
  const handleResetPassword = () => {
    if (form.password !== form.password_confirmation) {
      setErrors({ password: ["Passwords do not match"] });
      return;
    }

    setLoading(true);

    axiosClient
      .post("/reset-password", {
        email: form.email,
        code: form.code,
        password: form.password,
        password_confirmation: form.password_confirmation,
      })
      .then(() => {
        setLoading(false);
        alert("Password updated successfully! You can now login.");
        window.location.href = "/login";
      })
      .catch((error) => {
        setLoading(false);
        const msg =
          error.response?.data?.message || "Unable to update password.";
        setErrors({ general: [msg] });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-light text-gray-800 mb-6 text-center">
          Forgot Password
        </h2>

        {Object.keys(errors).length > 0 && <Errors errors={errors} />}

        {/* STEP 1 — Enter Email */}
        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              onChange={handleChange}
              value={form.email}
              className="w-full p-2 border-b border-gray-300 mb-4 outline-none"
            />

            <button
              onClick={handleSendCode}
              className="w-full py-3 bg-[#D4C39B] hover:bg-[#c9b489] text-white font-semibold rounded-md shadow-md uppercase text-sm tracking-widest"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "Send Reset Code"}
            </button>
          </>
        )}

        {/* STEP 2 — Enter Code */}
        {step === 2 && (
          <>
            <p className="text-sm text-gray-600 mb-3">
              A reset code has been sent to <strong>{form.email}</strong>
            </p>

            <input
              type="text"
              name="code"
              placeholder="Enter Code"
              onChange={handleChange}
              value={form.code}
              className="w-full p-2 border-b border-gray-300 mb-4 outline-none"
            />

            <button
              onClick={handleVerifyCode}
              className="w-full py-3 bg-[#D4C39B] hover:bg-[#c9b489] text-white font-semibold rounded-md shadow-md uppercase text-sm tracking-widest"
            >
              {loading ? <BeatLoader size={10} color="#fff" /> : "Verify Code"}
            </button>
          </>
        )}

        {/* STEP 3 — Reset Password */}
        {step === 3 && (
          <>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              onChange={handleChange}
              value={form.password}
              className="w-full p-2 border-b border-gray-300 mb-4 outline-none"
            />

            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={form.password_confirmation}
              className="w-full p-2 border-b border-gray-300 mb-4 outline-none"
            />

            <button
              onClick={handleResetPassword}
              className="w-full py-3 bg-[#D4C39B] hover:bg-[#c9b489] text-white font-semibold rounded-md shadow-md uppercase text-sm tracking-widest"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "Update Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
