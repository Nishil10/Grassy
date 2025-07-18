import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, getUserProfile } from '../../services/firebase';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [inputErrors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (inputErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateData = () => {
    const errors = {};

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
      const userCredential = await signIn(formData.email, formData.password);
      const user = userCredential.user;
      const userProfile = await getUserProfile(user.uid);

      console.log('Login successful: ', {
        uid: user.uid,
        email: user.email,
        profile: userProfile,
      });

      navigate('/');
      alert(`Welcome back, ${userProfile?.displayName || user.email}!`);
    } catch (err) {
      console.error('Login error: ', err);

      let errMessage = 'Login failed. Please try again.';
      switch (err.code) {
        case 'auth/user-not-found':
          errMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          errMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errMessage = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errMessage = err.message || 'Login failed. Please try again.';
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

      <div>
        <label className="text-sm text-gray-400 mb-1 block">E-mail</label>
        <input
          id="email"
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

      <div>
        <label className="text-sm text-gray-400 mb-1 block">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your password"
          disabled={isLoading}
          required
        />
        {inputErrors.password && (
          <p className="text-xs text-red-400 mt-1">{inputErrors.password}</p>
        )}
      </div>

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
            Signing in...
          </div>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
};
