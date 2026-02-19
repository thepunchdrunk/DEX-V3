// ============================================================================
// ROLE-ADAPTIVE ONBOARDING CONFIGURATION
// Each role has specific content for Days 1–5 that adapts the experience
// ============================================================================

// --- Types ---

export interface RoleOnboardingConfig {
    jobTitle: string;
    department: string;
    roleCategory: 'DESK' | 'FRONTLINE' | 'REMOTE' | 'HYBRID';

    // Day 1
    workspace: { label: string; items: string[] };
    devices: string[];
    channels: { name: string; purpose: string }[];
    tourExtras: string[];

    // Day 2
    rolePolicies: { title: string; description: string }[];
    dataHandling: string[];

    // Day 3
    responsibilities: string[];
    kpis: { metric: string; target: string }[];
    tools: { name: string; purpose: string; setupInstructions: string }[];
    simulation: { title: string; description: string; steps: string[] };
    firstContributions: { title: string; description: string }[];
    tips: { title: string; shortcut: string }[];
    teamWorkflow: { process: string; current: string; rituals: string[] };

    // Day 4
    keyPeople: { name: string; title: string; why: string; intro: string }[];
    scenarios: { situation: string; choices: { text: string; isRight: boolean; feedback: string }[] }[];
    valueTradeoffs: { left: string; right: string; context: string }[];
    commNorms: { channel: string; when: string; example: string }[];
    meetings: { name: string; frequency: string; what: string }[];

    // Day 5
    goals30: string[];
    goals60: string[];
    goals90: string[];
    learningResources: { title: string; type: string; url: string }[];
}

// --- Configs ---

