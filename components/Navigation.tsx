import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isLoggedIn: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isLoggedIn }) => {
  if (!isLoggedIn && currentView === AppView.LANDING) return null;

  const navItems = [
    { view: AppView.DASHBOARD, label: 'Painel', icon: '🏠' },
    { view: AppView.TRY_ON, label: 'Provador', icon: '✨' },
    { view: AppView.ANALYSIS, label: 'Análise', icon: '🔍' },
    { view: AppView.ROUTINES, label: 'Rotinas', icon: '📅' },
    { view: AppView.CONFIDENCE, label: 'Mood', icon: '💖' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg pb-safe z-50">
      <div className="flex justify-around items-center px-2 py-3 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center gap-1 min-w-[64px] transition-colors ${
              currentView === item.view ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium uppercase tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;