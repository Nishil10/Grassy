import React from "react";
import { Link } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";
import GrassyLogo from "../assets/images/grassy-logo.png";

function Register() {
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
            Join <span className="text-green-400 font-semibold">Grassy</span> and start booking your favorite turf grounds today.
          </p>
        </div>

        {/* Right: Registration Box */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-zinc-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>
            <p className="text-center text-gray-400 mb-6">Join us to get started</p>

            <RegisterForm />

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-600" />
              <span className="mx-2 text-gray-400">OR</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            {/* Sign In Link */}
            <p className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;