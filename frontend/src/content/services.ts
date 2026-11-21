import type { LucideIcon } from "lucide-react";
import { Bot, Workflow, MessageCircle, UtensilsCrossed } from "lucide-react";

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

export type SolutionLink = {
  title: string;
  href: string;
  description: string;
};

export type Service = {
  id: string;
  index: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  solutionLink?: SolutionLink;
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
    id: "whatsapp-social-automation",
    index: "02",
    title: "WhatsApp & Social Automation",
    seoTitle: "WhatsApp Business Automation & Chatbots",
    metaDescription:
      "We build official WhatsApp Business automation tools to answer customer questions, capture leads, and send booking reminders using approved templates.",
    solutionLink: {
      title: "WhatsApp Appointment Booking for Clinics",
      href: "/solutions/whatsapp-appointment-booking-clinics",
      description:
        "Explore how clinics automate patient booking, reminders, and calendar updates on WhatsApp.",
    },
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
            "The assistant greets them and answers using approved notes.",
            "It collects customer details and passes hard questions to staff.",
          ],
          example: "A customer asks about store hours on WhatsApp and receives the approved timing note.",
          benefit: "Provides quick replies to common questions so customers get help without waiting.",
          tools: "Depends on: WhatsApp Business API, Meta approval, and phone number access. Meta messaging fees are agreed in the written proposal.",
        },
      },
      {
        name: "Lead Intake and Contact Capture",
        details: {
          what: "We build chat flows that collect names, locations, and requirements from new contacts.",
          problem: "Chats pile up in your inbox with missing details, forcing staff to ask questions by hand.",
          steps: [
            "A new contact reaches out through WhatsApp or social messaging.",
            "The flow asks for name, requirements, and preferred contact time.",
            "It logs the details into your spreadsheet or CRM.",
          ],
          example: "A buyer messages about pricing, leaves their name and details, and is logged into your sheet.",
          benefit: "Gathers complete lead notes so your sales team has facts before reaching out.",
          tools: "Depends on: chat channels, form questions, and CRM setup. Platform fees are agreed in the written proposal.",
        },
      },
      {
        name: "Appointment Reminders and Broadcasts",
        details: {
          what: "We send automated appointment reminders and approved updates to confirmed clients.",
          problem: "Clients forget booked appointments, leaving open calendar gaps and lost income.",
          steps: [
            "A client books a visit or appointment with your business.",
            "The system sends an approved WhatsApp reminder before the booking.",
            "The client confirms or asks to reschedule through chat.",
          ],
          example: "A patient receives a reminder note twenty-four hours before a dental visit.",
          benefit: "Lowers missed bookings and helps staff keep daily calendars full.",
          tools: "Depends on: Meta template approval, customer opt-in consent, and calendar setup. Message charges are agreed in the written proposal.",
        },
      },
      {
        name: "Instagram and Facebook Messenger Automation",
        details: {
          what: "We set up automated replies for Instagram and Facebook direct messages and comments.",
          problem: "Social media comments and direct messages sit unread, losing buyer interest.",
          steps: [
            "A user comments on a post or sends a direct message.",
            "The system sends a helpful reply with links or details.",
            "It logs interested users and alerts your social media team.",
          ],
          example: "A follower asks for a product link in a comment and gets a direct message with details.",
          benefit: "Engages social followers while interest is fresh without staff monitoring screens all day.",
          tools: "Depends on: Meta Business account permissions and supported messaging tools. Platform costs are agreed in the written proposal.",
        },
      },
      {
        name: "Shared Team Inbox and Chat Routing",
        details: {
          what: "We connect WhatsApp numbers to a shared inbox so multiple staff members can reply together.",
          problem: "One staff phone holds all WhatsApp chats, creating bottlenecks when that person is away.",
          steps: [
            "Incoming WhatsApp messages land in a shared team dashboard.",
            "Messages route to available staff based on topic or shift.",
            "Team members assign chats, add internal notes, and reply.",
          ],
          example: "A support chat is assigned to an available agent who sees past conversation history.",
          benefit: "Lets teams share WhatsApp workloads and prevents customer chats being locked on one phone.",
          tools: "Depends on: shared inbox software and WhatsApp Business API setup. Platform subscription fees are agreed in the written proposal.",
        },
      },
      {
        name: "CRM and Spreadsheet Sync from Chat",
        details: {
          what: "We connect your chat channels to spreadsheets and CRM tools to save contact details automatically.",
          problem: "Staff copy names and phone numbers from chat apps into spreadsheets by hand, causing errors.",
          steps: [
            "A chat conversation finishes with a qualified enquiry.",
            "Key details like name, phone, and requirements are extracted.",
            "The data syncs to your Google Sheet or CRM automatically.",
          ],
          example: "A customer gives their phone number in WhatsApp, and a new row appears in your sales sheet.",
          benefit: "Stops manual data entry and keeps customer lists up to date across your sales tools.",
          tools: "Depends on: CRM or Google Workspace connection, webhooks, and setup. Software fees are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Meta Business verification, WhatsApp Business API approvals, and message template rules. Meta conversation fees are agreed in the written proposal.",
    intro:
      "We set up official WhatsApp Business automation and social messaging flows. We help you answer enquiries, collect leads, and send booking reminders using approved templates.",
    useCases: [
      "Answer customer enquiries on official WhatsApp Business numbers.",
      "Collect customer names, requirements, and locations via chat.",
      "Send approved appointment reminders and confirmation notes.",
      "Reply to Instagram direct messages and post comments automatically.",
      "Route incoming chats to available team members in a shared inbox.",
      "Save contact details from chat into spreadsheets and CRMs automatically.",
    ],
    howItWorks: [
      "We check your Meta Business account and get WhatsApp API approval.",
      "We write and submit approved message templates to Meta.",
      "We build your automated reply flows and connect your CRM or sheet.",
      "We test messaging flows and show your team how to reply to chats.",
    ],
    limits: [
      "All WhatsApp automation requires Meta approval and an official business account.",
      "Marketing messages require user opt-in consent and Meta-approved templates.",
      "Meta charges per-conversation fees directly to your business account.",
    ],
    faq: [
      {
        question: "Can we use our existing WhatsApp number?",
        answer:
          "Yes, but the number must be moved to the official WhatsApp Business API platform.",
      },
      {
        question: "Does WhatsApp allow promotional messages?",
        answer:
          "Yes, if customers have opted in and Meta has approved the message template beforehand.",
      },
      {
        question: "Can a human take over a WhatsApp chat?",
        answer:
          "Yes. Chats pass to team members in a shared dashboard whenever a customer requests human help.",
      },
    ],
  },
  {
    id: "crm-workflow-automation",
    index: "03",
    title: "CRM & Workflow Automation",
    seoTitle: "CRM, Pipeline & Business Workflow Automation",
    metaDescription:
      "We connect your CRM, business apps, and sales pipelines. Track leads, automate follow-ups, and eliminate repetitive data entry between tools.",
    solutionLink: {
      title: "n8n Workflow Automation for Businesses",
      href: "/solutions/n8n-workflow-automation-guide",
      description:
        "Read our guide on how businesses connect tools with n8n and avoid per-task fees.",
    },
    tag: "Connected systems & pipelines",
    icon: Workflow,
    summary:
      "We connect your business apps and CRM. Software tracks leads, triggers follow-ups, and handles repeat tasks so your team saves time.",
    solves:
      "Scattered lead records, forgotten follow-ups, typing data twice between apps, and messy spreadsheets.",
    capabilities: [
      {
        name: "CRM Setup and Pipeline Tracking",
        details: {
          what: "We set up your CRM so customer records, deal stages, and sales notes stay neatly organised in one place.",
          problem: "Customer notes and phone numbers are scattered in notebooks, personal chats, and messy spreadsheets.",
          steps: [
            "We map the sales stages and custom fields your team needs.",
            "We set up deal pipelines and contact views in your CRM.",
            "We import your existing client records cleanly into the new system.",
          ],
          example: "Your sales team opens one screen to see every open deal, phone number, and recent conversation note.",
          benefit: "Keeps all customer records organised in one shared system so your team never loses track of buyers.",
          tools: "Depends on: your chosen CRM like HubSpot or Zoho. Platform subscription fees are agreed in the written proposal.",
        },
      },
      {
        name: "Automated Follow-ups and Lead Nurturing",
        details: {
          what: "We set up scheduled follow-up messages by email to stay in touch with buyers after sending proposals.",
          problem: "Sales reps forget to follow up with leads, causing interested buyers to look at competitors.",
          steps: [
            "A buyer receives a service proposal or pricing quote.",
            "The system schedules gentle follow-up reminders on agreed days.",
            "Follow-up sequences stop as soon as the buyer replies.",
          ],
          example: "Three days after a quote is sent, a polite email asks if the buyer has questions.",
          benefit: "Helps keep sales deals moving forward without staff having to remember manual follow-ups.",
          tools: "Depends on: setup, buyer consent, and messaging rules. Email delivery tool fees are agreed in the written proposal.",
        },
      },
      {
        name: "Cross-App Workflow Automation",
        details: {
          what: "We build automations using n8n or Make.com to pass data cleanly between your business software tools.",
          problem: "Staff spend hours every week copying numbers and customer records across different software tools.",
          steps: [
            "An event happens in one app, like a new form submission.",
            "The automation tool processes the data and runs needed steps.",
            "It updates your other connected software tools without manual typing.",
          ],
          example: "When an order comes in online, the system creates an invoice and alerts your team.",
          benefit: "Saves team hours every week and stops manual copy-paste typing mistakes across apps.",
          tools: "Depends on: workflow tools like n8n or Make.com. Platform runner fees are agreed in the written proposal.",
        },
      },
      {
        name: "Google Sheets and Workspace Integration",
        details: {
          what: "We automate Google Sheets and Workspace tools so row updates, folders, and documents create themselves automatically.",
          problem: "Employees spend hours manually typing numbers into spreadsheets and building routine document templates.",
          steps: [
            "New data arrives from website forms or connected business tools.",
            "Automated scripts add organised rows to your Google Sheet.",
            "The system generates documents and sends summary emails to managers.",
          ],
          example: "Each new client onboarding automatically creates a shared Google Drive folder and log row.",
          benefit: "Keeps spreadsheets and shared folders up to date using tools your team already knows.",
          tools: "Depends on: Google Workspace setup and permissions. Software fees are agreed in the written proposal.",
        },
      },
      {
        name: "API and Webhook Integrations Between Apps",
        details: {
          what: "We connect your apps directly through APIs and webhooks so software systems share information in real time.",
          problem: "Business software apps remain isolated, forcing staff to move CSV files by hand.",
          steps: [
            "One software app finishes an action and fires a webhook update.",
            "The receiving app reads the update payload and saves details.",
            "Both systems stay synchronized without anyone moving files by hand.",
          ],
          example: "A payment gateway confirms a transaction, and your billing tool marks the invoice paid.",
          benefit: "Maintains reliable data consistency across all company software without manual intervention.",
          tools: "Depends on: app API availability and developer permissions. Provider fees are agreed in the written proposal.",
        },
      },
      {
        name: "Scheduled Reports and Management Alerts",
        details: {
          what: "We set up automated reporting workflows that compile key performance numbers and send summaries to leaders.",
          problem: "Managers spend hours every week gathering numbers from multiple tools to write routine status reports.",
          steps: [
            "A scheduled workflow triggers on designated days and times.",
            "The system queries sales numbers and open tasks from connected tools.",
            "It sends a clean summary report to management chat or email.",
          ],
          example: "Every Monday morning, leaders receive a summary showing last week sales, new leads, and team progress.",
          benefit: "Keeps leaders informed with timely updates without staff spending hours preparing manual summaries.",
          tools: "Depends on: your data sources and delivery channels. Software fees are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Your existing tools, CRM subscription, and software permissions. Platform runner and third-party fees are agreed in the written proposal.",
    intro:
      "We connect your CRM, business applications, and sales pipelines. We help your team track deals, follow up with buyers, and move data without manual copy-pasting.",
    useCases: [
      "Send website and chat enquiries directly to your CRM pipeline.",
      "Schedule automated follow-up emails to keep sales moving.",
      "Connect Google Sheets with business software to remove manual typing.",
      "Pass order and invoice data between apps via APIs and webhooks.",
      "Create scheduled performance reports for management review.",
      "Organise client records in a shared CRM to eliminate lost leads.",
    ],
    howItWorks: [
      "We map your sales process, software apps, and data handoffs.",
      "We set up your CRM stages, lead assignment rules, and integrations.",
      "We build workflow connections using open tools like n8n or Make.",
      "We test with real records and guide your team on using the system.",
    ],
    limits: [
      "A CRM requires daily usage by your team to keep customer records fresh.",
      "Automations require supported API access or webhook triggers from your apps.",
      "Platform runner costs like Make or CRM subscriptions are agreed in your proposal.",
    ],
    faq: [
      {
        question: "Do we have to switch to a new CRM?",
        answer:
          "No. We connect your existing CRM or help you choose one that fits your budget and team requirements.",
      },
      {
        question: "What happens if an app connection fails?",
        answer:
          "We build retry steps and error alerts. Your team is notified if an external software connection pauses.",
      },
      {
        question: "Do automated follow-ups spam our leads?",
        answer:
          "No. We set up polite reminder sequences that stop as soon as a prospective buyer replies.",
      },
    ],
  },
  {
    id: "restaurant-cafe-table-ordering",
    index: "04",
    title: "Restaurant & Cafe Table Ordering",
    seoTitle: "Restaurant & Cafe Table Ordering — QR, NFC & Booking",
    metaDescription:
      "We build QR and NFC on-table ordering, table booking, and Google review collection systems for cafes and restaurants.",
    solutionLink: {
      title: "Interactive Café & Restaurant Demo",
      href: "/demo/cafe",
      description:
        "Explore our interactive restaurant demo featuring QR table ordering, kitchen management, and billing.",
    },
    tag: "Restaurants & Cafes",
    icon: UtensilsCrossed,
    summary:
      "We build QR and NFC table ordering, smart booking, and automated review systems for cafes and restaurants.",
    solves:
      "Slow table service, lost phone reservations, paper menu updates, and missed Google customer reviews.",
    capabilities: [
      {
        name: "QR Code & NFC Table Ordering",
        details: {
          what: "We set up QR codes and NFC table tags so diners can view digital menus and place orders directly from their phones.",
          problem: "Diners wait during rush hours for staff to bring menus and take orders, leading to walkouts and slow table turnover.",
          steps: [
            "Diners tap the NFC card or scan the QR code on their table using their phone.",
            "They browse your digital photo menu, select food items, and place their order.",
            "Orders route to your kitchen display and cashier without staff taking notes by hand.",
          ],
          example: "A customer scans table four, picks cold coffee, and the kitchen printer receives the ticket right away.",
          benefit: "Speeds up table turnover and lets servers focus on fast food delivery rather than manual order taking.",
          tools: "Depends on: digital menu setup, printed QR tags, and POS connection. Hardware fees are agreed in the written proposal.",
        },
      },
      {
        name: "Table Reservation & Booking Management",
        details: {
          what: "We build online table reservation tools that let guests reserve dining tables through your website or social channels.",
          problem: "Staff miss phone reservation calls during peak dinner rush, causing double-bookings and angry waiting guests.",
          steps: [
            "Guests select date, time, party size, and table preference on your booking link.",
            "The system checks available table capacity and reserves the requested slot.",
            "Confirmation and reminder notices reach the guest to prevent no-shows.",
          ],
          example: "A family books a table for four for Friday evening and receives a confirmation notice.",
          benefit: "Fills more dining seats in advance while stopping double-bookings and manual reservation phone calls.",
          tools: "Depends on: floor layout, operating hours, and calendar connection. Platform fees are agreed in the written proposal.",
        },
      },
      {
        name: "Automated Google Review Collection",
        details: {
          what: "We set up post-meal review flows that prompt happy guests to leave five-star ratings on your Google Maps listing.",
          problem: "Happy diners leave without reviewing your cafe, while competitors with more Google ratings rank higher in local search.",
          steps: [
            "A guest completes digital payment or taps the bill table card.",
            "A polite prompt asks how their meal and dining experience was.",
            "Happy guests are guided directly to your Google review page.",
          ],
          example: "After paying, a diner taps their phone and posts a five-star Google review in thirty seconds.",
          benefit: "Builds strong Google Maps reputation on autopilot to attract new local food lovers daily.",
          tools: "Depends on: Google Business Profile link and digital bill setup. Third-party messaging fees are agreed in the written proposal.",
        },
      },
      {
        name: "Live Kitchen Display & Billing Sync",
        details: {
          what: "We connect digital table orders directly to kitchen screens and billing counters for coordinated preparation.",
          problem: "Handwritten order tickets get lost or misread, resulting in wrong dishes and food waste.",
          steps: [
            "A diner or waiter enters an order on the digital system.",
            "Kitchen screens display the dish details, table number, and special notes.",
            "The billing counter syncs taxes, discounts, and prints the bill upon checkout.",
          ],
          example: "Kitchen chefs see table two ordered pasta with extra cheese on their kitchen monitor.",
          benefit: "Stops order mistakes and kitchen delays so meals reach dining tables hot and on time.",
          tools: "Depends on: kitchen tablets, network setup, and supported POS software. Device costs are agreed in the written proposal.",
        },
      },
      {
        name: "Digital Menu Management & Dynamic Pricing",
        details: {
          what: "We build a clean digital menu dashboard where you update dishes, prices, and sold-out items across all tables.",
          problem: "Re-printing paper menus every time prices change or items run out is slow and expensive.",
          steps: [
            "You toggle an item as sold out or update a price on your phone.",
            "All table QR menus reflect the change across all dining tables.",
            "Guests only order food items currently available in your kitchen inventory.",
          ],
          example: "When avocados run out, staff mark guacamole sold out in two taps across every table menu.",
          benefit: "Eliminates paper menu reprint expenses and stops servers having to apologize for unavailable dishes.",
          tools: "Depends on: digital menu management software and cloud hosting. Subscription fees are agreed in the written proposal.",
        },
      },
      {
        name: "Customer Loyalty & Repeat Visit Reminders",
        details: {
          what: "We set up digital loyalty point tracking and automated reminder offers for past dining guests.",
          problem: "First-time cafe visitors rarely return because cafes lack an automated way to stay in touch.",
          steps: [
            "Guests join your digital rewards program during mobile checkout.",
            "The system tracks visit frequency and awards loyalty points.",
            "Permitted greeting notes or birthday offers bring past diners back.",
          ],
          example: "A regular customer receives a friendly birthday discount note and brings friends for dinner.",
          benefit: "Turns occasional diners into loyal regulars to grow weekday and weekend restaurant sales.",
          tools: "Depends on: guest consent, CRM setup, and messaging guidelines. Platform costs are agreed in the written proposal.",
        },
      },
    ],
    depends:
      "Your table layout, digital menu items, and billing hardware. Platform and hardware costs are agreed in the written proposal.",
    intro:
      "We build contactless dining tools for cafes and restaurants. We connect QR table ordering, NFC tags, table booking, and Google review collection to help you serve more guests with less stress.",
    useCases: [
      "Let diners browse food photos and order from tables via QR or NFC.",
      "Manage advance table reservations and send automated guest reminders.",
      "Collect authentic Google reviews from happy diners after their meal.",
      "Send table orders directly to kitchen screens and POS counters.",
      "Update dishes, pricing, and sold-out items without reprinting paper menus.",
      "Reward regular guests with digital loyalty stamps and return visit offers.",
    ],
    howItWorks: [
      "We map your restaurant floor layout, menu items, and dining steps.",
      "We generate custom branded table QR codes and NFC smart cards.",
      "We configure your kitchen display and billing counter sync.",
      "We test orders live on table and train your floor staff.",
    ],
    limits: [
      "Table QR ordering requires customers to have smartphones with cameras or NFC.",
      "POS integration depends on supported API access from your billing software provider.",
      "Google reviews require diners to have an active Google account on their device.",
    ],
    faq: [
      {
        question: "Can customers order without downloading an app?",
        answer:
          "Yes. Diners simply scan the QR code or tap the NFC tag with their phone camera to open the menu in their mobile browser.",
      },
      {
        question: "How does the system help get more Google reviews?",
        answer:
          "After checkout, diners receive a prompt asking about their meal. Guests with positive ratings are directed to your Google Maps review page.",
      },
      {
        question: "Can staff still take orders manually on paper or POS?",
        answer:
          "Yes. Floor servers can take orders manually while other tables self-order. Both flow into the same kitchen display system.",
      },
    ],
  },
];
