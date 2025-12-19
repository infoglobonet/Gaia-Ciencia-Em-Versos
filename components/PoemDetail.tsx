import React, { useState, useRef, useEffect } from 'react';
import { Poem, Language, ChatMessage } from '../types';
import { UI_LABELS } from '../constants';
import { generatePoemAnalysis, generatePoemPodcast, generatePoemArt, generateInfographic } from '../services/geminiService';
import { ArrowLeft, Share2, Download, Send, Sparkles, MessageSquare, Copy, Check, Tag, Headphones, Loader2, Play, Pause, Image as ImageIcon, Palette, FileText, LayoutTemplate, Activity, Mail, Twitter } from 'lucide-react';

interface PoemDetailProps {
  poem: Poem;
  lang: Language;
  onBack: () => void;
}

// Helper to write string to DataView
const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

// Helper to create WAV header for raw PCM data
const createWavHeader = (dataLength: number, sampleRate: number = 24000, numChannels: number = 1, bitsPerSample: number = 16) => {
  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeString(view, 8, 'WAVE');

  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true); // ByteRate
  view.setUint16(32, numChannels * (bitsPerSample / 8), true); // BlockAlign
  view.setUint16(34, bitsPerSample, true); // BitsPerSample

  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataLength, true);

  return buffer;
};

