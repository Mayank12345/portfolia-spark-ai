
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PortfolioPage from "./pages/PortfolioPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Home route - displays welcome message and dynamic button */}
            <Route path="/" element={<Home />} />
            {/* Login route - magic-link authentication */}
            <Route path="/login" element={<Login />} />
            {/* Dashboard route - protected page for authenticated users */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Portfolio route - read-only portfolio page */}
            <Route path="/portfolio/:userId" element={<PortfolioPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
