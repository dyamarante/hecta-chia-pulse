
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, FileText, QrCode, Calendar, Clock, ShieldCheck } from 'lucide-react';

const certifications = [
  {
    id: 'usda',
    name: 'USDA Organic',
    scope: 'Regulamento NOP (7 CFR Part 205) — EUA',
    benefits: [
      'Sem pesticidas sintéticos',
      'Exigido para uso do selo "Organic" em rótulos americanos'
    ],
    validity: 'Auditor externo anual. Certificado vigente até dez/2025.',
    auditor: 'AMS',
    image: 'https://www.usda.gov/sites/default/files/usda-logo.png'
  },
  {
    id: 'eu',
    name: 'EU Organic',
    scope: 'Regulamento (UE) 2018/848 — União Europeia',
    benefits: [
      'Entrada preferencial na UE',
      'Elegibilidade para claims "Produto biológico"'
    ],
    validity: 'Certificador ECOCERT — validade jun/2025',
    auditor: 'ECOCERT',
    image: 'https://ec.europa.eu/agriculture/organic/sites/default/files/img/logo/organic-farming_large.png'
  },
  {
    id: 'cor',
    name: 'COR Canada',
    scope: 'Canadian Organic Regime — Canadá',
    benefits: [
      'Cumpre equivalência bilateral NOP↔COR',
      'Acesso a varejistas "Health & Bulk"'
    ],
    validity: 'Certificado #COR-21-247, válido fev/2026',
    auditor: 'COR',
    image: 'https://www.inspection.gc.ca/DAM/DAM-aboutcfia-sujetacia/STAGING/images-images/org_logo_regim_1341863404113_eng.jpg'
  },
  {
    id: 'jas',
    name: 'JAS Organic (MAFF)',
    scope: 'Compulsório para "organic" no Japão',
    benefits: [
      'Isenção de inspeção fitossanitária adicional',
      'Uso do logotipo JAS nas embalagens'
    ],
    validity: 'Auditor MAFF-acreditado — validade mar/2026',
    auditor: 'MAFF',
    image: 'https://www.maff.go.jp/e/policies/standard/jas/img/jas_organic_en.png'
  },
  {
    id: 'brcgs',
    name: 'BRCGS Food Safety AA+',
    scope: 'GFSI global (unannounced audit)',
    benefits: [
      'Grau máximo de segurança alimentar',
      'Reduz necessidade de segunda-parte sobre auditorias'
    ],
    validity: 'Emitido por SGS — resultado AA+ (auditoria surpresa).',
    auditor: 'Complete Food Safety Ltd',
    image: 'https://www.brcgs.com/media/1366/brcgs-food-safety-logo_rgb.jpg'
  },
  {
    id: 'fda',
    name: 'FDA FCE/Bio-T',
    scope: 'Food Facility Registration & Acidified Foods',
    benefits: [
      'Conformidade FSMA para importadores EUA'
    ],
    validity: 'FFR #18521423952 renovado 2024/2026',
    auditor: 'FDA',
    image: 'https://www.fda.gov/files/FDA-Logo_Full-Color_Horizontal-PNG.png'
  },
  {
    id: 'kosher',
    name: 'Kosher (OU)',
    scope: 'Pareve — aceito em 100+ países',
    benefits: [
      'Amplia alcance a consumidores com dieta kosher, veganos e vegetarianos',
      'Requisito para muitas redes de varejo dos EUA'
    ],
    validity: 'Rabbi audit trimestral',
    auditor: 'OU Kosher Certification',
    image: 'https://oukosher.org/wp-content/uploads/2012/09/ou-logo.png'
  },
  {
    id: 'halal',
    name: 'Halal GCC',
    scope: 'GSO 2055-1 – Emirados, Arábia Saudita & MENA',
    benefits: [
      'Porta de entrada para 420 mi consumidores muçulmanos',
      'Selo de pureza e transparência'
    ],
    validity: 'Certifier: AHF (validade out/2025)',
    auditor: 'American Halal Foundation',
    image: 'https://i0.wp.com/www.americanhalalfoundation.org/wp-content/uploads/2019/08/cropped-AHF-Logo.png'
  },
  {
    id: 'nongmo',
    name: 'Non-GMO Project Verified',
    scope: 'USA & Canadá',
    benefits: [
      'Garantia third-party de ausência de OGM',
      'Alta aceitação em lojas "natural/wholefood"'
    ],
    validity: 'ID #NGPV-021-CHI-2024 (renov. anual)',
    auditor: 'nongmoproject.org',
    image: 'https://www.nongmoproject.org/wp-content/uploads/2021/08/NG-project-verified.jpg'
  },
  {
    id: 'smeta',
    name: 'SMETA 4-Pillar',
    scope: 'Trabalho, Saúde & Segurança, Meio Ambiente, Ética',
    benefits: [
      'Prova de responsabilidade social corporativa',
      'Aceito por grandes varejistas globais'
    ],
    validity: 'Auditor NSF-Sedex; renovado jan/2025',
    auditor: 'Sedex',
    image: 'https://www.sedex.com/wp-content/uploads/2019/04/SMETA-Logo.jpg'
  },
  {
    id: 'gluten',
    name: 'Non-GMO / Gluten-Free (Interno)',
    scope: 'Lotes controlados',
    benefits: [
      'Análises ELISA <10 ppm (glúten)',
      'Relatórios no blockchain Hecta'
    ],
    validity: 'Batch-based; disponível por QR',
    auditor: 'Interno',
    image: 'https://cdn-icons-png.flaticon.com/512/2153/2153786.png'
  }
];

