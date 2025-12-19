import React from 'react';
import { BLOG_POSTS, UI_LABELS } from '../constants';
import { Language } from '../types';
import { Calendar, Clock, ArrowRight, Twitter, Facebook } from 'lucide-react';

interface BlogProps {
  lang: Language;
}

const Blog: React.FC<BlogProps> = ({ lang }) => {
  const handleShare = (platform: 'twitter' | 'facebook', post: typeof BLOG_POSTS[0]) => {
    // In a real application, we would have a specific URL for the post.
    // For now, we use the current page URL.
    const url = window.location.href;
    const text = `${post.title} - ${post.excerpt}`;
    
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 animate-fadeIn">
      <h2 className="font-display text-4xl text-white mb-12 text-center border-b border-amber-500/30 pb-6">
        {UI_LABELS[lang].blog}
      </h2>
      
      <div className="space-y-12">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="bg-neutral-900/30 border-l-2 border-amber-500 p-8 hover:bg-neutral-900/50 transition-colors group">
            <div className="flex items-center space-x-4 text-xs text-amber-500 uppercase tracking-widest mb-4 font-bold">
              <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
              <span className="flex items-center"><Clock size={12} className="mr-1" /> {post.readTime}</span>
            </div>
            
            <h3 className="text-2xl font-display text-white mb-4 group-hover:text-amber-500 transition-colors">{post.title}</h3>
            <p className="text-neutral-400 font-serif leading-relaxed mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button className="inline-flex items-center px-5 py-2.5 bg-neutral-800 hover:bg-amber-600 text-amber-500 hover:text-white border border-amber-500/30 hover:border-transparent rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300">
                {UI_LABELS[lang].readArticle} 
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center space-x-3 bg-neutral-900/50 px-3 py-1.5 rounded-full border border-white/5">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mr-1">
                  {UI_LABELS[lang].share}:
                </span>
                <button 
                  onClick={() => handleShare('twitter', post)}
                  className="p-1.5 text-neutral-400 hover:text-[#1DA1F2] transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter size={16} />
                </button>
                <button 
                  onClick={() => handleShare('facebook', post)}
                  className="p-1.5 text-neutral-400 hover:text-[#4267B2] transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;