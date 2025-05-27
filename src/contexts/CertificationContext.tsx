
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Certification {
  id: string;
  name: string;
  scope: string;
  benefits: string[];
  validity: string;
  auditor: string;
  image: string;
}

interface CertificationTranslations {
  trust_across_borders: string;
  certifications_description: string;
  download_certificates: string;
  certification_matrix: string;
  key_benefits: string;
  validity: string;
  auditor: string;
  view_certificate: string;
  digital_verification: string;
  digital_verification_description: string;
  certificate_pdf: string;
  lab_results: string;
  blockchain_timestamp: string;
  qr_demo: string;
  batch: string;
  harvest: string;
  blockchain_hash: string;
  verified: string;
  authentic: string;
  compliance_timeline: string;
  faq: string;
  certifications: Certification[];
  timeline: Array<{ year: string; event: string }>;
  faqItems: Array<{ question: string; answer: string }>;
}

interface CertificationContextType {
  translations: CertificationTranslations;
  isLoading: boolean;
  currentLanguage: string;
}

const CertificationContext = createContext<CertificationContextType | undefined>(undefined);

export const useCertificationContext = () => {
  const context = useContext(CertificationContext);
  if (!context) {
    throw new Error('useCertificationContext must be used within CertificationProvider');
  }
  return context;
};

export const CertificationProvider: React.FC<{ children: React.ReactNode; language: string }> = ({ 
  children, 
  language 
}) => {
  const [translations, setTranslations] = useState<CertificationTranslations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const { getCertificationTranslations } = await import('../data/certificationTranslations');
        const data = getCertificationTranslations(language);
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load certification translations:', error);
        // Fallback to English
        const { getCertificationTranslations } = await import('../data/certificationTranslations');
        const data = getCertificationTranslations('en');
        setTranslations(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  if (!translations) {
    return <div>Loading...</div>;
  }

  return (
    <CertificationContext.Provider value={{ 
      translations, 
      isLoading, 
      currentLanguage: language 
    }}>
      {children}
    </CertificationContext.Provider>
  );
};
