import React, { useState, useMemo } from 'react';
import {
    Leaf,
    TreePine,
    AlertTriangle,
    Check,
    RefreshCw,
    ChevronRight,
    ChevronDown,
    TrendingUp,
    TrendingDown,
    Activity,
    Zap,
    Target,
    Award,
    Clock,
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
            case 'THRIVING':
                return { bg: 'bg-[#4CAF50]', text: 'text-[#4CAF50]', glow: 'shadow-green-200' };
            case 'HEALTHY':
                return { bg: 'bg-[#66BB6A]', text: 'text-[#66BB6A]', glow: 'shadow-green-100' };
            case 'FADING':
                return { bg: 'bg-blue-500', text: 'text-blue-500', glow: 'shadow-blue-200' }; // Repurposed for "Learning"
            case 'DECAYED':
                return { bg: 'bg-neutral-400', text: 'text-neutral-400', glow: 'shadow-neutral-200' }; // Repurposed for "Pending"
        }
    };

    const getMasterySize = (mastery: SkillMastery) => {
        switch (mastery) {
            case 0: return 'w-8 h-8';
            case 1: return 'w-10 h-10';
            case 2: return 'w-12 h-12';
            case 3: return 'w-14 h-14';
        }
    };

    const getMasteryRing = (mastery: SkillMastery) => {
        const rings = [];
        for (let i = 0; i < 3; i++) {
            rings.push(
                <div
                    key={i}
                    className={`absolute inset-0 rounded-full border-2 ${i < mastery ? 'border-current opacity-100' : 'border-[#E0E0E0] opacity-50'
                        }`}
                    style={{ transform: `scale(${1 + i * 0.2})` }}
                />
            );
        }
        return rings;
    };

    const getDecayPercentage = (branch: SkillBranch) => {
        return Math.min(100, Math.round((branch.daysSinceVerified / branch.decayThreshold) * 100));
    };

    // Visual Tree Node Component
    const VisualNode: React.FC<{ skill: SkillBranch; index: number; total: number; level: number }> = ({
        skill,
        index,
        total,
        level,
    }) => {
        const colors = getHealthColor(skill.health);
        const size = getMasterySize(skill.mastery);
        const hasChildren = skill.children && skill.children.length > 0;
        const isSelected = selectedSkill?.id === skill.id;

        // Position calculations for radial layout
        const angle = (index / total) * 360 - 90;
        const radius = 80 + level * 70;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
            <div
                className="absolute transition-all duration-500 cursor-pointer group"
                style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isSelected ? 10 : level,
                }}
                onClick={() => setSelectedSkill(isSelected ? null : skill)}
            >
                {/* Node */}
                <div
                    className={`
                        relative flex items-center justify-center rounded-full
                        ${size} ${colors.bg} ${isSelected ? 'ring-4 ring-white/30' : ''}
                        transition-all duration-300 group-hover:scale-110
                        shadow-lg ${colors.glow}
                    `}
                >
                    {/* Mastery rings */}
                    <div className={`absolute inset-0 ${colors.text}`}>
                        {getMasteryRing(skill.mastery)}
                    </div>

                    {/* Pulse for fading */}
                    {skill.health === 'FADING' && (
                        <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-30" />
                    )}

                    {/* Icon */}
                    <TreePine className="w-4 h-4 text-white relative z-10" />
                </div>

                {/* Label */}
                <div
                    className={`
                        absolute left-1/2 -translate-x-1/2 top-full mt-2
                        px-2 py-1 rounded-lg bg-white/95 backdrop-blur-sm
                        text-xs font-medium text-black whitespace-nowrap
                        opacity-0 group-hover:opacity-100 transition-opacity
                        border border-[#E0E0E0] shadow-sm
                    `}
                >
                    {skill.name}
                </div>

                {/* Connecting lines to children */}
                {hasChildren && (
                    <svg
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ width: '300px', height: '300px', zIndex: -1 }}
                    >
                        {skill.children?.map((child, i) => {
                            const childAngle = ((index + (i - (skill.children!.length - 1) / 2) * 0.3) / total) * 360 - 90;
                            const childRadius = 80 + (level + 1) * 70;
                            const cx = Math.cos((childAngle * Math.PI) / 180) * childRadius - x;
                            const cy = Math.sin((childAngle * Math.PI) / 180) * childRadius - y;
                            return (
                                <line
                                    key={child.id}
                                    x1="150"
                                    y1="150"
                                    x2={150 + cx}
                                    y2={150 + cy}
                                    stroke="rgba(100, 116, 139, 0.3)"
                                    strokeWidth="2"
                                />
                            );
                        })}
                    </svg>
                )}
            </div>
        );
    };

    // Tree List View
    const renderBranch = (branch: SkillBranch, depth: number = 0) => {
        const hasChildren = branch.children && branch.children.length > 0;
        const isExpanded = expandedBranches.includes(branch.id);
        const healthColors = getHealthColor(branch.health);
        const decayPercent = getDecayPercentage(branch);

        return (
            <div key={branch.id} className="relative">
                <div
                    className={`
                        flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer
                        bg-white border border-[#E0E0E0] shadow-sm
                        hover:bg-[#FAFAFA] hover:border-[#BDBDBD]
                    `}
                    style={{ marginLeft: `${depth * 24}px` }}
                    onClick={() => hasChildren && toggleBranch(branch.id)}
                >
                    {hasChildren ? (
                        <button className="text-[#616161] hover:text-black">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                    ) : (
                        <div className="w-4" />
                    )}

                    {/* Visual Node */}
                    <div className={`w-8 h-8 rounded-full ${healthColors.bg} flex items-center justify-center shadow-lg ${healthColors.glow}`}>
                        <TreePine className="w-4 h-4 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-black truncate">{branch.name}</p>
                            {branch.health === 'FADING' && <AlertTriangle className="w-3 h-3 text-[#E65100]" />}
                            {branch.health === 'DECAYED' && <AlertTriangle className="w-3 h-3 text-[#D32F2F]" />}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#616161]">
                            <span className={healthColors.text}>{branch.health}</span>
                            <span>•</span>
                            <span>Level {branch.mastery + 1}</span>
                        </div>
                    </div>

                    {/* Simple Progress Ring */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${healthColors.bg}`}></div>
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="mt-2 space-y-2">
                        {branch.children.map((child) => renderBranch(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header with Health Score */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Health Score Circle */}
                    <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 -rotate-90">
                            <circle
                                cx="40"
                                cy="40"
                                r="34"
                                fill="none"
                                stroke="#E0E0E0"
                                strokeWidth="6"
                            />
                            <circle
                                cx="40"
                                cy="40"
                                r="34"
                                fill="none"
                                stroke={healthScore >= 70 ? '#4CAF50' : '#60A5FA'}
                                strokeWidth="6"
                                strokeDasharray={`${(healthScore / 100) * 213.6} 213.6`}
                                strokeLinecap="round"
                                className="transition-all duration-1000"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-black">{healthScore}</span>
                            <span className="text-[10px] text-[#9E9E9E]">HEALTH</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-black">Your Skill Tree</h2>
                        <p className="text-sm text-[#616161]">
                            {allSkills.length} skills • {healthyCount} thriving
                        </p>
                    </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-[#E0E0E0] shadow-sm">
                    {[
                        { id: 'visual', icon: Target, label: 'Visual' },
                        { id: 'tree', icon: TreePine, label: 'Tree' },
                        { id: 'analytics', icon: BarChart3, label: 'Stats' },
                    ].map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setViewMode(mode.id as any)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === mode.id
                                ? 'bg-[#E60000] text-white'
                                : 'text-[#616161] hover:text-black'
                                }`}
                        >
                            <mode.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{mode.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Visual View */}
            {viewMode === 'visual' && (
                <SkillTreeFlow branches={branches} />
            )}

            {/* Tree View */}
            {viewMode === 'tree' && (
                <div className="space-y-2">
                    {branches.map((branch) => renderBranch(branch))}
                </div>
            )}

            {/* Analytics View */}
            {viewMode === 'analytics' && (
                <div className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#E8F5E9] rounded-2xl p-4 border border-[#4CAF50]/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Activity className="w-5 h-5 text-[#4CAF50]" />
                                <span className="text-sm text-[#4CAF50]">Healthy</span>
                            </div>
                            <p className="text-3xl font-bold text-black">{healthyCount}</p>
                            <p className="text-xs text-[#616161] mt-1">{Math.round((healthyCount / allSkills.length) * 100)}% of skills</p>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Activity className="w-5 h-5 text-blue-600" />
                                <span className="text-sm text-blue-600">Active</span>
                            </div>
                            <p className="text-3xl font-bold text-black">{allSkills.length}</p>
                            <p className="text-xs text-[#616161] mt-1">Total Skills</p>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-5 h-5 text-blue-600" />
                                <span className="text-sm text-blue-600">Mastered</span>
                            </div>
                            <p className="text-3xl font-bold text-black">{allSkills.filter((s) => s.mastery === 3).length}</p>
                            <p className="text-xs text-[#616161] mt-1">Level 4 skills</p>
                        </div>
                    </div>

                    {/* Skill Distribution Chart */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E0E0E0] shadow-sm">
                        <h3 className="text-lg font-bold text-black mb-4">Skill Distribution by Category</h3>
                        <div className="space-y-4">
                            {branches.map((branch) => {
                                const childCount = flattenBranches([branch]).length;
                                const percentage = Math.round((childCount / allSkills.length) * 100);
                                const colors = getHealthColor(branch.health);
                                return (
                                    <div key={branch.id}>
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-black font-medium">{branch.name}</span>
                                            <span className="text-[#616161]">{childCount} skills</span>
                                        </div>
                                        <div className="h-3 bg-[#E0E0E0] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${colors.bg} transition-all duration-1000`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Decay Timeline (Removed) */}

                    {/* Mastery Levels */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E0E0E0] shadow-sm">
                        <h3 className="text-lg font-bold text-black mb-4">Mastery Progression</h3>
                        <div className="flex items-end justify-around h-40">
                            {[0, 1, 2, 3].map((level) => {
                                const count = allSkills.filter((s) => s.mastery === level).length;
                                const percentage = (count / allSkills.length) * 100;
                                const labels = ['Seed', 'Sprout', 'Growing', 'Mastered'];
                                const icons = ['🌱', '🌿', '🌳', '🌲'];
                                return (
                                    <div key={level} className="flex flex-col items-center gap-2">
                                        <span className="text-2xl">{icons[level]}</span>
                                        <div
                                            className="w-16 bg-gradient-to-t from-[#4CAF50] to-[#81C784] rounded-t-lg transition-all duration-1000"
                                            style={{ height: `${Math.max(10, percentage * 1.2)}%` }}
                                        />
                                        <div className="text-center">
                                            <p className="text-lg font-bold text-black">{count}</p>
                                            <p className="text-xs text-[#616161]">{labels[level]}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Action Alert (Removed) */}
        </div>
    );
};

export default SkillTree;
