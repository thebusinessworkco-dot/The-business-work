# Plain English Copy Rewrite Diff

Comprehensive log of all old text vs. new plain-English text across user-facing pages, components, and content files.

Rule highlights:
- Average sentence length: 8–10 words (strict max 15 words).
- Reading grade target: 4th–5th grade (~10-year-old child comprehension).
- No blacklisted words (leverage, utilise, streamline, seamless, optimise, comprehensive, robust, scalable, orchestrate, guardrails, escalate, stakeholder, bottleneck, repetitive, workflow outside service titles, 24/7, around the clock, day and night, high accuracy).
- Indian English spelling (-ise, enquiry) maintained.
- Honest limits maintained; legal pages untouched.

---

## Group A: Home Components, Site Description and Metadata

### `frontend/src/lib/site.ts`
| Old Text | New Text | Rationale |
|---|---|---|
| `Automation systems and AI workflows for real-world businesses. Custom CRM, messaging, and process automation with human oversight.` | `We build AI chatbots, WhatsApp tools and lead tracking for businesses in India. Simple tools that save you time.` | Plain words, active voice, answers what the site does, who it is for, and keeps India (112 chars <= 155). |

### `frontend/src/app/layout.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `The Business Work | Automation Systems & AI Workflows` | `The Business Work | AI & WhatsApp Tools for Business` | Plain English title with key search terms. 56 chars <= 60. |
| `We help small and medium businesses in India and worldwide automate customer enquiries, bookings, lead follow-ups and repetitive admin — using WhatsApp, AI and connected business tools.` | `We build AI chatbots, WhatsApp tools and lead tracking for businesses in India. Simple tools that save you time.` | Derived from `site.description`, child-readable and under 155 chars. |

### `frontend/src/app/page.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `The Business Work | Practical Automation & AI Systems` | `The Business Work | AI & WhatsApp Tools for Business` | Aligned with plain English branding and metadata limits. |
| `Practical AI agents, WhatsApp automation, and CRM workflows custom-built for businesses in India and worldwide.` | `We build AI chatbots, WhatsApp tools and lead tracking for businesses in India. Simple tools that save you time.` | Derived from `site.description`, active voice. |

### `frontend/src/components/Hero.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `AI agents, CRM workflows, and messaging systems that turn slow, manual processes into reliable daily operations.` | `We build simple tools for your business. They answer customers on WhatsApp, keep a list of your leads, and send reminders for you.` | Direct plain target copy; child-readable explanation of what we do. |
| `Built around how your business works, with human handoff when needed.` | `They fit your daily work. We add a clear way for a person to step in.` | Short sentences, no jargon, clear softened handoff commitment. |
| `Explore Services` | `See services` | Standardised lowercase button casing across site. |
| `Built around your workflow` | `Made for your business` | Softened claim, everyday words. |
| `Human handoff built in` | `A person can step in` | Everyday words, zero jargon. |
| `Connected Business Flow` | `How Your Tools Connect` | Plain conversational heading. |
| `Illustrative` | `Example` | Simple everyday 1-syllable word. |
| `SYSTEM 01 // ENQUIRIES` | `STEP 01 // ENQUIRIES` | Everyday terms, removes "SYSTEM". |
| `Answered & Captured` | `Answered & Saved` | Everyday 1-2 syllable word. |
| `SYSTEM 02 // OPERATIONS` | `STEP 02 // DAILY WORK` | Everyday terms, removes "OPERATIONS". |
| `Forms, Sheets & Business Tools` | `Forms, Sheets & Business Apps` | Plain everyday term. |
| `SYSTEM 03 // SALES` | `STEP 03 // NEW SALES` | Plain terms, removes "SYSTEM". |
| `Lead Follow-ups & CRM Pipeline` | `Lead Follow-ups & Customer List` | Replaces "Pipeline" with "Customer List". |
| `Less Repetitive Work` | `Less repeat work` | Removes "Repetitive", lowercase styling. |
| `Human-in-the-Loop` | `A person can step in` | Plain words, replaces tech buzzword. |

### `frontend/src/components/Founder.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `I'm Aman Rajbhar, founder of The Business Work. I'm building practical automation and digital systems for businesses in India and worldwide. My approach starts with understanding your daily workflow, choosing a useful problem to solve, and building a system around it—with clear scope, human oversight and a proper handover.` | `I am Aman Rajbhar, founder of The Business Work. I build simple tools for businesses in India.`<br><br>`I learn how your daily work runs, pick one real problem, and build a fix. We add a clear way for a person to step in.` | Split into 2 short paragraphs (2 sentences each, <= 15 words per sentence), removes "worldwide/beyond" and "always", softens human handoff. |

