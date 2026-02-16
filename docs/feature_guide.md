# Feature Guide

## 1. Onboarding Journey (The First 5 Days)
The onboarding experience is a structured 5-day program designed to unlock features progressively.

### Day 1: Essentials ("System Check")
-   **Goal**: Ensure hardware, software, and access are ready.
-   **Key Component**: `Day1LifeWorkSetup.tsx`
-   **Modules**: Laptop Verification, Email Activation, Slack Access.

### Day 2: Culture
-   **Goal**: Communicate company values and unwritten rules.
-   **Key Component**: `Day2Culture.tsx`
-   **Interactive**: Scenarios (What would you do?) with feedback.

### Day 3: Tools & Skills
-   **Goal**: Introduce the Skill Tree and core toolset.
-   **Key Component**: `Day3SkillTree.tsx`

### Day 4: Network
-   **Goal**: Identify critical partners and connections.
-   **Key Component**: `Day4Network.tsx`

### Day 5: Launch
-   **Goal**: Final verification and graduation to the main dashboard.
-   **Key Component**: `Day5Launch.tsx`

---

## 2. Daily Dashboard
After completing onboarding, the user lands on the Role Dashboard.

### The "Daily 3" Feed
A curated list of 3 high-priority items refreshed daily.
-   **Key Update**: Internal company news or critical metrics.
-   **Market Insight**: External industry trends or competitor moves.
-   **Quick Tip**: A micro-learning opportunity or productivity hack.

### Interactive Features
-   **Streak Counter**: Tracks consecutive login days.
-   **Progress Ring**: Daily completion visualizer.
-   **Simulator Challenge**: Weekly (Wednesday) interactive scenario.

## 3. Profile & Settings
Managed in `RoleDashboard.tsx`.
-   **Role Badge**: Displays "Office Based", "Remote", etc.
-   **Danger Zone**: Option to reset all progress (LocalStorage clear).
