import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, Link } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  description: string;
  url?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, description, url }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const currentUrl = url || window.location.href;
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedUrl = encodeURIComponent(currentUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=JavierDiazVentas`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  const openShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Share2 className="w-5 h-5 mr-2" />
        Compartir artículo
      </h3>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShare('facebook')}
          className="flex items-center justify-center p-2"
          title="Compartir en Facebook"
        >
          <Facebook className="w-4 h-4 text-blue-600" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShare('twitter')}
          className="flex items-center justify-center p-2"
          title="Compartir en Twitter"
        >
          <Twitter className="w-4 h-4 text-blue-400" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShare('linkedin')}
          className="flex items-center justify-center p-2"
          title="Compartir en LinkedIn"
        >
          <Linkedin className="w-4 h-4 text-blue-700" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShare('whatsapp')}
          className="flex items-center justify-center p-2"
          title="Compartir en WhatsApp"
        >
          <i className="fab fa-whatsapp text-green-600"></i>
        </Button>
        
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center justify-center p-2"
            title="Copiar enlace"
          >
            <Link className="w-4 h-4" />
          </Button>
          
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-sm px-2 py-1 rounded">
              ¡Copiado!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;