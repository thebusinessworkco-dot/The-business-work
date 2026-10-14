import type { LucideIcon } from "lucide-react";
import { Calendar, Workflow } from "lucide-react";

export type SolutionStep = {
  title: string;
  description: string;
};

export type SolutionFaq = {
  question: string;
  answer: string;
};

export type Solution = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  tag: string;
  icon: LucideIcon;
  summary: string;
  problemTitle: string;
  problemDescription: string;
  problemPoints: string[];
  solutionTitle: string;
  solutionDescription: string;
  steps: SolutionStep[];
  rulesTitle: string;
  rules: string[];
  statusNote: string;
  faq: SolutionFaq[];
  relatedServices: { title: string; href: string; description: string }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
};

export const solutions: Solution[] = [
  {
    id: "whatsapp-appointment-booking-clinics",
    slug: "whatsapp-appointment-booking-clinics",
    title: "WhatsApp Appointment Booking for Clinics",
    seoTitle: "WhatsApp Appointment Booking for Clinics",
    metaDescription:
      "Automate clinic appointment booking on WhatsApp. Let patients check doctor times, book visits, and receive reminders without front-desk delays.",
    eyebrow: "CLINIC SYSTEMS // HEALTHCARE",
    tag: "Clinic appointment scheduling",
    icon: Calendar,
    summary:
      "We build WhatsApp booking tools for clinics and doctors. Patients pick open visit times and get confirmation notes over chat.",
    problemTitle: "Front-desk delays in busy clinics",
    problemDescription:
      "Clinic receptionists answer phone calls, check in patients, and take payments at the same time. This creates slow replies and missed visits.",
    problemPoints: [
      "Front-desk staff lose hours answering repeat phone calls about clinic hours and open times.",
      "Patients wait for replies or call when the clinic phone is busy with another patient.",
      "Missed visits happen when staff do not have time to send manual reminder messages.",
      "Doctors face schedule gaps when cancellations are not caught early in the day.",
    ],
    solutionTitle: "How the appointment flow runs",
    solutionDescription:
      "We connect your official WhatsApp Business number to your doctor calendar so patients book open slots cleanly.",
    steps: [
      {
        title: "Step 01: Patient sends a message",
        description:
          "The patient texts your official WhatsApp number to ask for a visit.",
      },
      {
        title: "Step 02: Checks doctor calendar",
        description:
          "The tool checks open times on your connected calendar, such as Google Calendar.",
      },
      {
        title: "Step 03: Patient picks a time slot",
        description:
          "The patient selects an open time using simple buttons or list options.",
      },
      {
        title: "Step 04: Confirms and alerts staff",
        description:
          "The visit saves to your calendar. The patient gets details, and your front desk gets an alert.",
      },
    ],
    rulesTitle: "Rules and patient care limits",
    rules: [
      "Administrative booking only. The tool never gives medical advice, diagnosis, or triage.",
      "Emergency notices are shown clearly, telling patients to call emergency numbers for urgent care.",
      "Outbound reminders use approved Meta templates and require patient opt-in.",
      "Doctors must keep their calendar updated to prevent overlapping appointments.",
      "Staff can step in at any time to take over the chat.",
    ],
    statusNote:
      "Based on our DEMO-01 working prototype built with n8n, WhatsApp Cloud API, and Google Calendar. In active development and testing.",
    faq: [
      {
        question: "Does this booking tool give medical advice?",
        answer:
          "No. The tool handles scheduling and office hours only. It never gives medical advice or diagnosis.",
      },
      {
        question: "Can patients reschedule or cancel a visit?",
        answer:
          "Yes. Patients can ask to cancel or change their slot. The calendar updates and staff receive an alert.",
      },
      {
        question: "How do we get started?",
        answer:
          "We review your clinic hours, doctors, and calendar setup. We give you a written plan before we start.",
      },
      {
        question: "How are platform messaging fees handled?",
        answer:
          "Meta charges its own messaging fees directly to your Meta Business account. Our setup fees are agreed in a custom quote.",
      },
    ],
    relatedServices: [
      {
        title: "WhatsApp & Social Automation",
        href: "/services/whatsapp-social-automation",
        description:
          "Official WhatsApp Business tools for replies, lead intake, and customer updates.",
      },
      {
        title: "Business Workflow Automation",
        href: "/services/business-workflow-automation",
        description:
          "Connect calendars, spreadsheets, and business software using n8n and APIs.",
      },
    ],
    ctaTitle: "Ready to simplify your clinic bookings?",
    ctaDescription:
      "Tell us about your clinic and booking steps. We will prepare a clear plan with custom costs.",
    ctaButtonText: "Discuss Clinic Booking",
  },
  {
    id: "n8n-workflow-automation-guide",
    slug: "n8n-workflow-automation-guide",
    title: "n8n Workflow Automation for Businesses",
    seoTitle: "n8n Workflow Automation Services for Business",
    metaDescription:
      "Custom n8n workflow automation for Indian businesses. Connect sheets, CRMs, and webhooks with self-hostable workflows and no per-task fees.",
    eyebrow: "BUSINESS SYSTEMS // n8n AUTOMATION",
    tag: "Connected business systems",
    icon: Workflow,
    summary:
      "We build business automations using n8n. Connect spreadsheets, CRM records, and business tools without manual typing.",
    problemTitle: "Manual data entry between business tools",
    problemDescription:
      "Teams spend hours every week copying customer data across separate apps. Moving records by hand leads to typos and delayed replies.",
    problemPoints: [
      "Staff copy lead details by hand from website forms into spreadsheets and sales software.",
      "Billing updates and order notices get delayed when records sit in unread inboxes.",
      "Traditional automation tools charge per-step fees that grow expensive as volumes increase.",
      "Disconnected tools leave managers without a single, clean view of daily numbers.",
    ],
    solutionTitle: "How we build n8n automations",
    solutionDescription:
      "We build automations that run on triggers, format incoming data, and pass updates cleanly between your tools.",
    steps: [
      {
        title: "Step 01: Capture incoming data",
        description:
          "A webhook or form event triggers the automation when a customer takes action.",
      },
      {
        title: "Step 02: Clean and validate inputs",
        description:
          "The tool checks the data, removes duplicates, and formats names, phones, and dates.",
      },
      {
        title: "Step 03: Update your business apps",
        description:
          "Updates flow into your CRM, Google Sheets, or database automatically.",
      },
      {
        title: "Step 04: Send alerts and handle errors",
        description:
          "Your team gets an alert when work finishes. Retries run if an external app is slow.",
      },
    ],
    rulesTitle: "Licensing and operational realities",
    rules: [
      "Automations run on your own cloud server or official n8n cloud account under n8n licensing terms.",
      "You own your automation files, server credentials, and customer records.",
      "Self-hosted servers need regular maintenance, backups, and security monitoring.",
      "Automations rely on third-party APIs remaining active and stable.",
      "Rule-based automations require clean input formats to run reliably.",
    ],
    statusNote:
      "Built with verified open-source and cloud automation tools. We do not resell n8n as a hosted service.",
    faq: [
      {
        question: "Why choose n8n over tools like Zapier?",
        answer:
          "n8n can be self-hosted on your own server. You avoid per-task fees as your transaction volume grows.",
      },
      {
        question: "Can n8n connect to Google Workspace and WhatsApp?",
        answer:
          "Yes. n8n connects to Google Sheets, Gmail, and the official WhatsApp Business Cloud API.",
      },
      {
        question: "Who owns the automations and data?",
        answer:
          "You do. Automations live on your own account or server, keeping your customer data private.",
      },
      {
        question: "How are automation projects priced?",
        answer:
          "All projects are custom quotation-based depending on setup complexity and connections needed.",
      },
    ],
    relatedServices: [
      {
        title: "Business Workflow Automation",
        href: "/services/business-workflow-automation",
        description:
          "Connect apps and move data automatically between tools.",
      },
      {
        title: "CRM & Sales Automation",
        href: "/services/crm-sales-automation",
        description:
          "Organise sales stages, log new leads, and send follow-ups.",
      },
    ],
    ctaTitle: "Ready to automate repeat business tasks?",
    ctaDescription:
      "Tell us what takes too much time in your daily operations. We will suggest a simple fix with clear costs.",
    ctaButtonText: "Discuss n8n Automation",
  },
];
