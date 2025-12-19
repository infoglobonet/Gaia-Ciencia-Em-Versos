import React from 'react';
import { Language } from '../types';
import { UI_LABELS } from '../constants';

const Footer: React.FC<{ lang: Language }> = ({ lang }) => (
  <footer className="bg-obsidian border-t border-white/5 py-12 mt-20 no-print">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="font-serif italic text-amber-500/80 mb-4 text-lg">
        "{UI_LABELS[lang].footerQuote}"
      </p>
      <div className="w-12 h-0.5 bg-neutral-800 mx-auto mb-4"></div>
      <p className="text-neutral-600 text-xs uppercase tracking-widest">
        © {new Date().getFullYear()} Gaia Ciência Digital Explorer.
      </p>
    </div>
  </footer>
);

export default Footer;
