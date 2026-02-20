import React, { useState } from 'react';
import {
    Briefcase,
    GitBranch,
    Wrench,
    Play,
    UserPlus,
    Rocket,
    Lightbulb,
    CheckCircle2,
    ChevronRight,
    ArrowLeft,
    Target,
    Gauge,
    TrendingUp,
    Users,
} from 'lucide-react';
import { UserProfile } from '@/types';
import { getRoleIdFromProfile, getRoleConfig } from '@/config/onboardingRoleConfigs';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';
import { PhaseCard, CompleteButton } from '../shared/OnboardingUI';

interface Day3Props {
    user: UserProfile;
    onComplete: () => void;
}

type Phase =
    | 'YOUR_ROLE'
    | 'TEAM_WORKFLOW'
    | 'YOUR_TOOLS'
    | 'HANDS_ON'
    | 'YOUR_BUDDY'
    | 'FIRST_CONTRIBUTIONS'
    | 'QUICK_TIPS'
    | 'EOD_CHECKIN';

const Day3LearnYourRole: React.FC<Day3Props> = ({ user, onComplete }) => {
    const [completedModules, setCompletedModules] = useState<Phase[]>([]);
    const [activePhase, setActivePhase] = useState<Phase | null>(null);
    const [simStepIndex, setSimStepIndex] = useState(0);

    const roleId = getRoleIdFromProfile(user.jobTitle);
    const config = getRoleConfig(roleId);

    const markComplete = (phase: Phase) => {
        if (!completedModules.includes(phase)) {
            const updated = [...completedModules, phase];
            setCompletedModules(updated);
            if (updated.length >= 8) {
                setTimeout(onComplete, 1200);
            }
        }
        setActivePhase(null);
    };

    const checkStatus = (phase: Phase) =>
        completedModules.includes(phase) ? 'COMPLETED' : 'AVAILABLE';

    const feedCards: OnboardingCard[] = [
        {
            id: 'YOUR_ROLE',
            title: 'Your Role',
            description: `Understand your responsibilities, KPIs, and what success looks like as a ${config.jobTitle}.`,
            icon: <Briefcase className="w-5 h-5" />,
            status: checkStatus('YOUR_ROLE'),
            type: 'LEARNING',
            progress: completedModules.includes('YOUR_ROLE') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('YOUR_ROLE'),
        },
        {
            id: 'TEAM_WORKFLOW',
            title: 'Team Workflow',
            description: 'How work flows in your team: process, current priorities, and rituals.',
            icon: <GitBranch className="w-5 h-5" />,
            status: checkStatus('TEAM_WORKFLOW'),
            type: 'LEARNING',
            progress: completedModules.includes('TEAM_WORKFLOW') ? 100 : 0,
            estimatedMinutes: 8,
            onAction: () => setActivePhase('TEAM_WORKFLOW'),
        },
        {
            id: 'YOUR_TOOLS',
            title: 'Your Tools',
            description: `Set up and learn the daily tools for ${config.jobTitle}.`,
            icon: <Wrench className="w-5 h-5" />,
            status: checkStatus('YOUR_TOOLS'),
            type: 'SETUP',
            progress: completedModules.includes('YOUR_TOOLS') ? 100 : 0,
            estimatedMinutes: 20,
            onAction: () => setActivePhase('YOUR_TOOLS'),
        },
        {
            id: 'HANDS_ON',
            title: 'Hands-on Task',
            description: `${config.simulation.title} — your first sandbox exercise.`,
            icon: <Play className="w-5 h-5" />,
            status: checkStatus('HANDS_ON'),
            type: 'ACTION',
            progress: completedModules.includes('HANDS_ON') ? 100 : simStepIndex > 0 ? Math.round((simStepIndex / config.simulation.steps.length) * 100) : 0,
            estimatedMinutes: 20,
            onAction: () => setActivePhase('HANDS_ON'),
        },
        {
            id: 'YOUR_BUDDY',
            title: 'Your Buddy',
            description: 'Meet your assigned buddy from the same function.',
            icon: <UserPlus className="w-5 h-5" />,
            status: checkStatus('YOUR_BUDDY'),
            type: 'CONNECT',
            progress: completedModules.includes('YOUR_BUDDY') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('YOUR_BUDDY'),
        },
        {
            id: 'FIRST_CONTRIBUTIONS',
            title: 'First Contributions',
            description: 'Make 2+ real-world contributions today (including shadowing).',
            icon: <Rocket className="w-5 h-5" />,
            status: checkStatus('FIRST_CONTRIBUTIONS'),
            type: 'ACTION',
            progress: completedModules.includes('FIRST_CONTRIBUTIONS') ? 100 : 0,
            estimatedMinutes: 30,
            onAction: () => setActivePhase('FIRST_CONTRIBUTIONS'),
        },
        {
            id: 'QUICK_TIPS',
            title: 'Quick Tips',
            description: 'Shortcuts and hacks for your specific tools.',
            icon: <Lightbulb className="w-5 h-5" />,
            status: checkStatus('QUICK_TIPS'),
            type: 'LEARNING',
            progress: completedModules.includes('QUICK_TIPS') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('QUICK_TIPS'),
        },
        {
            id: 'EOD_CHECKIN',
            title: 'End-of-Day Check-in',
            description: 'How did your first task go? Rate your confidence.',
            icon: <CheckCircle2 className="w-5 h-5" />,
            status: checkStatus('EOD_CHECKIN'),
            type: 'REVIEW',
            progress: completedModules.includes('EOD_CHECKIN') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('EOD_CHECKIN'),
        },
    ];

    if (activePhase) {
        return (
            <div className="max-w-2xl mx-auto">
                <button onClick={() => setActivePhase(null)} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Day 3
                </button>

                {activePhase === 'YOUR_ROLE' && (
                    <PhaseCard title={`Your Role: ${config.jobTitle}`} icon={<Briefcase className="w-6 h-6 text-blue-500" />}>
                        <div className="mb-5">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Responsibilities</h4>
                            <div className="space-y-2">
                                {config.responsibilities.map((r, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                        <Target className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-neutral-700">{r}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">How You're Measured (KPIs)</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {config.kpis.map((k, i) => (
                                    <div key={i} className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                        <p className="text-xs font-bold text-blue-900">{k.metric}</p>
                                        <p className="text-sm font-black text-blue-600 mt-1">{k.target}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('YOUR_ROLE')} />
                    </PhaseCard>
                )}

                {activePhase === 'TEAM_WORKFLOW' && (
                    <PhaseCard title="Team Workflow" icon={<GitBranch className="w-6 h-6 text-indigo-500" />}>
                        <div className="mb-5">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">How We Work</h4>
                            <p className="text-sm text-neutral-700 p-3 bg-neutral-50 rounded-xl border border-neutral-100">{config.teamWorkflow.process}</p>
                        </div>
                        <div className="mb-5">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">What We're Working On Right Now</h4>
                            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                <p className="text-sm text-indigo-700">{config.teamWorkflow.current}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Team Rituals</h4>
                            <div className="space-y-2">
                                {config.teamWorkflow.rituals.map((r, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                        <Users className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm text-neutral-700">{r}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('TEAM_WORKFLOW')} />
                    </PhaseCard>
                )}

                {activePhase === 'YOUR_TOOLS' && (
                    <PhaseCard title="Your Tools" icon={<Wrench className="w-6 h-6 text-green-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Set up these tools for your daily work:</p>
                        <div className="space-y-3">
                            {config.tools.map((t, i) => (
                                <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm font-bold text-neutral-900">{t.name}</p>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-600">{t.purpose}</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">📋 {t.setupInstructions}</p>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('YOUR_TOOLS')} label="All tools set up" />
                    </PhaseCard>
                )}

                {activePhase === 'HANDS_ON' && (
                    <PhaseCard title={config.simulation.title} icon={<Play className="w-6 h-6 text-orange-500" />}>
                        <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 mb-4">
                            <p className="text-xs font-bold text-orange-700 mb-1">🎯 Sandbox Exercise</p>
                            <p className="text-xs text-orange-600">{config.simulation.description}</p>
                        </div>
                        <div className="space-y-2">
                            {config.simulation.steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${i < simStepIndex
                                        ? 'bg-green-50 border-green-200'
                                        : i === simStepIndex
                                            ? 'bg-orange-50 border-orange-200'
                                            : 'bg-neutral-50 border-neutral-100 opacity-50'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i < simStepIndex ? 'bg-green-500 text-white' : i === simStepIndex ? 'bg-orange-500 text-white' : 'bg-neutral-200 text-neutral-400'
                                        }`}>
                                        {i < simStepIndex ? '✓' : i + 1}
                                    </div>
                                    <span className={`text-sm ${i < simStepIndex ? 'text-green-700 line-through' : i === simStepIndex ? 'text-orange-700 font-medium' : 'text-neutral-400'}`}>
                                        {step}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {simStepIndex < config.simulation.steps.length ? (
                            <button
                                onClick={() => setSimStepIndex(i => i + 1)}
                                className="mt-4 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
                            >
                                {simStepIndex === 0 ? 'Start Exercise' : 'Complete Step & Continue'} <ChevronRight className="w-4 h-4 inline ml-1" />
                            </button>
                        ) : (
                            <div>
                                <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200 text-center">
                                    <p className="text-sm font-bold text-green-700">🎉 Exercise Complete!</p>
                                </div>
                                <CompleteButton onClick={() => markComplete('HANDS_ON')} />
                            </div>
                        )}
                    </PhaseCard>
                )}

                {activePhase === 'YOUR_BUDDY' && (
                    <PhaseCard title="Your Buddy" icon={<UserPlus className="w-6 h-6 text-purple-500" />}>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                                    <span className="text-lg font-black text-purple-700">B</span>
                                </div>
                                <div>
                                    <p className="font-bold text-neutral-900">Your {config.department} Buddy</p>
                                    <p className="text-xs text-neutral-500">From the same function, ~1 year tenure</p>
                                </div>
                            </div>
                            <div className="bg-white/70 rounded-lg p-3 text-sm text-neutral-700">
                                "Hey! I'm your onboarding buddy. I've been in this role for about a year. Feel free to ask me anything — the stuff you'd be embarrassed to ask your manager. No question is too small. Let's grab coffee this week!"
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Your Buddy Helps With</p>
                            {['Understanding unwritten team norms', 'Getting context on team history', 'Navigating internal tools & processes', 'Introductions to key people'].map((h, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 text-sm text-neutral-600">
                                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                                    {h}
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('YOUR_BUDDY')} label="I've met my buddy" />
                    </PhaseCard>
                )}

                {activePhase === 'FIRST_CONTRIBUTIONS' && (
                    <PhaseCard title="First Contributions" icon={<Rocket className="w-6 h-6 text-red-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Complete at least 2 of these today:</p>
                        <div className="space-y-3">
                            {config.firstContributions.map((c, i) => (
                                <ContributionItem key={i} title={c.title} description={c.description} />
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('FIRST_CONTRIBUTIONS')} label="I've made my contributions" />
                    </PhaseCard>
                )}

                {activePhase === 'QUICK_TIPS' && (
                    <PhaseCard title="Quick Tips" icon={<Lightbulb className="w-6 h-6 text-yellow-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Pro tips from experienced {config.jobTitle}s:</p>
                        <div className="space-y-2">
                            {config.tips.map((t, i) => (
                                <div key={i} className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                                    <p className="text-sm font-bold text-neutral-900">{t.title}</p>
                                    <p className="text-xs text-neutral-600 font-mono mt-1">{t.shortcut}</p>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('QUICK_TIPS')} />
                    </PhaseCard>
                )}

                {activePhase === 'EOD_CHECKIN' && (
                    <PhaseCard title="End-of-Day Check-in" icon={<CheckCircle2 className="w-6 h-6 text-amber-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">You just completed your first real day as a {config.jobTitle}! 💪</p>
                        <div className="space-y-3 mb-4">
                            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                                <p className="text-xs font-bold text-green-700">✅ {completedModules.length} of 8 modules complete</p>
                                <p className="text-xs text-green-600">You've set up your tools, completed a hands-on task, and made real contributions.</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-blue-700">📋 Tomorrow</p>
                                <p className="text-xs text-blue-600">Day 4: Build Your Network — Meet key people, team scenarios, values exercises.</p>
                            </div>
                        </div>
                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                            <p className="text-xs font-bold text-neutral-700 mb-2">Confidence Level</p>
                            <p className="text-xs text-neutral-500 mb-2">How confident do you feel about doing your job?</p>
                            <div className="flex gap-2">
                                {['1', '2', '3', '4', '5'].map(n => (
                                    <button key={n} className="flex-1 py-2 text-sm font-bold bg-white border border-neutral-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">{n}</button>
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-400 mt-1 px-1">
                                <span>Not at all</span>
                                <span>Very confident</span>
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('EOD_CHECKIN')} label="Done for today" />
                    </PhaseCard>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg font-black text-neutral-900">Day 3 — Learn Your Role</h2>
                <p className="text-sm text-neutral-500">Now let's see what YOUR job actually looks like as a <strong>{config.jobTitle}</strong>.</p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700" style={{ width: `${(completedModules.length / 8) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-neutral-400">{completedModules.length}/8</span>
                </div>
            </div>
            <OnboardingFeed cards={feedCards} />
        </div>
    );
};

const ContributionItem: React.FC<{ title: string; description: string }> = ({ title, description }) => {
    const [checked, setChecked] = useState(false);
    return (
        <button
            onClick={() => setChecked(!checked)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${checked ? 'bg-green-50 border-green-200' : 'bg-neutral-50 border-neutral-100 hover:bg-neutral-100'}`}
        >
            <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${checked ? 'border-green-500 bg-green-500' : 'border-neutral-300'}`}>
                    {checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <div>
                    <p className={`text-sm font-bold ${checked ? 'text-green-700 line-through' : 'text-neutral-900'}`}>{title}</p>
                    <p className="text-xs text-neutral-500 mt-1">{description}</p>
                </div>
            </div>
        </button>
    );
};

export default Day3LearnYourRole;
