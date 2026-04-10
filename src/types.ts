export type TemplateField = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
};

export type Template = {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  fields: TemplateField[];
  basePrice: number;
};

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export type AppState = {
  selectedTemplateId: string | null;
  formData: Record<string, any>;
  paymentStatus: PaymentStatus;
  userHistory: any[];
  salesData: {
    totalSales: number;
    count: number;
  };
};
