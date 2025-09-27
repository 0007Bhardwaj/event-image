import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmSignUp, resendConfirmationCode, clearConfirmation } from '../store/slices/authSlice';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader, Sparkles, Camera } from 'lucide-react';

const ConfirmSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirmationEmail, isLoading, error, requiresConfirmation } = useSelector((state) => state.auth);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (!confirmationEmail) {
      navigate('/register');
    }
  }, [confirmationEmail, navigate]);

  // Redirect to login page after successful verification
  useEffect(() => {
    if (!requiresConfirmation && !confirmationEmail && !isLoading) {
      setIsVerified(true);
      // Show success message for 2 seconds before redirecting
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [requiresConfirmation, confirmationEmail, isLoading, navigate]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (confirmationCode.length === 6) {
      dispatch(confirmSignUp({ email: confirmationEmail, confirmationCode }));
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    await dispatch(resendConfirmationCode(confirmationEmail));
    setIsResending(false);
  };

  const handleBackToRegister = () => {
    dispatch(clearConfirmation());
    navigate('/register');
  };

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
              Verify Your Email
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              We've sent a verification code to
              <br />
              <span className="font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">{confirmationEmail}</span>
            </p>
          </div>
        </div>

        {/* Success Message */}
        {isVerified && (
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-green-50/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-green-200">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Email Verified!</h2>
                <p className="text-green-700 mb-4">
                  Your email has been successfully verified. You can now sign in to your account.
                </p>
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Redirecting to login...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        {!isVerified && (
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">
            <form className="space-y-6" onSubmit={handleConfirm}>
              {/* Confirmation Code Input */}
              <div>
                <label htmlFor="confirmationCode" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>Verification Code</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmationCode"
                    name="confirmationCode"
                    type="text"
                    maxLength="6"
                    required
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg text-center tracking-widest"
                    placeholder="000000"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Enter the 6-digit code from your email
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-100 p-2 rounded-xl mt-1">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Verification Failed</h4>
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading || confirmationCode.length !== 6}
                  className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Verify Email
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendCode}
                disabled={isResending}
                className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm text-gray-700 font-semibold rounded-xl hover:bg-white/80 transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-lg disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5 mr-2" />
                    Resend Code
                  </>
                )}
              </button>
            </div>

            {/* Back to Register */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 backdrop-blur-sm text-gray-500 rounded-full">Need to change email?</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleBackToRegister}
                  className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm text-gray-700 font-semibold rounded-xl hover:bg-white/80 transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-lg"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Register
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Additional Info */}
        {!isVerified && (
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mt-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Check Your Email</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The verification code has been sent to your email address. 
                Check your inbox and spam folder if you don't see it.
              </p>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmSignUp;
