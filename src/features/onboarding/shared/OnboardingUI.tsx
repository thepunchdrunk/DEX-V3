import React, { useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export const PhaseCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center">{icon}</div>
            <h3 className="text-lg font-black text-neutral-900">{title}</h3>
        </div>
        {children}
    </div>
);

export const CompleteButton: React.FC<{ onClick: () => void; label?: string; className?: string }> = ({ onClick, label = 'Mark Complete', className = '' }) => (
    <button
        onClick={onClick}
        className={`mt-6 w-full py-3 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-neutral-900/20 transition-all active:scale-[0.98] ${className}`}
    >
        {label} <ChevronRight className="w-4 h-4 inline ml-1" />
    </button>
);

export const ChecklistModule: React.FC<{ items: { label: string; done: boolean }[] }> = ({ items: initialItems }) => {
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