### `frontend/src/components/Services.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Four capabilities. One custom solution.` | `What we do for you` | Exact requested section heading in plain English. |
| `These are capabilities we combine into custom solutions, not fixed packages. We understand your workflow first, then recommend the simplest suitable system — using AI only where useful and plain rule-based automation where it works better.` | `We do not sell fixed packages. We learn how you work first. Then we build a simple tool that fits your needs.` | 3 short sentences, average 8 words, no jargon. |
| `Custom solutions` | `Custom tools` | Plain terms. |
| `Not sure which one you need? Describe the problem. We'll recommend the simplest solution, which may combine WhatsApp, AI, a CRM and a calendar, or be just one small workflow.` | `Not sure what you need? Tell us your problem. We will suggest a simple fix that fits your daily work.` | Everyday words, short sentences. |

---

## Group B: Service Pages and Capability Dialogs

### `frontend/src/content/services.ts`
| Old Text | New Text | Rationale |
|---|---|---|
| `We build AI tools that answer customer questions, collect leads, help with sales and handle routine tasks.` | `We build AI tools that answer customer questions. They collect leads, help with sales, and handle repeat tasks.` | 2 short sentences, <= 10 words, under 155 chars, active voice. |
| `Slow replies to customer questions, missed enquiries after hours, and staff spending hours answering repetitive questions.` | `Slow replies, missed enquiries after hours, and time lost on repeat questions.` | Removed blacklisted word "repetitive", short sentence (12 words). |
| `We build AI tools that answer customer questions and collect leads. We set up tools for your website using your approved notes. A person can step in at any time.` | `We build AI tools that answer customer questions and collect leads. We set up tools for your website using your approved notes. We add a clear way for a person to step in.` | Softened handoff claim per F2. |
| `We configure the AI agent with strict guardrails so it only answers from approved content.` | `We set up the AI tool to use your approved notes.` | Softened claim, removed prohibited words "guardrails", "strict", "only", "configure", "content". |
| `AI models require clear source information and cannot invent answers accurately without documentation.` | `AI tools can make mistakes. They work best with clear notes.` | Softened claim per F2, acknowledges AI fallibility without absolute claims. |
| `Yes. We test tools with approved notes, but AI can still make mistakes. A person can step in at any time.` | `Yes. We test tools with approved notes, but AI can still make mistakes. We add a clear way for a person to step in.` | Softened handoff phrasing. |
| `We help businesses manage leads, track sales and follow up with potential customers without doing every step manually.` | `We help you track leads, manage sales, and send follow-ups automatically.` | Plain voice, short sentence (11 words). |
| `Scattered lead records, delayed follow-ups and manual pipeline updates.` | `Scattered lead records, slow follow-ups, and hours spent updating deal stages by hand.` | Plain words, replaces "pipeline bottleneck". |
| `We connect business apps and automate repeat tasks so teams spend less time on manual work.` | `We connect your business apps. Software does repeat tasks so your team saves time.` | 2 short sentences, <= 9 words. |
| `Typing data twice between apps, copy-pasting records, and delays from slow handoffs.` | `Typing data twice between apps, messy forms, and delays from slow handoffs.` | Plain words. |
| `We help businesses reply to enquiries, collect leads and send useful updates through supported messaging and social channels.` | `We help you reply to enquiries and collect leads on WhatsApp and social chat.` | Short sentence (14 words). |
| `Piles of repeat messages, slow replies after hours, and leads lost in chat inboxes.` | `Piles of repeat messages, slow replies at night, and leads lost in chat inboxes.` | Plain words, removes 24/7 implication. |
| `All business accounts and outgoing broadcast templates require approval by Meta platform policies.` | `Business accounts and outgoing templates must be approved by Meta.` | Plain English, 10 words. |
| `Messaging automations must comply with customer opt-in and consent regulations; unlimited unsolicited messaging is not permitted.` | `People must agree before they get business messages. Spam is not allowed.` | 2 short sentences, 8 and 4 words. |
| `Yes. A team member can step in at any time when a customer needs help.` | `Yes. We add a clear way for a person to step in.` | Softened handoff phrasing, 11 words. |

