import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Instagram, Send, MessageCircle, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

const WHATSAPP_NUMBER = '5531998804720';
const CONTACT_EMAIL = 'contato@viaaereamg.com';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (value.trim().length < 3) error = 'O nome deve ter pelo menos 3 caracteres.';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = 'Por favor, insira um e-mail válido.';
        break;
      case 'phone':
        const digits = value.replace(/\D/g, '');
        if (digits.length < 10) error = 'Por favor, insira um telefone válido com DDD.';
        break;
      case 'message':
        if (value.trim().length < 10) error = 'A mensagem deve ter pelo menos 10 caracteres.';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    let formattedValue = value;
    if (id === 'phone') {
      // Basic phone masking: (XX) XXXXX-XXXX
      const x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      if (x) {
        formattedValue = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? '-' + x[3] : ''}`;
      }
    }

    setFormData(prev => ({ ...prev, [id]: formattedValue }));
    if (touched[id as keyof typeof touched]) {
      validateField(id, formattedValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    validateField(id, value);
  };

  const isFormValid = 
    formData.name.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.phone.replace(/\D/g, '').length >= 10 &&
    formData.message.trim().length >= 10 &&
    !Object.values(errors).some(err => err !== '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsSubmitting(true);

    // Simulate sending
    setTimeout(() => {
      // WhatsApp message
      const whatsappMessage = `Olá! Meu nome é ${formData.name}. %0AEmail: ${formData.email} %0ATelefone: ${formData.phone} %0AMensagem: ${formData.message}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Também abrimos o seu WhatsApp para agilizar o atendimento.'
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold text-slate-900 mb-6"
              >
                Fale com um Via Aérea Brasil
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-600 leading-relaxed"
              >
                Conectamos você aos melhores helicópteros e operações aéreas privadas ou compartilhadas. 
                Tem alguma dúvida sobre voos, agendamentos ou operações? Fale com o nosso horário.
              </motion.p>
            </div>

            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">E-mail</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">WhatsApp</p>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors">
                    +55 (31) 99880-4720
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Instagram</p>
                  <a href="https://instagram.com/viaaereabrasil_oficial" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors">
                    @viaaereabrasil_oficial
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 bg-white rounded-2xl border border-slate-100 flex items-start gap-3"
            >
              <Shield className="text-slate-400 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-slate-500">
                Carregador de dados (LGPD), Lei nº 13.709/2018. Seus dados estão protegidos e serão usados apenas para o contato solicitado.
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Nome*</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-6 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all",
                    touched.name && errors.name 
                      ? "border-red-500 focus:ring-red-500/20" 
                      : "border-slate-100 focus:ring-orange-500/20 focus:border-orange-500"
                  )}
                  placeholder="Seu nome completo"
                />
                {touched.name && errors.name && (
                  <p className="text-xs text-red-500 ml-1 font-medium">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">E-mail*</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-6 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all",
                    touched.email && errors.email 
                      ? "border-red-500 focus:ring-red-500/20" 
                      : "border-slate-100 focus:ring-orange-500/20 focus:border-orange-500"
                  )}
                  placeholder="seu@email.com"
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-red-500 ml-1 font-medium">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold text-slate-700 ml-1">Telefone*</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-6 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all",
                    touched.phone && errors.phone 
                      ? "border-red-500 focus:ring-red-500/20" 
                      : "border-slate-100 focus:ring-orange-500/20 focus:border-orange-500"
                  )}
                  placeholder="(00) 00000-0000"
                />
                {touched.phone && errors.phone && (
                  <p className="text-xs text-red-500 ml-1 font-medium">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1">Mensagem*</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-6 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all resize-none",
                    touched.message && errors.message 
                      ? "border-red-500 focus:ring-red-500/20" 
                      : "border-slate-100 focus:ring-orange-500/20 focus:border-orange-500"
                  )}
                  placeholder="Como podemos ajudar?"
                />
                {touched.message && errors.message && (
                  <p className="text-xs text-red-500 ml-1 font-medium">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Enviar <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-slate-400">
                Ao clicar em enviar, você concorda com nossa política de privacidade.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
