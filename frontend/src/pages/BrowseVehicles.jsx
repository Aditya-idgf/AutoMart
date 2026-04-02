import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, Search } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function BrowseVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simple UI filter state
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, [category]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const url = category ? `${API_BASE}/vehicles?category=${category}` : `${API_BASE}/vehicles`;
      const response = await axios.get(url);
      setVehicles(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load vehicles. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Browse Listings</h1>
          <p className="mt-1 text-sm text-gray-500">Find the perfect vehicle from our extensive catalog.</p>
        </div>
        
        {/* Simple Filter */}
        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <button 
            onClick={() => setCategory('')} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${category === '' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All
          </button>
          <button 
            onClick={() => setCategory('car')} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${category === 'car' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Cars
          </button>
          <button 
            onClick={() => setCategory('bike')} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${category === 'bike' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Bikes
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
          <h3 className="text-lg font-medium text-red-800">Connection Error</h3>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
          <Search className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900">No vehicles found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or be the first to list a vehicle!</p>
          <Link to="/add-listing" className="mt-4 text-blue-600 hover:underline font-medium">Post a listing &rarr;</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <Link 
              to={`/vehicle/${vehicle._id}`} 
              key={vehicle._id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
            >
              <div className="relative pt-[60%] overflow-hidden bg-gray-100">
                <img 
                  src={vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : "https://via.placeholder.com/400x300.png?text=No+Image"} 
                  alt={vehicle.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-bold text-gray-900">${vehicle.price.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{vehicle.title}</h3>
                </div>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{vehicle.description}</p>
                
                <div className="mt-auto grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Make</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{vehicle.make}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Year</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.year}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