### `frontend/src/app/services/[slug]/page.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Custom-built around your existing setup` | `Built around how you work today` | Plain 6 words. |
| `What We Deliver` / `Core Capabilities` | `What we build` / `What this service includes` | Plain words. |
| `Real Scenarios` / `Typical Use Cases` | `Real examples` / `Where this helps` | Simple everyday vocabulary. |
| `Use Case 01` | `Example 01` | Everyday 1-syllable word. |
| `Implementation Steps` / `How It Works` | `Simple steps` / `How we build it` | 2 and 4 plain words. |
| `What You Should Know & Honest Limits` | `Things to know before we start` | Honest and plain. |
| `Questions & Answers` / `Frequently Asked Questions` | `Clear answers` / `Common questions` | Short plain headings. |
| `Ready to automate your {service}?` / `Tell us about your daily bottlenecks...` | `Ready to improve your {service}?` / `Tell us what takes too much of your time. We will suggest a simple fix with clear costs before we start.` | Removed "bottlenecks", short sentences <= 14 words. |
| `Explore More` / `Other Services` | `Other tools` / `Other services we offer` | Plain wording. |
| `Learn More` | `Read more` | 2 simple words. |

### `frontend/src/components/ServiceCapabilities.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `View explanation for {name}` / `Click to learn more` | `View explanation for {name}` / `Click to read more` | Preserved test/screen-reader accessibility aria-label; plain button label. |
| `Close capability details` | `Close capability details` | Preserved accessibility attribute for dialog. |
| `Capability {n} of 6` | `Part {n} of 6` | Everyday word. |
| `What It Is` | `What it is` | Clean lowercase style. |
| `Problem It Solves` | `Problem it solves` | Clean lowercase style. |
| `How It Works in Simple Steps` | `How it works in 3 steps` | Direct, concrete label. |
| `Real-World Example` | `Real example` | Everyday word. |
| `How It Helps Your Business` | `How it helps your business` | Clean lowercase style. |
| `Tools & Setup Requirements` | `Tools and setup` | Everyday words. |
| `Previous capability` / `Next capability` | `Previous capability` / `Next capability` | Preserved test and accessibility attributes. |

---

## Group C: Process, Industries, Demos, Principles

### `frontend/src/content/process.ts` & `frontend/src/components/Process.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `From first conversation to live system.` / `Timelines and costs depend on scope. We agree both in writing before work starts.` | `How a project works` / `We agree on the timeline and costs in writing before we start.` | Exact requested plain section heading, <= 13 words. |
| `Understand your business` / `We learn how your business runs today and find the main bottleneck or repetitive task worth fixing.` | `We learn how your work runs today.` / `We look at how your business runs today. We find the slow spots and repeat tasks worth fixing.` | Target copy, removed "bottleneck" and "repetitive", short sentences. |
| `Define the simplest fix` / `We agree on the outcome and acceptance criteria...` | `We agree on a simple plan.` / `We pick the simplest fix. We show you the steps and costs in writing before we start.` | Short clear sentences, softened "exact" per F2. |
| `Build and demo` / `We build the system, using a demo or proof of concept first where it makes sense.` | `We build it.` / `We build your tool. We show you a working demo so you can see it in action.` | Target copy, plain words. |
| `Test with real scenarios` / `We test with realistic cases and edge cases, including what happens when something fails.` | `We test it with real cases.` / `We test the tool with real cases. We check what happens if something goes wrong.` | Everyday words, short sentences. |
| `Go live after approval` / `We deploy only once you approve the behaviour, then document the workflow and hand it over.` | `We go live when you say yes.` / `We launch only after you approve it. We show your team how to use it.` | Target copy, removed "deploy", clear active phrasing. |
| `Maintain and refine` / `Optional ongoing support, monitoring and improvements under an agreed arrangement.` | `We help you improve it.` / `After launch, support is optional. We agree it in writing.` | Target copy, softened support promise per F2. |
| `Output` | `What you get` | Everyday words, 3 words. |
| `Problem & goal summary` | `Goal summary` | Plain 2 words. |
| `Written scope & estimate` | `Written plan and cost` | Plain everyday words. |
| `Tested workflow` | `Tested tool` | Replaces "workflow". |
| `Documentation & handover` | `Guides and handover` | Plain everyday words. |
| `Support plan (optional)` | `Ongoing help (optional)` | Everyday words. |

