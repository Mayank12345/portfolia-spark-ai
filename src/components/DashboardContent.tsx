
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, User, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ResumeUploader from "./ResumeUploader";

interface DashboardContentProps {
  userEmail: string;
}

const DashboardContent = ({ userEmail }: DashboardContentProps) => {
  const [portfolioId, setPortfolioId] = useState<string | null>(null);

  const handleUploadSuccess = (newPortfolioId: string) => {
    setPortfolioId(newPortfolioId);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <User className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Create Your Portfolio</h1>
            <p className="text-muted-foreground text-lg">
              Transform your resume into a stunning portfolio website
            </p>
          </div>
        </div>
      </div>

      {/* Resume Upload Section */}
      <div className="space-y-6">
        <ResumeUploader onUploadSuccess={handleUploadSuccess} />
        
        {portfolioId && (
          <Card className="p-6 border-green-200 bg-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Portfolio Ready!</h3>
                  <p className="text-green-600">Your portfolio has been generated successfully</p>
                </div>
              </div>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link to={`/portfolio/${portfolioId}`}>
                  View Portfolio
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Features Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 text-center">
          <Settings className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">AI-Powered</h3>
          <p className="text-sm text-muted-foreground">
            Our AI analyzes your resume and creates a personalized portfolio
          </p>
        </Card>

        <Card className="p-6 text-center">
          <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Instant Generation</h3>
          <p className="text-sm text-muted-foreground">
            Get your portfolio ready in seconds, no manual work required
          </p>
        </Card>

        <Card className="p-6 text-center">
          <User className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Professional Design</h3>
          <p className="text-sm text-muted-foreground">
            Clean, modern design that showcases your skills professionally
          </p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
