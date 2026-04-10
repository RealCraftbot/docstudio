import React, { useTransition, useState, useEffect } from 'react';
import { useTemplateStore } from '../store/useTemplateStore';
import { TEMPLATES } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Download, Lock, CheckCircle, CreditCard, Loader2 } from 'lucide-react';

export default function DocumentEditor() {
  const { 
    selectedTemplateId, 
    setSelectedTemplate, 
    formData, 
    updateFormData, 
    paymentStatus, 
    setPaymentStatus 
  } = useTemplateStore();

  const [isPending, startTransition] = useTransition();
  const [localData, setLocalData] = useState(formData);
  const [isProcessing, setIsProcessing] = useState(false);

  const template = TEMPLATES.find(t => t.id === selectedTemplateId);

  useEffect(() => {
    setLocalData(formData);
  }, [formData]);

  if (!template) return null;

  const handleInputChange = (id: string, value: any) => {
    setLocalData(prev => ({ ...prev, [id]: value }));
    startTransition(() => {
      updateFormData({ [id]: value });
    });
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPaymentStatus('SUCCESS');
      setIsProcessing(false);
      useTemplateStore.getState().addToHistory({
        action: `Generated ${template.name}`,
        timestamp: new Date().toLocaleTimeString(),
        amount: template.basePrice
      });
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar Form */}
      <aside className="w-96 border-r border-white/10 flex flex-col bg-[#0f0f0f]">
        <div className="p-6 border-bottom border-white/10 flex items-center justify-between">
          <button 
            onClick={() => setSelectedTemplate(null)}
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </button>
          <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
            Editor v1.0
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h2 className="text-2xl font-medium mb-1">{template.name}</h2>
            <p className="text-sm text-gray-500 font-light">Configure your document fields below.</p>
          </div>

          <div className="space-y-6">
            {template.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={localData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors appearance-none"
                  >
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={localData[field.id] || ''}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-[#141414] border-t border-white/10 space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-sm text-gray-400">Total Amount</span>
            <span className="text-2xl font-mono font-medium">
              ${template.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          {paymentStatus === 'SUCCESS' ? (
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Export PDF
            </button>
          ) : (
            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay & Unlock
                </>
              )}
            </button>
          )}
        </div>
      </aside>

      {/* Preview Pane */}
      <main className="flex-1 bg-[#1a1a1a] p-12 flex flex-col items-center justify-center overflow-y-auto relative">
        <div className="absolute top-8 right-8 flex items-center space-x-4">
          <div className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center",
            paymentStatus === 'SUCCESS' ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"
          )}>
            {paymentStatus === 'SUCCESS' ? (
              <><CheckCircle className="w-3 h-3 mr-1" /> Unlocked</>
            ) : (
              <><Lock className="w-3 h-3 mr-1" /> Locked Preview</>
            )}
          </div>
          {isPending && (
            <div className="text-[10px] text-white/40 uppercase tracking-widest animate-pulse">
              Rendering...
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl perspective-1000">
          <motion.div 
            layout
            className="bg-white text-black shadow-2xl rounded-sm overflow-hidden min-h-[600px] relative"
            style={{ 
              filter: paymentStatus === 'SUCCESS' ? 'none' : 'blur(4px) grayscale(0.5)',
              pointerEvents: paymentStatus === 'SUCCESS' ? 'auto' : 'none'
            }}
          >
            <DocumentPreview templateId={selectedTemplateId} data={formData} />
            
            {paymentStatus !== 'SUCCESS' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 backdrop-blur-[2px] z-10">
                <div className="bg-black text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-2xl">
                  <Lock className="w-5 h-5" />
                  <span className="font-bold text-sm uppercase tracking-widest">Payment Required to View Full Quality</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function DocumentPreview({ templateId, data }: { templateId: string, data: any }) {
  if (templateId === 'aa-boarding-pass') {
    return (
      <div className="p-12 font-sans h-full flex flex-col">
        <div className="flex justify-between items-start border-b-4 border-blue-800 pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-black text-blue-900 italic">AmericanAirlines</h1>
            <p className="text-xs font-bold tracking-widest text-blue-800 mt-1 uppercase">Boarding Pass / Priority</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase">Flight</p>
            <p className="text-3xl font-mono font-bold">{data.flightNumber || 'AA----'}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-12 mb-12">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Passenger</p>
            <p className="text-xl font-bold uppercase">{data.passengerName || 'NAME SURNAME'}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Date</p>
            <p className="text-xl font-bold uppercase">{data.date || 'DD MMM YYYY'}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Gate</p>
            <p className="text-xl font-bold uppercase">{data.gate || '--'}</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-12">
          <div className="border-r border-dashed border-gray-300 pr-12">
            <div className="flex justify-between items-center mb-8">
              <div className="text-center">
                <p className="text-4xl font-black">{data.from || '---'}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Origin</p>
              </div>
              <div className="flex-1 h-[2px] bg-gray-200 mx-4 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                  ✈️
                </div>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black">{data.to || '---'}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Dest</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-[10px] font-bold text-blue-800 uppercase mb-1">Boarding</p>
                <p className="text-2xl font-black text-blue-900">{data.boardingTime || '--:--'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Seat</p>
                <p className="text-2xl font-black">{data.seat || '--'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-48 h-48 bg-gray-100 border-2 border-gray-200 flex items-center justify-center mb-4">
              <div className="grid grid-cols-8 gap-1 opacity-20">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-black" />
                ))}
              </div>
              <div className="absolute text-[10px] font-mono text-gray-400 uppercase rotate-90">
                Security QR Code
              </div>
            </div>
            <p className="text-[10px] font-mono text-gray-400">AA-DOC-SEC-88291-00</p>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center">
          <div className="text-[10px] font-bold text-gray-300 uppercase">
            OneWorld Alliance Member / Priority Access
          </div>
          <div className="text-[10px] font-mono text-gray-300">
            * ELECTRONIC TICKET *
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'delta-receipt') {
    return (
      <div className="p-12 font-sans h-full flex flex-col text-[#333]">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#E01933] transform rotate-45 mr-4" />
            <h1 className="text-3xl font-bold text-[#003366] tracking-tighter">DELTA</h1>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold uppercase text-gray-400">Passenger Receipt</h2>
            <p className="text-sm font-mono">{data.confirmation || 'DL------'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-[10px] font-bold uppercase text-gray-400 border-b border-gray-200 pb-1 mb-4">Passenger Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Type:</span>
                <span className="text-xs font-bold">{data.passengerType || 'Adult'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">SkyMiles:</span>
                <span className="text-xs font-bold">{data.skyMiles || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Class:</span>
                <span className="text-xs font-bold text-[#003366]">{data.class || 'First Class'}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase text-gray-400 border-b border-gray-200 pb-1 mb-4">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Base Fare:</span>
                <span className="text-xs font-bold">${((data.totalAmount || 3860.07) * 0.85).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Taxes & Fees:</span>
                <span className="text-xs font-bold">${((data.totalAmount || 3860.07) * 0.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-sm font-bold">Total:</span>
                <span className="text-lg font-black text-[#003366]">${Number(data.totalAmount || 3860.07).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-4">Conditions of Carriage</h3>
          <p className="text-[10px] text-gray-500 leading-relaxed italic">
            {data.conditions || "Tickets are non-refundable unless otherwise stated. Delta Air Lines, Inc. is not responsible for lost or stolen baggage. By purchasing this ticket, you agree to the Delta Contract of Carriage and all applicable tariffs."}
          </p>
        </div>

        <div className="mt-auto text-center border-t border-gray-100 pt-8">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Thank you for choosing Delta</p>
          <div className="flex justify-center space-x-8">
            <span className="text-[9px] font-bold text-gray-300">SKYTEAM MEMBER</span>
            <span className="text-[9px] font-bold text-gray-300">IATA CERTIFIED</span>
            <span className="text-[9px] font-bold text-gray-300">ISO 9001:2015</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 flex flex-col items-center justify-center h-full text-gray-400 italic">
      <p>Preview for {templateId} is being generated...</p>
    </div>
  );
}
