import React, { useState } from 'react';
import {
    Check,
    ChevronRight,
    Flag,
    HelpCircle,
    Sparkles,
    Play,
    Clock,
    ArrowRight,
    Lock
} from 'lucide-react';

export interface OnboardingCard {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    status: 'LOCKED' | 'AVAILABLE' | 'COMPLETED' | 'IN_PROGRESS';
    type: 'SETUP' | 'LEARNING' | 'ACTION' | 'CONNECT' | 'REVIEW' | 'CELEBRATION';
    actionLabel?: string;
    secondaryActionLabel?: string;
    onAction?: () => void;
    onSecondaryAction?: () => void;
    onMarkComplete?: () => void;
    progress?: number; // 0-100
    estimatedTime?: string;
    explainer?: string; // "Why is this here?"
}

interface OnboardingFeedProps {
    cards: OnboardingCard[];
    onCardAction: (id: string) => void;
}

const OnboardingFeed: React.FC<OnboardingFeedProps> = ({ cards, onCardAction }) => {
    const [expandedExplainer, setExpandedExplainer] = useState<string | null>(null);

    const getCardTheme = (type: OnboardingCard['type']) => {
        switch (type) {
            case 'SETUP': return { bg: 'bg-white/60', accent: 'text-neutral-600', border: 'border-neutral-200' };
            case 'LEARNING': return { bg: 'bg-blue-50/40', accent: 'text-blue-600', border: 'border-blue-100' };
            case 'ACTION': return { bg: 'bg-emerald-50/40', accent: 'text-emerald-600', border: 'border-emerald-100' };
            case 'CONNECT': return { bg: 'bg-purple-50/40', accent: 'text-purple-600', border: 'border-purple-100' };
            case 'REVIEW': return { bg: 'bg-amber-50/40', accent: 'text-amber-600', border: 'border-amber-100' };
            case 'CELEBRATION': return { bg: 'bg-yellow-50/40', accent: 'text-yellow-600', border: 'border-yellow-100' };
            default: return { bg: 'bg-white', accent: 'text-neutral-900', border: 'border-neutral-200' };
        }
    };

    return (
        <div className="space-y-6">
            {cards.map((card, index) => {
                const theme = getCardTheme(card.type);
                const isCompleted = card.status === 'COMPLETED';
                const isLocked = card.status === 'LOCKED';

                return (
                    <div
                        key={card.id}
                        className={`
                            relative overflow-hidden rounded-3xl border transition-all duration-500 ease-out
                            ${isCompleted
                                ? 'bg-neutral-50 border-neutral-100 opacity-70 grayscale-[0.5]'
                                : `glass-panel ${theme.border} hover:border-transparent`
                            }
                            ${isLocked ? 'opacity-50 pointer-events-none' : 'hover:shadow-[var(--shadow-float)] hover:-translate-y-1'}
                            animate-fade-in-up
                        `}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Status Stripe */}
                        {!isLocked && !isCompleted && (
                            <div className={`absolute top-0 left-0 w-1.5 h-full ${theme.accent.replace('text-', 'bg-')} opacity-30`} />
                        )}

                        <div className="p-6 sm:p-8 pl-8 sm:pl-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-5">
                                    {/* Icon Box */}
                                    <div className={`
                                        w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm text-2xl
                                        ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-neutral-900'}
                                    `}>
                                        {isCompleted ? <Check className="w-7 h-7" /> : card.icon}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${theme.accent}`}>
                                                {card.type}
                                            </span>
                                            {card.estimatedTime && (
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded-full">
                                                    <Clock className="w-3 h-3" /> {card.estimatedTime}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className={`text-xl font-bold leading-tight ${isCompleted ? 'text-neutral-500 line-through' : 'text-neutral-900'}`}>
                                            {card.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Context Action */}
                                {card.explainer && !isCompleted && (
                                    <button
                                        onClick={() => setExpandedExplainer(expandedExplainer === card.id ? null : card.id)}
                                        className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
                                    >
                                        <HelpCircle className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Explainer Panel */}
                            {expandedExplainer === card.id && (
                                <div className="mb-6 mx-2 p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 shadow-inner animate-slide-down">
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="w-4 h-4 text-amber-500 mt-0.5" />
                                        <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                                            {card.explainer}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            <p className="text-neutral-500 text-[15px] leading-relaxed font-medium mb-6 max-w-2xl">
                                {card.description}
                            </p>

                            {/* Progress Bar */}
                            {typeof card.progress === 'number' && !isCompleted && (
                                <div className="mb-8 max-w-sm">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Progress</span>
                                        <span className="text-[10px] font-bold text-neutral-900">{card.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-brand-red transition-all duration-700 ease-in-out"
                                            style={{ width: `${card.progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Action Area */}
                            <div className="flex items-center gap-4">
                                {!isCompleted && !isLocked && (
                                    <>
                                        {card.onAction && (
                                            <button
                                                onClick={() => card.onAction?.()}
                                                className="btn-primary py-3 px-8 text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
                                            >
                                                {card.actionLabel || 'Start'} <ArrowRight className="w-4 h-4" />
                                            </button>
                                        )}
                                        {card.onSecondaryAction && (
                                            <button
                                                onClick={() => card.onSecondaryAction?.()}
                                                className="btn-secondary py-3 px-6 text-xs"
                                            >
                                                {card.secondaryActionLabel || 'Skip'}
                                            </button>
                                        )}
                                    </>
                                )}

                                {isCompleted && (
                                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full">
                                        <Check className="w-4 h-4" /> Completed
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Lock Overlay */}
                        {isLocked && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                                <div className="bg-white/90 px-6 py-3 rounded-2xl shadow-lg border border-neutral-100 flex items-center gap-3 text-sm font-bold text-neutral-500">
                                    <Lock className="w-4 h-4" /> Locked Category
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default OnboardingFeed;
