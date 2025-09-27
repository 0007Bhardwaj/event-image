import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, clearError } from '../store/slices/eventsSlice';
import { Calendar, MapPin, ArrowLeft, Plus, Sparkles, Camera, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.events);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
    // Clear validation errors
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Event name is required';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Event name must be at least 3 characters';
    }
    
    if (!formData.date) {
      errors.date = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.date = 'Event date cannot be in the past';
      }
    }
    
    if (!formData.location.trim()) {
      errors.location = 'Event location is required';
    } else if (formData.location.trim().length < 3) {
      errors.location = 'Location must be at least 3 characters';
    }
    
    if (formData.description && formData.description.trim().length > 500) {
      errors.description = 'Description must be less than 500 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await dispatch(createEvent({
        name: formData.name.trim(),
        date: formData.date,
        location: formData.location.trim(),
        description: formData.description.trim() || undefined
      })).unwrap();
      navigate('/');
    } catch (error) {
      // Error is handled by Redux
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white/90 hover:text-white mb-8 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Back to Events</span>
            </button>
            
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Plus className="h-5 w-5 text-white" />
                <span className="text-white font-semibold">Create Event</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Create Your
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Amazing Event
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Set up a new event and start collecting beautiful memories from your attendees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl mr-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
                <p className="text-gray-600">Fill in the information for your new event</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Event Name */}
              <div className="space-y-3">
                <label htmlFor="name" className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                  <span>Event Name *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg ${
                    validationErrors.name ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-200 hover:border-purple-300'
                  }`}
                  placeholder="Enter a memorable event name..."
                />
                {validationErrors.name && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-2 rounded-xl">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{validationErrors.name}</span>
                  </div>
                )}
              </div>

              {/* Event Date */}
              <div className="space-y-3">
                <label htmlFor="date" className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span>Event Date *</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg ${
                      validationErrors.date ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-200 hover:border-purple-300'
                    }`}
                  />
                </div>
                {validationErrors.date && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-2 rounded-xl">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{validationErrors.date}</span>
                  </div>
                )}
              </div>

              {/* Event Location */}
              <div className="space-y-3">
                <label htmlFor="location" className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span>Event Location *</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg ${
                      validationErrors.location ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    placeholder="Enter the venue or address..."
                  />
                </div>
                {validationErrors.location && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-2 rounded-xl">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{validationErrors.location}</span>
                  </div>
                )}
              </div>

              {/* Event Description */}
              <div className="space-y-3">
                <label htmlFor="description" className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span>Event Description</span>
                  <span className="text-sm font-normal text-gray-500">(Optional)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg resize-none ${
                    validationErrors.description ? 'border-red-300 ring-2 ring-red-200' : 'border-gray-200 hover:border-purple-300'
                  }`}
                  placeholder="Describe your event... What can attendees expect?"
                />
                <div className="flex justify-between items-center">
                  {validationErrors.description && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-2 rounded-xl">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">{validationErrors.description}</span>
                    </div>
                  )}
                  <div className="ml-auto">
                    <span className={`text-sm font-medium ${
                      formData.description.length > 450 ? 'text-orange-600' : 'text-gray-500'
                    }`}>
                      {formData.description.length}/500 characters
                    </span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-600 px-6 py-4 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 sm:flex-none px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-lg text-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Event...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Create Event</span>
                    </>
                  )}
                </button>
              </div>
          </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Happens Next?
            </h2>
            <p className="text-gray-600">
              After creating your event, here's what you can expect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-3xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Attendees Join</h3>
              <p className="text-gray-600">People will discover and join your event from the events list</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-3xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Photos Upload</h3>
              <p className="text-gray-600">Attendees can upload photos and our AI will detect faces automatically</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-3xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Memories Shared</h3>
              <p className="text-gray-600">Everyone can find and download photos where they appear</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Event Creation Guidelines</h3>
                <p className="text-gray-600">Follow these tips for the best event experience</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-xl mt-1">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Clear Event Name</h4>
                    <p className="text-gray-600 text-sm">Choose a descriptive name that tells people what to expect</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-xl mt-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Future Date</h4>
                    <p className="text-gray-600 text-sm">Set the date to a future date so people can plan ahead</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-xl mt-1">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Specific Location</h4>
                    <p className="text-gray-600 text-sm">Provide venue name, address, or clear meeting point</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-xl mt-1">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Helpful Description</h4>
                    <p className="text-gray-600 text-sm">Describe what attendees can expect and what to bring</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-pink-100 p-2 rounded-xl mt-1">
                    <CheckCircle className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Photo Sharing</h4>
                    <p className="text-gray-600 text-sm">Once created, attendees can upload and share photos</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 p-2 rounded-xl mt-1">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Face Detection</h4>
                    <p className="text-gray-600 text-sm">Our AI automatically detects faces in uploaded photos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
