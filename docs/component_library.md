# Component Library

## Design Philosophy
Our UI follows a clean, "Glassmorphism-lite" aesthetic, emphasizing readability and subtle interactions.

## Core Components
### Buttons
-   `.btn-primary`: Main call-to-action (Brand Red).
-   `.btn-secondary`: Outline style (White with Red border).
-   `.btn-ghost`: Minimal (Transparent background).
-   `.btn-destructive`: Warning/Danger actions (Red error styling).

### Cards
-   `.card`: Base container with shadow and border-radius.
-   `DailyCard`: Specialized card for the Dashboard feed, supporting slots (Context, Domain, Skill, Simulator).

### Typography
-   `h1, h2, h3`: Bold headings (`700` weight).
-   `.text-body`: Standard body text (`1rem`).
-   `.text-label`: Small uppercase labels (`10px`).

## Interactive Elements
### Daily Feed Cards (`Daily3Feed.tsx`)
Features a 3D flip animation for context discovery.
-   **Front**: Title, Description, Action Button.
-   **Back**: Explainer (Why this card appeared), Source, Relevance Score.

### Onboarding Modules (`DayX` Components)
Interactive modules with "Mark Complete" functionality.
-   **Status Indicators**: Badge/Icon for "Pass", "Checking", or "Action Required".
