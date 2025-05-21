
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const { t } = useTranslation(['common', 'notfound']);
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-6xl font-bold text-hecta-green mb-4">404</h1>
        <p className="text-2xl text-hecta-gray mb-8">{t('notfound:page_not_found')}</p>
        <p className="text-gray-600 max-w-lg text-center mb-8">
          {t('notfound:page_not_found_description')}
        </p>
        <Button asChild className="bg-hecta-green hover:bg-hecta-lime text-white">
          <a href="/">{t('notfound:back_to_home')}</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
