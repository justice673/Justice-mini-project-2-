'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      setSuccess('Login successful!');
      // Store token (localStorage or cookie)
      localStorage.setItem('token', data.token);
      // Optionally redirect or update app state here
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
        style={{ fontFamily: 'Caveat, cursive' }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-lg font-semibold">Back to Home</span>
      </Link>

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          
          {/* Image Side */}
          <div className="relative">
            <Image
              src="https://themewagon.github.io/delicious/img/bg-img/bg7.jpg"
              alt="Delicious food"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay with branding */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                  Welcome Back to
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent" style={{ fontFamily: 'Caveat, cursive' }}>
                  J's Recipe Box
                </h3>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                  Sign In
                </h1>
                <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Welcome back! Please sign in to your account
                </p>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 placeholder-gray-500"
                      placeholder="Enter your email"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 placeholder-gray-500"
                      placeholder="Enter your password"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={form.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Forgot password?
                  </Link>
                </div>

                {/* Error/Success Messages */}
                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
                  style={{ fontFamily: 'Caveat, cursive' }}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-green-600 hover:text-green-700 font-semibold">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
