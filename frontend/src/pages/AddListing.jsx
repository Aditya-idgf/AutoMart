import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, Tag, Package, Image as ImageIcon } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function AddListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    category: 'car',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const sellerId = localStorage.getItem('mockUserId');
    
    if (!sellerId) {
      setError("User session missing. Please refresh the app to generate a mock user.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        sellerId,
        year: Number(formData.year),
        price: Number(formData.price),
        images: formData.imageUrl ? [formData.imageUrl] : []
      };

      const res = await axios.post(`${API_BASE}/vehicles`, payload);
      
      // Navigate to the newly created vehicle details page
      navigate(`/vehicle/${res.data._id}`);
      
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while saving the listing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden shadow-gray-200/50">
          
          <div className="bg-blue-600 px-6 py-8 sm:p-10 text-center">
            <PlusCircle className="h-12 w-12 text-blue-200 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Sell Your Vehicle</h2>
            <p className="mt-2 text-blue-100 font-medium text-lg">
              Fill in the details below to list your vehicle on AutoMart.
            </p>
          </div>

          <div className="px-6 py-8 sm:p-10 border border-gray-100 border-t-0 rounded-b-2xl">
            {error && (
              <div className="rounded-lg bg-red-50 p-4 mb-6 border border-red-200">
                <p className="text-sm font-medium text-red-800 text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Basic Details Section */}
              <div className="space-y-6 border-b border-gray-100 pb-8">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-400" />
                  Primary Information
                </h3>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Listing Title *</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg py-3 px-4 bg-gray-50 border"
                        placeholder="e.g. Pristine 2021 Honda Civic EX"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="make" className="block text-sm font-semibold text-gray-700">Make *</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="make"
                        id="make"
                        required
                        value={formData.make}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg py-3 px-4 bg-gray-50 border"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="model" className="block text-sm font-semibold text-gray-700">Model *</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="model"
                        id="model"
                        required
                        value={formData.model}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg py-3 px-4 bg-gray-50 border"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="year" className="block text-sm font-semibold text-gray-700">Year *</label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="year"
                        id="year"
                        required
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        value={formData.year}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg py-3 px-4 bg-gray-50 border"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Classification Section */}
              <div className="space-y-6 border-b border-gray-100 pb-8">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  Classification & Pricing
                </h3>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category *</label>
                    <div className="mt-2">
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg py-3 px-4 bg-gray-50 border"
                      >
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="other">Other Transport</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price (USD) *</label>
                    <div className="mt-2 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-lg py-3 px-4 bg-gray-50 border"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Details & Images */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  Details & Media
                </h3>
                
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700">Image URL</label>
                  <p className="text-xs text-gray-500 mb-2 mt-1">(Leave blank for default placeholder)</p>
                  <input
                    type="url"
                    name="imageUrl"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg py-3 px-4 bg-gray-50 border"
                    placeholder="https://example.com/my-car.jpg"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description *</label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg py-3 px-4 bg-gray-50 border"
                      placeholder="Describe the condition, features, and history of the vehicle..."
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md tracking-wide text-lg font-bold text-white transition-all ${
                    loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-1'
                  }`}
                >
                  {loading ? 'Creating Listing...' : 'Publish Vehicle Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
