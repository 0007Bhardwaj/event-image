import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmSignUp from './pages/ConfirmSignUp';
import ForgotPassword from './pages/ForgotPassword';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import MyPhotos from './pages/MyPhotos';
import AllEvents from './pages/AllEvents';
import UpcomingEvents from './pages/UpcomingEvents';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-signup" element={<ConfirmSignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/events/all" element={<AllEvents />} />
          <Route path="/events/upcoming" element={<UpcomingEvents />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route 
            path="/my-photos" 
            element={
              <ProtectedRoute requireAuth={true}>
                <MyPhotos />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-event" 
            element={
              <ProtectedRoute requireAuth={true} requireAdmin={true}>
                <CreateEvent />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;