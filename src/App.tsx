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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
          <p className="text-neutral-400 font-medium">Loading DEX...</p>
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