// Helper for time formatting
const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const PoemDetail: React.FC<PoemDetailProps> = ({ poem, lang, onBack }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedResponseId, setCopiedResponseId] = useState<number | null>(null);
  
  // Audio Summary State
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  // Art Generation State
  const [selectedStyle, setSelectedStyle] = useState('surrealism');
  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // Infographic Generation State
  const [isGeneratingInfographic, setIsGeneratingInfographic] = useState(false);
  const [infographicUrl, setInfographicUrl] = useState<string | null>(null);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const infographicRef = useRef<HTMLDivElement>(null);

  const labels = UI_LABELS[lang];
  const artLabels = UI_LABELS[lang].art;
  const infographicLabels = UI_LABELS[lang].infographic;
  const audioLabels = UI_LABELS[lang].audio;
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  // Clean up Object URLs on unmount or when poem changes
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (generatedImageUrl) URL.revokeObjectURL(generatedImageUrl); // Although art uses base64 data URI usually, good practice if using blob
      if (infographicUrl) URL.revokeObjectURL(infographicUrl);
    };
  }, [audioUrl, generatedImageUrl, infographicUrl]); 

  // Reset states when poem changes
  useEffect(() => {
    setAudioUrl(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setGeneratedImageUrl(null);
    setInfographicUrl(null);
    setSelectedStyle('surrealism');
  }, [poem.id]);

  // Scroll player into view when audio is ready
  useEffect(() => {
    if (audioUrl && playerContainerRef.current) {
      playerContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [audioUrl]);

  const handleShare = () => {
    const text = encodeURIComponent(`"${poem.title[lang]}" - Friedrich Nietzsche\n\n${poem.content[lang]}\n\nExplored via Gaia Ciência App`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopy = async () => {
    const text = `"${poem.title[lang]}" - Friedrich Nietzsche\n\n${poem.content[lang]}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleExport = () => {
    window.print();
  };

  const handleExportChat = () => {
    if (messages.length === 0) return;

    const timestamp = new Date().toLocaleString();
    const header = `A Gaia Ciência - Diálogo sobre "${poem.title[lang]}"\nData: ${timestamp}\n\n`;
    
    const content = messages.map(msg => {
      const role = msg.role === 'model' ? labels.chatTitle : 'Você';
      return `[${role}]:\n${msg.text}\n`;
    }).join('\n----------------------------------------\n\n');

    const fullText = header + content;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `nietzsche-dialogue-${poem.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleEmailShare = (text: string) => {
    const subject = encodeURIComponent(`Nietzsche AI: ${poem.title[lang]}`);
    const body = encodeURIComponent(`${text}\n\nVia Gaia Ciência`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
  };

  const handleTwitterShare = (text: string) => {
    const tweet = encodeURIComponent(`"${poem.title[lang]}" - ${text.substring(0, 100)}... #Nietzsche`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
  };

  const handleShareMessage = async (text: string, idx: number) => {
    const shareText = `Nietzsche AI sobre "${poem.title[lang]}":\n\n${text}\n\nVia Gaia Ciência App`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Nietzsche AI: ${poem.title[lang]}`,
          text: shareText,
        });
      } catch (error) {
        console.error("Error sharing message:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopiedResponseId(idx);
        setTimeout(() => setCopiedResponseId(null), 2000);
      } catch (err) {
        console.error('Failed to copy message to clipboard', err);
      }
    }
  };

  const handleGeneratePodcast = async () => {
    if (audioUrl) {
      // If audio already exists, just scroll to it
      playerContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setIsGeneratingAudio(true);
    try {
      const base64Audio = await generatePoemPodcast(poem, lang);
      
      if (base64Audio) {
        // Decode Base64 to binary
        const binaryString = atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Add WAV Header
        const wavHeader = createWavHeader(bytes.length, 24000, 1, 16);
        const wavBlob = new Blob([wavHeader, bytes], { type: 'audio/wav' });
        
        const url = URL.createObjectURL(wavBlob);
        setAudioUrl(url);
      }
    } catch (error) {
      console.error("Failed to generate podcast", error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleGenerateArt = async () => {
    if (generatedImageUrl) return;

    setIsGeneratingArt(true);
    try {
      // Map selection key to full english description for prompt
      const styleMap: Record<string, string> = {
        surrealism: "Dreamlike Surrealism in the style of Dali",
        expressionism: "German Expressionism",
        oil: "Classic Renaissance Oil Painting with heavy chiaroscuro",
        oil_expressive: "Expressive Oil Painting, thick impasto strokes, dramatic texture and lighting, emotional masterpiece",
        sketch: "Charcoal Sketch on old paper",
        cyberpunk: "Dystopian Futurism, gold and black palette"
      };

      const styleDescription = styleMap[selectedStyle] || selectedStyle;
      const imageUrl = await generatePoemArt(poem, styleDescription, lang);
      
      if (imageUrl) {
        setGeneratedImageUrl(imageUrl);
      }
    } catch (error) {
      console.error("Failed to generate art", error);
    } finally {
      setIsGeneratingArt(false);
    }
  };

  const handleGenerateInfographic = async () => {
    // Scroll to section to ensure visibility of loader/result
    infographicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (infographicUrl) return;

    setIsGeneratingInfographic(true);
    try {
      const url = await generateInfographic(poem, lang);
      if (url) {
        setInfographicUrl(url);
      }
    } catch (error) {
      console.error("Failed to generate infographic", error);
    } finally {
      setIsGeneratingInfographic(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    const loadingMsg: ChatMessage = { role: 'model', text: labels.loading, isLoading: true };
    setMessages(prev => [...prev, loadingMsg]);

    const responseText = await generatePoemAnalysis(poem, userMsg.text, lang);

    setMessages(prev => prev.map(msg => 
      msg.isLoading ? { role: 'model', text: responseText } : msg
    ));
  };

  // Audio Player Handlers
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
        audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 no-print gap-4 md:gap-0">
        <button 
          onClick={onBack}
          className="flex items-center text-neutral-400 hover:text-amber-500 transition-colors uppercase tracking-widest text-sm self-start md:self-auto"
        >
          <ArrowLeft size={16} className="mr-2" />
          {labels.back}
        </button>

        <div className="flex items-center space-x-4 self-end md:self-auto overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-hide">
          {/* Audio Summary Button (Toolbar) */}
           <button 
            onClick={handleGeneratePodcast}
            disabled={isGeneratingAudio}
            className={`flex items-center px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all ${
              audioUrl 
                ? 'bg-neutral-800 text-amber-500 border border-amber-500/50'
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg hover:shadow-amber-900/20'
            }`}
            title={audioLabels.listen}
          >
            {isGeneratingAudio ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <Headphones size={16} className="mr-2" />
            )}
            <span className="hidden sm:inline">
              {isGeneratingAudio ? audioLabels.generating : (audioUrl ? audioLabels.listen : audioLabels.button)}
            </span>
          </button>

          {/* Infographic Button */}
          <button 
            onClick={handleGenerateInfographic}
            disabled={isGeneratingInfographic || !!infographicUrl}
            className={`flex items-center px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all ${
              infographicUrl 
                ? 'bg-neutral-800 text-amber-500 border border-amber-500/50 cursor-default opacity-50'
                : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-amber-500/30 hover:border-amber-500'
            }`}
            title={infographicLabels.generate}
          >
            {isGeneratingInfographic ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <LayoutTemplate size={16} className="mr-2" />
            )}
            <span className="hidden sm:inline">
              {infographicLabels.button}
            </span>
          </button>

          <button 
            onClick={handleExport}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title={labels.export}
          >
            <Download size={20} />
          </button>
          
          <button 
            onClick={handleCopy}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title={copied ? labels.copied : labels.copy}
          >
            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
          </button>

          <button 
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full transition-colors font-sans text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-green-900/20"
            title={labels.share}
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Podcast/Audio Player Section */}
      {audioUrl && (
        <div ref={playerContainerRef} className="bg-gradient-to-r from-neutral-900 to-neutral-900/90 border border-amber-500/30 rounded-xl p-6 mb-10 animate-fadeIn no-print shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group">
           {/* Subtle background glow */}
           <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
           
           <audio 
             ref={audioRef} 
             src={audioUrl} 
             onTimeUpdate={handleTimeUpdate}
             onLoadedMetadata={handleLoadedMetadata}
             onEnded={handleEnded}
             className="hidden" 
           />
           
           <div className="flex flex-col gap-6 relative z-10">
             {/* Header */}
             <div className="flex justify-between items-center">
               <div className="flex items-center space-x-5">
                 <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-obsidian shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse-slow">
                   <Headphones size={24} />
                 </div>
                 <div>
                   <h4 className="text-white text-lg font-display font-bold tracking-wide">{audioLabels.title}</h4>
                   <p className="text-amber-500/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                     AI Analysis
                   </p>
                 </div>
               </div>
               
                {/* Custom Download Button */}
                <a 
                  href={audioUrl} 
                  download={`nietzsche-gaia-ciencia-${poem.id}-audio-summary.wav`}
                  className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 bg-neutral-800 hover:bg-amber-600 text-neutral-400 hover:text-white rounded-full transition-all duration-300 border border-white/10 hover:border-transparent group/btn"
                  title={audioLabels.download}
                >
                  <Download size={18} className="md:mr-2 group-hover/btn:scale-110 transition-transform" />
                  <span className="hidden md:inline text-xs font-bold uppercase tracking-widest">{audioLabels.download}</span>
                </a>
             </div>

             {/* Player Controls */}
             <div className="flex items-center gap-6 pt-2">
               <button 
                 onClick={togglePlay}
                 className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex-shrink-0"
               >
                 {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
               </button>

               <div className="flex-1 flex flex-col justify-center gap-2">
                 {/* Progress Bar */}
                 <div className="relative w-full h-1.5 group/slider">
                   <input 
                     type="range"
                     min="0"
                     max={duration || 100}
                     value={currentTime}
                     onChange={handleSeek}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                   />
                   <div className="absolute inset-0 bg-white/10 rounded-full overflow-hidden z-10 pointer-events-none">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                      />
                   </div>
                   {/* Thumb visual enhancement on hover */}
                   <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 pointer-events-none z-30"
                      style={{ left: `${(currentTime / (duration || 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                   ></div>
                 </div>

                 <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-500">
                   <span className="text-amber-500">{formatTime(currentTime)}</span>
                   <span>{formatTime(duration)}</span>
                 </div>
               </div>
             </div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Poem Content */}
        <div className={`lg:col-span-3 ${isChatOpen ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white text-black p-12 sm:p-16 shadow-2xl relative overflow-hidden print:shadow-none print:p-0">
             {/* Paper Texture Effect overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-200">
                  <Tag size={12} className="mr-2" />
                  {labels.categories[poem.category]}
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-neutral-900 border-b-2 border-amber-500 inline-block pb-4">
                {poem.title[lang]}
              </h1>
              <p className="font-serif text-sm text-neutral-500 italic mb-12">
                A Gaia Ciência &mdash; Poema #{poem.id}
              </p>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                {/* Original German */}
                <div className="font-serif text-neutral-500 text-lg leading-relaxed whitespace-pre-wrap border-r border-neutral-200 pr-6 hidden md:block print:hidden">
                  <h4 className="text-xs uppercase tracking-widest text-amber-600 mb-4 font-sans">Original</h4>
                  {poem.originalGerman}
                </div>

                {/* Translation */}
                <div className="font-serif text-neutral-900 text-xl leading-relaxed whitespace-pre-wrap pl-2">
                  <h4 className="text-xs uppercase tracking-widest text-amber-600 mb-4 font-sans md:hidden">Tradução</h4>
                   {poem.content[lang]}
                </div>
              </div>
            </div>

            <div className="mt-16 text-center print:hidden flex flex-col sm:flex-row justify-center gap-4">
               <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-amber-500 border border-amber-500/30 hover:bg-amber-500 hover:text-white transition-all duration-300 font-sans uppercase tracking-widest text-sm font-bold shadow-lg"
              >
                <Sparkles size={16} className="mr-2" />
                {labels.askAI}
              </button>

              <button 
                onClick={handleGeneratePodcast}
                disabled={isGeneratingAudio}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50 hover:border-amber-500 transition-all duration-300 font-sans uppercase tracking-widest text-sm font-bold shadow-sm"
              >
                {isGeneratingAudio ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Headphones size={16} className="mr-2" />
                )}
                {isGeneratingAudio ? audioLabels.generating : (audioUrl ? audioLabels.listen : audioLabels.button)}
              </button>
            </div>
          </div>
          
          {/* ART GIFT SECTION */}
          <div className="mt-12 bg-neutral-900 border border-amber-500/20 p-8 relative overflow-hidden group no-print">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none transition-all group-hover:bg-amber-500/10"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1">
                 <div className="flex items-center space-x-2 mb-4">
                   <div className="p-2 bg-amber-900/30 rounded-lg">
                     <ImageIcon className="text-amber-500" size={24} />
                   </div>
                   <h3 className="text-2xl font-display text-white">{artLabels.title}</h3>
                 </div>
                 <p className="font-serif text-neutral-400 italic mb-6">
                   {artLabels.subtitle}
                 </p>
                 
                 {!generatedImageUrl && (
                   <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                          {artLabels.selectStyle}
                        </label>
                        <div className="relative">
                          <select 
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 text-white pl-4 pr-10 py-3 rounded-sm appearance-none focus:border-amber-500 outline-none transition-colors"
                          >
                            <option value="surrealism">{artLabels.styles.surrealism}</option>
                            <option value="expressionism">{artLabels.styles.expressionism}</option>
                            <option value="oil">{artLabels.styles.oil}</option>
                            <option value="oil_expressive">{artLabels.styles.oil_expressive}</option>
                            <option value="sketch">{artLabels.styles.sketch}</option>
                            <option value="cyberpunk">{artLabels.styles.cyberpunk}</option>
                          </select>
                          <Palette className="absolute right-3 top-3 text-neutral-600 pointer-events-none" size={16} />
                        </div>
                      </div>

                      <button 
                        onClick={handleGenerateArt}
                        disabled={isGeneratingArt}
                        className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold uppercase tracking-widest rounded-sm shadow-lg hover:shadow-amber-900/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         {isGeneratingArt ? (
                           <>
                             <Loader2 size={16} className="mr-2 animate-spin" />
                             {artLabels.generating}
                           </>
                         ) : (
                           <>
                             <Sparkles size={16} className="mr-2" />
                             {artLabels.generate}
                           </>
                         )}
                      </button>
                   </div>
                 )}
               </div>

               {/* Image Display Area */}
               <div className="w-full md:w-1/2 flex justify-center">
                  {generatedImageUrl ? (
                    <div className="relative group/image">
                       <div className="p-2 bg-neutral-950 border-2 border-amber-500/30 shadow-2xl transform rotate-1 transition-transform group-hover/image:rotate-0">
                         <img 
                           src={generatedImageUrl} 
                           alt="Generated Art" 
                           className="w-full h-auto max-h-[350px] object-cover filter sepia-[0.2]"
                         />
                       </div>
                       <a 
                         href={generatedImageUrl}
                         download={`nietzsche-art-${poem.id}-${selectedStyle}.png`}
                         className="absolute bottom-6 right-6 bg-obsidian/80 backdrop-blur text-white p-3 rounded-full hover:bg-amber-600 transition-colors shadow-lg"
                         title={artLabels.download}
                       >
                         <Download size={20} />
                       </a>
                    </div>
                  ) : (
                    <div className="w-full h-[250px] bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center text-neutral-700 border-dashed rounded-sm">
                       <ImageIcon size={48} className="mb-4 opacity-20" />
                       <span className="text-xs uppercase tracking-widest opacity-40">Preview</span>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* INFOGRAPHIC GENERATION SECTION */}
           <div ref={infographicRef} className="mt-8 bg-black/60 border border-amber-500/20 p-8 relative overflow-hidden group no-print">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none transition-all group-hover:bg-amber-500/10"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1">
                 <div className="flex items-center space-x-2 mb-4">
                   <div className="p-2 bg-amber-900/30 rounded-lg">
                     <LayoutTemplate className="text-amber-500" size={24} />
                   </div>
                   <h3 className="text-2xl font-display text-white">{infographicLabels.title}</h3>
                 </div>
                 <p className="font-serif text-neutral-400 italic mb-6">
                   {infographicLabels.subtitle}
                 </p>
                 
                 {!infographicUrl && (
                   <div className="space-y-4">
                      <p className="text-xs text-neutral-500 mb-4 border-l-2 border-amber-500 pl-3">
                        {infographicLabels.note}
                      </p>

                      <button 
                        onClick={handleGenerateInfographic}
                        disabled={isGeneratingInfographic}
                        className="w-full py-3 bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-amber-900 hover:to-amber-800 border border-amber-500/30 text-white font-bold uppercase tracking-widest rounded-sm shadow-lg hover:shadow-amber-900/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         {isGeneratingInfographic ? (
                           <>
                             <Loader2 size={16} className="mr-2 animate-spin" />
                             {infographicLabels.generating}
                           </>
                         ) : (
                           <>
                             <Activity size={16} className="mr-2" />
                             {infographicLabels.generate}
                           </>
                         )}
                      </button>
                   </div>
                 )}
               </div>

               {/* Infographic Display Area */}
               <div className="w-full md:w-1/2 flex justify-center">
                  {infographicUrl ? (
                    <div className="relative group/infographic w-full">
                       <div className="p-2 bg-neutral-950 border border-amber-500/30 shadow-2xl">
                         <img 
                           src={infographicUrl} 
                           alt="Infographic" 
                           className="w-full h-auto object-contain max-h-[400px]"
                         />
                       </div>
                       
                       <div className="absolute -bottom-10 right-0 flex items-center gap-4">
                         <a 
                           href={infographicUrl}
                           download={`nietzsche-infographic-${poem.id}.png`}
                           className="text-neutral-400 hover:text-white flex items-center text-xs font-bold uppercase tracking-widest transition-colors"
                           title={infographicLabels.download}
                         >
                           <Download size={16} className="mr-2" />
                           <span className="hidden sm:inline">{infographicLabels.download}</span>
                         </a>
                       </div>
                    </div>
                  ) : (
                    <div className="w-full h-[300px] bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center text-neutral-700 border-dashed rounded-sm relative">
                       {isGeneratingInfographic ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10 p-6 text-center">
                             <div className="w-12 h-12 border-4 border-amber-900 border-t-amber-500 rounded-full animate-spin mb-4"></div>
                             <p className="text-amber-500 font-display animate-pulse">{infographicLabels.generating}</p>
                          </div>
                       ) : (
                         <>
                           <LayoutTemplate size={48} className="mb-4 opacity-20" />
                           <span className="text-xs uppercase tracking-widest opacity-40">Infographic Preview</span>
                         </>
                       )}
                    </div>
                  )}
               </div>
            </div>
          </div>

        </div>

        {/* AI Chat Section */}
        {isChatOpen && (
          <div className="lg:col-span-2 flex flex-col h-[600px] lg:h-auto bg-neutral-900 border border-amber-500/20 rounded-sm overflow-hidden animate-slideInRight no-print fixed lg:static inset-0 z-50 lg:z-auto m-4 lg:m-0">
            <div className="bg-neutral-800 p-4 border-b border-white/5 flex justify-between items-center">
               <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-2"></div>
                  <h3 className="text-amber-500 font-display font-bold">{labels.chatTitle}</h3>
               </div>
               <div className="flex items-center">
                 <button 
                  onClick={handleExportChat}
                  disabled={messages.length === 0}
                  className="text-neutral-400 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors mr-2"
                  title={labels.exportChat}
                 >
                   <FileText size={18} />
                 </button>
                 <button onClick={() => setIsChatOpen(false)} className="lg:hidden text-neutral-400">
                    <ArrowLeft />
                 </button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-950/50">
               {messages.length === 0 && (
                 <div className="text-center text-neutral-500 mt-10 p-4">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-serif italic">{labels.chatIntro}</p>
                 </div>
               )}
               {messages.map((msg, idx) => (
                 <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-4 rounded-sm flex flex-col ${
                     msg.role === 'user' 
                       ? 'bg-amber-900/30 border border-amber-500/30 text-amber-100' 
                       : 'bg-neutral-800 border border-white/5 text-neutral-300 font-serif'
                   }`}>
                     <div>{msg.text}</div>
                     
                     {/* Share Buttons for AI responses */}
                     {msg.role === 'model' && !msg.isLoading && (
                       <div className="mt-3 pt-2 border-t border-white/5 flex justify-end gap-3">
                         <button
                           onClick={() => handleEmailShare(msg.text)}
                           className="text-neutral-500 hover:text-white transition-colors"
                           title="Share via Email"
                         >
                           <Mail size={14} />
                         </button>
                         <button
                           onClick={() => handleTwitterShare(msg.text)}
                           className="text-neutral-500 hover:text-[#1DA1F2] transition-colors"
                           title="Share on Twitter"
                         >
                           <Twitter size={14} />
                         </button>
                         <button
                           onClick={() => handleShareMessage(msg.text, idx)}
                           className="flex items-center text-[10px] uppercase tracking-widest text-neutral-500 hover:text-amber-500 transition-colors"
                           title={labels.chat?.shareResponse}
                         >
                           {copiedResponseId === idx ? (
                             <>
                               <Check size={14} className="mr-1" />
                               <span className="hidden sm:inline">{labels.chat?.responseCopied}</span>
                             </>
                           ) : (
                             <>
                               <Share2 size={14} className="mr-1" />
                               <span className="hidden sm:inline">{labels.chat?.shareResponse}</span>
                             </>
                           )}
                         </button>
                       </div>
                     )}
                   </div>
                 </div>
               ))}
               <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-neutral-900 border-t border-white/5">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={labels.aiPlaceholder}
                  className="flex-1 bg-neutral-800 border-transparent focus:border-amber-500/50 rounded-sm px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-3 bg-amber-600 hover:bg-amber-500 text-white rounded-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemDetail;