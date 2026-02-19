import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface OnboardingCard {
    id: string;
    title: string;
    description: string;
    type: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'AVAILABLE' | 'LOCKED';
    progress?: number;
    estimatedMinutes?: number;
    estimatedTime?: string;
    explainer?: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
}

interface OnboardingFeedProps {
    cards: OnboardingCard[];
    onCardAction?: (id: string) => void;
}

const TYPE_CONFIG: Record<string, { label: string; accent: string; accentBg: string; accentBorder: string; dotColor: string }> = {
    SETUP: { label: 'Setup', accent: 'text-neutral-700', accentBg: 'bg-neutral-50', accentBorder: 'border-neutral-200', dotColor: 'bg-neutral-400' },
    LEARNING: { label: 'Learning', accent: 'text-blue-600', accentBg: 'bg-blue-50', accentBorder: 'border-blue-100', dotColor: 'bg-blue-500' },
    ACTION: { label: 'Action', accent: 'text-emerald-600', accentBg: 'bg-emerald-50', accentBorder: 'border-emerald-100', dotColor: 'bg-emerald-500' },
    CONNECT: { label: 'Connect', accent: 'text-purple-600', accentBg: 'bg-purple-50', accentBorder: 'border-purple-100', dotColor: 'bg-purple-500' },
    REVIEW: { label: 'Review', accent: 'text-amber-600', accentBg: 'bg-amber-50', accentBorder: 'border-amber-100', dotColor: 'bg-amber-500' },
    CELEBRATION: { label: 'Celebrate', accent: 'text-yellow-600', accentBg: 'bg-yellow-50', accentBorder: 'border-yellow-100', dotColor: 'bg-yellow-500' },
};

// A single horizontal scrolling lane
const ScrollLane: React.FC<{ cards: OnboardingCard[]; type: string }> = ({ cards, type }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (el) el.addEventListener('scroll', checkScroll, { passive: true });
        window.addEventListener('resize', checkScroll);
        return () => {
            el?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const scrollAmount = el.clientWidth * 0.7;
        el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    };

    const config = TYPE_CONFIG[type] || TYPE_CONFIG.SETUP;
    const isWide = type === 'SETUP' || type === 'CELEBRATION';

    return (
        <div className="group/lane relative">
            {/* Lane header */}
            <div className="flex items-center gap-3 mb-3 px-1">
                <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
                <h3 className={`text-xs font-bold uppercase tracking-widest ${config.accent}`}>{config.label}</h3>
                <div className="flex-1 h-px bg-neutral-100" />
                <span className="text-[10px] font-bold text-neutral-400">{cards.length}</span>
            </div>

            {/* Scroll container */}
            <div className="relative">
                {/* Fade edges */}
                {canScrollLeft && (
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
                )}
                {canScrollRight && (
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />
                )}

                {/* Scroll arrows */}
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 opacity-0 group-hover/lane:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                )}
                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 opacity-0 group-hover/lane:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                )}

                {/* Scrollable rail */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
                    style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
                >
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className={`
                                group flex-shrink-0 scroll-snap-start
                                ${isWide ? 'w-[360px]' : 'w-[300px]'}
                            `}
                            style={{ scrollSnapAlign: 'start' }}
                        >
                            <button
                                onClick={card.status !== 'LOCKED' ? card.onAction : undefined}
                                disabled={card.status === 'LOCKED'}
                                className={`
                                    w-full text-left p-5 rounded-2xl border transition-all duration-300
                                    ${card.status === 'LOCKED'
                                        ? 'bg-neutral-50 border-neutral-100 opacity-40 cursor-not-allowed'
                                        : card.status === 'COMPLETED'
                                            ? 'bg-white border-neutral-100 opacity-60'
                                            : 'bg-white border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-neutral-200 active:scale-[0.98]'
                                    }
                                `}
                            >
                                {/* Top accent line */}
                                <div className={`w-8 h-0.5 rounded-full mb-4 ${config.dotColor} ${card.status === 'IN_PROGRESS' ? 'animate-pulse' : ''}`} />

                                {/* Icon + Meta */}
                                <div className="flex items-start justify-between mb-3">
                                    {card.icon && (
                                        <div className={`w-9 h-9 rounded-xl ${config.accentBg} flex items-center justify-center`}>
                                            {card.icon}
                                        </div>
                                    )}
                                    <span className="text-[10px] font-bold text-neutral-400">{card.estimatedTime || (card.estimatedMinutes ? `${card.estimatedMinutes}m` : '')}</span>
                                </div>

                                {/* Title */}
                                <h4 className={`text-sm font-bold mb-1.5 leading-snug ${card.status === 'COMPLETED' ? 'text-neutral-400 line-through' : 'text-neutral-900'}`}>
                                    {card.title}
                                </h4>
                                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-4">{card.description}</p>

                                {/* Progress bar */}
                                <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${config.dotColor}`}
                                        style={{ width: `${card.progress || 0}%` }}
                                    />
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const OnboardingFeed: React.FC<OnboardingFeedProps> = ({ cards }) => {
    // Group cards by type
    const grouped = cards.reduce((acc, card) => {
        if (!acc[card.type]) acc[card.type] = [];
        acc[card.type].push(card);
        return acc;
    }, {} as Record<string, OnboardingCard[]>);

    const laneOrder = ['SETUP', 'LEARNING', 'ACTION', 'CONNECT', 'REVIEW', 'CELEBRATION'];
    const orderedLanes = laneOrder.filter(type => grouped[type]?.length > 0);

    if (orderedLanes.length <= 1) {
        return (
            <div>
                <ScrollLane cards={cards} type={cards[0]?.type || 'SETUP'} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {orderedLanes.map(type => (
                <ScrollLane key={type} cards={grouped[type]} type={type} />
            ))}
        </div>
    );
};

export default OnboardingFeed;