const timelineEvents = [
  { year: 2018, event: 'USDA Organic' },
  { year: 2019, event: 'EU Organic + COR' },
  { year: 2020, event: 'BRCGS A → upgrade AA+ em 2023' },
  { year: 2021, event: 'Kosher OU' },
  { year: 2022, event: 'Halal GCC + SMETA 4P' },
  { year: 2023, event: 'Non-GMO Project Verified' },
];

const faqs = [
  {
    question: "Por que alguns certificados não mostram a data de inspeção deste ano?",
    answer: "Publicamos apenas versões que não expõem dados sensíveis; a validade legal está no blockchain."
  },
  {
    question: "Posso usar o selo USDA na embalagem da minha marca?",
    answer: "Sim, desde que não modifique o status orgânico do produto em sua planta e cite nosso certificado NOP."
  },
  {
    question: "A Hecta oferece suporte para auditorias de segunda parte?",
    answer: "Disponibilizamos salas virtuais e acesso a relatórios; auditor presencial pode ser agendado em até 30 dias."
  }
];

const markets = [
  { value: "eua", label: "EUA" },
  { value: "ue", label: "União Europeia" },
  { value: "asia", label: "Ásia" },
  { value: "orientemedio", label: "Oriente Médio" }
];

const Certificacoes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-hecta-gold/10 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hecta-gray mb-6">
            Confiança que atravessa fronteiras
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Cada lote de chia que você recebe tem lastro em certificações reconhecidas 
            mundialmente e auditadas por terceiros. Qualidade, segurança alimentar e 
            responsabilidade social em um só lugar.
          </p>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-hecta-gold hover:bg-hecta-gold/90 text-white px-6 py-3 text-lg"
          >
            <FileText className="mr-2" />
            Baixar Certificados PDF
          </Button>
        </div>
      </section>
      
      {/* Certificates Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
            Matriz de Certificações
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4 bg-white h-24 flex items-center justify-center border-b">
                  <img 
                    src={cert.image} 
                    alt={`${cert.name} logo`} 
                    className="max-h-16 max-w-full"
                  />
                </div>
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-2 bg-hecta-green/10 border-hecta-green/30 text-hecta-gray w-fit">
                    {cert.scope}
                  </Badge>
                  <CardTitle>{cert.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Benefícios-chave:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    {cert.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-600">{benefit}</li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-500">
                    <p><span className="font-medium">Validade:</span> {cert.validity}</p>
                    <p><span className="font-medium">Auditor:</span> {cert.auditor}</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full border-hecta-gold text-hecta-gold hover:bg-hecta-gold/10">
                    Ver certificado
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blockchain Verification */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-hecta-gray mb-6">
                Verificação Digital & Blockchain
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Cada lote de chia contém um QR code exclusivo que dá acesso à página de 
                verificação no Hecta-pay-hub. Escaneie o código para acessar:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: <FileText />, text: "PDF do certificado relevante para o lote" },
                  { icon: <QrCode />, text: "Resultados de análises laboratoriais (micotoxinas, glúten, pesticidas)" },
                  { icon: <Clock />, text: "Carimbo de data/hora (UTC) da transação em blockchain" }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 mr-3 text-hecta-gold">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-hecta-green hover:bg-hecta-green/90 text-white">
                <QrCode className="mr-2" />
                Demonstração do QR Code
              </Button>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-white border rounded-lg overflow-hidden shadow-lg p-8 max-w-md w-full">
                <div className="border-4 border-dashed border-gray-200 p-6 flex justify-center items-center mb-6">
                  <QrCode size={180} className="text-hecta-gray" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Lote</span>
                    <span className="font-medium">HCT-BR-2024-05781</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Safra</span>
                    <span className="font-medium">Maio 2024</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Blockchain Hash</span>
                    <span className="font-medium text-xs">0x7fE5...93c1</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Verificado</span>
                    <Badge className="bg-green-500">Autêntico</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
            Linha do tempo da Conformidade
          </h2>
          
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="inline-flex gap-8 pb-8 px-4">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center min-w-[200px] relative"
                >
                  <div className="bg-hecta-gold text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-4">
                    {event.year}
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-hecta-gray">{event.event}</p>
                  </div>
                  {index < timelineEvents.length - 1 && (
                    <div className="absolute top-8 left-1/2 w-[calc(100%+2rem)] h-0.5 bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-hecta-gray mb-10 text-center">
            Perguntas Frequentes
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Certificate Download Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Baixar Certificados</DialogTitle>
            <DialogDescription>
              Selecione o mercado para visualizar e baixar os certificados disponíveis.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="market" className="text-sm font-medium">
                Mercado
              </label>
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um mercado" />
                </SelectTrigger>
                <SelectContent>
                  {markets.map((market) => (
                    <SelectItem key={market.value} value={market.value}>
                      {market.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedMarket && (
              <Tabs defaultValue="organic">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="organic">Orgânicos</TabsTrigger>
                  <TabsTrigger value="safety">Seg. Alimentar</TabsTrigger>
                  <TabsTrigger value="esg">ESG</TabsTrigger>
                </TabsList>
                <TabsContent value="organic" className="space-y-2">
                  <div className="border rounded-md p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-2 rounded-full">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                      </div>
                      <span>USDA Organic Certificate.pdf</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <FileText className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="safety" className="space-y-2">
                  <div className="border rounded-md p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <ShieldCheck className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>BRCGS Food Safety Report.pdf</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <FileText className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="esg" className="space-y-2">
                  <div className="border rounded-md p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <ShieldCheck className="h-4 w-4 text-amber-600" />
                      </div>
                      <span>SMETA 4-Pillar Summary.pdf</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <FileText className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificacoes;
