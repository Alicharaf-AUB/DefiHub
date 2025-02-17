import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu } from 'lucide-react';

/* -----------------------
   Cinematic Intro
-------------------------*/
const CinematicIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setPhase(1), 1000),  // Grid reveal
      setTimeout(() => setPhase(2), 2000),  // Matrix effect
      setTimeout(() => setPhase(3), 3000),  // Hexagon formation
      setTimeout(() => setPhase(4), 4000),  // Logo reveal
      setTimeout(() => setPhase(5), 5000),  // Full scene
      setTimeout(() => onComplete(), 6000)  // Transition to homepage
    ];

    return () => sequence.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Matrix-like Grid Background */}
      <div className={`absolute inset-0 grid-effect ${phase >= 1 ? 'active' : ''}`}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-purple-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Digital Circuit Pattern */}
      <div className={`absolute inset-0 circuit-grid ${phase >= 2 ? 'active' : ''}`}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0"
            style={{
              left: `${(i / 20) * 100}%`,
              top: '0',
              width: '1px',
              height: '100%',
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Hexagon Formation */}
      <div className={`relative ${phase >= 3 ? 'active' : ''}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute hexagon"
            style={{
              '--rotation': `${i * 60}deg`,
              '--delay': `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Central Logo */}
      <div className={`relative z-10 transform ${phase >= 4 ? 'logo-reveal' : 'scale-0 opacity-0'}`}>
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl shadow-2xl flex items-center justify-center transform">
            <span className="text-4xl font-bold text-white tracking-wider">DH</span>
          </div>
          {/* Energy Rings */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-2 border-purple-500/40 rounded-xl energy-ring"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        {/* Brand Text */}
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-8 text-center ${
            phase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-1000`}
        >
          <h1 className="text-3xl font-bold text-white mb-2">DeFi Hub</h1>
          <p className="text-purple-300">Enter the Future of Finance</p>
        </div>
      </div>
    </div>
  );
};

/* -----------------------
   HomeP Component
-------------------------*/
const HomeP = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioSource, setAudioSource] = useState(null);

  // Create AudioContext and load the sound once.
  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    // Load ambient sound
    fetch('/api/ambient-sound.mp3')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(buffer => setAudioBuffer(buffer))
      .catch(error => console.error('Error loading audio:', error));

    // Cleanup on unmount
    return () => {
      if (audioSource && audioSource.source) {
        audioSource.source.stop();
      }
      context.close();
    };
  }, []);

  useEffect(() => {
    if (!audioContext || !audioBuffer) return;

    if (isSoundOn) {
      // Create a new source
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;

      // Create a gain node for fade in/out
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0;

      // Connect them up
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Fade in over 2 seconds to gain = 0.3
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 2);

      // Start playback
      source.start();

      // Store both source & gain node so we can fade out later
      setAudioSource({ source, gainNode });
    } else if (audioSource) {
      // Fade out over 2 seconds
      audioSource.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);

      // Stop the source after fade out completes
      setTimeout(() => {
        audioSource.source.stop();
      }, 2000);
    }
  }, [isSoundOn, audioContext, audioBuffer, audioSource]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Intro Sequence */}
      {!isIntroComplete && (
        <CinematicIntro onComplete={() => setIsIntroComplete(true)} />
      )}

      {/* Main Content (appears after intro completes) */}
      <div
        className={`transition-opacity duration-1000 ${
          isIntroComplete ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-md border-b border-purple-500/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div className="text-2xl font-bold">DeFi Hub</div>
              <div className="hidden md:flex space-x-8">
                <button className="text-purple-200 hover:text-white transition-colors duration-300">Trade</button>
                <button className="text-purple-200 hover:text-white transition-colors duration-300">Stake</button>
                <button className="text-purple-200 hover:text-white transition-colors duration-300">Farm</button>
                <button className="text-purple-200 hover:text-white transition-colors duration-300">Analytics</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hidden md:block px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-all duration-300 hover:scale-105">
                Connect Wallet
              </button>
              <button className="md:hidden p-2">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
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

          {/* Content Grid */}
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
                <button className="px-8 py-4 bg-purple-600 rounded-lg group hover:bg-purple-500 transition-all duration-500">
                  <span className="relative inline-flex items-center">
                    <span className="animate-pulse-slow absolute inset-0 rounded-lg bg-purple-400/30 group-hover:bg-purple-400/50 transition-all duration-500"></span>
                    <span className="relative">Start Trading</span>
                  </span>
                </button>
                <button className="px-8 py-4 border border-purple-500/30 rounded-lg hover:bg-purple-600/10 transition-all duration-500 group">
                  <span className="relative inline-flex items-center">
                    <span className="absolute inset-0 rounded-lg bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-500"></span>
                    <span className="relative">Explore DeFi</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-scroll-reveal">
              <span className="text-purple-300 mb-4">Scroll to Explore</span>
              <div className="w-6 h-12 rounded-full border-2 border-purple-500/30 p-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-scroll-dot" />
              </div>
            </div>
          </div>
        </section>

        {/* Sound Toggle */}
        <button
          onClick={() => setIsSoundOn(!isSoundOn)}
          className="fixed top-6 right-6 z-50 p-2 text-purple-200 hover:text-white transition-colors duration-300"
        >
          {isSoundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Inline Styles & Keyframes */}
      <style jsx>{`
        /* Crystal Animations */
        .crystal-bg {
          position: absolute;
          left: var(--x);
          top: var(--y);
          transform: scale(var(--scale)) rotate(var(--rotation)) translateZ(0);
          transform-origin: center;
          animation: float-crystal 8s ease-in-out infinite;
          animation-delay: var(--delay);
          will-change: transform;
        }

        .crystal-svg {
          filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3));
        }

        .crystal-path {
          animation: crystal-pulse 4s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes float-crystal {
          0%,
          100% {
            transform: scale(var(--scale)) rotate(var(--rotation)) translateZ(0) translateY(0);
          }
          50% {
            transform: scale(var(--scale))
              rotate(calc(var(--rotation) + 10deg))
              translateZ(0)
              translateY(-30px);
          }
        }

        @keyframes crystal-pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        /* Grid Overlay */
        .grid-line {
          position: absolute;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(139, 92, 246, 0.1) 20%,
            rgba(139, 92, 246, 0.1) 80%,
            transparent
          );
          height: 1px;
          width: 100%;
          top: calc(var(--index) / var(--total) * 100%);
          animation: grid-fade 2s ease-out forwards;
          opacity: 0;
          animation-delay: calc(var(--index) * 0.1s);
        }

        @keyframes grid-fade {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 0.5;
            transform: translateX(0);
          }
        }

        /* Title Animations */
        @keyframes title-reveal {
          0% {
            transform: translateY(2rem);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-title-1 {
          animation: title-reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.5s;
        }

        .animate-title-2 {
          animation: title-reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.7s;
        }

        .animate-title-3 {
          animation: title-reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.9s;
        }

        .animate-title-4 {
          animation: title-reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 1.1s;
        }

        /* Scroll Animation */
        @keyframes scroll-reveal {
          from {
            opacity: 0;
            transform: translate(-50%, 1rem);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-scroll-reveal {
          animation: scroll-reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 1.5s;
        }

        @keyframes scroll-dot {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(100%);
            opacity: 1;
          }
        }

        .animate-scroll-dot {
          animation: scroll-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeP;