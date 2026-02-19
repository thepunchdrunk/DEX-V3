import React from 'react';
import {
    Shield,
    Zap,
    Crown,
    Star,
    Rocket,
    Settings,
    RefreshCw,
    Award,
    TrendingUp,
    Target,
    Share2,
    Users
} from 'lucide-react';
import { UserProfile } from '@/types';
import { MOCK_BADGES, MOCK_SKILL_TREE } from '@/config/constants';
import { getPlayerTier, getNextTier, PlayerTier } from './PlayerIdentity';
import SkillRadar from './charts/SkillRadar';

interface AgentDossierProps {
    user: UserProfile;
}

const AgentDossier: React.FC<AgentDossierProps> = ({ user }) => {
    const daysSinceJoin = 45; // Mock data
    const currentTier = getPlayerTier(daysSinceJoin);
    const nextTier = getNextTier(daysSinceJoin);
    const progress = nextTier
        ? Math.round(((daysSinceJoin - currentTier.minDays) / (nextTier.minDays - currentTier.minDays)) * 100)
        : 100;

    const unlockedBadges = MOCK_BADGES.filter(b => b.isUnlocked);
    const velocityScore = 87;

    return (
        <div className="space-y-8 animate-fade-in text-neutral-900">
            {/* Header: Identity Card */}
            <div className="relative bg-white rounded-3xl p-8 md:p-12 overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-red/5 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    {/* Avatar & Rank */}
                    <div className="shrink-0 flex flex-col items-center">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-3xl bg-neutral-50 flex items-center justify-center text-5xl font-black shadow-lg transition-transform duration-500 group-hover:scale-105 border-2 border-neutral-200 text-neutral-900">
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className={`absolute -bottom-4 -right-4 w-12 h-12 rounded-xl ${currentTier.bgColor} ${currentTier.borderColor} border-2 flex items-center justify-center shadow-md transform rotate-12 transition-transform group-hover:rotate-0`}>
                                <span className={currentTier.color}>{currentTier.icon}</span>
                            </div>
                        </div>
                        <div className={`mt-6 px-4 py-1.5 rounded-full border bg-neutral-50 border-neutral-200 text-xs font-black uppercase tracking-widest ${currentTier.color}`}>
                            {currentTier.title} Agent
                        </div>
                    </div>

                    {/* Core Stats & Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900">{user.name}</h2>
                            <span className="hidden md:block w-px h-8 bg-neutral-200" />
                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{user.jobTitle} • {user.department}</p>
                        </div>

                        <p className="text-neutral-500 max-w-xl leading-relaxed mb-8 font-medium">
                            Passionate about building scalable systems and empowering team growth. Focused on backend architecture and distributed systems reliability.
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <div className="flex items-center gap-3 px-5 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl hover:bg-white hover:shadow-sm transition-all">
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                <div>
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Impact Velocity</div>
                                    <div className="text-lg font-black text-neutral-900">{velocityScore}/100</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl hover:bg-white hover:shadow-sm transition-all">
                                <Award className="w-5 h-5 text-amber-500" />
                                <div>
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Achievements</div>
                                    <div className="text-lg font-black text-neutral-900">{unlockedBadges.length} Unlocked</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access Actions */}
                    <div className="flex flex-col gap-3 shrink-0">
                        <button className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-white hover:shadow-md hover:scale-105 transition-all group">
                            <Share2 className="w-5 h-5 text-neutral-400 group-hover:text-brand-red transition-colors" />
                        </button>
                        <button className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-white hover:shadow-md hover:scale-105 transition-all group">
                            <Settings className="w-5 h-5 text-neutral-400 group-hover:text-brand-red transition-colors" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Dossier Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1: Identity & Stats */}
                <div className="space-y-6">
                    <section className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Target className="w-4 h-4 text-brand-red" /> Core Identity
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 group-hover:bg-white group-hover:border-neutral-200 transition-all">
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Role Category</p>
                                <span className="px-2 py-1 bg-neutral-100 rounded-lg text-xs font-bold text-neutral-700">{user.roleCategory || 'DESK'}</span>
                            </div>
                            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 group-hover:bg-white group-hover:border-neutral-200 transition-all">
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Tenure</p>
                                <p className="text-lg font-bold text-neutral-900">{daysSinceJoin} Days Active</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Column 2: Mastery & Focus */}
                <div className="space-y-6">
                    <section className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-bl-[100px] pointer-events-none" />
                        <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-brand-red" /> Skill Signature
                        </h3>

                        {/* Radar Chart Placeholder */}
                        <div className="aspect-square rounded-2xl bg-neutral-50 border border-neutral-100 p-4 relative overflow-hidden mb-6 flex items-center justify-center">
                            <SkillRadar branches={MOCK_SKILL_TREE} />
                        </div>

                        <div className="space-y-2">
                            {MOCK_SKILL_TREE.slice(0, 3).map((branch) => (
                                <div key={branch.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-white group-hover:shadow-sm flex items-center justify-center transition-all border border-transparent group-hover:border-neutral-200">
                                            <Zap className="w-4 h-4 text-neutral-400 group-hover:text-brand-red" />
                                        </div>
                                        <p className="text-xs font-bold text-neutral-700 group-hover:text-neutral-900">{branch.name}</p>
                                    </div>
                                    <div className="w-12 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-red/80 w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Column 3: Legacy & System */}
                <div className="space-y-6">
                    <section className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                <Award className="w-4 h-4 text-brand-red" /> Recent Honours
                            </h3>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {unlockedBadges.slice(0, 8).map(badge => (
                                <div key={badge.id} className="aspect-square rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-2xl hover:scale-110 hover:bg-white hover:shadow-md hover:border-neutral-200 transition-all cursor-help" title={badge.name}>
                                    {badge.icon}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Users className="w-4 h-4 text-brand-red" /> Social Capital
                        </h3>
                        <div className="p-6 rounded-xl bg-neutral-50 border border-neutral-100 relative overflow-hidden group hover:bg-white hover:border-neutral-200 transition-all">
                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Network Influence</p>
                                <p className="text-3xl font-black mb-4 text-neutral-900 group-hover:scale-105 transition-transform origin-left">Top 15%</p>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-xs shadow-sm text-neutral-400">👤</div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">+12</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="pt-4">
                        <button
                            onClick={() => {
                                if (confirm('Reset entire institution state?')) {
                                    localStorage.clear();
                                    window.location.reload();
                                }
                            }}
                            className="w-full py-4 text-xs font-bold text-neutral-400 hover:text-brand-red hover:bg-red-50 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2 group border border-transparent hover:border-red-200"
                        >
                            <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform" /> System Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDossier;
