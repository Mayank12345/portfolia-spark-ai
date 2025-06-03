
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Navigate to appropriate page based on auth state
  const handleActionClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

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
          {user && (
            <p className="text-sm text-muted-foreground">
              Welcome back, {user.email}!
            </p>
          )}
        </div>
        
        {/* Dynamic button based on auth state */}
        <div className="pt-4">
          <Button 
            onClick={handleActionClick}
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            {user ? "Go to Dashboard" : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
