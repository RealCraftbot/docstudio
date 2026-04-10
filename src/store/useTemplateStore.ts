import { create } from 'zustand';
import { AppState, PaymentStatus } from '../types';
import { TEMPLATES } from '../constants';

interface TemplateStore extends AppState {
  setSelectedTemplate: (id: string | null) => void;
  updateFormData: (data: Record<string, any>) => void;
  setPaymentStatus: (status: PaymentStatus) => void;
  addToHistory: (entry: any) => void;
  resetForm: () => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  selectedTemplateId: null,
  formData: {},
  paymentStatus: 'PENDING',
  userHistory: [],
  salesData: {
    totalSales: 0,
    count: 0,
  },
  setSelectedTemplate: (id) => {
    const template = TEMPLATES.find(t => t.id === id);
    const initialData = template ? template.fields.reduce((acc, field) => {
      acc[field.id] = field.defaultValue || '';
      return acc;
    }, {} as Record<string, any>) : {};
    
    set({ 
      selectedTemplateId: id, 
      formData: initialData,
      paymentStatus: 'PENDING' 
    });
  },
  updateFormData: (data) => set((state) => ({ 
    formData: { ...state.formData, ...data } 
  })),
  setPaymentStatus: (status) => set((state) => {
    if (status === 'SUCCESS' && state.selectedTemplateId) {
      const template = TEMPLATES.find(t => t.id === state.selectedTemplateId);
      const price = template?.basePrice || 0;
      return {
        paymentStatus: status,
        salesData: {
          totalSales: state.salesData.totalSales + price,
          count: state.salesData.count + 1
        }
      };
    }
    return { paymentStatus: status };
  }),
  addToHistory: (entry) => set((state) => ({ 
    userHistory: [entry, ...state.userHistory] 
  })),
  resetForm: () => set({ 
    selectedTemplateId: null, 
    formData: {}, 
    paymentStatus: 'PENDING' 
  }),
}));
