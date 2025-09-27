import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/slices/eventsSlice';
import { CalendarDays, MapPin, Users, Clock, Star, ArrowRight, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllEvents = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

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

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'upcoming') {
      return matchesSearch && new Date(event.date) > new Date();
    } else if (filterType === 'past') {
      return matchesSearch && new Date(event.date) < new Date();
    }
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading all events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 p-6 rounded-3xl shadow-lg">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <CalendarDays className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">All Events</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover All
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Amazing Events
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Explore our complete collection of events, from upcoming celebrations to past memories. 
              Find the perfect event for you!
            </p>
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
                  placeholder="Search events by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Events</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past Events</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {filteredEvents.length} Events Found
            </h2>
            <p className="text-gray-600">
              {filterType === 'all' && 'Browse through all our events'}
              {filterType === 'upcoming' && 'Events happening soon'}
              {filterType === 'past' && 'Events from the past'}
            </p>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-12 border border-white/20 max-w-md mx-auto">
                <CalendarDays className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'No events match your current filter'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => {
                const isUpcoming = new Date(event.date) > new Date();
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
                      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isUpcoming 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-500 text-white'
                          }`}>
                            {isUpcoming ? 'Upcoming' : 'Past'}
                          </span>
                        </div>
                        
                        {/* Photo Count Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{photoCount} photos</span>
                          </span>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                          <Link
                            to={`/event/${event.id}`}
                            className="bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center space-x-2"
                          >
                            <span>View Details</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                      
                      {/* Event Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                          {event.name}
                        </h3>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-xl">
                              <CalendarDays className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-gray-600 font-medium">{formatDate(event.date)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-xl">
                              <MapPin className="h-4 w-4 text-green-600" />
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
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span>View Event</span>
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
    </div>
  );
};

export default AllEvents;
