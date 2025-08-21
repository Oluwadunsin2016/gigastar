import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroUIProvider } from '@heroui/react';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <HeroUIProvider>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
       </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
);