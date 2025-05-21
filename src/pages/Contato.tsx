
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
import { useTranslation } from 'react-i18next';

const Contato = () => {
  const { t } = useTranslation(['common', 'contact']);
  const { toast } = useToast();

  // Schema com mensagens traduzíveis
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t('contact:name_validation')
    }),
    email: z.string().email({
      message: t('contact:email_validation')
    }),
    subject: z.string().min(5, {
      message: t('contact:subject_validation')
    }),
    message: z.string().min(10, {
      message: t('contact:message_validation')
    })
  });
  
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
      title: t('contact:message_sent'),
      description: t('contact:thank_you_message')
    });
    form.reset();
  }
  
  return <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-36 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-hecta-gray mb-2">{t('contact:contact_us')}</h1>
            <p className="text-xl text-gray-600 mb-12">{t('contact:contact_description')}</p>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-hecta-gray mb-6">{t('contact:send_message')}</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>{t('contact:name')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact:your_name')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={form.control} name="email" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>{t('contact:email')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact:your_email')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                      </div>
                      
                      <FormField control={form.control} name="subject" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>{t('contact:subject')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('contact:message_subject')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormField control={form.control} name="message" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>{t('contact:message')}</FormLabel>
                            <FormControl>
                              <Textarea placeholder={t('contact:type_message')} className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <Button type="submit" className="w-full bg-hecta-green hover:bg-hecta-green/90 text-white">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {t('contact:send_message')}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                  <h2 className="text-2xl font-bold text-hecta-gray mb-6">{t('contact:contact_information')}</h2>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <MapPin className="text-hecta-green mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">{t('contact:address')}</p>
                        <p className="text-gray-600">
                          {t('contact:address_line1')}<br />
                          {t('contact:address_line2')}<br />
                          {t('contact:address_line3')}
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
                    <h3 className="text-xl font-bold">{t('common:company_name')}</h3>
                  </div>
                  
                  <p className="text-white/80 mb-6">
                    {t('common:company_description')}
                  </p>
                  
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-hecta-green">
                    {t('common:learn_more')}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.115928019772!2d-49.267941024900195!3d-25.41644377563634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce46e5dd2bf2b%3A0xdea9ec5499774355!2sAv.%20C%C3%A2ndido%20de%20Abreu%2C%20470%20-%20Centro%20C%C3%ADvico%2C%20Curitiba%20-%20PR%2C%2080530-000!5e0!3m2!1sen!2sbr!4v1716188792558!5m2!1sen!2sbr" width="100%" height="450" style={{
                border: 0
              }} allowFullScreen loading="lazy" title={t('contact:location_map')} referrerPolicy="no-referrer-when-downgrade"></iframe>
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
                {t('common:footer_description')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-hecta-lime">LinkedIn</a>
                <a href="#" className="hover:text-hecta-lime">Twitter</a>
                <a href="#" className="hover:text-hecta-lime">Instagram</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t('common:global_offices')}</h3>
              <ul className="space-y-2">
                <li>{t('common:office_curitiba')}</li>
                <li>{t('common:office_saopaulo')}</li>
                <li>{t('common:office_asuncion')}</li>
                <li>{t('common:office_qingdao')}</li>
                <li>{t('common:office_newyork')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t('common:contact')}</h3>
              <p className="mb-2">contato@hectachia.com</p>
              <p className="mb-4">+55 (41) 3000-0000</p>
              <Button className="bg-hecta-lime hover:bg-white hover:text-hecta-green">
                {t('common:contact_us')}
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>{t('common:copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Contato;
