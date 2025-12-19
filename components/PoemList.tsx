import React, { useState } from 'react';
import { Poem, Language, CategoryType } from '../types';
import { UI_LABELS } from '../constants';
import { BookOpen, Tag } from 'lucide-react';

interface PoemListProps {
  poems: Poem[];
  onSelectPoem: (poem: Poem) => void;
  lang: Language;
}

const PoemList: React.FC<PoemListProps> = ({ poems, onSelectPoem, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const categories = UI_LABELS[lang].categories;

  const filteredPoems = selectedCategory === 'all' 
    ? poems 
    : poems.filter(p => p.category === selectedCategory);

  const CategoryFilterButton = ({ type, label }: { type: CategoryType | 'all', label: string }) => (
    <button
      onClick={() => setSelectedCategory(type)}
      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
        selectedCategory === type 
          ? 'bg-amber-500 text-obsidian' 
          : 'bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-amber-500 hover:text-amber-500'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="py-12">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-3 justify-center mb-12 animate-fadeIn">
        <CategoryFilterButton type="all" label={categories.all} />
        <CategoryFilterButton type="wisdom" label={categories.wisdom} />
        <CategoryFilterButton type="life_fate" label={categories.life_fate} />
        <CategoryFilterButton type="morality_critique" label={categories.morality_critique} />
        <CategoryFilterButton type="art_truth" label={categories.art_truth} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPoems.map((poem) => (
          <div 
            key={poem.id}
            onClick={() => onSelectPoem(poem)}
            className="group relative bg-neutral-900/50 border border-white/10 hover:border-amber-500/50 p-8 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] rounded-sm"
          >
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-100 transition-opacity">
              <span className="font-display text-4xl font-bold text-amber-500">#{poem.id}</span>
            </div>
            
            <div className="h-full flex flex-col justify-between">
              <div>
                 <div className="flex items-center space-x-2 mb-3">
                   <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                     {categories[poem.category]}
                   </span>
                 </div>
                 <h3 className="font-display text-2xl text-white mb-2 group-hover:text-amber-500 transition-colors">
                  {poem.title[lang]}
                </h3>
                <p className="font-serif text-neutral-400 italic text-sm line-clamp-3 mb-6">
                  "{poem.content[lang].split('\n')[0]}..."
                </p>
              </div>
             
              <div className="flex items-center text-amber-600 text-sm font-bold uppercase tracking-widest group-hover:text-amber-400">
                <BookOpen size={16} className="mr-2" />
                {UI_LABELS[lang].readMore}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoemList;