import React from "react";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import RootLayout from "./layouts/RootLayout";
import { ToastProvider } from "@heroui/react";
import BrandDashboard from "./pages/BrandDashboard/BrandDashboard";
import Request from "./pages/BrandDashboard/pages/Request";
import ProductVirality from "./pages/BrandDashboard/pages/ProductVirality";
import ContentCreatorHub from "./pages/BrandDashboard/pages/ContentCreatorHub";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/brand" element={<BrandDashboard />}>
  <Route path="request" element={<Request />} />
  <Route path="product-virality" element={<ProductVirality />} />
  <Route path="content-creator-hub" element={<ContentCreatorHub />} />
  <Route
    path="*"
    element={
      <div className="p-6">
        <div className="bg-gray-900 rounded-lg shadow-md flex items-center justify-center p-6">
            <p className="text-gray-500">
              The content for this page is coming soon
            </p>
        </div>
      </div>
    }
  />
</Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Routes>
      <ToastProvider
        placement="top-right"
        toastProps={{
          classNames: {
            title: "text-white",
            description: "text-white",
            icon: "text-white",
          },
        }}
      />
    </div>
  );
}

export default App;
