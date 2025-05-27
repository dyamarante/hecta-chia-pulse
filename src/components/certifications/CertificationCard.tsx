
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useCertificationContext } from '@/contexts/CertificationContext';
import { Certification } from '@/contexts/CertificationContext';

interface CertificationCardProps {
  certification: Certification;
  onViewCertificate: () => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  onViewCertificate
}) => {
  const { translations } = useCertificationContext();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 bg-white h-24 flex items-center justify-center border-b">
        <img 
          src={certification.image} 
          alt={`${certification.name} logo`} 
          className="max-h-16 max-w-full object-contain"
        />
      </div>
      <CardHeader className="pb-2">
        <Badge variant="outline" className="mb-2 bg-hecta-green/10 border-hecta-green/30 text-hecta-gray w-fit">
          {certification.scope}
        </Badge>
        <CardTitle>{certification.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 font-semibold mb-2">{translations.key_benefits}</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          {certification.benefits.map((benefit, i) => (
            <li key={i} className="text-sm text-gray-600">{benefit}</li>
          ))}
        </ul>
        <div className="text-sm text-gray-500">
          <p><span className="font-medium">{translations.validity}</span> {certification.validity}</p>
          <p><span className="font-medium">{translations.auditor}</span> {certification.auditor}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="w-full border-hecta-gold text-hecta-gold hover:bg-hecta-gold/10"
          onClick={onViewCertificate}
        >
          {translations.view_certificate}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CertificationCard;
