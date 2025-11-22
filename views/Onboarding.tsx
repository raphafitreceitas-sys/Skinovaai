import React, { useState } from 'react';
import Button from '../components/Button';

interface OnboardingProps {
  onComplete: (profileData: any) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    skinType: '',
    goals: [] as string[]
  });

  const handleNext = () => setStep(s => s + 1);

  const steps = [
    {
      title: "Olá! Eu sou a Maya.",
      subtitle: "Sua assistente pessoal de beleza. Qual é o seu nome?",
      content: (
        <input 
          type="text" 
          placeholder="Seu nome..." 
          className="w-full p-4 text-xl border-b-2 border-primary-300 focus:border-primary-600 outline-none bg-transparent text-center"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      ),
      action: formData.name.length > 0
    },
    {
      title: `Prazer, ${formData.name}!`,
      subtitle: "Como você descreveria sua pele hoje?",
      content: (
        <div className="grid grid-cols-2 gap-3 w-full">
          {['Seca', 'Oleosa', 'Mista', 'Sensível'].map(type => (
            <button
              key={type}
              onClick={() => setFormData({...formData, skinType: type})}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.skinType === type 
                ? 'border-primary-500 bg-primary-50 text-primary-700 font-bold' 
                : 'border-slate-200 text-slate-600 hover:border-primary-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      ),
      action: formData.skinType.length > 0
    },
    {
      title: "Última pergunta!",
      subtitle: "Quais são seus principais objetivos? (Escolha até 3)",
      content: (
        <div className="flex flex-wrap gap-2 justify-center">
          {['Hidratação', 'Acne', 'Anti-idade', 'Glow', 'Manchas', 'Poros'].map(goal => (
            <button
              key={goal}
              onClick={() => {
                const newGoals = formData.goals.includes(goal) 
                  ? formData.goals.filter(g => g !== goal)
                  : [...formData.goals, goal].slice(0, 3);
                setFormData({...formData, goals: newGoals});
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                formData.goals.includes(goal)
                ? 'bg-accent text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      ),
      action: formData.goals.length > 0
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 max-w-md mx-auto relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-200">
        <div 
          className="h-full bg-primary-500 transition-all duration-500 ease-out" 
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="text-center w-full z-10 animate-fade-in-up">
        <div className="w-20 h-20 bg-gradient-to-tr from-primary-400 to-accent rounded-full mx-auto mb-8 flex items-center justify-center text-4xl shadow-lg shadow-primary-200">
          🤖
        </div>
        
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">
          {currentStep.title}
        </h2>
        <p className="text-slate-500 mb-10 text-lg">
          {currentStep.subtitle}
        </p>

        <div className="mb-12 w-full">
          {currentStep.content}
        </div>

        <Button 
          fullWidth 
          size="lg"
          onClick={() => {
            if (step < steps.length - 1) handleNext();
            else onComplete(formData);
          }}
          disabled={!currentStep.action}
        >
          {step === steps.length - 1 ? "Finalizar" : "Continuar"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;