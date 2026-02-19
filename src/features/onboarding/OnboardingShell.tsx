import React, { useState, useEffect } from 'react';
import {
    Check,
    Lock,
    Unlock,
    ChevronRight,
    MapPin,
    RefreshCw
} from 'lucide-react';
import { OnboardingDay, UserProfile } from '@/types';
import AppHeader from '@/components/shared/AppHeader';

// Import Day Components
import Day1LifeWorkSetup from './day1/Day1LifeWorkSetup';
import Day2Culture from './day2/Day2Culture';
import Day3ToolsWorkflow from './day3/Day3ToolsWorkflow';
import Day4NetworkCollaboration from './day4/Day4NetworkCollaboration';
import Day5Graduation from './day5/Day5Graduation';

interface OnboardingShellProps {
    user: UserProfile;
    onDayComplete: (day: OnboardingDay) => void;
    onGraduate: () => void;
    onUnlockAll?: () => void;
}

const OnboardingShell: React.FC<OnboardingShellProps> = ({
    user,
    onDayComplete,
    onGraduate,
    onUnlockAll,
}) => {
    // Initialize state
    const initialDay = (user.onboardingDay > 0) ? user.onboardingDay : 1;
    const [currentDay, setCurrentDay] = useState<OnboardingDay>(initialDay as OnboardingDay);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Sync current day when user updates (e.g. completes a day)
    useEffect(() => {
        if (user.onboardingDay > currentDay) {
            setCurrentDay(user.onboardingDay);
        }
    }, [user.onboardingDay]);

    const days: { day: OnboardingDay; title: string; subtitle: string }[] = [
        { day: 1, title: 'Identity', subtitle: 'Setup' },
        { day: 2, title: 'Culture', subtitle: 'Norms' },
        { day: 3, title: 'Toolkit', subtitle: 'Skills' },
        { day: 4, title: 'Network', subtitle: 'People' },
        { day: 5, title: 'Launch', subtitle: 'Ready' },
    ];

    const completedCount = Object.values(user.dayProgress).filter((d: any) => d.completed).length;

    const handleDayComplete = (day: OnboardingDay) => {
        setIsTransitioning(true);
        onDayComplete(day);

        // Slight delay for animation before switching content
        setTimeout(() => {
            if (day < 5) {
                setCurrentDay((day + 1) as OnboardingDay);
            }
            setIsTransitioning(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
    };

    const getDayStatus = (day: OnboardingDay) => {
        if (user.dayProgress[day]?.completed) return 'completed';
        if (day === currentDay) return 'active';
        if (day < currentDay || (user.onboardingDay >= day)) return 'available';
        // Fallback for allowing navigation to previous days
        return 'locked';
    };

    const renderDayContent = () => {
        switch (currentDay) {
            case 1: return <Day1LifeWorkSetup user={user} onComplete={() => handleDayComplete(1)} />;
            case 2: return <Day2Culture roleCategory={user.roleCategory || 'DESK'} onComplete={() => handleDayComplete(2)} />;
            case 3: return <Day3ToolsWorkflow user={user} onComplete={() => handleDayComplete(3)} />;
            case 4: return <Day4NetworkCollaboration user={user} onComplete={() => handleDayComplete(4)} />;
            case 5: return <Day5Graduation user={user} onGraduate={onGraduate} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-brand-red-alpha-20">
            {/* Header */}
            <AppHeader user={user} mode="ONBOARDING" isOnline={true} />

            {/* Metro Map Progress Tracker (Sticky) */}
            <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200/60 shadow-sm transition-all duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center">
                    <nav className="relative w-full flex justify-between items-center" aria-label="Progress">

                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-100 rounded-full -z-10">
                            <div
                                className="h-full bg-brand-red rounded-full transition-all duration-700 ease-in-out"
                                style={{ width: `${((currentDay - 1) / 4) * 100}%` }}
                            />
                        </div>

                        {days.map((item, index) => {
                            const status = getDayStatus(item.day);
                            const isActive = status === 'active';
                            const isCompleted = status === 'completed';
                            const isLocked = status === 'locked';

                            return (
                                <button
                                    key={item.day}
                                    onClick={() => !isLocked && setCurrentDay(item.day)}
                                    disabled={isLocked}
                                    className={`
                                        group relative flex flex-col items-center gap-3
                                        ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                                        transition-all duration-300
                                    `}
                                >
                                    {/* Dot Node */}
                                    <div className={`
                                        w-4 h-4 rounded-full border-[3px] z-10 transition-all duration-500
                                        ${isActive
                                            ? 'bg-white border-brand-red scale-150 shadow-[0_0_0_4px_rgba(230,0,0,0.15)]'
                                            : isCompleted
                                                ? 'bg-brand-red border-brand-red scale-110'
                                                : 'bg-white border-neutral-300'
                                        }
                                    `}>
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-full animate-ping bg-brand-red opacity-20" />
                                        )}
                                    </div>

                                    {/* Label */}
                                    <div className={`
                                        absolute top-8 flex flex-col items-center text-center w-24
                                        transition-all duration-300 
                                        ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-[-4px] opacity-70 group-hover:opacity-100 grou-hover:translate-y-0'}
                                    `}>
                                        <span className={`
                                            text-[10px] uppercase tracking-widest font-bold
                                            ${isActive ? 'text-brand-red' : 'text-neutral-500'}
                                        `}>
                                            Day {item.day}
                                        </span>
                                        <span className={`
                                            text-xs font-bold mt-0.5
                                            ${isActive ? 'text-neutral-900' : 'text-neutral-400'}
                                        `}>
                                            {item.title}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Main Content Stage */}
            <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Content Container (Glass Sheet) */}
                <div className={`
                    relative min-h-[600px] transition-all duration-500 ease-in-out
                    ${isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'}
                `}>
                    <div className="glass-panel rounded-3xl p-8 md:p-12 bg-white/80 shadow-xl border-white/50 backdrop-blur-xl">
                        {renderDayContent()}
                    </div>
                </div>

                {/* Developer Controls (Subtle) */}
                <div className="mt-16 flex justify-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-500">
                    <button onClick={onUnlockAll} className="btn-ghost text-xs text-neutral-400 flex items-center gap-2">
                        <Unlock className="w-3 h-3" /> Demo: Unlock All
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('Reset all progress?')) {
                                localStorage.removeItem('dex_user_storage');
                                window.location.reload();
                            }
                        }}
                        className="btn-ghost text-xs text-neutral-400 flex items-center gap-2 hover:text-red-500"
                    >
                        <RefreshCw className="w-3 h-3" /> Reset
                    </button>
                </div>

            </main>
        </div>
    );
};

export default OnboardingShell;
