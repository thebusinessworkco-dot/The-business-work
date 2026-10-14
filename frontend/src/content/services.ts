import type { LucideIcon } from "lucide-react";
import { Bot, Workflow, TrendingUp, MessageCircle } from "lucide-react";

export type CapabilityDetails = {
  what: string;
  problem: string;
  steps: [string, string, string];
  example: string;
  benefit: string;
  tools: string;
};

export type Capability = {
  name: string;
  details: CapabilityDetails;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  id: string;
  index: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  tag: string;
  icon: LucideIcon;
  summary: string;
  solves: string;
  capabilities: Capability[];
  depends: string;
  intro: string;
  useCases: string[];
  howItWorks: string[];
  limits: string[];
  faq: ServiceFaq[];
};

export const services: Service[] = [
  {
    id: "ai-agents-chatbots",
    index: "01",
    title: "AI Agents & Chatbots",
    seoTitle: "AI Agents & Chatbots for Business",
    metaDescription:
      "We build AI chatbots and intake tools for your business. Answer customer questions, collect qualified leads, and pass hard chats to your team.",
    tag: "Customer-facing AI",
    icon: Bot,
    summary:
      "We build AI tools that answer customer questions. They collect leads, help with sales, and handle repeat tasks.",
    solves:
      "Slow replies, missed enquiries after hours, and time lost on repeat questions.",
    capabilities: [
      {
        name: "AI Sales Agents",
        details: {
          what: "We build sales tools that answer buyer questions. They collect what buyers need.",
          problem: "Visitors leave your website if no one is free to answer pricing questions.",
          steps: [
            "The tool answers buyer questions using approved price and service notes.",
            "It asks what the buyer needs and what their budget is.",
            "It sends the person's details to your sales team to follow up.",
          ],
          example: "A website visitor asks about service costs. The tool shares approved prices and sends the lead to your team.",
          benefit: "Your business captures more sales leads during busy periods without extra desk work.",
          tools: "Depends on: website chat setup, approved pricing notes, and connected sales software. Third-party fees are agreed in the written proposal.",
        },
      },
      {
        name: "AI Customer Support Agents",
        details: {
          what: "We build support tools that answer common questions. They use your approved guides and business notes.",
          problem: "Customers wait for answers while your team spends hours typing the same replies.",
          steps: [
            "A customer sends a common question through chat.",
            "The tool answers using your approved guide notes.",
            "It passes hard questions to a team member.",
          ],
          example: "A customer asks about return rules. The tool shares the approved guide answer.",
          benefit: "Customers get quick answers to repeat questions. Your staff can handle harder cases.",
          tools: "Depends on: approved notes, FAQs, and connected support software. AI provider fees are agreed in the written proposal.",
        },
      },
      {
        name: "Website AI Chatbots",
        details: {
          what: "We build website chat boxes. They greet visitors, answer basic questions, and collect contact details.",
          problem: "Most visitors browse your website and leave without reaching out or leaving details.",
          steps: [
            "A visitor opens the chat box on your website.",
            "The chatbot answers questions using approved information.",
            "It asks for a name and phone number for a callback.",
          ],
          example: "A visitor asks if you take new clients. They leave their number for a callback.",
          benefit: "Turns website visits into real enquiries so your team can reach interested people.",
          tools: "Depends on: website setup and chat software. Third-party software fees are agreed in the written proposal.",
        },
      },
      {
        name: "AI Lead Qualification Agents",
        details: {
          what: "We build intake tools that ask key questions. They find out who is ready to buy.",
          problem: "Sales staff spend hours on calls with people who do not match your budget.",
          steps: [
            "A new person sends an enquiry through chat or a form.",
            "The tool asks about their needs, location, and budget.",
            "It flags good fits and alerts your sales team.",
          ],
          example: "A client asks for custom work. The tool checks their budget and alerts your salesperson.",
          benefit: "Your sales team spends time talking with buyers who fit your services.",
          tools: "Depends on: agreed questions, form setup, and sales software. Third-party fees are agreed in the written proposal.",
        },
      },
      {
        name: "AI Voice Agents, where supported",
        details: {
          what: "We set up voice tools that answer incoming phone calls and take caller details.",
          problem: "Missed phone calls during busy hours lead to lost customer enquiries.",
          steps: [
            "A customer calls your business phone number.",
            "The voice tool answers with approved notes and takes caller details.",
            "It sends caller details and notes to your team.",
          ],
          example: "A caller checks office hours and asks for a callback. The tool logs their number.",
          benefit: "Takes caller details when your team is away from the phone.",
          tools: "Depends on: setup, phone service support, and platform availability. Phone and platform fees are agreed in the written proposal.",
        },
      },
      {
        name: "AI Appointment Booking Agents",
        details: {
          what: "We build booking tools that check your calendar and schedule client meetings.",
          problem: "Staff and customers lose time sending messages back and forth to agree on a time.",
          steps: [
            "A customer asks to book a meeting or visit.",
            "The tool checks open times on your connected calendar.",
            "It books the chosen time and sends confirmation details.",
          ],
          example: "A customer asks for a visit, picks an open calendar time, and gets confirmation.",
          benefit: "Saves booking time and helps clients pick open times on your calendar.",
          tools: "Depends on: setup with a connected calendar like Google Calendar. Software fees are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Your business data, chosen AI model, connections, and budget. Fees and third-party costs are agreed in the written proposal.",
    intro:
      "We build AI tools that answer customer questions and collect leads. We set up tools for your website using your approved notes. We add a clear way for a person to step in.",
    useCases: [
      "Answer customer questions on a website or chat channel.",
      "Ask potential buyers about their needs and budget.",
      "Collect customer details and send ready leads to your team.",
      "Help customers book appointments on your calendar.",
      "Handle common questions using approved business notes.",
      "Pass hard or sensitive chats to a person.",
    ],
    howItWorks: [
      "We review your guides, FAQs, and common questions to gather facts.",
      "We set up the AI tool to use your approved notes.",
      "We test the tool with real questions to check its replies.",
      "We connect the tool to your website with a person ready to step in.",
    ],
    limits: [
      "AI tools can make mistakes. They need approved notes to answer from.",
      "AI providers charge their own fees. Who pays is agreed in your written proposal.",
      "Healthcare tools handle administrative booking only and never give medical advice.",
    ],
    faq: [
      {
        question: "Can the AI chatbot make mistakes?",
        answer:
          "Yes. We test tools with approved notes, but AI can still make mistakes. We add a clear way for a person to step in.",
      },
      {
        question: "What happens when a customer has a complex problem?",
        answer:
          "The tool passes the chat to a team member so a person can help.",
      },
      {
        question: "How are AI fees handled?",
        answer:
          "AI providers charge their own fees. Who pays is agreed in your written proposal.",
      },
    ],
  },
  {
    id: "crm-sales-automation",
    index: "02",
    title: "CRM & Sales Automation",
    seoTitle: "CRM & Sales Pipeline Automation",
    metaDescription:
      "We help you organise your CRM, track sales stages, and schedule follow-ups automatically. Prevent missed leads and keep deal records up to date.",
    tag: "Pipeline & follow-ups",
    icon: TrendingUp,
    summary:
      "We help you track leads, manage sales, and send follow-ups automatically.",
    solves:
      "Scattered lead records, slow follow-ups, and hours spent updating deal stages by hand.",
    capabilities: [
      {
        name: "CRM Setup and Customisation",
        details: {
          what: "We set up your CRM so customer records and sales stages stay neatly organised.",
          problem: "Customer notes and phone numbers are scattered in notebooks, chats, and messy sheets.",
          steps: [
            "We map the sales steps and fields your business needs.",
            "We set up contact views and deal stages in your CRM.",
            "We import your existing contact records cleanly into the system.",
          ],
          example: "Your team opens one screen to see every deal, phone number, and recent note.",
          benefit: "Keeps all customer records in one shared place so your team stays aligned.",
          tools: "Depends on: your chosen CRM like HubSpot or Zoho. Platform subscription fees are agreed in the written proposal.",
        },
      },
      {
        name: "Lead Capture, Qualification and Assignment",
        details: {
          what: "We log new leads, check who is ready to buy, and alert your team.",
          problem: "Enquiries sit in an unread inbox for hours before anyone notices them.",
          steps: [
            "A new enquiry arrives from your website or lead form.",
            "The system logs the contact and checks what they need.",
            "It sends an alert to the right salesperson.",
          ],
          example: "A buyer fills a form. The system assigns them to your sales rep with an alert.",
          benefit: "Speeds up reply times so your team talks to buyers while interest is high.",
          tools: "Depends on: forms, lead channels, and CRM connections. Third-party tool fees are agreed in the written proposal.",
        },
      },
      {
        name: "Sales Pipeline Automation and Stage Tracking",
        details: {
          what: "We set up automations that update deal stages and task reminders as deals move forward.",
          problem: "Sales reps forget to update deal stages, leaving owners without a clear sales view.",
          steps: [
            "We create clear stages from first contact to sale.",
            "Deals move forward when meetings are booked or quotes are sent.",
            "The system creates reminders for deals that need follow-up.",
          ],
          example: "When a client books a call, their card moves to Meeting Booked on your board.",
          benefit: "Gives your sales team a clear daily list and shows owners deal progress.",
          tools: "Depends on: CRM features and rules set for your team. Software costs are agreed in the written proposal.",
        },
      },
      {
        name: "Automated Follow-ups and Lead Nurturing",
        details: {
          what: "We set up timed follow-up messages by email to stay in touch with buyers.",
          problem: "Staff forget to follow up after sending quotes, so interested buyers look elsewhere.",
          steps: [
            "A buyer receives a proposal or service quote.",
            "The system schedules gentle follow-up reminders.",
            "Automations stop as soon as the buyer replies or books a call.",
          ],
          example: "Three days after a quote is sent, an email asks if the buyer has questions.",
          benefit: "Helps keep deals moving without staff having to remember every follow-up by hand.",
          tools: "Depends on: setup, buyer consent, and messaging rules. Email or messaging fees are agreed in the written proposal.",
        },
      },
      {
        name: "Appointment and Meeting Booking Integration",
        details: {
          what: "We connect booking tools to your CRM so meetings update client timelines automatically.",
          problem: "Staff forget to log booked calls in the CRM, creating blind spots in deal records.",
          steps: [
            "A buyer picks an open time on your booking link.",
            "The booking tool puts the meeting on both calendars.",
            "The CRM updates the client record with meeting details.",
          ],
          example: "A client books a call online, and the meeting appears inside their CRM record.",
          benefit: "Removes manual entry and keeps all meeting notes inside your sales list.",
          tools: "Depends on: connected calendar tools like Google Calendar. Third-party software fees are agreed in the written proposal.",
        },
      },
      {
        name: "Lost-Lead Reactivation and CRM AI Integration",
        details: {
          what: "We set up steps to review quiet leads and send permitted check-in messages.",
          problem: "Old leads sit untouched in your CRM even though they once wanted to buy.",
          steps: [
            "The CRM finds older leads that did not turn into sales.",
            "AI tools help draft simple follow-up notes for past leads.",
            "Your team checks and approves any message before it goes out.",
          ],
          example: "Your team reviews older leads, approves a polite check-in, and reconnects with past buyers.",
          benefit: "Helps find new sales from existing records with human review on every note.",
          tools: "Depends on: buyer consent, CRM features, and setup. AI model and platform costs are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Your sales steps, team size, and budget. Software and setup costs are agreed in the written proposal.",
    intro:
      "We help you manage leads, track sales, and follow up with buyers. We organise your CRM so your team can focus on closing deals.",
    useCases: [
      "Send website enquiries to the right salesperson.",
      "Schedule follow-up emails or permitted WhatsApp notes.",
      "Track leads from first contact to a sale.",
      "Send an alert to sales staff when a new lead arrives.",
      "Find leads that have not received a reply.",
      "Help teams reconnect with older leads where rules and consent allow it.",
    ],
    howItWorks: [
      "We map your sales steps from first contact to closing a deal.",
      "We set up your CRM stages, fields, and lead assignment rules.",
      "We build automated follow-up steps and meeting booking links.",
      "We give you simple guide notes on how to use the system.",
    ],
    limits: [
      "A CRM needs your team to use it daily to keep records fresh.",
      "CRM subscription costs depend on your chosen tool and are agreed in your proposal.",
      "We do not push one CRM brand; we pick what fits your budget.",
    ],
    faq: [
      {
        question: "Do we have to buy a specific CRM?",
        answer:
          "No. We work with your CRM or suggest one that fits your budget and team.",
      },
      {
        question: "Will automated follow-ups spam our leads?",
        answer:
          "No. We build polite sequences that stop as soon as a person replies.",
      },
      {
        question: "Can you connect our website and WhatsApp leads to the CRM?",
        answer:
          "Yes. We connect your forms and chat tools so leads save to your CRM automatically.",
      },
    ],
  },
  {
    id: "business-workflow-automation",
    index: "03",
    title: "Business Workflow Automation",
    seoTitle: "n8n & Business Workflow Automation",
    metaDescription:
      "We connect your business apps using n8n, Make, and custom APIs. Move data automatically between sheets, forms, and tools without typing mistakes.",
    tag: "Connected systems",
    icon: Workflow,
    summary:
      "We connect your business apps. Software does repeat tasks so your team saves time.",
    solves:
      "Typing data twice between apps, messy form entries, and time lost on repeat reports.",
    capabilities: [
      {
        name: "n8n, Make.com and Zapier Workflow Automation",
        details: {
          what: "We build automations using n8n, Make.com, or Zapier. These tools connect apps to cut repeat work.",
          problem: "Staff spend hours every week copying data across different software tools.",
          steps: [
            "An event happens in one app, like a new form entry.",
            "The tool receives the data and runs the next steps.",
            "It updates your other apps and alerts your team if errors occur.",
          ],
          example: "When an order comes in online, the system creates an invoice and alerts your team.",
          benefit: "Saves team hours and stops typing mistakes by passing data between apps automatically.",
          tools: "Depends on: setup and accounts on n8n, Make.com, or Zapier. Tool fees are agreed in the written proposal.",
        },
      },
      {
        name: "API and Webhook Integrations Between Apps",
        details: {
          what: "We connect your apps directly so software tools can share information in real time.",
          problem: "Apps do not talk to each other, forcing staff to copy and paste files.",
          steps: [
            "One app completes an action and sends an update.",
            "The second app reads the update and saves the details.",
            "Both systems stay updated without anyone moving files by hand.",
          ],
          example: "A payment comes in, and your billing tool marks the invoice paid automatically.",
          benefit: "Keeps your systems updated without moving files or typing data twice.",
          tools: "Depends on: app connections and software permissions. Setup and provider fees are agreed in the written proposal.",
        },
      },
      {
        name: "Google Sheets and Google Workspace Automation",
        details: {
          what: "We automate Google Sheets and Gmail so updates and emails run without manual entry.",
          problem: "Staff spend hours typing numbers into sheets and sending standard emails by hand.",
          steps: [
            "New data arrives from your forms or tools.",
            "Automated scripts add clean rows to your Google Sheet.",
            "The system creates documents or sends alert emails as needed.",
          ],
          example: "Each new job adds a row to your Google Sheet, updating totals without manual typing.",
          benefit: "Keeps spreadsheets up to date using tools your team already knows.",
          tools: "Depends on: Google Workspace setup and permissions. Software fees are agreed in the written proposal.",
        },
      },
      {
        name: "Database Automation and Document Processing",
        details: {
          what: "We build tools that read, sort, and save incoming files inside organised databases.",
          problem: "Invoices and client files get lost in unread inboxes and scattered folders.",
          steps: [
            "A document arrives through email or a file upload.",
            "The tool reads key details like dates and amounts.",
            "It saves the file in cloud storage and logs details.",
          ],
          example: "Supplier bills are saved to cloud folders, and invoice totals are logged in your database.",
          benefit: "Keeps business records safe, organised, and easy to find for accounting.",
          tools: "Depends on: database setup and cloud storage. Storage and tool fees are agreed in the written proposal.",
        },
      },
      {
        name: "Approval Workflows with Human Review",
        details: {
          what: "We build steps that pause and ask for manager sign-off before key actions run.",
          problem: "Owners worry that automated tools will send discounts or refunds without supervision.",
          steps: [
            "A tool triggers an action that needs manager approval.",
            "An alert is sent to a manager by chat or email.",
            "The tool proceeds only after the manager approves the request.",
          ],
          example: "A salesperson asks for a discount. The manager gets an alert and approves it.",
          benefit: "Brings the speed of automation with full human control on key decisions.",
          tools: "Depends on: chat tools like Slack or email. Tool fees are agreed in the written proposal.",
        },
      },
      {
        name: "Scheduled Reports and Notifications",
        details: {
          what: "We set up reports that gather numbers and send summaries to your team on time.",
          problem: "Managers spend hours gathering numbers from different tools to make routine reports.",
          steps: [
            "A scheduled timer runs on chosen days and times.",
            "The system gathers sales and job numbers from your tools.",
            "It sends a clean summary by email or chat.",
          ],
          example: "Every Monday morning, leaders get an email showing last week's new enquiries and jobs.",
          benefit: "Keeps leaders informed with regular updates without staff making reports by hand.",
          tools: "Depends on: your data sources and delivery tools. Tool fees are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Your existing tools and app permissions. Software and platform fees are agreed in the written proposal.",
    intro:
      "We connect your business apps so information moves automatically. Software does repeat tasks in the background so your team saves time.",
    useCases: [
      "Save website form entries to a CRM or spreadsheet.",
      "Move information between connected business apps.",
      "Create reports and send scheduled alerts.",
      "Organise documents and process incoming records.",
      "Ask a manager to approve important actions.",
      "Connect calendars, spreadsheets, and business tools.",
    ],
    howItWorks: [
      "We find the slow spots taking up your team's hours.",
      "We check whether simple rules or AI fit each step best.",
      "We build the connection using tools like n8n or Make.com.",
      "We test real cases before going live and show you how it works.",
    ],
    limits: [
      "Automations need supported app connections from your software tools.",
      "Platform runner charges like Make.com or n8n are agreed in your written proposal.",
      "Rule-based tools need steady data formats to run without stopping.",
    ],
    faq: [
      {
        question: "Do we always need AI for automation?",
        answer:
          "No. Simple rule-based tools are often faster, cheaper, and more reliable for repeat tasks.",
      },
      {
        question: "What happens if an app connection fails?",
        answer:
          "We set up retry steps and alerts. Your team is told if a tool stops.",
      },
      {
        question: "Do you lock us into secret software?",
        answer:
          "No. We build on open tools like n8n or popular tools like Make.com.",
      },
    ],
  },
  {
    id: "whatsapp-social-automation",
    index: "04",
    title: "WhatsApp & Social Automation",
    seoTitle: "WhatsApp Business Automation & Chatbots",
    metaDescription:
      "We build official WhatsApp Business automation tools to answer customer questions, capture leads, and send booking reminders using approved templates.",
    tag: "Messaging channels",
    icon: MessageCircle,
    summary:
      "We help you reply to enquiries and collect leads on WhatsApp and social chat.",
    solves:
      "Piles of repeat messages, slow replies at busy times, and manual booking over chat.",
    capabilities: [
      {
        name: "WhatsApp Business Automation and AI Chatbots",
        details: {
          what: "We set up assistants for WhatsApp Business numbers to answer repeat questions and guide leads.",
          problem: "Customers message on WhatsApp and wait hours for answers when staff are busy.",
          steps: [
            "A customer messages your official WhatsApp Business number.",
            "The assistant gives approved answers to common questions.",
            "It helps them take the next step, like asking for a call.",
          ],
          example: "A customer asks on WhatsApp for your store hours. The tool sends a quick reply with a map.",
          benefit: "Gives quick replies on the chat app your customers use every day.",
          tools: "Depends on: Meta WhatsApp Business API setup and account review. Meta fees are agreed in the written proposal.",
        },
      },
      {
        name: "Automated Replies and Approved Template Follow-ups",
        details: {
          what: "We set up greeting replies and approved templates for customers who agreed to get messages.",
          problem: "Staff forget to send booking confirmations or reminders to clients over chat.",
          steps: [
            "Customers agree to get business updates on WhatsApp.",
            "A confirmed booking triggers an approved message template.",
            "The template arrives with details and reply buttons.",
          ],
          example: "After a client books a visit, an approved WhatsApp reminder arrives with buttons to confirm.",
          benefit: "Keeps clients informed and cuts missed visits using approved WhatsApp message rules.",
          tools: "Depends on: customer opt-in and Meta template approval. Meta conversation fees are agreed in the written proposal.",
        },
      },
      {
        name: "Instagram and Facebook Chatbots, Where Supported",
        details: {
          what: "We build chat helpers for Instagram and Facebook pages to answer common questions.",
          problem: "Buyers send direct messages on social pages and leave when no one replies.",
          steps: [
            "A person sends a direct message to your business page.",
            "The chat helper answers common questions with approved details.",
            "It shares links or takes contact details for follow-up.",
          ],
          example: "A user asks for prices on Instagram. The tool shares details and callback options.",
          benefit: "Engages interested social buyers quickly while they view your page.",
          tools: "Depends on: Meta business page setup and permissions. Platform fees are agreed in the written proposal.",
        },
      },
      {
        name: "Lead Capture and Qualification Over Chat",
        details: {
          what: "We build chat steps that ask what buyers need. They save details for your sales team.",
          problem: "Getting bare messages like 'hi' or 'price' without knowing what the buyer wants.",
          steps: [
            "A customer starts a chat on WhatsApp or social media.",
            "The assistant asks what they need and where they are located.",
            "It saves the details and alerts your sales team.",
          ],
          example: "A buyer chats on WhatsApp. The tool asks what they need and alerts your salesperson.",
          benefit: "Delivers organised lead notes to your sales team instead of messy chat threads.",
          tools: "Depends on: chat channels and CRM or sheet connection. Tool fees are agreed in the written proposal.",
        },
      },
      {
        name: "Appointment Booking Over Messaging Channels",
        details: {
          what: "We connect booking tools to chat so customers can choose open times and schedule visits.",
          problem: "Customers and staff spend days exchanging chat messages trying to agree on a time.",
          steps: [
            "A customer asks to book a visit in chat.",
            "The tool checks open times on your connected calendar.",
            "It confirms the chosen time and sends a calendar invite.",
          ],
          example: "A client books a visit in chat. They pick an open time and get a booking confirmation.",
          benefit: "Makes booking visits simple inside the chat apps your customers already use.",
          tools: "Depends on: calendar connections like Google Calendar. Software fees are agreed in the written proposal.",
        },
      },
      {
        name: "Human Handoff for Complex or Sensitive Enquiries",
        details: {
          what: "We set up handoff rules. Chats pass to a team member whenever a person is needed.",
          problem: "Customers get annoyed when automated tools cannot answer unique questions.",
          steps: [
            "The tool detects a hard question or a request for a human.",
            "It tells the customer that a team member is stepping in.",
            "It pauses automated replies and alerts your staff.",
          ],
          example: "A customer has a unique billing question. The tool pauses and alerts your staff.",
          benefit: "Ensures customers get real human care when questions are hard.",
          tools: "Depends on: shared inbox setup like Chatwoot or CRM chat. Software fees are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Official platform access, account verification, and template approval. Costs are agreed in the written proposal.",
    intro:
      "We help businesses reply to enquiries and collect leads on WhatsApp and social chat. We automate simple replies and pass hard chats to your team.",
    useCases: [
      "Answer common WhatsApp Business enquiries.",
      "Collect customer details from incoming chat messages.",
      "Send visit confirmations and reminder notes.",
      "Follow up using approved templates when permitted.",
      "Collect leads from supported social chat channels.",
      "Pass a chat to a person when needed.",
    ],
    howItWorks: [
      "We check your Meta account and guide you through official WhatsApp setup.",
      "We design simple chat steps for common questions and visit requests.",
      "We submit message templates to Meta for approval before sending out messages.",
      "We connect the chat tool to your calendar, CRM, or team alert channel.",
    ],
    limits: [
      "Business accounts and outgoing templates must be approved by Meta.",
      "WhatsApp provider charges and Meta conversation fees are agreed in your written proposal.",
      "People must agree before they get business messages. Spam is not allowed.",
    ],
    faq: [
      {
        question: "Can we message anyone without them asking?",
        answer:
          "No. People must agree first, and outgoing notes must use templates approved by WhatsApp.",
      },
      {
        question: "Are WhatsApp conversation fees included in your setup fee?",
        answer:
          "Platform fees and Meta conversation charges are agreed in your written proposal.",
      },
      {
        question: "Can a person step in during a chat?",
        answer:
          "Yes. We add a clear way for a person to step in.",
      },
    ],
  },
];
