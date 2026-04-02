import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Calendar, MapPin, AlertCircle, CheckCircle, Phone, ArrowLeft } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inquiry Form State
  const [message, setMessage] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    fetchVehicleDetails();
  }, [id]);

  const fetchVehicleDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/vehicles/${id}`);
      setVehicle(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load vehicle details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submitInquiry = async (e) => {
    e.preventDefault();
    setInquiryStatus({ loading: true, success: false, error: null });

    const buyerId = localStorage.getItem('mockUserId');
    if (!buyerId) {
      setInquiryStatus({ loading: false, success: false, error: 'User session not found. Please refresh the page.' });
      return;
    }

    try {
      await axios.post(`${API_BASE}/inquiries`, {
        vehicleId: id,
        buyerId,
        message,
        appointmentDate
      });

      setInquiryStatus({ loading: false, success: true, error: null });
      setMessage('');
      setAppointmentDate('');
    } catch (err) {
      console.error(err);
      setInquiryStatus({ loading: false, success: false, error: 'Failed to submit inquiry.' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-xl text-center shadow-sm">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-red-700">{error || "Vehicle Not Found"}</h2>
        <button onClick={() => navigate('/browse')} className="mt-6 text-blue-600 font-medium hover:underline flex items-center justify-center gap-2 mx-auto">
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/browse')} 
          className="mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to inventory
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Main Visuals Column */}
          <div className="flex flex-col mb-10 lg:mb-0">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100">
              <img 
                src={vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : "https://via.placeholder.com/800x600.png?text=No+Image"} 
                alt={vehicle.title} 
                className="w-full object-cover h-full"
              />
            </div>
            
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Vehicle Details</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                <div className="sm:col-span-1 border-l-2 border-blue-100 pl-4">
                  <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Model Year</dt>
                  <dd className="mt-2 text-xl font-bold text-gray-900">{vehicle.year}</dd>
                </div>
                <div className="sm:col-span-1 border-l-2 border-green-100 pl-4">
                  <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Make</dt>
                  <dd className="mt-2 text-xl font-bold text-gray-900 capitalize">{vehicle.make}</dd>
                </div>
                <div className="sm:col-span-1 border-l-2 border-purple-100 pl-4">
                  <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Category</dt>
                  <dd className="mt-2 text-xl font-bold text-gray-900 capitalize">{vehicle.category}</dd>
                </div>
                <div className="sm:col-span-1 border-l-2 border-orange-100 pl-4">
                  <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Status</dt>
                  <dd className="mt-2 text-xl font-bold text-gray-900 capitalize">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${vehicle.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {vehicle.status}
                    </span>
                  </dd>
                </div>
              </dl>
              
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Column */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden shadow-blue-900/5 relative border border-blue-50">
              <div className="absolute top-0 inset-x-0 h-2 bg-blue-600"></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">{vehicle.title}</h1>
                    <p className="text-lg text-gray-500 mt-1 capitalize">{vehicle.make} {vehicle.model}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <span className="text-sm font-semibold text-gray-500 block mb-1">Asking Price</span>
                  <p className="text-5xl font-black text-blue-600 tracking-tight">
                    ${vehicle.price.toLocaleString()}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Seller Information</h3>
                  {vehicle.sellerId ? (
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                        {vehicle.sellerId.name ? vehicle.sellerId.name.charAt(0) : 'U'}
                      </div>
                      <div>
                        <p className="text-base font-medium text-gray-900">{vehicle.sellerId.name || 'Unknown User'}</p>
                        <div className="flex gap-4 mt-1">
                          <p className="flex items-center text-sm text-gray-500">
                            <Phone className="w-3 h-3 mr-1" />
                            {vehicle.sellerId.contactNumber || 'No Phone'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Seller reference unavailable.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Inquiry Form Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <Calendar className="h-6 w-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Schedule an Appointment</h3>
              </div>
              
              {inquiryStatus.success ? (
                <div className="rounded-xl bg-green-50 p-6 flex flex-col items-center text-center border border-green-200 border-dashed">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h4 className="text-lg font-bold text-green-800">Inquiry Sent Successfully!</h4>
                  <p className="mt-2 text-sm font-medium text-green-700">
                    The seller has received your message and will contact you regarding the selected appointment date.
                  </p>
                  <button 
                    onClick={() => setInquiryStatus({ ...inquiryStatus, success: false })}
                    className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submitInquiry} className="space-y-6">
                  {inquiryStatus.error && (
                    <div className="rounded-md bg-red-50 p-4 mb-4">
                      <p className="text-sm font-medium text-red-800">{inquiryStatus.error}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="appointmentDate" className="block text-sm font-semibold text-gray-700">
                      Preferred Date
                    </label>
                    <div className="mt-2 relative rounded-md shadow-sm">
                      <input
                        type="date"
                        id="appointmentDate"
                        required
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 bg-gray-50 border"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                      Message to Seller
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="I'm interested in this vehicle. Is it still available?"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 bg-gray-50 border"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={inquiryStatus.loading}
                      className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm tracking-wide text-base font-bold text-white transition-colors ${
                        inquiryStatus.loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      }`}
                    >
                      {inquiryStatus.loading ? 'Sending...' : 'Send Inquiry Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
