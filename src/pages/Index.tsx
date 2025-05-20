
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MarketAnalysisTabs from '@/components/MarketAnalysisTabs';
import { Button } from '@/components/ui/button';
import HectaLogo from '@/components/HectaLogo';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <MarketAnalysisTabs />
            
            <div className="mt-12 text-center">
              <Button className="bg-hecta-green hover:bg-hecta-lime text-white">
                Ver Análise Detalhada
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-hecta-gray mb-4">
                  Referência Mundial em Produção Sustentável
                </h2>
                <p className="text-gray-700 mb-6">
                  A Hecta Chia é líder global no fornecimento de chia de alta qualidade, 
                  combinando práticas sustentáveis, rastreabilidade blockchain e 
                  inclusão social através da nossa plataforma Hecta-pay-hub.
                </p>
                <ul className="space-y-3">
                  {[
                    '60% da produção com certificação orgânica',
                    'Mais de 4.000 pessoas envolvidas na cadeia produtiva',
                    'Redução de 57% nas emissões de CO₂ por tonelada',
                    'Entrega pontual em mais de 98% dos embarques'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-hecta-green mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1591351223238-c8cc9a95ea9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Sementes de chia" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1595854341625-f33e09b6b2f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Campos agrícolas sustentáveis" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1626553683558-dd8125a7a6a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Logística de exportação" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1560421683-2a24a529502a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Tecnologia e inovação" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-hecta-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Conheça a Plataforma Hecta-pay-hub
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Pagamentos tokenizados, rastreabilidade blockchain e integração ERP 
              para total transparência e eficiência em toda a cadeia produtiva.
            </p>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-hecta-green">
              Solicitar Demonstração
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-hecta-gray text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4 bg-white p-3 rounded-lg inline-block">
                <HectaLogo className="h-8" />
              </div>
              <p className="mb-4">
                Referência global em produção, processamento e 
                comercialização de chia de alta qualidade.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-hecta-lime">LinkedIn</a>
                <a href="#" className="hover:text-hecta-lime">Twitter</a>
                <a href="#" className="hover:text-hecta-lime">Instagram</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Sedes Globais</h3>
              <ul className="space-y-2">
                <li>Curitiba, Brasil (Matriz)</li>
                <li>São Paulo, Brasil</li>
                <li>Assunção, Paraguai</li>
                <li>Qingdao, China</li>
                <li>Nova York, EUA</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <p className="mb-2">contato@hectachia.com</p>
              <p className="mb-4">+55 (41) 3000-0000</p>
              <Button className="bg-hecta-lime hover:bg-white hover:text-hecta-green">
                Fale Conosco
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Hecta Chia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
