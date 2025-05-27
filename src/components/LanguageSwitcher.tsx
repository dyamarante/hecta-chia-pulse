
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { changeLanguage } from '@/i18n';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);
  const currentLang = i18n.language || 'pt';
  
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];
  
  const handleChangeLanguage = async (code: string) => {
    if (code !== currentLang && !isChanging) {
      setIsChanging(true);
      try {
        await changeLanguage(code);
        // Small delay to ensure UI updates
        setTimeout(() => {
          setIsChanging(false);
        }, 500);
      } catch (error) {
        console.error('Error changing language:', error);
        setIsChanging(false);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1 px-2" disabled={isChanging}>
          {isChanging ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <span className="mr-1">{currentLanguage.flag}</span>
              <span className="hidden md:block">{currentLanguage.code.toUpperCase()}</span>
              <ChevronDown size={16} />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className="flex items-center justify-between"
            onClick={() => handleChangeLanguage(lang.code)}
            disabled={isChanging}
          >
            <span>
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </span>
            {currentLang === lang.code && <Check size={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
