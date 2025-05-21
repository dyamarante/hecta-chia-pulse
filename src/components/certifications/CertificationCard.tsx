
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
import { useTranslation } from 'react-i18next';

interface CertificationCardProps {
  id: string;
  name: string;
  scope: string;
  benefits: string[];
  validity: string;
  auditor: string;
  image: string;
  onViewCertificate: () => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  id,
  name,
  scope,
  benefits,
  validity,
  auditor,
  image,
  onViewCertificate
}) => {
  const { t } = useTranslation(['certifications']);

  return (
    <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 bg-white h-24 flex items-center justify-center border-b">
        <img 
          src={image} 
          alt={`${name} logo`} 
          className="max-h-16 max-w-full object-contain"
        />
      </div>
      <CardHeader className="pb-2">
        <Badge variant="outline" className="mb-2 bg-hecta-green/10 border-hecta-green/30 text-hecta-gray w-fit">
          {scope}
        </Badge>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 font-semibold mb-2">{t('key_benefits')}</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          {benefits.map((benefit, i) => (
            <li key={i} className="text-sm text-gray-600">{benefit}</li>
          ))}
        </ul>
        <div className="text-sm text-gray-500">
          <p><span className="font-medium">{t('validity')}</span> {validity}</p>
          <p><span className="font-medium">{t('auditor')}</span> {auditor}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="w-full border-hecta-gold text-hecta-gold hover:bg-hecta-gold/10"
          onClick={onViewCertificate}
        >
          {t('view_certificate')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CertificationCard;
