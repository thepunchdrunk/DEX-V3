import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import {
    Briefcase,
    Globe,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Code2,
    Terminal,
    HeartHandshake
} from 'lucide-react';

interface RoleSelectionScreenProps {
    onSelectRole: (roleData: Partial<UserProfile>) => void;
}

const ROLES = [
    {
        id: 'sr-eng',
        title: 'Senior Engineer',
        department: 'Engineering',
        roleCategory: 'DESK',
        role: 'EMPLOYEE',
        icon: Terminal,
        secondaryIcon: Code2,
        description: 'Architect scalable systems and drive technical excellence.',
        highlight: 'System Architecture',
        gradient: 'from-orange-50 to-red-50',
        accentColor: 'text-red-600',
        delay: 'delay-100'
    },
    {
        id: 'remote-eng',
        title: 'Cloud Architect',
        department: 'Engineering',
        roleCategory: 'REMOTE',
        role: 'EMPLOYEE',
        icon: Globe,
        secondaryIcon: Briefcase,
        description: 'Design distributed infrastructure for a global workforce.',
        highlight: 'Cloud Stack',
        gradient: 'from-blue-50 to-indigo-50',
        accentColor: 'text-indigo-600',
        delay: 'delay-200'
    },
    {
        id: 'customer-success',
        title: 'Customer Success',
        department: 'Sales',
        roleCategory: 'REMOTE',
        role: 'EMPLOYEE',
        icon: HeartHandshake,
        secondaryIcon: Sparkles,
        description: 'Champion client goals and ensure extraordinary outcomes.',
        highlight: 'Client Discovery',
        gradient: 'from-emerald-50 to-teal-50',
        accentColor: 'text-emerald-600',
        delay: 'delay-300'
    },
] as const;

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (role: typeof ROLES[number]) => {
        setSelectedId(role.id);
        // Add a slight delay for the selection animation to play before transitioning
        setTimeout(() => {
            onSelectRole({
                jobTitle: role.title,
                department: role.department,
                roleCategory: role.roleCategory as UserProfile['roleCategory'],
                role: role.role as UserProfile['role'],
            });
        }, 600);
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-red-500/5 blur-[100px] animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-indigo-500/5 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">

                {/* Header Section */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-xs font-bold text-neutral-500 tracking-widest uppercase mb-6">
                        Welcome to DEX V3
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-black text-neutral-900 mb-6 tracking-tight">
                        Choose Your <span className="text-gradient-red">Path</span>
                    </h1>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Select a role to initialize your personalized workspace. <br className="hidden md:block" />
                        Your journey will be tailored to your specific objectives.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
                    {ROLES.map((role) => {
                        const isSelected = selectedId === role.id;
                        const isOtherSelected = selectedId !== null && !isSelected;

                        return (
                            <button
                                key={role.id}
                                onClick={() => handleSelect(role)}
                                disabled={selectedId !== null}
                                className={`
                                    card-premium group relative p-8 h-[420px] flex flex-col text-left
                                    hover:border-neutral-300 outline-none focus-visible:ring-4 focus-visible:ring-red-500/20
                                    ${role.delay} animate-fade-in-up
                                    ${isSelected ? 'ring-4 ring-brand-red scale-[1.02] shadow-xl z-20' : ''}
                                    ${isOtherSelected ? 'opacity-50 scale-95 blur-[1px]' : ''}
                                `}
                            >
                                {/* Hover Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Iconography */}
                                <div className="relative z-10 mb-8 flex justify-between items-start">
                                    <div className={`
                                        w-16 h-16 rounded-2xl bg-white shadow-sm border border-neutral-100 
                                        flex items-center justify-center
                                        group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-300
                                    `}>
                                        <role.icon className={`w-8 h-8 ${role.accentColor}`} />
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <role.secondaryIcon className="w-24 h-24 text-neutral-900/5 absolute -top-4 -right-4 rotate-12" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-brand-red transition-colors">
                                        {role.title}
                                    </h3>
                                    <p className="text-neutral-500 leading-relaxed mb-6 flex-1">
                                        {role.description}
                                    </p>

                                    {/* Meta Badge */}
                                    <div className="mb-6">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-sm border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-600">
                                            <Sparkles className="w-3 h-3 text-brand-red" />
                                            {role.highlight}
                                        </span>
                                    </div>

                                    {/* Action Area */}
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-100 group-hover:border-neutral-200/50 transition-colors">
                                        <span className="text-sm font-semibold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                                            Initialize
                                        </span>
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center
                                            bg-neutral-100 text-neutral-400
                                            group-hover:bg-brand-red group-hover:text-white
                                            transition-all duration-300 shadow-sm
                                            group-hover:scale-110 group-hover:shadow-glow-red
                                        `}>
                                            {isSelected ? (
                                                <CheckCircle2 className="w-5 h-5 animate-scale-in" />
                                            ) : (
                                                <ArrowRight className="w-5 h-5" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-16 text-center animate-fade-in delay-500">
                    <p className="text-neutral-400 text-sm">
                        Pressed for time? <span className="text-neutral-900 font-medium cursor-pointer hover:underline">Auto-assign role</span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default RoleSelectionScreen;
