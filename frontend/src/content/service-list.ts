export interface ServiceListItem {
  id: string;
  slug: string;
  title: string;
}

export const serviceList: ServiceListItem[] = [
  {
    id: "ai-agents-chatbots",
    slug: "ai-agents-chatbots",
    title: "AI Agents & Chatbots",
  },
  {
    id: "whatsapp-social-automation",
    slug: "whatsapp-social-automation",
    title: "WhatsApp & Social Automation",
  },
  {
    id: "crm-workflow-automation",
    slug: "crm-workflow-automation",
    title: "CRM & Workflow Automation",
  },
  {
    id: "restaurant-cafe-table-ordering",
    slug: "restaurant-cafe-table-ordering",
    title: "Restaurant & Cafe Table Ordering",
  },
];
