import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastNotificationProvider } from './context/ToastNotificationContext.tsx';
import { WorktimeSessionProvider } from './context/WorktimeSessionContext.tsx';

const queryClient = new QueryClient;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastNotificationProvider>
          <AuthProvider>
            <WorktimeSessionProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </WorktimeSessionProvider>
          </AuthProvider>
        </ToastNotificationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
