import React from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <div className="text-2xl font-bold">DeFi Hub</div>
          <div className="hidden md:flex space-x-6">
            {['Trade', 'Stake', 'Farm', 'Analytics'].map((item) => (
              <button key={item} className="text-purple-200 hover:text-white transition-colors duration-300">
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <button className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
            Connect Wallet
          </button>
          <button className="md:hidden p-2 ml-4">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
