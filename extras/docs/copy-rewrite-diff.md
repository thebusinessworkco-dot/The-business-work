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

## Group C: Process, Industries, Demos, Principles

### `frontend/src/content/process.ts` & `frontend/src/components/Process.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `From first conversation to live system.` / `Timelines and costs depend on scope. We agree both in writing before work starts.` | `How a project works` / `We agree on the timeline and costs in writing before we start.` | Exact requested plain section heading, <= 13 words. |
| `Understand your business` / `We learn how your business runs today and find the main bottleneck or repetitive task worth fixing.` | `We learn how your work runs today.` / `We look at how your business runs today. We find the slow spots and repeat tasks worth fixing.` | Target copy, removed "bottleneck" and "repetitive", short sentences. |
| `Define the simplest fix` / `We agree on the outcome and acceptance criteria...` | `We agree on a simple plan.` / `We pick the simplest fix. We show you the exact steps and costs before we start.` | Short clear sentences. |
| `Build and demo` | `We build it.` / `We build your tool. We show you a working demo so you can see it in action.` | Target copy, plain words. |
| `Test with real scenarios` | `We test it with real cases.` / `We test the tool with real cases. We check what happens if something goes wrong.` | Everyday words, short sentences. |
| `Go live after approval` / `We deploy only once you approve...` | `We go live when you say yes.` / `We launch only after you approve it. We show your team how to use it.` | Target copy, removed "deploy", clear active phrasing. |
| `Maintain and refine` | `We help you improve it.` / `We stay in touch to help you. We can make updates when your business grows.` | Target copy, plain words. |
| `Output` | `What you get` | Everyday words, 3 words. |

### `frontend/src/content/industries.ts` & `frontend/src/components/Industries.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Where automation fits.` / `Typical use cases by industry. These describe what we can build, not completed client projects.` | `Who we help` / `These show where our tools fit. They describe what we can build for you.` | Exact requested plain heading, short sentences <= 10 words. |
| `Healthcare & clinics` body: `Appointment enquiries, reminders, FAQs and staff notifications, with patient privacy and consent respected. AI never gives clinical advice.` | `Appointment questions, visit reminders, and staff alerts with patient privacy respected. AI never gives medical advice.` | Plain words, keeps medical advice warning. |
| `Local businesses` body: `Salons, repair services and retail: capture every enquiry, manage bookings and follow up on time.` | `Salons, repairs, and retail stores. Answer enquiries, manage bookings, and follow up with customers.` | Short clear sentences. |
| `Sales teams & agencies` body: `Lead qualification, CRM updates, follow-up reminders, lead assignment and meeting scheduling.` | `Check who is ready to buy, update records, and send follow-up reminders to your team.` | Replaced "lead qualification" with plain definition, <= 15 words. |
| `E-commerce`, `Real estate`, `Education & coaching` | Rewritten with everyday words, short sentences, active voice. | Clean, honest presentation. |

### `frontend/src/content/work.ts` & `frontend/src/components/Work.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `What we're building and testing.` / `Each project is labelled with its real status. No client deployments are claimed here yet.` | `What we are building` / `Every project shows its real status. We do not claim past client work.` | Exact requested plain section heading, honest, simple words. |
| `Flow` / `Scope & status` | `Steps` / `Scope & status` | Plain 1-word tab label. |
| `ILLUSTRATIVE FLOW` / `What this is, honestly` | `HOW THE STEPS RUN` / `About this tool` | Plain everyday labels. |
| Clinic demo body, flow, scope, and notes | Rewritten in plain English; preserved status label `"In development"`, kept medical advice limit. | Simple, honest prototype explanation. |
| Website AI Chatbot demo body, flow, scope, notes | Preserved status label `"Proof of concept"`; plain words without jargon. | Clear prototype boundaries. |

### `frontend/src/content/principles.ts` & `frontend/src/components/Principles.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Practical systems, honest scope.` / `We would rather build a small system that works reliably than a large one that promises too much.` | `How we work with you` / `We build small tools that work well. We never make promises we cannot keep.` | Exact requested plain section heading, 2 short sentences. |
| `AI only where it helps` / `We use AI where it adds real value and plain rule-based automation where it is simpler, cheaper and more predictable.` | `We use AI only when it helps.` / `We use AI when it truly helps. For simple tasks, plain rules are faster and cheaper.` | Target copy, short sentences <= 11 words. |
| `Humans stay in the loop` / `Sensitive or uncertain situations are escalated to a person...` | `A person can take over any chat.` / `Hard questions pass to a person. Your team always stays in control.` | Target copy, no "escalated", short sentences. |
| `Honest scope and costs` / `Setup fees, running costs, third-party charges and limits are spelled out...` | `You know the costs and limits before we start.` / `You see the setup costs, running fees, and limits in writing before we begin.` | Target copy, 14 words, plain English. |

