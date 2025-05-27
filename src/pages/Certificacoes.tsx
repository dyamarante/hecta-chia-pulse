
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { CertificationProvider } from '@/contexts/CertificationContext';
import CertificationsContent from '@/components/certifications/CertificationsContent';

const Certificacoes = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLanguage = i18n.language || 'pt';

  const handleRedirectToContact = () => {
    navigate('/contato');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <CertificationProvider language={currentLanguage}>
        <CertificationsContent onRedirectToContact={handleRedirectToContact} />
      </CertificationProvider>
    </div>
  );
};

export default Certificacoes;
