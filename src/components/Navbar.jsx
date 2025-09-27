import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Calendar, User, LogOut, Plus, Camera, Menu, X, Sparkles, Home, CalendarDays, Clock } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-2xl group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EventPhotos
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              {/* Event Navigation Buttons */}
              <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-gray-200">
                <Link
                  to="/events/all"
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span>All Events</span>
                </Link>
                <Link
                  to="/events/upcoming"
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
                >
                  <Clock className="h-4 w-4" />
                  <span>Upcoming</span>
                </Link>
              </div>
              
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/my-photos"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                  >
                    <Camera className="h-4 w-4" />
                    <span>My Photos</span>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/create-event"
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Event</span>
                    </Link>
                  )}
                  <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-xl">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-lg">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{user?.name}</span>
                      {user?.role === 'admin' && (
                        <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold">
                          Admin
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

      </nav>

      {/* Mobile Menu Modal */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white/95 backdrop-blur-lg shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-2xl">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    EventPhotos
                  </span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 px-6 py-8 space-y-4">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                
                {/* Event Navigation Buttons */}
                <div className="space-y-2">
                  <Link
                    to="/events/all"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                  >
                    <CalendarDays className="h-5 w-5" />
                    <span>All Events</span>
                  </Link>
                  <Link
                    to="/events/upcoming"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-semibold shadow-lg"
                  >
                    <Clock className="h-5 w-5" />
                    <span>Upcoming Events</span>
                  </Link>
                </div>
                
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                    >
                      <User className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span>Register</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/my-photos"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                    >
                      <Camera className="h-5 w-5" />
                      <span>My Photos</span>
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/create-event"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                      >
                        <Plus className="h-5 w-5" />
                        <span>Create Event</span>
                      </Link>
                    )}
                    
                    {/* User Info */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-700">{user?.name}</div>
                          {user?.role === 'admin' && (
                            <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full font-semibold">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium w-full"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-500">
                  Made with ❤️ for amazing events
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
