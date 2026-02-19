import React from 'react';
import {
  OnboardingDay,
  UserProfile,
} from '@/types';
import { useUser } from '@/context/UserContext';

// Import components

// Import components
import OnboardingShell from './features/onboarding/OnboardingShell';
import RoleDashboard from './features/dashboard/RoleDashboard';
import RoleSelectionScreen from './features/onboarding/RoleSelectionScreen';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/core/ToastProvider';

// Import styles
import './styles/design-system.css';

const App: React.FC = () => {
  const { user, updateUser, isLoading } = useUser();

  // Check if today is Wednesday for Simulator
  const isWednesday = new Date().getDay() === 3;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] bg-brand-red/[0.04] animate-drift" style={{ top: '30%', left: '40%' }} />
        <div className="flex flex-col items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xl border border-neutral-100 flex items-center justify-center animate-pulse">
            <span className="text-brand-red font-black text-xl">DX</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-neutral-900 font-bold text-sm tracking-wider">Initializing</p>
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Role Selection
  const handleRoleSelect = (roleData: Partial<UserProfile>) => {
    updateUser({
      ...roleData,
    });
  };

  // Handle onboarding day completion
  const handleDayComplete = (day: OnboardingDay) => {
    updateUser({
      onboardingDay: Math.min(5, day + 1) as OnboardingDay,
      dayProgress: {
        ...user.dayProgress,
        [day]: {
          ...user.dayProgress?.[day],
          day: day,
          completed: true,
          completedAt: new Date().toISOString(),
          tasks: []
        },
      },
    });
  };

  // Handle graduation (transition to Role-Based)
  const handleGraduate = () => {
    updateUser({
      onboardingComplete: true,
    });
  };

  // Demo: Unlock all days
  const handleUnlockAll = () => {
    const newProgress = { ...user.dayProgress };
    [1, 2, 3, 4, 5].forEach(day => {
      // @ts-ignore
      if (!newProgress[day]) {
        // @ts-ignore
        newProgress[day] = {
          day: day as OnboardingDay,
          completed: true,
          completedAt: new Date().toISOString(),
          tasks: []
        };
      } else {
        // @ts-ignore
        newProgress[day] = {
          ...newProgress[day],
          completed: true,
          completedAt: new Date().toISOString()
        };
      }
    });

    updateUser({
      onboardingDay: 5 as OnboardingDay,
      dayProgress: newProgress
    });
  };

  // Render Role Selection
  if (!user.role) {
    return (
      <ToastProvider>
        <ErrorBoundary>
          <main id="main-content">
            <RoleSelectionScreen onSelectRole={handleRoleSelect} />
          </main>
        </ErrorBoundary>
      </ToastProvider>
    );
  }

  // Render Onboarding Shell
  if (!user.onboardingComplete) {
    return (
      <ToastProvider>
        <ErrorBoundary>
          <main id="main-content">
            <OnboardingShell
              user={user}
              onDayComplete={handleDayComplete}
              onGraduate={handleGraduate}
              onUnlockAll={handleUnlockAll}
            />
          </main>
        </ErrorBoundary>
      </ToastProvider>
    );
  }

  // Unified Role-Based Dashboard (Day 6+)
  return (
    <ToastProvider>
      <ErrorBoundary>
        <main id="main-content">
          <RoleDashboard
            user={user}
            isWednesday={isWednesday}
            onUpdateUser={updateUser}
          />
        </main>
      </ErrorBoundary>
    </ToastProvider>
  );
};

export default App;
