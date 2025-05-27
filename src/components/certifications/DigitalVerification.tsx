
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, QrCode, Clock } from 'lucide-react';
import { useCertificationContext } from '@/contexts/CertificationContext';

interface DigitalVerificationProps {
  onDemoClick: () => void;
}

const DigitalVerification: React.FC<DigitalVerificationProps> = ({ onDemoClick }) => {
  const { translations } = useCertificationContext();

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center">
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold text-hecta-gray mb-6">
          {translations.digital_verification}
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          {translations.digital_verification_description}
        </p>
        <ul className="space-y-4 mb-8">
          {[
            { icon: <FileText />, text: translations.certificate_pdf },
            { icon: <QrCode />, text: translations.lab_results },
            { icon: <Clock />, text: translations.blockchain_timestamp }
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="mt-1 mr-3 text-hecta-gold">
                {item.icon}
              </div>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <Button 
          className="bg-hecta-green hover:bg-hecta-green/90 text-white"
          onClick={onDemoClick}
        >
          <QrCode className="mr-2" />
          {translations.qr_demo}
        </Button>
      </div>
      <div className="lg:w-1/2 flex justify-center">
        <div className="bg-white border rounded-lg overflow-hidden shadow-lg p-8 max-w-md w-full">
          <div className="border-4 border-dashed border-gray-200 p-6 flex justify-center items-center mb-6">
            <QrCode size={180} className="text-hecta-gray" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">{translations.batch}</span>
              <span className="font-medium">HCT-BR-2024-05781</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">{translations.harvest}</span>
              <span className="font-medium">Maio 2024</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">{translations.blockchain_hash}</span>
              <span className="font-medium text-xs">0x7fE5...93c1</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">{translations.verified}</span>
              <Badge className="bg-green-500">{translations.authentic}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalVerification;
