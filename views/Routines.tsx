import React, { useState } from 'react';
import { MOCK_ROUTINE } from '../constants';

const Routines: React.FC = () => {
  const [routine, setRoutine] = useState(MOCK_ROUTINE);

  const toggleStep = (id: string) => {
    setRoutine(routine.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
  };

  const progress = Math.round((routine.filter(r => r.completed).length / routine.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-8 px-4 max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Minha Rotina</h1>
        <p className="text-sm text-slate-500">Hoje, 14 de Outubro</p>
      </div>

      {/* Progress Ring */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{progress}%</div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">Concluído</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-primary-600">Mantenha o ritmo! 🔥</div>
          <div className="text-xs text-slate-400">5 dias seguidos</div>
        </div>
      </div>

      {/* Routine List */}
      <div className="space-y-3">
        {routine.map((step, index) => (
          <div 
            key={step.id}
            onClick={() => toggleStep(step.id)}
            className={`relative overflow-hidden bg-white p-4 rounded-xl border transition-all cursor-pointer group ${
              step.completed ? 'border-green-200 bg-green-50' : 'border-slate-100 hover:border-primary-200'
            }`}
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                step.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-transparent'
              }`}>
                ✓
              </div>
              <div className="flex-1">
                <div className={`font-bold text-slate-900 ${step.completed ? 'line-through opacity-50' : ''}`}>
                  {step.name}
                </div>
                <div className="text-xs text-slate-500">{step.product}</div>
              </div>
              <div className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-500">
                {step.duration}
              </div>
            </div>
            
            {/* Step Number Background */}
            <div className="absolute -bottom-4 -right-2 text-6xl font-bold text-slate-50 opacity-50 group-hover:text-primary-50 transition-colors pointer-events-none">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routines;