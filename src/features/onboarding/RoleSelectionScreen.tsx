import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UserProfile } from '@/types';
import {
    Wrench,
    PenTool,
    HeartHandshake,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from 'lucide-react';

interface RoleSelectionScreenProps {
    onSelectRole: (roleData: Partial<UserProfile>) => void;
}

const ROLES = [
    {
        id: 'software-architect',
        title: 'Software Architect',
        department: 'Engineering',
        roleCategory: 'DESK',
        role: 'EMPLOYEE',
        icon: Wrench,
        tagline: 'Design the systems.',
        description: 'Design scalable systems, lead architecture decisions, and drive technical excellence across the engineering org.',
        highlight: 'System Architecture',
        accent: '#E60000',
        accentRgb: '230, 0, 0',
        accentLight: 'rgba(230, 0, 0, 0.06)',
        accentMid: 'rgba(230, 0, 0, 0.12)',
        gradientFrom: '#FFF5F5',
        gradientTo: '#FFFFFF',
    },
    {
        id: 'ux-researcher',
        title: 'UX Researcher',
        department: 'Design',
        roleCategory: 'DESK',
        role: 'EMPLOYEE',
        icon: PenTool,
        tagline: 'Understand the humans.',
        description: 'Plan & run user studies, synthesize insights into design decisions, and champion the voice of the user.',
        highlight: 'User Research',
        accent: '#6366F1',
        accentRgb: '99, 102, 241',
        accentLight: 'rgba(99, 102, 241, 0.06)',
        accentMid: 'rgba(99, 102, 241, 0.12)',
        gradientFrom: '#F5F5FF',
        gradientTo: '#FFFFFF',
    },
    {
        id: 'customer-success',
        title: 'Customer Success Manager',
        department: 'Sales / CS',
        roleCategory: 'DESK',
        role: 'EMPLOYEE',
        icon: HeartHandshake,
        tagline: 'Champion outcomes.',
        description: 'Own client relationships, drive renewals & upsells, and transform customers into advocates.',
        highlight: 'Client Outcomes',
        accent: '#10B981',
        accentRgb: '16, 185, 129',
        accentLight: 'rgba(16, 185, 129, 0.06)',
        accentMid: 'rgba(16, 185, 129, 0.12)',
        gradientFrom: '#F0FDF9',
        gradientTo: '#FFFFFF',
    },
] as const;

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSelecting, setIsSelecting] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const [iconReady, setIconReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<number>(0);

    const activeRole = ROLES[activeIndex];

    // Stagger entrance animations on role change
    useEffect(() => {
        setTextVisible(false);
        setIconReady(false);
        const t1 = setTimeout(() => setIconReady(true), 150);
        const t2 = setTimeout(() => setTextVisible(true), 400);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [activeIndex]);

    // Navigate helpers
    const goNext = useCallback(() => {
        if (!isSelecting) setActiveIndex(prev => Math.min(prev + 1, ROLES.length - 1));
    }, [isSelecting]);

    const goPrev = useCallback(() => {
        if (!isSelecting) setActiveIndex(prev => Math.max(prev - 1, 0));
    }, [isSelecting]);

    const handleSelect = useCallback(() => {
        if (isSelecting) return;
        setIsSelecting(true);
        setTimeout(() => {
            const role = ROLES[activeIndex];
            onSelectRole({
                jobTitle: role.title,
                department: role.department,
                roleCategory: role.roleCategory as UserProfile['roleCategory'],
                role: role.role as UserProfile['role'],
            });
        }, 1000);
    }, [activeIndex, isSelecting, onSelectRole]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isSelecting) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext(); }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev(); }
            else if (e.key === 'Enter') { e.preventDefault(); handleSelect(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goNext, goPrev, handleSelect, isSelecting]);

    // Mouse wheel navigation
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        let cooldown = false;
        const handleWheel = (e: WheelEvent) => {
            if (isSelecting || cooldown) return;
            e.preventDefault();
            const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            if (Math.abs(delta) < 10) return;
            cooldown = true;
            if (delta > 0) goNext(); else goPrev();
            setTimeout(() => { cooldown = false; }, 700);
        };
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [isSelecting, goNext, goPrev]);

    // Touch swipe support
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const onTouchStart = (e: TouchEvent) => { touchStartRef.current = e.touches[0].clientX; };
        const onTouchEnd = (e: TouchEvent) => {
            const diff = touchStartRef.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 60) { diff > 0 ? goNext() : goPrev(); }
        };
        container.addEventListener('touchstart', onTouchStart, { passive: true });
        container.addEventListener('touchend', onTouchEnd, { passive: true });
        return () => { container.removeEventListener('touchstart', onTouchStart); container.removeEventListener('touchend', onTouchEnd); };
    }, [goNext, goPrev]);

    const goTo = (index: number) => {
        if (!isSelecting && index !== activeIndex) setActiveIndex(index);
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden select-none"
            style={{
                background: `linear-gradient(160deg, ${activeRole.gradientFrom} 0%, ${activeRole.gradientTo} 60%, #FAFAFA 100%)`,
                transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            {/* === BACKGROUND LAYERS === */}

            {/* Radial glow */}
            <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${activeRole.accentLight} 0%, transparent 70%)`,
                    opacity: iconReady ? 1 : 0,
                }}
            />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Floating accent orb */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full blur-[120px] animate-drift"
                style={{
                    top: '-15%', right: '-10%',
                    background: `radial-gradient(circle, ${activeRole.accentLight} 0%, transparent 70%)`,
                    transition: 'background 0.8s ease',
                }}
            />
            <div
                className="absolute w-[350px] h-[350px] rounded-full blur-[100px] animate-drift"
                style={{
                    bottom: '-10%', left: '-8%',
                    background: `radial-gradient(circle, ${activeRole.accentLight} 0%, transparent 70%)`,
                    animationDelay: '-12s',
                    transition: 'background 0.8s ease',
                }}
            />

            {/* === LAYOUT: [Arrow] [Content] [Arrow] === */}
            <div className={`
                relative z-10 h-full flex items-center
                transition-all duration-700
                ${isSelecting ? 'scale-110 opacity-0 blur-md' : 'scale-100 opacity-100 blur-0'}
            `}
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
                {/* Left Arrow Column */}
                <div className="w-20 md:w-28 flex items-center justify-center shrink-0">
                    {activeIndex > 0 && !isSelecting && (
                        <button
                            onClick={goPrev}
                            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 shadow-lg flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Center Content */}
                <div className="flex-1 flex flex-col items-center justify-center min-w-0">

                    {/* Top badge */}
                    <div className={`
                        mb-8
                        transition-all duration-700 delay-100
                        ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
                    `}>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/60 shadow-sm text-[11px] font-bold text-neutral-500 tracking-[0.2em] uppercase">
                            <Sparkles className="w-3.5 h-3.5" style={{ color: activeRole.accent }} />
                            Select Your Role
                        </span>
                    </div>

                    {/* Hero Icon with orbital rings */}
                    <div className={`
                        relative mb-12
                        transition-all duration-700 ease-out
                        ${iconReady ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-[-15deg]'}
                    `}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                    >
                        {/* Orbital ring 1 */}
                        <div
                            className="absolute -inset-8 rounded-full border border-dashed animate-spin-slow"
                            style={{
                                borderColor: `rgba(${activeRole.accentRgb}, 0.12)`,
                                animationDuration: '20s',
                            }}
                        />
                        {/* Orbital ring 2 */}
                        <div
                            className="absolute -inset-14 rounded-full border border-dotted"
                            style={{
                                borderColor: `rgba(${activeRole.accentRgb}, 0.06)`,
                                animation: 'spin 30s linear infinite reverse',
                            }}
                        />
                        {/* Icon container */}
                        <div
                            className="relative w-32 h-32 rounded-3xl flex items-center justify-center bg-white shadow-2xl border"
                            style={{
                                borderColor: `rgba(${activeRole.accentRgb}, 0.12)`,
                                boxShadow: `0 25px 50px -12px rgba(${activeRole.accentRgb}, 0.15), 0 0 0 1px rgba(${activeRole.accentRgb}, 0.05)`,
                            }}
                        >
                            <activeRole.icon
                                className="w-16 h-16"
                                style={{ color: activeRole.accent }}
                                strokeWidth={1.5}
                            />
                        </div>
                        {/* Corner dots */}
                        <div className="absolute -top-2 -right-2 w-2.5 h-2.5 rounded-full bg-white border-2 shadow-sm" style={{ borderColor: activeRole.accent }} />
                        <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full" style={{ backgroundColor: activeRole.accent, opacity: 0.3 }} />
                    </div>

                    {/* Text content */}
                    <div className="text-center max-w-2xl">
                        {/* Tagline */}
                        <p className={`
                            text-sm font-bold tracking-[0.25em] uppercase mb-6
                            transition-all duration-600
                            ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                        `}
                            style={{ color: activeRole.accent }}
                        >
                            {activeRole.tagline}
                        </p>

                        {/* Title */}
                        <h1 className={`
                            text-6xl md:text-8xl font-black text-neutral-900 tracking-tight mb-6 leading-[0.95]
                            transition-all duration-700 delay-100
                            ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        `}
                            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                        >
                            {activeRole.title}
                        </h1>

                        {/* Description */}
                        <p className={`
                            text-lg md:text-xl text-neutral-500 leading-relaxed max-w-lg mx-auto mb-4
                            transition-all duration-700 delay-200
                            ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                        `}>
                            {activeRole.description}
                        </p>

                        {/* Highlight badge */}
                        <div className={`
                            inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border shadow-sm mb-12
                            transition-all duration-700 delay-300
                            ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        `}
                            style={{ borderColor: `rgba(${activeRole.accentRgb}, 0.15)` }}
                        >
                            <Sparkles className="w-3.5 h-3.5" style={{ color: activeRole.accent }} />
                            <span className="text-xs font-bold text-neutral-600 tracking-wider">{activeRole.highlight}</span>
                        </div>
                    </div>

                    {/* Initialize button */}
                    <button
                        onClick={handleSelect}
                        disabled={isSelecting}
                        className={`
                            group relative px-10 py-4 rounded-2xl text-sm font-bold tracking-wider uppercase text-white
                            flex items-center gap-3 overflow-hidden
                            transition-all duration-500 ease-out
                            hover:scale-105 active:scale-95
                            ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                        `}
                        style={{
                            background: activeRole.accent,
                            boxShadow: `0 10px 40px rgba(${activeRole.accentRgb}, 0.25), 0 4px 12px rgba(0,0,0,0.1)`,
                            transitionDelay: '400ms',
                        }}
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </div>
                        <span className="relative z-10">Initialize</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right Arrow Column */}
                <div className="w-20 md:w-28 flex items-center justify-center shrink-0">
                    {activeIndex < ROLES.length - 1 && !isSelecting && (
                        <button
                            onClick={goNext}
                            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 shadow-lg flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Bottom navigation dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                    {ROLES.map((role, index) => (
                        <button
                            key={role.id}
                            onClick={() => goTo(index)}
                            disabled={isSelecting}
                            className="group relative flex flex-col items-center gap-2"
                        >
                            <div className={`
                                rounded-full transition-all duration-500 shadow-sm
                                ${index === activeIndex
                                    ? 'w-10 h-2.5'
                                    : 'w-2.5 h-2.5 group-hover:w-4'
                                }
                            `}
                                style={{
                                    backgroundColor: index === activeIndex ? role.accent : '#D4D4D8',
                                    boxShadow: index === activeIndex ? `0 0 12px rgba(${role.accentRgb}, 0.3)` : 'none',
                                }}
                            />
                            <span className={`
                                text-[10px] font-bold tracking-widest uppercase transition-all duration-300
                                ${index === activeIndex ? 'opacity-100 text-neutral-600' : 'opacity-0 group-hover:opacity-100 text-neutral-400'}
                            `}>
                                {role.title.split(' ')[0]}
                            </span>
                        </button>
                    ))}
                </div>
                <p className="text-[10px] text-neutral-400 tracking-widest uppercase">
                    ← → to navigate • Enter to select
                </p>
            </div>

            {/* Role counter */}
            <div className="absolute top-8 right-8 z-20">
                <span className="text-xs font-mono text-neutral-400">
                    <span style={{ color: activeRole.accent }} className="font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                    <span className="mx-1 text-neutral-300">/</span>
                    {String(ROLES.length).padStart(2, '0')}
                </span>
            </div>

            {/* Vertical accent line */}
            <div
                className="absolute left-0 top-1/4 w-[2px] h-1/2 transition-colors duration-700"
                style={{ backgroundColor: `rgba(${activeRole.accentRgb}, 0.12)` }}
            />
        </div>
    );
};

export default RoleSelectionScreen;
