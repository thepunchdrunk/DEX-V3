import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Minus,
    Sparkles,
    BookOpen,
    ChevronRight,
    Target,
    Briefcase,
} from 'lucide-react';
import { CareerHorizonSignal, MarketTrend } from '@/types';
import { MOCK_CAREER_HORIZON } from '@/config/constants';

interface CareerHorizonProps {
    signal?: CareerHorizonSignal;
    onDismiss?: () => void;
    className?: string;
}

const CareerHorizon: React.FC<CareerHorizonProps> = ({
    signal: propSignal,
    onDismiss,
    className = ''
}) => {
    const signal = propSignal || MOCK_CAREER_HORIZON;

    const getTrendIcon = (direction: MarketTrend['direction']) => {
        switch (direction) {
            case 'RISING':
                return <TrendingUp className="w-4 h-4 text-[#4CAF50]" />;
            case 'DECLINING':
                return <TrendingDown className="w-4 h-4 text-[#D32F2F]" />;
            case 'STABLE':
                return <Minus className="w-4 h-4 text-[#9E9E9E]" />;
        }
    };

    const getTrendColor = (direction: MarketTrend['direction']) => {
        switch (direction) {
            case 'RISING':
                return 'text-[#4CAF50]';
            case 'DECLINING':
                return 'text-[#D32F2F]';
            case 'STABLE':
                return 'text-[#9E9E9E]';
        }
    };

    return (
        <div className={`${className}`}>
            {/* Main Content */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Header */}
                <div className="p-5 border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-black">Career Horizon</h2>
                            <p className="text-sm text-neutral-500">{signal.quarter} Market Signals</p>
                        </div>
                    </div>
                </div>

                {/* Your Skills */}
                <div className="p-5 border-b border-neutral-100">
                    <span className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Your Skills</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {signal.userSkills.map((skill) => (
                            <span
                                key={skill}
                                className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-medium border border-purple-200"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Market Trends */}
                <div className="p-5 border-b border-[#E0E0E0]">
                    <h4 className="text-sm font-medium text-[#616161] mb-3 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Market Demand Trends
                    </h4>
                    <div className="space-y-3">
                        {signal.marketTrends.map((trend) => (
                            <div
                                key={trend.skillName}
                                className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-neutral-200 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {getTrendIcon(trend.direction)}
                                    <span className="text-sm font-medium text-neutral-900">{trend.skillName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold ${getTrendColor(trend.direction)}`}>
                                        {trend.demandChange > 0 ? '+' : ''}{trend.demandChange}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Emerging Capabilities */}
                <div className="p-5 border-b border-[#E0E0E0]">
                    <h4 className="text-sm font-medium text-[#616161] mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Emerging Capabilities for Your Role
                    </h4>
                    <div className="space-y-3">
                        {signal.emergingCapabilities.map((cap) => (
                            <div
                                key={cap.name}
                                className="p-4 rounded-xl bg-purple-50 border border-purple-200"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-neutral-900">{cap.name}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 text-xs">
                                        {cap.relevanceToRole}% match
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-500 mb-3 leading-relaxed">{cap.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {cap.learningResources.map((resource) => (
                                        <span
                                            key={resource}
                                            className="px-2 py-0.5 rounded-full bg-neutral-50 text-neutral-500 text-xs flex items-center gap-1 border border-neutral-100"
                                        >
                                            <BookOpen className="w-3 h-3" />
                                            {resource}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Role Evolution Insights */}
                <div className="p-5">
                    <h4 className="text-sm font-bold text-neutral-500 mb-3">Role Evolution Insights</h4>
                    <ul className="space-y-2">
                        {signal.roleEvolutionInsights.map((insight, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-neutral-700"
                            >
                                <span className="text-purple-600 mt-0.5">•</span>
                                {insight}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-neutral-100 bg-neutral-50">
                    <button className="w-full py-3 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-red-500/15 hover:shadow-lg hover:shadow-red-500/20">
                        Explore Learning Paths
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CareerHorizon;
