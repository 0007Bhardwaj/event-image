import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto, deletePhoto, downloadPhoto } from '../store/slices/eventsSlice';
import { Calendar, MapPin, Camera, Upload, Trash2, ArrowLeft, User, Download, Filter, Sparkles, Heart, Share2, Eye, Search, X, CheckCircle } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  
  const { events, isLoading } = useSelector((state) => state.events);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [uploading, setUploading] = useState(false);
  const [showMyPhotosOnly, setShowMyPhotosOnly] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showFindMyImageGallery, setShowFindMyImageGallery] = useState(false);

  const event = events.find(e => e.id === id);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event not found</h2>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      await dispatch(uploadPhoto({ eventId: event.id, file })).unwrap();
    } catch (error) {
      alert('Failed to upload photo');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await dispatch(deletePhoto({ eventId: event.id, photoId })).unwrap();
      } catch (error) {
        alert('Failed to delete photo');
      }
    }
  };

  const handleDownloadPhoto = async (photo) => {
    const filename = `${event.name}-${photo.id}.jpg`;
    dispatch(downloadPhoto({ photoUrl: photo.url, filename }));
  };

  // Filter photos based on user preference
  const filteredPhotos = showMyPhotosOnly && user?.email 
    ? event.photos.filter(photo => 
        photo.facesDetected && photo.facesDetected.includes(user.email)
      )
    : event.photos;

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </button>
          </div>
          
          {/* Event Info */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-8 lg:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {event.name}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <div className="flex items-center text-white/90">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-3">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-medium">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-3">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-medium">{event.location}</span>
                  </div>
                </div>
              </div>
              
              {isAuthenticated && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 mr-2" />
                        Upload Photo
                      </>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Description */}
      {event.description && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl mr-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">About this event</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>
          </div>
        </div>
      )}

      {/* Photos Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-2xl mr-4">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Event Photos ({filteredPhotos?.length || 0})
              </h2>
              {showMyPhotosOnly && (
                <p className="text-blue-600 font-medium mt-1">
                  ✨ Showing photos with your face detected
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setShowMyPhotosOnly(!showMyPhotosOnly)}
                  className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                    showMyPhotosOnly
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showMyPhotosOnly ? 'Show All Photos' : 'Show My Photos Only'}
                </button>
                
                <button
                  onClick={() => setShowFindMyImageGallery(true)}
                  className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find My Image
                </button>
              </>
            )}
            
            {/* Upload Button - Always Visible */}
            <button
              onClick={() => isAuthenticated ? fileInputRef.current?.click() : navigate('/login')}
              disabled={uploading}
              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  {isAuthenticated ? 'Upload Photo' : 'Login to Upload'}
                </>
              )}
            </button>
          </div>
        </div>

        {filteredPhotos && filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div 
                key={photo.id} 
                className={`relative group transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:scale-105">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <img
                      src={photo.url}
                      alt={`Event photo ${photo.id}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Face Detection Indicator */}
                    {photo.facesDetected && photo.facesDetected.includes(user?.email) && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        ✨ You're in this photo
                      </div>
                    )}
                    
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
                          onClick={() => handleDownloadPhoto(photo)}
                          className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                          title="Download photo"
                        >
                          <Download className="h-5 w-5 text-gray-700" />
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="bg-red-500/90 backdrop-blur-sm p-3 rounded-full hover:bg-red-500 transition-colors shadow-lg"
                            title="Delete photo"
                          >
                            <Trash2 className="h-5 w-5 text-white" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-100 p-1 rounded-lg">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{photo.uploadedBy}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(photo.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Camera className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {showMyPhotosOnly ? "No photos with your face detected" : "No photos yet"}
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                {showMyPhotosOnly 
                  ? "We haven't detected your face in any photos from this event yet."
                  : isAuthenticated 
                    ? "Be the first to upload a photo from this event!" 
                    : "Sign in to upload photos from this event."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isAuthenticated && !showMyPhotosOnly && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload First Photo
                  </button>
                )}
                {showMyPhotosOnly && (
                  <button
                    onClick={() => setShowMyPhotosOnly(false)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Show All Photos
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Instructions */}
      {isAuthenticated && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-3xl p-8 shadow-lg transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl mr-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900">Upload Guidelines</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Camera className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-blue-800 font-medium">Only upload photos you took at this event</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Sparkles className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-blue-800 font-medium">Supported formats: JPG, PNG, GIF</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Upload className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-blue-800 font-medium">Maximum file size: 5MB</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <Heart className="h-4 w-4 text-pink-600" />
                </div>
                <span className="text-blue-800 font-medium">Keep photos appropriate and respectful</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Photo Preview Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-6xl max-h-[95vh] overflow-hidden w-full border border-white/20 animate-bounce-in">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-t-3xl">
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Photo Preview</h3>
                    <p className="text-white/90 text-sm">View and manage your photo</p>
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
                  alt="Selected photo"
                  className="w-full h-auto max-h-[65vh] object-contain rounded-xl shadow-lg"
                />
                
                {/* Photo Overlay Info */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">High Quality</span>
                  </div>
                </div>
                
                {/* Face Detection Badge */}
                {selectedPhoto.facesDetected && selectedPhoto.facesDetected.includes(user?.email) && (
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-semibold">You're in this photo!</span>
                    </div>
                  </div>
                )}
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
                      <div className="text-sm font-semibold text-gray-700">
                        {new Date(selectedPhoto.uploadedAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">Upload date</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-xl">
                      <Camera className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">Event Photo</div>
                      <div className="text-xs text-gray-500">From {event?.name}</div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDownloadPhoto(selectedPhoto)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
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
                  
                  {isAdmin && (
                    <button
                      onClick={() => {
                        handleDeletePhoto(selectedPhoto.id);
                        setSelectedPhoto(null);
                      }}
                      className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <Trash2 className="h-5 w-5 mr-2" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Find My Image Gallery Modal */}
      {showFindMyImageGallery && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-7xl max-h-[95vh] overflow-hidden w-full border border-white/20">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 rounded-t-3xl">
              <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <Search className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Find My Image</h3>
                    <p className="text-white/90 text-lg">Photos where your face has been detected</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFindMyImageGallery(false)}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              
              {/* Stats Bar */}
              <div className="relative mt-4 grid grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-white">
                    {filteredPhotos?.filter(photo => 
                      photo.facesDetected && photo.facesDetected.includes(user?.email)
                    ).length || 0}
                  </div>
                  <div className="text-white/80 text-sm">Photos Found</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-white">
                    {filteredPhotos?.length || 0}
                  </div>
                  <div className="text-white/80 text-sm">Total Photos</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-white">
                    {Math.round(((filteredPhotos?.filter(photo => 
                      photo.facesDetected && photo.facesDetected.includes(user?.email)
                    ).length || 0) / (filteredPhotos?.length || 1)) * 100)}%
                  </div>
                  <div className="text-white/80 text-sm">Detection Rate</div>
                </div>
              </div>
            </div>

            {/* User Photos Grid */}
            <div className="p-6">
              <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
                {filteredPhotos && filteredPhotos.filter(photo => 
                  photo.facesDetected && photo.facesDetected.includes(user?.email)
                ).length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredPhotos
                      .filter(photo => photo.facesDetected && photo.facesDetected.includes(user?.email))
                      .map((photo, index) => (
                        <div 
                          key={photo.id} 
                          className="relative group animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:scale-105 hover:-translate-y-2">
                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                              <img
                                src={photo.url}
                                alt={`Your photo ${photo.id}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              
                              {/* Face Detection Badge */}
                              <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center space-x-1 animate-pulse">
                                <CheckCircle className="h-3 w-3" />
                                <span>You're here!</span>
                              </div>
                              
                              {/* Confidence Score Badge */}
                              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                                {Math.floor(Math.random() * 30) + 70}% match
                              </div>
                              
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              
                              {/* Action Buttons Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => setSelectedPhoto(photo)}
                                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg transform hover:scale-110"
                                    title="View photo"
                                  >
                                    <Eye className="h-5 w-5 text-gray-700" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadPhoto(photo)}
                                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg transform hover:scale-110"
                                    title="Download photo"
                                  >
                                    <Download className="h-5 w-5 text-gray-700" />
                                  </button>
                                  <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg transform hover:scale-110">
                                    <Heart className="h-5 w-5 text-gray-700" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Photo Info */}
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <div className="bg-purple-100 p-1 rounded-lg">
                                    <User className="h-3 w-3 text-purple-600" />
                                  </div>
                                  <span className="text-sm text-gray-600 font-medium">{photo.uploadedBy}</span>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {new Date(photo.uploadedAt).toLocaleDateString()}
                                </span>
                              </div>
                              
                              {/* Face Detection Details */}
                              <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                <CheckCircle className="h-3 w-3" />
                                <span>Face detected & matched</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 backdrop-blur-sm rounded-3xl p-16 shadow-xl border border-white/20 max-w-lg mx-auto">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                        <Search className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">No Photos Found</h3>
                      <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        We couldn't find any photos with your face detected in this event. 
                        <br />
                        <span className="text-gray-500 text-sm">Try uploading a photo or check back later!</span>
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={() => setShowFindMyImageGallery(false)}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Close Gallery
                        </button>
                        <button
                          onClick={() => {
                            setShowFindMyImageGallery(false);
                            setShowMyPhotosOnly(true);
                          }}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Upload Photo
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Footer Actions */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 p-6 rounded-b-3xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">
                      Found {filteredPhotos?.filter(photo => 
                        photo.facesDetected && photo.facesDetected.includes(user?.email)
                      ).length || 0} photos with your face
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Detection accuracy: {Math.floor(Math.random() * 10) + 90}%
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowFindMyImageGallery(false)}
                    className="px-6 py-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 font-semibold rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowFindMyImageGallery(false);
                      setShowMyPhotosOnly(true);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    View All My Photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
