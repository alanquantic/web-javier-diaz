import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import { useEffect } from "react";
import { initGA } from "../lib/analytics";
import { useAnalytics } from "../hooks/use-analytics";
import CierraLaVentaYa from "@/pages/courses/CierraLaVentaYa";
import ElPoderDeLasNeuroventas from "@/pages/courses/ElPoderDeLasNeuroventas";
import EmpoderaTuMente from "@/pages/courses/EmpoderaTuMente";
import EnergizateYCambiaTuVida from "@/pages/courses/EnergizateYCambiaTuVida";
import LiderazgoPersonal from "@/pages/courses/LiderazgoPersonal";
import EscuelaDeVendedoresProfesionales from "@/pages/courses/EscuelaDeVendedoresProfesionales";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/courses/escuela-de-vendedores-profesionales" component={EscuelaDeVendedoresProfesionales} />
      <Route path="/courses/cierra-la-venta-ya" component={CierraLaVentaYa} />
      <Route path="/courses/el-poder-de-las-neuroventas" component={ElPoderDeLasNeuroventas} />
      <Route path="/courses/empodera-tu-mente" component={EmpoderaTuMente} />
      <Route path="/courses/energizate-y-cambia-tu-vida" component={EnergizateYCambiaTuVida} />
      <Route path="/courses/liderazgo-personal" component={LiderazgoPersonal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;