import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import HectaLogo from '@/components/HectaLogo';
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres"
  }),
  email: z.string().email({
    message: "Email inválido"
  }),
  subject: z.string().min(5, {
    message: "Assunto deve ter pelo menos 5 caracteres"
  }),
  message: z.string().min(10, {
    message: "Mensagem deve ter pelo menos 10 caracteres"
  })
});
const Contato = () => {
  const {
    toast
  } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would send this data to a server
    console.log(values);
    toast({
      title: "Mensagem enviada",
      description: "Agradecemos seu contato. Retornaremos em breve!"
    });
    form.reset();
  }
  return <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-36 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-hecta-gray mb-2">Fale Conosco</h1>
            <p className="text-xl text-gray-600 mb-12">Estamos à disposição para atender suas necessidades</p>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-hecta-gray mb-6">Envie uma mensagem</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu nome" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={form.control} name="email" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="seu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                      </div>
                      
                      <FormField control={form.control} name="subject" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Assunto</FormLabel>
                            <FormControl>
                              <Input placeholder="Assunto da mensagem" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormField control={form.control} name="message" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Mensagem</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Digite sua mensagem..." className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <Button type="submit" className="w-full bg-hecta-green hover:bg-hecta-green/90 text-white">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Enviar Mensagem
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                  <h2 className="text-2xl font-bold text-hecta-gray mb-6">Informações de Contato</h2>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <MapPin className="text-hecta-green mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Endereço</p>
                        <p className="text-gray-600">
                          Av. Cândido de Abreu, 470<br />
                          Centro Cívico<br />
                          Curitiba, PR 80530-000
                        </p>
                      </div>
                    </li>
                    
                    
                    
                    
                  </ul>
                </div>
                
                <div className="bg-hecta-green text-white rounded-lg shadow-lg p-8">
                  <div className="text-center mb-4">
                    <div className="bg-white p-3 rounded-lg inline-block mb-3">
                      <HectaLogo className="h-8" />
                    </div>
                    <h3 className="text-xl font-bold">Hecta Chia Global</h3>
                  </div>
                  
                  <p className="text-white/80 mb-6">
                    Estamos presentes em 5 países, fornecendo chia de alta qualidade
                    com certificações internacionais.
                  </p>
                  
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-hecta-green">
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.115928019772!2d-49.267941024900195!3d-25.41644377563634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce46e5dd2bf2b%3A0xdea9ec5499774355!2sAv.%20C%C3%A2ndido%20de%20Abreu%2C%20470%20-%20Centro%20C%C3%ADvico%2C%20Curitiba%20-%20PR%2C%2080530-000!5e0!3m2!1sen!2sbr!4v1716188792558!5m2!1sen!2sbr" width="100%" height="450" style={{
                border: 0
              }} allowFullScreen loading="lazy" title="Mapa de Localização" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
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
    </div>;
};
export default Contato;