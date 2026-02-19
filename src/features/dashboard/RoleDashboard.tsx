import React, { useState, useMemo } from 'react';
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
    const [cards, setCards] = useState<DailyCard[]>(
        MOCK_DAILY_CARDS.filter(c => !c.roleCategories || (user.roleCategory && c.roleCategories.includes(user.roleCategory)))
    );

    const navItems: { view: DashboardView; icon: React.ReactNode; label: string }[] = [
        { view: 'DAILY', icon: <LayoutGrid className="w-4 h-4" />, label: 'Command' },
        { view: 'SKILLS', icon: <TreePine className="w-4 h-4" />, label: 'Growth' },
        { view: 'INSIGHTS', icon: <Zap className="w-4 h-4" />, label: 'Toolkit' },
        { view: 'SETTINGS', icon: <Settings className="w-4 h-4" />, label: 'Settings' },
    ];

    // Time-aware greeting
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return { text: 'Good morning', icon: <Sun className="w-5 h-5 text-amber-400" /> };
        if (hour < 17) return { text: 'Good afternoon', icon: <CloudSun className="w-5 h-5 text-orange-400" /> };
        return { text: 'Good evening', icon: <Moon className="w-5 h-5 text-indigo-400" /> };
    }, []);

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
        <div className="min-h-screen bg-neutral-50 pb-20 font-sans">

            {/* BACKGROUND DECORATION */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red-alpha-5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* FLOATING HEADER (Dynamic Island Style) */}
            <header className="sticky top-6 z-40 px-4 md:px-0 mb-8 pointer-events-none">
                <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">

                    {/* Brand / Home */}
                    <div className="glass-panel rounded-full p-1.5 flex items-center pr-4 gap-3 bg-white/80 shadow-lg">
                        <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-black text-xs shadow-glow-red">
                            DX
                        </div>
                        <span className="text-sm font-bold text-neutral-800 hidden sm:block">Workplace OS</span>
                    </div>

                    {/* Navigation Pills */}
                    <nav className="glass-panel p-1.5 rounded-full flex gap-1 bg-white/90 shadow-lg backdrop-blur-xl">
                        {navItems.map((item) => (
                            <button
                                key={item.view}
                                onClick={() => setActiveView(item.view)}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300
                                    ${activeView === item.view
                                        ? 'bg-neutral-900 text-white shadow-md scale-105'
                                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                                    }
                                `}
                            >
                                {item.icon}
                                <span className="hidden md:inline">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="glass-panel rounded-full p-1.5 flex gap-2 bg-white/80 shadow-lg">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-brand-red transition-colors"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-neutral-200 my-auto" />
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-brand-red transition-colors relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-brand-red rounded-full ring-1 ring-white" />
                        </button>
                        <div className="pl-1">
                            <PlayerIdentityBadge daysSinceJoin={45} compact />
                        </div>
                    </div>
                </div>

                {/* Search Overlay */}
                {showSearch && (
                    <div className="absolute top-full left-0 right-0 mt-4 px-4 sm:px-0">
                        <div className="max-w-3xl mx-auto glass-panel rounded-2xl p-2 animate-scale-in origin-top">
                            <MagicSearch />
                        </div>
                    </div>
                )}
            </header>

            {/* DASHBOARD GRID */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Greeting (Only on Daily view) */}
                {activeView === 'DAILY' && (
                    <div className="mb-10 animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl font-display font-black text-neutral-900 tracking-tight mb-2">
                            {greeting.text}, <span className="text-neutral-400">{user.name.split(' ')[0]}</span>.
                        </h1>
                        <div className="flex items-center gap-2 text-neutral-500">
                            <Compass className="w-4 h-4" />
                            <span className="text-sm font-medium">Your daily focus is ready.</span>
                        </div>
                    </div>
                )}

                {activeView === 'DAILY' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up delay-100">
                        {/* Main Feed (Left 8 cols) */}
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

                        {/* Sidebar Widgets (Right 4 cols) */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Stats Widget */}
                            <div className="glass-panel p-6 rounded-2xl bg-white/50 hover:bg-white/80 transition-colors">
                                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">Current Streak</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-black text-brand-red">12</span>
                                    <span className="text-lg font-bold text-neutral-600 mb-1">days</span>
                                </div>
                                <div className="mt-4 h-2 bg-neutral-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-red w-[80%] rounded-full" />
                                </div>
                            </div>

                            {/* Mini Skills */}
                            <div className="glass-panel p-6 rounded-2xl bg-white/50 hover:bg-white/80 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Skill Focus</h3>
                                    <Target className="w-4 h-4 text-neutral-400" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-bold text-neutral-600">
                                        Communication
                                    </span>
                                    <span className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-bold text-neutral-600">
                                        Cloud Ops
                                    </span>
                                </div>
                            </div>


                        </div>
                    </div>
                )}

                {activeView === 'SKILLS' && (
                    <div className="animate-fade-in-up space-y-8">
                        {/* Wrapper removed to let SkillTree's glass panels shine */}
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
            </main>
        </div>
    );
};

export default RoleDashboard;
