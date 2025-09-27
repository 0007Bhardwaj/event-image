import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/slices/eventsSlice';
import { Clock, MapPin, Users, CalendarDays, Star, ArrowRight, Bell, TrendingUp, Heart, Share2, Eye, Filter, Search, Calendar, Gift, Camera, Sparkles, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
    setIsVisible(true);
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilEvent = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcomingEvents = events.filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading upcoming events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 p-6 rounded-3xl shadow-lg">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Clock className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">Upcoming Events</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Don't Miss Out on
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Amazing Events
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get ready for exciting upcoming events! Mark your calendar and join us for unforgettable experiences.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">{upcomingEvents.length}</div>
                <div className="text-white/80 text-sm">Events Coming Up</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">
                  {upcomingEvents.length > 0 ? getDaysUntilEvent(upcomingEvents[0].date) : 0}
                </div>
                <div className="text-white/80 text-sm">Days Until Next</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">
                  {upcomingEvents.reduce((sum, event) => sum + (event.attendees || 0), 0)}
                </div>
                <div className="text-white/80 text-sm">Total Attendees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search upcoming events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Upcoming</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="next-month">Next Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Upcoming Events
            </h2>
            <p className="text-gray-600">
              Don't miss these exciting events happening soon!
            </p>
          </div>

          {/* Featured Events Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {upcomingEvents.slice(0, 3).map((event, index) => {
              const daysUntil = getDaysUntilEvent(event.date);
              const photoCount = event.photos?.length || 0;
              
              return (
                <div
                  key={event.id}
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 overflow-hidden">
                    {/* Event Image */}
                    <div className="relative h-48 bg-gradient-to-br from-green-400 to-emerald-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <Sparkles className="h-3 w-3" />
                          <span>Featured</span>
                        </span>
                      </div>
                      
                      {/* Days Until Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <Bell className="h-3 w-3" />
                          <span>{daysUntil} days</span>
                        </span>
                      </div>
                      
                      {/* Photo Count Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center space-x-1">
                          <Camera className="h-3 w-3" />
                          <span>{photoCount} photos</span>
                        </span>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <Link
                          to={`/event/${event.id}`}
                          className="bg-white text-green-600 px-6 py-2 rounded-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center space-x-2"
                        >
                          <span>View Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                    
                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
                        {event.name}
                      </h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 p-2 rounded-xl">
                            <CalendarDays className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-gray-600 font-medium">{formatDate(event.date)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-xl">
                            <MapPin className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="text-gray-600 font-medium">{event.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-100 p-2 rounded-xl">
                            <Users className="h-4 w-4 text-purple-600" />
                          </div>
                          <span className="text-gray-600 font-medium">{event.attendees || 'TBD'} attendees</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/event/${event.id}`}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span>Join Event</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                          <Heart className="h-5 w-5 text-gray-600" />
                        </button>
                        <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                          <Share2 className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upcoming Events ({upcomingEvents.length})
            </h2>
            <p className="text-gray-600">
              Exciting events happening soon - don't miss out!
            </p>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-24">
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 backdrop-blur-lg rounded-3xl p-20 shadow-2xl border border-white/30 max-w-3xl mx-auto relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-8 left-8 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-8 w-16 h-16 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-1/4 left-12 w-12 h-12 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full animate-pulse delay-700"></div>
                
                {/* Main Content */}
                <div className="relative z-10">
                  <div className="w-28 h-28 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-10 animate-bounce-in shadow-lg">
                    <Calendar className="h-14 w-14 text-white" />
                  </div>
                  
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-8">
                    No Upcoming Events
                  </h3>
                  
                  <p className="text-gray-600 text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                    We're currently preparing some amazing upcoming events for you! 
                    <br />
                    <span className="text-gray-500 text-lg">Stay tuned for exciting announcements and new experiences.</span>
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                    <Link
                      to="/events/all"
                      className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <Calendar className="h-5 w-5 mr-3" />
                      View All Events
                    </Link>
                    <Link
                      to="/"
                      className="inline-flex items-center px-10 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl hover:bg-white transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-lg"
                    >
                      <Home className="h-5 w-5 mr-3" />
                      Back to Home
                    </Link>
                  </div>
                  
                  {/* Fun Elements */}
                  <div className="flex justify-center space-x-6">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-4 h-4 bg-teal-400 rounded-full animate-bounce delay-200"></div>
                    <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                  
                  {/* Encouraging Message */}
                  <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40">
                    <p className="text-gray-700 font-medium">
                      💡 <span className="font-semibold">Pro Tip:</span> Follow us for instant notifications when new events are announced!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => {
                const daysUntil = getDaysUntilEvent(event.date);
                const photoCount = event.photos?.length || 0;
                
                return (
                  <div
                    key={event.id}
                    className={`transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 overflow-hidden">
                      {/* Event Image */}
                      <div className="relative h-48 bg-gradient-to-br from-green-400 to-emerald-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        
                        {/* Days Until Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                            <Bell className="h-3 w-3" />
                            <span>{daysUntil} days left</span>
                          </span>
                        </div>
                        
                        {/* Photo Count Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{photoCount} photos</span>
                          </span>
                        </div>
                        
                        {/* Trending Badge for Soon Events */}
                        {daysUntil <= 7 && (
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>Coming Soon!</span>
                            </span>
                          </div>
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                          <Link
                            to={`/event/${event.id}`}
                            className="bg-white text-green-600 px-6 py-2 rounded-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center space-x-2"
                          >
                            <span>View Details</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                      
                      {/* Event Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
                          {event.name}
                        </h3>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-xl">
                              <CalendarDays className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="text-gray-600 font-medium">{formatDate(event.date)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-xl">
                              <MapPin className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-gray-600 font-medium">{event.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-100 p-2 rounded-xl">
                              <Users className="h-4 w-4 text-purple-600" />
                            </div>
                            <span className="text-gray-600 font-medium">{event.attendees || 'TBD'} attendees</span>
                          </div>
                        </div>
                        
                        <Link
                          to={`/event/${event.id}`}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span>Join Event</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Why Attend Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Attend Our Events?
            </h2>
            <p className="text-gray-600">
              Discover the amazing benefits of joining our upcoming events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-3xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Networking</h3>
              <p className="text-gray-600">Connect with like-minded people and build valuable relationships</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-3xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Photo Memories</h3>
              <p className="text-gray-600">Capture and share beautiful moments with automatic face detection</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-3xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Perks</h3>
              <p className="text-gray-600">Enjoy special benefits and exclusive access to premium features</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-3xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fun Experience</h3>
              <p className="text-gray-600">Create unforgettable memories and have an amazing time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Event Categories
            </h2>
            <p className="text-gray-600">
              Explore different types of events we organize
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-2xl w-16 h-16 mb-6 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Corporate Events</h3>
              <p className="text-gray-600 mb-4">Professional networking, conferences, and business gatherings</p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>3 upcoming events</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl w-16 h-16 mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Social Gatherings</h3>
              <p className="text-gray-600 mb-4">Casual meetups, parties, and social networking events</p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>5 upcoming events</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl w-16 h-16 mb-6 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Special Occasions</h3>
              <p className="text-gray-600 mb-4">Celebrations, anniversaries, and milestone events</p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>2 upcoming events</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-center text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Stay Updated!</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Don't miss out on any upcoming events. Follow us to get notifications about new events and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events/all"
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                View All Events
              </Link>
              <Link
                to="/"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 transform hover:scale-105 border border-white/30"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
