import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';

interface AnalysisProps {
  onBack: () => void;
  onShowRecommendations: () => void;
  onTryOn: (shadeId: string) => void;
}

const Analysis: React.FC<AnalysisProps> = ({ onBack, onShowRecommendations, onTryOn }) => {
  const [step, setStep] = useState<'camera' | 'scanning' | 'results'>('camera');
  const [scanMessage, setScanMessage] = useState('Iniciando...');
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock Data for Shades
  const SUGGESTED_SHADES = [
    { id: 'shade_04', name: 'Bege Médio 04', brand: 'Lumina', color: '#e0ac69', match: 98, storeLink: 'https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-91aKKMkTCqu' },
    { id: 'shade_05', name: 'Bege Claro 05', brand: 'GlowUp', color: '#e8b880', match: 92, storeLink: 'https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-91aKKMkTCqu' },
    { id: 'shade_03', name: 'Bege Médio 03', brand: 'Lumina', color: '#d69d5e', match: 89, storeLink: 'https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-91aKKMkTCqu' },
  ];

  // Mock Data for Best Features
  const BEST_FEATURES = [
    {
      feature: 'Olhos',
      title: 'Olhar Magnético',
      icon: '👁️',
      description: 'Seus olhos amendoados têm um formato exótico e simétrico que merece destaque. ✨ 💖',
      tip: 'Aposte em um delineado "foxy eyes" para alongar o olhar e criar um efeito lift natural. 🦊 💅',
      extraTips: [
        'Use sombras cintilantes no canto interno para "abrir" o olhar. ✨ 💫',
        'Máscara de cílios focada nos fios externos alonga ainda mais. 🖤 👁️',
        'Sobrancelhas penteadas para cima (Brow Lamination) emolduram o olhar. 🤨 ✨'
      ],
      productRecommendation: 'Delineador Líquido Ultra Black',
      productImage: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?q=80&w=200&auto=format&fit=crop',
      storeLink: 'https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-91aKKMkTCqu'
    },
    {
      feature: 'Lábios',
      title: 'Arco do Cupido',
      icon: '💋',
      description: 'O arco do cupido é bem desenhado, ideal para cores vibrantes e texturas gloss. 💄 🌸',
      tip: 'Use um lápis de contorno um tom acima do batom para dar volume natural aos lábios. 👄 ✏️',
      extraTips: [
        'Aplique iluminador no "V" do arco do cupido para destacar o desenho. ✨ 💖',
        'Gloss apenas no centro dos lábios cria um efeito 3D instantâneo. 💖 🌟',
        'Para maior durabilidade, preencha todo o lábio com lápis antes do batom. 🖍️ 💋'
      ],
      productRecommendation: 'Kit Lip Volumizer & Gloss',
      productImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062dc?q=80&w=200&auto=format&fit=crop',
      storeLink: 'https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-91aKKMkTCqu'
    }
  ];

  // Initialize Camera
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied or not available", err);
        // Fallback or handle error
      }
    };

    if (step === 'camera' || step === 'scanning') {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [step]);

  const startScan = () => {
    setStep('scanning');
    
    const messages = [
      'Analisando geometria facial...',
      'Mapeando 68 pontos de referência...',
      'Identificando seus pontos fortes...',
      'Determinando tom de pele...',
      'Verificando textura e poros...',
      'Calculando score de saúde...'
    ];
    
    let msgIndex = 0;
    setScanMessage(messages[0]);

    const interval = setInterval(() => {
      msgIndex++;
      if (msgIndex < messages.length) {
        setScanMessage(messages[msgIndex]);
      }
    }, 800); // Change message every 800ms for better readability

    // Simulate AI Processing time total 4800ms
    setTimeout(() => {
      clearInterval(interval);
      setStep('results');
    }, 4800);
  };

  if (step === 'results') {
    return (
      <div className="min-h-screen bg-slate-50 pb-safe animate-fade-in">
        {/* Header */}
        <div className="bg-white sticky top-0 z-10 px-4 py-4 shadow-sm flex items-center justify-between">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors">
            ✕
          </button>
          <h1 className="text-lg font-serif font-bold text-slate-900">Análise Completa</h1>
          <div className="w-8"></div>
        </div>

        <div className="p-4 max-w-md mx-auto">
          {/* User Face Thumbnail with Analysis Overlay */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary-400 to-accent">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-200 border-4 border-white relative">
                {/* Placeholder for captured image */}
                <img src="https://picsum.photos/200/200?face" alt="User" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white shadow-sm">
                  ✓
                </div>
              </div>
            </div>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 text-center">
            <p className="text-sm text-slate-400 uppercase tracking-wide font-bold mb-1">Qualidade da Pele</p>
            <div className="text-4xl font-serif font-bold text-slate-900 mb-2">94<span className="text-lg text-slate-400 font-sans">/100</span></div>
            <p className="text-green-600 text-sm font-medium">Sua pele está radiante hoje!</p>
          </div>

          {/* Detailed Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Skin Tone */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100">
              <div className="text-xs text-slate-400 font-bold uppercase mb-2">Tom de Pele</div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#e0ac69] border border-slate-200 shadow-inner"></div>
                <span className="font-bold text-slate-700">Médio</span>
              </div>
            </div>

            {/* Undertone */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100">
              <div className="text-xs text-slate-400 font-bold uppercase mb-2">Subtom</div>
              <div className="flex items-center gap-2">
                <span className="text-lg">☀️</span>
                <span className="font-bold text-slate-700">Quente</span>
              </div>
            </div>

            {/* Face Shape */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100">
              <div className="text-xs text-slate-400 font-bold uppercase mb-2">Formato</div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🥚</span>
                <span className="font-bold text-slate-700">Oval</span>
              </div>
            </div>

            {/* Skin Type */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100">
              <div className="text-xs text-slate-400 font-bold uppercase mb-2">Tipo</div>
              <div className="flex items-center gap-2">
                <span className="text-lg">💧</span>
                <span className="font-bold text-slate-700">Mista</span>
              </div>
            </div>
          </div>

          {/* Detected Conditions */}
          <div className="bg-slate-50 rounded-2xl p-4 mb-8">
            <h3 className="font-bold text-slate-900 mb-3">Detalhes Detectados</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Hidratação
                </span>
                <span className="font-bold text-slate-900">Excelente</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  Zona T
                </span>
                <span className="font-bold text-slate-900">Leve Oleosidade</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Olheiras
                </span>
                <span className="font-bold text-slate-900">Pouco visíveis</span>
              </div>
            </div>
          </div>

          {/* Best Features & Tips (Visual Highlight Section) */}
          <div className="mb-8">
            <h3 className="font-serif font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span> Seus Pontos Fortes
            </h3>
            
            <div className="grid gap-5">
              {BEST_FEATURES.map((item, index) => (
                <div key={index} className="bg-gradient-to-b from-primary-100 to-white rounded-3xl p-6 shadow-lg shadow-primary-100/50 border border-primary-100 relative overflow-hidden group">
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Large Centered Icon */}
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-xl shadow-primary-100 border-4 border-white mb-4 relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                        {item.icon}
                    </div>
                    
                    {/* Title */}
                    <h4 className="font-serif font-bold text-2xl text-slate-900 mb-1 leading-tight">
                      Seu Ponto Forte: <span className="text-primary-600">{item.feature}</span>
                    </h4>
                    <p className="text-slate-500 font-medium mb-4 text-sm uppercase tracking-wide">{item.title}</p>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 px-2 font-medium">
                      {item.description}
                    </p>
                    
                    {/* Transformed Tip Button */}
                    <button
                      onClick={() => setSelectedFeature(item)}
                      className="mb-6 px-6 py-3 bg-white border border-primary-200 text-primary-700 rounded-full font-bold text-sm shadow-sm hover:bg-primary-50 hover:shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                    >
                      <span>💡</span> Ver Dica Personalizada
                    </button>

                    {/* Product Card with Buy Button */}
                    <div className="w-full bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all group/product relative overflow-hidden flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                           <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0 overflow-hidden">
                               <img src={item.productImage} alt={item.productRecommendation} className="w-full h-full object-cover" />
                           </div>
                           <div className="min-w-0 text-left">
                               <div className="text-[10px] text-slate-400 uppercase font-bold">Recomendado</div>
                               <div className="font-bold text-slate-900 text-sm truncate">{item.productRecommendation}</div>
                           </div>
                        </div>
                        <a 
                           href={item.storeLink}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-full shadow-lg hover:bg-slate-800 transition-all flex-shrink-0 flex items-center gap-1 active:scale-95"
                        >
                           Comprar 🛍️
                        </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Foundation Match Carousel */}
          <div className="mb-8">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>🎨</span> Tons Recomendados
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
              {SUGGESTED_SHADES.map((shade) => (
                <div key={shade.id} className="min-w-[180px] bg-white p-3 rounded-xl border border-slate-100 shadow-sm snap-center flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-full shadow-inner border border-slate-100" 
                      style={{ backgroundColor: shade.color }}
                    ></div>
                    <div>
                      <div className="text-xs text-slate-500">{shade.brand}</div>
                      <div className="font-bold text-sm text-slate-900 leading-tight">{shade.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {shade.match}% Match
                    </span>
                  </div>
                  
                  <div className="mt-auto flex flex-col gap-2">
                      <button 
                        onClick={() => onTryOn(shade.id)}
                        className="w-full bg-slate-900 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <span>✨</span> Provador Virtual
                      </button>
                      <a 
                        href={shade.storeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-50 hover:border-primary-200 transition-colors"
                      >
                        <span>🛍️</span> Comprar
                      </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <Button 
            fullWidth 
            size="lg" 
            onClick={onShowRecommendations}
            variant="outline"
            className="mb-3 border-primary-200 text-primary-700 hover:bg-primary-50"
          >
            Ver Rotina Completa Sugerida
          </Button>

          <Button 
            fullWidth 
            size="lg" 
            onClick={() => window.open('https://pay.cakto.com.br/4b9nvf6_660191', '_blank')}
            className="animate-bounce-subtle mb-4 bg-gradient-to-r from-primary-600 to-accent border-none text-white shadow-xl shadow-primary-200 font-bold text-lg transform hover:scale-105 transition-all"
          >
            Quero me ver com novos olhos!
          </Button>

          <p className="text-center text-xs text-slate-400 mb-8">
            Baseado na análise de IA v2.5
          </p>

          {/* Social Links Footer */}
          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-center text-sm font-bold text-slate-900 mb-4">Siga nossas redes para mais dicas! ✨</p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://www.instagram.com/blindaskin/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm font-bold"
              >
                📸 Instagram
              </a>
              <a 
                href="https://www.tiktok.com/@blindaskin?_r=1&_t=ZM-91aKKMkTCqu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm font-bold"
              >
                🎵 TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Tips Modal */}
        {selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedFeature(null)}>
            <div className="bg-white rounded-3xl w-full max-w-xs p-6 relative animate-fade-in-up shadow-2xl" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedFeature(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">✕</button>
              
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto border border-primary-100 shadow-inner">
                 {selectedFeature.icon}
              </div>
              
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-1 text-center">{selectedFeature.title}</h3>
              <p className="text-center text-slate-500 text-xs uppercase tracking-wider mb-6 font-bold">Guia de Maquiagem</p>

              {/* Main Tip Highlight */}
              <div className="bg-yellow-50 p-4 rounded-xl mb-6 border border-yellow-100 shadow-sm">
                  <p className="text-yellow-800 font-bold text-[10px] uppercase mb-1 flex items-center gap-1">
                    <span>⭐</span> Dica Principal
                  </p>
                  <p className="text-slate-800 italic text-sm leading-relaxed">"{selectedFeature.tip}"</p>
              </div>
              
              {/* Extra Tips List */}
              <h4 className="font-bold text-slate-900 text-sm mb-3 pl-1">Mais segredos de expert:</h4>
              <ul className="space-y-3 mb-6">
                {selectedFeature.extraTips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-primary-500 font-bold text-lg leading-none mt-[-2px]">•</span>
                      <span className="leading-snug">{tip}</span>
                    </li>
                ))}
              </ul>
              
              <Button fullWidth onClick={() => setSelectedFeature(null)}>Entendi, amei! 💄</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Camera View */}
      <div className="relative flex-1 overflow-hidden rounded-b-3xl">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
        />
        
        {/* Overlay Guide with Pulsing Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`border-2 rounded-[50%] w-64 h-80 transition-all duration-700 ease-in-out ${
            step === 'scanning' 
            ? 'border-primary-400 shadow-[0_0_40px_rgba(236,72,153,0.6)] scale-105 animate-[pulse_2s_infinite]' 
            : 'border-white/50'
          }`}></div>
        </div>

        {/* Scanning Light Animation */}
        {step === 'scanning' && (
          <div className="absolute inset-0 z-20 pointer-events-none">
             <div className="w-full h-1 bg-primary-400 shadow-[0_0_20px_rgba(244,114,182,1)] animate-[scan_2s_ease-in-out_infinite] absolute top-0"></div>
             <div className="absolute bottom-24 left-0 right-0 text-center px-4 flex justify-center">
                <span className="inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full text-white font-medium text-sm animate-pulse transition-all duration-300 border border-white/20 shadow-2xl">
                   <svg className="animate-spin h-4 w-4 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   {scanMessage}
                </span>
             </div>
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 p-4 pt-safe z-30 flex justify-between">
           <button onClick={onBack} className="text-white w-10 h-10 rounded-full bg-black/20 backdrop-blur flex items-center justify-center hover:bg-black/40 transition-colors">✕</button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white h-48 -mt-6 relative z-10 rounded-t-3xl p-6 flex flex-col items-center justify-center">
        {step === 'camera' && (
          <div className="animate-fade-in-up">
            <p className="text-slate-600 mb-6 text-center max-w-xs">Posicione seu rosto na moldura e garanta boa iluminação.</p>
            <button 
              onClick={startScan}
              className="w-20 h-20 rounded-full bg-white border-4 border-slate-200 p-1 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 mx-auto shadow-lg"
            >
              <div className="w-full h-full bg-primary-600 rounded-full shadow-inner"></div>
            </button>
          </div>
        )}
        {step === 'scanning' && (
           <div className="text-center animate-fade-in">
             <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3"></div>
             <h3 className="font-bold text-lg text-slate-900 mb-1">Processando...</h3>
             <p className="text-slate-500 text-sm">{scanMessage}</p>
           </div>
        )}
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Analysis;