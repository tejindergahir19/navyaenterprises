import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ArrowUpRight, 
  RotateCcw, 
  Calculator, 
  ShieldCheck, 
  Flame, 
  ChevronDown,
  Layers,
  PhoneCall
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { PRODUCTS } from '../data/products';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    whatsappText: string;
  };
}

export const FoundryChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: '1',
      sender: 'bot',
      text: "Hello! I am your **Navexo Foundry & Technical Assistant**.\n\nAsk me about **riser sizing formulas (Chvorinov's Rule, Modulus calculation)**, **preventing shrinkage defects**, **product selection**, or **pricing & samples** from our Ludhiana plant.",
      timestamp: 'Just now'
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const quickQuestions = [
    "How to calculate Riser Modulus?",
    "Which sleeve for Ductile Iron?",
    "Open vs Neck-Down sleeve?",
    "How to stop shrinkage porosity?",
    "Get bulk price & samples"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      setIsOpen(true);
      const customEvent = e as CustomEvent<{ question?: string }>;
      if (customEvent.detail?.question) {
        setTimeout(() => {
          handleSendMessage(customEvent.detail!.question);
        }, 150);
      }
    };
    window.addEventListener('open-foundry-chatbot', handleOpen);
    return () => window.removeEventListener('open-foundry-chatbot', handleOpen);
  }, []);

  // Intelligent Foundry Knowledge Base Responder
  const generateBotReply = (query: string): { text: string; whatsappText?: string } => {
    const q = query.toLowerCase();

    // 1. Modulus and Formulas
    if (q.includes('formula') || q.includes('modulus') || q.includes('chvorinov') || q.includes('calculate') || q.includes('math') || q.includes('rule')) {
      return {
        text: `### 📐 Riser Modulus & Chvorinov's Formula\n\n` +
          `1. **Geometric Modulus ($M$)**:\n` +
          `   $$M = \\frac{\\text{Volume}(V)}{\\text{Cooling Surface Area}(A)}$$\n\n` +
          `2. **Chvorinov's Freezing Time ($t_s$)**:\n` +
          `   $$t_s = C_m \\cdot M^2$$\n` +
          `   The riser must solidify **after** the casting to feed molten metal continuously.\n\n` +
          `3. **Navexo Exothermic Advantage**:\n` +
          `   - Conventional sand risers require $M_{\\text{riser}} \\ge 1.2 \\times M_{\\text{casting}}$.\n` +
          `   - **Navexo Exothermic Sleeves** provide an expansion factor of **$f_M = 1.45$ to $1.60$** due to 1,500°C exothermic heat output.\n` +
          `   - *Result*: You can use an exothermic sleeve that is **50% to 70% smaller** in volume than a sand riser while achieving the same feeding time!\n\n` +
          `Would you like our engineering team to calculate the exact sleeve size for your pattern equipment?`,
        whatsappText: `Hello Navexo, I need help calculating the exact riser modulus and sleeve size for our casting pattern.`
      };
    }

    // 2. Shrinkage & Porosity Defects
    if (q.includes('shrinkage') || q.includes('defect') || q.includes('porosity') || q.includes('cavity') || q.includes('pipe') || q.includes('rejection')) {
      return {
        text: `### 🛡️ How Navexo Eliminates Shrinkage Defects\n\n` +
          `- **Primary Pipe Cavity**: Caused when sand risers freeze on top. Navexo exothermic sleeves maintain an ignition plateau of **1,450°C - 1,550°C**, keeping the riser top molten and pulling the pipe safely into the feeder crown away from your casting.\n\n` +
          `- **Centerline & Micro-Porosity**: Occurs when directional temperature gradient is too weak. Navexo sleeves create a steep temperature gradient ($T_{\\text{riser}} \\gg T_{\\text{casting}}$), ensuring liquid metal feeds the dendrites until 100% solid.\n\n` +
          `- **Top Surface Radiation**: Pair with **Navexo APC Powder** or **Exothermic Powder** (25KG bags) on the open riser head to lock in thermal energy.\n\n` +
          `Are you facing shrinkage in a specific part geometry? Send us a drawing on WhatsApp for free analysis.`,
        whatsappText: `Hello Navexo, we are getting shrinkage defects on our casting. Can your engineering team review our riser layout?`
      };
    }

    // 3. Neck-Down vs Open vs Blind
    if (q.includes('neck') || q.includes('open') || q.includes('blind') || q.includes('compare') || q.includes('types')) {
      return {
        text: `### 🔍 Sleeve Comparison Guide\n\n` +
          `1. **Open Sleeves**: Best for standard top feeding with direct visual confirmation of mold filling.\n` +
          `2. **Neck-Down Sleeves**: Engineered with a tapered bottom breaker-core notch. Cuts contact area by up to 70%, allowing you to **knock off the riser with a hammer** — no torch cutting or heavy grinding needed!\n` +
          `3. **Blind Sleeves**: Closed hemispherical dome with an atmospheric Williams pin. Essential for deep mold cavities or side-feeding where top access is blocked.\n` +
          `4. **Direct Pour Sleeves**: Integrated pouring cup with ceramic filter seat, eliminating separate runner channels.\n\n` +
          `Which molding line do you operate (Hand molding, ARPA, or High-pressure DISA)?`,
        whatsappText: `Hello Navexo, I want to compare Open vs Neck-Down sleeves for our molding line.`
      };
    }

    // 4. Ductile Iron / Grey Iron / Steel Alloy suitability
    if (q.includes('ductile') || q.includes('grey') || q.includes('sg iron') || q.includes('steel') || q.includes('alloy') || q.includes('cast iron')) {
      return {
        text: `### ⚙️ Alloy Suitability\n\n` +
          `- **Ductile / SG Iron (Grade 400/15, 500/7, 600/3)**: Highly susceptible to secondary shrinkage. Navexo Neck-down & Open sleeves provide prolonged high-pressure liquid feed during eutectic expansion.\n` +
          `- **Grey Iron (CI 20, 25, 30)**: Use Navexo sleeves to optimize yield and eliminate hot spot porosity at boss and flange junctions.\n` +
          `- **Cast Steel (WCB, High Chrome, Low Alloy)**: Navexo refractory formulation resists steel pouring temperatures up to **1,650°C** with zero carbon pick-up or erosion.\n\n` +
          `Let us know your daily pouring volume for a direct factory rate.`,
        whatsappText: `Hello Navexo, we pour Ductile/Grey Iron/Steel castings and need sleeve recommendations.`
      };
    }

    // 5. Powders (APC & Exothermic Powder)
    if (q.includes('powder') || q.includes('apc') || q.includes('flux') || q.includes('cover') || q.includes('anti-piping') || q.includes('anti piping')) {
      return {
        text: `### 🧪 Navexo Foundry Consumables (25 KG Bags)\n\n` +
          `1. **Navexo APC Powder (Anti-Piping Compound)**:\n` +
          `   - Highly insulating cover powder applied over open liquid risers.\n` +
          `   - Expands on molten metal contact to form a thermal blanket, reducing radiation heat loss by over 80%.\n\n` +
          `2. **Navexo Exothermic Powder**:\n` +
          `   - High-heat aluminothermic powder that vigorously ignites on the metal surface.\n` +
          `   - Generates immediate localized heat to remelt prematurely frozen crusts and keep feed paths open.\n\n` +
          `Supplied in heavy-duty 25KG moisture-proof bags from our Ludhiana plant.`,
        whatsappText: `Hello Navexo, please quote pricing for 25KG bags of APC Powder and Exothermic Powder.`
      };
    }

    // 6. Pricing, Samples, Factory, MOQ, Ludhiana
    if (q.includes('price') || q.includes('rate') || q.includes('quote') || q.includes('sample') || q.includes('trial') || q.includes('cost') || q.includes('order') || q.includes('buy') || q.includes('ludhiana') || q.includes('moq')) {
      return {
        text: `### 🏭 Factory Direct Pricing & Samples\n\n` +
          `We are the direct manufacturers (**Navya Enterprises**) based in **Ludhiana, Punjab**:\n` +
          `- **Plant Address**: Vill. Nichi Mangli, Premier Complex, Near Isher Kanda, Chandigarh Road, Ludhiana.\n` +
          `- **Stock**: 100,000+ heat-dried sleeves ready in stock for immediate dispatch across India.\n` +
          `- **Trial Samples**: We provide sample trial batches customized to your pattern pins.\n` +
          `- **Direct Contact**: +91 82888 75986 / +91 99881 55383\n\n` +
          `Click below to discuss pricing directly on WhatsApp with our sales manager!`,
        whatsappText: `Hello Navya Enterprises, I would like to get a price quotation and sample batch for trial at our foundry.`
      };
    }

    // Default Fallback
    return {
      text: `### 💡 Navexo Foundry Technical Help\n\n` +
        `I can assist you with:\n` +
        `- **Sleeve Sizing**: Chvorinov's formula & Modulus ($M_f$) calculations.\n` +
        `- **Defect Elimination**: Shrinkage cavities, porosity, and low casting yield.\n` +
        `- **Product Selection**: Open, Neck-Down, Blind, Insulating, Direct Pour sleeves, or APC powders.\n` +
        `- **Factory Quotation**: Direct pricing and sample trial kits from Navya Enterprises, Ludhiana.\n\n` +
        `Feel free to ask any question or tap one of the suggested topics below!`,
      whatsappText: `Hello Navexo, I have an inquiry regarding your exothermic riser sleeves.`
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Now'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const reply = generateBotReply(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply.text,
        timestamp: 'Just now',
        suggestedAction: reply.whatsappText ? {
          label: 'Continue on WhatsApp',
          whatsappText: reply.whatsappText
        } : undefined
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleWhatsAppRedirect = (customText: string) => {
    const encoded = encodeURIComponent(customText);
    window.open(`https://wa.me/918288875986?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <button
          id="foundry-ai-chatbot-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10 sm:h-14 sm:w-auto sm:px-5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center sm:justify-start gap-2.5 shadow-2xl shadow-black/80 border border-amber-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md group"
          aria-label="Ask Navexo Foundry Assistant"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors shrink-0">
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">Ask Foundry AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-[10px] text-neutral-400 block font-mono">Formulas & Sizing</span>
          </div>
        </button>
      </div>

      {/* Chat Window Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-24 left-4 sm:left-6 right-4 sm:right-auto z-50 w-auto sm:w-[420px] h-[520px] sm:h-[560px] bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white">Navexo Foundry AI</h3>
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                    Online
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 block font-mono">
                  Navya Enterprises • Technical Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(initialMessages)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-neutral-900/60 border-b border-neutral-800/80 overflow-x-auto scrollbar-none flex items-center gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border border-neutral-700/60 cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-neutral-950 font-medium rounded-br-xs'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-xs space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">
                    {m.text}
                  </div>

                  {/* Optional Suggested WhatsApp Transfer Action */}
                  {m.suggestedAction && (
                    <div className="pt-2 border-t border-neutral-800 mt-2">
                      <button
                        onClick={() => handleWhatsAppRedirect(m.suggestedAction!.whatsappText)}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md whitespace-nowrap"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-white shrink-0" />
                        <span>{m.suggestedAction.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-neutral-500 px-1 mt-1 font-mono">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 w-16 p-2.5 rounded-2xl rounded-bl-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-neutral-900 border-t border-neutral-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about modulus formulas, defects, prices..."
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-neutral-950 font-bold transition-all cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono mt-2 px-1">
              <span>Instant foundry formula calculations</span>
              <a 
                href="https://wa.me/918288875986" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 hover:underline flex items-center gap-0.5"
              >
                <span>Live Engineer</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
