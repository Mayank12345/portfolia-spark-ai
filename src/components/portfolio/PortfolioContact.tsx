
import { Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getContactIcon } from "@/utils/contactIcons";

interface ContactLink {
  type: string;
  url: string;
}

interface PortfolioContactProps {
  contactLinks: ContactLink[];
}

const PortfolioContact = ({ contactLinks }: PortfolioContactProps) => {
  return (
    <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white border-0 shadow-xl">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Let's Connect</CardTitle>
            <CardDescription className="text-blue-100">Ready to collaborate? Let's get in touch!</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contactLinks.map((link, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="justify-start h-auto p-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-200" 
              asChild
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                {getContactIcon(link.type)}
                <div className="text-left">
                  <div className="font-medium">{link.type}</div>
                  <div className="text-sm opacity-75 truncate">
                    {link.url.replace(/^(mailto:|https?:\/\/)/, '')}
                  </div>
                </div>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioContact;
