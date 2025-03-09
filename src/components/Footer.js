import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/80 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">DeFi Hub</h3>
            <p className="text-purple-300">
              Building the future of decentralized finance, one block at a time.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Discord', 'Telegram', 'Github'].map((social) => (
                <button key={social} className="w-10 h-10 rounded-lg bg-purple-900/30 hover:bg-purple-900/50 flex items-center justify-center transition-all duration-300">
                  <span className="text-purple-300 hover:text-white">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {[
            { title: 'Products', links: ['Trade', 'Stake', 'Farm', 'Analytics'] },
            { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
            { title: 'Resources', links: ['Documentation', 'Help Center', 'Terms', 'Privacy'] }
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <button className="text-purple-300 hover:text-white transition-colors duration-300">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-purple-500/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-400 mb-4 md:mb-0">
            © 2025 DeFi Hub. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <button key={item} className="text-purple-400 hover:text-white transition-colors duration-300">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