export const ROLE_CONFIGS: Record<string, RoleOnboardingConfig> = {
    'software-architect': {
        jobTitle: 'Software Architect',
        department: 'Engineering',
        roleCategory: 'DESK',

        // Day 1
        workspace: { label: 'Engineering Workstation', items: ['Dual monitors', 'Mechanical keyboard', 'Standing desk', 'Noise-cancelling headphones'] },
        devices: ['VS Code', 'Git', 'Docker Desktop', 'GitHub Actions', 'Slack', 'Jira'],
        channels: [
            { name: '#engineering', purpose: 'Team announcements & discussions' },
            { name: '#deployments', purpose: 'CI/CD pipeline notifications' },
            { name: '#architecture', purpose: 'RFC discussions & design reviews' },
            { name: '#incidents', purpose: 'On-call alerts & incident response' },
        ],
        tourExtras: ['Server room', 'CI/CD monitoring board', 'Standup area', 'Quiet focus pods'],

        // Day 2
        rolePolicies: [
            { title: 'Code Review Standards', description: 'All code must be reviewed by at least one peer before merging. Reviews focus on correctness, maintainability, and test coverage.' },
            { title: 'Open Source Policy', description: 'Contributing to open-source requires team lead approval. Never include proprietary code in external repositories.' },
            { title: 'IP Assignment', description: 'All code written during employment is company IP. Side projects must be pre-approved and documented.' },
            { title: 'On-Call Policy', description: 'Engineers rotate on-call duty weekly. Response SLA is 15 minutes for P1, 1 hour for P2.' },
        ],
        dataHandling: ['Source code access controls', 'Production database — read-only unless approved', 'Secrets management via Vault', 'Customer PII — never log or store locally'],

        // Day 3
        responsibilities: [
            'Design scalable, maintainable system architectures',
            'Lead architecture reviews and mentor engineers',
            'Drive technical decisions and document via RFCs',
            'Define engineering standards and best practices',
            'Participate in incident response and on-call rotation',
        ],
        kpis: [
            { metric: 'Code Review Turnaround', target: '< 4 hours' },
            { metric: 'PR Merge Rate', target: '> 90% within 48h' },
            { metric: 'Tech Debt Ratio', target: 'Reduce by 10% per quarter' },
            { metric: 'System Uptime', target: '99.9% SLA' },
        ],
        tools: [
            { name: 'VS Code', purpose: 'Primary IDE', setupInstructions: 'Install recommended extensions from team profile' },
            { name: 'GitHub', purpose: 'Version control & code review', setupInstructions: 'Clone team repos, configure SSH key' },
            { name: 'Jira', purpose: 'Sprint planning & task tracking', setupInstructions: 'Join your squad board, review current sprint' },
            { name: 'Docker', purpose: 'Local development environment', setupInstructions: 'Pull base images, run docker-compose up' },
            { name: 'Datadog', purpose: 'Monitoring & observability', setupInstructions: 'Set up dashboard for your services' },
        ],
        simulation: {
            title: 'Architecture Review',
            description: 'Review an architecture RFC for a new payment service. Identify 3 concerns and suggest alternatives.',
            steps: ['Read the RFC document', 'Identify scalability concerns', 'Flag security considerations', 'Suggest architectural alternatives', 'Submit your review comments'],
        },
        firstContributions: [
            { title: 'Attend Architecture Review', description: 'Join the weekly architecture review and observe the discussion format' },
            { title: 'Comment on an RFC', description: 'Leave constructive feedback on an open RFC in the team repo' },
            { title: 'Shadow a Deployment', description: 'Watch a senior engineer deploy to production and learn the process' },
        ],
        tips: [
            { title: 'Multi-cursor editing', shortcut: 'Ctrl+D to select next occurrence' },
            { title: 'Git log visualization', shortcut: 'git log --oneline --graph --all' },
            { title: 'Quick terminal toggle', shortcut: 'Ctrl+` to toggle integrated terminal' },
            { title: 'PR template', shortcut: 'Use the .github/pull_request_template.md' },
        ],
        teamWorkflow: {
            process: '2-week sprints with daily standups, sprint planning on Monday, retrospective on Friday',
            current: 'Currently building the payments microservice — migrating from monolith to event-driven architecture',
            rituals: ['Daily standup at 9:30 AM', 'Sprint planning every other Monday', 'Architecture review on Wednesday', 'Retro on Friday at 4 PM'],
        },

        // Day 4
        keyPeople: [
            { name: 'Alex Chen', title: 'VP of Engineering', why: 'Sets the technical direction and approves major architecture decisions', intro: 'Hi Alex, I just joined the engineering team as a Senior Engineer. Looking forward to learning how I can contribute to the platform architecture.' },
            { name: 'Priya Patel', title: 'Platform Lead', why: 'Owns the core infrastructure you\'ll build on', intro: 'Hi Priya, I\'m the new Senior Engineer. Would love to get a walkthrough of the platform architecture when you have time.' },
            { name: 'Marcus Johnson', title: 'DevOps Lead', why: 'Your go-to for deployment, CI/CD, and infrastructure questions', intro: 'Hi Marcus, I\'m new to the engineering team. Excited to learn about our deployment pipeline and monitoring setup.' },
            { name: 'Sofia Rodriguez', title: 'Product Owner', why: 'Defines what to build and prioritizes the backlog', intro: 'Hi Sofia, I just started as a Senior Engineer. Looking forward to collaborating on the product roadmap.' },
            { name: 'James Wong', title: 'Senior Architect', why: 'Your architecture peer and sounding board', intro: 'Hi James, I\'m the new Senior Engineer. Would love to grab coffee and discuss the current architecture landscape.' },
        ],
        scenarios: [
            {
                situation: 'The team wants to rewrite a legacy monolith into microservices. Product says there\'s no time for a complete rewrite. What do you recommend?',
                choices: [
                    { text: 'Push for a complete rewrite — technical debt is costing us more in the long run', isRight: false, feedback: 'While technically valid, this ignores business constraints and may create friction.' },
                    { text: 'Propose a strangler fig pattern — migrate incrementally while delivering features', isRight: true, feedback: 'This aligns with our value of pragmatic engineering — balancing technical excellence with delivery.' },
                    { text: 'Accept the status quo and just work around the monolith', isRight: false, feedback: 'This avoids the problem. We value proactive improvement, even if incremental.' },
                ],
            },
            {
                situation: 'A junior engineer\'s PR has 47 review comments. They seem overwhelmed. How do you handle it?',
                choices: [
                    { text: 'Add all your comments too — thoroughness is important', isRight: false, feedback: 'Piling on can be demoralizing. We value mentoring and psychological safety.' },
                    { text: 'Pair with them in person, prioritize the critical comments, and help resolve them together', isRight: true, feedback: 'This models our culture of mentorship and collaborative problem-solving.' },
                    { text: 'Approve it anyway to keep things moving', isRight: false, feedback: 'Quality matters. But there are better ways to balance speed and learning.' },
                ],
            },
        ],
        valueTradeoffs: [
            { left: 'Innovation', right: 'Stability', context: 'When should we experiment with new technologies vs. staying with proven solutions?' },
            { left: 'Speed', right: 'Correctness', context: 'When is "good enough" acceptable, and when do we need perfection?' },
            { left: 'Autonomy', right: 'Standards', context: 'How much freedom should individual engineers have vs. following team conventions?' },
        ],
        commNorms: [
            { channel: 'Slack', when: 'Quick questions, non-urgent updates, social', example: 'Use threads for discussions. @mention only when needed.' },
            { channel: 'GitHub', when: 'Code reviews, RFC discussions, technical decisions', example: 'Keep review comments constructive and specific.' },
            { channel: 'Meeting', when: 'Design discussions, sprint ceremonies, 1:1s', example: 'Always have an agenda. End with clear action items.' },
            { channel: 'Email', when: 'Cross-team communication, external stakeholders', example: 'Use for formal communications that need a paper trail.' },
        ],
        meetings: [
            { name: 'Daily Standup', frequency: 'Daily at 9:30 AM', what: 'Share what you did yesterday, what you\'re doing today, and any blockers' },
            { name: 'Architecture Review', frequency: 'Weekly on Wednesday', what: 'Review RFCs, discuss system design decisions' },
            { name: 'Sprint Planning', frequency: 'Bi-weekly on Monday', what: 'Plan the upcoming sprint, estimate stories, commit to deliverables' },
            { name: 'Retrospective', frequency: 'Bi-weekly on Friday', what: 'Reflect on what went well, what didn\'t, and what to improve' },
        ],

        // Day 5
        goals30: [
            'Understand the full system architecture and document your learnings',
            'Complete your first code review and get feedback on your review style',
            'Submit and merge your first pull request',
            'Participate in all sprint ceremonies consistently',
        ],
        goals60: [
            'Own a small subsystem or feature area',
            'Lead the design for a new feature (write an RFC)',
            'Mentor one junior engineer through a PR or design review',
            'Resolve your first production incident',
        ],
        goals90: [
            'Drive a cross-team architecture decision',
            'Measurably reduce tech debt in your owned area',
            'Present at an architecture review to the wider team',
            'Be fully autonomous in the on-call rotation',
        ],
        learningResources: [
            { title: 'System Design Primer', type: 'Reference', url: 'https://github.com/donnemartin/system-design-primer' },
            { title: 'Internal Architecture Wiki', type: 'Documentation', url: '/wiki/architecture' },
            { title: 'Engineering Book Club', type: 'Community', url: '#eng-book-club' },
            { title: 'Tech Talks Archive', type: 'Videos', url: '/learning/tech-talks' },
        ],
    },

    'ux-researcher': {
        jobTitle: 'UX Researcher',
        department: 'Design',
        roleCategory: 'DESK',

        workspace: { label: 'Design Studio Workstation', items: ['Drawing tablet (Wacom)', 'Large curved monitor', 'Whiteboard access', 'Usability lab access'] },
        devices: ['Figma', 'Miro', 'UserTesting', 'Dovetail', 'Lookback', 'Slack'],
        channels: [
            { name: '#design', purpose: 'Design team announcements & discussions' },
            { name: '#research-ops', purpose: 'Research operations, participant recruitment' },
            { name: '#ux-library', purpose: 'Shared research findings & pattern library' },
            { name: '#design-critique', purpose: 'Weekly design critique submissions' },
        ],
        tourExtras: ['Design studio', 'Usability lab (one-way mirror)', 'Critique wall', 'Inspiration library'],

        rolePolicies: [
            { title: 'Research Ethics', description: 'All research involving participants requires informed consent. Follow our Research Ethics Checklist before every study.' },
            { title: 'Participant Consent', description: 'Written consent required before any recording. Participants may withdraw at any time without consequence.' },
            { title: 'Data Retention', description: 'Raw research data (recordings, transcripts) retained for 12 months max. Anonymize all findings before sharing broadly.' },
            { title: 'Accessibility Standards', description: 'All design recommendations must consider WCAG 2.1 AA compliance. Flag accessibility risks in every research report.' },
        ],
        dataHandling: ['PII from research participants — anonymize in all reports', 'Consent forms — store securely in Research Ops vault', 'Session recordings — auto-delete after 12 months', 'Survey data — aggregate only, no individual identification'],

        responsibilities: [
            'Plan and execute user research studies (interviews, usability tests, surveys)',
            'Synthesize findings into actionable design recommendations',
            'Present insights to product teams and influence roadmap decisions',
            'Build and maintain the company research repository',
            'Champion user-centered design practices across the organization',
        ],
        kpis: [
            { metric: 'Studies per Quarter', target: '4-6 studies' },
            { metric: 'Insight Adoption Rate', target: '> 70% of recommendations acted on' },
            { metric: 'Time to Insight', target: '< 2 weeks from study to report' },
            { metric: 'NPS Lift', target: 'Measurable improvement in product NPS' },
        ],
        tools: [
            { name: 'Figma', purpose: 'Design review & annotation', setupInstructions: 'Accept team invite, install desktop app, review component library' },
            { name: 'Miro', purpose: 'Affinity mapping & synthesis', setupInstructions: 'Join team workspace, explore synthesis templates' },
            { name: 'UserTesting', purpose: 'Remote usability testing', setupInstructions: 'Set up account, review test templates, run a practice test' },
            { name: 'Dovetail', purpose: 'Research repository & analysis', setupInstructions: 'Import past studies, tag themes, explore existing insights' },
            { name: 'Lookback', purpose: 'Live user interview sessions', setupInstructions: 'Install extension, schedule a practice session' },
        ],
        simulation: {
            title: 'Usability Test Analysis',
            description: 'Watch a recorded usability test session. Identify 3 usability issues, rate their severity, and write recommendations.',
            steps: ['Watch the session recording carefully', 'Note moments of confusion, errors, and hesitation', 'Identify the 3 most critical usability issues', 'Rate severity (Critical / Major / Minor)', 'Write a recommendation for each issue'],
        },
        firstContributions: [
            { title: 'Attend Design Critique', description: 'Join the weekly design critique and observe how feedback is given and received' },
            { title: 'Review Research Repository', description: 'Explore existing studies in Dovetail — understand what\'s been researched and key themes' },
            { title: 'Shadow a User Interview', description: 'Observe a senior researcher conduct a live user interview via Lookback' },
        ],
        tips: [
            { title: 'Figma shortcuts', shortcut: 'Ctrl+Shift+E to export, K for scale tool, Shift+A for auto-layout' },
            { title: 'Interview scripts', shortcut: 'Use the #ux-library template channel for pre-built interview guides' },
            { title: 'Affinity mapping', shortcut: 'In Miro, use the clustering plugin for faster synthesis' },
            { title: 'Tagging in Dovetail', shortcut: 'Use consistent tags: #pain-point, #need, #behavior, #quote' },
        ],
        teamWorkflow: {
            process: 'Research sprints aligned with product cycles. Each study follows: Plan → Recruit → Conduct → Synthesize → Share',
            current: 'Currently running a foundational study on enterprise user onboarding — 15 interviews planned, 8 completed',
            rituals: ['Design critique every Tuesday at 11 AM', 'Research share-out bi-weekly on Thursday', 'Design sprint kick-offs as needed', 'Weekly UX sync with product on Wednesday'],
        },

        keyPeople: [
            { name: 'Elena Vasquez', title: 'Head of Design', why: 'Sets the design vision and approves major research initiatives', intro: 'Hi Elena, I just joined as a UX Researcher. Excited to contribute to our user-centered design practice.' },
            { name: 'Aisha Johnson', title: 'Research Ops Lead', why: 'Your partner for participant recruitment, scheduling, and research logistics', intro: 'Hi Aisha, I\'m the new UX Researcher. Looking forward to working with Research Ops on upcoming studies.' },
            { name: 'Daniel Kim', title: 'Lead Product Designer', why: 'Your closest design collaborator — translates your insights into design solutions', intro: 'Hi Daniel, I\'m new to the UX Research team. Would love to sync on how research feeds into the design process.' },
            { name: 'Priya Patel', title: 'Engineering Partner', why: 'The engineering counterpart who implements designs informed by your research', intro: 'Hi Priya, I just started as a UX Researcher. Would love to understand the eng team\'s perspective on research findings.' },
            { name: 'Maya Chen', title: 'Content Strategist', why: 'Collaborates on information architecture and content-related research', intro: 'Hi Maya, new UX Researcher here. Would love to connect on content strategy and how research supports IA decisions.' },
        ],
        scenarios: [
            {
                situation: 'A stakeholder wants to skip user research and go straight to design because "we already know what users want." How do you respond?',
                choices: [
                    { text: 'Agree and skip the research — they know the product better', isRight: false, feedback: 'Assumptions without validation lead to costly mistakes. Research is how we de-risk decisions.' },
                    { text: 'Propose a lightweight approach — run 5 quick interviews to validate assumptions before committing to design', isRight: true, feedback: 'This balances speed with rigor. Even a quick study can surface critical blind spots and save weeks of rework.' },
                    { text: 'Refuse to move forward without a full 6-week study', isRight: false, feedback: 'Being too rigid about process loses stakeholder trust. Adapt your methods to the timeline while maintaining quality.' },
                ],
            },
            {
                situation: 'Your research findings directly contradict the Product Manager\'s hypothesis about user needs. What do you do?',
                choices: [
                    { text: 'Present the data privately to the PM first, then collaborate on how to share with the wider team', isRight: true, feedback: 'This shows respect for the PM while ensuring the truth gets heard. Collaboration over confrontation.' },
                    { text: 'Water down the findings to avoid conflict', isRight: false, feedback: 'Integrity is paramount in research. Present the data honestly — that\'s why we do research.' },
                    { text: 'Present the contradicting findings in a public meeting without warning', isRight: false, feedback: 'Surprising stakeholders publicly creates defensiveness. Build alignment privately first.' },
                ],
            },
        ],
        valueTradeoffs: [
            { left: 'User Needs', right: 'Business Goals', context: 'When user research reveals needs that conflict with business priorities, how do we balance?' },
            { left: 'Speed', right: 'Rigor', context: 'When should we run a quick guerrilla test vs. a comprehensive multi-week study?' },
            { left: 'Qualitative', right: 'Quantitative', context: 'When should we rely on deep interviews vs. large-scale survey data?' },
        ],
        commNorms: [
            { channel: 'Slack', when: 'Quick updates, sharing interesting findings, study recruitment', example: 'Post key quotes in #ux-library. Use #research-ops for logistics.' },
            { channel: 'Dovetail', when: 'Sharing research findings, tagging insights, building the repository', example: 'Tag all findings by theme. Link to related studies for context.' },
            { channel: 'Figma', when: 'Annotating designs, leaving research-informed feedback', example: 'Use comment threads. Reference specific study findings when critiquing.' },
            { channel: 'Presentation', when: 'Research share-outs, stakeholder readouts, strategy reviews', example: 'Lead with the insight, not the methodology. Use real user quotes.' },
        ],
        meetings: [
            { name: 'Design Critique', frequency: 'Tuesday at 11 AM', what: 'Review designs in progress, give research-informed feedback' },
            { name: 'Research Share-out', frequency: 'Bi-weekly Thursday', what: 'Present completed studies, insights, and recommendations to the team' },
            { name: 'UX Sync', frequency: 'Weekly Wednesday', what: 'Align with product on upcoming research needs and priorities' },
            { name: 'Design Sprint Kick-off', frequency: 'As needed', what: 'Frame the problem, share relevant research, set sprint direction' },
        ],

        goals30: [
            'Complete your first user research study (5 interviews minimum)',
            'Present findings to the product team with actionable recommendations',
            'Contribute initial entries to the research repository in Dovetail',
            'Attend all design critiques and research share-outs',
        ],
        goals60: [
            'Lead an end-to-end research project for a major feature',
            'Establish a regular research rhythm with 2 product teams',
            'Build a reusable research template library (interview guides, survey templates)',
            'Influence at least one product decision with evidence-based recommendations',
        ],
        goals90: [
            'Establish an insight-to-design pipeline with clear process documentation',
            'Influence the product roadmap with 3+ evidence-based recommendations',
            'Present a research strategy to design leadership',
            'Mentor a junior designer on user research best practices',
        ],
        learningResources: [
            { title: 'Just Enough Research (Erika Hall)', type: 'Book', url: 'https://abookapart.com/products/just-enough-research' },
            { title: 'Nielsen Norman Group Articles', type: 'Reference', url: 'https://www.nngroup.com/articles/' },
            { title: 'Internal Research Repository', type: 'Documentation', url: '/dovetail/all-studies' },
            { title: 'ResearchOps Community', type: 'Community', url: 'https://researchops.community/' },
        ],
    },

    'customer-success': {
        jobTitle: 'Customer Success Manager',
        department: 'Sales / CS',
        roleCategory: 'DESK',

        workspace: { label: 'Home Office / Hot Desk', items: ['Noise-cancelling headset', 'External webcam', 'Dual monitor setup', 'Standing desk converter'] },
        devices: ['Salesforce', 'Gong', 'Zoom', 'Gainsight', 'Slack', 'Google Workspace'],
        channels: [
            { name: '#customer-success', purpose: 'Team updates & client discussions' },
            { name: '#support-escalations', purpose: 'Urgent client issues' },
            { name: '#product-feedback', purpose: 'Relay client feature requests' },
            { name: '#wins', purpose: 'Celebrate client achievements & renewals' },
        ],
        tourExtras: ['Client meeting rooms', 'Demo environment', 'Sales floor', 'Customer insight wall'],

        rolePolicies: [
            { title: 'Client Confidentiality', description: 'Never share one client\'s data, pricing, or strategies with another. All client information is strictly confidential.' },
            { title: 'NDA Management', description: 'All client engagements require an active NDA. Check NDA status in Salesforce before sharing any proprietary information.' },
            { title: 'Gifting Policy', description: 'Gifts to clients must be under $100 and pre-approved. No gifts during active negotiations or renewals.' },
            { title: 'Discount Authority', description: 'You can offer up to 10% discount independently. Anything above requires VP approval with documented justification.' },
        ],
        dataHandling: ['Client CRM data — never export outside approved tools', 'Call recordings — stored in Gong with auto-deletion after 12 months', 'Pricing data — confidential, never share between clients', 'Usage analytics — aggregate only, no individual user tracking'],

        responsibilities: [
            'Own end-to-end client relationships for your portfolio',
            'Drive net revenue retention through renewals and expansion',
            'Conduct quarterly business reviews (QBRs) with key stakeholders',
            'Identify and resolve churn risks proactively',
            'Relay product feedback to drive roadmap alignment',
        ],
        kpis: [
            { metric: 'Net Revenue Retention', target: '> 110%' },
            { metric: 'Customer Satisfaction (CSAT)', target: '> 4.5/5' },
            { metric: 'Time to Value', target: '< 30 days' },
            { metric: 'Churn Rate', target: '< 5% annually' },
        ],
        tools: [
            { name: 'Salesforce', purpose: 'CRM — track accounts, contacts, opportunities', setupInstructions: 'Set up your portfolio dashboard, import your account list' },
            { name: 'Gong', purpose: 'Call intelligence — recording & analysis', setupInstructions: 'Connect your Zoom, enable auto-recording, review a sample call' },
            { name: 'Gainsight', purpose: 'Customer health scoring & automation', setupInstructions: 'Review health scores for your accounts, set up alerts' },
            { name: 'Zoom', purpose: 'Client meetings & demos', setupInstructions: 'Set up professional background, test audio/video' },
        ],
        simulation: {
            title: 'Quarterly Business Review Prep',
            description: 'Prepare for a QBR with a key client. Review their usage data, identify talking points, and build a value story.',
            steps: ['Review client health score in Gainsight', 'Analyze product usage trends', 'Identify 3 key talking points', 'Draft a value realization slide', 'Prepare expansion recommendations'],
        },
        firstContributions: [
            { title: 'Shadow a Client Call', description: 'Join a senior CSM on a client check-in call and observe their approach' },
            { title: 'Review Client Health', description: 'Analyze one of your accounts\' health scores and identify action items' },
            { title: 'Draft a Check-in Email', description: 'Write a personalized check-in email for one of your assigned accounts' },
        ],
        tips: [
            { title: 'CRM shortcut', shortcut: 'Pin your top 10 accounts in Salesforce for quick access' },
            { title: 'Email templates', shortcut: 'Use the QBR invite, check-in, and renewal templates in Shared Drives' },
            { title: 'Gong insights', shortcut: 'Review the "Talk Ratio" metric after every call — aim for 30/70' },
            { title: 'Calendar blocking', shortcut: 'Block 2 hours every Friday for portfolio health review' },
        ],
        teamWorkflow: {
            process: 'Weekly CS standup, monthly pipeline review, quarterly business reviews with each client',
            current: 'Q1 renewal season — 15 renewals due this quarter, 3 at-risk accounts identified',
            rituals: ['CS standup every Monday at 10 AM', 'Portfolio review with manager weekly', 'Pipeline review monthly', 'QBR prep sessions quarterly'],
        },

        keyPeople: [
            { name: 'Rachel Torres', title: 'VP of Customer Success', why: 'Sets CS strategy and approves escalations above your level', intro: 'Hi Rachel, I just joined as a Customer Success Manager. Looking forward to contributing to the team\'s retention goals.' },
            { name: 'Tom Mitchell', title: 'Solutions Engineer', why: 'Your technical partner for demos, integrations, and technical questions', intro: 'Hi Tom, I\'m a new CSM. Would love to connect on how we collaborate on technical client needs.' },
            { name: 'Sofia Rodriguez', title: 'Product Manager', why: 'Owns the product roadmap — your bridge for client feature requests', intro: 'Hi Sofia, new CSM here. Would love to understand how we funnel client feedback into the product roadmap.' },
            { name: 'James Wong', title: 'Senior CSM', why: 'Your peer mentor who has deep portfolio and process knowledge', intro: 'Hi James, I just started as a CSM. Would love to shadow you on a QBR to learn the process.' },
            { name: 'Lisa Park', title: 'Renewal Manager', why: 'Partners with you on contract renewals and commercials', intro: 'Hi Lisa, I\'m a new CSM. Looking forward to collaborating on renewals this quarter.' },
        ],
        scenarios: [
            {
                situation: 'A key client threatens to churn because they need a feature that\'s not on the roadmap. You can\'t promise it. What do you do?',
                choices: [
                    { text: 'Promise the feature to save the account', isRight: false, feedback: 'Never overpromise. It damages long-term trust and sets unrealistic expectations.' },
                    { text: 'Acknowledge the gap, explore workarounds, and internally advocate with Product using data', isRight: true, feedback: 'This is our approach — empathize, be honest, and internally champion client needs with evidence.' },
                    { text: 'Offer a discount to compensate for the missing feature', isRight: false, feedback: 'Discounts don\'t solve product gaps. They train clients to leverage complaints for savings.' },
                ],
            },
            {
                situation: 'A client asks for a 25% discount on their renewal. Your authority cap is 10%. What do you do?',
                choices: [
                    { text: 'Give 10% and say that\'s the best you can do', isRight: false, feedback: 'Starting with your maximum leaves no room for negotiation.' },
                    { text: 'Reframe the conversation around value — show ROI data, then negotiate with a multi-year commitment for a moderate discount', isRight: true, feedback: 'Lead with value. Discounts should be earned through commitment, not demanded.' },
                    { text: 'Immediately escalate to your VP to get a higher discount approved', isRight: false, feedback: 'Explore value-based options first before escalating. Come to your VP with a proposal, not just a problem.' },
                ],
            },
        ],
        valueTradeoffs: [
            { left: 'Customer Happiness', right: 'Profitability', context: 'When should we absorb costs to delight a client vs. protecting margins?' },
            { left: 'Honesty', right: 'Retention', context: 'When a product gap exists, how transparent should we be vs. managing perception?' },
            { left: 'Reactive Support', right: 'Proactive Engagement', context: 'How much time should we spend firefighting vs. building strategic relationships?' },
        ],
        commNorms: [
            { channel: 'Slack', when: 'Internal team discussions, quick questions, celebrations', example: 'Post wins in #wins. Use #support-escalations for urgent client issues.' },
            { channel: 'Email', when: 'Client communications, formal follow-ups, meeting recaps', example: 'Always BCC the team alias on client emails for visibility.' },
            { channel: 'Video Call', when: 'Client meetings, QBRs, demos, 1:1s', example: 'Camera on for all client calls. Professional background.' },
            { channel: 'Salesforce', when: 'Account notes, opportunity updates, activity logging', example: 'Log every client interaction within 24 hours.' },
        ],
        meetings: [
            { name: 'CS Team Standup', frequency: 'Monday at 10 AM', what: 'Share weekly priorities, at-risk accounts, wins' },
            { name: 'Portfolio Review', frequency: 'Weekly with manager', what: 'Review account health, discuss strategy for key accounts' },
            { name: 'Pipeline Review', frequency: 'Monthly', what: 'Review renewal pipeline, expansion opportunities, churn risks' },
            { name: 'QBR Prep', frequency: 'Before each QBR', what: 'Build the presentation, align on messaging, rehearse' },
        ],

        goals30: [
            'Complete onboarding calls with all assigned accounts',
            'Deliver your first QBR independently',
            'Build health score dashboards for your portfolio',
            'Shadow at least 3 senior CSM calls using Gong recordings',
        ],
        goals60: [
            'Achieve target NRR on your book of business',
            'Identify 2 expansion opportunities and begin conversations',
            'Handle your first client escalation independently',
            'Contribute a use case to the CS playbook',
        ],
        goals90: [
            'Complete a full renewal cycle from prep to close',
            'Present your portfolio strategy to CS leadership',
            'Mentor a new team member or contribute to CS onboarding improvements',
            'Achieve a CSAT of 4.5+ across your accounts',
        ],
        learningResources: [
            { title: 'CS Playbook', type: 'Handbook', url: '/wiki/cs-playbook' },
            { title: 'Gong Call Library', type: 'Recordings', url: '/gong/best-calls' },
            { title: 'Product Certification', type: 'Course', url: '/learning/product-cert' },
            { title: 'Customer Success Network', type: 'Community', url: 'https://successcoaching.co' },
        ],
    },
};

