import React, { useState } from 'react';
import {
    Monitor,
    BookOpen,
    FileText,
    Shield,
    Lock,
    AlertTriangle,
    Heart,
    Gift,
    CheckCircle2,
    ChevronRight,
    ArrowLeft,
    Scale,
    Eye,
    Siren,
    Stethoscope,
    GraduationCap,
} from 'lucide-react';
import { UserProfile } from '@/types';
import {
    getRoleIdFromProfile,
    getRoleConfig,
    UNIVERSAL_POLICIES,
    UNIVERSAL_CONDUCT,
    UNIVERSAL_IT_SECURITY,
    UNIVERSAL_SAFETY,
    UNIVERSAL_BENEFITS,
    UNIVERSAL_HANDBOOK,
} from '@/config/onboardingRoleConfigs';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';

interface Day2Props {
    user: UserProfile;
    onComplete: () => void;
}

type Phase =
    | 'HR_SYSTEMS'
    | 'HANDBOOK'
    | 'POLICIES'
    | 'CONDUCT'
    | 'IT_SECURITY'
    | 'SAFETY'
    | 'BENEFITS'
    | 'EOD_CHECKIN';

const Day2KnowTheRules: React.FC<Day2Props> = ({ user, onComplete }) => {
    const [completedModules, setCompletedModules] = useState<Phase[]>([]);
    const [activePhase, setActivePhase] = useState<Phase | null>(null);

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
            id: 'HR_SYSTEMS',
            title: 'HR Systems Tour',
            description: 'Learn the HRIS, time tracking, directory, and LMS.',
            icon: <Monitor className="w-5 h-5" />,
            status: checkStatus('HR_SYSTEMS'),
            type: 'SETUP',
            progress: completedModules.includes('HR_SYSTEMS') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('HR_SYSTEMS'),
        },
        {
            id: 'HANDBOOK',
            title: 'Employee Handbook',
            description: 'Digital handbook: leave, expenses, time-off, directory, knowledge base.',
            icon: <BookOpen className="w-5 h-5" />,
            status: checkStatus('HANDBOOK'),
            type: 'LEARNING',
            progress: completedModules.includes('HANDBOOK') ? 100 : 0,
            estimatedMinutes: 8,
            onAction: () => setActivePhase('HANDBOOK'),
        },
        {
            id: 'POLICIES',
            title: 'Company Policies',
            description: 'Leave, conduct, expenses, remote work, dress code + role-specific policies.',
            icon: <FileText className="w-5 h-5" />,
            status: checkStatus('POLICIES'),
            type: 'LEARNING',
            progress: completedModules.includes('POLICIES') ? 100 : 0,
            estimatedMinutes: 12,
            onAction: () => setActivePhase('POLICIES'),
        },
        {
            id: 'CONDUCT',
            title: 'Workplace Conduct',
            description: 'Harassment prevention, discrimination, whistleblower, conflict resolution.',
            icon: <Shield className="w-5 h-5" />,
            status: checkStatus('CONDUCT'),
            type: 'LEARNING',
            progress: completedModules.includes('CONDUCT') ? 100 : 0,
            estimatedMinutes: 15,
            onAction: () => setActivePhase('CONDUCT'),
        },
        {
            id: 'IT_SECURITY',
            title: 'Data & IT Security',
            description: 'Phishing, passwords, devices, and role-specific data handling.',
            icon: <Lock className="w-5 h-5" />,
            status: checkStatus('IT_SECURITY'),
            type: 'LEARNING',
            progress: completedModules.includes('IT_SECURITY') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('IT_SECURITY'),
        },
        {
            id: 'SAFETY',
            title: 'Safety & Emergency',
            description: 'Emergency procedures, first aid, ergonomics, mental health support.',
            icon: <AlertTriangle className="w-5 h-5" />,
            status: checkStatus('SAFETY'),
            type: 'LEARNING',
            progress: completedModules.includes('SAFETY') ? 100 : 0,
            estimatedMinutes: 8,
            onAction: () => setActivePhase('SAFETY'),
        },
        {
            id: 'BENEFITS',
            title: 'Benefits Deep-Dive',
            description: 'Health, retirement, wellness programs, ERGs, and perks.',
            icon: <Gift className="w-5 h-5" />,
            status: checkStatus('BENEFITS'),
            type: 'LEARNING',
            progress: completedModules.includes('BENEFITS') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('BENEFITS'),
        },
        {
            id: 'EOD_CHECKIN',
            title: 'End-of-Day Check-in',
            description: 'Questions about policies? Anything confusing? We\'re here.',
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
                    <ArrowLeft className="w-4 h-4" /> Back to Day 2
                </button>

                {activePhase === 'HR_SYSTEMS' && (
                    <PhaseCard title="HR Systems Tour" icon={<Monitor className="w-6 h-6 text-blue-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Here are the key systems you'll use regularly:</p>
                        <div className="space-y-3 mb-4">
                            {[
                                { name: 'HRIS Portal', desc: 'Your central hub for leave, expenses, profile, and payslips' },
                                { name: 'Time Tracking', desc: 'Log hours daily — deadline is end of each Friday' },
                                { name: 'People Directory', desc: 'Search for anyone in the company, see org chart' },
                                { name: 'Learning Management (LMS)', desc: 'Courses, certifications, and mandatory training' },
                            ].map((sys, i) => (
                                <div key={i} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <p className="text-sm font-bold text-neutral-900">{sys.name}</p>
                                    <p className="text-xs text-neutral-500">{sys.desc}</p>
                                </div>
                            ))}
                        </div>
                        {config.rolePolicies.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-blue-700 mb-1">🔧 For Your Role ({config.jobTitle})</p>
                                <p className="text-xs text-blue-600">You'll also use: {config.tools.map(t => t.name).join(', ')}</p>
                            </div>
                        )}
                        <CompleteButton onClick={() => markComplete('HR_SYSTEMS')} label="Done" />
                    </PhaseCard>
                )}

                {activePhase === 'HANDBOOK' && (
                    <PhaseCard title="Employee Handbook" icon={<BookOpen className="w-6 h-6 text-purple-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Your digital reference guide for everyday processes:</p>
                        <div className="space-y-2">
                            {UNIVERSAL_HANDBOOK.sections.map((s, i) => (
                                <div key={i} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <p className="text-sm font-bold text-neutral-900">{s.title}</p>
                                    <p className="text-xs text-neutral-500">{s.description}</p>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('HANDBOOK')} label="I've reviewed the handbook" />
                    </PhaseCard>
                )}

                {activePhase === 'POLICIES' && (
                    <PhaseCard title="Company Policies" icon={<FileText className="w-6 h-6 text-orange-500" />}>
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Universal Policies</h4>
                        <div className="space-y-2 mb-5">
                            {UNIVERSAL_POLICIES.map((p, i) => (
                                <PolicyItem key={i} title={p.title} description={p.description} category={p.category} />
                            ))}
                        </div>
                        {config.rolePolicies.length > 0 && (
                            <>
                                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">📋 {config.jobTitle}-Specific Policies</h4>
                                <div className="space-y-2">
                                    {config.rolePolicies.map((p, i) => (
                                        <PolicyItem key={i} title={p.title} description={p.description} category="Role" highlight />
                                    ))}
                                </div>
                            </>
                        )}
                        <CompleteButton onClick={() => markComplete('POLICIES')} label="I acknowledge all policies" />
                    </PhaseCard>
                )}

                {activePhase === 'CONDUCT' && (
                    <PhaseCard title="Workplace Conduct" icon={<Shield className="w-6 h-6 text-red-500" />}>
                        <div className="p-3 bg-red-50 rounded-xl border border-red-200 mb-4">
                            <p className="text-xs font-bold text-red-700">⚠️ Mandatory Training</p>
                            <p className="text-xs text-red-600">This section is required for all employees. Zero tolerance policy in effect.</p>
                        </div>
                        <div className="space-y-3">
                            {UNIVERSAL_CONDUCT.map((c, i) => (
                                <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Scale className="w-4 h-4 text-neutral-500" />
                                        <p className="text-sm font-bold text-neutral-900">{c.title}</p>
                                    </div>
                                    <p className="text-xs text-neutral-600">{c.description}</p>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('CONDUCT')} label="I acknowledge the conduct policies" />
                    </PhaseCard>
                )}

                {activePhase === 'IT_SECURITY' && (
                    <PhaseCard title="Data & IT Security" icon={<Lock className="w-6 h-6 text-blue-500" />}>
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">For Everyone</h4>
                        <div className="space-y-2 mb-5">
                            {UNIVERSAL_IT_SECURITY.map((s, i) => (
                                <div key={i} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <p className="text-sm font-bold text-neutral-900">{s.title}</p>
                                    <p className="text-xs text-neutral-500">{s.description}</p>
                                </div>
                            ))}
                        </div>
                        {config.dataHandling.length > 0 && (
                            <>
                                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">🔐 {config.jobTitle} Data Handling</h4>
                                <div className="space-y-2">
                                    {config.dataHandling.map((d, i) => (
                                        <div key={i} className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                            <p className="text-xs text-blue-700">{d}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <CompleteButton onClick={() => markComplete('IT_SECURITY')} label="I understand the security requirements" />
                    </PhaseCard>
                )}

                {activePhase === 'SAFETY' && (
                    <PhaseCard title="Safety & Emergency" icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}>
                        <div className="space-y-3">
                            {UNIVERSAL_SAFETY.map((s, i) => (
                                <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        {i === 0 && <Siren className="w-4 h-4 text-red-500" />}
                                        {i === 1 && <Heart className="w-4 h-4 text-pink-500" />}
                                        {i === 2 && <Monitor className="w-4 h-4 text-blue-500" />}
                                        {i === 3 && <Stethoscope className="w-4 h-4 text-green-500" />}
                                        <p className="text-sm font-bold text-neutral-900">{s.title}</p>
                                    </div>
                                    <p className="text-xs text-neutral-600">{s.description}</p>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('SAFETY')} label="I've reviewed all safety info" />
                    </PhaseCard>
                )}

                {activePhase === 'BENEFITS' && (
                    <PhaseCard title="Benefits Deep-Dive" icon={<Gift className="w-6 h-6 text-green-500" />}>
                        <div className="space-y-3">
                            {UNIVERSAL_BENEFITS.map((b, i) => (
                                <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <p className="text-sm font-bold text-neutral-900">{b.title}</p>
                                    <p className="text-xs text-neutral-600 mt-1">{b.description}</p>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('BENEFITS')} label="I've reviewed all benefits" />
                    </PhaseCard>
                )}

                {activePhase === 'EOD_CHECKIN' && (
                    <PhaseCard title="End-of-Day Check-in" icon={<CheckCircle2 className="w-6 h-6 text-amber-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Day 2 complete! You now understand the rules of the road. 🛣️</p>
                        <div className="space-y-3">
                            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                                <p className="text-xs font-bold text-green-700">✅ Completed Today</p>
                                <p className="text-xs text-green-600">{completedModules.length} of 8 modules complete — policies, conduct, security, benefits all covered.</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-blue-700">📋 Tomorrow's Preview</p>
                                <p className="text-xs text-blue-600">Day 3: Learn Your Role — Tools, first task, buddy, and real contributions in your actual role.</p>
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
                <h2 className="text-lg font-black text-neutral-900">Day 2 — Know the Rules</h2>
                <p className="text-sm text-neutral-500">Here's what every employee must know, plus the rules specific to your role.</p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-700" style={{ width: `${(completedModules.length / 8) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-neutral-400">{completedModules.length}/8</span>
                </div>
            </div>
            <OnboardingFeed cards={feedCards} />
        </div>
    );
};

// --- Shared ---

const PhaseCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center">{icon}</div>
            <h3 className="text-lg font-black text-neutral-900">{title}</h3>
        </div>
        {children}
    </div>
);

const PolicyItem: React.FC<{ title: string; description: string; category: string; highlight?: boolean }> = ({ title, description, category, highlight }) => (
    <div className={`p-3 rounded-xl border ${highlight ? 'bg-blue-50 border-blue-100' : 'bg-neutral-50 border-neutral-100'}`}>
        <div className="flex items-center justify-between mb-1">
            <p className={`text-sm font-bold ${highlight ? 'text-blue-900' : 'text-neutral-900'}`}>{title}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${highlight ? 'bg-blue-100 text-blue-600' : 'bg-neutral-100 text-neutral-500'}`}>{category}</span>
        </div>
        <p className={`text-xs ${highlight ? 'text-blue-700' : 'text-neutral-500'}`}>{description}</p>
    </div>
);

const CompleteButton: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Mark Complete' }) => (
    <button
        onClick={onClick}
        className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all active:scale-[0.98]"
    >
        {label} <ChevronRight className="w-4 h-4 inline ml-1" />
    </button>
);

export default Day2KnowTheRules;
