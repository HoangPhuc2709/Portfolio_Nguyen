import React, { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Linkedin, Facebook, Youtube, Globe, MessageCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Contact: React.FC = () => {
  const { contactData } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook size={24} />;
      case 'linkedin': return <Linkedin size={24} />;
      case 'youtube': return <Youtube size={24} />;
      case 'zalo': return <MessageCircle size={24} />;
      case 'instagram': return <Globe size={24} />; 
      default: return <Globe size={24} />;
    }
  };

  return (
    <section id="contact" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="reveal">
            <span className="text-safety-500 font-semibold tracking-wider uppercase">Liên Hệ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-construction-900 mt-2 mb-6">
              Sẵn Sàng Cho Dự Án Mới?
            </h2>
            <p className="text-concrete-600 text-lg mb-8">
              Hãy để lại thông tin hoặc liên hệ trực tiếp để chúng ta cùng thảo luận về giải pháp xây dựng tối ưu cho công trình của bạn.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-construction-100 rounded-full flex items-center justify-center text-construction-600 flex-shrink-0 group-hover:bg-construction-600 group-hover:text-white transition-colors duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-construction-900">Điện thoại</h4>
                  <p className="text-concrete-600">{contactData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-construction-100 rounded-full flex items-center justify-center text-construction-600 flex-shrink-0 group-hover:bg-construction-600 group-hover:text-white transition-colors duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-construction-900">Email</h4>
                  <p className="text-concrete-600">{contactData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-construction-100 rounded-full flex items-center justify-center text-construction-600 flex-shrink-0 group-hover:bg-construction-600 group-hover:text-white transition-colors duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-construction-900">Văn phòng</h4>
                  <p className="text-concrete-600">{contactData.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4 flex-wrap">
              {contactData.socialLinks && contactData.socialLinks.map((link) => (
                 <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-3 bg-concrete-100 text-construction-600 rounded-full hover:bg-construction-600 hover:text-white transition-colors transform hover:-translate-y-1"
                    title={link.platform}
                 >
                    {getIcon(link.platform)}
                 </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-concrete-50 p-8 rounded-2xl shadow-sm border border-concrete-100 reveal" style={{ transitionDelay: '200ms' }}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-construction-800 mb-2">Họ và tên</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-concrete-200 focus:ring-2 focus:ring-construction-500 focus:border-transparent outline-none transition-all" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-construction-800 mb-2">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-concrete-200 focus:ring-2 focus:ring-construction-500 focus:border-transparent outline-none transition-all" placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-construction-800 mb-2">Số điện thoại</label>
                <input type="tel" id="phone" className="w-full px-4 py-3 rounded-lg border border-concrete-200 focus:ring-2 focus:ring-construction-500 focus:border-transparent outline-none transition-all" placeholder="0912..." />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-construction-800 mb-2">Nội dung cần tư vấn</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-concrete-200 focus:ring-2 focus:ring-construction-500 focus:border-transparent outline-none transition-all" placeholder="Tôi cần tư vấn về dự án..."></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-construction-600 text-white font-bold rounded-lg hover:bg-construction-700 transition-all shadow-lg shadow-construction-600/20 hover:shadow-construction-600/40 hover:-translate-y-0.5 active:translate-y-0">
                Gửi Tin Nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;