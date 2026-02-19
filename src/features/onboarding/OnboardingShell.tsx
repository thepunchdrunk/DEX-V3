import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, OnboardingDay } from '@/types';
import Day1FirstDay from './day1/Day1FirstDay';
import Day2KnowTheRules from './day2/Day2KnowTheRules';
import Day3LearnYourRole from './day3/Day3LearnYourRole';
import Day4BuildNetwork from './day4/Day4BuildNetwork';
import Day5GoalsLaunch from './day5/Day5GoalsLaunch';
import {
    Check,
    Lock,
    Rocket,
    ChevronRight,
    RotateCcw,
    Unlock,
    Menu,
    X,
    Zap,
    Shield,
    Users,
    Award,
} from 'lucide-react';

interface OnboardingShellProps {
    user: UserProfile;
    onDayComplete: (day: OnboardingDay) => void;
    onGraduate: () => void;
    onUnlockAll?: () => void;
}

const DAY_META = [
    { day: 1, label: 'Your First Day', icon: Rocket, accent: '#E60000', accentBg: 'bg-red-50', accentText: 'text-red-600' },
    { day: 2, label: 'Know the Rules', icon: Shield, accent: '#8B5CF6', accentBg: 'bg-purple-50', accentText: 'text-purple-600' },
    { day: 3, label: 'Learn Your Role', icon: Zap, accent: '#3B82F6', accentBg: 'bg-blue-50', accentText: 'text-blue-600' },
    { day: 4, label: 'Build Your Network', icon: Users, accent: '#10B981', accentBg: 'bg-emerald-50', accentText: 'text-emerald-600' },
    { day: 5, label: 'Goals & Launch', icon: Award, accent: '#F59E0B', accentBg: 'bg-amber-50', accentText: 'text-amber-600' },
];

