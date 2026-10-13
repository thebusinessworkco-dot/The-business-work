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
    body: "A sample tool for a clinic. Patients book visits on WhatsApp, the tool checks doctor times, and alerts staff.",
    flowTitle: "HOW THE STEPS RUN",
    flow: [
      { text: "Patient sends a message on WhatsApp", tag: "START" },
      { text: "Tool asks for details and preferred time", tag: "DETAILS" },
      { text: "Tool checks calendar and saves the visit", tag: "BOOK" },
      { text: "Reminder sent and staff get an alert", tag: "ALERT" },
    ],
    scope: [
      { label: "Built with", value: "n8n, WhatsApp Cloud API, Google Calendar" },
      { label: "Status", value: "Being built; not yet fully tested" },
      { label: "Still to test", value: "Double booking checks, reminder alerts, errors" },
    ],
    note: "Sample project. Not a client deployment. AI helps with booking only and never gives medical advice.",
  },
  {
    id: "website-chatbot",
    code: "DEMO-02",
    status: "Proof of concept",
    category: "Customer support",
    title: "Website AI Chatbot",
    body: "A tool that answers visitor questions from approved guides. It collects contact details for your team.",
    flowTitle: "HOW THE STEPS RUN",
    flow: [
      { text: "Visitor asks a question on the website", tag: "ASK" },
      { text: "Tool answers using approved guide notes", tag: "ANSWER" },
      { text: "Visitor leaves their contact details", tag: "DETAILS" },
      { text: "Hard questions pass to a team member", tag: "PASS CHAT" },
    ],
    scope: [
      { label: "Built with", value: "Node.js backend, Gemini API" },
      { label: "Status", value: "Early test; not yet on this site" },
      { label: "Still to test", value: "Speed limits, guide facts, cloud hosting" },
    ],
    note: "Early test version. Not connected to this website.",
  },
];
