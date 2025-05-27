
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useCertificationContext } from '@/contexts/CertificationContext';
import { useTranslation } from 'react-i18next';
import CertificationCard from './CertificationCard';
import DigitalVerification from './DigitalVerification';
import ComplianceTimeline from './ComplianceTimeline';
import FaqSection from './FaqSection';
import ProductShowcase from '../ProductShowcase';

interface CertificationsContentProps {
  onRedirectToContact: () => void;
}

const CertificationsContent: React.FC<CertificationsContentProps> = ({ onRedirectToContact }) => {
  const { translations, isLoading } = useCertificationContext();
  const { t } = useTranslation(['home']);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-hecta-gold mx-auto mb-4"></div>
          <p className="text-hecta-gray">Carregando certificações...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-hecta-gold/10 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hecta-gray mb-6">
            {translations.trust_across_borders}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            {translations.certifications_description}
          </p>
          <Button 
            onClick={onRedirectToContact}
            className="bg-hecta-gold hover:bg-hecta-gold/90 text-white px-6 py-3 text-lg"
          >
            <FileText className="mr-2" />
            {translations.download_certificates}
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-hecta-gray mb-6 text-center">
            {t('home:global_reference')}
          </h2>
          <p className="text-lg text-gray-700 mb-10 text-center max-w-3xl mx-auto">
            {t('home:company_description_long')}
          </p>
          <ProductShowcase />
        </div>
      </section>
      
      {/* Certificates Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
            {translations.certification_matrix}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {translations.certifications.map((cert) => (
              <CertificationCard
                key={cert.id}
                certification={cert}
                onViewCertificate={onRedirectToContact}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Blockchain Verification */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <DigitalVerification onDemoClick={onRedirectToContact} />
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <ComplianceTimeline />
      </section>
      
      <section className="py-16">
        <FaqSection />
      </section>
    </>
  );
};

export default CertificationsContent;