// --- Universal constants (same for all roles) ---

export const UNIVERSAL_COMPANY_STORY = {
    founded: '2019',
    mission: 'To empower every employee with the intelligence they need, the moment they need it.',
    milestones: [
        { year: '2019', event: 'Founded with a vision to transform workplace productivity' },
        { year: '2020', event: 'Launched first AI-powered employee assistant' },
        { year: '2021', event: 'Reached 50,000 users across 12 countries' },
        { year: '2022', event: 'Expanded to frontline and remote workforce solutions' },
        { year: '2023', event: 'Named a Leader in the Gartner Magic Quadrant' },
        { year: '2024', event: 'Acquired ML startup TalentIQ, expanded AI capabilities' },
        { year: '2025', event: '200+ enterprise customers, 500K active users worldwide' },
    ],
    products: [
        { name: 'DEX Platform', description: 'AI-powered digital employee experience' },
        { name: 'Insights Engine', description: 'Real-time workplace intelligence and analytics' },
        { name: 'Onboarding OS', description: 'Role-adaptive onboarding that reduces time-to-productivity by 40%' },
    ],
    leaders: [
        { name: 'Sarah Chen', title: 'CEO & Co-Founder', focus: 'Company vision and strategy' },
        { name: 'Michael Torres', title: 'CTO', focus: 'Technology and platform architecture' },
        { name: 'Priya Mehta', title: 'CPO', focus: 'Product direction and user experience' },
        { name: 'David Park', title: 'CHRO', focus: 'People, culture, and employee experience' },
    ],
};

