import React, { useState, useEffect } from 'react';
import { UserProfile, AppView } from '../types';
import Button from '../components/Button';

interface DashboardProps {
  user: UserProfile;
  setView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setView }) => {
  // Tutorial State
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [tutorialActive, setTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem('skinovaai_tutorial_completed');
    if (!hasCompletedTutorial) {
      // Small delay to ensure smooth entrance animation
      const timer = setTimeout(() => setShowWelcomeModal(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTutorial = () => {
    setShowWelcomeModal(false);
    setTutorialActive(true);
    setCurrentStep(0);
  };

  const completeTutorial = () => {
    setTutorialActive(false);
    setShowWelcomeModal(false);
    localStorage.setItem('skinovaai_tutorial_completed', 'true');
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTutorial();
    }
  };

  const tutorialSteps = [
    {
      title: "Acompanhe sua Rotina",
      text: "Aqui você gerencia seus cuidados diários. Marque os passos concluídos para manter o 'glow' em dia!",
      position: "top-48" // Positioning helper
    },
    {
      title: "Provador Virtual",
      text: "Experimente maquiagens reais usando nossa tecnologia de Realidade Aumentada antes de comprar.",
      position: "bottom-32"
    },
    {
      title: "Skin Scan com IA",
      text: "Analise sua pele em segundos para descobrir seu tom exato e receber recomendações personalizadas.",
      position: "bottom-32"
    }
  ];

  // Helper to determine if an element should pop out with spotlight effect
  const isHighlighted = (stepIndex: number) => tutorialActive && currentStep === stepIndex;

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto min-h-screen bg-slate-50 relative">
      
      {/* Tutorial Backdrop */}
      {(tutorialActive || showWelcomeModal) && (
        <div className="fixed inset-0 bg-slate-900/80 z-40 transition-opacity duration-500 backdrop-blur-sm"></div>
      )}

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white rounded-3xl p-8 max-w-xs text-center shadow-2xl relative overflow-hidden border border-white/20">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-accent-light/30 rounded-full blur-2xl"></div>
            <div className="text-5xl mb-4">✨</div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Bem-vinda, {user.name}!</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">Quer fazer um tour rápido para descobrir como realçar sua beleza com o Skinovaai?</p>
            <div className="flex flex-col gap-3">
              <Button onClick={startTutorial} className="shadow-xl shadow-primary-200/50">Sim, mostrar tour</Button>
              <button 
                onClick={completeTutorial}
                className="text-sm text-slate-400 hover:text-slate-600 font-medium py-2 transition-colors"
              >
                Agora não, obrigado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Tooltip Card */}
      {tutorialActive && (
        <div className={`fixed left-4 right-4 z-50 bg-white p-5 rounded-2xl shadow-2xl animate-bounce-subtle transition-all duration-500 ease-in-out border border-slate-100 ${tutorialSteps[currentStep].position === 'top-48' ? 'top-[280px]' : 'bottom-24'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-primary-600 text-lg">{tutorialSteps[currentStep].title}</h3>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full border border-slate-200">
              PASS0 {currentStep + 1}/{tutorialSteps.length}
            </span>
          </div>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed border-b border-slate-50 pb-4">
            {tutorialSteps[currentStep].text}
          </p>
          <div className="flex justify-between items-center">
            <button onClick={completeTutorial} className="text-xs text-slate-400 font-medium hover:text-slate-800 px-2">
              Pular tour
            </button>
            <Button size="sm" onClick={nextStep}>
              {currentStep === tutorialSteps.length - 1 ? "Concluir" : "Próximo →"}
            </Button>
          </div>
          {/* Arrow indicator */}
          <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 shadow-sm ${tutorialSteps[currentStep].position === 'top-48' ? '-top-2' : '-bottom-2'}`}></div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative z-0">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Olá, {user.name} 👋</h1>
          <p className="text-sm text-slate-500">Vamos realçar sua beleza hoje?</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-200 flex items-center justify-center text-primary-700 font-bold shadow-sm">
          {user.name.charAt(0)}
        </div>
      </div>

      {/* Daily Routine Card (Step 0 Target) */}
      <div className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6 relative overflow-hidden transition-all duration-500 ease-out ${isHighlighted(0) ? 'z-50 ring-[6px] ring-white/50 scale-105 shadow-2xl' : 'z-0 hover:shadow-md'}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full -mr-10 -mt-10 mix-blend-multiply opacity-50"></div>
        <h2 className="text-lg font-bold text-slate-900 mb-2 relative z-10">Rotina Matinal</h2>
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-green-400 rounded-full shadow-sm"></div>
          </div>
          <span className="text-xs font-medium text-slate-400">30%</span>
        </div>
        <p className="text-sm text-slate-500 mb-4 relative z-10">Faltam 3 passos para completar seu glow matinal.</p>
        <Button size="sm" fullWidth onClick={() => setView(AppView.ROUTINES)}>Continuar Rotina</Button>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        
        {/* Virtual Try-On (Step 1 Target) */}
        <button 
          onClick={() => setView(AppView.TRY_ON)}
          className={`bg-primary-600 text-white p-5 rounded-2xl shadow-lg shadow-primary-200 text-left transition-all duration-500 ease-out ${isHighlighted(1) ? 'z-50 ring-[6px] ring-white/50 scale-105 shadow-2xl' : 'hover:scale-[1.02] active:scale-95'}`}
        >
          <div className="text-2xl mb-2">💄</div>
          <div className="font-bold text-sm">Provador Virtual</div>
          <div className="text-[10px] opacity-80 mt-1">Experimente novos looks</div>
        </button>

        {/* Skin Scan (Step 2 Target) */}
        <button 
          onClick={() => setView(AppView.ANALYSIS)}
          className={`bg-white text-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 text-left transition-all duration-500 ease-out ${isHighlighted(2) ? 'z-50 ring-[6px] ring-white/50 scale-105 shadow-2xl' : 'hover:border-primary-200 hover:shadow-md active:scale-95'}`}
        >
          <div className="text-2xl mb-2">🤳</div>
          <div className="font-bold text-sm">Skin Scan</div>
          <div className="text-[10px] text-slate-400 mt-1">Análise de IA</div>
        </button>

        <button 
          onClick={() => setView(AppView.CONFIDENCE)}
          className="bg-accent text-white p-5 rounded-2xl shadow-lg shadow-accent/20 text-left col-span-2 flex items-center justify-between group relative z-0 overflow-hidden hover:shadow-xl transition-all"
        >
           <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <div>
            <div className="font-bold text-sm relative z-10">Espelho da Verdade</div>
            <div className="text-[10px] opacity-80 mt-1 relative z-10">Sua dose diária de autoconfiança</div>
          </div>
          <div className="text-3xl group-hover:animate-pulse relative z-10">💖</div>
        </button>
      </div>

      {/* Featured Products */}
      <div className="relative z-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900">Recomendados para você</h3>
          <button 
            onClick={() => setView(AppView.PRODUCTS)}
            className="text-xs text-primary-600 font-medium hover:underline"
          >
            Ver todos
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <div key={i} onClick={() => setView(AppView.PRODUCTS)} className="min-w-[140px] bg-white p-3 rounded-xl border border-slate-100 snap-center hover:border-primary-100 transition-colors cursor-pointer">
              <div className="aspect-square bg-slate-100 rounded-lg mb-3 relative overflow-hidden">
                <img src={`https://picsum.photos/150/150?random=${i+20}`} alt="Product" className="object-cover w-full h-full hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-1 right-1 bg-green-400 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">98% Match</span>
              </div>
              <div className="text-xs text-slate-400 mb-1">Lumina</div>
              <div className="text-sm font-bold text-slate-900 mb-1">Base Velvet</div>
              <div className="text-xs font-medium text-primary-600">R$ 89,90</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;