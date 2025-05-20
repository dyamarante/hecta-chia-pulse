
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return <div className="relative min-h-screen flex items-center pt-20">
      {/* Background Gradient - atualizado para usar tons de dourado e verde */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8f3e6] to-white z-0" aria-hidden="true" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hecta-green">
              <span className="block">Referência Global em</span>
              <span className="text-hecta-gold">Chia de Qualidade</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Conectamos produtores aos mercados internacionais com transparência, 
              tecnologia e compromisso com sustentabilidade.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Button className="bg-hecta-gold hover:bg-hecta-gold/80 text-white text-lg px-8 py-6">
                Ver Panorama de Mercado
              </Button>
              <Button variant="outline" className="border-hecta-green text-hecta-green hover:bg-hecta-green hover:text-white text-lg px-8 py-6">
                Fale Conosco
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-20 rounded-lg shadow-xl overflow-hidden">
              <img src="/lovable-uploads/22a9f27f-0d0b-4f97-a163-5f7c42f5d316.png" alt="Carregamento de chia no porto" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-hecta-green/70 to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xl font-semibold">Mais de 78 portos pelo mundo </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default Hero;
