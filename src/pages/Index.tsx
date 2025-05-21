
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MarketAnalysisTabs from '@/components/MarketAnalysisTabs';
import { Button } from '@/components/ui/button';
import HectaLogo from '@/components/HectaLogo';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'home']);
  
  const scrollToMarketAnalysis = () => {
    const marketSection = document.querySelector('#market-analysis-section');
    if (marketSection) {
      marketSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToContact = () => {
    navigate('/contato');
  };
  
  return <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero scrollToMarketAnalysis={scrollToMarketAnalysis} />
        
        <section className="py-16 bg-gray-50 market-analysis-section" id="market-analysis-section">
          <div className="container mx-auto px-4">
            <MarketAnalysisTabs />
            
            <div className="mt-12 text-center">
              
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-hecta-gray mb-4">
                  {t('home:global_reference')}
                </h2>
                <p className="text-gray-700 mb-6">
                  {t('home:company_description_long')}
                </p>
                <ul className="space-y-3">
                  {[
                    t('home:key_point_1'), 
                    t('home:key_point_2'), 
                    t('home:key_point_3'), 
                    t('home:key_point_4')
                  ].map((item, index) => <li key={index} className="flex items-start">
                      <span className="text-hecta-green mr-2">✓</span>
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-hecta-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {t('home:platform_title')}
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              {t('home:platform_description')}
            </p>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-hecta-green"
              onClick={() => window.open('https://www.hecta-pay-hub.com', '_blank')}
            >
              {t('home:platform_button')}
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-hecta-gray text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4 bg-white p-3 rounded-lg inline-block">
                <HectaLogo className="h-8" />
              </div>
              <p className="mb-4">
                {t('common:footer_description')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-hecta-lime">LinkedIn</a>
                <a href="#" className="hover:text-hecta-lime">Twitter</a>
                <a href="#" className="hover:text-hecta-lime">Instagram</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t('common:global_offices')}</h3>
              <ul className="space-y-2">
                <li>{t('common:office_curitiba')}</li>
                <li>{t('common:office_saopaulo')}</li>
                <li>{t('common:office_asuncion')}</li>
                <li>{t('common:office_qingdao')}</li>
                <li>{t('common:office_newyork')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t('common:contact')}</h3>
              <p className="mb-2">contato@hectachia.com</p>
              <p className="mb-4">+55 (41) 3000-0000</p>
              <Button 
                className="bg-hecta-lime hover:bg-white hover:text-hecta-green"
                onClick={navigateToContact}
              >
                {t('common:contact_us')}
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>{t('common:copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;
