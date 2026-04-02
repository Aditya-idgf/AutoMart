import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Car className="text-white h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">AutoMart</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Browse Vehicles
            </Link>
            <Link to="/add-listing" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Add Listing
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
