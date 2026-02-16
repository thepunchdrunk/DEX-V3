import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Daily3Feed from '../Daily3Feed';
import { DailyCard } from '@/types';

// Mock Lucide icons to avoid rendering issues in JSDOM (though usually fine)
vi.mock('lucide-react', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as any),
        // Add any specific mocks if needed, but default is usually OK with Vite
    };
});

// Mock Data
const mockCards: DailyCard[] = [
    {
        id: '1',
        slot: 'CONTEXT_ANCHOR',
        title: 'Test Context Card',
        description: 'Description 1',
        source: 'Company',
        sourceType: 'INTERNAL',
        timestamp: '2023-01-01',
        priority: 'HIGH',
        read: false,
        flagged: false
    },
    {
        id: '2',
        slot: 'DOMAIN_EDGE',
        title: 'Test Domain Card',
        description: 'Description 2',
        source: 'Market',
        sourceType: 'EXTERNAL',
        timestamp: '2023-01-01',
        priority: 'MEDIUM',
        read: false,
        flagged: false
    },
    {
        id: '3',
        slot: 'MICRO_SKILL',
        title: 'Test Skill Card',
        description: 'Description 3',
        source: 'Learning',
        sourceType: 'SYSTEM',
        timestamp: '2023-01-01',
        priority: 'LOW',
        read: false,
        flagged: false
    }
];

describe('Daily3Feed', () => {
    beforeEach(() => {
        // Set date to a Tuesday (Jan 3, 2023) to ensure default "Your Daily 3" greeting
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2023-01-03T10:00:00Z'));
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
    });

    it('renders the feed header with greeting', () => {
        render(
            <Daily3Feed 
                cards={mockCards} 
                onCardAction={() => {}} 
                onCardFlag={() => {}} 
                onMarkComplete={() => {}} 
                completedCards={[]}
            />
        );
        expect(screen.getByText(/Your Daily 3/i)).toBeInTheDocument();
        expect(screen.getByText(/5 Days/i)).toBeInTheDocument(); // Streak mock
    });

    it('renders three cards', () => {
        render(
            <Daily3Feed 
                cards={mockCards} 
                onCardAction={() => {}} 
                onCardFlag={() => {}} 
                onMarkComplete={() => {}} 
                completedCards={[]}
            />
        );
        expect(screen.getByText('Test Context Card')).toBeInTheDocument();
        expect(screen.getByText('Test Domain Card')).toBeInTheDocument();
        expect(screen.getByText('Test Skill Card')).toBeInTheDocument();
    });
});