### `frontend/src/content/industries.ts` & `frontend/src/components/Industries.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Where automation fits.` / `Typical use cases by industry. These describe what we can build, not completed client projects.` | `Who we help` / `These show where our tools fit. They describe what we can build for you.` | Exact requested plain heading, short sentences <= 10 words. |
| `Healthcare & clinics`: `Appointment enquiries, reminders, FAQs and staff notifications, with patient privacy and consent respected. AI never gives clinical advice.` | `We help clinics handle booking questions, send reminders, and alert staff. AI never gives medical advice.` | "We" as subject, keeps medical advice warning. |
| `Local businesses`: `Salons, repair services and retail: capture every enquiry, manage bookings and follow up on time.` | `We help salons, repair shops and stores answer enquiries, take bookings and follow up.` | Exact requested copy with "We" as subject. |
| `Sales teams & agencies`: `Lead qualification, CRM updates, follow-up reminders, lead assignment and meeting scheduling.` | `We help sales teams see who is ready to buy and send reminders.` | Exact requested copy with "We" as subject. |
| `E-commerce`: `Product and order FAQs, enquiry routing, lead capture and customer follow-up.` | `We help online shops answer order questions and send friendly follow-ups to shoppers.` | "We" as subject, active voice, 13 words. |
| `Real estate`: `Property enquiries, lead qualification, site-visit scheduling and sales-team alerts.` | `We help real estate teams answer property enquiries, book visits, and alert staff.` | "We" as subject, active voice, 13 words. |
| `Education & coaching`: `Course enquiries, admission leads, counselling appointments and follow-ups.` | `We help coaching centres answer course questions, book counselling visits, and follow up.` | "We" as subject, active voice, 13 words. |

### `frontend/src/content/work.ts` & `frontend/src/components/Work.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `What we're building and testing.` / `Each project is labelled with its real status. No client deployments are claimed here yet.` | `What we are building` / `Every project shows its real status. We do not claim past client work.` | Exact requested plain section heading, honest, simple words. |
| `Flow` | `Steps` | Plain 1-word tab label. |
| `Scope & status` | `Status` | Exact requested 1-word tab label per F3. |
| `ILLUSTRATIVE FLOW` | `HOW THE STEPS RUN` | Plain everyday label. |
| `What this is, honestly` | `About this tool` | Plain everyday label. |
| Clinic Demo Title: `WhatsApp Appointment Assistant for Clinics` | `WhatsApp Appointment Assistant for Clinics` | Preserved real project title. |
| Clinic Demo Body: `A demo for a hypothetical clinic: patients book appointments on WhatsApp, the system checks doctor availability, records bookings, and alerts staff.` | `A sample tool for a clinic. Patients book visits on WhatsApp, the tool checks doctor times, and alerts staff.` | 2 short sentences, plain words. |
| Clinic Demo Flow 1: `Patient messages the hospital on WhatsApp` [INTAKE] | `Patient sends a message on WhatsApp` [START] | Plain terms. |
| Clinic Demo Flow 2: `Assistant collects details and preferred slot` [COLLECT] | `Tool asks for details and preferred time` [DETAILS] | Plain terms. |
| Clinic Demo Flow 3: `Availability checked, booking recorded in the calendar and sheet` [BOOK] | `Tool checks calendar and saves the visit` [BOOK] | Plain terms. |
| Clinic Demo Flow 4: `Reminder sent; staff notified of the appointment` [NOTIFY] | `Reminder sent and staff get an alert` [ALERT] | Plain terms. |
| Clinic Demo Scope 1: `Built with: n8n, WhatsApp Cloud API, Google Sheets / Calendar` | `Built with: n8n, WhatsApp Cloud API, Google Calendar` | Accurate tools list. |
| Clinic Demo Scope 2: `Status: Under development; not yet tested end to end` | `Status: Being built; not yet fully tested` | Everyday words. |
| Clinic Demo Scope 3: `Still to verify: Duplicate-booking prevention, reminders, error handling` | `Still to test: Double booking checks, reminder alerts, errors` | Plain everyday words. |
| Clinic Demo Note: `Demo brand. Not a live client deployment. AI assists with scheduling only and never provides clinical advice.` | `Sample project. Not a client deployment. AI helps with booking only and never gives medical advice.` | 3 short sentences, preserves medical boundary. |
| Website Bot Title: `Website AI Chatbot` | `Website AI Chatbot` | Preserved title. |
| Website Bot Body: `A chatbot that answers visitor questions from approved business documents and securely captures enquiries, built with server-side AI integration.` | `A tool that answers visitor questions from approved guides. It collects contact details for your team.` | 2 short sentences, everyday words. |
| Website Bot Flow 1: `Visitor asks a question on the website` [ASK] | `Visitor asks a question on the website` [ASK] | Plain terms. |
| Website Bot Flow 2: `Backend answers from approved business content` [ANSWER] | `Tool answers using approved guide notes` [ANSWER] | Plain terms. |
| Website Bot Flow 3: `Contact details captured when the visitor wants a follow-up` [CAPTURE] | `Visitor leaves their contact details` [DETAILS] | Plain terms. |
| Website Bot Flow 4: `Complex questions are routed to a person` [HANDOFF] | `Hard questions pass to a team member` [PASS CHAT] | Plain terms. |
| Website Bot Scope 1: `Built with: Node.js / Express backend, Gemini API` | `Built with: Node.js backend, Gemini API` | Accurate tools list. |
| Website Bot Scope 2: `Status: Prototype; not yet connected to this website` | `Status: Early test; not yet on this site` | Everyday words. |
| Website Bot Scope 3: `Still to verify: Rate limits, knowledge-base content, production hosting` | `Still to test: Speed limits, guide facts, cloud hosting` | Plain words. |
| Website Bot Note: `Capabilities shown are prototype-level. Not connected to this website.` | `Early test version. Not connected to this website.` | 2 short sentences. |

