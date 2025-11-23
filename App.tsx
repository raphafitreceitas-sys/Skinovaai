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
  const [selectedShadeForTryOn, setSelectedShadeForTryOn] = useState<string | null>(null); // Novo estado

  // Mock checking session
  useEffect(() => {
    // In a real app, check localStorage or API
    const savedUser = localStorage.getItem('skinovaai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView(AppView.DASHBOARD);
    }
  }, []);

  const handleSetView = (view: AppView) => {
    // Reset selectedShadeForTryOn when leaving VirtualTryOn view
    if (currentView === AppView.TRY_ON && view !== AppView.TRY_ON) {
      setSelectedShadeForTryOn(null);
    }
    setCurrentView(view);
  };

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
    handleSetView(AppView.DASHBOARD);
    
    // Trigger subscription upsell after onboarding
    setTimeout(() => setShowSubscription(true), 2000);
  };

  const handleLogin = () => {
    // Simulating login for demo
    handleSetView(AppView.ONBOARDING);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onGetStarted={() => handleSetView(AppView.ONBOARDING)} onLogin={handleLogin} />;
      case AppView.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case AppView.DASHBOARD:
        return user ? <Dashboard user={user} setView={handleSetView} /> : null;
      case AppView.TRY_ON:
        return (
          <VirtualTryOn 
            onClose={() => {
              setSelectedShadeForTryOn(null); // Reset when closing
              handleSetView(AppView.DASHBOARD);
            }}
            onViewProducts={() => {
              setSelectedShadeForTryOn(null); // Reset when viewing products
              handleSetView(AppView.PRODUCTS);
            }}
            initialShadeId={selectedShadeForTryOn} 
          />
        );
      case AppView.CONFIDENCE:
        return <Confidence />;
      case AppView.ROUTINES:
        return <Routines />;
      case AppView.PRODUCTS:
        return <ProductsList onBack={() => handleSetView(AppView.DASHBOARD)} />;
      case AppView.ANALYSIS:
        return (
          <Analysis 
            onBack={() => handleSetView(AppView.DASHBOARD)}
            onShowRecommendations={() => {
              handleSetView(AppView.PRODUCTS);
            }}
            onTryOn={(shadeId) => {
              setSelectedShadeForTryOn(shadeId); // Define o shadeId antes de navegar
              handleSetView(AppView.TRY_ON);
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
               handleSetView(AppView.DASHBOARD);
             }}
             onCancel={() => handleSetView(AppView.DASHBOARD)}
           />
         );
      default:
        return <LandingPage onGetStarted={() => handleSetView(AppView.ONBOARDING)} onLogin={handleLogin} />;
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
          setView={handleSetView} 
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
    </div>
  );
};

export default App;