export const UNIVERSAL_POLICIES = [
    { id: 'leave', title: 'Leave Policy', description: 'Unlimited PTO with a 10-day minimum. Notify your manager at least 2 weeks in advance for planned leave.', category: 'HR' },
    { id: 'conduct', title: 'Code of Conduct', description: 'We treat everyone with respect and integrity. Zero tolerance for harassment, discrimination, or retaliation.', category: 'HR' },
    { id: 'expenses', title: 'Expense Policy', description: 'Submit expenses within 30 days via the HRIS portal. Pre-approval required for expenses above $500.', category: 'Finance' },
    { id: 'remote', title: 'Remote Work Policy', description: 'Hybrid employees are expected in-office 2-3 days per week. Fully remote employees must maintain core hours.', category: 'HR' },
    { id: 'dress', title: 'Dress Code', description: 'Business casual in the office. Smart casual for client meetings. Branded attire provided for events.', category: 'HR' },
];

export const UNIVERSAL_CONDUCT = [
    { id: 'harassment', title: 'Anti-Harassment', description: 'Our workplace is free from harassment in any form — verbal, physical, visual, or digital. Report immediately via the confidential reporting line.' },
    { id: 'discrimination', title: 'Anti-Discrimination', description: 'Decisions are made based on merit. We do not discriminate based on race, gender, age, disability, orientation, or any protected characteristic.' },
    { id: 'whistleblower', title: 'Whistleblower Protection', description: 'Report concerns without fear of retaliation. Anonymous reports accepted via Ethics Hotline.' },
    { id: 'conflict', title: 'Conflict Resolution', description: 'Address conflicts directly and professionally. Use the Escalation Ladder (Peer → Mentor → Manager → HR) when needed.' },
];

