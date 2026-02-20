import React, { useState } from 'react';
import {
    UserCircle2,
    Network,
    Drama,
    Scale,
    MessageSquare,
    Calendar,
    Trophy,
    Users,
    CheckCircle2,
    ChevronRight,
    ArrowLeft,
    Send,
    ThumbsUp,
    ThumbsDown,
    Star,
} from 'lucide-react';
import { UserProfile } from '@/types';
import { getRoleIdFromProfile, getRoleConfig, CULTURE_QUIZ_QUESTIONS } from '@/config/onboardingRoleConfigs';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';
import { PhaseCard, CompleteButton } from '../shared/OnboardingUI';

interface Day4Props {
    user: UserProfile;
    onComplete: () => void;
}

type Phase =
    | 'KEY_PEOPLE'
    | 'ORG_CHART'
    | 'SCENARIOS'
    | 'VALUES'
    | 'COMM_NORMS'
    | 'MEETINGS'
    | 'QUIZ'
    | 'COHORT'
    | 'EOD_CHECKIN';

const Day4BuildNetwork: React.FC<Day4Props> = ({ user, onComplete }) => {
    const [completedModules, setCompletedModules] = useState<Phase[]>([]);
    const [activePhase, setActivePhase] = useState<Phase | null>(null);
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

    const roleId = getRoleIdFromProfile(user.jobTitle);
    const config = getRoleConfig(roleId);

    const markComplete = (phase: Phase) => {
        if (!completedModules.includes(phase)) {
            const updated = [...completedModules, phase];
            setCompletedModules(updated);
            if (updated.length >= 9) {
                setTimeout(onComplete, 1200);
            }
        }
        setActivePhase(null);
    };

    const checkStatus = (phase: Phase) =>
        completedModules.includes(phase) ? 'COMPLETED' : 'AVAILABLE';

    const feedCards: OnboardingCard[] = [
        {
            id: 'KEY_PEOPLE',
            title: 'Your Key People',
            description: `Meet the 5 most important contacts for your role as ${config.jobTitle}.`,
            icon: <UserCircle2 className="w-5 h-5" />,
            status: checkStatus('KEY_PEOPLE'),
            type: 'CONNECT',
            progress: completedModules.includes('KEY_PEOPLE') ? 100 : 0,
            estimatedMinutes: 15,
            onAction: () => setActivePhase('KEY_PEOPLE'),
        },
        {
            id: 'ORG_CHART',
            title: 'Org Chart',
            description: 'Understand where you sit and who your stakeholders are.',
            icon: <Network className="w-5 h-5" />,
            status: checkStatus('ORG_CHART'),
            type: 'LEARNING',
            progress: completedModules.includes('ORG_CHART') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('ORG_CHART'),
        },
        {
            id: 'SCENARIOS',
            title: 'Practice Scenarios',
            description: 'Interactive dilemmas from your role\'s real world.',
            icon: <Drama className="w-5 h-5" />,
            status: checkStatus('SCENARIOS'),
            type: 'ACTION',
            progress: completedModules.includes('SCENARIOS') ? 100 : scenarioIndex > 0 ? Math.round((scenarioIndex / config.scenarios.length) * 100) : 0,
            estimatedMinutes: 15,
            onAction: () => setActivePhase('SCENARIOS'),
        },
        {
            id: 'VALUES',
            title: 'Values Alignment',
            description: 'Explore trade-offs framed for your domain.',
            icon: <Scale className="w-5 h-5" />,
            status: checkStatus('VALUES'),
            type: 'LEARNING',
            progress: completedModules.includes('VALUES') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('VALUES'),
        },
        {
            id: 'COMM_NORMS',
            title: 'Communication Norms',
            description: 'How to communicate in your team\'s context.',
            icon: <MessageSquare className="w-5 h-5" />,
            status: checkStatus('COMM_NORMS'),
            type: 'LEARNING',
            progress: completedModules.includes('COMM_NORMS') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('COMM_NORMS'),
        },
        {
            id: 'MEETINGS',
            title: 'Team Meetings',
            description: 'Add your team\'s recurring meetings to your calendar.',
            icon: <Calendar className="w-5 h-5" />,
            status: checkStatus('MEETINGS'),
            type: 'ACTION',
            progress: completedModules.includes('MEETINGS') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('MEETINGS'),
        },
        {
            id: 'QUIZ',
            title: 'Culture Quiz',
            description: 'Test your knowledge — gamified, badge on completion!',
            icon: <Trophy className="w-5 h-5" />,
            status: checkStatus('QUIZ'),
            type: 'ACTION',
            progress: completedModules.includes('QUIZ') ? 100 : quizIndex > 0 ? Math.round((quizIndex / CULTURE_QUIZ_QUESTIONS.length) * 100) : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('QUIZ'),
        },
        {
            id: 'COHORT',
            title: 'New Hires Cohort',
            description: 'Connect with other people who started this week.',
            icon: <Users className="w-5 h-5" />,
            status: checkStatus('COHORT'),
            type: 'CONNECT',
            progress: completedModules.includes('COHORT') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('COHORT'),
        },
        {
            id: 'EOD_CHECKIN',
            title: 'End-of-Day Check-in',
            description: 'How connected do you feel?',
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
                    <ArrowLeft className="w-4 h-4" /> Back to Day 4
                </button>

                {activePhase === 'KEY_PEOPLE' && (
                    <PhaseCard title="Your Key People" icon={<UserCircle2 className="w-6 h-6 text-emerald-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">These are the 5 most important people for you to connect with as a {config.jobTitle}:</p>
                        <div className="space-y-3">
                            {config.keyPeople.map((p, i) => (
                                <KeyPersonCard key={i} person={p} index={i} />
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('KEY_PEOPLE')} label="I've sent my intros" />
                    </PhaseCard>
                )}

                {activePhase === 'ORG_CHART' && (
                    <PhaseCard title="Org Chart" icon={<Network className="w-6 h-6 text-blue-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Your place in the organization:</p>
                        <div className="space-y-3">
                            {[
                                { circle: 'Inner Circle', desc: 'Your immediate team — interact daily', people: config.keyPeople.slice(0, 2).map(p => p.name) },
                                { circle: 'Middle Circle', desc: 'Close collaborators — interact weekly', people: config.keyPeople.slice(2, 4).map(p => p.name) },
                                { circle: 'Outer Circle', desc: 'Cross-functional partners — interact as needed', people: config.keyPeople.slice(4).map(p => p.name) },
                            ].map((c, i) => (
                                <div key={i} className={`p-4 rounded-xl border ${i === 0 ? 'bg-emerald-50 border-emerald-200' : i === 1 ? 'bg-blue-50 border-blue-100' : 'bg-neutral-50 border-neutral-100'}`}>
                                    <p className="text-sm font-bold text-neutral-900 mb-1">{c.circle}</p>
                                    <p className="text-xs text-neutral-500 mb-2">{c.desc}</p>
                                    <p className="text-xs text-neutral-700">{c.people.join(', ') || 'Various cross-team partners'}</p>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('ORG_CHART')} />
                    </PhaseCard>
                )}

                {activePhase === 'SCENARIOS' && (
                    <PhaseCard title="Practice Scenarios" icon={<Drama className="w-6 h-6 text-orange-500" />}>
                        {scenarioIndex < config.scenarios.length ? (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Scenario {scenarioIndex + 1} of {config.scenarios.length}</span>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 mb-4">
                                    <p className="text-sm text-orange-800 font-medium">{config.scenarios[scenarioIndex].situation}</p>
                                </div>
                                <div className="space-y-2">
                                    {config.scenarios[scenarioIndex].choices.map((c, ci) => (
                                        <button
                                            key={ci}
                                            onClick={() => setSelectedChoice(ci)}
                                            className={`w-full text-left p-3 rounded-xl border transition-all ${selectedChoice === ci
                                                ? c.isRight
                                                    ? 'bg-green-50 border-green-300'
                                                    : 'bg-red-50 border-red-300'
                                                : 'bg-neutral-50 border-neutral-100 hover:bg-neutral-100'
                                                }`}
                                        >
                                            <p className="text-sm text-neutral-800">{c.text}</p>
                                            {selectedChoice === ci && (
                                                <p className={`text-xs mt-2 ${c.isRight ? 'text-green-700' : 'text-red-700'}`}>
                                                    {c.isRight ? '✅ ' : '❌ '}{c.feedback}
                                                </p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {selectedChoice !== null && (
                                    <button
                                        onClick={() => { setScenarioIndex(i => i + 1); setSelectedChoice(null); }}
                                        className="mt-4 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
                                    >
                                        {scenarioIndex < config.scenarios.length - 1 ? 'Next Scenario' : 'Finish Scenarios'} <ChevronRight className="w-4 h-4 inline ml-1" />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div>
                                <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-center mb-4">
                                    <p className="text-sm font-bold text-green-700">🎉 All scenarios complete!</p>
                                    <p className="text-xs text-green-600 mt-1">You've practiced handling real situations from your role.</p>
                                </div>
                                <CompleteButton onClick={() => markComplete('SCENARIOS')} />
                            </div>
                        )}
                    </PhaseCard>
                )}

                {activePhase === 'VALUES' && (
                    <PhaseCard title="Values Alignment" icon={<Scale className="w-6 h-6 text-purple-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Every role involves trade-offs. Where do you draw the line?</p>
                        <div className="space-y-4">
                            {config.valueTradeoffs.map((v, i) => (
                                <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="flex items-center justify-center gap-3 mb-3">
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">{v.left}</span>
                                        <span className="text-neutral-300 font-bold">vs</span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{v.right}</span>
                                    </div>
                                    <p className="text-xs text-neutral-600 text-center">{v.context}</p>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('VALUES')} label="I've reflected on these trade-offs" />
                    </PhaseCard>
                )}

                {activePhase === 'COMM_NORMS' && (
                    <PhaseCard title="Communication Norms" icon={<MessageSquare className="w-6 h-6 text-blue-500" />}>
                        <div className="space-y-3">
                            {config.commNorms.map((n, i) => (
                                <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-600 rounded-full">{n.channel}</span>
                                        <span className="text-xs text-neutral-500">{n.when}</span>
                                    </div>
                                    <p className="text-xs text-neutral-600">💡 {n.example}</p>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('COMM_NORMS')} />
                    </PhaseCard>
                )}

                {activePhase === 'MEETINGS' && (
                    <PhaseCard title="Team Meetings" icon={<Calendar className="w-6 h-6 text-green-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Add these recurring meetings to your calendar:</p>
                        <div className="space-y-2">
                            {config.meetings.map((m, i) => (
                                <MeetingItem key={i} meeting={m} />
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('MEETINGS')} label="Added to my calendar" />
                    </PhaseCard>
                )}

                {activePhase === 'QUIZ' && (
                    <PhaseCard title="Culture Quiz" icon={<Trophy className="w-6 h-6 text-amber-500" />}>
                        {quizIndex < CULTURE_QUIZ_QUESTIONS.length ? (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-bold text-neutral-400">Question {quizIndex + 1}/{CULTURE_QUIZ_QUESTIONS.length}</span>
                                    <span className="text-xs font-bold text-amber-600">Score: {quizScore}/{quizIndex}</span>
                                </div>
                                <p className="text-sm font-medium text-neutral-800 mb-4">{CULTURE_QUIZ_QUESTIONS[quizIndex].question}</p>
                                <div className="space-y-2">
                                    {CULTURE_QUIZ_QUESTIONS[quizIndex].options.map((opt, oi) => (
                                        <button
                                            key={oi}
                                            onClick={() => {
                                                if (quizAnswer !== null) return;
                                                setQuizAnswer(oi);
                                                if (oi === CULTURE_QUIZ_QUESTIONS[quizIndex].correctIndex) {
                                                    setQuizScore(s => s + 1);
                                                }
                                            }}
                                            className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${quizAnswer === null
                                                ? 'bg-neutral-50 border-neutral-100 hover:bg-neutral-100'
                                                : oi === CULTURE_QUIZ_QUESTIONS[quizIndex].correctIndex
                                                    ? 'bg-green-50 border-green-300'
                                                    : quizAnswer === oi
                                                        ? 'bg-red-50 border-red-300'
                                                        : 'bg-neutral-50 border-neutral-100 opacity-50'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                                {quizAnswer !== null && (
                                    <button
                                        onClick={() => { setQuizIndex(i => i + 1); setQuizAnswer(null); }}
                                        className="mt-4 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
                                    >
                                        {quizIndex < CULTURE_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'} <ChevronRight className="w-4 h-4 inline ml-1" />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                                    <Trophy className="w-10 h-10 text-amber-600" />
                                </div>
                                <p className="text-lg font-black text-neutral-900 mb-1">Quiz Complete!</p>
                                <p className="text-sm text-neutral-500 mb-4">You scored {quizScore}/{CULTURE_QUIZ_QUESTIONS.length}</p>
                                {quizScore >= Math.ceil(CULTURE_QUIZ_QUESTIONS.length * 0.6) ? (
                                    <div className="p-3 bg-green-50 rounded-xl border border-green-200 mb-4">
                                        <p className="text-xs font-bold text-green-700">🏆 Culture Champion Badge Earned!</p>
                                    </div>
                                ) : (
                                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 mb-4">
                                        <p className="text-xs font-bold text-amber-700">Keep learning! You'll absorb the culture naturally over the coming weeks.</p>
                                    </div>
                                )}
                                <CompleteButton onClick={() => markComplete('QUIZ')} />
                            </div>
                        )}
                    </PhaseCard>
                )}

                {activePhase === 'COHORT' && (
                    <PhaseCard title="New Hires Cohort" icon={<Users className="w-6 h-6 text-purple-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">These people also started this week:</p>
                        <div className="space-y-2 mb-4">
                            {[
                                { name: 'Jordan Smith', role: 'Product Designer', dept: 'Design' },
                                { name: 'Aisha Patel', role: 'Data Analyst', dept: 'Analytics' },
                                { name: 'Ryan Kim', role: 'Account Executive', dept: 'Sales' },
                            ].map((p, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                                        <span className="text-xs font-black text-purple-600">{p.name.split(' ').map(n => n[0]).join('')}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900">{p.name}</p>
                                        <p className="text-xs text-neutral-500">{p.role} — {p.dept}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                            <p className="text-xs font-bold text-purple-700 mb-1">💬 Join the Cohort Channel</p>
                            <p className="text-xs text-purple-600">#new-hires-feb-2026 — share experiences, ask questions, build connections.</p>
                        </div>
                        <CompleteButton onClick={() => markComplete('COHORT')} label="I've joined the cohort" />
                    </PhaseCard>
                )}

                {activePhase === 'EOD_CHECKIN' && (
                    <PhaseCard title="End-of-Day Check-in" icon={<CheckCircle2 className="w-6 h-6 text-amber-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Day 4 done! You've built your network and experienced the culture first-hand. 🌟</p>
                        <div className="space-y-3 mb-4">
                            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                                <p className="text-xs font-bold text-green-700">✅ {completedModules.length} of 9 modules complete</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-blue-700">📋 Tomorrow — The Grand Finale!</p>
                                <p className="text-xs text-blue-600">Day 5: Set your 30/60/90 goals, get manager sign-off, and officially graduate!</p>
                            </div>
                        </div>
                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                            <p className="text-xs font-bold text-neutral-700 mb-2">How connected do you feel to the team?</p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <button key={n} className="flex-1 py-2 text-sm font-bold bg-white border border-neutral-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                                        {'⭐'.repeat(n)}
                                    </button>
                                ))}
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
                <h2 className="text-lg font-black text-neutral-900">Day 4 — Build Your Network</h2>
                <p className="text-sm text-neutral-500">Learn how we work together — through doing, not reading.</p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700" style={{ width: `${(completedModules.length / 9) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-neutral-400">{completedModules.length}/9</span>
                </div>
            </div>
            <OnboardingFeed cards={feedCards} />
        </div>
    );
};

const KeyPersonCard: React.FC<{ person: { name: string; title: string; why: string; intro: string }; index: number }> = ({ person, index }) => {
    const [sent, setSent] = useState(false);
    const colors = ['bg-red-100 text-red-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-amber-100 text-amber-600'];
    return (
        <div className={`p-4 rounded-xl border transition-all ${sent ? 'bg-green-50 border-green-200' : 'bg-neutral-50 border-neutral-100'}`}>
            <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[index % 5]}`}>
                    <span className="text-xs font-black">{person.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-neutral-900">{person.name}</p>
                    <p className="text-xs text-neutral-500">{person.title}</p>
                    <p className="text-xs text-neutral-600 mt-1">💡 {person.why}</p>
                </div>
            </div>
            <div className="bg-white/80 rounded-lg p-3 text-xs text-neutral-500 italic border border-neutral-100">
                "{person.intro}"
            </div>
            <button
                onClick={() => setSent(true)}
                className={`mt-2 w-full py-2 text-xs font-bold rounded-lg transition-all ${sent
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98]'
                    }`}
            >
                {sent ? '✓ Intro Sent' : 'Send Intro'} {!sent && <Send className="w-3 h-3 inline ml-1" />}
            </button>
        </div>
    );
};

const MeetingItem: React.FC<{ meeting: { name: string; frequency: string; what: string } }> = ({ meeting }) => {
    const [added, setAdded] = useState(false);
    return (
        <div className={`p-3 rounded-xl border transition-all ${added ? 'bg-green-50 border-green-200' : 'bg-neutral-50 border-neutral-100'}`}>
            <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-neutral-900">{meeting.name}</p>
                <button
                    onClick={() => setAdded(true)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${added ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        }`}
                >
                    {added ? '✓ Added' : '+ Add'}
                </button>
            </div>
            <p className="text-xs text-neutral-500">{meeting.frequency}</p>
            <p className="text-xs text-neutral-400 mt-1">{meeting.what}</p>
        </div>
    );
};

export default Day4BuildNetwork;
