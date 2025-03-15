import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/form"); // Redirect to homepage after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Moving Hexagon Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute hexagon"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Left-side design */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-purple-900 to-black relative z-10">
        <div className="absolute inset-0 flex flex-col justify-center items-center px-10">
          <h1 className="text-5xl font-bold text-white">Join DeFi Hub</h1>
          <p className="mt-4 text-purple-300 text-lg">Start exploring decentralized finance today.</p>
        </div>
      </div>

      {/* Sign-Up Form */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-black/80 backdrop-blur-md rounded-lg shadow-xl border border-purple-500/20">
        <h2 className="text-3xl font-bold mb-6">Create an Account</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSignUp} className="w-full max-w-md">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-900 border border-gray-700 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-900 border border-gray-700 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Rewrite Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 mb-6 bg-gray-900 border border-gray-700 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-all"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-purple-300">
          Already have an account? <a href="/login" className="text-purple-500 hover:underline">Sign In</a>
        </p>
      </div>

      {/* Hexagon CSS */}
      <style jsx>{`
        .hexagon {
          width: 80px;
          height: 80px;
          background: rgba(139, 92, 246, 0.2);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          position: absolute;
          opacity: 0.5;
          animation: floatHex 6s infinite alternate ease-in-out;
        }

        @keyframes floatHex {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(20deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;
