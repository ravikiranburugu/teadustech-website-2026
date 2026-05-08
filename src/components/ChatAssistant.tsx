import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Send, X, MessageSquare, Loader2, User, Bot, HelpCircle, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SUGGESTIONS = [
  "What business solutions do you offer?",
  "Tell me about the Skill Hub tracks.",
  "How can I architect a scalable web app?",
  "What is Digital Learning path?",
];

interface Message {
  role: "user" | "model";
  content: string;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    const messageText = text.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `You are a technical support assistant for TEADUSTECH. 
          You help users with technical inquiries, explaining our services (Web Building, Maintenance, Automations, Product Design) and Skill Hub tracks (Data Engineering, Security, Cloud Native, AI/ML). 
          
          FORMATTING RULES:
          - Use Markdown for ALL responses.
          - Use bolding for key terms.
          - Use bullet points for lists.
          - Use headings (###) for sections.
          - Keep responses concise but highly professional.
          
          If you don't know something about TEADUSTECH internal details, advise them to contact support@teadustech.com.`,
        },
      });

      let fullResponse = "";
      setMessages((prev) => [...prev, { role: "model", content: "" }]);

      for await (const chunk of response) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullResponse += chunkText;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: "model",
              content: fullResponse,
            };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "Sorry, I encountered an error. Please try again later or contact support@teadustech.com." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[420px] h-[600px] bg-white border border-outline-variant shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg relative">
                  <Bot size={20} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-primary rounded-full" />
                </div>
                <div>
                  <h3 className="font-label-md font-bold">TEADUS Assistant</h3>
                  <p className="text-[10px] opacity-80 uppercase tracking-wider">Expert Strategy & Support</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 bg-surface-container-lowest"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-full py-8 text-center space-y-6">
                  <div className="bg-primary/5 p-6 rounded-full">
                    <Sparkles size={40} className="text-primary" />
                  </div>
                  <div className="px-6">
                    <h4 className="font-headline-sm text-primary mb-2">Welcome to TEADUSTECH</h4>
                    <p className="font-body-md text-on-surface-variant">
                      I'm your AI strategist. How can I help you modernize your operations or accelerate your technical skills today?
                    </p>
                  </div>
                  
                  <div className="w-full space-y-2 px-4">
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest text-left ml-2">Suggested Topics</p>
                    <div className="flex flex-wrap gap-2">
                       {SUGGESTIONS.map((s) => (
                         <button 
                           key={s}
                           onClick={() => handleSend(s)}
                           className="text-xs bg-white border border-outline-variant hover:border-primary hover:text-primary px-3 py-2 rounded-lg transition-all text-left"
                         >
                           {s}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div 
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.role === "user" ? "bg-secondary text-white" : "bg-primary text-on-primary"}`}>
                      {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm ${m.role === "user" ? "bg-primary text-on-primary rounded-tr-none" : "bg-white border border-outline-variant text-on-surface rounded-tl-none shadow-sm"}`}>
                      <div className="markdown-body prose prose-sm max-w-none prose-headings:text-primary prose-a:text-primary">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                      {isLoading && i === messages.length - 1 && !m.content && (
                        <Loader2 size={16} className="animate-spin text-primary" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && messages.length > 0 && messages[messages.length-1].role === 'user' && (
                <div className="flex justify-start">
                   <div className="flex gap-2 max-w-[85%] flex-row">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary text-on-primary shadow-sm">
                      <Bot size={16} />
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-outline-variant shadow-sm rounded-tl-none">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-outline-variant bg-white">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your question..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm shadow-inner"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-30"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-[10px] text-center mt-2 text-secondary font-medium">
                Powered by Gemini 1.5 Flash • Technical Support Desk
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-all border-4 border-white/20 relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
