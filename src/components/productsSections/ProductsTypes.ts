import { SectionEnum } from "@/utils/global/globalTypes";

export interface ProductSectionProps {
  section: SectionEnum;
  title: string;
  subtitle?: string;
  bgColor?: string;
}