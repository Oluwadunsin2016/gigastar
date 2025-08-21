import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Building2, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  ExternalLink,
  Youtube,
  Instagram,
  Twitter,
  MessageCircle,
  Facebook,
  DollarSign,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import { useSignupMutation } from '../apis/api';
import { addToast } from '@heroui/react';

const SignUpPage = () => {
  const [activeTab, setActiveTab] = useState('creator');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const tabs = [
    { id: 'creator', label: 'Content Creator', icon: User, color: 'purple' },
    { id: 'brand', label: 'Brand or Company', icon: Building2, color: 'blue' },
    { id: 'fan', label: 'Fan', icon: Heart, color: 'pink' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    reset(); // Clear form when switching tabs
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const mutation = useSignupMutation();

  // const onSubmit = (data) => {
  //   console.log('Form submitted:', { type: activeTab, ...data });
  //   setSubmittedData({ type: activeTab, ...data });
  //   setIsSubmitted(true);
  // };


  const onSubmit = async (data) => {
    // Add account type to payload
    const { confirmPassword, ...rest } = data;
    const payload = {
      ...rest,
      type: activeTab
    };

    try {
      await mutation.mutateAsync(payload);
      
      // Navigate to verification page with email
      navigate('/verify-email', { 
        state: { 
          email: data.email,
        } 
      });
    } catch (error) {
      console.error('Registration failed:', error);
        addToast({
              title: 'Registration Failed!',
              description: error.response.data.message || 'Registeration failed. Please try again.',
              variant: "solid",
              color: "danger",
              radius:'sm',
              timeout: 2000,
            })
    }
  };

  const getTabColor = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    return tab?.color || 'gray';
  };

  const getColorClasses = (color, isActive = false) => {
    const colors = {
      purple: {
        border: isActive ? 'border-purple-500' : 'border-gray-600',
        bg: isActive ? 'bg-purple-500/10' : 'bg-gray-800/50',
        text: isActive ? 'text-white' : 'text-gray-400',
        focus: 'focus:border-purple-500 focus:ring-purple-500',
        button: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
      },
      blue: {
        border: isActive ? 'border-blue-500' : 'border-gray-600',
        bg: isActive ? 'bg-blue-500/10' : 'bg-gray-800/50',
        text: isActive ? 'text-white' : 'text-gray-400',
        focus: 'focus:border-blue-500 focus:ring-blue-500',
        button: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
      },
      pink: {
        border: isActive ? 'border-pink-500' : 'border-gray-600',
        bg: isActive ? 'bg-pink-500/10' : 'bg-gray-800/50',
        text: isActive ? 'text-white' : 'text-gray-400',
        focus: 'focus:border-pink-500 focus:ring-pink-500',
        button: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
      }
    };
    return colors[color] || colors.gray;
  };

  // if (isSubmitted) {
  //   const idTypes = {
  //     creator: 'Content Creator ID',
  //     brand: 'Brand ID',
  //     fan: 'Fans Club ID'
  //   };

  //   return (
  //     <AuthLayout 
  //       title="Registration Successful!" 
  //       subtitle={`Welcome to GigaStar as a ${tabs.find(t => t.id === activeTab)?.label}`}
  //       showBackButton={false}
  //     >
  //       <div className="text-center space-y-6">
  //         <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
  //           <Mail className="w-8 h-8 text-green-400" />
  //         </div>
          
  //         <div className="space-y-2">
  //           <p className="text-gray-300">
  //             A welcome message with your {idTypes[activeTab]} has been sent to:
  //           </p>
  //           <p className="text-white font-medium">{submittedData?.email}</p>
  //         </div>
          
  //         <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
  //           <p className="text-sm text-gray-400 mb-2">Registration Details:</p>
  //           <div className="text-left space-y-1 text-sm">
  //             <p className="text-gray-300">Type: <span className="text-white">{tabs.find(t => t.id === activeTab)?.label}</span></p>
  //             {submittedData?.fullName && <p className="text-gray-300">Name: <span className="text-white">{submittedData.fullName}</span></p>}
  //             {submittedData?.companyName && <p className="text-gray-300">Company: <span className="text-white">{submittedData.companyName}</span></p>}
  //           </div>
  //         </div>
          
  //         <Link 
  //           to="/login"
  //           className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
  //         >
  //           Continue to Login
  //         </Link>
  //       </div>
  //     </AuthLayout>
  //   );
  // }

  return (
    <AuthLayout 
      title="Join GigaStar" 
      subtitle="Choose your account type and get started"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-800/50 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const colors = getColorClasses(tab.color, isActive);
            
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-1 ${colors.border} ${colors.bg} ${colors.text}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium text-center leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Creator Form */}
        {activeTab === 'creator' && (
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('phoneNumber', { required: 'Phone number is required' })}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber.message}</p>}
            </div>

            {/* Business Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Official Business Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  {...register('businessAddress', { required: 'Business address is required' })}
                  rows={3}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors resize-none ${getColorClasses('purple').focus}`}
                  placeholder="Enter your official business address"
                />
              </div>
              {errors.businessAddress && <p className="text-red-400 text-sm mt-1">{errors.businessAddress.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Official Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Social Links (optional)
              </label>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    <input
                      {...register('social_links.youtube')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                      placeholder="YouTube URL"
                    />
                  </div>
                  
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 w-5 h-5" />
                    <input
                      {...register('social_links.instagram')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                      placeholder="Instagram URL"
                    />
                  </div>
                  
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                      {...register('social_links.twitter')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                      placeholder="Twitter URL"
                    />
                  </div>
                  
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('social_links.tiktok')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                      placeholder="TikTok URL"
                    />
                  </div>
                  
                  <div className="relative sm:col-span-2">
                    <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                    <input
                      {...register('social_links.whatsapp')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                      placeholder="WhatsApp Link"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Provide any social links you have (optional)</p>
              </div>
            </div>

            {/* Total Followers */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Total Followers Across All Platforms *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  {...register('totalFollowers', { 
                    required: 'Total followers is required',
                    min: { value: 0, message: 'Must be a positive number' }
                  })}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('purple').focus}`}
                  placeholder="e.g., 10000"
                />
              </div>
              {errors.totalFollowers && <p className="text-red-400 text-sm mt-1">{errors.totalFollowers.message}</p>}
            </div>
          </div>
        )}

        {/* Brand/Company Form */}
        {activeTab === 'brand' && (
          <div className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                {...register('companyName', { required: 'Company name is required' })}
                className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('blue').focus}`}
                placeholder="Enter company name"
              />
              {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName.message}</p>}
            </div>

            {/* Head Office Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Head Office Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  {...register('headOfficeAddress', { required: 'Head office address is required' })}
                  rows={3}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors resize-none ${getColorClasses('blue').focus}`}
                  placeholder="Enter head office address"
                />
              </div>
              {errors.headOfficeAddress && <p className="text-red-400 text-sm mt-1">{errors.headOfficeAddress.message}</p>}
            </div>

            {/* Official Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Official Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('blue').focus}`}
                  placeholder="company@email.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('blue').focus}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('blue').focus}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Contact Person */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Person Name *
                </label>
                <input
                  {...register('contactPersonName', { required: 'Contact person name is required' })}
                  className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('blue').focus}`}
                  placeholder="Contact person"
                />
                {errors.contactPersonName && <p className="text-red-400 text-sm mt-1">{errors.contactPersonName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Person Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('contactPersonPhone', { required: 'Contact person phone is required' })}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('blue').focus}`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.contactPersonPhone && <p className="text-red-400 text-sm mt-1">{errors.contactPersonPhone.message}</p>}
              </div>
            </div>

            {/* Registration Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Is your company registered? *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={true}
                    {...register('isRegistered', { required: 'Please select registration status' })}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-gray-300">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={false}
                    {...register('isRegistered', { required: 'Please select registration status' })}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-gray-300">No</span>
                </label>
              </div>
              {errors.isRegistered && <p className="text-red-400 text-sm mt-1">{errors.isRegistered.message}</p>}
            </div>

            {/* RC Number (conditional) */}
            {watch('isRegistered') && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  RC Number *
                </label>
                <input
                  {...register('rcNumber', { required: 'RC Number is required for registered companies' })}
                  className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('blue').focus}`}
                  placeholder="Enter RC Number"
                />
                {errors.rcNumber && <p className="text-red-400 text-sm mt-1">{errors.rcNumber.message}</p>}
              </div>
            )}

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('website')}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('blue').focus}`}
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>
          </div>
        )}

        {/* Fan Form */}
        {activeTab === 'fan' && (
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('phoneNumber', { required: 'Phone number is required' })}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber.message}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  rows={3}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors resize-none ${getColorClasses('pink').focus}`}
                  placeholder="Enter your address"
                />
              </div>
              {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Social Links (optional)
              </label>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    <input
                      {...register('social_links.youtube')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                      placeholder="YouTube URL"
                    />
                  </div>
                  
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                    <input
                      {...register('social_links.facebook')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                      placeholder="Facebook URL"
                    />
                  </div>
                  
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 w-5 h-5" />
                    <input
                      {...register('social_links.instagram')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                      placeholder="Instagram URL"
                    />
                  </div>
                  
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                    <input
                      {...register('social_links.whatsapp')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                      placeholder="WhatsApp Link"
                    />
                  </div>
                  
                  <div className="relative sm:col-span-2">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('social_links.tiktok')}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                      placeholder="TikTok URL"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Provide any social links you have (optional)</p>
              </div>
            </div>

            {/* Total Followers */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                How many followers altogether? *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  {...register('totalFollowers', { 
                    required: 'Total followers is required',
                    min: { value: 0, message: 'Must be a positive number' }
                  })}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                  placeholder="e.g., 5000"
                />
              </div>
              {errors.totalFollowers && <p className="text-red-400 text-sm mt-1">{errors.totalFollowers.message}</p>}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                How do you want to be paid? *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  {...register('paymentMethod', { required: 'Please select a payment method' })}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-1 transition-colors ${getColorClasses('pink').focus}`}
                >
                  <option value="">Select payment method</option>
                  <option value="data">Data</option>
                  <option value="airtime">Airtime</option>
                  <option value="cash">Cash Deposit</option>
                </select>
              </div>
              {errors.paymentMethod && <p className="text-red-400 text-sm mt-1">{errors.paymentMethod.message}</p>}
            </div>
          </div>
        )}

        {/* Submit Button */}

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full bg-gradient-to-r text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${mutation.isPending ? 'opacity-70 cursor-not-allowed' : 'transform hover:scale-105'} ${getColorClasses(getTabColor(activeTab)).button}`}
        >
          {mutation.isPending ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Registering...</span>
            </>
          ) : (
            <>
              <span>Submit Registration</span>
              <ExternalLink className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-700">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;