import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../src/context/LanguageContext';
import { Language } from '../src/data/translations';

interface LanguageSelectorProps {
  variant?: 'public' | 'admin';
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'public',
  compact = false,
}) => {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const isPublic = variant === 'public';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch Language / Dooro Luqadda / تغيير اللغة"
        className={`flex items-center gap-2 rounded-xl transition-all cursor-pointer font-medium select-none ${
          isPublic
            ? 'px-3 py-2 text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
            : 'px-3 py-2 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700'
        }`}
      >
        <Globe size={15} className={isPublic ? 'text-primary' : 'text-primary'} />
        <span className="text-sm leading-none">{activeLang.flag}</span>
        {!compact && (
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            {activeLang.code}
          </span>
        )}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 text-gray-400 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl border py-1.5 z-50 backdrop-blur-xl animate-fadeIn ${
            isPublic
              ? 'bg-dark/95 border-white/15 shadow-black/60'
              : 'bg-slate-900 border-slate-700/80 shadow-black/80'
          }`}
        >
          <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Dooro Luqadda / Select Language
          </div>

          <div className="py-1">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-primary/15 text-primary font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <div>
                      <p className="font-semibold">{lang.nativeName}</p>
                      <span className="text-[10px] opacity-70">{lang.name}</span>
                    </div>
                  </div>

                  {isSelected && <Check size={15} className="text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
