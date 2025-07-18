import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, createUserProfile } from '../../services/firebase';
import { Eye, EyeOff } from 'lucide-react'; // optional, use any icon lib

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });

  const [inputErrors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (inputErrors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateData = () => {
    const errors = {};

    if (!formData.displayName.trim()) {
      errors.displayName = 'Display name is required';
    } else if (formData.displayName.length < 6) {
      errors.displayName = 'Display name must be at least 6 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setErrors({});

    const validationErrors = validateData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signUp(
        formData.email,
        formData.password,
        formData.displayName
      );
      const user = userCredential.user;

      console.log('Registration successful: ', {
        uid: user.uid,
        email: user.email,
        displayName: formData.displayName,
      });

      navigate('/');
      alert(`Welcome, ${formData.displayName}! Your account has been created successfully.`);
    } catch (err) {
      console.log('Registration error: ', err);

      let errMessage = 'Registration failed. Please try again.';
      switch (err.code) {
        case 'auth/email-already-in-use':
          errMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/too-many-requests':
          errMessage = 'Too many requests. Please try again later.';
          break;
        default:
          errMessage = err.message || 'Registration failed. Please try again.';
      }

      setErrors({ general: errMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {inputErrors.general && (
        <div className="p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm">
          {inputErrors.general}
        </div>
      )}

      {/* Display Name */}
      <div>
        <label className="text-sm text-gray-400 mb-1 block">Display Name</label>
        <input
          type="text"
          name="displayName"
          value={formData.displayName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your display name"
          disabled={isLoading}
          required
        />
        {inputErrors.displayName && (
          <p className="text-xs text-red-400 mt-1">{inputErrors.displayName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm text-gray-400 mb-1 block">E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your email"
          disabled={isLoading}
          required
        />
        {inputErrors.email && (
          <p className="text-xs text-red-400 mt-1">{inputErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="text-sm text-gray-400 mb-1 block">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
            disabled={isLoading}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {inputErrors.password && (
          <p className="text-xs text-red-400 mt-1">{inputErrors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="text-sm text-gray-400 mb-1 block">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm your password"
            disabled={isLoading}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 text-gray-400"
            onClick={() => setShowConfirm(!showConfirm)}
            tabIndex={-1}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {inputErrors.confirmPassword && (
          <p className="text-xs text-red-400 mt-1">{inputErrors.confirmPassword}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Registering...
          </div>
        ) : (
          'Register'
        )}
      </button>
    </form>
  );
};
