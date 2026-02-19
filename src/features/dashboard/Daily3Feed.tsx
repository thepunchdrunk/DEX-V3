import React, { useState, useMemo } from 'react';
import {
    Check,
    Gamepad2
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

    // Render
    return (
        <div className="space-y-6">
            {/* Gamified Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                        {/* Progress Ring (Mocked 33% per card) */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="24" cy="24" r="20" stroke="#f3f4f6" strokeWidth="4" fill="none" />
                            <circle
                                cx="24" cy="24" r="20"
                                stroke="#E60000" strokeWidth="4" fill="none"
                                strokeDasharray="126"
                                strokeDashoffset={126 - (126 * (completedCards.length / displayCards.length))}
                                className="progress-ring-circle"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-neutral-900">
                            {Math.round((completedCards.length / displayCards.length) * 100)}%
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-neutral-900">{greeting.title}</h1>
                        <p className="text-xs text-neutral-500">{greeting.subtitle}</p>
                    </div>
                </div>


            </div>

            {/* Cards Grid */}
            <div className="space-y-6 perspective-1000">
                {displayCards.map((card) => {
                    if (card.isQuarantined || (card.flagCount && card.flagCount >= 3)) return null;

                    return (
                        <DailyCard
                            key={card.id}
                            card={card}
                            isCompleted={completedCards.includes(card.id)}
                            onAction={(c) => c.slot === 'SIMULATOR' ? setShowSimulator(true) : onCardAction(c)}
                            onMarkComplete={onMarkComplete}
                            onFlag={(id, reason) => onCardFlag(id, reason)}
                            user={user}
                        />
                    );
                })}
            </div>

            {/* Completion Footer */}
            <div className="text-center">
                {completedCards.length === displayCards.length && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold animate-pulse">
                        <Check className="w-3 h-3" /> You have completed your Daily 3!
                    </div>
                )}
            </div>

            {/* Modals (Simulator) */}
            {showSimulator && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-red-50 p-3 rounded-xl"><Gamepad2 className="w-6 h-6 text-brand-red" /></div>
                            <div>
                                <h2 className="font-bold text-xl">{MOCK_SIMULATOR.title}</h2>
                                <p className="text-sm text-neutral-500">Duration: {MOCK_SIMULATOR.durationMinutes} min</p>
                            </div>
                        </div>
                        <p className="mb-6 text-neutral-600">{MOCK_SIMULATOR.description}</p>
                        <div className="flex gap-4">
                            <button onClick={() => { setShowSimulator(false); onMarkComplete('simulator-card'); }} className="btn-primary flex-1">Complete Challenge</button>
                            <button onClick={() => setShowSimulator(false)} className="btn-secondary">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Daily3Feed;
