
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductShowcaseProps {
  className?: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ className = "" }) => {
  const { t } = useTranslation(['home']);

  const products = [
    {
      id: 1,
      image: "/lovable-uploads/33f03b68-92df-4783-ab31-3af02e4cbcea.png",
      name: t('home:product_glass_jars'),
      description: t('home:product_glass_jars_desc')
    },
    {
      id: 2,
      image: "/lovable-uploads/32446d82-41d5-4daf-9b49-e8c2921a8366.png",
      name: t('home:product_sachets'),
      description: t('home:product_sachets_desc')
    },
    {
      id: 3,
      image: "/lovable-uploads/26a49575-75db-47d5-b2e6-2a4bb8261f2d.png",
      name: t('home:product_chia_oil'),
      description: t('home:product_chia_oil_desc')
    }
  ];

  return (
    <div className={`relative ${className}`}>
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
        {products.map((product) => (
          <div key={product.id} className="relative rounded-lg shadow-xl overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-[300px] object-cover"
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
