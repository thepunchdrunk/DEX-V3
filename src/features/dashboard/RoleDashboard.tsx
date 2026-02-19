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
} from 'lucide-react';
import { UserProfile, DailyCard, SkillBranch } from '@/types';
import { THEME_COLORS, MOCK_DAILY_CARDS, MOCK_SKILL_TREE } from '@/config/constants';
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
        { view: 'DAILY', icon: <Sparkles className="w-4 h-4" />, label: 'Daily 3' },
        { view: 'SKILLS', icon: <TreePine className="w-4 h-4" />, label: 'Skill Graph' },
        { view: 'INSIGHTS', icon: <Compass className="w-4 h-4" />, label: 'Toolkit' },
        { view: 'SETTINGS', icon: <Settings className="w-4 h-4" />, label: 'Profile' },
    ];

    // Time-aware greeting
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return { text: 'Good morning', icon: <Sun className="w-5 h-5 text-amber-400" /> };
        if (hour < 17) return { text: 'Good afternoon', icon: <CloudSun className="w-5 h-5 text-orange-400" /> };
        return { text: 'Good evening', icon: <Moon className="w-5 h-5 text-indigo-400" /> };
    }, []);

    const handleCardAction = (card: DailyCard) => {
        if (card.actionUrl) {
            window.open(card.actionUrl, '_blank');
        }
    };

    const handleCardFlag = (cardId: string, reason: 'INCORRECT' | 'OUTDATED' | 'INAPPROPRIATE') => {
        setCards((prev) =>
            prev.map((c) =>
                c.id === cardId
                    ? { ...c, flagged: true, flagReason: reason }
                    : c
            )
        );
    };

    const handleCardComplete = (cardId: string) => {
        setCards((prev) =>
            prev.map((c) =>
                c.id === cardId
                    ? { ...c, read: true } // Mark as read/completed
                    : c
            )
        );
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white font-black tracking-tighter">
                            DEX
                        </div>
                        <span className="font-bold text-neutral-900 tracking-tight hidden sm:block">Workplace Hub</span>
                    </div>

                    {/* Centered Nav Tabs */}
                    <nav className="hidden md:flex items-center p-1 bg-neutral-100/50 rounded-xl border border-neutral-200/50">
                        {navItems.map((item) => (
                            <button
                                key={item.view}
                                onClick={() => setActiveView(item.view)}
                                className={`
                                    flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                    ${activeView === item.view
                                        ? 'bg-white text-brand-red shadow-sm transform scale-105'
                                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50'
                                    }
                                `}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <PlayerIdentityBadge daysSinceJoin={45} compact />
                        <button className="relative p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full border-2 border-white" />
                        </button>
                    </div>
                </div>

                {/* Search Overlay */}
                {showSearch && (
                    <div className="max-w-3xl mx-auto px-4 pb-4 animate-in fade-in slide-in-from-top-2">
                        <MagicSearch />
                    </div>
                )}
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeView === 'DAILY' && (
                    <div className="space-y-8 page-transition">
                        {/* Greeting Banner */}
                        <div className="greeting-banner animate-fade-in mb-8 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                {greeting.icon}
                                <h1 className="text-3xl font-black text-neutral-900 tracking-tight">
                                    {greeting.text}, {user.name.split(' ')[0]}
                                </h1>
                            </div>
                            <p className="text-neutral-500 text-lg">
                                Here is your <span className="font-bold text-neutral-900">Daily 3</span> for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.
                            </p>
                        </div>

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
                )}

                {activeView === 'SKILLS' && (
                    <div className="animate-fade-in space-y-8">
                        <SkillTree
                            branches={MOCK_SKILL_TREE}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SkillEndorsements />
                            <CareerHorizon />
                        </div>
                    </div>
                )}

                {activeView === 'INSIGHTS' && (
                    <div className="animate-fade-in space-y-8">
                        <InsightsHub />
                        <FearlessFeedback />
                    </div>
                )}

                {activeView === 'SETTINGS' && (
                    <div className="animate-fade-in">
                        <AgentDossier user={user} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default RoleDashboard;