### `frontend/src/content/principles.ts` & `frontend/src/components/Principles.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Practical systems, honest scope.` / `We would rather build a small system that works reliably than a large one that promises too much.` | `How we work with you` / `We build small tools that work well. We do not promise sales or growth.` | Exact requested plain section heading, softened promises statement per F2. |
| `AI only where it helps` / `We use AI where it adds real value and plain rule-based automation where it is simpler, cheaper and more predictable.` | `We use AI only when it helps.` / `We use AI when it truly helps. For simple tasks, plain rules are faster and cheaper.` | Target copy, short sentences <= 11 words. |
| `Humans stay in the loop` / `Sensitive or uncertain situations are escalated to a person...` | `A person can take over any chat.` / `Hard questions pass to a person. We add a clear way for a person to step in.` | Target copy, softened handoff claim per F2. |
| `Honest scope and costs` / `Setup fees, running costs, third-party charges and limits are spelled out...` | `You know the costs and limits before we start.` / `You see the setup costs, running fees, and limits in writing before we begin.` | Target copy, 14 words, plain English. |

---

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
| `Security verification service temporarily unavailable. Please try again in a few minutes or message us on WhatsApp.` | `The security check is not working right now. Please try again soon or message us on WhatsApp.` | Plain words, <= 15 words. |
| `Security verification service temporarily unavailable. Please try again in a few minutes.` | `The security check is not working right now. Please try again soon.` | Plain words, 12 words. |
| `Too many requests. Please wait a few minutes before trying again or message us on WhatsApp.` | `Too many messages sent. Please wait a few minutes before trying again or message us on WhatsApp.` | Everyday words, <= 15 words. |
| `Too many requests. Please wait a few minutes before trying again.` | `Too many messages sent. Please wait a few minutes before trying again.` | Everyday words, 11 words. |
| `Our enquiry service is temporarily unavailable. Please try again in a few minutes...` | `Our enquiry service is temporarily unavailable. Please try again in a few minutes...` | Preserved exact test string with placeholder guard. |
| `We couldn't send your enquiry. Please try again in a few minutes...` | `We couldn't send your enquiry. Please try again in a few minutes...` | Preserved exact test string with placeholder guard. |

---

## Group E: Assistant Knowledge and Widget

