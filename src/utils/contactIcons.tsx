
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

export const getContactIcon = (type: string) => {
  const iconType = type.toLowerCase();
  if (iconType.includes('email') || iconType.includes('mail')) return <Mail className="h-4 w-4" />;
  if (iconType.includes('phone')) return <Phone className="h-4 w-4" />;
  if (iconType.includes('location') || iconType.includes('address')) return <MapPin className="h-4 w-4" />;
  if (iconType.includes('website') || iconType.includes('portfolio')) return <Globe className="h-4 w-4" />;
  return <ExternalLink className="h-4 w-4" />;
};
