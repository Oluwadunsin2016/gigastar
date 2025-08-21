// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check for stored user data on app load
//     const storedUser = localStorage.getItem('gigastar_user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem('gigastar_user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('gigastar_user');
//   };

//   const updateProfile = (updatedData) => {
//     const updatedUser = { ...user, ...updatedData };
//     setUser(updatedUser);
//     localStorage.setItem('gigastar_user', JSON.stringify(updatedUser));
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     updateProfile,
//     isAuthenticated: !!user,
//     isLoading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import http from '../apis/http';
import { useGetProfile } from '../apis/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  // const [token, setToken] = useState(localStorage.getItem('gigastarToken') || null);

  // Fetch user profile when token changes
  // const { 
  //   data: userData, 
  //   isLoading: isProfileLoading,
  //   refetch: refetchProfile 
  // } = useQuery({
  //   queryKey: ['profile', token],
  //   queryFn: async () => {
  //     if (!token) return null;
  //     const response = await http.get('/auth/profile');
  //     return response.data.user;
  //   },
  //   enabled: !!token, // Only run if token exists
  //   staleTime: 5 * 60 * 1000, // 5 minutes cache
  //   retry: false,
  // });
    const { 
      data: userData, 
      isLoading,
      refetch: refetchProfile 
    } = useGetProfile();

  // Update state when profile data changes
  useEffect(() => {
    console.log('User data fetched:', userData);
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  // Initialize auth state on app load
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('gigastarToken');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  const login = async (currentUser,token) => {
    setUser(currentUser);
    localStorage.setItem('gigastarToken', token);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('gigastarToken');
    setUser(null);
    navigate('/');
  };

  // const updateProfile = async (updatedData) => {
  //   // Optimistic UI update
  //   setUser(prev => ({ ...prev, ...updatedData }));
    
  //   // Then update on server
  //   try {
  //     await http.patch('/auth/profile', updatedData);
  //     await refetchProfile();
  //   } catch (error) {
  //     // Revert on error
  //     setUser(user);
  //     console.error('Profile update failed:', error);
  //   }
  // };

  const value = {
    user,
    // token,
    login,
    logout,
    // updateProfile,
    refetchProfile,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};