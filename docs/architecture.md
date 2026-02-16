# DEX-V2 System Architecture

## Overview
DEX-V2 is a modern Employee Experience Platform designed to streamline onboarding and daily workflow management. It is built as a Single Page Application (SPA) using React and the Vite ecosystem.

## Tech Stack
-   **Framework**: React 18
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: Vanilla CSS (Variables + Utility Classes), Lucide React (Icons)
-   **Routing**: React Router DOM (Single Page Navigation)
-   **State Management**: React Context + Local State
-   **Testing**: Vitest (Unit), Playwright (E2E)

## Directory Structure
```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   ├── shared/      # Generic components (Buttons, Cards)
│   └── ...          # Domain-specific components
├── config/          # App-wide constants and configuration
├── features/        # Feature-based modules
│   ├── dashboard/   # Dashboard views and logic
│   ├── onboarding/  # Onboarding flow (Day 1-5)
│   └── ...
├── services/        # Business logic and API services
├── styles/          # Global styles and design system
├── types/           # TypeScript interfaces and types
├── App.tsx          # Main application component
└── main.tsx         # Entry point
```

## Key Concepts

### 1. Feature-Based Architecture
The application is organized by features (`dashboard`, `onboarding`) rather than technical layers. Each feature directory contains its own components, hooks, and specific logic.

### 2. Design System
Styles are centralized in `src/styles/design-system.css`. We use CSS variables for theming (colors, spacing, typography) to ensure consistency.
-   **Colors**: Semantic names (`--brand-red`, `--neutral-100`) rather than hex codes.
-   **Components**: Utility classes for common patterns (e.g., `.card`, `.btn-primary`).

### 3. Data Flow
-   **Mock Data**: Currently powered by static mock data in `src/config/constants.ts`.
-   **Services**: `cardSelectionEngine.ts` handles logic for displaying relevant cards based on user context.

## Onboarding Engine
The onboarding flow is state-driven, tracking the user's progress through 5 distinct "Days".
-   **State**: Managed via LocalStorage (persisted) and React State.
-   **Components**: `OnboardingShell` orchestrates the flow, rendering specific `DayX` components based on current progress.
