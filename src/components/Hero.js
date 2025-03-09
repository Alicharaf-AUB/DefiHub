import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Crystals */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute crystal-bg"
            style={{
              '--scale': `${0.5 + Math.random() * 1.5}`,
              '--rotation': `${Math.random() * 360}deg`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 5}s`
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" className="crystal-svg">
              <path
                d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z"
                fill="url(#crystalGradient)"
                className="crystal-path"
              />
              <defs>
                <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                  <stop offset="50%" stopColor="rgba(124, 58, 237, 0.2)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="grid-line"
            style={{
              '--index': i,
              '--total': 20
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 hero-title">
            <span className="block transform translate-y-8 opacity-0 animate-title-1">
              Welcome to the
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 transform translate-y-8 opacity-0 animate-title-2">
              Future of Finance
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto mb-12 transform translate-y-8 opacity-0 animate-title-3">
            Experience seamless trading with institutional-grade security
            and lightning-fast transactions.
          </p>

          <div className="flex flex-wrap justify-center gap-6 transform translate-y-8 opacity-0 animate-title-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-purple-600 rounded-lg group hover:bg-purple-500 transition-all duration-500">
              Start Building
            </button>
            <button className="px-8 py-4 border border-purple-500/30 rounded-lg hover:bg-purple-600/10 transition-all duration-500 group">
              Explore DeFi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
