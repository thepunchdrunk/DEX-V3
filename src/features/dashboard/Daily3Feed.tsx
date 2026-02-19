import React, { useState, useMemo } from 'react';
import {
    Check,
    Gamepad2,
    Sparkles,
    ArrowRight,
} from 'lucide-react';
import { DailyCard as DailyCardType, CardSlot } from '@/types';
import { MOCK_SIMULATOR, MONDAY_CONTEXT_ANCHOR, FRIDAY_MICRO_SKILL } from '@/config/constants';
import { getWeekdayContext } from '@/services/cardSelectionEngine';
import { DailyCard } from '@/components/cards/DailyCard';

interface Daily3FeedProps {
    cards: DailyCardType[];
    isWednesday?: boolean;
    onCardAction: (card: DailyCardType) => void;
    onCardFlag: (cardId: string, reason?: 'INCORRECT' | 'OUTDATED' | 'INAPPROPRIATE') => void;
    onMarkComplete: (cardId: string) => void;
    completedCards: string[];
    user?: { jobTitle: string; department: string };
    jobTitle?: string;
    department?: string;
}

const Daily3Feed: React.FC<Daily3FeedProps> = ({
    cards,
    isWednesday = false,
    onCardAction,
    onCardFlag,
    onMarkComplete,
    completedCards,
    user = { jobTitle: 'Employee', department: 'General' }
}) => {
    const [showSimulator, setShowSimulator] = useState(false);

    const dayOfWeek = new Date().getDay();
    const weekdayContext = getWeekdayContext(dayOfWeek);

    const getGreeting = () => {
        switch (weekdayContext) {
            case 'MONDAY_PLANNING': return { title: 'Plan Your Week', subtitle: 'Focus on strategic priorities', accent: '#3B82F6' };
            case 'WEDNESDAY_SIMULATOR': return { title: 'Simulator Wednesday', subtitle: 'Practice makes perfect', accent: '#F59E0B' };
            case 'FRIDAY_REFLECTION': return { title: 'Reflect & Grow', subtitle: 'Celebrate your progress', accent: '#8B5CF6' };
            default: return { title: 'Your Daily 3', subtitle: 'Stay focused on what matters', accent: '#E60000' };
        }
    };
    const greeting = getGreeting();

    const displayCards = useMemo(() => {
        let adjustedCards = [...cards];
        if (weekdayContext === 'MONDAY_PLANNING' && adjustedCards.length > 0) adjustedCards[0] = { ...MONDAY_CONTEXT_ANCHOR };
        if (weekdayContext === 'WEDNESDAY_SIMULATOR' || isWednesday) {
            adjustedCards = [
                ...adjustedCards.slice(0, 2),
                {
                    id: 'simulator-card',
                    slot: 'SIMULATOR' as CardSlot,
                    title: MOCK_SIMULATOR.title,
                    description: MOCK_SIMULATOR.description,
                    source: 'DEX',
                    sourceType: 'SYSTEM' as const,
                    timestamp: new Date().toISOString(),
                    priority: 'MEDIUM' as const,
                    actionLabel: 'Start Challenge',
                    read: false,
                    flagged: false,
                    explainer: 'Wednesday is Simulator Day! This challenge helps build applied judgment.',
                },
            ];
        }
        if (weekdayContext === 'FRIDAY_REFLECTION' && adjustedCards.length >= 3) adjustedCards[2] = { ...FRIDAY_MICRO_SKILL };
        return adjustedCards;
    }, [cards, weekdayContext, isWednesday]);

    const completionPercentage = Math.round((completedCards.length / displayCards.length) * 100);
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (completionPercentage / 100) * circumference;

    return (
        <div className="space-y-8">
            {/* Context Widget */}
            <div
                className="relative p-6 rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden
                    hover:shadow-md transition-all duration-300"
            >
                {/* Subtle accent glow */}
                <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-30"
                    style={{ background: greeting.accent }}
                />

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        {/* Progress Ring */}
                        <div className="relative w-16 h-16 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="32" cy="32" r={radius}
                                    stroke="#f3f4f6" strokeWidth="5" fill="none"
                                />
                                <circle
                                    cx="32" cy="32" r={radius}
                                    stroke={greeting.accent} strokeWidth="5" fill="none"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center font-black text-sm text-neutral-800">
                                {completionPercentage}%
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-black text-neutral-900 flex items-center gap-2">
                                {greeting.title}
                                {completionPercentage === 100 && <Sparkles className="w-5 h-5 text-yellow-400 animate-bounce" />}
                            </h2>
                            <p className="text-sm text-neutral-500 font-medium">{greeting.subtitle}</p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="hidden sm:block">
                        {completionPercentage === 100 ? (
                            <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-emerald-100">
                                <Check className="w-3.5 h-3.5" /> All Done
                            </span>
                        ) : (
                            <span className="px-4 py-2 bg-neutral-50 text-neutral-500 rounded-xl text-xs font-bold border border-neutral-100">
                                {completedCards.length} / {displayCards.length} Completed
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Cards Feed (Staggered) */}
            <div className="space-y-5">
                {displayCards.map((card, index) => {
                    if (card.isQuarantined || (card.flagCount && card.flagCount >= 3)) return null;

                    return (
                        <div
                            key={card.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100 + 100}ms`, animationFillMode: 'both' }}
                        >
                            <DailyCard
                                card={card}
                                isCompleted={completedCards.includes(card.id)}
                                onAction={(c) => c.slot === 'SIMULATOR' ? setShowSimulator(true) : onCardAction(c)}
                                onMarkComplete={onMarkComplete}
                                onFlag={(id, reason) => onCardFlag(id, reason)}
                                user={user}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Completion Footer */}
            <div className="text-center pt-2 opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                <p className="text-xs text-neutral-400 font-medium">
                    New cards arrive daily at 09:00 AM local time.
                </p>
            </div>

            {/* Simulator Modal */}
            {showSimulator && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/30 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white p-8 w-full max-w-xl rounded-3xl shadow-2xl border border-neutral-100 animate-scale-in">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100">
                                <Gamepad2 className="w-7 h-7 text-amber-600" />
                            </div>
                            <div>
                                <h2 className="font-black text-2xl text-neutral-900">{MOCK_SIMULATOR.title}</h2>
                                <p className="text-sm text-neutral-500 font-medium">Duration: {MOCK_SIMULATOR.durationMinutes} min • Immersive Scenario</p>
                            </div>
                        </div>

                        <p className="mb-8 text-neutral-600 leading-relaxed text-base">
                            {MOCK_SIMULATOR.description}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => { setShowSimulator(false); onMarkComplete('simulator-card'); }}
                                className="flex-1 px-6 py-3.5 bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-600 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Gamepad2 className="w-4 h-4" />
                                Start Simulation
                            </button>
                            <button
                                onClick={() => setShowSimulator(false)}
                                className="px-6 py-3.5 text-neutral-500 font-bold rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Daily3Feed;
