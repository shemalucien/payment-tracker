import { FAQ } from "./faq";

export interface FaqItem {
  active: number | null;
  handleToggle: (index: number) => void;
  faq: FAQ;
};
