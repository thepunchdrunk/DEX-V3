import React, { useState } from 'react';
import {
    Building2,
    Compass,
    Lightbulb,
    Gamepad2,
    ExternalLink,
    Flag,
    Check,
    HelpCircle,
    ChevronRight,
    Sparkles,
    Undo2
} from 'lucide-react';
import { DailyCard as DailyCardType, CardSlot } from '@/types';
import { generateCardExplainer } from '@/services/cardSelectionEngine';

interface DailyCardProps {
    card: DailyCardType;
    isCompleted: boolean;
    onAction: (card: DailyCardType) => void;
    onMarkComplete: (cardId: string) => void;
    onFlag: (cardId: string, reason: 'INCORRECT' | 'OUTDATED' | 'INAPPROPRIATE') => void;
    user?: { jobTitle: string; department: string };
    dayOfWeek?: number;
}

export const DailyCard: React.FC<DailyCardProps> = ({
    card,
    isCompleted,
    onAction,
    onMarkComplete,
    onFlag,
    user = { jobTitle: 'Employee', department: 'General' },
    dayOfWeek = new Date().getDay()
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showFlagModal, setShowFlagModal] = useState(false);

    const getSlotIcon = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR': return <Building2 className="w-5 h-5" />;
            case 'DOMAIN_EDGE': return <Compass className="w-5 h-5" />;
            case 'MICRO_SKILL': return <Lightbulb className="w-5 h-5" />;
            case 'SIMULATOR': return <Gamepad2 className="w-5 h-5" />;
            default: return <Sparkles className="w-5 h-5" />;
        }
    };

    const getSlotColor = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR': return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' };
            case 'DOMAIN_EDGE': return { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' };
            case 'MICRO_SKILL': return { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' };
            case 'SIMULATOR': return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-brand-red', badge: 'bg-red-100 text-brand-red' };
            default: return { bg: 'bg-neutral-50', border: 'border-neutral-100', text: 'text-neutral-600', badge: 'bg-neutral-100 text-neutral-700' };
        }
    };

    const getSlotLabel = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR': return 'Key Update';
            case 'DOMAIN_EDGE': return 'Market Insight';
            case 'MICRO_SKILL': return 'Quick Tip';
            case 'SIMULATOR': return 'Challenge';
            default: return 'Card';
        }
    };

    const getSlotDescription = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR': return 'Internal Awareness';
            case 'DOMAIN_EDGE': return 'External Signal';
            case 'MICRO_SKILL': return 'Power Move';
            case 'SIMULATOR': return 'Skill Check';
            default: return 'General Info';
        }
    };

    const getExplainer = (card: DailyCardType): string => {
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

    const colors = getSlotColor(card.slot);

    return (
        <div className={`
            relative min-h-[220px] transition-all duration-700 transform-style-3d
            ${isCompleted ? 'opacity-50 grayscale scale-[0.98]' : ''}
            ${isFlipped ? 'rotate-y-180' : ''}
        `}>
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
                        onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
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
                            onClick={(e) => { e.stopPropagation(); onAction(card); }}
                            className="flex-1 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {card.actionLabel} <ChevronRight className="w-3 h-3" />
                        </button>
                    )}
                    {!isCompleted && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onMarkComplete(card.id); }}
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
                        onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
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
                        onClick={(e) => { e.stopPropagation(); setShowFlagModal(true); }}
                        className="w-full py-2 text-xs font-medium text-neutral-500 hover:text-brand-red transition-colors flex items-center justify-center gap-2"
                    >
                        <Flag className="w-3 h-3" /> Report Issue
                    </button>
                </div>

                {/* Flag Modal Overlay */}
                {showFlagModal && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm rounded-2xl">
                        <div className="w-full space-y-2">
                             <h4 className="font-bold text-sm mb-2 text-center">Report Issue</h4>
                            {['INCORRECT', 'OUTDATED', 'INAPPROPRIATE'].map(r => (
                                <button
                                    key={r}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFlag(card.id, r as any);
                                        setShowFlagModal(false);
                                        setIsFlipped(false);
                                    }}
                                    className="w-full p-2 text-left hover:bg-neutral-100 rounded-lg text-xs border border-neutral-200"
                                >
                                    {r.charAt(0) + r.slice(1).toLowerCase()}
                                </button>
                            ))}
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowFlagModal(false); }}
                                className="mt-2 text-xs text-neutral-500 underline w-full text-center"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
