import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { GoogleAuth } from "../components/AuthButton";
import GrassyLogo from "../assets/grassy-logo.png";

function Login() {
  const [formValues, setFormValues] = useState({ phone: "" });
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => console.log("Recaptcha verified"),
          },
          auth
        );
      } catch (error) {
        console.error("Recaptcha setup failed:", error);
      }
    }
  }, []);

  const handleSendOtp = async () => {
    try {
      const phoneNumber = "+91" + formValues.phone;
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert("OTP sent to " + phoneNumber);
    } catch (error) {
      alert("OTP error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl w-full">

        {/* Left: Logo */}
        <div className="hidden lg:flex flex-col items-center w-1/2">
          <img
            src={GrassyLogo}
            alt="Grassy Logo"
            className="w-64 mb-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 border border-green-400"
          />
          <p className="text-gray-400 text-center px-4">
            Book your turf, play your game. Welcome to <span className="text-green-400 font-semibold">Grassy</span>.
          </p>
        </div>

        {/* Right: Login Box */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-zinc-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>
            <p className="text-center text-gray-400 mb-6">Sign in to continue</p>

            {/* Phone Number Input */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-1 block">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setFormValues({ phone: e.target.value })}
              />
            </div>

            {/* Send OTP Button */}
            <button
              className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-600" />
              <span className="mx-2 text-gray-400">OR</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            {/* Google Sign-In */}
            <div className="w-full">
              <GoogleAuth />
            </div>

            {/* Sign Up */}
            <p className="text-sm text-center text-gray-400 mt-6">
              Don’t have an account?{" "}
              <span className="text-purple-400 cursor-pointer hover:underline">
                Sign up
              </span>
            </p>

            {/* reCAPTCHA */}
            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
