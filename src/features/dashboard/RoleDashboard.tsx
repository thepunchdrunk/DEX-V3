import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
    Sparkles,
    TreePine,
    Users,
    Settings,
    Search,
    Bell,
    CloudSun,
    Compass,
    Sun,
    Moon,
    LayoutGrid,
    Target,
    Zap
} from 'lucide-react';
import { UserProfile, DailyCard } from '@/types';
import { MOCK_DAILY_CARDS, MOCK_SKILL_TREE } from '@/config/constants';
import Daily3Feed from './Daily3Feed';
import SkillTree from '../tree/SkillTree';
import MagicSearch from '../search/MagicSearch';
import InsightsHub from './InsightsHub';
import { SkillEndorsements, CareerHorizon, PlayerIdentityBadge, AgentDossier, FearlessFeedback } from './features';

type DashboardView = 'DAILY' | 'SKILLS' | 'INSIGHTS' | 'SETTINGS';

interface RoleDashboardProps {
    user: UserProfile;
    isWednesday?: boolean;
    onUpdateUser: (updates: Partial<UserProfile>) => void;
}

const RoleDashboard: React.FC<RoleDashboardProps> = ({ user, isWednesday = false, onUpdateUser }) => {
    const [activeView, setActiveView] = useState<DashboardView>('DAILY');
    const [showSearch, setShowSearch] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [viewTransition, setViewTransition] = useState(false);
    const [cards, setCards] = useState<DailyCard[]>(
        MOCK_DAILY_CARDS.filter(c => !c.roleCategories || (user.roleCategory && c.roleCategories.includes(user.roleCategory)))
    );

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems: { view: DashboardView; icon: React.ReactNode; label: string }[] = [
        { view: 'DAILY', icon: <LayoutGrid className="w-4 h-4" />, label: 'Command' },
        { view: 'SKILLS', icon: <TreePine className="w-4 h-4" />, label: 'Growth' },
        { view: 'INSIGHTS', icon: <Zap className="w-4 h-4" />, label: 'Toolkit' },
        { view: 'SETTINGS', icon: <Settings className="w-4 h-4" />, label: 'Settings' },
    ];

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return { text: 'Good morning', icon: <Sun className="w-5 h-5 text-amber-400" />, accentColor: '#F59E0B' };
        if (hour < 17) return { text: 'Good afternoon', icon: <CloudSun className="w-5 h-5 text-orange-400" />, accentColor: '#F97316' };
        return { text: 'Good evening', icon: <Moon className="w-5 h-5 text-indigo-400" />, accentColor: '#6366F1' };
    }, []);

    const handleViewSwitch = (view: DashboardView) => {
        if (view === activeView) return;
        setViewTransition(true);
        setTimeout(() => {
            setActiveView(view);
            setViewTransition(false);
        }, 200);
    };

    const handleCardAction = (card: DailyCard) => {
        if (card.actionUrl) window.open(card.actionUrl, '_blank');
    };

    const handleCardFlag = (cardId: string, reason: 'INCORRECT' | 'OUTDATED' | 'INAPPROPRIATE') => {
        setCards((prev) => prev.map((c) => c.id === cardId ? { ...c, flagged: true, flagReason: reason } : c));
    };

    const handleCardComplete = (cardId: string) => {
        setCards((prev) => prev.map((c) => c.id === cardId ? { ...c, read: true } : c));
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-20 font-sans relative overflow-hidden">

            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 animate-drift"
                    style={{ top: '0', right: '0', background: `radial-gradient(circle, ${greeting.accentColor}08, transparent 70%)` }}
                />
                <div
                    className="absolute w-[400px] h-[400px] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 animate-drift"
                    style={{ bottom: '0', left: '0', background: 'radial-gradient(circle, #E6000005, transparent 70%)', animationDelay: '-10s' }}
                />
                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* FLOATING HEADER */}
            <header className={`sticky top-4 z-40 px-4 md:px-6 mb-8 pointer-events-none transition-all duration-500`}>
                <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">

                    {/* Brand */}
                    <div className={`
                        rounded-2xl p-1.5 flex items-center pr-5 gap-3 bg-white/90 backdrop-blur-xl border border-neutral-200/60
                        transition-all duration-500
                        ${isScrolled ? 'shadow-lg' : 'shadow-md'}
                    `}>
                        <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white font-black text-xs shadow-md shadow-red-500/15">
                            DX
                        </div>
                        <span className="text-sm font-black text-neutral-800 hidden sm:block tracking-wide">Workplace OS</span>
                    </div>

                    {/* Nav Pills */}
                    <nav className={`
                        p-1.5 rounded-2xl flex gap-1 bg-white/90 backdrop-blur-xl border border-neutral-200/60
                        transition-all duration-500
                        ${isScrolled ? 'shadow-lg' : 'shadow-md'}
                    `}>
                        {navItems.map((item) => (
                            <button
                                key={item.view}
                                onClick={() => handleViewSwitch(item.view)}
                                className={`
                                    relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 overflow-hidden
                                    ${activeView === item.view
                                        ? 'bg-neutral-900 text-white shadow-md'
                                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                                    }
                                `}
                            >
                                {item.icon}
                                <span className="hidden md:inline">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className={`
                        rounded-2xl p-1.5 flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-neutral-200/60
                        transition-all duration-500
                        ${isScrolled ? 'shadow-lg' : 'shadow-md'}
                    `}>
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-500 hover:bg-neutral-50 hover:text-brand-red transition-colors"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                        <div className="w-px h-5 bg-neutral-200" />
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-500 hover:bg-neutral-50 hover:text-brand-red transition-colors relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-red rounded-full ring-2 ring-white" />
                        </button>
                        <div className="pl-1">
                            <PlayerIdentityBadge daysSinceJoin={45} compact />
                        </div>
                    </div>
                </div>

                {/* Search Overlay */}
                {showSearch && (
                    <div className="absolute top-full left-0 right-0 mt-3 px-4 sm:px-0 pointer-events-auto">
                        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 animate-scale-in origin-top shadow-2xl border border-neutral-200/60">
                            <MagicSearch />
                        </div>
                    </div>
                )}
            </header>

            {/* DASHBOARD CONTENT */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`
                    transition-all duration-300
                    ${viewTransition
                        ? 'opacity-0 translate-y-3 scale-[0.99]'
                        : 'opacity-100 translate-y-0 scale-100'
                    }
                `}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >

                    {/* Greeting (Daily view) */}
                    {activeView === 'DAILY' && (
                        <div className="mb-10 animate-fade-in-up">
                            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight mb-2 leading-tight">
                                {greeting.text}, <span className="text-neutral-300">{user.name.split(' ')[0]}</span>.
                            </h1>
                            <div className="flex items-center gap-2 text-neutral-500">
                                <Compass className="w-4 h-4" />
                                <span className="text-sm font-medium">Your daily focus is ready.</span>
                            </div>
                        </div>
                    )}

                    {activeView === 'DAILY' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                            {/* Main Feed */}
                            <div className="lg:col-span-8 space-y-8">
                                <Daily3Feed
                                    cards={cards}
                                    onCardAction={handleCardAction}
                                    onMarkComplete={handleCardComplete}
                                    onCardFlag={handleCardFlag}
                                    completedCards={cards.filter(c => c.read).map(c => c.id)}
                                    user={user}
                                    isWednesday={isWednesday}
                                />
                            </div>

                            {/* Sidebar Widgets */}
                            <div className="lg:col-span-4 space-y-6">
                                {/* Streak Widget */}
                                <div
                                    className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: '200ms', animationFillMode: 'both' }}
                                >
                                    <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Current Streak</h3>
                                    <div className="flex items-end gap-2">
                                        <span className="text-5xl font-black text-brand-red leading-none">12</span>
                                        <span className="text-lg font-bold text-neutral-400 mb-0.5">days</span>
                                    </div>
                                    <div className="mt-4 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-brand-red to-red-400 w-[80%] rounded-full transition-all duration-1000" />
                                    </div>
                                </div>

                                {/* Skill Focus */}
                                <div
                                    className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: '350ms', animationFillMode: 'both' }}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Skill Focus</h3>
                                        <Target className="w-4 h-4 text-neutral-400" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-bold text-neutral-600 hover:border-brand-red/30 hover:text-brand-red transition-colors cursor-default">
                                            Communication
                                        </span>
                                        <span className="px-3 py-1.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-bold text-neutral-600 hover:border-brand-red/30 hover:text-brand-red transition-colors cursor-default">
                                            Cloud Ops
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeView === 'SKILLS' && (
                        <div className="animate-fade-in-up space-y-8">
                            <div className="rounded-3xl">
                                <SkillTree branches={MOCK_SKILL_TREE} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SkillEndorsements />
                                <CareerHorizon />
                            </div>
                        </div>
                    )}

                    {activeView === 'INSIGHTS' && (
                        <div className="animate-fade-in-up space-y-8">
                            <InsightsHub />
                            <FearlessFeedback />
                        </div>
                    )}

                    {activeView === 'SETTINGS' && (
                        <div className="animate-fade-in-up">
                            <AgentDossier user={user} />
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default RoleDashboard;
