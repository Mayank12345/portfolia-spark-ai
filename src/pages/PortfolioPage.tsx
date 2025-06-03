
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { type ParsedResume } from "@/utils/resumeParser";
import PortfolioLoading from "@/components/portfolio/PortfolioLoading";
import PortfolioPlaceholder from "@/components/portfolio/PortfolioPlaceholder";
import PortfolioNavigation from "@/components/portfolio/PortfolioNavigation";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioSkills from "@/components/portfolio/PortfolioSkills";
import PortfolioExperience from "@/components/portfolio/PortfolioExperience";
import PortfolioProjects from "@/components/portfolio/PortfolioProjects";
import PortfolioEducation from "@/components/portfolio/PortfolioEducation";
import PortfolioContact from "@/components/portfolio/PortfolioContact";

const PortfolioPage = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState<ParsedResume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }

        console.log('Fetching portfolio for session ID:', userId);

        // Fetch portfolio data from database
        const { data: portfolioData, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('session_id', userId)
          .single();

        if (error) {
          console.error("Error fetching portfolio:", error);
          setPortfolio(null);
        } else if (portfolioData) {
          console.log('Raw portfolio data from database:', portfolioData);
          
          // Convert database format to ParsedResume format with proper type casting
          const formattedPortfolio: ParsedResume = {
            name: portfolioData.name,
            title: portfolioData.title,
            summary: portfolioData.summary,
            skills: portfolioData.skills || [],
            experience: Array.isArray(portfolioData.experience) ? portfolioData.experience as Array<{
              company: string;
              role: string;
              years: string;
              details: string;
            }> : [],
            projects: Array.isArray(portfolioData.projects) ? portfolioData.projects as Array<{
              name: string;
              url: string;
              description: string;
            }> : [],
            contactLinks: Array.isArray(portfolioData.contact_links) ? portfolioData.contact_links as Array<{
              type: string;
              url: string;
            }> : [],
            education: Array.isArray(portfolioData.education) ? portfolioData.education as Array<{
              institution: string;
              degree: string;
              year: string;
            }> : []
          };
          
          console.log('Formatted portfolio data:', formattedPortfolio);
          setPortfolio(formattedPortfolio);
        } else {
          console.log('No portfolio data found');
          setPortfolio(null);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [userId]);

  if (loading) {
    return <PortfolioLoading />;
  }

  if (!portfolio) {
    return <PortfolioPlaceholder />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <PortfolioNavigation />
        <PortfolioHero portfolio={portfolio} />
        <PortfolioSkills skills={portfolio.skills} />
        <PortfolioExperience experience={portfolio.experience} />
        <PortfolioProjects projects={portfolio.projects} />
        <PortfolioEducation education={portfolio.education} />
        <PortfolioContact contactLinks={portfolio.contactLinks} />

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-slate-500">
            Portfolio generated with ❤️ by PortfolioAI
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
