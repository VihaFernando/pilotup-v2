import {
    BadgeDollarSign,
    BrainCircuit,
    Briefcase,
    CircleDollarSign,
    Clock3,
    TrendingUp,
    Sparkles,
    MessageCircle,
    MessageSquare,
    Globe2,
    LayoutDashboard,
    Zap,
    Target,
    Workflow,
    Shield,
    ShieldCheck,
    Handshake,
    Users,
    type LucideIcon,
} from "lucide-react";

export type Integration = {
    name: string;
    slug: string;
    logo: string;
    description: string;
    status: "available" | "planned";
};

export type Role = {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    heroSubtitle: string;
    whatTheyDo: string[];
    weeklyOutputs: string[];
    whereTheyWork: string[];
    howYouManage: string;
    exampleTasks: Array<{ title: string; tag: string }>;
    color: string;
    iconBg: string;
    textColor: string;
    borderColor: string;
    status: "available" | "planned";
};

export type FunctionDef = {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    heroSubtitle: string;
    whatYouCanOffload: string[];
    outputsYouGet: string[];
    toolsTheyWorkIn: string[];
    icon: IconName;
    color: string;
    iconBg: string;
    textColor: string;
};

export type FeatureDef = {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    heroSubtitle: string;
    detailIntro: string;
    sections: Array<{
        title: string;
        body: string;
        bullets: string[];
    }>;
    outcomes: string[];
    examples: string[];
    stats: Array<{ label: string; value: string }>;
    icon: IconName;
    accentSoft: string;
    accentText: string;
    accentGradient: string;
};

export const INTEGRATIONS: Integration[] = [
    {
        name: "Slack",
        slug: "slack",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
        description: "Your AI employee joins channels, responds, and posts updates like a teammate.",
        status: "available",
    },
    {
        name: "Gmail / Email",
        slug: "email",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
        description: "Draft, send, and manage threads with consistent tone and fast follow-ups.",
        status: "available",
    },
    {
        name: "WhatsApp",
        slug: "whatsapp",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
        description: "Communicate with customers and teams in real-time where they already are.",
        status: "available",
    },
    {
        name: "ClickUp",
        slug: "clickup",
        logo: "https://img.icons8.com/?size=100&id=znqq179L1K9g&format=png&color=000000",
        description: "Create tasks, update statuses, and coordinate projects end-to-end.",
        status: "available",
    },
    {
        name: "Notion",
        slug: "notion",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
        description: "Read and update docs, databases, and internal knowledge in one place.",
        status: "available",
    },
    {
        name: "HubSpot",
        slug: "hubspot",
        logo: "https://cdn.simpleicons.org/hubspot/ff7a59",
        description: "Manage contacts, deals, and lifecycle communication directly in CRM.",
        status: "planned",
    },
];

