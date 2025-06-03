
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PortfolioPlaceholder = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center justify-center gap-6 px-4">
      <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
        <User className="h-8 w-8 text-blue-600" />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-slate-700">Portfolio generation in progress</h1>
        <p className="text-slate-500">Check back in a few minutes after the résumé is parsed.</p>
      </div>
      <Button asChild variant="outline" className="bg-white hover:bg-slate-50">
        <Link to="/dashboard">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </Button>
    </main>
  );
};

export default PortfolioPlaceholder;
