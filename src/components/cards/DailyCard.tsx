import React, { useState } from 'react';
import {
    Clock,
    ArrowRight,
    CheckCircle2,
    Flag,
    Play,
    Trophy,
    Sparkles,
} from 'lucide-react';
import { DailyCard as DailyCardType } from '@/types';

interface DailyCardProps {
    card: DailyCardType;
    isCompleted: boolean;
    onAction: (card: DailyCardType) => void;
    onMarkComplete: (cardId: string) => void;
    onFlag: (cardId: string, reason: 'INCORRECT' | 'OUTDATED' | 'INAPPROPRIATE') => void;
    user?: any;
}

const SLOT_CONFIG: Record<string, { text: string; bg: string; border: string; accent: string; gradient: string; accentRgb: string }> = {
    CONTEXT: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', accent: '#3B82F6', gradient: 'from-blue-500 to-blue-600', accentRgb: '59,130,246' },
    DOMAIN_KNOWLEDGE: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', accent: '#8B5CF6', gradient: 'from-purple-500 to-purple-600', accentRgb: '139,92,246' },
    CORE_SKILL: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', accent: '#10B981', gradient: 'from-emerald-500 to-emerald-600', accentRgb: '16,185,129' },
    SIMULATOR: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', accent: '#F59E0B', gradient: 'from-amber-500 to-amber-600', accentRgb: '245,158,11' },
};

export const DailyCard: React.FC<DailyCardProps> = ({
    card,
    isCompleted,
    onAction,
    onMarkComplete,
    onFlag,
}) => {
    const [justCompleted, setJustCompleted] = useState(false);

    const config = SLOT_CONFIG[card.slot] || { text: 'text-neutral-600', bg: 'bg-neutral-50', border: 'border-neutral-100', accent: '#71717A', gradient: 'from-neutral-500 to-neutral-600', accentRgb: '113,113,122' };

    const handleComplete = () => {
        setJustCompleted(true);
        onMarkComplete(card.id);
        setTimeout(() => setJustCompleted(false), 1500);
    };

    return (
        <div className={`
            group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out
            ${isCompleted
                ? 'bg-neutral-50 border border-neutral-100 opacity-60'
                : 'bg-white border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-neutral-200'
            }
        `}
            style={{
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            {/* Top accent gradient bar */}
            {!isCompleted && (
                <div
                    className="h-[3px] w-full transition-opacity duration-300"
                    style={{
                        background: `linear-gradient(90deg, ${config.accent} 0%, ${config.accent}66 50%, transparent 100%)`,
                    }}
                />
            )}

            {/* Celebration burst */}
            {justCompleted && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-24 h-24 rounded-full animate-pulse-ring" style={{ background: `radial-gradient(circle, ${config.accent}15 0%, transparent 70%)` }} />
                    <div className="absolute">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-scale-in" />
                    </div>
                </div>
            )}

            {/* Completed check */}
            {isCompleted && (
                <div className="absolute top-5 right-5 z-10">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                </div>
            )}

            <div className="p-6">
                {/* Header: Icon + Badge + Meta */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center border ${config.border}`}>
                            {card.slot === 'SIMULATOR'
                                ? <Trophy className={`w-5 h-5 ${config.text}`} />
                                : <Play className={`w-4 h-4 ${config.text}`} />
                            }
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${config.text} ${config.bg} ${config.border} border`}>
                            {card.slot.replace('_', ' ')}
                        </span>
                    </div>

                    {!isCompleted && (
                        <button
                            onClick={() => onFlag(card.id, 'INAPPROPRIATE')}
                            className="p-1.5 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                            title="Report Issue"
                        >
                            <Flag className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="mb-6">
                    <h3 className={`text-lg font-bold mb-2 leading-tight ${isCompleted ? 'text-neutral-400 line-through' : 'text-neutral-900'}`}>
                        {card.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                        {card.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100/80">
                    <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{card.estimatedMinutes ? `${card.estimatedMinutes} min` : '5 min'}</span>
                    </div>

                    {!isCompleted ? (
                        <button
                            onClick={() => onAction(card)}
                            className="relative px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-300 overflow-hidden group/btn"
                            style={{
                                backgroundColor: config.accent,
                                color: 'white',
                                boxShadow: `0 4px 14px rgba(${config.accentRgb}, 0.25)`,
                            }}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                            </div>
                            <span className="relative z-10 flex items-center gap-2">
                                {card.slot === 'SIMULATOR' ? <Trophy className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                                {card.actionLabel || 'Start'}
                            </span>
                        </button>
                    ) : (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3" />
                            Completed
                        </span>
                    )}
                </div>
            </div>

            {/* Bottom hover accent line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                style={{ background: `linear-gradient(90deg, transparent, ${config.accent}50, transparent)` }}
            />
        </div>
    );
};