export const ROLES: Role[] = [
    {
        slug: "growth-content-lead",
        title: "Build a Growth & Content Lead",
        shortTitle: "Growth & Content Lead",
        description: "Own your content engine from ideation to distribution.",
        heroSubtitle: "Researches trends, writes content, and reports performance daily.",
        whatTheyDo: [
            "Research topic gaps and content opportunities",
            "Draft blogs, social posts, and newsletters",
            "Schedule and publish across channels",
            "Track engagement and optimize next outputs",
        ],
        weeklyOutputs: [
            "3-5 published blog posts",
            "15-20 social posts",
            "2 email campaigns",
            "1 weekly performance summary",
        ],
        whereTheyWork: ["Slack", "Gmail / Email", "Notion", "ClickUp"],
        howYouManage:
            "Set priorities and brand direction. The AI executes day-to-day and escalates edge cases.",
        exampleTasks: [
            { title: "Draft 5 LinkedIn posts for this week", tag: "Content" },
            { title: "Research 20 SEO keywords by intent", tag: "SEO" },
            { title: "Create the next newsletter draft", tag: "Email" },
        ],
        color: "bg-blue-50",
        iconBg: "bg-blue-100 text-blue-600",
        textColor: "text-blue-600",
        borderColor: "border-blue-200",
        status: "available",
    },
    {
        slug: "support-research-lead",
        title: "Build a Support & Research Lead",
        shortTitle: "Support & Research Lead",
        description: "Resolve support requests and generate market insights.",
        heroSubtitle: "Handles tickets and delivers decision-ready intelligence.",
        whatTheyDo: [
            "Triage tickets and send responses",
            "Escalate high-complexity issues",
            "Run market and competitor scans",
            "Compile insight summaries",
        ],
        weeklyOutputs: [
            "50-100 tickets triaged",
            "2-3 research briefs",
            "1 sentiment report",
            "Escalation summary",
        ],
        whereTheyWork: ["Gmail / Email", "Slack", "WhatsApp", "Notion"],
        howYouManage:
            "Define SLAs and escalation rules once. The AI follows your support and research playbook consistently.",
        exampleTasks: [
            { title: "Respond to all new support emails", tag: "Support" },
            { title: "Compare top 5 competitors by pricing", tag: "Research" },
            { title: "Update FAQ based on recurring issues", tag: "Docs" },
        ],
        color: "bg-emerald-50",
        iconBg: "bg-emerald-100 text-emerald-600",
        textColor: "text-emerald-600",
        borderColor: "border-emerald-200",
        status: "available",
    },
    {
        slug: "operations-manager",
        title: "Build an Operations Manager",
        shortTitle: "Operations Manager",
        description: "Keep work moving with fewer blockers and tighter coordination.",
        heroSubtitle: "Tracks projects, follow-ups, and reporting across teams.",
        whatTheyDo: [
            "Track milestones and deadlines",
            "Send reminders and follow-ups",
            "Coordinate team dependencies",
            "Deliver recurring status reports",
        ],
        weeklyOutputs: [
            "5 standup summaries",
            "1 operational scorecard",
            "Overdue task alerts",
            "Bottleneck recommendations",
        ],
        whereTheyWork: ["ClickUp", "Slack", "Gmail / Email", "Notion"],
        howYouManage:
            "Set reporting cadence and priority rules. The AI monitors execution and keeps everyone aligned.",
        exampleTasks: [
            { title: "Publish daily standup in Slack", tag: "Reporting" },
            { title: "Follow up on overdue items", tag: "Tracking" },
            { title: "Prepare weekly ops summary", tag: "Operations" },
        ],
        color: "bg-amber-50",
        iconBg: "bg-amber-100 text-amber-600",
        textColor: "text-amber-600",
        borderColor: "border-amber-200",
        status: "available",
    },
];

