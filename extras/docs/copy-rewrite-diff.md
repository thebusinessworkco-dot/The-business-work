# Plain English Copy Rewrite Diff

Comprehensive log of all old text vs. new plain-English text across user-facing pages and components.

Rule highlights:
- Average sentence length: 8–10 words (strict max 15 words).
- Reading grade target: 4th–5th grade (~10-year-old child comprehension).
- No blacklisted words (leverage, utilise, streamline, seamless, optimise, comprehensive, robust, scalable, orchestrate, guardrails, escalate, stakeholder, bottleneck, repetitive, workflow outside titles, 24/7, around the clock, day and night, high accuracy).
- Indian English spelling (-ise, enquiry) maintained.
- Honest limits maintained; legal pages untouched.

## Group A: Home Components, Site Description and Metadata

### `frontend/src/lib/site.ts`
| Old Text | New Text | Rationale |
|---|---|---|
| `Automation systems and AI workflows for real-world businesses. Custom CRM, messaging, and process automation with human oversight.` | `We build simple tools for your business. They answer customers on WhatsApp, track leads, and send reminders for you.` | Plain words, active voice, answers what the site does in under 15 words per sentence (116 chars total). |

### `frontend/src/app/layout.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `The Business Work | Automation Systems & AI Workflows` | `The Business Work | Simple Tools for Your Business` | Plain English title without buzzwords. Under 60 chars. |

### `frontend/src/app/page.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `The Business Work | Practical Automation & AI Systems` | `The Business Work | Simple Tools for Your Business` | Aligned with plain English branding. |

### `frontend/src/components/Hero.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `AI agents, CRM workflows, and messaging systems that turn slow, manual processes into reliable daily operations.` | `We build simple tools for your business. They answer customers on WhatsApp, keep a list of your leads, and send reminders for you.` | Direct plain target copy; child-readable explanation of what we do. |
| `We design, build, and deploy custom automation for your business — with human oversight built in from day one.` | `We design and build simple tools for your business. A person can step in at any time.` | Short sentences, no "deploy", clear human-in-the-loop guarantee. |
| `Explore Services` | `See Services` | 2 simple everyday words. |
| `Live custom tooling` | `Working tools` | Plain terms, 2 words. |
| `Human oversight built-in` | `A person can step in` | Everyday words, zero jargon. |
| `Fast, clear turnaround` | `Clear plan and cost` | Concrete, honest value. |
| `1. First conversation` / `Free 30-min discovery call to map your current bottlenecks.` | `1. First chat` / `We talk about where your work gets stuck.` | Simple everyday vocabulary, <= 10 words. |
| `2. Custom proposal` / `Fixed scope, transparent pricing, and clear timeline upfront.` | `2. Clear plan` / `You see the exact steps and cost before we start.` | Plain words, honest terms. |
| `3. Build & handover` / `Working systems deployed with documentation and team training.` | `3. Build and test` / `We build your tool, test it, and show your team how it works.` | Simple active words, <= 15 words. |

### `frontend/src/components/Founder.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `I'm Aman Rajbhar, founder of The Business Work. I'm building practical automation and digital systems for businesses in India and worldwide. My approach starts with understanding your daily workflow, choosing a useful problem to solve, and building a system around it—with clear scope, human oversight and a proper handover.` | `I am Aman Rajbhar, founder of The Business Work. I build simple tools for businesses in India and beyond.`<br>`I learn how your daily work runs, pick one real problem, and build a fix. A person can always step in when needed.` | Split into 2 short paragraphs (2 sentences each, <= 15 words per sentence), active voice, plain words. |

### `frontend/src/components/Services.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Four capabilities. One custom solution.` | `What we do for you` | Exact requested section heading in plain English. |
| `These are capabilities we combine into custom solutions, not fixed packages. We understand your workflow first, then recommend the simplest suitable system — using AI only where useful and plain rule-based automation where it works better.` | `We do not sell fixed packages. We learn how you work first. Then we build a simple tool that fits your needs.` | 3 short sentences, average 8 words, no jargon. |
| `Custom solutions` / `Not sure which one you need? Describe the problem. We'll recommend the simplest solution, which may combine WhatsApp, AI, a CRM and a calendar, or be just one small workflow.` | `Custom tools` / `Not sure what you need? Tell us your problem. We will suggest a simple fix that fits your daily work.` | Everyday words, short sentences. |

