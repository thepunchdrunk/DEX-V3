import React, { useState, useMemo } from 'react';
import {
    TreePine,
    AlertTriangle,
    ChevronRight,
    ChevronDown,
    Activity,
    Zap,
    Target,
    BarChart3,
} from 'lucide-react';
import { SkillBranch, SkillHealth, SkillMastery } from '@/types';
import SkillTreeFlow from './SkillTreeFlow';

interface SkillTreeProps {
    branches: SkillBranch[];
}

const SkillTree: React.FC<SkillTreeProps> = ({ branches }) => {
    const [expandedBranches, setExpandedBranches] = useState<string[]>(
        branches.map((b) => b.id)
    );
    const [viewMode, setViewMode] = useState<'tree' | 'visual' | 'analytics'>('visual');
    const [selectedSkill, setSelectedSkill] = useState<SkillBranch | null>(null);

    const toggleBranch = (branchId: string) => {
        setExpandedBranches((prev) =>
            prev.includes(branchId)
                ? prev.filter((id) => id !== branchId)
                : [...prev, branchId]
        );
    };

    // Flatten all skills
    const flattenBranches = (branches: SkillBranch[]): SkillBranch[] => {
        return branches.reduce((acc, branch) => {
            return [...acc, branch, ...flattenBranches(branch.children || [])];
        }, [] as SkillBranch[]);
    };

    const allSkills = useMemo(() => flattenBranches(branches), [branches]);
    const healthyCount = allSkills.filter((s) => s.health === 'THRIVING' || s.health === 'HEALTHY').length;

    // Calculate overall health score
    const healthScore = useMemo(() => {
        const weights = { THRIVING: 100, HEALTHY: 90, FADING: 80, DECAYED: 70 };
        const totalScore = allSkills.reduce((sum, s) => sum + weights[s.health], 0);
        return Math.round(totalScore / allSkills.length);
    }, [allSkills]);

    const getHealthColor = (health: SkillHealth) => {
        switch (health) {
            case 'THRIVING': return 'bg-emerald-500 text-white shadow-emerald-500/40';
            case 'HEALTHY': return 'bg-emerald-400 text-white shadow-emerald-400/30';
            case 'FADING': return 'bg-amber-400 text-white shadow-amber-400/30';
            case 'DECAYED': return 'bg-neutral-400 text-white shadow-neutral-400/30';
        }
    };

    const getHealthText = (health: SkillHealth) => {
        switch (health) {
            case 'THRIVING': return 'text-emerald-600';
            case 'HEALTHY': return 'text-emerald-500';
            case 'FADING': return 'text-amber-500';
            case 'DECAYED': return 'text-neutral-400';
        }
    };

    // Tree List View
    const renderBranch = (branch: SkillBranch, depth: number = 0) => {
        const hasChildren = branch.children && branch.children.length > 0;
        const isExpanded = expandedBranches.includes(branch.id);
        const healthClasses = getHealthColor(branch.health);
        const healthText = getHealthText(branch.health);

        return (
            <div key={branch.id} className="relative animate-fade-in-up">
                <div
                    className={`
                        flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer duration-300
                        glass-panel hover:bg-white/80 border-transparent hover:border-neutral-200
                        hover:translate-x-1
                    `}
                    style={{ marginLeft: `${depth * 28}px` }}
                    onClick={() => hasChildren && toggleBranch(branch.id)}
                >
                    {hasChildren ? (
                        <button className="text-neutral-400 hover:text-brand-red transition-colors">
                            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </button>
                    ) : (
                        <div className="w-5" />
                    )}

                    {/* Visual Node */}
                    <div className={`w-10 h-10 rounded-xl ${healthClasses} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                        <TreePine className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-bold text-neutral-900 truncate">{branch.name}</p>
                            {branch.health === 'FADING' && <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium">
                            <span className={healthText}>{branch.health}</span>
                            <span className="text-neutral-300">•</span>
                            <span className="text-neutral-500">Level {branch.mastery + 1}</span>
                        </div>
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="mt-3 space-y-3 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-neutral-200/50">
                        {branch.children.map((child) => renderBranch(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header with Health Score */}
            <div className="glass-panel p-6 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-6">
                    {/* Health Score Circle */}
                    <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 -rotate-90">
                            <circle
                                cx="48" cy="48" r="40"
                                fill="none"
                                stroke="#f3f4f6"
                                strokeWidth="8"
                            />
                            <circle
                                cx="48" cy="48" r="40"
                                fill="none"
                                stroke="url(#health-gradient)"
                                strokeWidth="8"
                                strokeDasharray={`${(healthScore / 100) * 251} 251`}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                                <linearGradient id="health-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10B981" />
                                    <stop offset="100%" stopColor="#34D399" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-neutral-900">{healthScore}</span>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Health</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Skill Matrix</h2>
                        <p className="text-neutral-500 font-medium">
                            {allSkills.length} Total Skills • {healthyCount} Thriving
                        </p>
                    </div>
                </div>

                {/* View Toggle */}
                <div className="glass-panel p-1.5 rounded-xl flex items-center gap-1 bg-neutral-100/50">
                    {[
                        { id: 'visual', icon: Target, label: 'Visual' },
                        { id: 'tree', icon: TreePine, label: 'List' },
                        { id: 'analytics', icon: BarChart3, label: 'Stats' },
                    ].map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setViewMode(mode.id as any)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                ${viewMode === mode.id
                                    ? 'bg-white text-brand-red shadow-sm transform scale-105'
                                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
                                }
                            `}
                        >
                            <mode.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{mode.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {viewMode === 'visual' && (
                    <div className="glass-panel rounded-3xl p-8 h-[600px] flex items-center justify-center bg-white/50 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-100/20 to-transparent pointer-events-none" />
                        <SkillTreeFlow branches={branches} />
                    </div>
                )}

                {viewMode === 'tree' && (
                    <div className="space-y-3 pl-2">
                        {branches.map((branch) => renderBranch(branch))}
                    </div>
                )}

                {viewMode === 'analytics' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
                        {/* Stats Cards */}
                        <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
                                <Activity className="w-8 h-8" />
                            </div>
                            <span className="text-4xl font-black text-neutral-900 mb-2">{healthyCount}</span>
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Healthy Skills</span>
                        </div>

                        <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 shadow-sm">
                                <Zap className="w-8 h-8" />
                            </div>
                            <span className="text-4xl font-black text-neutral-900 mb-2">{allSkills.filter((s) => s.mastery === 3).length}</span>
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Mastered Skills</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillTree;
