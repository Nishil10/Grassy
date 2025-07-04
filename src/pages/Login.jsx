import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Login() {
  const [formValues, setFormValues] = useState({
    phone: "",
  });

  const [confirmationResult, setConfirmationResult] = useState(null);

  // Setup Recaptcha once
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log("Recaptcha verified");
            },
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
      alert("OTP sent");
    } catch (error) {
      console.error("OTP Error:", error);
      alert("Failed to send OTP: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">Login via OTP</h2>
      <input
        type="tel"
        placeholder="Enter phone number"
        className="p-2 rounded text-black"
        onChange={(e) =>
          setFormValues({ ...formValues, phone: e.target.value })
        }
      />
      <button
        className="mt-4 bg-green-600 px-6 py-2 rounded hover:bg-green-700 transition"
        onClick={handleSendOtp}
      >
        Send OTP
      </button>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Login;
