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
    tag: "Customer-facing AI",
    icon: Bot,
    summary:
      "We build AI tools that answer customer questions, collect leads, help with sales and handle routine tasks.",
    solves:
      "Slow replies to customer questions, missed enquiries after hours, and staff spending hours answering repetitive questions.",
    capabilities: [
      {
        name: "AI Sales Agents",
        details: {
          what: "We build automated sales assistants that answer questions about products or services and collect requirements from interested buyers.",
          problem: "Website visitors leave without buying when no team member is available to answer questions about pricing or packages.",
          steps: [
            "The assistant answers visitor questions using approved pricing and service notes.",
            "It asks simple questions to understand the visitor's budget and requirements.",
            "It forwards the lead details to your sales team to follow up.",
          ],
          example: "A website visitor asks about service costs. The assistant shares approved price ranges and sends the lead to your sales team.",
          benefit: "Your business captures more sales leads during busy periods without adding manual desk work.",
          tools: "Depends on: website chat setup, approved pricing notes, and connected sales software. Third-party fees are agreed in the written proposal.",
        },
      },
      {
        name: "AI Customer Support Agents",
        details: {
          what: "We build customer support assistants that answer common questions using only your approved guides and business documents.",
          problem: "Customers wait for answers to simple questions while your team spends hours typing the same replies repeatedly.",
          steps: [
            "A customer sends a common question through chat.",
            "The assistant answers using only your approved reference documents.",
            "It transfers difficult or sensitive questions to a human team member.",
          ],
          example: "A customer asks about return rules or business hours, and receives a clear answer drawn from your approved guide.",
          benefit: "Customers receive quick answers to routine questions, freeing your staff to handle complex customer issues.",
          tools: "Depends on: approved business documents, FAQs, and connected support software. Third-party model fees are agreed in the written proposal.",
        },
      },
      {
        name: "Website AI Chatbots",
        details: {
          what: "We build chat widgets for websites that greet visitors, answer basic questions, and collect contact details.",
          problem: "Most website visitors browse pages for a moment and leave without reaching out or leaving contact details.",
          steps: [
            "A visitor lands on your website and opens the chat box.",
            "The chatbot answers questions about your services using approved information.",
            "It asks for a name and phone number for a callback.",
          ],
          example: "A visitor asks if you accept new clients this month and leaves a phone number so your team can call back.",
          benefit: "Turns website traffic into real business enquiries so interested visitors can connect with your team.",
          tools: "Depends on: website platform compatibility and integration setup. Third-party software fees are agreed in the written proposal.",
        },
      },
      {
        name: "AI Lead Qualification Agents",
        details: {
          what: "We build intake assistants that ask prospective clients key questions to check if they match your business requirements.",
          problem: "Sales reps spend hours on calls with enquiries that do not have the right budget or project scope.",
          steps: [
            "A new prospect sends an enquiry through chat or a form.",
            "The assistant asks about their timeline, location, and budget range.",
            "It sorts qualified enquiries and alerts your sales team.",
          ],
          example: "A client enquires about custom work. The assistant checks their budget against your scope and alerts your senior sales rep.",
          benefit: "Your sales team spends their time speaking with qualified prospective buyers who fit your services.",
          tools: "Depends on: agreed qualification rules, form setup, and connected sales database. Third-party fees are agreed in the written proposal.",
        },
      },
      {
        name: "AI Voice Agents, where supported",
        details: {
          what: "We configure voice assistants that answer incoming phone calls, share approved company information, and collect caller details.",
          problem: "Missed phone calls when staff are busy or away from the desk lead to lost customer enquiries.",
          steps: [
            "A customer dials your business phone number.",
            "The voice assistant answers with approved details and records caller requests.",
            "It sends the call summary and contact details to your team.",
          ],
          example: "A caller dials to check office hours and leave a callback request. The voice assistant logs their number and notifies staff.",
          benefit: "Captures caller requests even when your team is away from the phone, without replacing human staff.",
          tools: "Depends on: setup, telephony provider support, phone numbers, and platform availability. Telephony and platform fees are agreed in the written proposal.",
        },
      },
      {
        name: "AI Appointment Booking Agents",
        details: {
          what: "We build booking assistants that check connected calendar availability, offer open time slots, and schedule meetings.",
          problem: "Staff and customers waste time sending back-and-forth messages trying to find an open meeting time.",
          steps: [
            "A customer requests a meeting or consultation time.",
            "The assistant checks open slots on a connected business calendar.",
            "It schedules the chosen time and sends confirmation details.",
          ],
          example: "A prospect requests a consultation call, chooses an open slot shown from your calendar, and receives a confirmed booking notice.",
          benefit: "Saves scheduling time and helps potential clients book meetings quickly using your connected calendar.",
          tools: "Depends on: setup with an active connected calendar like Google Calendar. Integration and software fees are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Your business data, chosen AI model, integrations and budget. Fees and third-party costs are agreed in the written proposal.",
    intro:
      "We build AI tools that answer customer questions, collect leads, help with sales and handle routine tasks. We configure custom assistants for your website and messaging channels using only your approved business documents.",
    useCases: [
      "Answer customer questions on a website or messaging channel.",
      "Ask potential customers about their needs and budget.",
      "Collect customer details and send qualified leads to the sales team.",
      "Help customers book appointments.",
      "Handle common questions using approved business information.",
      "Transfer complex or sensitive conversations to a human.",
    ],
    howItWorks: [
      "We review your existing documents, FAQs, and common customer questions to define the knowledge base.",
      "We configure the AI agent with strict guardrails so it only answers from approved content.",
      "We test the agent against real customer scenarios and edge cases to ensure reliable responses.",
      "We connect the agent to your website or chat tool with built-in human handoff.",
    ],
    limits: [
      "AI models require clear source information and cannot invent answers accurately without documentation.",
      "AI usage fees from model providers carry variable costs which are agreed in the written proposal.",
      "Healthcare AI handles administrative scheduling only and never provides clinical or medical advice.",
    ],
    faq: [
      {
        question: "Will the AI chatbot invent false answers?",
        answer:
          "We configure agents with strict guardrails to answer solely from approved business documents and escalate unfamiliar questions to your team.",
      },
      {
        question: "What happens when a customer has a complex problem?",
        answer:
          "The agent recognizes limits and passes the enquiry to a team member along with the conversation summary.",
      },
      {
        question: "How are AI usage fees handled?",
        answer:
          "Third-party AI model usage carries variable costs, and software fees are agreed in the written proposal.",
      },
    ],
  },
  {
    id: "crm-sales-automation",
    index: "02",
    title: "CRM & Sales Automation",
    tag: "Pipeline & follow-ups",
    icon: TrendingUp,
    summary:
      "We help businesses manage leads, track sales and follow up with potential customers without doing every step manually.",
    solves:
      "Scattered lead records, delayed follow-ups and manual pipeline updates.",
    capabilities: [
      {
        name: "CRM Setup and Customisation",
        details: {
          what: "We set up and customise customer relationship management systems so client records and sales stages are neatly organised.",
          problem: "Customer notes and phone numbers are scattered across personal devices, notebooks, and messy spreadsheets.",
          steps: [
            "We review your sales process and identify the fields you need.",
            "We configure contact views, deal stages, and pipelines in your CRM.",
            "We import existing contact records cleanly into the new system.",
          ],
          example: "Your sales team opens one dashboard to view every active deal, contact number, and note from the last call.",
          benefit: "Keeps all customer records organised in one shared system so your team stays on the same page.",
          tools: "Depends on: your chosen CRM platform such as HubSpot or Zoho. Platform subscription fees are agreed in the written proposal.",
        },
      },
      {
        name: "Lead Capture, Qualification and Assignment",
        details: {
          what: "We automate lead intake so new enquiries are logged, checked against your rules, and assigned to the right salesperson.",
          problem: "Enquiries sit in an unmonitored inbox for hours before a team member notices them and assigns them.",
          steps: [
            "A new enquiry arrives from your website or marketing forms.",
            "The system creates a contact record and checks qualification criteria.",
            "It assigns the lead to the appropriate salesperson and sends an alert.",
          ],
          example: "A commercial property enquiry arrives online and is routed directly to your commercial sales specialist with an email alert.",
          benefit: "Speeds up lead response times so your sales team can contact prospective clients while interest is high.",
          tools: "Depends on: setup between your website forms, lead channels, and CRM. Third-party tool fees are agreed in the written proposal.",
        },
      },
      {
        name: "Sales Pipeline Automation and Stage Tracking",
        details: {
          what: "We build pipeline automations that update deal stages and task reminders as sales milestones are reached.",
          problem: "Sales reps forget to update deal stages, leaving managers without clear visibility into upcoming business revenue.",
          steps: [
            "We create clear pipeline stages from initial enquiry to closed deal.",
            "Deals advance automatically when meetings are booked or proposals sent.",
            "Reminders are created for deals that require follow-up.",
          ],
          example: "When a client books a discovery call, their deal card moves automatically to Meeting Booked on your pipeline board.",
          benefit: "Gives your sales team a clear daily action list and gives management full visibility into deal progress.",
          tools: "Depends on: CRM capabilities and workflow rules configured for your team. Software subscription costs are agreed in the written proposal.",
        },
      },
      {
        name: "Automated Follow-ups and Lead Nurturing",
        details: {
          what: "We configure timed follow-up messages sent by email or permitted messaging channels to stay in touch with prospects.",
          problem: "Sales reps forget to follow up after sending quotations, causing interested prospects to look elsewhere.",
          steps: [
            "A prospect receives a proposal or service quote.",
            "The system schedules gentle follow-ups according to agreed rules.",
            "Automated sequences stop immediately when the prospect replies or books a call.",
          ],
          example: "Three days after a quotation is delivered, an automated email asks if the prospect has questions about the proposal.",
          benefit: "Helps keep deals moving forward without requiring sales staff to remember every follow-up manually.",
          tools: "Depends on: setup, recipient consent, and messaging platform policies. Email or messaging tool fees are agreed in the written proposal.",
        },
      },
      {
        name: "Appointment and Meeting Booking Integration",
        details: {
          what: "We connect scheduling tools to your CRM so booked appointments create contacts and update deal timelines automatically.",
          problem: "Sales reps forget to log scheduled calls in the CRM, creating blind spots in deal histories.",
          steps: [
            "A prospect selects an open time on your scheduling link.",
            "The scheduling tool books the calendar event for both parties.",
            "The CRM updates the prospect record with meeting details.",
          ],
          example: "A prospect books a consultation through your scheduling link, and the meeting is recorded inside their CRM record.",
          benefit: "Eliminates double entry and keeps complete records of every customer meeting inside your sales database.",
          tools: "Depends on: setup with supported calendar tools like Google Calendar or Calendly. Third-party software fees are agreed in the written proposal.",
        },
      },
      {
        name: "Lost-Lead Reactivation and CRM AI Integration",
        details: {
          what: "We build workflows and AI-assisted summaries to help review quiet leads and reach out with permitted re-engagement messages.",
          problem: "Old leads sit untouched in your CRM even though they previously showed interest in your services.",
          steps: [
            "The CRM identifies older leads that did not convert into sales.",
            "AI tools help summarise previous notes to suggest relevant follow-up messages.",
            "Your team reviews and approves any messages before they are sent.",
          ],
          example: "Your team reviews past leads from six months ago, approves a polite seasonal check-in, and reconnects with interested clients.",
          benefit: "Helps generate opportunities from existing customer records with human oversight on every message.",
          tools: "Depends on: setup, customer consent, and CRM features. AI model and platform costs are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Your current sales workflow, team size and budget. Software and setup costs are agreed in the written proposal.",
    intro:
      "We help businesses manage leads, track sales and follow up with potential customers without doing every step manually. We organise your CRM and sales pipeline so your team can focus on closing deals.",
    useCases: [
      "Send website enquiries to the right salesperson.",
      "Schedule follow-up emails or permitted WhatsApp messages.",
      "Track leads from first contact to a sale.",
      "Notify sales staff when a new lead arrives.",
      "Find leads that have not received a reply.",
      "Help teams reconnect with older leads where permission and applicable messaging rules allow it.",
    ],
    howItWorks: [
      "We map your current sales process from lead intake to closing.",
      "We configure your CRM pipeline stages, lead fields, and automated ownership rules.",
      "We build automated follow-up sequences and meeting booking links.",
      "We train your team on pipeline management and provide reference documentation.",
    ],
    limits: [
      "A CRM system requires consistent team adoption to keep customer records up to date.",
      "CRM software subscription costs depend on your chosen vendor and are agreed in the written proposal.",
      "We do not push any single CRM vendor; recommendations depend on your budget and requirements.",
    ],
    faq: [
      {
        question: "Do we have to buy a specific CRM software?",
        answer:
          "No. We work with your existing CRM or recommend one that fits your budget, team size, and workflow.",
      },
      {
        question: "Will automation spam our prospective leads?",
        answer:
          "No. We build sensible, respectful follow-up sequences that pause immediately when a prospect replies or books a meeting.",
      },
      {
        question: "Can you connect our website and WhatsApp leads to the CRM?",
        answer:
          "Yes. We connect your website forms and chat channels so all enquiries create centralized CRM records automatically.",
      },
    ],
  },
  {
    id: "business-workflow-automation",
    index: "03",
    title: "Business Workflow Automation",
    tag: "Connected systems",
    icon: Workflow,
    summary:
      "We connect business apps and automate repeat tasks so teams spend less time on manual work.",
    solves:
      "Manual data entry between apps, unstructured form submissions and time-consuming routine reporting.",
    capabilities: [
      {
        name: "n8n, Make.com and Zapier Workflow Automation",
        details: {
          what: "We build automated workflows using n8n, Make.com and Zapier, which are tools that connect apps to eliminate repetitive manual work.",
          problem: "Team members spend hours every week copying data across different software applications and tools.",
          steps: [
            "An event happens in one app, such as a new form entry.",
            "The workflow tool receives the data and runs connected action steps.",
            "It updates other business apps and alerts your team if errors occur.",
          ],
          example: "When an order is submitted online, the system creates an invoice in accounting and alerts your fulfillment team.",
          benefit: "Saves team hours and reduces manual data errors by passing information automatically across connected software.",
          tools: "Depends on: setup and account access on n8n, Make.com, or Zapier. Runner and hosting fees are agreed in the written proposal.",
        },
      },
      {
        name: "API and Webhook Integrations Between Apps",
        details: {
          what: "We connect business applications directly through APIs and webhooks so software tools can share information in real time.",
          problem: "Apps do not communicate directly, requiring staff to export and import spreadsheet files repeatedly.",
          steps: [
            "One application finishes an action and triggers a secure webhook message.",
            "The receiving app reads the transmitted payload and updates its database.",
            "Both systems stay synchronized without manual data file transfers.",
          ],
          example: "A payment gateway notifies your billing system when payment arrives, marking the invoice as paid without staff involvement.",
          benefit: "Keeps your systems updated across platforms without requiring manual exports or file uploads.",
          tools: "Depends on: API access and webhook support from your software vendors. Integration and provider fees are agreed in the written proposal.",
        },
      },
      {
        name: "Google Sheets and Google Workspace Automation",
        details: {
          what: "We automate Google Sheets, Docs, and Gmail so data updates, documents, and notifications run without manual entry.",
          problem: "Staff spend hours typing numbers into spreadsheets, copying templates, and sending standard operational emails.",
          steps: [
            "Data arrives from your business tools or web forms.",
            "Automated scripts write clean rows into your Google Sheet tabs.",
            "The system generates documents or sends notification emails as required.",
          ],
          example: "Each daily job adds a clean entry to your master Google Sheet, updating totals without anyone typing figures manually.",
          benefit: "Gives you accurate, up-to-date spreadsheets and documents using tools your team already knows how to use.",
          tools: "Depends on: setup within your Google Workspace account and permissions. Software and platform fees are agreed in the written proposal.",
        },
      },
      {
        name: "Database Automation and Document Processing",
        details: {
          what: "We build automations that validate, organize, and store incoming files and structured records inside connected databases.",
          problem: "Important invoices, receipts, and client documents get lost in email inboxes and scattered download folders.",
          steps: [
            "A document arrives through email or a file upload.",
            "The system extracts key details like dates, amounts, and vendor names.",
            "It files the document in cloud storage and logs record details.",
          ],
          example: "Incoming supplier receipts are saved to designated cloud folders and key invoice figures are recorded in your database.",
          benefit: "Keeps company records organized, secure, and searchable for accounting and audit needs.",
          tools: "Depends on: database access like PostgreSQL or Airtable and cloud storage. Storage and platform fees are agreed in the written proposal.",
        },
      },
      {
        name: "Approval Workflows with Human Review",
        details: {
          what: "We build automated approval paths that pause and require human sign-off before sensitive business actions are completed.",
          problem: "Teams worry that automations will issue refunds, discounts, or sensitive messages without manager supervision.",
          steps: [
            "A workflow triggers an action that requires management approval.",
            "An approval request is sent to an authorized manager via chat or email.",
            "The workflow proceeds only after the manager approves the request.",
          ],
          example: "A sales rep requests a fee discount. The manager receives an alert on chat, reviews the details, and approves the proposal.",
          benefit: "Combines the speed of automated workflows with essential human review on sensitive decisions.",
          tools: "Depends on: messaging tools like Slack or email and workflow engine configuration. Software fees are agreed in the written proposal.",
        },
      },
      {
        name: "Scheduled Reports and Notifications",
        details: {
          what: "We configure automated reports that collect business metrics and deliver summaries to your team on agreed schedules.",
          problem: "Managers spend hours every week gathering numbers from separate tools to create routine status reports.",
          steps: [
            "A scheduled trigger runs on chosen days and times.",
            "The system gathers operational and sales figures from your apps.",
            "It compiles a clean summary and delivers it via email or chat.",
          ],
          example: "Every Monday morning, management receives an email summarizing the previous week's new enquiries, completed jobs, and response times.",
          benefit: "Keeps business leaders informed with consistent reporting without staff wasting time making manual reports.",
          tools: "Depends on: data sources, connected apps, and delivery channels like email. Third-party software fees are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Your existing tools, API access and permissions. Software and platform fees are agreed in the written proposal.",
    intro:
      "We connect business apps and automate repeat tasks so teams spend less time on manual work. We link your everyday software tools together so information moves smoothly in the background without copy-pasting.",
    useCases: [
      "Save website form submissions to a CRM or spreadsheet.",
      "Move information between connected business apps.",
      "Generate reports and send scheduled notifications.",
      "Organise documents and process incoming information.",
      "Ask a team member to approve important actions.",
      "Connect calendars, databases and business tools.",
    ],
    howItWorks: [
      "We identify the repetitive operational bottleneck taking up your team's hours.",
      "We evaluate whether simple rules or AI are best suited for each step.",
      "We build the workflow using tools like n8n or Make.com with error notifications.",
      "We test edge cases thoroughly before launching and handing over system documentation.",
    ],
    limits: [
      "Automations require supported APIs or webhooks from your existing software tools.",
      "Third-party platform hosting or runner charges (such as Make.com or n8n cloud) are agreed in the written proposal.",
      "Rule-based automations depend on consistent input data structures to operate without interruption.",
    ],
    faq: [
      {
        question: "Do we always need AI for workflow automation?",
        answer:
          "No. Plain rule-based automation is often faster, cheaper, and more predictable for routine tasks like data syncing.",
      },
      {
        question: "What happens if an API connection fails?",
        answer:
          "We build retry logic and alert notifications so your team is informed if an integrated service goes down.",
      },
      {
        question: "Do you lock us into proprietary software?",
        answer:
          "No. We build on open tools like n8n or popular platforms like Make.com and fully document your workflows.",
      },
    ],
  },
  {
    id: "whatsapp-social-automation",
    index: "04",
    title: "WhatsApp & Social Automation",
    tag: "Messaging channels",
    icon: MessageCircle,
    summary:
      "We help businesses reply to enquiries, collect leads and send useful updates through supported messaging and social channels.",
    solves:
      "Backlogs of repetitive messages, delayed responses during peak hours and manual booking over chat.",
    capabilities: [
      {
        name: "WhatsApp Business Automation and AI Chatbots",
        details: {
          what: "We configure assistants for official WhatsApp Business numbers to answer routine questions and guide customer enquiries.",
          problem: "Customers message your business on WhatsApp and wait hours for answers because staff are occupied.",
          steps: [
            "A customer messages your official WhatsApp Business number.",
            "The assistant provides approved answers to common questions.",
            "It helps them take the next step, like requesting a callback.",
          ],
          example: "A customer asks on WhatsApp for your store hours and address, and receives a helpful reply with a map link.",
          benefit: "Provides responsive replies on the messaging app your customers use daily, improving communication.",
          tools: "Depends on: Meta WhatsApp Business API approval, account verification, and BSP setup. Platform and conversation fees are agreed in the written proposal.",
        },
      },
      {
        name: "Automated Replies and Approved Template Follow-ups",
        details: {
          what: "We set up automated greeting replies and Meta-approved message templates for customers who have opted in.",
          problem: "Staff forget to send booking confirmations or appointment reminders to clients who expect chat updates.",
          steps: [
            "Customers provide consent to receive business notifications on WhatsApp.",
            "An event like a confirmed booking triggers an approved message template.",
            "The template message is delivered with details and response buttons.",
          ],
          example: "After a client schedules an appointment, an approved WhatsApp template reminder is sent 24 hours prior with buttons to confirm.",
          benefit: "Keeps clients informed and reduces missed appointments while following official WhatsApp messaging policies.",
          tools: "Depends on: recipient opt-in, Meta template approval, and WhatsApp API rules. Meta conversation fees are agreed in the written proposal.",
        },
      },
      {
        name: "Instagram and Facebook Chatbots, Where Supported",
        details: {
          what: "We build automated chat helpers for official Instagram and Facebook accounts to answer common post and direct-message questions.",
          problem: "Prospective customers send direct messages on social channels and lose interest when nobody replies promptly.",
          steps: [
            "A user sends a direct message to your business social page.",
            "The chat helper recognizes common questions and replies with approved details.",
            "It offers links or collects contact details for personal follow-up.",
          ],
          example: "A user sends a direct message on Instagram asking for service pricing and receives a menu with links and callback options.",
          benefit: "Engages interested social media prospects quickly while they are actively viewing your profile.",
          tools: "Depends on: setup, platform availability, and Meta business page permissions. Software and platform fees are agreed in the written proposal.",
        },
      },
      {
        name: "Lead Capture and Qualification Over Chat",
        details: {
          what: "We build chat sequences that ask prospective customers about their needs and record contact details for your sales team.",
          problem: "Receiving unstructured messages like 'hi' or 'price' without knowing what the customer needs or where they are located.",
          steps: [
            "A customer starts a conversation on WhatsApp or social chat.",
            "The assistant asks simple questions about their requirements and location.",
            "It formats the details and alerts your sales team.",
          ],
          example: "A buyer messages on WhatsApp; the assistant asks what service they need and sends an organised lead card to your salesperson.",
          benefit: "Delivers structured lead details to your sales team instead of unstructured chat threads.",
          tools: "Depends on: setup, messaging channel, and CRM or database connection. Third-party software fees are agreed in the written proposal.",
        },
      },
      {
        name: "Appointment Booking Over Messaging Channels",
        details: {
          what: "We connect scheduling tools to messaging channels so customers can choose open times and book appointments within chat.",
          problem: "Customers and staff spend days exchanging messages back and forth trying to agree on a booking time.",
          steps: [
            "A customer requests a consultation or appointment in chat.",
            "The assistant checks open times on a connected business calendar.",
            "It confirms the chosen time and sends a calendar invite.",
          ],
          example: "A client messages to schedule a consultation, picks an available slot shown from your calendar, and receives confirmation in chat.",
          benefit: "Makes scheduling appointments convenient for customers inside the chat tools they already use.",
          tools: "Depends on: setup, supported calendar connections like Google Calendar, and messaging API. Platform and software fees are agreed in the written proposal.",
        },
      },
      {
        name: "Human Handoff for Complex or Sensitive Enquiries",
        details: {
          what: "We configure seamless handoff rules so conversations transfer to human team members whenever personal assistance is required.",
          problem: "Customers become frustrated when automated assistants cannot answer unique questions or handle sensitive issues.",
          steps: [
            "The assistant detects complex questions, customer frustration, or a human request.",
            "It notifies the customer that a team member is being alerted.",
            "It pauses automated replies and sends chat history to your staff.",
          ],
          example: "A customer has a unique billing question on WhatsApp. The assistant pauses and notifies your support team with the chat history.",
          benefit: "Ensures customers receive real human care when questions are complex, maintaining trust in your business.",
          tools: "Depends on: setup with a multi-user inbox like Chatwoot or CRM chat. Software and platform fees are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Official platform APIs, account verification, template approval and provider charges. Costs are agreed in the written proposal.",
    intro:
      "We help businesses reply to enquiries, collect leads and send useful updates through supported messaging and social channels. We automate replies on official channels while passing complex questions to your team.",
    useCases: [
      "Answer common WhatsApp Business enquiries.",
      "Collect customer details from incoming messages.",
      "Send appointment confirmations and reminders.",
      "Follow up using approved templates when required.",
      "Capture leads from supported social messaging channels.",
      "Transfer a conversation to a human when needed.",
    ],
    howItWorks: [
      "We verify your Meta Business account eligibility and guide you through official API access.",
      "We design conversational flows for common customer questions and booking requests.",
      "We submit official message templates to Meta for approval before launching outgoing messages.",
      "We connect the messaging assistant to your calendar, CRM, or team notification channel.",
    ],
    limits: [
      "All business accounts and outgoing broadcast templates require approval by Meta platform policies.",
      "Meta conversation fees and provider charges for the WhatsApp Cloud API are agreed in the written proposal.",
      "Messaging automations must comply with customer opt-in and consent regulations; unlimited unsolicited messaging is not permitted.",
    ],
    faq: [
      {
        question: "Can we message anyone without prior approval?",
        answer:
          "No. Official WhatsApp rules strictly require user opt-in, and outgoing notifications must use Meta-approved message templates.",
      },
      {
        question: "Are WhatsApp conversation charges included in your setup fee?",
        answer:
          "Platform fees and official Meta conversation charges are agreed in the written proposal.",
      },
      {
        question: "Can staff take over an ongoing chat?",
        answer:
          "Yes. Every chat flow includes human handover triggers so your team can step in whenever a customer needs personal assistance.",
      },
    ],
  },
];
