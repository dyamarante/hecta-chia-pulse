
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-6xl font-bold text-hecta-green mb-4">404</h1>
        <p className="text-2xl text-hecta-gray mb-8">Página não encontrada</p>
        <p className="text-gray-600 max-w-lg text-center mb-8">
          A página que você está procurando pode ter sido removida, renomeada ou 
          está temporariamente indisponível.
        </p>
        <Button asChild className="bg-hecta-green hover:bg-hecta-lime text-white">
          <a href="/">Voltar para Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
