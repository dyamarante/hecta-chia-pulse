
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contato from "./pages/Contato";
import Certificacoes from "./pages/Certificacoes";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Add key={i18n.language} to force re-rendering when language changes */}
        <BrowserRouter key={i18n.language}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/certificacoes" element={<Certificacoes />} />
            <Route path="/contato" element={<Contato />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
