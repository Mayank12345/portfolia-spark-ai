
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParsedResume } from "@/utils/resumeParser";
import { getContactIcon } from "@/utils/contactIcons";

interface PortfolioHeroProps {
  portfolio: ParsedResume;
}

const PortfolioHero = ({ portfolio }: PortfolioHeroProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative px-8 py-16 md:px-16 md:py-24">
        <div className="max-w-4xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {portfolio.name}
              </h1>
              <div className="flex items-center gap-3">
                <Briefcase className="h-6 w-6" />
                <h2 className="text-xl md:text-2xl font-medium opacity-90">
                  {portfolio.title}
                </h2>
              </div>
            </div>
            <p className="text-lg md:text-xl leading-relaxed opacity-90 max-w-3xl">
              {portfolio.summary}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {portfolio.contactLinks.slice(0, 3).map((link, index) => (
                <Button 
                  key={index} 
                  variant="secondary" 
                  size="sm" 
                  asChild
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {getContactIcon(link.type)}
                    <span className="ml-2">{link.type}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHero;
