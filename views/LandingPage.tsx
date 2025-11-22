import React from 'react';
import Button from '../components/Button';
import { TESTIMONIALS } from '../constants';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-primary-700 tracking-tighter">
            Skinovaai<span className="text-accent">.</span>
          </div>
          <div className="flex gap-4">
            <button onClick={onLogin} className="text-sm font-medium text-slate-600 hover:text-primary-600">Login</button>
            <Button size="sm" onClick={onGetStarted}>Começar Agora</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 left-0 -ml-20 w-72 h-72 bg-accent-light rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s'}}></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-700 text-xs font-bold tracking-wide mb-6 border border-primary-100">
            ✨ NOVA ERA DA BELEZA VIRTUAL
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            Descubra a beleza que <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent">realmente te vê.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experimentação virtual, análise de pele com IA e rotinas personalizadas. 
            Sua consultora de beleza pessoal, no seu bolso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => window.open('https://pay.cakto.com.br/4b9nvf6_660191', '_blank')}
              className="bg-gradient-to-r from-primary-600 to-accent border-none text-white shadow-xl shadow-primary-200 font-bold transform hover:scale-105 transition-all"
            >
              Quero me ver com novos olhos!
            </Button>
            <Button size="lg" variant="outline" onClick={onLogin}>Ver Demonstração</Button>
          </div>

          {/* Featured Beauty Image */}
          <div className="relative max-w-md mx-auto group">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-accent rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
             <img 
              src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop" 
              alt="Beauty Model" 
              className="relative rounded-[2rem] shadow-2xl border-4 border-white w-full object-cover transform group-hover:scale-[1.01] transition-transform duration-500" 
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
               <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">💄 Makeup</span>
               <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">✨ Skincare</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-16">Tudo o que você precisa para brilhar</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Virtual Try-On", desc: "Teste maquiagens em tempo real sem sujeira.", icon: "💄" },
              { title: "IA Skin Scan", desc: "Descubra seu tom e subtom exatos em segundos.", icon: "🤳" },
              { title: "Rotinas Smart", desc: "Skincare passo-a-passo adaptado ao seu tempo.", icon: "⏰" },
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 hover:bg-primary-50 transition-colors border border-slate-100 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-primary-50 border-y border-primary-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-slate-700 italic mb-4">"{t.text.replace('Blindaskin', 'Skinovaai')}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/100/100?random=${i+10}`} alt={t.name} />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500 uppercase">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-serif text-2xl font-bold text-white">Skinovaai.</div>
          <div className="text-sm text-slate-500">© 2024 Skinovaai AI. Todos os direitos reservados.</div>
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/blindaskin/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-91aKKMkTCqu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              TikTok
            </a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;