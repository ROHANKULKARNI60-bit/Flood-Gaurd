import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RadioNav from "@/components/RadioNav";
import Index from "./pages/Index";
import WardReadinessPage from "./pages/WardReadinessPage";
import AlertsPage from "./pages/AlertsPage";
import NotFound from "./pages/NotFound";
import SimulationPage from "./pages/SimulationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RadioNav />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/ward-readiness" element={<WardReadinessPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
