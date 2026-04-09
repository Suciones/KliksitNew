import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2, Send, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import { generateProjectScope, ProjectBrief } from '../services/geminiService';
import emailjs from '@emailjs/browser';

export const GeminiContact: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<ProjectBrief | null>(null);
  const [step, setStep] = useState<'input' | 'result' | 'contact' | 'success'>('input');
  
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [sending, setSending] = useState(false);

  const handleGenerateBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    
    setLoading(true);
    try {
      const result = await generateProjectScope(idea);
      setBrief(result);
      setStep('result');
    } catch (err) {
      console.error(err);
      alert("Something went wrong with our AI strategist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      to_email: 'suciu.andrei.corneliu@gmail.com',
      from_name: contactName,
      from_email: contactEmail,
      reply_to: contactEmail,
      phone_number: contactPhone,

      idea: idea,
      summary: brief?.summary,
      recommendedFeatures: brief?.recommendedFeatures.join(', '),
      estimatedTimeline: brief?.estimatedTimeline,
      techStack: brief?.techStackRecommendation.join(', '),
      strategicInsight: brief?.strategicInsight
    };

    try {
      const SERVICE_ID = 'service_bexuc0l';
      const TEMPLATE_ID = 'template_c49n5qg';
      const PUBLIC_KEY = 'isET6twussv6AM488';

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setStep('success');
    } catch (error) {
      console.error('FAILED...', error);
      alert('We encountered an error sending your request. Please email suciu.andrei.corneliu@gmail.com directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Reveal width="100%">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-center">
            Start a Project
          </h2>
        </Reveal>
        <Reveal width="100%">
          <p className="text-zinc-400 text-center mb-16 text-lg">
            Describe your vision. Our AI will draft an initial strategy brief instantly.
          </p>
        </Reveal>

        <div className="bg-black border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">

            {step === 'input' && (
              <motion.form 
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleGenerateBrief}
                className="flex flex-col gap-6"
              >
                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-widest text-zinc-500">Your Vision</label>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="I want to build a luxury real estate platform for..."
                    className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg p-6 text-xl text-white focus:outline-none focus:border-white transition-colors h-48 resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-3 bg-white text-black py-4 px-8 rounded-full font-medium text-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> Generate Brief
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {step === 'result' && brief && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="text-blue-400" /> AI Strategic Brief
                  </h3>
                  <button 
                    onClick={() => setStep('input')}
                    className="text-sm text-zinc-500 hover:text-white"
                  >
                    Edit Vision
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="col-span-2">
                    <h4 className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Summary</h4>
                    <p className="text-lg text-zinc-200 leading-relaxed">{brief.summary}</p>
                  </div>

                  <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                    <h4 className="text-zinc-500 text-sm uppercase tracking-widest mb-4">Key Features</h4>
                    <ul className="space-y-2">
                      {brief.recommendedFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div>
                       <h4 className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Strategic Insight</h4>
                       <p className="text-zinc-400 text-sm italic border-l-2 border-blue-500 pl-4">{brief.strategicInsight}</p>
                    </div>
                    <div>
                       <h4 className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Timeline</h4>
                       <p className="text-white font-mono">{brief.estimatedTimeline}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-zinc-800">
                  <button 
                    onClick={() => setStep('contact')}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    Proceed with this Vision <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'contact' && (
              <motion.form
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSendProject}
                className="flex flex-col gap-6 h-full justify-center"
              >
                <div className="text-center mb-4">
                  <h3 className="text-3xl font-bold text-white mb-2">Let's make it real.</h3>
                  <p className="text-zinc-400">Leave your details and I'll personally review the brief.</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input 
                      type="email" 
                      required
                      placeholder="Your Email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input 
                      type="tel" 
                      required
                      placeholder="Your Phone Number"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button 
                    type="button"
                    onClick={() => setStep('result')}
                    className="flex-1 py-4 border border-zinc-700 text-zinc-300 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
                  >
                    Back to Brief
                  </button>
                  <button 
                    type="submit"
                    disabled={sending}
                    className="flex-1 py-4 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                  >
                     {sending ? <Loader2 className="animate-spin" /> : <Send className="w-4 h-4" />}
                     Send to CEO
                  </button>
                </div>
              </motion.form>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full py-12"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Request Received</h3>
                <p className="text-zinc-400 max-w-md mb-8">
                  Thank you, {contactName}. I have received your project brief and will review your vision shortly. Expect an email at {contactEmail} soon.
                </p>
                <button 
                  onClick={() => {
                    setStep('input');
                    setIdea('');
                    setBrief(null);
                    setContactName('');
                    setContactEmail('');
                    setContactPhone('');
                  }}
                  className="px-8 py-3 border border-zinc-700 rounded-full text-zinc-300 hover:text-white hover:border-white transition-colors"
                >
                  Start New Project
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Added Contact Info */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
           <Reveal>
              <a href="mailto:suciu.andrei.corneliu@gmail.com" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg font-light">suciu.andrei.corneliu@gmail.com</span>
              </a>
           </Reveal>
           
           <Reveal delay={0.1}>
              <a href="tel:+40753066014" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg font-light">+40 753 066 014</span>
              </a>
           </Reveal>
        </div>
      </div>
    </section>
  );
};
