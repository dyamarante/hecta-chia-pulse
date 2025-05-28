
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProductShowcaseProps {
  className?: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  className = ""
}) => {
  const { t } = useTranslation(['home']);
  
  const products = [
    {
      id: 1,
      image: "/lovable-uploads/4bb53540-fa77-4521-b59e-ad463fd32592.png",
      name: t('home:product_glass_jars'),
      description: t('home:product_glass_jars_desc')
    },
    {
      id: 2,
      image: "/lovable-uploads/e2d15276-b84f-4196-9d11-da5d9d0c806e.png",
      name: t('home:product_sachets'),
      description: t('home:product_sachets_desc')
    },
    {
      id: 3,
      image: "/lovable-uploads/fc418fc7-bfa5-44af-a40b-c356c02dbbbd.png",
      name: t('home:product_chia_oil'),
      description: t('home:product_chia_oil_desc')
    },
    {
      id: 4,
      image: "/lovable-uploads/25c2018f-dfb1-4f5d-8caa-7332ebe9daaa.png",
      name: "Chia Branca Premium",
      description: "Fonte natural de fibras e ômega-3"
    },
    {
      id: 5,
      image: "/lovable-uploads/4210780c-ef88-4cb1-885c-3ce34721af02.png",
      name: "Chia Negra Tradicional",
      description: "Rica em antioxidantes naturais"
    },
    {
      id: 6,
      image: "/lovable-uploads/ff41e2a9-32dd-4885-8c76-6883eba5ee79.png",
      name: "Farinha de Chia",
      description: "Produto 100% natural em embalagem de 20kg"
    },
    {
      id: 7,
      image: "/lovable-uploads/37112b53-001d-46fd-9950-ccf0a9f9ca78.png",
      name: "Chia Moída",
      description: "Processamento natural para fácil digestão"
    }
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Mobile Carousel */}
      <Carousel className="w-full max-w-xs mx-auto md:max-w-full">
        <CarouselContent className="md:hidden">
          {products.map((product) => (
            <CarouselItem key={product.id}>
              <div className="relative rounded-lg shadow-xl overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-[400px] object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hecta-green/70 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm">{product.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="md:hidden" />
        <CarouselNext className="md:hidden" />
      </Carousel>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {products.slice(0, 3).map((product) => (
          <div key={product.id} className="relative rounded-lg shadow-xl overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[400px] object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hecta-green/70 to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
