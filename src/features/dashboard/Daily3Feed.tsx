import React, { useState, useMemo } from 'react';
import {
    Building2,
    Compass,
    Lightbulb,
    Gamepad2,
    ExternalLink,
    Flag,
    Check,
    TrendingUp,
    TrendingDown,
    Clock,
    HelpCircle,
    X,
    AlertTriangle,
    Sparkles,
    ChevronRight,
    Flame,
    RotateCcw,
    Undo2
} from 'lucide-react';
import { DailyCard, CardSlot, ContextAnchorCard } from '@/types';
import { MOCK_SIMULATOR, MONDAY_CONTEXT_ANCHOR, FRIDAY_MICRO_SKILL } from '@/config/constants';
import { getWeekdayContext, generateCardExplainer } from '@/services/cardSelectionEngine';

interface Daily3FeedProps {
    cards: DailyCard[];
    isWednesday?: boolean;
    onCardAction: (card: DailyCard) => void;
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
    const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
    const [showFlagModal, setShowFlagModal] = useState<string | null>(null);

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

    // Helpers
    const getSlotIcon = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR': return <Building2 className="w-5 h-5" />;
            case 'DOMAIN_EDGE': return <Compass className="w-5 h-5" />;
            case 'MICRO_SKILL': return <Lightbulb className="w-5 h-5" />;
            case 'SIMULATOR': return <Gamepad2 className="w-5 h-5" />;
        }
    };

    const getSlotColor = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR': return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' };
            case 'DOMAIN_EDGE': return { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' };
            case 'MICRO_SKILL': return { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' };
            case 'SIMULATOR': return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-brand-red', badge: 'bg-red-100 text-brand-red' };
        }
    };

    const getSlotLabel = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR': return 'Key Update';
            case 'DOMAIN_EDGE': return 'Market Insight';
            case 'MICRO_SKILL': return 'Quick Tip';
            case 'SIMULATOR': return 'Challenge';
        }
    };

    const getSlotDescription = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR': return 'Internal Awareness';
            case 'DOMAIN_EDGE': return 'External Signal';
            case 'MICRO_SKILL': return 'Power Move';
            case 'SIMULATOR': return 'Skill Check';
        }
    };

    const getExplainer = (card: DailyCard): string => {
        if (card.explainer) return card.explainer;
        return generateCardExplainer(card, {
            user: { ...user } as any,
            recentlySeenCardIds: [],
            dayOfWeek,
            currentWorkload: 'MEDIUM',
            recentKPIAlerts: 0,
            pendingDeadlines: 0,
        });
    };

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

                {/* Streak Counter */}
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-xl text-orange-600">
                    <Flame className="w-5 h-5 fill-orange-500 streak-fire" />
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider leading-none mb-0.5">Stream</p>
                        <p className="text-sm font-black leading-none">5 Days</p>
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="space-y-6 perspective-1000">
                {displayCards.map((card, index) => {
                    const colors = getSlotColor(card.slot);
                    const isCompleted = completedCards.includes(card.id);
                    const isFlipped = flippedCardId === card.id;

                    if (card.isQuarantined || (card.flagCount && card.flagCount >= 3)) return null;

                    return (
                        <div
                            key={card.id}
                            className={`
                                relative min-h-[220px] transition-all duration-700 transform-style-3d
                                ${isCompleted ? 'opacity-50 grayscale scale-[0.98]' : ''}
                                ${isFlipped ? 'rotate-y-180' : ''}
                            `}
                        >
                            {/* FRONT FACE */}
                            <div className={`
                                absolute inset-0 backface-hidden
                                rounded-2xl border shadow-sm p-6 flex flex-col justify-between bg-white z-10
                                ${colors.border}
                            `}>
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl ${colors.badge} flex items-center justify-center`}>
                                            {getSlotIcon(card.slot)}
                                        </div>
                                        <div>
                                            <span className={`text-[10px] font-bold uppercase ${colors.text}`}>{getSlotLabel(card.slot)}</span>
                                            <p className="text-[10px] text-neutral-400 font-medium">{getSlotDescription(card.slot)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setFlippedCardId(card.id)}
                                        className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors"
                                        title="Why am I seeing this?"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="mt-4 mb-4 flex-1">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">{card.title}</h3>
                                    <p className="text-sm text-neutral-600 leading-relaxed">{card.description}</p>
                                </div>

                                {/* Footer / Actions */}
                                <div className="flex items-center gap-3 mt-auto">
                                    {!isCompleted && card.actionLabel && (
                                        <button
                                            onClick={() => card.slot === 'SIMULATOR' ? setShowSimulator(true) : onCardAction(card)}
                                            className="flex-1 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            {card.actionLabel} <ChevronRight className="w-3 h-3" />
                                        </button>
                                    )}
                                    {!isCompleted && (
                                        <button
                                            onClick={() => onMarkComplete(card.id)}
                                            className="p-2.5 rounded-lg border border-neutral-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all text-neutral-400"
                                            title="Mark Complete"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                {isCompleted && (
                                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                                        <div className="bg-emerald-100 text-emerald-600 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2">
                                            <Check className="w-4 h-4" /> Completed
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* BACK FACE */}
                            <div className={`
                                absolute inset-0 backface-hidden rotate-y-180
                                rounded-2xl border border-neutral-200 shadow-sm p-6 bg-neutral-50 flex flex-col
                                z-20 overflow-hidden
                            `}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                                        <Sparkles className="w-4 h-4 text-brand-red" />
                                        Context
                                    </div>
                                    <button
                                        onClick={() => setFlippedCardId(null)}
                                        className="p-2 hover:bg-white rounded-lg text-neutral-500 transition-colors"
                                    >
                                        <Undo2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <p className="text-sm text-neutral-600 mb-4 font-medium leading-relaxed">
                                        {getExplainer(card)}
                                    </p>

                                    <div className="space-y-3">
                                        <div className="bg-white p-3 rounded-lg border border-neutral-100">
                                            <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Source</div>
                                            <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                                                <Building2 className="w-3 h-3" />
                                                {card.source}
                                                {card.sourceType === 'EXTERNAL' && <ExternalLink className="w-3 h-3 text-neutral-400" />}
                                            </div>
                                        </div>

                                        {card.relevanceScore && (
                                            <div className="bg-white p-3 rounded-lg border border-neutral-100">
                                                <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Relevance Score</div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 flex-1 bg-neutral-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-brand-red" style={{ width: `${card.relevanceScore}%` }} />
                                                    </div>
                                                    <span className="text-xs font-mono font-bold">{card.relevanceScore}%</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-neutral-200">
                                    <button
                                        onClick={() => setShowFlagModal(card.id)}
                                        className="w-full py-2 text-xs font-medium text-neutral-500 hover:text-brand-red transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Flag className="w-3 h-3" /> Report Issue
                                    </button>
                                </div>
                            </div>
                        </div>
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

            {/* Modals (Simulator & Flag) kept simplified for brevity but logic remains */}
            {showFlagModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <h3 className="font-bold text-lg mb-4">Report Issue</h3>
                        <div className="space-y-2">
                            {['INCORRECT', 'OUTDATED', 'INAPPROPRIATE'].map(r => (
                                <button key={r} onClick={() => { onCardFlag(showFlagModal, r as any); setShowFlagModal(null); }} className="w-full p-3 text-left hover:bg-neutral-50 rounded-lg text-sm border">
                                    {r.charAt(0) + r.slice(1).toLowerCase()}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setShowFlagModal(null)} className="mt-4 text-sm text-neutral-500 underline w-full">Cancel</button>
                    </div>
                </div>
            )}
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
