import React from 'react';
import { Menu, X, Youtube, UserPlus } from 'lucide-react';
import { Language, ViewState } from '../types';
import { UI_LABELS } from '../constants';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const labels = UI_LABELS[lang];

  const FlagIcon = ({ country, code }: { country: string, code: Language }) => (
    <button 
      onClick={() => setLang(code)}
      className={`p-1.5 rounded-full transition-all border ${lang === code ? 'border-amber-500 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
      title={country}
    >
      <img 
        src={`https://flagcdn.com/w40/${country}.png`} 
        alt={code} 
        className="w-6 h-4 object-cover rounded-sm"
      />
    </button>
  );

  const YouTubeLink = () => (
    <a 
      href="https://www.youtube.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-neutral-400 hover:text-[#FF0000] transition-colors"
      title="YouTube Channel"
    >
      <Youtube size={20} />
    </a>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-obsidian/95 backdrop-blur-md border-b border-white/10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 border-2 border-amber-500 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-500/10 transition-colors">
              <span className="font-display text-amber-500 font-bold text-xl">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-white font-bold text-lg tracking-widest uppercase">Nietzsche</span>
              <span className="font-serif text-amber-500 text-xs italic tracking-wide">{labels.subtitle}</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setView('home')}
              className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-colors ${currentView === 'home' ? 'text-amber-500 border-b border-amber-500' : 'text-neutral-400'}`}
            >
              {labels.poems}
            </button>
            <button 
              onClick={() => setView('blog')}
              className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-colors ${currentView === 'blog' ? 'text-amber-500 border-b border-amber-500' : 'text-neutral-400'}`}
            >
              {labels.blog}
            </button>
            <button 
              onClick={() => setView('register')}
              className={`flex items-center text-sm uppercase tracking-widest hover:text-amber-400 transition-colors ${currentView === 'register' ? 'text-amber-500 border-b border-amber-500' : 'text-neutral-400'}`}
            >
              <UserPlus size={14} className="mr-2" />
              {labels.join}
            </button>
            
            <div className="h-6 w-px bg-white/20 mx-4"></div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FlagIcon country="us" code="en" />
                <FlagIcon country="br" code="pt" />
                <FlagIcon country="es" code="es" />
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <YouTubeLink />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
             <div className="flex items-center space-x-2 mr-3">
              <FlagIcon country="us" code="en" />
              <FlagIcon country="br" code="pt" />
              <FlagIcon country="es" code="es" />
            </div>
            <div className="mr-3 border-l border-white/10 pl-3">
               <YouTubeLink />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-amber-500 transition-colors p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-amber-500/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => { setView('home'); setIsMenuOpen(false); }}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-500 hover:bg-white/5 w-full text-left"
            >
              {labels.poems}
            </button>
            <button
              onClick={() => { setView('blog'); setIsMenuOpen(false); }}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-500 hover:bg-white/5 w-full text-left"
            >
              {labels.blog}
            </button>
            <button
              onClick={() => { setView('register'); setIsMenuOpen(false); }}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-amber-500 hover:bg-white/5 w-full text-left"
            >
               {labels.join}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;