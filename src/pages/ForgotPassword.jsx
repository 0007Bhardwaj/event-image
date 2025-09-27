import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearError } from '../store/slices/authSlice';
import { Mail, ArrowLeft, Sparkles, Camera, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error, passwordResetSent, passwordResetEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsVisible(true);
    if (passwordResetSent) {
      setIsSubmitted(true);
    }
  }, [passwordResetSent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(email)).unwrap();
    } catch (error) {
      // Error is handled by Redux
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-10 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse delay-700"></div>

        <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/80 backdrop-blur-lg py-12 px-8 shadow-2xl rounded-3xl border border-white/20 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce-in shadow-lg">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                Check Your Email
              </h2>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We've sent a password reset link to
                <br />
                <span className="font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">{passwordResetEmail || email}</span>
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-xl mt-1">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Check your email inbox (and spam folder)</li>
                      <li>• Click the reset link in the email</li>
                      <li>• Create your new password</li>
                      <li>• Sign in with your new password</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-8">
                <p className="text-sm text-yellow-800">
                  <strong>Demo Note:</strong> This is a demonstration. In a real application, you would receive an actual email with reset instructions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Login
                </Link>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center px-8 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl hover:bg-white transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-lg"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Try Another Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/3 right-10 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse delay-700"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        {/* Header */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Camera className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">EventPhotos</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Forgot Your Password?
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              No worries! Enter your email address and we'll send you a secure link to reset your password.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 backdrop-blur-sm text-gray-500 rounded-full">Remember your password?</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm text-gray-700 font-semibold rounded-xl hover:bg-white/80 transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-lg"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Login
                </Link>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl">
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 p-2 rounded-xl mt-1">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Demo Application</h4>
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    This is a demonstration application. Password reset functionality is not implemented. 
                    In a real application, you would receive an actual email with secure reset instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mt-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                If you're having trouble accessing your account, make sure you're using the correct email address 
                and check your spam folder for any reset emails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
