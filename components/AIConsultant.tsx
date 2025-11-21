import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot, Zap } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Chào bạn! Tôi là trợ lý ảo hỗ trợ kỹ thuật. Bạn cần tư vấn về tiêu chuẩn xây dựng, kết cấu hay thông tin về các dự án đã thực hiện?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Format history for the API
    const history = messages.map(msg => ({ role: msg.role, text: msg.text }));

    const responseText = await getChatResponse(userMessage.text, history);

    const botMessage: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <section id="ai-consultant" className="py-20 bg-gradient-to-br from-concrete-100 to-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 reveal">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-construction-100 text-construction-700 rounded-full text-sm font-bold mb-4">
              <Zap size={18} className="text-safety-500" /> Tư Vấn Trực Tuyến
            </span>
            <h2 className="text-3xl font-bold text-construction-900">Hỗ Trợ Kỹ Thuật 24/7</h2>
            <p className="text-concrete-600 mt-2">
              Giải đáp thắc mắc về kỹ thuật và thông tin dự án ngay lập tức.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border border-concrete-200 overflow-hidden flex flex-col h-[600px] reveal" style={{ transitionDelay: '200ms' }}>
            {/* Chat Header */}
            <div className="bg-construction-800 p-4 flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-construction-800 font-bold">
                    <Bot size={24} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-construction-800 animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-white">Trợ lý Kỹ sư</h3>
                <p className="text-xs text-concrete-300">Hệ thống phản hồi tự động</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-concrete-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-construction-600 text-white' : 'bg-construction-200 text-construction-700'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-construction-600 text-white rounded-tr-none'
                        : 'bg-white text-construction-900 border border-concrete-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-full bg-construction-200 flex items-center justify-center text-construction-700 flex-shrink-0">
                        <Bot size={16} />
                    </div>
                    <div className="bg-white border border-concrete-200 rounded-2xl rounded-tl-none p-4 flex items-center">
                        <Loader2 className="w-5 h-5 animate-spin text-construction-600" />
                        <span className="ml-2 text-sm text-concrete-500">Đang tra cứu thông tin...</span>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-concrete-200">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ví dụ: Kết cấu móng cọc khoan nhồi có ưu điểm gì?"
                  className="flex-1 px-4 py-3 bg-concrete-100 border-transparent focus:bg-white focus:border-construction-500 rounded-xl outline-none transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-construction-600 text-white rounded-xl font-semibold hover:bg-construction-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send size={18} />
                  <span className="hidden sm:inline">Gửi</span>
                </button>
              </form>
              <p className="text-xs text-center text-concrete-400 mt-2">
                Thông tin mang tính chất tham khảo. Vui lòng liên hệ trực tiếp để được tư vấn chi tiết.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;