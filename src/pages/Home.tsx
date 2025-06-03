
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Navigate to login page when button is clicked
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Welcome heading with modern typography */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            PortfolioAI
          </h1>
          <p className="text-lg text-muted-foreground max-w-sm mx-auto">
            Transform your resume into a stunning portfolio with the power of AI
          </p>
        </div>
        
        {/* Login button using Shadcn UI component */}
        <div className="pt-4">
          <Button 
            onClick={handleLoginClick}
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
