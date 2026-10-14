export type Industry = {
  name: string;
  body: string;
  href?: string;
  linkText?: string;
};

export const industries: Industry[] = [
  {
    name: "Healthcare & clinics",
    body: "We help clinics handle booking questions, send reminders, and alert staff. AI never gives medical advice.",
    href: "/solutions/whatsapp-appointment-booking-clinics",
    linkText: "See clinic booking solution",
  },
  {
    name: "Local businesses",
    body: "We help salons, repair shops and stores answer enquiries, take bookings and follow up.",
  },
  {
    name: "Sales teams & agencies",
    body: "We help sales teams see who is ready to buy and send reminders.",
  },
  {
    name: "E-commerce",
    body: "We help online shops answer order questions and send friendly follow-ups to shoppers.",
  },
  {
    name: "Real estate",
    body: "We help real estate teams answer property enquiries, book visits, and alert staff.",
  },
  {
    name: "Education & coaching",
    body: "We help coaching centres answer course questions, book counselling visits, and follow up.",
  },
];
