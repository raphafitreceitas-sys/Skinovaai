import React, { useState, useEffect } from 'react';
import { AppView, UserProfile } from './types';
import LandingPage from './views/LandingPage';
import Onboarding from './views/Onboarding';
import Dashboard from './views/Dashboard';
import Navigation from './components/Navigation';
import VirtualTryOn from './views/VirtualTryOn';
import Confidence from './views/Confidence';
import Routines from './views/Routines';
import Subscription from './views/Subscription';
import Analysis from './views/Analysis';
import ProductsList from './views/ProductsList';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);

  // Mock checking session
  useEffect(() => {
    // In a real app, check localStorage or API
    const savedUser = localStorage.getItem('skinovaai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView(AppView.DASHBOARD);
    }
  }, []);

  const handleOnboardingComplete = (profileData: any) => {
    const newUser: UserProfile = {
      name: profileData.name,
      skinType: profileData.skinType,
      skinTone: 'Analyzed-Medium',
      goals: profileData.goals,
      subscriptionStatus: 'free'
    };
    setUser(newUser);
    localStorage.setItem('skinovaai_user', JSON.stringify(newUser));
    setCurrentView(AppView.DASHBOARD);
    
    // Trigger subscription upsell after onboarding
    setTimeout(() => setShowSubscription(true), 2000);
  };

  const handleLogin = () => {
    // Simulating login for demo
    setCurrentView(AppView.ONBOARDING);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onGetStarted={() => setCurrentView(AppView.ONBOARDING)} onLogin={handleLogin} />;
      case AppView.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case AppView.DASHBOARD:
        return user ? <Dashboard user={user} setView={setCurrentView} /> : null;
      case AppView.TRY_ON:
        return <VirtualTryOn />;
      case AppView.CONFIDENCE:
        return <Confidence />;
      case AppView.ROUTINES:
        return <Routines />;
      case AppView.PRODUCTS:
        return <ProductsList onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.ANALYSIS:
        return (
          <Analysis 
            onBack={() => setCurrentView(AppView.DASHBOARD)}
            onShowRecommendations={() => {
              // For now, we redirect to Dashboard, in a full app this would open a specific products view
              setCurrentView(AppView.PRODUCTS);
            }}
            onTryOn={(shadeId) => {
              // In a real app, pass shadeId to the TryOn component context
              console.log(`Trying on shade: ${shadeId}`);
              setCurrentView(AppView.TRY_ON);
            }}
          />
        );
      case AppView.SUBSCRIPTION:
         return (
           <Subscription 
             onSubscribe={() => {
               if (user) {
                 const updatedUser = { ...user, subscriptionStatus: 'premium' as const };
                 setUser(updatedUser);
                 localStorage.setItem('skinovaai_user', JSON.stringify(updatedUser));
               }
               setCurrentView(AppView.DASHBOARD);
             }}
             onCancel={() => setCurrentView(AppView.DASHBOARD)}
           />
         );
      default:
        return <LandingPage onGetStarted={() => setCurrentView(AppView.ONBOARDING)} onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {renderView()}
      
      {/* Navigation is only shown for logged-in users and not in full-screen modes */}
      {user && 
       currentView !== AppView.LANDING && 
       currentView !== AppView.ONBOARDING && 
       currentView !== AppView.TRY_ON && 
       currentView !== AppView.ANALYSIS && 
       currentView !== AppView.CONFIDENCE && 
       currentView !== AppView.PRODUCTS && (
        <Navigation 
          currentView={currentView} 
          setView={setCurrentView} 
          isLoggedIn={!!user} 
        />
      )}

      {/* Subscription Modal triggered globally if needed */}
      {showSubscription && (
        <Subscription 
          onSubscribe={() => {
            if (user) {
              const updatedUser = { ...user, subscriptionStatus: 'premium' as const };
              setUser(updatedUser);
              localStorage.setItem('skinovaai_user', JSON.stringify(updatedUser));
            }
            setShowSubscription(false);
          }} 
          onCancel={() => setShowSubscription(false)} 
        />
      )}

      {/* Global Back Buttons for full screen views are handled inside components now where possible, 
          or specifically for views that don't implement their own header */}
      {currentView === AppView.TRY_ON && (
         <button 
           onClick={() => setCurrentView(AppView.DASHBOARD)}
           className="fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-slate-900"
         >
           ✕
         </button>
      )}
       {currentView === AppView.CONFIDENCE && (
         <button 
           onClick={() => setCurrentView(AppView.DASHBOARD)}
           className="fixed top-4 left-4 z-50 w-10 h-10 bg-white/20 backdrop-blur rounded-full shadow-lg flex items-center justify-center font-bold text-white"
         >
           ✕
         </button>
      )}
    </div>
  );
};

export default App;