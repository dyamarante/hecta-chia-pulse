
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import CertificationCard from '@/components/certifications/CertificationCard';
import DigitalVerification from '@/components/certifications/DigitalVerification';
import ComplianceTimeline from '@/components/certifications/ComplianceTimeline';
import FaqSection from '@/components/certifications/FaqSection';
import CertificateDownloadDialog from '@/components/certifications/CertificateDownloadDialog';
import { useCertifications } from '@/hooks/useCertifications';

const Certificacoes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(['certifications']);
  const { certifications } = useCertifications();

  const handleRedirectToContact = () => {
    navigate('/contato');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-hecta-gold/10 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hecta-gray mb-6">
            {t('trust_across_borders')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            {t('certifications_description')}
          </p>
          <Button 
            onClick={handleRedirectToContact}
            className="bg-hecta-gold hover:bg-hecta-gold/90 text-white px-6 py-3 text-lg"
          >
            <FileText className="mr-2" />
            {t('download_certificates')}
          </Button>
        </div>
      </section>
      
      {/* Certificates Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
            {t('certification_matrix')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <CertificationCard
                key={cert.id}
                id={cert.id}
                name={cert.name}
                scope={cert.scope}
                benefits={cert.benefits}
                validity={cert.validity}
                auditor={cert.auditor}
                image={cert.image}
                onViewCertificate={handleRedirectToContact}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Blockchain Verification */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <DigitalVerification onDemoClick={handleRedirectToContact} />
        </div>
      </section>
      
      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <ComplianceTimeline />
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <FaqSection />
      </section>
      
      {/* Certificate Download Dialog */}
      <CertificateDownloadDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onDownload={handleRedirectToContact}
      />
    </div>
  );
};

export default Certificacoes;
