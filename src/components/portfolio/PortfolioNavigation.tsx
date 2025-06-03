
import { ArrowLeft, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PortfolioNavigation = () => {
  return (
    <div className="flex justify-between items-center">
      <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-white/50">
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Create Another Portfolio
        </Link>
      </Button>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>
  );
};

export default PortfolioNavigation;
