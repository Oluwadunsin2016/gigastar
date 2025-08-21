import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { Mail, Check, RotateCw } from 'lucide-react';
import { useVerifyEmailMutation, useResendOtpMutation } from '../apis/api';
import { useAuth } from '../contexts/AuthContext';
import { addToast } from '@heroui/react';

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef([]);
  const [isVerified, setIsVerified] = useState(false);
  const { login,user } = useAuth();
  
  // Get email from navigation state
  const email = location.state?.email || '';
  
  const verifyMutation = useVerifyEmailMutation();
  const resendMutation = useResendOtpMutation();

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handle OTP change
  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move to next input if a digit was entered
      if (value !== '' && index < 5) {
        setActiveInput(index + 1);
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        }
      }
      
      // Check if all digits are filled
      const otpString = newOtp.join('');
      if (otpString.length === 6) {
        handleVerify(otpString);
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace
      setActiveInput(index - 1);
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      setActiveInput(5);
      handleVerify(pasteData);
    }
  };

  // Verify OTP
  const handleVerify = async (otpString) => {
    try {
      const {data} = await verifyMutation.mutateAsync({ email, otp: otpString });
      login(data.user, data.token);
      setIsVerified(true);
    if (user) {
        addToast({
              title: 'Verified!',
              description: error.response.data.message || 'Verification successful. Please try again.',
              variant: "solid",
              color: "success",
              radius:'sm',
              timeout: 2000,
            })
      navigate('/'); 
    }
    } catch (error) {
      // console.error('Verification failed:', error);
        addToast({
              title: 'Verification Failed',
              description: error.response.data.message || 'Verification failed. Please try again.',
              variant: "solid",
              color: "danger",
              radius:'sm',
              timeout: 2000,
            })
      
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      setActiveInput(0);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      await resendMutation.mutateAsync({ email });
      setOtp(['', '', '', '', '', '']);
      setActiveInput(0);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error('Resend failed:', error);
    }
  };

  if (isVerified) {
    return (
      <AuthLayout 
        title="Email Verified!" 
        subtitle="Your account has been successfully verified"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          
          <p className="text-gray-300">
            You're being redirected to your dashboard...
          </p>
          
          <div className="pt-4">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Go to Dashboard Now
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Verify Your Email" 
      subtitle={`Enter the 6-digit code sent to ${email}`}
    >
      <form className="space-y-6">
        {verifyMutation.isError && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-300 rounded-lg text-center">
            {verifyMutation.error?.response?.data?.message || 'Verification failed. Please try again.'}
          </div>
        )}
        
        {resendMutation.isSuccess && (
          <div className="mb-4 p-3 bg-green-500/10 text-green-300 rounded-lg text-center">
            New verification code sent to your email
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={() => setActiveInput(index)}
                maxLength={1}
                className={`w-12 h-12 text-center text-xl bg-gray-800 border ${
                  index === activeInput ? 'border-green-500' : 'border-gray-600'
                } rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-green-500 transition-colors`}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>
          
          <p className="text-xs text-gray-400 text-center">
            Enter the 6-digit verification code sent to your email
          </p>
        </div>
        
        <div className="text-center pt-4 border-t border-gray-700">
          <p className="text-gray-400">
            Didn't receive the code?{' '}
            <button 
              type="button"
              onClick={handleResend}
              disabled={resendMutation.isPending}
              className="text-green-400 hover:text-green-300 font-medium transition-colors disabled:opacity-50"
            >
              {resendMutation.isPending ? (
                <span className="inline-flex items-center">
                  <RotateCw className="w-4 h-4 mr-1 animate-spin" />
                  Sending...
                </span>
              ) : (
                'Resend Code'
              )}
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyEmailPage;