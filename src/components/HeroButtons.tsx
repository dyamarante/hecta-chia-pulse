
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeroButtonsProps {
  scrollToMarketAnalysis: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollToMarketAnalysis }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['home']);

  const handleContactClick = () => {
    navigate('/contato');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <Button 
        className="bg-hecta-green hover:bg-hecta-green/90 text-white min-w-[180px]"
        onClick={scrollToMarketAnalysis}
      >
        {t('home:market_analysis_button')}
      </Button>
      <Button 
        variant="outline" 
        className="border-hecta-green text-hecta-green hover:bg-hecta-green/10 min-w-[180px]"
        onClick={handleContactClick}
      >
        {t('home:contact_button')}
      </Button>
    </div>
  );
};

export default HeroButtons;