export const UNIVERSAL_IT_SECURITY = [
    { id: 'phishing', title: 'Phishing Awareness', description: 'Never click suspicious links or download unexpected attachments. Report phishing to security@company.com.' },
    { id: 'passwords', title: 'Password Policy', description: 'Use unique, strong passwords. Enable MFA on all accounts. Never share credentials.' },
    { id: 'devices', title: 'Device Security', description: 'Lock your screen when away. Enable full-disk encryption. Keep software updated.' },
    { id: 'acceptable-use', title: 'Acceptable Use', description: 'Company devices and networks are for business use. Limited personal use is acceptable but don\'t install unauthorized software.' },
];

export const UNIVERSAL_SAFETY = [
    { id: 'emergency', title: 'Emergency Procedures', description: 'In case of emergency, call security at x5555. Follow evacuation signs to assembly points.' },
    { id: 'first-aid', title: 'First Aid', description: 'First aid kits are located in every floor kitchen. Trained first aiders are listed on the intranet.' },
    { id: 'ergonomics', title: 'Workspace Ergonomics', description: 'Adjust your chair, monitor height, and keyboard position for comfort. Request an ergonomic assessment if needed.' },
    { id: 'mental-health', title: 'Mental Health Support', description: 'Employee Assistance Program (EAP) available 24/7. Confidential counseling at no cost.' },
];