## Group B: Service Pages and Capability Dialogs

### `frontend/src/content/services.ts`
| Old Text | New Text | Rationale |
|---|---|---|
| `We build AI tools that answer customer questions, collect leads, help with sales and handle routine tasks.` | `We build AI tools that answer customer questions. They collect leads, help with sales, and handle repeat tasks.` | 2 short sentences, <= 10 words, under 155 chars, active voice. |
| `Slow replies to customer questions, missed enquiries after hours, and staff spending hours answering repetitive questions.` | `Slow replies, missed enquiries after hours, and time lost on repeat questions.` | Removed blacklisted word "repetitive", short sentence (12 words). |
| `We configure the AI agent with strict guardrails so it only answers from approved content.` | `We set up the AI tool so it answers from approved content.` | Removed prohibited words "guardrails", "strict", "only", "configure". |
| `AI models require clear source information and cannot invent answers accurately without documentation.` | `AI tools need clear notes and can make mistakes if facts are missing.` | Plain English, acknowledges AI fallibility without absolute claims. |
| `We help businesses manage leads, track sales and follow up with potential customers without doing every step manually.` | `We help you track leads, manage sales, and send follow-ups automatically.` | Plain voice, short sentence (11 words). |
| `Scattered lead records, delayed follow-ups and manual pipeline updates.` | `Scattered lead records, slow follow-ups, and hours spent updating deal stages by hand.` | Plain words, replaces "pipeline bottleneck". |
| `We connect business apps and automate repeat tasks so teams spend less time on manual work.` | `We connect your business apps. Software does repeat tasks so your team saves time.` | 2 short sentences, <= 9 words. |
| `We help businesses reply to enquiries, collect leads and send useful updates through supported messaging and social channels.` | `We help you reply to enquiries and collect leads on WhatsApp and social chat.` | Short sentence (14 words). |
| `All business accounts and outgoing broadcast templates require approval by Meta platform policies.` | `Business accounts and outgoing templates must be approved by Meta.` | Plain English, 10 words. |
| `Messaging automations must comply with customer opt-in and consent regulations; unlimited unsolicited messaging is not permitted.` | `People must agree before they get business messages. Spam is not allowed.` | 2 short sentences, 8 and 4 words. |

### `frontend/src/app/services/[slug]/page.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Custom-built around your existing setup` | `Built around how you work today` | Plain 6 words. |
| `What We Deliver` / `Core Capabilities` | `What we build` / `What this service includes` | Plain words. |
| `Real Scenarios` / `Typical Use Cases` | `Real examples` / `Where this helps` | Simple everyday vocabulary. |
| `Implementation Steps` / `How It Works` | `Simple steps` / `How we build it` | 2 and 4 plain words. |
| `What You Should Know & Honest Limits` | `Things to know before we start` | Honest and plain. |
| `Questions & Answers` / `Frequently Asked Questions` | `Clear answers` / `Common questions` | Short plain headings. |
| `Ready to automate your {service}?` / `Tell us about your daily bottlenecks...` | `Ready to improve your {service}?` / `Tell us what takes too much of your time. We will suggest a simple fix with clear costs before we start.` | Removed "bottlenecks", short sentences <= 14 words. |
| `Explore More` / `Other Services` | `Other tools` / `Other services we offer` | Plain wording. |
| `Learn More` | `Read more` | 2 simple words. |

### `frontend/src/components/ServiceCapabilities.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `View explanation for {name}` / `Click to learn more` | `Read details about {name}` / `Click to read more` | Plain English action words. |
| `Close capability details` | `Close details` | Simple 2 words. |
| `What It Is` / `Problem It Solves` / `How It Works in Simple Steps` | `What it is` / `Problem it solves` / `How it works in 3 steps` | Direct, lower key plain labels. |
| `Real-World Example` / `Tools & Setup Requirements` | `Real example` / `Tools and setup` | Short everyday words. |
| `Previous capability` / `Next capability` | `Previous` / `Next` | Concise 1-word button labels. |

---

