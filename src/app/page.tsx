import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "../main/Index";

// const queryClient = new QueryClient();

const Home= () => (
  // <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Index/>
    </TooltipProvider>
  // </QueryClientProvider>
);

export default Home;
