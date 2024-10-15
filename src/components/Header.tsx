import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 text-2xl font-bold">
          <Brain size={32} className="text-white animate-float" />
          <span className="tracking-wide">InterviewStack</span>
        </Link>
        <nav>
          <Link to="/" className="hover:text-primary-200 transition-colors text-lg font-medium">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;