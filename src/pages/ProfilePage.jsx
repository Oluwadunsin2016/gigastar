import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Building2, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  Camera,
  Edit3,
  Youtube,
  Instagram,
  Twitter,
  MessageCircle,
  Facebook,
  DollarSign,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { useFollowers } from '../hooks/useSocialFollowers';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isLoading, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);

  const totalFollowers = useFollowers(user?.social_links || {});

  // Skeleton Loader Component
  const SkeletonLoader = ({ className = "", children }) => (
    <div className={`animate-pulse ${className}`}>
      {children || <div className="bg-gray-700 rounded h-full" />}
    </div>
  );

  // Skeleton for Profile Header
  const ProfileHeaderSkeleton = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Profile Image Skeleton */}
        <div className="relative">
          <SkeletonLoader className="w-32 h-32 rounded-full overflow-hidden" />
          <SkeletonLoader className="absolute bottom-0 right-0 w-10 h-10 rounded-full" />
        </div>

        {/* Profile Info Skeleton */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <SkeletonLoader className="h-6 w-40 mx-auto md:mx-0" />
          <SkeletonLoader className="h-8 w-56 mx-auto md:mx-0" />
          <SkeletonLoader className="h-4 w-64 mx-auto md:mx-0" />
          <SkeletonLoader className="h-10 w-32 mx-auto md:mx-0" />
        </div>
      </div>
    </div>
  );

  // Skeleton for Profile Content Section
  const ProfileSectionSkeleton = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 space-y-4">
        <SkeletonLoader className="h-6 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <SkeletonLoader className="h-4 w-32" />
              <SkeletonLoader className="h-5 w-44" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <SkeletonLoader className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <SkeletonLoader key={i} className="h-12 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div>
        {/* Background Effects Skeleton */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <ProfileHeaderSkeleton />
          <ProfileSectionSkeleton />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setProfileImage(imageUrl);
        updateProfile({ profileImage: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const getProfileIcon = () => {
    switch (user.type) {
      case 'creator':
        return <User className="w-6 h-6 text-purple-400" />;
      case 'brand':
        return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'fan':
        return <Heart className="w-6 h-6 text-pink-400" />;
      default:
        return <User className="w-6 h-6 text-gray-400" />;
    }
  };

  const getProfileColor = () => {
    switch (user.type) {
      case 'creator':
        return 'purple';
      case 'brand':
        return 'blue';
      case 'fan':
        return 'pink';
      default:
        return 'gray';
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: 'from-purple-500 to-purple-600',
      blue: 'from-blue-500 to-blue-600',
      pink: 'from-pink-500 to-pink-600',
      gray: 'from-gray-500 to-gray-600'
    };
    return colors[color] || colors.gray;
  };

  const renderSocialLinks = () => {
    const socialPlatforms = [
      { key: 'youtube', icon: Youtube, label: 'YouTube', color: 'text-red-500' },
      { key: 'instagram', icon: Instagram, label: 'Instagram', color: 'text-pink-500' },
      { key: 'twitter', icon: Twitter, label: 'Twitter', color: 'text-blue-400' },
      { key: 'facebook', icon: Facebook, label: 'Facebook', color: 'text-blue-600' },
      { key: 'tiktok', icon: Globe, label: 'TikTok', color: 'text-gray-400' },
      { key: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: 'text-green-500' }
    ];

    const userSocialLinks = socialPlatforms.filter(platform => user?.social_links?.[platform.key]);

    if (userSocialLinks.length === 0) return null;

    return (
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Social Media Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {userSocialLinks.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.key}
                href={user?.social_links[platform.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Icon className={`w-5 h-5 ${platform.color}`} />
                <span className="text-gray-300">{platform.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCreatorProfile = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
            <p className="text-white">{user.fullName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
            <p className="text-white flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              {user.phoneNumber}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Business Address</label>
            <p className="text-white flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-1" />
              {user.businessAddress}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <p className="text-white flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              {user.email}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Total Followers</label>
            <p className="text-white flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              {user.totalFollowers?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      {renderSocialLinks()}
    </div>
  );

  const renderBrandProfile = () => (
    <div className="space-y-6">
      {/* Company Info */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
            <p className="text-white">{user.companyName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Registration Status</label>
            <p className="text-white flex items-center">
              {user.isRegistered === 'yes' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Registered
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2 text-red-400" />
                  Not Registered
                </>
              )}
            </p>
          </div>
          {user.rcNumber && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">RC Number</label>
              <p className="text-white">{user.rcNumber}</p>
            </div>
          )}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Head Office Address</label>
            <p className="text-white flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-1" />
              {user.headOfficeAddress}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <p className="text-white flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              {user.email}
            </p>
          </div>
          {user.website && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Website</label>
              <a 
                href={user.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" />
                {user.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Contact Person */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Contact Person</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <p className="text-white">{user.contactPersonName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
            <p className="text-white flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              {user.contactPersonPhone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFanProfile = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
            <p className="text-white">{user.fullName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
            <p className="text-white flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              {user.phoneNumber}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
            <p className="text-white flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-1" />
              {user.address}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <p className="text-white flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              {user.email}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Total Followers</label>
            <p className="text-white flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              {user.totalFollowers?.toLocaleString()}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Payment Method</label>
            <p className="text-white flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
              {user.paymentMethod?.charAt(0).toUpperCase() + user.paymentMethod?.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      {renderSocialLinks()}
    </div>
  );

  const renderProfileContent = () => {
    switch (user.type) {
      case 'creator':
        return renderCreatorProfile();
      case 'brand':
        return renderBrandProfile();
      case 'fan':
        return renderFanProfile();
      default:
        return <div className="text-gray-400">Unknown user type</div>;
    }
  };

  const getUserTypeLabel = () => {
    switch (user.type) {
      case 'creator':
        return 'Content Creator';
      case 'brand':
        return 'Brand/Company';
      case 'fan':
        return 'Fan';
      default:
        return 'User';
    }
  };

  return (
    <div>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 border-4 border-gray-600">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getProfileIcon()}
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer transition-colors border-2 border-gray-800">
                <Camera className="w-5 h-5 text-gray-300" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                {getProfileIcon()}
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getColorClasses(getProfileColor())} text-white`}>
                  {getUserTypeLabel()}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.fullName || user.companyName}
              </h1>
              <p className="text-gray-400 mb-4">{user.email}</p>
              
        <div className='space-x-2'>
        <Link 
              to="/brand/request" 
              className="inline-flex items-center border border-gray-400 py-1.5 px-2 rounded-lg text-gray-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go to Dashboard
            </Link>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
        </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        {renderProfileContent()}
      </div>
    </div>
  );
};

export default ProfilePage;