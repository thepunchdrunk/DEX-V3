import React from 'react';
import {
    Clock,
    ArrowRight,
    CheckCircle2,
    Flag,
    MoreHorizontal,
    Play,
    BookOpen,
    Trophy
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

export const DailyCard: React.FC<DailyCardProps> = ({
    card,
    isCompleted,
    onAction,
    onMarkComplete,
    onFlag
}) => {

    // Domain Color Mapping
    const getDomainColor = (slot: string) => {
        switch (slot) {
            case 'CONTEXT': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'DOMAIN_KNOWLEDGE': return 'text-purple-600 bg-purple-50 border-purple-100';
            case 'CORE_SKILL': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'SIMULATOR': return 'text-amber-600 bg-amber-50 border-amber-100';
            default: return 'text-neutral-600 bg-neutral-50 border-neutral-100';
        }
    };

    const domainStyle = getDomainColor(card.slot);

    return (
        <div className={`
            group relative p-6 rounded-2xl transition-all duration-300
            ${isCompleted
                ? 'bg-neutral-50 border border-neutral-100 opacity-60 grayscale-[0.5]'
                : 'bg-white border border-neutral-100 shadow-sm hover:shadow-float hover:-translate-y-1 hover:border-brand-red-alpha-20'
            }
        `}>
            {/* Completion Overlay (Celebration) */}
            {isCompleted && (
                <div className="absolute top-4 right-4 text-emerald-500 animate-scale-in">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
            )}

            {/* Header: Badge & Meta */}
            <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${domainStyle}`}>
                    {card.slot.replace('_', ' ')}
                </span>

                {!isCompleted && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onFlag(card.id, 'INAPPROPRIATE')}
                            className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Report Issue"
                        >
                            <Flag className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="mb-6">
                <h3 className={`text-lg font-bold mb-2 leading-tight ${isCompleted ? 'text-neutral-500 line-through' : 'text-neutral-900'}`}>
                    {card.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {card.description}
                </p>
            </div>

            {/* Footer / Action */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{card.estimatedTime || '5 min'}</span>
                </div>

                {!isCompleted ? (
                    <button
                        onClick={() => onAction(card)}
                        className={`
                            px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all
                            ${card.slot === 'SIMULATOR'
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                : 'bg-neutral-900 text-white hover:bg-brand-red hover:shadow-glow-red'
                            }
                        `}
                    >
                        {card.slot === 'SIMULATOR' ? <Trophy className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        {card.actionLabel || 'Start'}
                    </button>
                ) : (
                    <button onClick={() => { }} className="text-xs font-bold text-emerald-600 flex items-center gap-1 cursor-default">
                        Completed
                    </button>
                )}
            </div>

            {/* Hover Decor - Slight Red Glow Line */}
            <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20" />
        </div>
    );
};