export const UNIVERSAL_BENEFITS = [
    { id: 'health', title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage. Choose from 3 plan tiers during enrollment.' },
    { id: 'retirement', title: 'Retirement Plan', description: '401(k) with 6% company match. Vesting starts immediately.' },
    { id: 'wellness', title: 'Wellness Programs', description: '$1,200 annual wellness stipend for gym, therapy, coaching, or fitness equipment.' },
    { id: 'learning', title: 'Learning Budget', description: '$3,000 annual learning budget for courses, conferences, certifications, and books.' },
    { id: 'ergs', title: 'Employee Resource Groups', description: 'Join ERGs: Women in Tech, PRIDE, Parents@Work, BIPOC Alliance, Accessibility Champions.' },
    { id: 'perks', title: 'Perks', description: 'Free lunch (in-office), commute subsidy, home office stipend ($500), company events.' },
];

export const UNIVERSAL_HANDBOOK = {
    sections: [
        { title: 'Leave Requests', description: 'Submit through HRIS portal → My Time Off → New Request. Your manager is auto-notified.' },
        { title: 'Expense Claims', description: 'Submit through HRIS portal → Expenses → New Claim. Attach receipts. Auto-approved under $500.' },
        { title: 'Time Tracking', description: 'Log hours daily in the HRIS portal. Deadline: end of each Friday.' },
        { title: 'Internal Directory', description: 'Search for anyone in the company via the HRIS portal → People → Search.' },
        { title: 'Knowledge Base', description: 'Internal wiki available at /wiki. Search for processes, policies, and how-tos.' },
        { title: 'IT Help Desk', description: 'Submit tickets at /support or Slack #it-helpdesk. P1 response time: 30 minutes.' },
    ],
};

export const CULTURE_QUIZ_QUESTIONS = [
    { question: 'What is the recommended way to resolve a disagreement with a colleague?', options: ['Escalate directly to HR', 'Discuss it privately and directly first', 'Post about it in Slack', 'Ignore it and move on'], correctIndex: 1 },
    { question: 'When should you use email instead of Slack?', options: ['Always — email is more professional', 'For formal communications and external stakeholders', 'Never — we are a Slack-first company', 'Only when your manager asks'], correctIndex: 1 },
    { question: 'What is our approach to mistakes?', options: ['Zero tolerance — mistakes are unacceptable', 'Blameless — we learn from mistakes and improve processes', 'Only acceptable for junior employees', 'Mistakes should be hidden to avoid consequences'], correctIndex: 1 },
    { question: 'How should you handle a client who asks for a feature not on the roadmap?', options: ['Promise to build it immediately', 'Acknowledge the gap, explore workarounds, and advocate internally', 'Tell them to submit a support ticket', 'Offer a discount instead'], correctIndex: 1 },
    { question: 'What is the correct escalation path for a workplace concern?', options: ['Go directly to the CEO', 'Peer → Mentor → Manager → HR', 'Post anonymously on Glassdoor', 'Wait and hope it resolves itself'], correctIndex: 1 },
];

// Helper to get role config with fallback
export function getRoleConfig(roleId: string): RoleOnboardingConfig {
    return ROLE_CONFIGS[roleId] || ROLE_CONFIGS['software-architect'];
}

// Map jobTitle from UserProfile to role config ID
export function getRoleIdFromProfile(jobTitle: string): string {
    const titleMap: Record<string, string> = {
        'Software Architect': 'software-architect',
        'UX Researcher': 'ux-researcher',
        'Customer Success Manager': 'customer-success',
        'Customer Success': 'customer-success',
    };
    return titleMap[jobTitle] || 'software-architect';
}
