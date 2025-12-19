import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PoemList from './components/PoemList';
import PoemDetail from './components/PoemDetail';
import Blog from './components/Blog';
import Registration from './components/Registration';
import { Language, Poem, ViewState } from './types';
import { POEMS } from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  const handlePoemSelect = (poem: Poem) => {
    setSelectedPoem(poem);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedPoem(null);
  };

  const handleViewSet = (view: ViewState) => {
    setCurrentView(view);
    setSelectedPoem(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
      <Header 
        lang={lang} 
        setLang={setLang} 
        currentView={currentView}
        setView={handleViewSet}
      />

      <main className="flex-grow pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {currentView === 'blog' ? (
          <Blog lang={lang} />
        ) : currentView === 'register' ? (
          <Registration lang={lang} />
        ) : selectedPoem ? (
          <PoemDetail 
            poem={selectedPoem} 
            lang={lang} 
            onBack={handleBackToHome} 
          />
        ) : (
          <div className="animate-fadeIn">
            <div className="text-center mb-16 space-y-4">
              <h1 className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 pb-2">
                Scherz, List und Rache
              </h1>
              <p className="font-serif text-neutral-400 italic text-xl">
                Prelúdio em rimas alemãs
              </p>
            </div>
            <PoemList 
              poems={POEMS} 
              lang={lang} 
              onSelectPoem={handlePoemSelect} 
            />
          </div>
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default App;