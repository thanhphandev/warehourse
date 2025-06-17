import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm text-center">
        {/* Logo */}
        <img
          src="/logo.svg"
          alt="Chemist Warehouse Logo"
          className="mx-auto h-12 mb-6"
        />

        {/* Welcome Text */}
        <h1 className="text-xl font-semibold mb-2">Welcome</h1>
        <p className="text-sm text-gray-600 mb-6">
          Log in to Chemist Warehouse Retail
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email address*"
          className="w-full border border-blue-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
        />

        {/* Continue Button */}
        <button className="w-full bg-blue-700 text-white rounded-md py-2 hover:bg-blue-800 transition">
          Continue
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-700 font-medium underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