const OnboardingShell: React.FC<OnboardingShellProps> = ({
    user,
    onDayComplete,
    onGraduate,
    onUnlockAll,
}) => {
    const [currentDay, setCurrentDay] = useState<OnboardingDay>((user.onboardingDay || 1) as OnboardingDay);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user.onboardingDay) setCurrentDay(user.onboardingDay as OnboardingDay);
    }, [user.onboardingDay]);

    const getDayStatus = (day: number): 'completed' | 'active' | 'locked' => {
        if (user.dayProgress?.[day as OnboardingDay]?.completed) return 'completed';
        if (day === currentDay) return 'active';
        if (day <= (user.onboardingDay || 1)) return 'active';
        return 'locked';
    };

    const handleDayClick = (day: number) => {
        const status = getDayStatus(day);
        if (status === 'locked') return;
        setTransitionDirection(day > currentDay ? 'forward' : 'backward');
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentDay(day as OnboardingDay);
            setIsTransitioning(false);
            setSidebarOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 400);
    };

    const handleDayComplete = (day: OnboardingDay) => {
        setTransitionDirection('forward');
        setIsTransitioning(true);
        onDayComplete(day);
        setTimeout(() => {
            if (day < 5) setCurrentDay((day + 1) as OnboardingDay);
            setIsTransitioning(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
    };

    const renderDayContent = () => {
        switch (currentDay) {
            case 1: return <Day1FirstDay user={user} onComplete={() => handleDayComplete(1)} />;
            case 2: return <Day2KnowTheRules user={user} onComplete={() => handleDayComplete(2)} />;
            case 3: return <Day3LearnYourRole user={user} onComplete={() => handleDayComplete(3)} />;
            case 4: return <Day4BuildNetwork user={user} onComplete={() => handleDayComplete(4)} />;
            case 5: return <Day5GoalsLaunch user={user} onGraduate={onGraduate} />;
            default: return null;
        }
    };

    const completedCount = Object.values(user.dayProgress || {}).filter(d => d?.completed).length;
    const progressPct = Math.round((completedCount / 5) * 100);
    const currentMeta = DAY_META.find(d => d.day === currentDay) || DAY_META[0];

    // --- Sidebar Content (reused for desktop + mobile overlay) ---
    const SidebarContent = () => (
        <div className="h-full flex flex-col">
            {/* Brand header */}
            <div className="p-6 pb-5">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center shadow-md shadow-red-500/15">
                        <span className="text-white font-black text-xs">DX</span>
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-900 tracking-widest">DEX</p>
                        <p className="text-[10px] font-bold text-brand-red tracking-widest uppercase">Onboarding</p>
                    </div>
                </div>
                {/* Progress summary */}
                <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-100">
                    <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Progress</span>
                        <span className="text-xs font-black text-neutral-700">{progressPct}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-200/60 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-brand-red to-red-400 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <nav className="flex-1 px-4 pb-6">
                <div className="relative">
                    {/* Connecting line */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-[2px] rounded-full bg-neutral-100" />
                    <div
                        className="absolute left-[19px] top-2 w-[2px] rounded-full bg-gradient-to-b from-brand-red to-red-300 transition-all duration-700"
                        style={{ height: `${Math.max(0, (completedCount / 4) * 100)}%` }}
                    />

                    {/* Day nodes */}
                    <div className="space-y-1">
                        {DAY_META.map(({ day, label, icon: Icon, accent, accentBg, accentText }) => {
                            const status = getDayStatus(day);
                            const isActive = day === currentDay;

                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDayClick(day)}
                                    disabled={status === 'locked'}
                                    className={`
                                        relative w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-300 group
                                        ${isActive
                                            ? 'bg-white shadow-md border border-neutral-100'
                                            : status === 'locked'
                                                ? 'opacity-40 cursor-not-allowed'
                                                : 'hover:bg-neutral-50'
                                        }
                                    `}
                                >
                                    {/* Node indicator */}
                                    <div className={`
                                        relative z-10 w-[26px] h-[26px] rounded-lg flex items-center justify-center flex-shrink-0
                                        transition-all duration-300
                                        ${status === 'completed'
                                            ? `${accentBg}`
                                            : isActive
                                                ? `${accentBg} ring-2 ring-offset-2`
                                                : 'bg-neutral-100'
                                        }
                                    `}
                                        style={isActive ? { outlineColor: accent } : undefined}
                                    >
                                        {status === 'completed' ? (
                                            <Check className={`w-3.5 h-3.5 ${accentText}`} strokeWidth={3} />
                                        ) : status === 'locked' ? (
                                            <Lock className="w-3 h-3 text-neutral-400" />
                                        ) : (
                                            <Icon className={`w-3.5 h-3.5 ${isActive ? accentText : 'text-neutral-400'}`} />
                                        )}
                                    </div>

                                    {/* Label */}
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5
                                            ${isActive ? accentText : 'text-neutral-400'}
                                        `}>Day {day}</p>
                                        <p className={`text-xs font-bold truncate
                                            ${isActive ? 'text-neutral-900' : status === 'completed' ? 'text-neutral-600' : 'text-neutral-400'}
                                        `}>{label}</p>
                                    </div>

                                    {/* Chevron for active */}
                                    {isActive && (
                                        <ChevronRight className="w-4 h-4 text-neutral-300 flex-shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Dev controls */}
            {onUnlockAll && (
                <div className="p-4 border-t border-neutral-100 flex gap-2">
                    <button
                        onClick={onUnlockAll}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-bold text-neutral-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors uppercase tracking-wider"
                    >
                        <Unlock className="w-3 h-3" />
                        Unlock All
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-bold text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" />
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-neutral-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 animate-drift"
                    style={{
                        top: '0',
                        right: '0',
                        background: `radial-gradient(circle, ${currentMeta.accent}08 0%, transparent 70%)`,
                        transition: 'background 0.8s ease',
                    }}
                />
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-neutral-100 z-30 shadow-sm">
                <SidebarContent />
            </aside>

            {/* Mobile hamburger */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-white shadow-lg border border-neutral-100 flex items-center justify-center text-neutral-600 hover:text-brand-red transition-colors active:scale-95"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <>
                    <div
                        className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="lg:hidden fixed left-0 top-0 h-screen w-[300px] bg-white z-50 shadow-2xl animate-slide-in-right" style={{ animationDuration: '300ms' }}>
                        <SidebarContent />
                    </aside>
                </>
            )}

            {/* Main content */}
            <main
                ref={contentRef}
                className="lg:ml-[280px] min-h-screen relative z-10"
            >
                {/* Day header */}
                <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
                    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl ${currentMeta.accentBg} flex items-center justify-center`}>
                                <currentMeta.icon className={`w-5 h-5 ${currentMeta.accentText}`} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Day {currentDay} of 5</p>
                                <h1 className="text-lg font-black text-neutral-900 tracking-tight">{currentMeta.label}</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest hidden sm:block">
                                {user.name.split(' ')[0]}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600">
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Day content with transition */}
                <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8">
                    <div className={`
                        transition-all duration-400
                        ${isTransitioning
                            ? `opacity-0 ${transitionDirection === 'forward' ? 'translate-x-8' : '-translate-x-8'} scale-[0.99]`
                            : 'opacity-100 translate-x-0 scale-100'
                        }
                    `}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                        {renderDayContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OnboardingShell;
