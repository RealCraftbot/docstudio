import React from 'react';
import { TEMPLATES } from '../constants';
import { useTemplateStore } from '../store/useTemplateStore';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { FileText, ArrowRight } from 'lucide-react';

export default function TemplateGallery() {
  const setSelectedTemplate = useTemplateStore((state) => state.setSelectedTemplate);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <header className="max-w-7xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-light tracking-tighter mb-4 font-sans">
            DOC<span className="font-bold">STUDIO</span> PRO
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            High-fidelity document generation for the modern professional. 
            Select a template to begin your high-precision rendering.
          </p>
        </motion.div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TEMPLATES.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="group relative bg-[#141414] border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-white/30"
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  {template.category}
                </span>
                <span className="text-xs font-mono text-white/60">
                  ${template.basePrice.toLocaleString()}
                </span>
              </div>
              <h3 className="text-xl font-medium mb-2 group-hover:text-white transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-gray-400 font-light line-clamp-2 mb-4">
                {template.description}
              </p>
              
              <div className="flex items-center text-sm font-medium text-white/40 group-hover:text-white transition-colors">
                <span>Customize Template</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
