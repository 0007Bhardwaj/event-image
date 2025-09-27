import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../store/slices/eventsSlice';
import EventCard from '../components/EventCard';
import { Calendar, Loader, Sparkles, Camera, Users, Clock, Star, ArrowRight, TrendingUp, Bell } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, isLoading, error } = useSelector((state) => state.events);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
    setIsVisible(true);
  }, [dispatch]);

  // Separate events into upcoming and previous
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= now);
  const previousEvents = events.filter(event => new Date(event.date) < now);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-bounce">
              <Camera className="h-8 w-8 text-white" />
            </div>
            <Loader className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading amazing events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-600 px-6 py-4 rounded-xl shadow-lg">
            <p className="font-semibold">Error loading events</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                <Camera className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              EventPhotos
            </h1>
            <p className="text-xl md:text-3xl mb-8 text-white/90 font-light">
              Discover, Capture & Share Amazing Moments
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">{events.length} Events</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="h-5 w-5" />
                <span className="font-medium">Join Community</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">AI Face Detection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-2xl mr-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these amazing events happening soon!
          </p>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 backdrop-blur-lg rounded-3xl p-16 shadow-2xl border border-white/30 max-w-2xl mx-auto relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-5 w-12 h-12 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-pulse delay-500"></div>
              
              {/* Main Content */}
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce-in shadow-lg">
                  <Clock className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                  No Upcoming Events
                </h3>
                
                <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                  We're working on bringing you amazing events! 
                  <br />
                  <span className="text-gray-500 text-lg">Check back soon for exciting new experiences.</span>
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/events/all')}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    View All Events
                  </button>
                  <button
                    onClick={() => navigate('/events/upcoming')}
                    className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl hover:bg-white transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-lg"
                  >
                    <Bell className="h-5 w-5 mr-2" />
                    Get Notified
                  </button>
                </div>
                
                {/* Fun Elements */}
                <div className="mt-8 flex justify-center space-x-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Previous Events Section */}
      {previousEvents.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl mr-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Previous Events
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Relive the memories from past events and discover photos you might have missed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {previousEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`transition-all duration-500 delay-${(index + upcomingEvents.length) * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-gradient-to-br from-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Why Choose EventPhotos?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of event photography with AI-powered face detection and seamless photo sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center transition-all duration-500 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Discover Events</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Find exciting events happening in your area and join a vibrant community of event-goers.
              </p>
            </div>

            <div className={`text-center transition-all duration-500 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Camera className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Face Detection</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our advanced AI automatically detects faces in photos, making it easy to find yourself in event pictures.
              </p>
            </div>

            <div className={`text-center transition-all duration-500 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect & Share</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Connect with other event-goers, share your photos, and create lasting memories together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already discovering amazing events and sharing incredible memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Get Started Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
