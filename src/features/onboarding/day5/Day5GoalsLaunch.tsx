import React, { useState } from 'react';
import {
    Target,
    CalendarCheck,
    Award,
    BookOpen,
    Smile,
    ToggleRight,
    Users,
    CheckCircle2,
    ChevronRight,
    ArrowLeft,
    Rocket,
    Sparkles,
    Clock,
    Trophy,
    GraduationCap,
    PartyPopper,
} from 'lucide-react';
import { UserProfile } from '@/types';
import { getRoleIdFromProfile, getRoleConfig } from '@/config/onboardingRoleConfigs';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';
import { PhaseCard, CompleteButton, ChecklistModule } from '../shared/OnboardingUI';

interface Day5Props {
    user: UserProfile;
    onGraduate: () => void;
}

type Phase =
    | 'GOALS_30_60_90'
    | 'PROBATION'
    | 'MANAGER_SIGNOFF'
    | 'LEARNING_RESOURCES'
    | 'ERGS'
    | 'FEEDBACK_SURVEY'
    | 'GRADUATION_CERT'
    | 'GRADUATE';

const Day5GoalsLaunch: React.FC<Day5Props> = ({ user, onGraduate }) => {
    const [completedModules, setCompletedModules] = useState<Phase[]>([]);
    const [activePhase, setActivePhase] = useState<Phase | null>(null);
    const [graduated, setGraduated] = useState(false);

    const roleId = getRoleIdFromProfile(user.jobTitle);
    const config = getRoleConfig(roleId);

    const markComplete = (phase: Phase) => {
        if (!completedModules.includes(phase)) {
            setCompletedModules(prev => [...prev, phase]);
        }
        setActivePhase(null);
    };

    const checkStatus = (phase: Phase) =>
        completedModules.includes(phase) ? 'COMPLETED' : 'AVAILABLE';

    const allReady = true;

    const feedCards: OnboardingCard[] = [
        {
            id: 'GOALS_30_60_90',
            title: '30/60/90-Day Goals',
            description: `Role-specific milestones for your first 3 months as ${config.jobTitle}.`,
            icon: <Target className="w-5 h-5" />,
            status: checkStatus('GOALS_30_60_90'),
            type: 'LEARNING',
            progress: completedModules.includes('GOALS_30_60_90') ? 100 : 0,
            estimatedMinutes: 15,
            onAction: () => setActivePhase('GOALS_30_60_90'),
        },
        {
            id: 'PROBATION',
            title: 'Probation & Review Cycle',
            description: 'What your first 90 days look like and when you\'ll be reviewed.',
            icon: <CalendarCheck className="w-5 h-5" />,
            status: checkStatus('PROBATION'),
            type: 'LEARNING',
            progress: completedModules.includes('PROBATION') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('PROBATION'),
        },
        {
            id: 'MANAGER_SIGNOFF',
            title: 'Manager Sign-off',
            description: 'Schedule your end-of-week 1:1 and confirm your goals.',
            icon: <Award className="w-5 h-5" />,
            status: checkStatus('MANAGER_SIGNOFF'),
            type: 'ACTION',
            progress: completedModules.includes('MANAGER_SIGNOFF') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('MANAGER_SIGNOFF'),
        },
        {
            id: 'LEARNING_RESOURCES',
            title: 'Learning Resources',
            description: 'Courses, communities, and references for continued growth.',
            icon: <BookOpen className="w-5 h-5" />,
            status: checkStatus('LEARNING_RESOURCES'),
            type: 'LEARNING',
            progress: completedModules.includes('LEARNING_RESOURCES') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('LEARNING_RESOURCES'),
        },
        {
            id: 'ERGS',
            title: 'Social Clubs & ERGs',
            description: 'Find your community beyond work — clubs, interest groups, ERGs.',
            icon: <Users className="w-5 h-5" />,
            status: checkStatus('ERGS'),
            type: 'CONNECT',
            progress: completedModules.includes('ERGS') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('ERGS'),
        },
        {
            id: 'FEEDBACK_SURVEY',
            title: 'Feedback Survey',
            description: 'Tell us how your onboarding experience was.',
            icon: <Smile className="w-5 h-5" />,
            status: checkStatus('FEEDBACK_SURVEY'),
            type: 'REVIEW',
            progress: completedModules.includes('FEEDBACK_SURVEY') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('FEEDBACK_SURVEY'),
        },
        {
            id: 'GRADUATION_CERT',
            title: 'Graduation Certificate',
            description: 'Download your personalized onboarding completion certificate.',
            icon: <GraduationCap className="w-5 h-5" />,
            status: checkStatus('GRADUATION_CERT'),
            type: 'CELEBRATION',
            progress: completedModules.includes('GRADUATION_CERT') ? 100 : 0,
            estimatedMinutes: 2,
            onAction: () => setActivePhase('GRADUATION_CERT'),
        },
        {
            id: 'GRADUATE',
            title: 'Launch! 🚀',
            description: allReady ? 'You\'re ready to graduate!' : 'Complete Goals, Manager Sign-off & Feedback first.',
            icon: <Rocket className="w-5 h-5" />,
            status: allReady ? 'AVAILABLE' : 'LOCKED',
            type: 'CELEBRATION',
            progress: allReady ? 0 : 0,
            estimatedMinutes: 1,
            onAction: allReady ? () => setActivePhase('GRADUATE') : undefined,
        },
    ];

    if (activePhase) {
        return (
            <div className="max-w-2xl mx-auto">
                <button onClick={() => setActivePhase(null)} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Day 5
                </button>

                {activePhase === 'GOALS_30_60_90' && (
                    <PhaseCard title="30/60/90-Day Goals" icon={<Target className="w-6 h-6 text-blue-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">These are your role-specific milestones. Discuss with your manager and customize as needed.</p>

                        <GoalSection title="First 30 Days — Get Grounded" color="blue" goals={config.goals30} icon="🏠" />
                        <GoalSection title="Days 31–60 — Start Contributing" color="indigo" goals={config.goals60} icon="⚡" />
                        <GoalSection title="Days 61–90 — Gain Autonomy" color="purple" goals={config.goals90} icon="🚀" />

                        <CompleteButton onClick={() => markComplete('GOALS_30_60_90')} label="I've reviewed my goals" />
                    </PhaseCard>
                )}

                {activePhase === 'PROBATION' && (
                    <PhaseCard title="Probation & Review Cycle" icon={<CalendarCheck className="w-6 h-6 text-orange-500" />}>
                        <div className="space-y-3">
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                                <p className="text-sm font-bold text-orange-800 mb-1">Probation Period: 90 Days</p>
                                <p className="text-xs text-orange-600">Your probation period runs from your start date to day 90. During this time, you'll have regular check-ins with your manager to ensure you're settling in well.</p>
                            </div>
                            <div className="space-y-2">
                                {[
                                    { week: 'Week 1', what: 'End-of-week check-in with manager (today!)' },
                                    { week: 'Week 2', what: 'First 1:1 — review early impressions and blockers' },
                                    { week: 'Week 4', what: '30-day review — assess alignment with goals' },
                                    { week: 'Week 8', what: '60-day review — mid-probation performance check' },
                                    { week: 'Week 12', what: '90-day review — probation completion decision' },
                                ].map((r, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                        <span className="text-xs font-black text-orange-500 w-16 flex-shrink-0">{r.week}</span>
                                        <span className="text-sm text-neutral-700">{r.what}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('PROBATION')} label="I understand the timeline" />
                    </PhaseCard>
                )}

                {activePhase === 'MANAGER_SIGNOFF' && (
                    <PhaseCard title="Manager Sign-off" icon={<Award className="w-6 h-6 text-emerald-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Schedule a 30-minute 1:1 with {user.manager || 'your manager'} today to:</p>
                        <ChecklistModule items={[
                            { label: 'Review your 30/60/90 day goals together', done: false },
                            { label: 'Confirm expectations for the first month', done: false },
                            { label: 'Address any questions from the week', done: false },
                            { label: 'Get feedback on how your first week went', done: false },
                            { label: 'Schedule recurring 1:1 (weekly recommended)', done: false },
                        ]} />
                        <CompleteButton onClick={() => markComplete('MANAGER_SIGNOFF')} label="Sign-off complete" />
                    </PhaseCard>
                )}

                {activePhase === 'LEARNING_RESOURCES' && (
                    <PhaseCard title="Learning Resources" icon={<BookOpen className="w-6 h-6 text-purple-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Curated for {config.jobTitle}s — bookmark these for ongoing development:</p>
                        <div className="space-y-2">
                            {config.learningResources.map((r, i) => (
                                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="block p-3 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-purple-50 hover:border-purple-100 transition-all">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-bold text-neutral-900">{r.title}</p>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">{r.type}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 mt-4">
                            <p className="text-xs font-bold text-blue-700 mb-1">💰 Learning Budget: $3,000/year</p>
                            <p className="text-xs text-blue-600">Use it for courses, conferences, certifications, and books. Submit requests via the HRIS portal.</p>
                        </div>
                        <CompleteButton onClick={() => markComplete('LEARNING_RESOURCES')} label="Resources bookmarked" />
                    </PhaseCard>
                )}

                {activePhase === 'ERGS' && (
                    <PhaseCard title="Social Clubs & ERGs" icon={<Users className="w-6 h-6 text-pink-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Connect beyond your team. Join groups that interest you:</p>
                        <div className="space-y-2">
                            {[
                                { name: 'Women in Tech', emoji: '👩‍💻', desc: 'Mentorship, networking, and career development' },
                                { name: 'PRIDE Alliance', emoji: '🏳️‍🌈', desc: 'LGBTQ+ community and allies' },
                                { name: 'Parents@Work', emoji: '👨‍👧‍👦', desc: 'Support network for working parents' },
                                { name: 'BIPOC Alliance', emoji: '✊', desc: 'Community for Black, Indigenous, and People of Color' },
                                { name: 'Accessibility Champions', emoji: '♿', desc: 'Promoting inclusive design and accessibility' },
                                { name: 'Running Club', emoji: '🏃', desc: 'Weekly group runs and race training' },
                                { name: 'Board Games Night', emoji: '🎲', desc: 'Monthly game nights in the office' },
                            ].map((g, i) => (
                                <ERGItem key={i} group={g} />
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('ERGS')} label="I've found my communities" />
                    </PhaseCard>
                )}

                {activePhase === 'FEEDBACK_SURVEY' && (
                    <PhaseCard title="Feedback Survey" icon={<Smile className="w-6 h-6 text-amber-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Your feedback helps us improve onboarding for future hires:</p>
                        <div className="space-y-4">
                            {[
                                'How would you rate your overall onboarding experience?',
                                'Did you feel adequately prepared for your role?',
                                'Was the pace of onboarding appropriate?',
                                'Did you feel welcome and supported?',
                            ].map((q, i) => (
                                <div key={i} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <p className="text-sm text-neutral-700 mb-2">{q}</p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <button key={n} className="flex-1 py-1.5 text-sm bg-white border border-neutral-200 rounded-lg hover:bg-amber-50 hover:border-amber-200 transition-colors">
                                                {n}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                <p className="text-sm text-neutral-700 mb-2">Anything else you'd like to share?</p>
                                <textarea className="w-full p-3 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 resize-none" rows={3} placeholder="Type your feedback here..." />
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('FEEDBACK_SURVEY')} label="Submit feedback" />
                    </PhaseCard>
                )}

                {activePhase === 'GRADUATION_CERT' && (
                    <PhaseCard title="Graduation Certificate" icon={<GraduationCap className="w-6 h-6 text-amber-500" />}>
                        <div className="p-6 bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-2xl border-2 border-amber-200 text-center mx-auto">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                                <Trophy className="w-8 h-8 text-amber-700" />
                            </div>
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Certificate of Completion</p>
                            <p className="text-xl font-black text-neutral-900 mb-1">{user.name}</p>
                            <p className="text-sm text-neutral-500 mb-3">{config.jobTitle} — {config.department}</p>
                            <p className="text-xs text-neutral-400 mb-4">Has successfully completed the 5-day onboarding program</p>
                            <div className="flex items-center justify-center gap-2 text-xs text-amber-600">
                                <Sparkles className="w-4 h-4" />
                                <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('GRADUATION_CERT')} label="Save certificate" />
                    </PhaseCard>
                )}

                {activePhase === 'GRADUATE' && (
                    <PhaseCard title="You're Ready!" icon={<Rocket className="w-6 h-6 text-red-500" />}>
                        <div className="text-center py-4">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center animate-bounce">
                                <PartyPopper className="w-12 h-12 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-black text-neutral-900 mb-2">Congratulations, {user.name.split(' ')[0]}! 🎉</h2>
                            <p className="text-sm text-neutral-500 mb-6">You've completed your 5-day onboarding as a <strong>{config.jobTitle}</strong>. You're officially ready to launch.</p>
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                                    <p className="text-2xl font-black text-red-600">5</p>
                                    <p className="text-[10px] text-neutral-500">Days</p>
                                </div>
                                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                                    <p className="text-2xl font-black text-red-600">44</p>
                                    <p className="text-[10px] text-neutral-500">Modules</p>
                                </div>
                                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                                    <p className="text-2xl font-black text-red-600">100%</p>
                                    <p className="text-[10px] text-neutral-500">Complete</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setGraduated(true); onGraduate(); }}
                                className="w-full py-4 bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white text-lg font-black rounded-xl hover:shadow-xl hover:shadow-red-500/30 transition-all active:scale-[0.98] relative overflow-hidden"
                            >
                                <span className="relative z-10">Launch Workplace 🚀</span>
                            </button>
                        </div>
                    </PhaseCard>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg font-black text-neutral-900">Day 5 — Goals & Launch</h2>
                <p className="text-sm text-neutral-500">Set your roadmap, get sign-off, and officially graduate. 🎓</p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700" style={{ width: `${(completedModules.length / 8) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-neutral-400">{completedModules.length}/8</span>
                </div>
            </div>
            <OnboardingFeed cards={feedCards} />
        </div>
    );
};

// --- Shared ---

const GoalSection: React.FC<{ title: string; color: string; goals: string[]; icon: string }> = ({ title, color, goals, icon }) => (
    <div className="mb-5">
        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{icon} {title}</h4>
        <div className="space-y-2">
            {goals.map((g, i) => (
                <div key={i} className={`p-3 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <p className="text-sm text-neutral-700">{g}</p>
                </div>
            ))}
        </div>
    </div>
);

const ERGItem: React.FC<{ group: { name: string; emoji: string; desc: string } }> = ({ group }) => {
    const [joined, setJoined] = useState(false);
    return (
        <div className={`p-3 rounded-xl border transition-all ${joined ? 'bg-pink-50 border-pink-200' : 'bg-neutral-50 border-neutral-100'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span>{group.emoji}</span>
                    <div>
                        <p className="text-sm font-bold text-neutral-900">{group.name}</p>
                        <p className="text-xs text-neutral-500">{group.desc}</p>
                    </div>
                </div>
                <button
                    onClick={() => setJoined(!joined)}
                    className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all ${joined ? 'bg-pink-100 text-pink-700' : 'bg-neutral-100 text-neutral-600 hover:bg-pink-50 hover:text-pink-600'
                        }`}
                >
                    {joined ? '✓ Joined' : '+ Join'}
                </button>
            </div>
        </div>
    );
};

export default Day5GoalsLaunch;