### `frontend/src/lib/assistant/knowledge.ts`
| Old Text | New Text | Rationale |
|---|---|---|
| `I am an automated assistant for The Business Work. I am not an AI language model and not a person. I provide answers directly from this website's published content to help you learn about our services.` | `I am an automated assistant for The Business Work. I am not an AI model and not a person. I give answers directly from this website to help you learn about our services.` | Shortened sentences, simple vocabulary, <= 15 words per sentence. |
| `We build practical AI agents, WhatsApp automation, and CRM workflows around your business operations to reduce repetitive tasks.` | `The Business Work is an agency based in India. We build simple tools for your business. They answer customers on WhatsApp, track leads, and send reminders for you.` | Plain words, active voice, removed "repetitive". |
| `He builds practical automation and digital systems for businesses in India and worldwide, focusing on daily workflows, clear scope, human oversight, and clean handovers.` | `The Business Work was founded by Aman Rajbhar. He builds simple tools for businesses in India. He learns how your work runs and builds a fix with clear scope.` | Removed "worldwide/beyond", short sentences <= 15 words. |
| `Project pricing depends on the scope and systems involved. Because every business has different needs, we provide tailored written quotes after a quick conversation.` | `Project costs depend on what you need. AI and WhatsApp providers charge their own fees. Who pays is agreed in your written proposal. Send an enquiry for a clear written estimate.` | Complies with third-party fee rule, honest, no exact numbers. |
| `For sales teams, we configure CRM lead capture, automated lead qualification, pipeline updates, and follow-up reminders so sales reps focus on closing deals.` | `For sales teams, we log new leads, check who is ready to buy, and send follow-up reminders. We add a clear way for a person to step in.` | Softened handoff claim, removed "qualification" and "pipeline". |
| `All WhatsApp automation uses official Meta Cloud APIs. Outgoing business messages strictly require Meta template approval and recipient consent. Unlimited unsolicited messaging is not permitted.` | `All WhatsApp tools use official Meta APIs. Messages you start require Meta template approval. People must agree before you message them. Spam is not permitted.` | 4 short sentences, simple words, no "strictly", clear rules. |
| `Our systems do not replace your team. Routine queries are automated, while sensitive, high-intent, or complex conversations are smoothly escalated to a designated team member.` | `Our tools do not replace your team. Routine questions are answered automatically. We add a clear way for a person to step in.` | Removed "escalated", plain vocabulary. |

### `frontend/src/lib/assistant/match.ts` & `frontend/src/components/assistant/AssistantWidget.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `I don't have that information here. You can send us an enquiry and the team will reply.` | `I do not have that info here. You can send an enquiry and we will reply.` | 2 short sentences, 8 and 9 words. |
| `I answer common questions from this website's information. I'm an automated assistant, not a person.` | `I answer common questions from this website. I am an automated assistant, not a person.` | 2 short sentences, 8 words each. |
| `We provide 4 core services tailored to your workflows. Select one to learn more:` | `We offer 4 simple services. Pick one to read more:` | 2 short sentences, 5 and 6 words. |
| `We automate operations across 6 key industries. Select an industry to see details:` | `We build tools for 6 industries. Pick one to see details:` | 2 short sentences, 6 words each. |
| `I still don't have that information. Please send an enquiry through our form below, and our team will get back to you with exact details.` | `I still do not have that info. Please send an enquiry, and we will reply.` | 2 short sentences, 8 words each. |

---

## Group F: Cookie Banner, Header, Footer, 404, Accessibility Labels

### `frontend/src/components/CookieConsent.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Cookie & Analytics Consent` | `Counting visits` | Plain everyday 2-word title. |
| `We use optional Google Analytics to understand aggregated site visits. No tracking cookies are set unless you accept. Read our Privacy Policy.` | `We use a tool that counts visits. You can say yes or no. Read our Privacy Policy.` | Target requested copy in plain English, short sentences. |

### `frontend/src/components/Footer.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `AI automation and connected digital systems, built around how your business actually works.` | `Simple tools for your business, built around how your daily work runs.` | Plain words, replaces jargon, 12 words. |
| `Contact & Connect` | `Contact` | Simple 1-word heading. |

### `frontend/src/app/not-found.tsx`
| Old Text | New Text | Rationale |
|---|---|---|
| `Return to Home` / `Explore Services` | `Back to home` / `See services` | Short everyday words, <= 3 words per button. |
| `Or browse our services directly:` | `Or read about our services:` | Plain words. |

---

## Owner Decisions

1. **Founder Bio Scope & Location**:
   - `Founder.tsx` and assistant entry `about-founder` were updated to state "businesses in India" (removing "and worldwide" and "and beyond").
   - Git log investigation showed the bio was initially written on Oct 13, 2026 for India, later widened to "worldwide" on Oct 14, and now grounded in India per strict plain-copy rules.
   - Preserved founder facts: Aman Rajbhar, founder of The Business Work. Kept neutral and listed for owner confirmation.

2. **Hero Discovery Call vs. Direct Enquiry**:
   - The original pre-rewrite copy referenced a "Free 30-min discovery call". In this rewrite, hero copy focuses on "Discuss Your Project" and "Tell us what takes too much of your time. We will suggest a simple fix."
   - We did not re-add the 30-min discovery call promise, keeping it aligned with owner decision to not promise specific calendar calls before reviewing the project enquiry.

3. **Neutral Wording for AI Boundaries & Support**:
   - Retained explicit clarification that AI can make mistakes and works best with approved notes.
   - Clarified that ongoing support after launch is optional and agreed in writing.
   - Retained explicit prohibition on medical advice across healthcare cards and demo disclosures.
