import React, { useState } from 'react';
import { Language } from '../types';
import { UI_LABELS } from '../constants';
import { Feather, Mail, Link as LinkIcon, Award, User, ArrowRight, CheckCircle, RefreshCcw } from 'lucide-react';

interface RegistrationProps {
  lang: Language;
}

type RegistrationStep = 'form' | 'verification' | 'success';

const Registration: React.FC<RegistrationProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    link: '',
    archetype: 'wanderer'
  });
  const [step, setStep] = useState<RegistrationStep>('form');
  const [isResending, setIsResending] = useState(false);
  
  const labels = UI_LABELS[lang].register;

  const archetypes = [
    { value: 'wanderer', label: 'The Wanderer / O Andarilho' },
    { value: 'free_spirit', label: 'Free Spirit / Espírito Livre' },
    { value: 'shadow', label: 'The Shadow / A Sombra' },
    { value: 'philosopher', label: 'Philosopher of the Future / Filósofo' },
    { value: 'artist', label: 'Artist / Artista' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to send email
    setTimeout(() => {
      setStep('verification');
    }, 800);
  };

  const handleSimulateVerification = () => {
    // This simulates the user clicking the link in their email
    setTimeout(() => {
      setStep('success');
    }, 800);
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      // Logic to resend email would go here
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setStep('form');
    setFormData({ name: '', email: '', link: '', archetype: 'wanderer' });
  };

  // STEP 3: SUCCESS (Membership Card)
  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-fadeIn">
        <div className="bg-obsidian border-4 border-amber-500 p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)]">
           {/* Decorative corner borders */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-300"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-300"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-300"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-300"></div>

          <div className="text-center relative z-10">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/50">
              <Award size={40} className="text-amber-500" />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl text-amber-500 mb-2 uppercase tracking-widest">{labels.successTitle}</h2>
            <p className="font-serif text-neutral-400 italic mb-8">{labels.successDesc}</p>

            <div className="border-t border-b border-white/10 py-6 mb-8">
              <p className="text-2xl font-display text-white mb-2">{formData.name}</p>
              <p className="text-sm text-amber-600 uppercase tracking-widest font-bold mb-4">{formData.archetype.replace('_', ' ')}</p>
              
              {formData.link && (
                <a href={formData.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-neutral-400 hover:text-amber-500 transition-colors text-sm">
                  <LinkIcon size={12} className="mr-2" />
                  {formData.link.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>

            <div className="flex justify-between items-end text-xs text-neutral-500 uppercase tracking-widest font-bold">
              <div className="text-left">
                <span className="block text-amber-800">{labels.id}</span>
                <span className="font-mono text-neutral-300">GC-{Math.floor(Math.random() * 9000) + 1000}</span>
              </div>
              <div className="text-right">
                <span className="block text-amber-800">{labels.memberSince}</span>
                <span className="font-mono text-neutral-300">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] pointer-events-none"></div>
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={resetForm}
            className="text-neutral-500 hover:text-white transition-colors text-sm uppercase tracking-widest underline"
          >
            {UI_LABELS[lang].back}
          </button>
        </div>
      </div>
    );
  }

  // STEP 2: EMAIL VERIFICATION
  if (step === 'verification') {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 animate-fadeIn">
        <div className="text-center bg-neutral-900/50 p-10 border border-amber-500/20 rounded-sm">
          <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20 animate-pulse-slow">
            <Mail size={40} className="text-amber-500" />
          </div>

          <h3 className="font-display text-3xl text-white mb-4">{labels.verification.title}</h3>
          
          <div className="bg-amber-900/10 border border-amber-500/20 p-4 rounded mb-6 inline-block">
            <p className="text-amber-200 font-mono text-sm">{formData.email}</p>
          </div>

          <p className="text-neutral-300 font-serif text-lg mb-2">
            {labels.verification.sentTo} <span className="text-white font-bold">{formData.email}</span>.
          </p>
          <p className="text-neutral-400 font-serif italic mb-8">
            {labels.verification.instruction}
          </p>

          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-8 flex items-center justify-center">
            <CheckCircle size={12} className="mr-2" />
            {labels.verification.spam}
          </p>

          <div className="space-y-4">
             {/* Note: In a real app, this button wouldn't exist, user would click email link. 
                 Added here for demo purposes to advance flow. */}
            <button 
              onClick={handleSimulateVerification}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-widest py-3 rounded-sm transition-all duration-300 shadow-lg hover:shadow-amber-900/20"
            >
              {labels.verification.button}
            </button>

            <button 
              onClick={handleResend}
              disabled={isResending}
              className="flex items-center justify-center w-full text-neutral-400 hover:text-white text-xs uppercase tracking-widest transition-colors py-2"
            >
              <RefreshCcw size={12} className={`mr-2 ${isResending ? 'animate-spin' : ''}`} />
              {isResending ? UI_LABELS[lang].loading : labels.verification.resend}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: FORM
  return (
    <div className="max-w-xl mx-auto py-12 px-4 animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl text-white mb-4">{labels.title}</h2>
        <p className="font-serif text-neutral-400 italic">{labels.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900/50 p-8 border border-white/5 rounded-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            {labels.name}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-neutral-500" size={18} />
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 text-white pl-10 pr-4 py-2.5 outline-none transition-colors rounded-sm font-serif"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            {labels.email}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-neutral-500" size={18} />
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 text-white pl-10 pr-4 py-2.5 outline-none transition-colors rounded-sm font-serif"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            {labels.link}
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-3 text-neutral-500" size={18} />
            <input 
              type="url" 
              name="link"
              placeholder="https://"
              value={formData.link}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 text-white pl-10 pr-4 py-2.5 outline-none transition-colors rounded-sm font-serif"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            {labels.archetype}
          </label>
          <div className="relative">
            <select 
              name="archetype"
              value={formData.archetype}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 text-white px-4 py-2.5 outline-none transition-colors rounded-sm font-serif appearance-none cursor-pointer"
            >
              {archetypes.map(arc => (
                <option key={arc.value} value={arc.value}>{arc.label}</option>
              ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none">
              <Feather size={16} className="text-neutral-500" />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-widest py-3 rounded-sm transition-all duration-300 shadow-lg hover:shadow-amber-900/20 mt-4 border border-amber-500/20 group"
        >
          <span className="flex items-center justify-center">
            {labels.submit}
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Registration;