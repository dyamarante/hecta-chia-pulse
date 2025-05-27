
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contato from "./pages/Contato";
import Certificacoes from "./pages/Certificacoes";

const queryClient = new QueryClient();

// Loading component for when translations are loading
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-hecta-gold mx-auto mb-4"></div>
      <p className="text-hecta-gray">正在加载...</p>
    </div>
  </div>
);

const App = () => {
  const { ready } = useTranslation(['common', 'certifications'], { useSuspense: false });
  
  // Don't render the app until translations are ready
  if (!ready) {
    return <LoadingScreen />;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Suspense fallback={<LoadingScreen />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/certificacoes" element={<Certificacoes />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
