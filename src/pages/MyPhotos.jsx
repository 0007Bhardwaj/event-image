import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPhotos, downloadPhoto } from '../store/slices/eventsSlice';
import {
  Download,
  Calendar,
  MapPin,
  Camera,
  User,
  Heart,
  Share2,
  Eye,
  Sparkles,
  CheckCircle,
  Filter,
  Search,
  Star
} from 'lucide-react';

const MyPhotos = () => {
  const dispatch = useDispatch();
  const { userPhotos, isLoading, error } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('all');

  // ✅ ensure fallback array
  const photos = userPhotos || [];

  useEffect(() => {
    if (user?.email) {
      dispatch(getUserPhotos(user.email));
    }
    setIsVisible(true);
  }, [dispatch, user?.email]);

  const handleDownload = async (photo) => {
    const filename = `${photo.eventName || 'event'}-${photo.id}.jpg`;
    dispatch(downloadPhoto({ photoUrl: photo.url, filename }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date)
      ? 'Unknown date'
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
  };

  // ✅ filter photos safely
  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch =
      (photo.eventName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (photo.eventLocation?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesEvent = filterEvent === 'all' || photo.eventName === filterEvent;

    return matchesSearch && matchesEvent;
  });

  // ✅ unique events safely
  const uniqueEvents = [...new Set(photos.map((photo) => photo.eventName).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your photos...</p>
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
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Camera className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">My Photos</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your Photo
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Discover all the photos where your face has been detected across different events.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">{photos.length}</div>
                <div className="text-white/80 text-sm">Photos Found</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">{uniqueEvents.length}</div>
                <div className="text-white/80 text-sm">Events</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">
                  {new Set(photos.map((p) => p.uploadedBy).filter(Boolean)).size}
                </div>
                <div className="text-white/80 text-sm">Contributors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search photos by event name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filterEvent}
                  onChange={(e) => setFilterEvent(e.target.value)}
                  className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Events</option>
                  {uniqueEvents.map((event) => (
                    <option key={event} value={event}>
                      {event}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photos Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Photos ({filteredPhotos.length})</h2>
            <p className="text-gray-600">
              {searchTerm || filterEvent !== 'all'
                ? 'Filtered results'
                : 'Photos where your face has been detected'}
            </p>
          </div>

          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-12 border border-white/20 max-w-md mx-auto">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {photos.length === 0 ? 'No Photos Found' : 'No Matching Photos'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {photos.length === 0
                    ? "We haven't detected your face in any uploaded photos yet."
                    : 'No photos match your current search or filter criteria.'}
                </p>
                {photos.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Upload more photos to events or check back later as new photos are processed.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 overflow-hidden">
                    {/* Photo */}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      <img
                        src={photo.url}
                        alt={`Photo from ${photo.eventName}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Face Detection Badge */}
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>You're here!</span>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Action Buttons Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setSelectedPhoto(photo)}
                            className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                            title="View photo"
                          >
                            <Eye className="h-5 w-5 text-gray-700" />
                          </button>
                          <button
                            onClick={() => handleDownload(photo)}
                            className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                            title="Download photo"
                          >
                            <Download className="h-5 w-5 text-gray-700" />
                          </button>
                          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg">
                            <Heart className="h-5 w-5 text-gray-700" />
                          </button>
                          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg">
                            <Share2 className="h-5 w-5 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Photo Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                        {photo.eventName}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-xl">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="text-gray-600 font-medium">{formatDate(photo.eventDate)}</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 p-2 rounded-xl">
                            <MapPin className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-gray-600 font-medium">{photo.eventLocation}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="bg-purple-100 p-1 rounded-lg">
                            <User className="h-3 w-3 text-purple-600" />
                          </div>
                          <span className="text-sm text-gray-600">{photo.uploadedBy}</span>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(photo.uploadedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

        {/* Enhanced Photo Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-6xl max-h-[95vh] overflow-hidden w-full border border-white/20 animate-bounce-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 rounded-t-3xl">
                <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Your Photo</h3>
                      <p className="text-white/90 text-sm">Face detected and matched</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-200 transform hover:scale-105"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Photo Container */}
              <div className="p-6">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 shadow-inner">
                  <img
                    src={selectedPhoto.url}
                    alt="Your photo"
                    className="w-full h-auto max-h-[65vh] object-contain rounded-xl shadow-lg"
                  />
                  
                  {/* Face Detection Badge */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-semibold">You're here!</span>
                    </div>
                  </div>
                  
                  {/* Quality Badge */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-gray-700">High Quality</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 p-6 rounded-b-3xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  {/* Photo Info */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 rounded-xl">
                        <User className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">{selectedPhoto.uploadedBy}</div>
                        <div className="text-xs text-gray-500">Uploaded by</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-xl">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">{formatDate(selectedPhoto.uploadedAt)}</div>
                        <div className="text-xs text-gray-500">Upload date</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-xl">
                        <Camera className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">{selectedPhoto.eventName}</div>
                        <div className="text-xs text-gray-500">From event</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleDownload(selectedPhoto)}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Photo
                    </button>
                    
                    <button className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl hover:bg-white transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-lg">
                      <Heart className="h-5 w-5 mr-2" />
                      Like
                    </button>
                    
                    <button className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl hover:bg-white transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-lg">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl mr-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
                <p className="text-gray-600">Understanding our face detection technology</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-xl mt-1">
                    <Camera className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Photo Upload</h4>
                    <p className="text-gray-600 text-sm">
                      Users upload photos to events, and our AI automatically processes them
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-xl mt-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Face Detection</h4>
                    <p className="text-gray-600 text-sm">
                      Advanced AI detects faces and matches them to registered users
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-xl mt-1">
                    <Star className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Smart Matching</h4>
                    <p className="text-gray-600 text-sm">
                      Photos where your face appears are automatically added to your collection
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-xl mt-1">
                    <Download className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Easy Download</h4>
                    <p className="text-gray-600 text-sm">
                      Download any photo where you appear with a single click
                    </p>
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

export default MyPhotos;
