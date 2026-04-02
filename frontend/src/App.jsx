import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrowseVehicles from './pages/BrowseVehicles';
import VehicleDetails from './pages/VehicleDetails';
import AddListing from './pages/AddListing';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedUserId = localStorage.getItem('mockUserId');
        if (!storedUserId) {
          // Generate a random string as part of the email to ensure uniqueness
          const rnd = Math.floor(Math.random() * 100000);
          
          const response = await axios.post(`${API_BASE}/users`, {
            name: `Test User ${rnd}`,
            email: `testuser${rnd}@example.com`,
            contactNumber: '123-456-7890'
          });
          
          localStorage.setItem('mockUserId', response.data._id);
          console.log('Mock User Created:', response.data);
        }
      } catch (err) {
        console.error('Failed to initialize mock user:', err);
        setError('Failed to securely connect to the backend test user service.');
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-6 max-w-sm bg-white rounded-lg shadow-md border-l-4 border-red-500">
          <h2 className="text-xl font-bold text-red-600 mb-2">Setup Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowseVehicles />} />
            <Route path="/vehicle/:id" element={<VehicleDetails />} />
            <Route path="/add-listing" element={<AddListing />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
