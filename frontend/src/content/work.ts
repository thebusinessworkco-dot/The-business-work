export type Demo = {
  id: string;
  code: string;
  status: "Proof of concept" | "In development" | "Working demo" | "Live client deployment";
  category: string;
  title: string;
  body: string;
  flowTitle: string;
  flow: { text: string; tag: string }[];
  scope: { label: string; value: string }[];
  note: string;
  /** Optional: absolute or relative path/URL to a demo walkthrough video */
  videoSrc?: string;
  /** Optional: poster image shown before video loads */
  posterSrc?: string;
};

export const demos: Demo[] = [
  {
    id: "hospital-appointments",
    code: "DEMO-01",
    status: "In development",
    category: "Healthcare",
    title: "WhatsApp Appointment Assistant for Clinics",
    body: "A demo for a hypothetical clinic: patients book appointments on WhatsApp, the system checks doctor availability, records bookings, and alerts staff.",
    flowTitle: "ILLUSTRATIVE FLOW",
    flow: [
      { text: "Patient messages the hospital on WhatsApp", tag: "INTAKE" },
      { text: "Assistant collects details and preferred slot", tag: "COLLECT" },
      { text: "Availability checked, booking recorded in the calendar and sheet", tag: "BOOK" },
      { text: "Reminder sent; staff notified of the appointment", tag: "NOTIFY" },
    ],
    scope: [
      { label: "Built with", value: "n8n, WhatsApp Cloud API, Google Sheets / Calendar" },
      { label: "Status", value: "Under development; not yet tested end to end" },
      { label: "Still to verify", value: "Duplicate-booking prevention, reminders, error handling" },
    ],
    note: "Demo brand. Not a live client deployment. AI assists with scheduling only and never provides clinical advice.",
    // videoSrc: "/demos/hospital-appointments.mp4",
    // posterSrc: "/demos/hospital-appointments-poster.jpg",
  },
  {
    id: "website-chatbot",
    code: "DEMO-02",
    status: "Proof of concept",
    category: "Customer support",
    title: "Website AI Chatbot",
    body: "A chatbot that answers visitor questions from approved business documents and securely captures enquiries, built with server-side AI integration.",
    flowTitle: "ILLUSTRATIVE FLOW",
    flow: [
      { text: "Visitor asks a question on the website", tag: "ASK" },
      { text: "Backend answers from approved business content", tag: "ANSWER" },
      { text: "Contact details captured when the visitor wants a follow-up", tag: "CAPTURE" },
      { text: "Complex questions are routed to a person", tag: "HANDOFF" },
    ],
    scope: [
      { label: "Built with", value: "Node.js / Express backend, Gemini API" },
      { label: "Status", value: "Prototype; not yet connected to this website" },
      { label: "Still to verify", value: "Rate limits, knowledge-base content, production hosting" },
    ],
    note: "Capabilities shown are prototype-level. Not connected to this website.",
    // videoSrc: "/demos/website-chatbot.mp4",
    // posterSrc: "/demos/website-chatbot-poster.jpg",
  },
];
