import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Initialize invisible reCAPTCHA if not already
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha",
          {
            size: "invisible",
            callback: () => {
              // reCAPTCHA solved automatically
            },
          },
          auth
        );
      }

      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, `+91${phone}`, appVerifier);

      setConfirmationResult(result);
      setStep(2);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("OTP Error:", error);
      alert(`Failed to send OTP: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      alert("Login successful!");
      navigate("/"); // redirect to Home
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Incorrect OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-zinc-900 p-6 rounded-xl shadow-xl max-w-sm w-full text-white">
        <h1 className="text-2xl font-bold mb-4 text-green-400">Login with Phone</h1>

        {step === 1 ? (
          <>
            <input
              type="text"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white mb-4 outline-none"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="bg-green-600 w-full py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            <div id="recaptcha" />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white mb-4 outline-none"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="bg-green-600 w-full py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
