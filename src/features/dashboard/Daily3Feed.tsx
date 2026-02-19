import React, { useState, useMemo } from 'react';
import {
    Check,
    Gamepad2,
    Sparkles
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

    // Context & Greeting
    const dayOfWeek = new Date().getDay();
    const weekdayContext = getWeekdayContext(dayOfWeek);

    const getGreeting = () => {
        switch (weekdayContext) {
            case 'MONDAY_PLANNING': return { title: 'Plan Your Week', subtitle: 'Focus on strategic priorities' };
            case 'WEDNESDAY_SIMULATOR': return { title: 'Simulator Wednesday', subtitle: 'Practice makes perfect' };
            case 'FRIDAY_REFLECTION': return { title: 'Reflect & Grow', subtitle: 'Celebrate your progress' };
            default: return { title: 'Your Daily 3', subtitle: 'Stay focused on what matters' };
        }
    };
    const greeting = getGreeting();

    // Adjust Cards
    const displayCards = useMemo(() => {
        let adjustedCards = [...cards];
        // Ensure we only show 3 max for the "Daily 3" feel, or filter appropriately
        // Logic from original file:
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
        <div className="space-y-6">
            {/* Context Widget (Glass Panel) */}
            <div className="glass-panel p-6 rounded-2xl flex items-center justify-between hover:bg-white/60 transition-colors">
                <div className="flex items-center gap-5">

                    {/* Progress Ring with Gradient */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                            {/* Track */}
                            <circle
                                cx="32" cy="32" r={radius}
                                stroke="#f3f4f6" strokeWidth="6" fill="none"
                            />
                            {/* Indicator */}
                            <circle
                                cx="32" cy="32" r={radius}
                                stroke="url(#gradient-red)" strokeWidth="6" fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                            {/* Defs for Gradient */}
                            <defs>
                                <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#E60000" />
                                    <stop offset="100%" stopColor="#FF4D4D" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-black text-sm text-neutral-800">
                            {completionPercentage}%
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                            {greeting.title}
                            {completionPercentage === 100 && <Sparkles className="w-5 h-5 text-yellow-400 animate-bounce" />}
                        </h2>
                        <p className="text-sm text-neutral-500 font-medium">{greeting.subtitle}</p>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="hidden sm:block">
                    {completionPercentage === 100 ? (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> All Done
                        </span>
                    ) : (
                        <span className="px-3 py-1 bg-neutral-100 text-neutral-500 rounded-full text-xs font-bold">
                            {completedCards.length} / {displayCards.length} Completed
                        </span>
                    )}
                </div>
            </div>

            {/* Cards Feed (Staggered Animation) */}
            <div className="space-y-5">
                {displayCards.map((card, index) => {
                    if (card.isQuarantined || (card.flagCount && card.flagCount >= 3)) return null;

                    // Stagger delay based on index
                    const delayClass = index === 0 ? 'delay-100' : index === 1 ? 'delay-200' : 'delay-300';

                    return (
                        <div key={card.id} className={`animate-fade-in-up ${delayClass}`}>
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
            <div className="text-center pt-4 opacity-0 animate-fade-in delay-500" style={{ animationFillMode: 'forwards' }}>
                <p className="text-xs text-neutral-400 font-medium">
                    New cards arrive daily at 09:00 AM local time.
                </p>
            </div>

            {/* Modals (Simulator) */}
            {showSimulator && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="glass-panel bg-white p-8 w-full max-w-xl rounded-3xl shadow-2xl animate-scale-in">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h2 className="font-bold text-2xl text-neutral-900">{MOCK_SIMULATOR.title}</h2>
                                <p className="text-sm text-neutral-500 font-medium">Duration: {MOCK_SIMULATOR.durationMinutes} min • Immersive Scenario</p>
                            </div>
                        </div>

                        <p className="mb-8 text-neutral-600 leading-relaxed text-lg">
                            {MOCK_SIMULATOR.description}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => { setShowSimulator(false); onMarkComplete('simulator-card'); }}
                                className="btn-primary flex-1 shadow-lg shadow-amber-500/20 bg-amber-600 hover:bg-amber-700 border-none"
                            >
                                Start Simulation
                            </button>
                            <button
                                onClick={() => setShowSimulator(false)}
                                className="btn-ghost flex-1"
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
