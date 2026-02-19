import React, { useState } from 'react';
import {
    MapPin,
    Landmark,
    UserCheck,
    Monitor,
    Smartphone,
    Headphones,
    Map,
    Users,
    Coffee,
    Wallet,
    CheckCircle2,
    Clock,
    ChevronRight,
    ArrowLeft,
    Building2,
    Trophy,
    Star,
    BadgeCheck,
    Hash,
    Camera,
    Utensils,
} from 'lucide-react';
import { UserProfile } from '@/types';
import { getRoleIdFromProfile, getRoleConfig, UNIVERSAL_COMPANY_STORY } from '@/config/onboardingRoleConfigs';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';

interface Day1Props {
    user: UserProfile;
    onComplete: () => void;
}

type Phase =
    | 'ARRIVAL'
    | 'COMPANY_STORY'
    | 'MEET_MANAGER'
    | 'WORKSPACE'
    | 'DEVICES'
    | 'IT_CHANNELS'
    | 'TOUR'
    | 'MEET_TEAM'
    | 'LUNCH'
    | 'PAY_BENEFITS'
    | 'EOD_CHECKIN';

const Day1FirstDay: React.FC<Day1Props> = ({ user, onComplete }) => {
    const [completedModules, setCompletedModules] = useState<Phase[]>([]);
    const [activePhase, setActivePhase] = useState<Phase | null>(null);

    const roleId = getRoleIdFromProfile(user.jobTitle);
    const config = getRoleConfig(roleId);

    const markComplete = (phase: Phase) => {
        if (!completedModules.includes(phase)) {
            const updated = [...completedModules, phase];
            setCompletedModules(updated);
            if (updated.length >= 11) {
                setTimeout(onComplete, 1200);
            }
        }
        setActivePhase(null);
    };

    const checkStatus = (phase: Phase) =>
        completedModules.includes(phase) ? 'COMPLETED' : 'AVAILABLE';

    // --- Feed Cards ---
    const feedCards: OnboardingCard[] = [
        {
            id: 'ARRIVAL',
            title: 'Arrival & Check-in',
            description: 'Get your badge, welcome kit, and first-day instructions. Check the dress code.',
            icon: <MapPin className="w-5 h-5" />,
            status: checkStatus('ARRIVAL'),
            type: 'SETUP',
            progress: completedModules.includes('ARRIVAL') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('ARRIVAL'),
        },
        {
            id: 'COMPANY_STORY',
            title: 'Company Story',
            description: 'Our mission, products, milestones, and leadership team.',
            icon: <Landmark className="w-5 h-5" />,
            status: checkStatus('COMPANY_STORY'),
            type: 'LEARNING',
            progress: completedModules.includes('COMPANY_STORY') ? 100 : 0,
            estimatedMinutes: 8,
            onAction: () => setActivePhase('COMPANY_STORY'),
        },
        {
            id: 'MEET_MANAGER',
            title: 'Meet Your Manager',
            description: `${user.manager || 'Your manager'}'s welcome, week preview, and working style.`,
            icon: <UserCheck className="w-5 h-5" />,
            status: checkStatus('MEET_MANAGER'),
            type: 'CONNECT',
            progress: completedModules.includes('MEET_MANAGER') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('MEET_MANAGER'),
        },
        {
            id: 'WORKSPACE',
            title: 'Your Workspace',
            description: `Set up your ${config.workspace.label.toLowerCase()}.`,
            icon: <Monitor className="w-5 h-5" />,
            status: checkStatus('WORKSPACE'),
            type: 'SETUP',
            progress: completedModules.includes('WORKSPACE') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('WORKSPACE'),
        },
        {
            id: 'DEVICES',
            title: 'Devices & First Login',
            description: 'Set up your laptop, apps, Wi-Fi, email, and email signature.',
            icon: <Smartphone className="w-5 h-5" />,
            status: checkStatus('DEVICES'),
            type: 'SETUP',
            progress: completedModules.includes('DEVICES') ? 100 : 0,
            estimatedMinutes: 15,
            onAction: () => setActivePhase('DEVICES'),
        },
        {
            id: 'IT_CHANNELS',
            title: 'IT Help & Channels',
            description: 'Who to call when things break + channels to join.',
            icon: <Headphones className="w-5 h-5" />,
            status: checkStatus('IT_CHANNELS'),
            type: 'SETUP',
            progress: completedModules.includes('IT_CHANNELS') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('IT_CHANNELS'),
        },
        {
            id: 'TOUR',
            title: 'Tour',
            description: 'Kitchen, meeting rooms, exits, and role-specific areas.',
            icon: <Map className="w-5 h-5" />,
            status: checkStatus('TOUR'),
            type: 'ACTION',
            progress: completedModules.includes('TOUR') ? 100 : 0,
            estimatedMinutes: 15,
            onAction: () => setActivePhase('TOUR'),
        },
        {
            id: 'MEET_TEAM',
            title: 'Meet Your Team',
            description: 'Who\'s who, what they do, add contacts, and take your directory photo.',
            icon: <Users className="w-5 h-5" />,
            status: checkStatus('MEET_TEAM'),
            type: 'CONNECT',
            progress: completedModules.includes('MEET_TEAM') ? 100 : 0,
            estimatedMinutes: 15,
            onAction: () => setActivePhase('MEET_TEAM'),
        },
        {
            id: 'LUNCH',
            title: 'Lunch',
            description: 'Find the canteen, explore food options, and meet your lunch buddy.',
            icon: <Coffee className="w-5 h-5" />,
            status: checkStatus('LUNCH'),
            type: 'ACTION',
            progress: completedModules.includes('LUNCH') ? 100 : 0,
            estimatedMinutes: 45,
            onAction: () => setActivePhase('LUNCH'),
        },
        {
            id: 'PAY_BENEFITS',
            title: 'Pay & Benefits',
            description: 'Bank details, tax, and insurance paperwork.',
            icon: <Wallet className="w-5 h-5" />,
            status: checkStatus('PAY_BENEFITS'),
            type: 'SETUP',
            progress: completedModules.includes('PAY_BENEFITS') ? 100 : 0,
            estimatedMinutes: 10,
            onAction: () => setActivePhase('PAY_BENEFITS'),
        },
        {
            id: 'EOD_CHECKIN',
            title: 'End-of-Day Check-in',
            description: 'What went well? Any blockers? Preview of tomorrow.',
            icon: <CheckCircle2 className="w-5 h-5" />,
            status: checkStatus('EOD_CHECKIN'),
            type: 'REVIEW',
            progress: completedModules.includes('EOD_CHECKIN') ? 100 : 0,
            estimatedMinutes: 5,
            onAction: () => setActivePhase('EOD_CHECKIN'),
        },
    ];

    // --- Phase Views ---
    if (activePhase) {
        return (
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => setActivePhase(null)}
                    className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Day 1
                </button>

                {activePhase === 'ARRIVAL' && (
                    <PhaseCard title="Arrival & Check-in" icon={<MapPin className="w-6 h-6 text-red-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Welcome to your first day! Here's what to do right now:</p>
                        <ChecklistModule items={[
                            { label: 'Collect your employee badge from reception', done: false },
                            { label: 'Pick up your welcome kit', done: false },
                            { label: 'Dress code today: Business casual', done: false },
                            { label: 'Review your first-day schedule below', done: false },
                        ]} />
                        <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-xs font-bold text-blue-700 mb-1">👋 Your Day 1 Guide</p>
                            <p className="text-xs text-blue-600">Your buddy or day-1 guide will meet you at reception and help you navigate the building.</p>
                        </div>
                        <CompleteButton onClick={() => markComplete('ARRIVAL')} />
                    </PhaseCard>
                )}

                {activePhase === 'COMPANY_STORY' && (
                    <PhaseCard title="Company Story" icon={<Landmark className="w-6 h-6 text-purple-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Learn about where we came from and where we're going.</p>
                        <div className="mb-4">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Our Mission</h4>
                            <p className="text-sm text-neutral-800 font-medium">{UNIVERSAL_COMPANY_STORY.mission}</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Key Milestones</h4>
                            <div className="space-y-2">
                                {UNIVERSAL_COMPANY_STORY.milestones.map((m, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <span className="text-xs font-black text-red-500 w-10 flex-shrink-0">{m.year}</span>
                                        <span className="text-xs text-neutral-700">{m.event}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Our Products</h4>
                            <div className="grid gap-2">
                                {UNIVERSAL_COMPANY_STORY.products.map((p, i) => (
                                    <div key={i} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                        <p className="text-sm font-bold text-neutral-900">{p.name}</p>
                                        <p className="text-xs text-neutral-500">{p.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Leadership Team</h4>
                            <div className="grid gap-2">
                                {UNIVERSAL_COMPANY_STORY.leaders.map((l, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                                            <span className="text-xs font-black text-red-600">{l.name.split(' ').map(n => n[0]).join('')}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-neutral-900">{l.name}</p>
                                            <p className="text-xs text-neutral-500">{l.title} — {l.focus}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('COMPANY_STORY')} />
                    </PhaseCard>
                )}

                {activePhase === 'MEET_MANAGER' && (
                    <PhaseCard title="Meet Your Manager" icon={<UserCheck className="w-6 h-6 text-emerald-500" />}>
                        <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center">
                                    <span className="text-lg font-black text-emerald-700">{(user.manager || 'M').charAt(0)}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-neutral-900">{user.manager || 'Your Manager'}</p>
                                    <p className="text-xs text-neutral-500">{config.department} Manager</p>
                                </div>
                            </div>
                            <div className="bg-white/70 rounded-lg p-3 text-sm text-neutral-700">
                                "Welcome to the team! I'm excited to have you join us. This week, I want you to focus on getting comfortable — meeting people, learning our tools, and understanding how we work. No pressure to deliver anything yet. Let's make this a great start."
                            </div>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">This Week's Preview</h4>
                            <div className="space-y-2 text-sm text-neutral-700">
                                <div className="flex items-center gap-2"><span className="font-bold text-red-500">Day 1:</span> Get settled, meet the team</div>
                                <div className="flex items-center gap-2"><span className="font-bold text-purple-500">Day 2:</span> Learn the rules & policies</div>
                                <div className="flex items-center gap-2"><span className="font-bold text-blue-500">Day 3:</span> Your role, tools, and first task</div>
                                <div className="flex items-center gap-2"><span className="font-bold text-emerald-500">Day 4:</span> Build your network & culture</div>
                                <div className="flex items-center gap-2"><span className="font-bold text-amber-500">Day 5:</span> Set goals & launch</div>
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('MEET_MANAGER')} />
                    </PhaseCard>
                )}

                {activePhase === 'WORKSPACE' && (
                    <PhaseCard title="Your Workspace" icon={<Monitor className="w-6 h-6 text-blue-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Set up your <strong>{config.workspace.label}</strong>:</p>
                        <ChecklistModule items={config.workspace.items.map(item => ({ label: item, done: false }))} />
                        <CompleteButton onClick={() => markComplete('WORKSPACE')} />
                    </PhaseCard>
                )}

                {activePhase === 'DEVICES' && (
                    <PhaseCard title="Devices & First Login" icon={<Smartphone className="w-6 h-6 text-blue-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Get these installed and configured:</p>
                        <ChecklistModule items={[
                            ...config.devices.map(d => ({ label: `Install & log into ${d}`, done: false })),
                            { label: 'Set up your email signature (template in your inbox)', done: false },
                            { label: 'Connect to office Wi-Fi', done: false },
                            { label: 'Test your webcam and microphone', done: false },
                        ]} />
                        <CompleteButton onClick={() => markComplete('DEVICES')} />
                    </PhaseCard>
                )}

                {activePhase === 'IT_CHANNELS' && (
                    <PhaseCard title="IT Help & Channels" icon={<Headphones className="w-6 h-6 text-blue-500" />}>
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 mb-4">
                            <p className="text-xs font-bold text-amber-700 mb-1">🛟 When Things Break</p>
                            <p className="text-xs text-amber-600">IT Help Desk: Slack <strong>#it-helpdesk</strong> or call x5555. P1 response: 30 minutes.</p>
                        </div>
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Join These Channels</h4>
                        <div className="space-y-2">
                            {config.channels.map((ch, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <Hash className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900">{ch.name}</p>
                                        <p className="text-xs text-neutral-500">{ch.purpose}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <CompleteButton onClick={() => markComplete('IT_CHANNELS')} />
                    </PhaseCard>
                )}

                {activePhase === 'TOUR' && (
                    <PhaseCard title="Office Tour" icon={<Map className="w-6 h-6 text-green-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Visit these key locations:</p>
                        <ChecklistModule items={[
                            { label: 'Kitchen & breakroom', done: false },
                            { label: 'Meeting rooms (how to book)', done: false },
                            { label: 'Emergency exits & assembly point', done: false },
                            { label: 'Restrooms', done: false },
                            { label: 'Print/copy station', done: false },
                            ...config.tourExtras.map(t => ({ label: `✨ ${t}`, done: false })),
                        ]} />
                        <CompleteButton onClick={() => markComplete('TOUR')} />
                    </PhaseCard>
                )}

                {activePhase === 'MEET_TEAM' && (
                    <PhaseCard title="Meet Your Team" icon={<Users className="w-6 h-6 text-purple-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Your {config.department} team:</p>
                        <div className="space-y-2 mb-4">
                            {config.keyPeople.slice(0, 3).map((p, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                                        <span className="text-xs font-black text-purple-600">{p.name.split(' ').map(n => n[0]).join('')}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900">{p.name}</p>
                                        <p className="text-xs text-neutral-500">{p.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Camera className="w-4 h-4 text-blue-500" />
                                <p className="text-xs font-bold text-blue-700">Directory Photo</p>
                            </div>
                            <p className="text-xs text-blue-600">Don't forget to take your company directory photo! Ask your buddy or visit the designated photo spot.</p>
                        </div>
                        <CompleteButton onClick={() => markComplete('MEET_TEAM')} />
                    </PhaseCard>
                )}

                {activePhase === 'LUNCH' && (
                    <PhaseCard title="Lunch" icon={<Utensils className="w-6 h-6 text-orange-500" />}>
                        <div className="space-y-3">
                            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                                <p className="text-xs font-bold text-orange-700 mb-1">🍽️ Canteen Info</p>
                                <p className="text-xs text-orange-600">Free lunch available in the 2nd floor canteen, 12–2 PM daily. Vegetarian, vegan, and allergy-friendly options available.</p>
                            </div>
                            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                <p className="text-xs font-bold text-neutral-700 mb-1">Today's Lunch Buddy</p>
                                <p className="text-xs text-neutral-600">Your buddy will meet you at your desk at noon to walk you to the canteen. It's a great chance to ask informal questions!</p>
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('LUNCH')} />
                    </PhaseCard>
                )}

                {activePhase === 'PAY_BENEFITS' && (
                    <PhaseCard title="Pay & Benefits" icon={<Wallet className="w-6 h-6 text-green-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Complete these essential paperwork items:</p>
                        <ChecklistModule items={[
                            { label: 'Verify bank account details for payroll', done: false },
                            { label: 'Submit tax declaration form (W-4 / equivalent)', done: false },
                            { label: 'Review health insurance options', done: false },
                            { label: 'Set up emergency contact information', done: false },
                            { label: 'Sign employment agreement (if not done pre-boarding)', done: false },
                        ]} />
                        <CompleteButton onClick={() => markComplete('PAY_BENEFITS')} />
                    </PhaseCard>
                )}

                {activePhase === 'EOD_CHECKIN' && (
                    <PhaseCard title="End-of-Day Check-in" icon={<CheckCircle2 className="w-6 h-6 text-amber-500" />}>
                        <p className="text-sm text-neutral-600 mb-4">Congratulations on completing your first day! 🎉</p>
                        <div className="space-y-3 mb-4">
                            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                                <p className="text-xs font-bold text-green-700">✅ Completed Today</p>
                                <p className="text-xs text-green-600">{completedModules.length} of 11 modules complete</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-blue-700">📋 Tomorrow's Preview</p>
                                <p className="text-xs text-blue-600">Day 2: Know the Rules — You'll learn about company policies, compliance, IT security, and benefits.</p>
                            </div>
                        </div>
                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                            <p className="text-xs font-bold text-neutral-700 mb-2">Quick Reflection</p>
                            <p className="text-xs text-neutral-500 mb-2">How are you feeling about your first day?</p>
                            <div className="flex gap-2">
                                {['😊 Great!', '😌 Good', '😐 Okay', '😟 Overwhelmed'].map((mood, i) => (
                                    <button key={i} className="px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
                                        {mood}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <CompleteButton onClick={() => markComplete('EOD_CHECKIN')} />
                    </PhaseCard>
                )}
            </div>
        );
    }

    // --- Feed View ---
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg font-black text-neutral-900">Day 1 — Your First Day</h2>
                <p className="text-sm text-neutral-500">You've just arrived. Let's get you settled.</p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-700"
                            style={{ width: `${(completedModules.length / 11) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs font-bold text-neutral-400">{completedModules.length}/11</span>
                </div>
            </div>
            <OnboardingFeed cards={feedCards} />
        </div>
    );
};

// --- Shared Components ---

const PhaseCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center">{icon}</div>
            <h3 className="text-lg font-black text-neutral-900">{title}</h3>
        </div>
        {children}
    </div>
);

const ChecklistModule: React.FC<{ items: { label: string; done: boolean }[] }> = ({ items: initialItems }) => {
    const [items, setItems] = useState(initialItems);
    const toggle = (i: number) => {
        const updated = [...items];
        updated[i] = { ...updated[i], done: !updated[i].done };
        setItems(updated);
    };
    return (
        <div className="space-y-2">
            {items.map((item, i) => (
                <button
                    key={i}
                    onClick={() => toggle(i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${item.done
                            ? 'bg-green-50 border-green-200 opacity-70'
                            : 'bg-neutral-50 border-neutral-100 hover:bg-neutral-100'
                        }`}
                >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${item.done ? 'border-green-500 bg-green-500' : 'border-neutral-300'
                        }`}>
                        {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm ${item.done ? 'line-through text-neutral-400' : 'text-neutral-700'}`}>{item.label}</span>
                </button>
            ))}
        </div>
    );
};

const CompleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="mt-6 w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all active:scale-[0.98]"
    >
        Mark Complete <ChevronRight className="w-4 h-4 inline ml-1" />
    </button>
);

export default Day1FirstDay;
