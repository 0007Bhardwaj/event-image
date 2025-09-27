import { Link } from 'react-router-dom';
import { Calendar, MapPin, Camera, Users, Sparkles } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = new Date(event.date) >= new Date();
  const photoCount = event.photos ? event.photos.length : 0;

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:scale-105">
      {/* Event Image */}
      <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {event.photos && event.photos.length > 0 ? (
          <img
            src={event.photos[0].url}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="text-center">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No photos yet</p>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isUpcoming 
              ? 'bg-green-500 text-white' 
              : 'bg-purple-500 text-white'
          }`}>
            {isUpcoming ? 'Upcoming' : 'Past Event'}
          </div>
        </div>
        
        {/* Photo Count Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center space-x-1">
          <Camera className="h-3 w-3" />
          <span>{photoCount}</span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.name}
        </h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <div className="bg-blue-100 p-1 rounded-lg mr-3">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium">{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <div className="bg-green-100 p-1 rounded-lg mr-3">
              <MapPin className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium">{event.location}</span>
          </div>
        </div>

        {event.description && (
          <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        )}

        <Link
          to={`/event/${event.id}`}
          className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