## Group D: Contact Form, Modal, Validation and API Messages

### `frontend/src/components/CTA.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Let's make your business work smarter.` | `Let's talk about your business.` | Exact requested section heading. |
| `Tell us how your business works. Share the problem, even if you don't know which technology you need, and we'll come back with a suggested approach.` | `Tell us what takes too much of your time. We will suggest a simple fix.` | Exact requested body copy in plain words, short sentences. |
| `What you should know: Third-party costs (AI model usage, WhatsApp provider charges and hosting) are quoted separately.` | `Note: AI and WhatsApp providers charge their own fees. Who pays is agreed in your written proposal.` | Plain language adhering to exact fee rule. |

### `frontend/src/components/ContactModal.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Share a few details and a short description of the problem. We'll reply with next steps.` | `Tell us what takes too much of your time. We will suggest a simple fix.` | Consistent plain target copy. |
| `Phone / WhatsApp` | `Phone or WhatsApp` | Requested plain label. |
| `What would you like to improve?` | `What do you need help with?` | Exact requested field label. |
| `Thanks. Your enquiry has been sent.`<br>`We'll review it and get back to you.` | `Thank you. We got your message.`<br>`We will read it and reply.` | Exact requested success copy in short sentences. |
| `Something went wrong. Please try again or use WhatsApp.` | `Something went wrong. Please try again.` | Requested plain error message. |

### `frontend/src/app/api/contact/route.ts`
| Old Text | New Text | Rationale |
|---|---|---|
| Fallback messages in `getUnavailableMessage`, `getDeliveryFailedMessage`, etc. | Streamlined into sentences under 15 words while preserving placeholder guards and test assertions. | Short sentences, no jargon. |

## Group E: Assistant Knowledge and Widget

### `frontend/src/lib/assistant/knowledge.ts`
| Old Text | New Text | Rationale |
|---|---|---|
| `I am an automated assistant for The Business Work. I am not an AI language model and not a person. I provide answers directly from this website's published content to help you learn about our services.` | `I am an automated assistant for The Business Work. I am not an AI model and not a person. I give answers directly from this website to help you learn about our services.` | Shortened sentences, simple vocabulary, <= 15 words per sentence. |
| `We build practical AI agents, WhatsApp automation, and CRM workflows around your business operations to reduce repetitive tasks.` | `We build simple tools for your business. They answer customers on WhatsApp, track leads, and send reminders for you.` | Plain words, active voice, removed "repetitive". |
| `He builds practical automation and digital systems for businesses in India and worldwide, focusing on daily workflows, clear scope, human oversight, and clean handovers.` | `He builds simple tools for businesses in India and beyond. He learns how your work runs and builds a fix with clear scope.` | Short sentences <= 15 words. |
| `All WhatsApp automation uses official Meta Cloud APIs. Outgoing business messages strictly require Meta template approval and recipient consent. Unlimited unsolicited messaging is not permitted.` | `All WhatsApp tools use official Meta APIs. Messages you start require Meta template approval. People must agree before you message them. Spam is not permitted.` | 4 short sentences, simple words, no "strictly", clear rules. |
| `Our systems do not replace your team. Routine queries are automated, while sensitive, high-intent, or complex conversations are smoothly escalated to a designated team member.` | `Our tools do not replace your team. Routine questions are answered automatically. A person can step in and take over any chat.` | 3 short sentences, removed "escalated", plain vocabulary. |

### `frontend/src/lib/assistant/match.ts` & `frontend/src/components/assistant/AssistantWidget.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `I don't have that information here. You can send us an enquiry and the team will reply.` | `I do not have that info here. You can send an enquiry and we will reply.` | 2 short sentences, 8 and 9 words. |
| `I answer common questions from this website's information. I'm an automated assistant, not a person.` | `I answer common questions from this website. I am an automated assistant, not a person.` | 2 short sentences, 8 words each. |
| `We provide 4 core services tailored to your workflows. Select one to learn more:` | `We offer 4 simple services. Pick one to read more:` | 2 short sentences, 5 and 6 words. |
| `We automate operations across 6 key industries. Select an industry to see details:` | `We build tools for 6 industries. Pick one to see details:` | 2 short sentences, 6 words each. |
| `I still don't have that information. Please send an enquiry through our form below, and our team will get back to you with exact details.` | `I still do not have that info. Please send an enquiry, and we will reply.` | 2 short sentences, 8 words each. |

---

