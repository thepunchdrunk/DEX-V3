import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { Rocket } from 'lucide-react';

interface GraduationCeremonyProps {
    user: UserProfile;
    onGraduate: () => void;
}

const GraduationCeremony: React.FC<GraduationCeremonyProps> = ({
    user,
    onGraduate,
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress bar over 1.5 seconds
        const duration = 1500;
        const interval = 30; // 50 items
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + step;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, interval);

        // Graduate after 1.8 seconds (giving a little buffer after 100%)
        const gradTimer = setTimeout(() => {
            onGraduate();
        }, 1800);

        return () => {
            clearInterval(timer);
            clearTimeout(gradTimer);
        };
    }, [onGraduate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] bg-brand-red/[0.04] animate-drift" style={{ top: '30%', left: '40%' }} />

            <div className="flex flex-col items-center max-w-sm w-full relative z-10 px-8 animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xl border border-neutral-100 flex items-center justify-center mb-6">
                    <Rocket className="w-8 h-8 text-brand-red animate-pulse" />
                </div>

                <h2 className="text-xl font-black text-neutral-900 mb-2 text-center">
                    Launching Workplace
                </h2>
                <p className="text-sm text-neutral-500 mb-8 text-center">
                    Preparing your personalized Workplace...
                </p>

                {/* Progress Bar Container */}
                <div className="w-full bg-neutral-200/60 rounded-full h-2 mb-2 overflow-hidden">
                    <div
                        className="bg-brand-red h-full rounded-full transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="w-full flex justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    <span>Initializing</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    );
};

export default GraduationCeremony;
