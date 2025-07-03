import React from 'react';
import { Target, Calendar, Menu, X } from 'lucide-react';

const Header = ({ currentView, setCurrentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-gray-900 shadow-2xl border-b border-red-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2 sm:py-3">
        <div className="flex flex-wrap items-center justify-between">

          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
            <img
              src="/assets/Sv_Logo.png"
              alt="Socio Veyro Logo"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain max-h-20"
            />
            <div className="leading-tight truncate">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Socio-Veyro
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                Your compass for the world of social media.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 md:space-x-6 mt-4 lg:mt-0">
            <button
              onClick={() => setCurrentView('roadmap')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'roadmap'
                  ? 'bg-red-600/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/20'
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-600/10 hover:shadow-lg hover:shadow-red-500/10'
              }`}
            >
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Roadmap</span>
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'calendar'
                  ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30 shadow-lg shadow-orange-500/20'
                  : 'text-gray-400 hover:text-orange-400 hover:bg-orange-600/10 hover:shadow-lg hover:shadow-orange-500/10'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Content Calendar</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors ml-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-700/50 pt-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setCurrentView('roadmap');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  currentView === 'roadmap'
                    ? 'bg-red-600/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/20'
                    : 'text-gray-400 hover:text-red-400 hover:bg-red-600/10'
                }`}
              >
                <Target className="h-5 w-5" />
                <span className="font-medium text-sm sm:text-base">Roadmap Generator</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('calendar');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  currentView === 'calendar'
                    ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30 shadow-lg shadow-orange-500/20'
                    : 'text-gray-400 hover:text-orange-400 hover:bg-orange-600/10'
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span className="font-medium text-sm sm:text-base">Content Calendar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
