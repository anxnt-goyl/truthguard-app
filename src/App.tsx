import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import TruthGuardApp from "./components/truthguardapp"; // Your login page
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Global notification toasters */}
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* Login page */}
            <Route
              path="/login"
              element={<TruthGuardApp onLogin={() => setIsLoggedIn(true)} />}
            />

            {/* Main page, only accessible after login */}
            <Route
              path="/"
              element={isLoggedIn ? <Index /> : <Navigate to="/login" />}
            />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
