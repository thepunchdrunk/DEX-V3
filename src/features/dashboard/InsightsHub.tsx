import React, { useState } from 'react';
import {
    Gamepad2,
    Trophy,
    Users,
    Crosshair,
    AlertTriangle,
    Clock,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import {
    EnhancedSimulator,
    Leaderboard,
    MentorMatch,
    BountyBoard,
    LessonsLearned,
    OfficeHours,
} from './features';

type ToolId = 'SIMULATOR' | 'BOUNTIES' | 'MENTORS' | 'LEADERBOARD' | 'LESSONS' | 'OFFICE_HOURS';

interface InsightsHubProps {
    className?: string;
}

const TOOLKIT_CARDS = [
    {
        id: 'SIMULATOR' as ToolId,
        icon: Gamepad2,
        title: 'Simulator',
        description: 'Practice high-stakes scenarios in a safe environment.',
        action: 'Launch',
        accentColor: 'text-brand-red',
        iconBg: 'bg-brand-red',
        hoverBorder: 'hover:border-brand-red/30',
        hoverGradient: 'group-hover:from-red-50 group-hover:to-white',
        accentLine: 'bg-brand-red',
    },
    {
        id: 'BOUNTIES' as ToolId,
        icon: Crosshair,
        title: 'Bounty Board',
        description: 'Earn points by completing cross-team projects.',
        action: 'Claim',
        accentColor: 'text-orange-600',
        iconBg: 'bg-gradient-to-br from-orange-400 to-red-500',
        hoverBorder: 'hover:border-orange-300',
        hoverGradient: 'group-hover:from-orange-50 group-hover:to-white',
        accentLine: 'bg-orange-500',
    },
    {
        id: 'MENTORS' as ToolId,
        icon: Users,
        title: 'Mentor Match',
        description: 'AI-matched mentors based on your skill gaps & goals.',
        action: 'Discover',
        accentColor: 'text-blue-600',
        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
        hoverBorder: 'hover:border-blue-300',
        hoverGradient: 'group-hover:from-blue-50 group-hover:to-white',
        accentLine: 'bg-blue-500',
    },
    {
        id: 'LEADERBOARD' as ToolId,
        icon: Trophy,
        title: 'Leaderboard',
        description: 'Learning × Performance impact rankings.',
        action: 'View',
        accentColor: 'text-indigo-600',
        iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
        hoverBorder: 'hover:border-indigo-300',
        hoverGradient: 'group-hover:from-indigo-50 group-hover:to-white',
        accentLine: 'bg-indigo-500',
    },
    {
        id: 'LESSONS' as ToolId,
        icon: AlertTriangle,
        title: 'Lessons Learned',
        description: 'Real failure stories that made us stronger.',
        action: 'Read',
        accentColor: 'text-rose-600',
        iconBg: 'bg-gradient-to-br from-rose-400 to-pink-500',
        hoverBorder: 'hover:border-rose-300',
        hoverGradient: 'group-hover:from-rose-50 group-hover:to-white',
        accentLine: 'bg-rose-500',
    },
    {
        id: 'OFFICE_HOURS' as ToolId,
        icon: Clock,
        title: 'Office Hours',
        description: 'Drop-in sessions with domain experts.',
        action: 'Browse',
        accentColor: 'text-teal-600',
        iconBg: 'bg-gradient-to-br from-teal-400 to-cyan-500',
        hoverBorder: 'hover:border-teal-300',
        hoverGradient: 'group-hover:from-teal-50 group-hover:to-white',
        accentLine: 'bg-teal-500',
    },
];

const InsightsHub: React.FC<InsightsHubProps> = ({ className = '' }) => {
    const [activeTool, setActiveTool] = useState<ToolId | null>(null);

    // Full-view mode with back navigation
    if (activeTool) {
        const activeCard = TOOLKIT_CARDS.find(c => c.id === activeTool);
        return (
            <div className={`space-y-6 ${className}`}>
                <div className="flex items-center gap-2 mb-4">
                    <button
                        onClick={() => setActiveTool(null)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all text-sm font-medium active:scale-95"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Toolkit
                    </button>
                    {activeCard && (
                        <>
                            <span className="text-neutral-300">/</span>
                            <span className="text-sm font-bold text-neutral-900">{activeCard.title}</span>
                        </>
                    )}
                </div>

                <div className="bg-white rounded-2xl p-4 md:p-6 border border-neutral-200 min-h-[600px] page-transition relative overflow-hidden shadow-sm">
                    {/* Top accent line matching active tool color */}
                    {activeCard && <div className={`absolute top-0 left-0 right-0 h-[3px] ${activeCard.accentLine} rounded-t-2xl`} />}
                    {activeTool === 'SIMULATOR' && <EnhancedSimulator />}
                    {activeTool === 'BOUNTIES' && <BountyBoard />}
                    {activeTool === 'MENTORS' && <MentorMatch />}
                    {activeTool === 'LEADERBOARD' && <Leaderboard />}
                    {activeTool === 'LESSONS' && <LessonsLearned />}
                    {activeTool === 'OFFICE_HOURS' && <OfficeHours />}
                </div>
            </div>
        );
    }

    // Default: Curated Toolkit
    return (
        <div className={`space-y-6 ${className}`}>
            <section className="animate-fade-in">
                <div className="flex items-center gap-2 mb-5">
                    <h2 className="text-xl font-bold text-black">Your Toolkit</h2>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 font-medium">6 tools</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {TOOLKIT_CARDS.map((tool, index) => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`group relative flex flex-col p-5 rounded-2xl bg-gradient-to-br from-white to-white border border-neutral-200 ${tool.hoverBorder} ${tool.hoverGradient} hover:shadow-lg hover:-translate-y-1 text-left transition-all duration-500 ease-out overflow-hidden animate-fade-in-up`}
                            style={{ animationDelay: `${(index + 1) * 80}ms` }}
                        >
                            <div className={`w-10 h-10 rounded-xl ${tool.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:animate-float-gentle transition-transform duration-500 shadow-md`}>
                                <tool.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-neutral-900 mb-1 transition-colors group-hover:text-neutral-900">{tool.title}</h3>
                            <p className="text-xs text-neutral-500 mb-4 flex-1 leading-relaxed">{tool.description}</p>
                            <div className={`flex items-center gap-2 text-xs font-bold ${tool.accentColor}`}>
                                <span className="uppercase tracking-wider">{tool.action}</span>
                                <ChevronRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </div>
                            {/* Bottom accent sweep */}
                            <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${tool.accentLine} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-50`} />
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default InsightsHub;
