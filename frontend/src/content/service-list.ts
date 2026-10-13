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
    id: "crm-sales-automation",
    slug: "crm-sales-automation",
    title: "CRM & Sales Automation",
  },
  {
    id: "business-workflow-automation",
    slug: "business-workflow-automation",
    title: "Business Workflow Automation",
  },
  {
    id: "whatsapp-social-automation",
    slug: "whatsapp-social-automation",
    title: "WhatsApp & Social Automation",
  },
];
