
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  // Navigate back to home page
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Back button */}
        <div className="flex justify-start">
          <Button 
            variant="ghost" 
            onClick={handleBackClick}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Login placeholder content */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Login
          </h1>
          <p className="text-muted-foreground">
            Login functionality will be implemented here
          </p>
          <div className="pt-4">
            <div className="bg-muted rounded-lg p-8 text-center">
              <p className="text-sm text-muted-foreground">
                🚧 Login form coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