export const FUNCTIONS: FunctionDef[] = [
    {
        slug: "sales",
        title: "Build an AI Employee in Sales",
        shortTitle: "Sales",
        description: "Automate prospecting, follow-ups, and pipeline updates.",
        heroSubtitle: "Close more with faster outreach and cleaner pipeline execution.",
        whatYouCanOffload: [
            "Lead prospecting",
            "Outreach and follow-up sequences",
            "CRM updates",
            "Meeting scheduling",
        ],
        outputsYouGet: ["Qualified lead lists", "Weekly pipeline reports", "Deal summaries"],
        toolsTheyWorkIn: ["Gmail / Email", "Slack", "HubSpot", "ClickUp"],
        icon: "TrendingUp",
        color: "bg-emerald-50",
        iconBg: "bg-emerald-100 text-emerald-600",
        textColor: "text-emerald-600",
    },
    {
        slug: "marketing",
        title: "Build an AI Employee in Marketing",
        shortTitle: "Marketing",
        description: "Launch campaigns and content without increasing headcount.",
        heroSubtitle: "Execution-heavy marketing work handled continuously.",
        whatYouCanOffload: ["Content creation", "Campaign setup", "SEO research", "Reporting"],
        outputsYouGet: ["Published content", "Campaign reports", "Optimization insights"],
        toolsTheyWorkIn: ["Notion", "Slack", "Gmail / Email", "Google Drive"],
        icon: "Sparkles",
        color: "bg-violet-50",
        iconBg: "bg-violet-100 text-violet-600",
        textColor: "text-violet-600",
    },
    {
        slug: "support",
        title: "Build an AI Employee in Support",
        shortTitle: "Support",
        description: "Respond faster and resolve consistently across channels.",
        heroSubtitle: "Keep SLA and quality high while reducing manual load.",
        whatYouCanOffload: ["Ticket triage", "Replies", "Escalations", "FAQ updates"],
        outputsYouGet: ["Resolved tickets", "CSAT summaries", "Escalation logs"],
        toolsTheyWorkIn: ["Gmail / Email", "Slack", "WhatsApp", "Notion"],
        icon: "MessageCircle",
        color: "bg-cyan-50",
        iconBg: "bg-cyan-100 text-cyan-600",
        textColor: "text-cyan-600",
    },
    {
        slug: "operations",
        title: "Build an AI Employee in Operations",
        shortTitle: "Operations",
        description: "Coordinate recurring workflows and keep projects moving.",
        heroSubtitle: "Operational throughput and visibility without extra overhead.",
        whatYouCanOffload: ["Task tracking", "Follow-ups", "Status reports", "Checklists"],
        outputsYouGet: ["Standups", "Task alerts", "Ops summaries"],
        toolsTheyWorkIn: ["ClickUp", "Slack", "Gmail / Email", "Notion"],
        icon: "LayoutDashboard",
        color: "bg-amber-50",
        iconBg: "bg-amber-100 text-amber-600",
        textColor: "text-amber-600",
    },
    {
        slug: "research",
        title: "Build an AI Employee in Research",
        shortTitle: "Research",
        description: "Turn questions into actionable briefs quickly.",
        heroSubtitle: "Continuously gather intelligence and summarize what matters.",
        whatYouCanOffload: ["Competitor scans", "Trend tracking", "Data synthesis", "Brief writing"],
        outputsYouGet: ["Research briefs", "Comparison matrices", "Weekly digest"],
        toolsTheyWorkIn: ["Notion", "Google Drive", "Slack", "Gmail / Email"],
        icon: "Globe2",
        color: "bg-blue-50",
        iconBg: "bg-blue-100 text-blue-600",
        textColor: "text-blue-600",
    },
];

