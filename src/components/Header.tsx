import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Brain size={24} />
          <span>Interview Test App</span>
        </Link>
        <nav>
          <Link to="/" className="hover:text-blue-200 transition-colors">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;