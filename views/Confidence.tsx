import React, { useState } from 'react';
import { AFFIRMATIONS } from '../constants';

const Confidence: React.FC = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  const nextAffirmation = () => {
    setCurrentAffirmation((prev) => (prev + 1) % AFFIRMATIONS.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6 text-center text-white pb-24">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        
        <div className="mb-6 text-5xl">✨</div>
        
        <h2 className="text-xl font-medium tracking-wide opacity-80 mb-8 uppercase">Espelho da Verdade</h2>
        
        <div className="min-h-[160px] flex items-center justify-center">
            <p className="text-2xl md:text-3xl font-serif leading-relaxed animate-fade-in font-bold">
            "{AFFIRMATIONS[currentAffirmation].text}"
            </p>
        </div>

        <div className="mt-12 flex flex-col gap-4">
            <button 
                onClick={nextAffirmation}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-opacity-90 transition-all active:scale-95"
            >
                Receber nova mensagem
            </button>
            <p className="text-xs opacity-60">Lembre-se: você é suficiente.</p>
        </div>
      </div>
    </div>
  );
};

export default Confidence;