export const FEATURES: FeatureDef[] = [
    {
        slug: "ai-employees-that-own-real-work",
        title: "AI Employees That Own Real Work",
        shortTitle: "Owns Real Work",
        description: "These are AI employees that take ownership and get work done.",
        heroSubtitle: "PilotUP gives you AI employees that take tasks from start to finish instead of stopping at suggestions.",
        detailIntro:
            "This is the core shift. Most AI tools still need you to tell them what to do, check their work, and move things forward manually. PilotUP flips that by giving you AI employees that own the task, make decisions in context, and keep executing without waiting for the next instruction.",
        sections: [
            {
                title: "What changes",
                body: "You stop supervising every step and start delegating outcomes.",
                bullets: ["Take ownership of tasks from start to finish", "Make decisions based on context", "Execute without waiting for instructions every step"],
            },
            {
                title: "Examples in practice",
                body: "Each employee handles the full motion of the job.",
                bullets: ["Sales AI finds leads, reaches out, follows up, and updates CRM", "Marketing AI plans, creates, publishes, and improves"],
            },
            {
                title: "Why it matters",
                body: "They do not assist. They work.",
                bullets: ["Less manual coordination", "More completed work", "Clearer ownership end to end"],
            },
        ],
        outcomes: ["End-to-end ownership", "Context-aware decisions", "Less manual follow-through"],
        examples: ["Turn a lead into a CRM-updated follow-up sequence", "Launch content without constant review", "Keep work moving after the first instruction"],
        stats: [
            { label: "Model", value: "Employee, not tool" },
            { label: "Execution", value: "End to end" },
            { label: "Management", value: "Less manual" },
        ],
        icon: "BrainCircuit",
        accentSoft: "bg-sky-50",
        accentText: "text-sky-600",
        accentGradient: "from-sky-500 via-cyan-500 to-blue-500",
    },
    {
        slug: "autonomous-execution-24-7",
        title: "Autonomous Execution. 24/7.",
        shortTitle: "24/7 Execution",
        description: "Work doesn’t stop when your team logs off. Your AI employees keep going.",
        heroSubtitle: "PilotUP keeps work moving around the clock so leads, support, and campaigns do not stall overnight.",
        detailIntro:
            "Your business does not run 9–5. But your team does. PilotUP employees work 24/7 without breaks, do not miss leads, messages, or tasks, and do not slow down when volume increases.",
        sections: [
            {
                title: "What this looks like",
                body: "The queue keeps clearing even after everyone else logs off.",
                bullets: ["Leads get contacted instantly", "Follow-ups happen automatically", "Support replies do not sit for hours"],
            },
            {
                title: "Operational impact",
                body: "Execution stays consistent instead of waiting until tomorrow.",
                bullets: ["Campaigns keep running and improving", "No delays in customer response", "No 'we’ll get to it tomorrow' gap"],
            },
            {
                title: "What that unlocks",
                body: "You get predictable execution without scheduling around human availability.",
                bullets: ["More opportunities handled in real time", "Less backlog at the start of the day", "Operations continue while your team sleeps"],
            },
        ],
        outcomes: ["Always-on follow-through", "Fewer missed opportunities", "Higher throughput without more hours"],
        examples: ["Respond to inbound leads immediately", "Keep support queues moving overnight", "Trigger follow-up sequences without manual scheduling"],
        stats: [
            { label: "Coverage", value: "24/7" },
            { label: "Bottlenecks", value: "Removed" },
            { label: "Response", value: "Instant" },
        ],
        icon: "Clock3",
        accentSoft: "bg-amber-50",
        accentText: "text-amber-600",
        accentGradient: "from-amber-500 via-orange-500 to-rose-500",
    },
    {
        slug: "team-that-works-together-not-isolated-bots",
        title: "Team That Works Together, Not Isolated Bots",
        shortTitle: "Works as a Team",
        description: "Your AI employees don’t work alone. They share context and operate like a real team.",
        heroSubtitle: "PilotUP connects specialized employees so work moves cleanly from one function to the next.",
        detailIntro:
            "Most AI tools are isolated. One tool for sales. Another for marketing. Another for support. They do not talk to each other. PilotUP employees do.",
        sections: [
            {
                title: "Shared context",
                body: "Work flows across functions instead of getting trapped in separate tools.",
                bullets: ["Sales AI shares qualified leads with Support AI", "Marketing AI learns from what converts in Sales", "Operations AI keeps everything organized"],
            },
            {
                title: "What that creates",
                body: "The whole system gets smarter as the team works together.",
                bullets: ["Better decisions", "Less duplicated work", "Consistent customer experience"],
            },
            {
                title: "What it is not",
                body: "It is not four tools. It is a team.",
                bullets: ["Fewer handoff gaps", "More coordinated execution", "Shared learning across the business"],
            },
        ],
        outcomes: ["Shared context across functions", "Less duplicated work", "More consistent customer experience"],
        examples: ["Pass qualified leads from sales into support context", "Let marketing learn from conversion outcomes", "Keep operations aligned with live execution"],
        stats: [
            { label: "Structure", value: "One team" },
            { label: "Context", value: "Shared" },
            { label: "Efficiency", value: "Less duplication" },
        ],
        icon: "Users",
        accentSoft: "bg-teal-50",
        accentText: "text-teal-600",
        accentGradient: "from-teal-500 via-emerald-500 to-cyan-500",
    },
    {
        slug: "learns-your-business-over-time",
        title: "Learns Your Business Over Time",
        shortTitle: "Learns Over Time",
        description: "The more they work, the better they get. Just like a real employee.",
        heroSubtitle: "PilotUP compounds business knowledge through feedback, results, and patterns.",
        detailIntro:
            "Day 1: good. Day 30: better. Day 90: much better. Your AI employees learn your product, your tone, and what works through feedback, results, and patterns in your business.",
        sections: [
            {
                title: "How they improve",
                body: "They get sharper the more they operate inside your business.",
                bullets: ["Learn your product", "Learn your tone", "Learn what works and what does not"],
            },
            {
                title: "How the loop works",
                body: "Feedback and outcomes refine future execution.",
                bullets: ["Sales AI adjusts messaging based on reply rates", "Marketing AI doubles down on content that performs", "Support AI gets sharper with real customer questions"],
            },
            {
                title: "Why it compounds",
                body: "Learning improves with real usage instead of resetting every time the team changes.",
                bullets: ["No retraining cycles", "No starting over when someone leaves", "Performance improves through real feedback"],
            },
        ],
        outcomes: ["Compounding performance", "Business-specific tone and judgment", "No retraining reset"],
        examples: ["Refine outreach based on reply rates", "Lean into content that actually converts", "Handle customer questions more accurately over time"],
        stats: [
            { label: "Day 1", value: "Good" },
            { label: "Day 30", value: "Better" },
            { label: "Day 90", value: "Much better" },
        ],
        icon: "Sparkles",
        accentSoft: "bg-fuchsia-50",
        accentText: "text-fuchsia-600",
        accentGradient: "from-fuchsia-500 via-violet-500 to-indigo-500",
    },
    {
        slug: "communicate-like-a-real-teammate",
        title: "Communicate Like a Real Teammate",
        shortTitle: "Real Teammate Comms",
        description: "No dashboards. No complex setup. Just talk to them and they get it done.",
        heroSubtitle: "PilotUP keeps management simple by letting you assign work in the same channels your team already uses.",
        detailIntro:
            "You do not need to learn a system. You already know how to manage a team, so PilotUP keeps it that way. Give instructions in plain language, ask for updates, and assign tasks directly through the channels you already use.",
        sections: [
            {
                title: "How you manage",
                body: "Just communicate the work like you would with a teammate.",
                bullets: ["Give instructions in plain language", "Ask for updates", "Assign tasks directly"],
            },
            {
                title: "Where it happens",
                body: "The interface stays close to the team, not buried in dashboards.",
                bullets: ["WhatsApp", "Slack", "Email", "Internal interface"],
            },
            {
                title: "Example requests",
                body: "The AI understands normal working language.",
                bullets: ["Follow up with all leads from last week", "Create 5 posts around this topic", "Handle all new support tickets today"],
            },
        ],
        outcomes: ["Plain-language management", "No workflow builder needed", "Fast task assignment and updates"],
        examples: ["Send one message and assign a task", "Ask for progress updates in Slack", "Route work through WhatsApp or email"],
        stats: [
            { label: "Interface", value: "Conversations" },
            { label: "Setup", value: "Simple" },
            { label: "Control", value: "Direct" },
        ],
        icon: "MessageSquare",
        accentSoft: "bg-indigo-50",
        accentText: "text-indigo-600",
        accentGradient: "from-indigo-500 via-sky-500 to-cyan-500",
    },
    {
        slug: "replace-work-not-just-assist-it",
        title: "Replace Work. Not Just Assist It.",
        shortTitle: "Replace Work",
        description: "This isn’t about helping your team. It’s about removing the need for expensive hires.",
        heroSubtitle: "PilotUP is built to remove roles, not just shave minutes off them.",
        detailIntro:
            "Most tools make your team slightly faster. PilotUP removes the need for that role entirely by deploying AI employees that do the same work at a predictable cost, without turnover, training, or management overhead.",
        sections: [
            {
                title: "What changes",
                body: "The business model shifts from extra headcount to always-on execution.",
                bullets: ["Deploy AI employees that do the same work", "Pay a predictable cost", "Avoid turnover and training overhead"],
            },
            {
                title: "Instead of",
                body: "You no longer need a larger team to keep up.",
                bullets: ["Hiring a $100K marketing person", "Paying commissions to sales reps", "Hiring ops for admin work"],
            },
            {
                title: "What you get",
                body: "They keep working without the friction of human staffing.",
                bullets: ["They do not take days off", "They do not quit", "They do not burn out"],
            },
        ],
        outcomes: ["Lower labor overhead", "Predictable operating cost", "Work that keeps moving"],
        examples: ["Replace repetitive marketing tasks with ongoing execution", "Remove admin bottlenecks from operations", "Keep sales follow-up running without extra hires"],
        stats: [
            { label: "Hiring need", value: "Reduced" },
            { label: "Cost", value: "Predictable" },
            { label: "Turnover", value: "Removed" },
        ],
        icon: "ShieldCheck",
        accentSoft: "bg-rose-50",
        accentText: "text-rose-600",
        accentGradient: "from-rose-500 via-pink-500 to-orange-500",
    },
    {
        slug: "built-for-real-business-functions",
        title: "Built for Real Business Functions",
        shortTitle: "Real Functions",
        description: "Pre-trained for how businesses actually run. Not generic AI.",
        heroSubtitle: "PilotUP gives you employees that understand the function, the workflows, and the expected outcome.",
        detailIntro:
            "Generic AI gives you a blank slate. PilotUP gives you employees trained for specific roles so they already understand how the business runs and what success looks like.",
        sections: [
            {
                title: "Role coverage",
                body: "Each employee is prepared to work inside a specific function.",
                bullets: ["Sales: prospecting, outreach, follow-ups, pipeline management", "Marketing: content, campaigns, analytics, SEO", "Operations: admin work, data handling, process execution"],
            },
            {
                title: "Why that matters",
                body: "You are not starting from zero every time.",
                bullets: ["The function is already understood", "The workflows are already known", "The expected outcomes are already defined"],
            },
            {
                title: "The shift",
                body: "You are hiring ready-to-work employees instead of building from scratch.",
                bullets: ["Less setup time", "Faster time to value", "More consistent execution across functions"],
            },
        ],
        outcomes: ["Role-ready employees", "Function-specific execution", "Less build-from-scratch work"],
        examples: ["Spin up sales execution without custom tooling", "Run marketing output on known workflows", "Handle support and operations with pre-trained roles"],
        stats: [
            { label: "Training", value: "Pre-built" },
            { label: "Scope", value: "Specific roles" },
            { label: "Result", value: "Ready to work" },
        ],
        icon: "Briefcase",
        accentSoft: "bg-blue-50",
        accentText: "text-blue-600",
        accentGradient: "from-blue-500 via-sky-500 to-teal-500",
    },
    {
        slug: "built-for-founders-who-care-about-margin",
        title: "Built for Founders Who Care About Margin",
        shortTitle: "Margin First",
        description: "Everything is designed to reduce payroll and increase output.",
        heroSubtitle: "PilotUP exists for one reason: protect margin while your business grows.",
        detailIntro:
            "This product exists for one reason: your margin is getting crushed by payroll. PilotUP focuses on replacing expensive roles, increasing output without increasing headcount, and keeping the business lean as you grow.",
        sections: [
            {
                title: "What you get",
                body: "More work done without the usual payroll growth.",
                bullets: ["More work done", "Less money spent on salaries", "Less time managing people"],
            },
            {
                title: "What you do not need",
                body: "Growth does not have to mean adding more overhead.",
                bullets: ["Bigger teams", "More hires", "More overhead"],
            },
            {
                title: "Why founders choose it",
                body: "The goal is simple: keep the business lean and profitable.",
                bullets: ["Work done", "Revenue growing", "Margin protected"],
            },
        ],
        outcomes: ["Lower payroll pressure", "Higher output per dollar", "Lean growth"],
        examples: ["Replace a costly role with an always-on AI employee", "Increase output without adding headcount", "Keep a tighter cost base as demand grows"],
        stats: [
            { label: "Primary goal", value: "Protect margin" },
            { label: "Operating model", value: "Lean" },
            { label: "Cost pressure", value: "Lowered" },
        ],
        icon: "CircleDollarSign",
        accentSoft: "bg-emerald-50",
        accentText: "text-emerald-600",
        accentGradient: "from-emerald-500 via-green-500 to-lime-500",
    },
];

type IconName =
    | "BadgeDollarSign"
    | "BrainCircuit"
    | "Briefcase"
    | "CircleDollarSign"
    | "Clock3"
    | "TrendingUp"
    | "Sparkles"
    | "MessageCircle"
    | "MessageSquare"
    | "Globe2"
    | "LayoutDashboard"
    | "Zap"
    | "Target"
    | "Workflow"
    | "Shield"
    | "ShieldCheck"
    | "Handshake"
    | "Users";

const ICON_MAP: Record<IconName, LucideIcon> = {
    BadgeDollarSign,
    BrainCircuit,
    Briefcase,
    CircleDollarSign,
    Clock3,
    TrendingUp,
    Sparkles,
    MessageCircle,
    MessageSquare,
    Globe2,
    LayoutDashboard,
    Zap,
    Target,
    Workflow,
    Shield,
    ShieldCheck,
    Handshake,
    Users,
};

export function getIcon(icon: IconName): LucideIcon {
    return ICON_MAP[icon];
}
