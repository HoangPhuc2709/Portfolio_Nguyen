import React, { useState, useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import { Save, LogOut, Layout, Briefcase, Image as ImageIcon, Type, CheckCircle2, RefreshCw, PenTool, AlignLeft, User, MapPin, Share2, Phone, Mail, Globe, Plus, Trash2, Link as LinkIcon, Upload, AlertTriangle, Ruler, HardHat, FileText, Search, Box, Truck, Home, Building2 } from 'lucide-react';
import { Project, AboutData, Experience, ContactData, SocialLink, Service } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { 
    heroData, projects, aboutData, experiences, contactData, services,
    updateHeroData, updateProjectsList, 
    updateAboutData, updateExperienceList, updateContactData, updateServicesList,
    resetToDefault 
  } = useContent();

  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'about' | 'services' | 'contact'>('hero');
  const [notification, setNotification] = useState<string | null>(null);

  // Local state for editing (Buffer)
  const [localHero, setLocalHero] = useState(heroData);
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);
  const [localAbout, setLocalAbout] = useState<AboutData>(aboutData);
  const [localExperience, setLocalExperience] = useState<Experience[]>(experiences);
  const [localServices, setLocalServices] = useState<Service[]>(services);
  const [localContact, setLocalContact] = useState<ContactData>(contactData);

  // Sync local state with context when context updates (initial load or reset)
  useEffect(() => {
    setLocalHero(heroData);
    setLocalProjects(projects);
    setLocalAbout(aboutData);
    setLocalExperience(experiences);
    setLocalServices(services);
    setLocalContact(contactData);
  }, [heroData, projects, aboutData, experiences, services, contactData]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveHero = () => {
    updateHeroData(localHero);
    showNotification('Đã lưu thông tin Banner!');
  };

  const handleSaveProjects = () => {
    updateProjectsList(localProjects);
    showNotification('Đã lưu danh sách dự án!');
  };

  const handleSaveAbout = () => {
    updateAboutData(localAbout);
    updateExperienceList(localExperience);
    showNotification('Đã lưu thông tin Giới thiệu & Kinh nghiệm!');
  };

  const handleSaveServices = () => {
    updateServicesList(localServices);
    showNotification('Đã lưu thông tin Lĩnh vực hoạt động!');
  };

  const handleSaveContact = () => {
    updateContactData(localContact);
    showNotification('Đã lưu thông tin Liên hệ!');
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục dữ liệu mặc định? Mọi thay đổi sẽ bị mất.')) {
      resetToDefault();
      showNotification('Đã khôi phục dữ liệu gốc');
    }
  };

  // Project Management
  const handleAddProject = () => {
    const newId = Math.max(...localProjects.map(p => p.id).concat([0]), 0) + 1;
    const newProject: Project = {
        id: newId,
        title: "Dự án mới",
        category: "Chưa phân loại",
        image: "",
        description: "Mô tả dự án...",
        stats: [
            { label: "Diện tích", value: "0 m²" },
            { label: "Năm", value: "2024" },
            { label: "Ngân sách", value: "0 Tỷ" }
        ]
    };
    setLocalProjects([newProject, ...localProjects]);
    showNotification('Đã thêm dự án mới (Chưa lưu)');
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
        setLocalProjects(localProjects.filter(p => p.id !== id));
    }
  };

  const updateLocalProject = (updatedProject: Project) => {
    setLocalProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleImageUpload = (projectId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Check file size (Limit to ~800KB to prevent localStorage quota exceeded)
        if (file.size > 800 * 1024) {
            alert("Vui lòng chọn ảnh nhỏ hơn 800KB để đảm bảo hiệu suất lưu trữ trình duyệt.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const projectToUpdate = localProjects.find(p => p.id === projectId);
            if (projectToUpdate) {
                updateLocalProject({ ...projectToUpdate, image: base64String });
                showNotification('Đã tải ảnh lên thành công!');
            }
        };
        reader.readAsDataURL(file);
    }
  };

  // Experience Management
  const updateLocalExperience = (updatedExp: Experience) => {
    setLocalExperience(prev => prev.map(e => e.id === updatedExp.id ? updatedExp : e));
  };

  const handleAddExperience = () => {
    const newId = Math.max(...localExperience.map(e => e.id).concat([0]), 0) + 1;
    const newExp: Experience = {
        id: newId,
        role: "Chức danh mới",
        company: "Tên công ty",
        period: "Thời gian",
        description: "Mô tả công việc..."
    };
    setLocalExperience([newExp, ...localExperience]);
    showNotification('Đã thêm mục kinh nghiệm mới');
  };

  const handleDeleteExperience = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục kinh nghiệm này?')) {
        setLocalExperience(localExperience.filter(e => e.id !== id));
    }
  };

  // Services Management
  const updateLocalService = (updatedService: Service) => {
    setLocalServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const handleAddService = () => {
    const newId = Math.max(...localServices.map(s => s.id).concat([0]), 0) + 1;
    const newService: Service = {
        id: newId,
        title: "Dịch vụ mới",
        description: "Mô tả dịch vụ...",
        icon: "HardHat"
    };
    setLocalServices([...localServices, newService]);
    showNotification('Đã thêm dịch vụ mới');
  };

  const handleDeleteService = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
        setLocalServices(localServices.filter(s => s.id !== id));
    }
  };

  // Social Media Management
  const handleAddSocial = () => {
    const newId = Math.max(...(localContact.socialLinks?.map(s => s.id) || [0]), 0) + 1;
    const newLink: SocialLink = {
        id: newId,
        platform: 'facebook',
        url: ''
    };
    setLocalContact({
        ...localContact,
        socialLinks: [...(localContact.socialLinks || []), newLink]
    });
  };

  const handleDeleteSocial = (id: number) => {
    setLocalContact({
        ...localContact,
        socialLinks: localContact.socialLinks.filter(s => s.id !== id)
    });
  };

  const updateSocialLink = (id: number, field: keyof SocialLink, value: string) => {
    setLocalContact({
        ...localContact,
        socialLinks: localContact.socialLinks.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };


  const inputClass = "w-full px-4 py-3 bg-white border border-concrete-200 rounded-lg text-construction-900 placeholder-concrete-400 focus:outline-none focus:ring-4 focus:ring-construction-500/10 focus:border-construction-500 transition-all duration-300 ease-out hover:border-construction-300 shadow-sm";
  const labelClass = "block text-xs font-bold text-concrete-500 uppercase tracking-wider mb-2 flex items-center gap-1.5";

  const availableIcons = [
    { value: 'Ruler', label: 'Thước (Thiết kế)' },
    { value: 'HardHat', label: 'Mũ bảo hộ (Thi công)' },
    { value: 'FileText', label: 'Tài liệu (Pháp lý)' },
    { value: 'Search', label: 'Kính lúp (Thẩm tra)' },
    { value: 'PenTool', label: 'Bút vẽ (Kiến trúc)' },
    { value: 'Box', label: 'Vật liệu (Cung ứng)' },
    { value: 'Truck', label: 'Vận chuyển' },
    { value: 'Home', label: 'Nhà ở' },
    { value: 'Building2', label: 'Tòa nhà' }
  ];

  return (
    <div className="min-h-screen bg-concrete-50 font-sans selection:bg-construction-200 selection:text-construction-900 pb-20">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-construction-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up z-50 border border-construction-700">
          <div className="bg-green-500 rounded-full p-1">
             <CheckCircle2 className="text-white" size={16} />
          </div>
          <span className="font-medium">{notification}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-concrete-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-construction-600 to-construction-800 rounded-lg flex items-center justify-center text-white shadow-lg shadow-construction-600/20">
              <Layout size={20} />
            </div>
            <div>
                <h1 className="font-bold text-lg text-construction-900 leading-tight">CMS Quản Trị</h1>
                <p className="text-[10px] text-concrete-500 font-medium tracking-wide uppercase">Hệ thống Portfolio</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleReset}
              className="p-2.5 text-concrete-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300 tooltip-trigger"
              title="Khôi phục mặc định"
            >
              <RefreshCw size={18} />
            </button>
            <div className="h-8 w-px bg-concrete-200 mx-1"></div>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-concrete-600 hover:text-construction-900 hover:bg-concrete-100 rounded-lg transition-all duration-300"
            >
              <LogOut size={18} /> 
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-concrete-200 overflow-hidden sticky top-24 transition-all duration-300 hover:shadow-md">
            <div className="p-5 border-b border-concrete-100 bg-concrete-50/50">
              <h3 className="text-xs font-extrabold text-concrete-400 uppercase tracking-widest">Menu</h3>
            </div>
            <nav className="p-3 space-y-2">
              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 font-semibold transition-all duration-300 ${
                  activeTab === 'hero' 
                    ? 'bg-construction-50 text-construction-700 shadow-inner border border-construction-100' 
                    : 'text-concrete-500 hover:bg-concrete-50 hover:text-construction-600'
                }`}
              >
                <Layout size={18} className={activeTab === 'hero' ? 'text-construction-600' : 'text-concrete-400'} />
                Banner Trang Chủ
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 font-semibold transition-all duration-300 ${
                  activeTab === 'about' 
                    ? 'bg-construction-50 text-construction-700 shadow-inner border border-construction-100' 
                    : 'text-concrete-500 hover:bg-concrete-50 hover:text-construction-600'
                }`}
              >
                <User size={18} className={activeTab === 'about' ? 'text-construction-600' : 'text-concrete-400'} />
                Giới thiệu & KN
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 font-semibold transition-all duration-300 ${
                  activeTab === 'projects' 
                    ? 'bg-construction-50 text-construction-700 shadow-inner border border-construction-100' 
                    : 'text-concrete-500 hover:bg-concrete-50 hover:text-construction-600'
                }`}
              >
                <Briefcase size={18} className={activeTab === 'projects' ? 'text-construction-600' : 'text-concrete-400'} />
                Dự Án Tiêu Biểu
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 font-semibold transition-all duration-300 ${
                  activeTab === 'services' 
                    ? 'bg-construction-50 text-construction-700 shadow-inner border border-construction-100' 
                    : 'text-concrete-500 hover:bg-concrete-50 hover:text-construction-600'
                }`}
              >
                <HardHat size={18} className={activeTab === 'services' ? 'text-construction-600' : 'text-concrete-400'} />
                Lĩnh vực hoạt động
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 font-semibold transition-all duration-300 ${
                  activeTab === 'contact' 
                    ? 'bg-construction-50 text-construction-700 shadow-inner border border-construction-100' 
                    : 'text-concrete-500 hover:bg-concrete-50 hover:text-construction-600'
                }`}
              >
                <Share2 size={18} className={activeTab === 'contact' ? 'text-construction-600' : 'text-concrete-400'} />
                Liên hệ & Mạng xã hội
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full min-w-0">
            {activeTab === 'hero' && (
              <div className="bg-white rounded-2xl shadow-sm border border-concrete-200 overflow-hidden animate-fade-in transition-all duration-500 hover:shadow-md">
                <div className="p-6 border-b border-concrete-100 bg-gradient-to-r from-white to-concrete-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-construction-900 flex items-center gap-2">
                        <PenTool size={20} className="text-construction-500" />
                        Chỉnh Sửa Banner
                    </h2>
                    <p className="text-sm text-concrete-500 mt-1">Thay đổi nội dung chào mừng ở đầu trang</p>
                  </div>
                  <button 
                    onClick={handleSaveHero}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-construction-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-construction-700 shadow-lg shadow-construction-600/20 transition-all active:scale-95 hover:-translate-y-0.5"
                  >
                    <Save size={18} /> Lưu Thay Đổi
                  </button>
                </div>

                <div className="p-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className={labelClass}>
                        <Type size={14} /> Tên hiển thị (Nhỏ)
                      </label>
                      <input
                        type="text"
                        value={localHero.name}
                        onChange={(e) => setLocalHero({...localHero, name: e.target.value})}
                        className={inputClass}
                        placeholder="VD: Nguyễn Văn A"
                      />
                    </div>
                    
                    <div className="group">
                      <label className={labelClass}>
                        <Type size={14} /> Nút hành động (CTA)
                      </label>
                      <input
                        type="text"
                        value={localHero.cta}
                        onChange={(e) => setLocalHero({...localHero, cta: e.target.value})}
                        className={inputClass}
                        placeholder="VD: Xem Dự Án"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className={labelClass}>
                        <AlignLeft size={14} /> Tiêu đề chính (Lớn)
                    </label>
                    <input
                      type="text"
                      value={localHero.title}
                      onChange={(e) => setLocalHero({...localHero, title: e.target.value})}
                      className={`${inputClass} text-lg font-bold`}
                      placeholder="VD: Kỹ Sư Xây Dựng & Quản Lý Dự Án"
                    />
                  </div>

                  <div className="group">
                    <label className={labelClass}>
                        <AlignLeft size={14} /> Mô tả ngắn
                    </label>
                    <textarea
                      rows={4}
                      value={localHero.subtitle}
                      onChange={(e) => setLocalHero({...localHero, subtitle: e.target.value})}
                      className={inputClass}
                      placeholder="Mô tả ngắn gọn về kinh nghiệm và chuyên môn..."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-8 animate-fade-in">
                 {/* About Section */}
                 <div className="bg-white rounded-2xl shadow-sm border border-concrete-200 overflow-hidden">
                    <div className="p-6 border-b border-concrete-100 bg-gradient-to-r from-white to-concrete-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-construction-900 flex items-center gap-2">
                            <User size={20} className="text-construction-500" />
                            Thông Tin Giới Thiệu
                        </h2>
                        <p className="text-sm text-concrete-500 mt-1">Chỉnh sửa nội dung giới thiệu và kỹ năng</p>
                      </div>
                      <button 
                        onClick={handleSaveAbout}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-construction-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-construction-700 shadow-lg shadow-construction-600/20 transition-all active:scale-95 hover:-translate-y-0.5"
                      >
                        <Save size={18} /> Lưu Tất Cả
                      </button>
                    </div>
                    <div className="p-6 space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                             <label className={labelClass}>Badge (Thẻ nhỏ)</label>
                             <input 
                                type="text" 
                                value={localAbout.badge} 
                                onChange={e => setLocalAbout({...localAbout, badge: e.target.value})} 
                                className={inputClass} 
                             />
                          </div>
                          <div className="md:col-span-2">
                             <label className={labelClass}>Tiêu đề dòng 1</label>
                             <input 
                                type="text" 
                                value={localAbout.titleLine1} 
                                onChange={e => setLocalAbout({...localAbout, titleLine1: e.target.value})} 
                                className={inputClass} 
                             />
                          </div>
                          <div className="md:col-span-3">
                             <label className={labelClass}>Tiêu đề dòng 2 (Điểm nhấn)</label>
                             <input 
                                type="text" 
                                value={localAbout.titleLine2} 
                                onChange={e => setLocalAbout({...localAbout, titleLine2: e.target.value})} 
                                className={inputClass} 
                             />
                          </div>
                       </div>
                       <div>
                          <label className={labelClass}>Đoạn mô tả 1</label>
                          <textarea 
                            rows={3} 
                            value={localAbout.description1} 
                            onChange={e => setLocalAbout({...localAbout, description1: e.target.value})} 
                            className={inputClass} 
                          />
                       </div>
                       <div>
                          <label className={labelClass}>Đoạn mô tả 2</label>
                          <textarea 
                            rows={3} 
                            value={localAbout.description2} 
                            onChange={e => setLocalAbout({...localAbout, description2: e.target.value})} 
                            className={inputClass} 
                          />
                       </div>

                       <div>
                         <label className={labelClass}>Danh sách kỹ năng (Skills)</label>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {localAbout.skills.map((skill, idx) => (
                             <input 
                               key={idx}
                               type="text"
                               value={skill}
                               onChange={(e) => {
                                 const newSkills = [...localAbout.skills];
                                 newSkills[idx] = e.target.value;
                                 setLocalAbout({...localAbout, skills: newSkills});
                               }}
                               className={inputClass}
                             />
                           ))}
                         </div>
                       </div>
                    </div>
                 </div>

                 {/* Experience Section */}
                 <div className="bg-white rounded-2xl shadow-sm border border-concrete-200 overflow-hidden">
                    <div className="p-6 border-b border-concrete-100 bg-gradient-to-r from-white to-concrete-50 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-construction-900 flex items-center gap-2">
                                <Briefcase size={20} className="text-construction-500" />
                                Kinh Nghiệm Làm Việc
                            </h2>
                            <p className="text-sm text-concrete-500 mt-1">Chỉnh sửa các mốc thời gian làm việc</p>
                        </div>
                        <button 
                            onClick={handleAddExperience}
                            className="flex items-center gap-2 px-3 py-1.5 bg-construction-50 text-construction-700 rounded-lg text-sm font-bold hover:bg-construction-100 border border-construction-200 transition-colors shadow-sm"
                        >
                            <Plus size={16} /> Thêm Mới
                        </button>
                    </div>
                    <div className="p-6 space-y-8">
                       {localExperience.map((exp, idx) => (
                          <div key={exp.id} className="bg-concrete-50 p-6 rounded-xl border border-concrete-200 relative group hover:border-construction-200 transition-colors">
                             <div className="flex justify-between items-start mb-4 absolute top-4 right-4 z-10">
                                <button 
                                    onClick={() => handleDeleteExperience(exp.id)}
                                    className="p-2 bg-white text-concrete-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shadow-sm border border-concrete-100"
                                    title="Xóa mục này"
                                >
                                    <Trash2 size={16} />
                                </button>
                             </div>
                             <span className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-white rounded-full text-xs font-bold text-concrete-400 border border-concrete-200 shadow-sm z-10">{idx + 1}</span>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div>
                                   <label className={labelClass}>Vị trí / Chức danh</label>
                                   <input 
                                     type="text" 
                                     value={exp.role}
                                     onChange={e => updateLocalExperience({...exp, role: e.target.value})}
                                     className={inputClass}
                                   />
                                </div>
                                <div>
                                   <label className={labelClass}>Thời gian</label>
                                   <input 
                                     type="text" 
                                     value={exp.period}
                                     onChange={e => updateLocalExperience({...exp, period: e.target.value})}
                                     className={inputClass}
                                   />
                                </div>
                                <div className="md:col-span-2">
                                   <label className={labelClass}>Công ty</label>
                                   <input 
                                     type="text" 
                                     value={exp.company}
                                     onChange={e => updateLocalExperience({...exp, company: e.target.value})}
                                     className={inputClass}
                                   />
                                </div>
                                <div className="md:col-span-2">
                                   <label className={labelClass}>Mô tả công việc</label>
                                   <textarea 
                                      rows={2}
                                      value={exp.description}
                                      onChange={e => updateLocalExperience({...exp, description: e.target.value})}
                                      className={inputClass}
                                   />
                                </div>
                             </div>
                          </div>
                       ))}
                       {localExperience.length === 0 && (
                           <div className="text-center py-8 text-concrete-400 border-2 border-dashed border-concrete-200 rounded-xl">
                               Chưa có thông tin kinh nghiệm làm việc.
                           </div>
                       )}
                    </div>
                 </div>
                 
                 <div className="sticky bottom-6 flex justify-center pt-4 pointer-events-none">
                   <button 
                     onClick={handleSaveAbout}
                     className="pointer-events-auto flex items-center gap-2 bg-construction-600 text-white px-10 py-4 rounded-full font-bold hover:bg-construction-700 shadow-xl shadow-construction-600/40 transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 border-2 border-white/20 backdrop-blur-md"
                   >
                     <Save size={20} /> LƯU THAY ĐỔI
                   </button>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-8 animate-fade-in">
                 <div className="bg-white rounded-2xl shadow-sm border border-concrete-200 overflow-hidden">
                    <div className="p-6 border-b border-concrete-100 bg-gradient-to-r from-white to-concrete-50 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-construction-900 flex items-center gap-2">
                                <HardHat size={20} className="text-construction-500" />
                                Lĩnh Vực Hoạt Động (Dịch vụ)
                            </h2>
                            <p className="text-sm text-concrete-500 mt-1">Quản lý các dịch vụ cung cấp</p>
                        </div>
                        <button 
                            onClick={handleAddService}
                            className="flex items-center gap-2 px-3 py-1.5 bg-construction-50 text-construction-700 rounded-lg text-sm font-bold hover:bg-construction-100 border border-construction-200 transition-colors shadow-sm"
                        >
                            <Plus size={16} /> Thêm Mới
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                           {localServices.map((service, idx) => (
                               <div key={service.id} className="bg-concrete-50 p-6 rounded-xl border border-concrete-200 relative group hover:border-construction-200 transition-colors">
                                    <button 
                                        onClick={() => handleDeleteService(service.id)}
                                        className="absolute top-4 right-4 p-2 bg-white text-concrete-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shadow-sm border border-concrete-100"
                                        title="Xóa dịch vụ này"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                        <div className="md:col-span-2">
                                            <label className={labelClass}>Icon (Biểu tượng)</label>
                                            <select 
                                                value={service.icon}
                                                onChange={(e) => updateLocalService({...service, icon: e.target.value})}
                                                className={`${inputClass} py-2`}
                                            >
                                                {availableIcons.map(icon => (
                                                    <option key={icon.value} value={icon.value}>{icon.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className={labelClass}>Tên dịch vụ</label>
                                            <input 
                                                type="text" 
                                                value={service.title}
                                                onChange={(e) => updateLocalService({...service, title: e.target.value})}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="md:col-span-6">
                                            <label className={labelClass}>Mô tả ngắn</label>
                                            <textarea 
                                                rows={2} 
                                                value={service.description}
                                                onChange={(e) => updateLocalService({...service, description: e.target.value})}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                               </div>
                           ))}
                           {localServices.length === 0 && (
                               <div className="text-center py-8 text-concrete-400 border-2 border-dashed border-concrete-200 rounded-xl">
                                   Chưa có thông tin dịch vụ.
                               </div>
                           )}
                        </div>
                    </div>
                    <div className="p-6 pt-2 flex justify-center">
                        <button 
                            onClick={handleSaveServices}
                            className="flex items-center gap-2 bg-construction-600 text-white px-8 py-3 rounded-full font-bold hover:bg-construction-700 shadow-lg transition-all hover:-translate-y-1"
                        >
                            <Save size={18} /> LƯU THAY ĐỔI
                        </button>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-8 animate-fade-in">
                 <div className="bg-white rounded-2xl shadow-sm border border-concrete-200 overflow-hidden">
                    <div className="p-6 border-b border-concrete-100 bg-gradient-to-r from-white to-concrete-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-construction-900 flex items-center gap-2">
                            <Share2 size={20} className="text-construction-500" />
                            Liên Hệ & Mạng Xã Hội
                        </h2>
                        <p className="text-sm text-concrete-500 mt-1">Quản lý thông tin liên lạc và các liên kết MXH</p>
                      </div>
                      <button 
                        onClick={handleSaveContact}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-construction-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-construction-700 shadow-lg shadow-construction-600/20 transition-all active:scale-95 hover:-translate-y-0.5"
                      >
                        <Save size={18} /> Lưu Thay Đổi
                      </button>
                    </div>

                    <div className="p-6 space-y-8">
                       {/* Contact Info Block */}
                       <div>
                         <h3 className="text-sm font-bold text-concrete-400 uppercase tracking-widest border-b border-concrete-100 pb-2 mb-4">Thông tin liên hệ</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                               <label className={labelClass}>
                                 <Phone size={14} /> Số điện thoại
                               </label>
                               <input 
                                  type="text" 
                                  value={localContact.phone} 
                                  onChange={e => setLocalContact({...localContact, phone: e.target.value})} 
                                  className={inputClass}
                                  placeholder="VD: 0934 862 383"
                               />
                            </div>
                            <div>
                               <label className={labelClass}>
                                 <Mail size={14} /> Email
                               </label>
                               <input 
                                  type="text" 
                                  value={localContact.email} 
                                  onChange={e => setLocalContact({...localContact, email: e.target.value})} 
                                  className={inputClass}
                                  placeholder="VD: email@example.com"
                               />
                            </div>
                            <div className="md:col-span-2">
                               <label className={labelClass}>
                                 <MapPin size={14} /> Địa chỉ
                               </label>
                               <input 
                                  type="text" 
                                  value={localContact.address} 
                                  onChange={e => setLocalContact({...localContact, address: e.target.value})} 
                                  className={inputClass}
                                  placeholder="VD: Tầng 12, Tòa nhà..."
                               />
                            </div>
                         </div>
                       </div>

                       {/* Social Media Block */}
                       <div>
                         <div className="flex justify-between items-center border-b border-concrete-100 pb-2 mb-4">
                            <h3 className="text-sm font-bold text-concrete-400 uppercase tracking-widest">Mạng xã hội</h3>
                            <button 
                                onClick={handleAddSocial}
                                type="button"
                                className="flex items-center gap-1 text-xs font-bold text-construction-600 hover:bg-construction-50 px-2 py-1 rounded transition-colors"
                            >
                                <Plus size={14} /> Thêm
                            </button>
                         </div>
                         
                         <div className="space-y-4">
                            {localContact.socialLinks && localContact.socialLinks.map((link) => (
                                <div key={link.id} className="flex gap-4 items-start bg-concrete-50 p-4 rounded-lg group border border-transparent hover:border-concrete-200">
                                    <div className="w-1/3">
                                        <label className="text-[10px] text-concrete-400 uppercase font-bold mb-1 block">Nền tảng</label>
                                        <div className="relative">
                                            <select
                                                value={link.platform}
                                                onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                                                className={`${inputClass} py-2 appearance-none`}
                                            >
                                                <option value="facebook">Facebook</option>
                                                <option value="linkedin">LinkedIn</option>
                                                <option value="zalo">Zalo</option>
                                                <option value="youtube">YouTube</option>
                                                <option value="instagram">Instagram</option>
                                                <option value="website">Website</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <Globe size={14} className="text-concrete-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-[10px] text-concrete-400 uppercase font-bold mb-1 block">Đường dẫn (URL)</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text"
                                                value={link.url}
                                                onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                                                className={`${inputClass} py-2`}
                                                placeholder="https://..."
                                            />
                                            <button 
                                                onClick={() => handleDeleteSocial(link.id)}
                                                className="p-2 text-concrete-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Xóa liên kết này"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(!localContact.socialLinks || localContact.socialLinks.length === 0) && (
                                <div className="text-center py-4 text-concrete-400 text-sm border border-dashed border-concrete-200 rounded-lg">
                                    Chưa có liên kết mạng xã hội nào.
                                </div>
                            )}
                         </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-end mb-4 px-1">
                   <div>
                        <h2 className="text-2xl font-bold text-construction-900 tracking-tight">Danh Sách Dự Án</h2>
                        <p className="text-concrete-500 mt-1">Quản lý các dự án tiêu biểu của bạn</p>
                   </div>
                   <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-white rounded-full border border-concrete-200 text-sm font-bold text-construction-700 shadow-sm">
                            Tổng: {localProjects.length} dự án
                        </div>
                        <button
                            onClick={handleAddProject}
                            className="flex items-center gap-2 px-4 py-2 bg-construction-600 text-white rounded-full font-bold hover:bg-construction-700 shadow-lg shadow-construction-600/20 transition-all active:scale-95"
                        >
                            <Plus size={18} /> Thêm Dự Án
                        </button>
                   </div>
                </div>

                {localProjects.map((project, index) => (
                   <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-concrete-200 overflow-hidden group transition-all duration-300 hover:shadow-lg hover:border-construction-200 relative">
                      {/* Project Header */}
                      <div className="bg-concrete-50 px-6 py-4 border-b border-concrete-100 flex justify-between items-center group-hover:bg-construction-50/50 transition-colors">
                          <div className="flex items-center gap-4">
                              <span className="bg-white border-2 border-concrete-200 w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold text-concrete-400 shadow-sm group-hover:border-construction-400 group-hover:text-construction-600 transition-all">
                                {index + 1}
                              </span>
                              <span className="font-bold text-lg text-construction-800">{project.title || 'Dự án mới'}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-xs font-bold px-3 py-1.5 bg-white border border-concrete-200 text-construction-600 rounded-full shadow-sm uppercase tracking-wide">
                                {project.category}
                            </div>
                            <button 
                                onClick={() => handleDeleteProject(project.id)}
                                className="p-2 text-concrete-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xóa dự án này"
                            >
                                <Trash2 size={18} />
                            </button>
                          </div>
                      </div>

                      <div className="p-6 lg:p-8">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                              {/* Left Col: Image (4 cols) */}
                              <div className="lg:col-span-4 space-y-4">
                                  <label className={labelClass}>
                                      <ImageIcon size={14} /> Hình ảnh bìa
                                  </label>
                                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-concrete-100 border-2 border-concrete-100 relative group/img shadow-inner cursor-pointer">
                                      <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" 
                                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image')} 
                                      />
                                      {/* Overlay with File Input */}
                                      <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer">
                                          <Upload size={32} className="text-white mb-2" />
                                          <span className="text-white font-bold text-sm">Tải ảnh lên</span>
                                          <span className="text-white/70 text-xs mt-1">(Max: 800KB)</span>
                                          <input 
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={(e) => handleImageUpload(project.id, e)}
                                          />
                                      </label>
                                  </div>
                                  <div className="relative">
                                    <span className="text-xs text-concrete-400 absolute left-3 top-1/2 transform -translate-y-1/2 font-bold">URL:</span>
                                    <input
                                        type="text"
                                        value={project.image}
                                        onChange={(e) => updateLocalProject({...project, image: e.target.value})}
                                        className={`${inputClass} text-xs py-2 pl-10`}
                                        placeholder="Hoặc dán link ảnh..."
                                    />
                                  </div>
                                  <div className="flex items-start gap-2 text-[10px] text-yellow-600 bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                                     <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                                     <span>Lưu ý: Dùng ảnh dung lượng thấp để tránh lỗi bộ nhớ trình duyệt.</span>
                                  </div>
                              </div>

                              {/* Right Col: Details (8 cols) */}
                              <div className="lg:col-span-8 space-y-6">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                      <div>
                                          <label className={labelClass}>Tên dự án</label>
                                          <input
                                            type="text"
                                            value={project.title}
                                            onChange={(e) => updateLocalProject({...project, title: e.target.value})}
                                            className={inputClass}
                                          />
                                      </div>
                                      <div>
                                          <label className={labelClass}>Loại hình</label>
                                          <input
                                            type="text"
                                            value={project.category}
                                            onChange={(e) => updateLocalProject({...project, category: e.target.value})}
                                            className={inputClass}
                                          />
                                      </div>
                                  </div>

                                  <div>
                                      <label className={labelClass}>Mô tả chi tiết</label>
                                      <textarea
                                        rows={3}
                                        value={project.description}
                                        onChange={(e) => updateLocalProject({...project, description: e.target.value})}
                                        className={`${inputClass} resize-none leading-relaxed`}
                                      />
                                  </div>

                                  {/* Stats Editing Section */}
                                  <div className="bg-concrete-50/80 p-5 rounded-xl border border-concrete-200/80 hover:border-construction-200 transition-colors">
                                      <label className="block text-xs font-bold text-construction-600 uppercase mb-4 flex items-center gap-2">
                                        <AlignLeft size={14} />
                                        Thông số kỹ thuật (Stats)
                                      </label>
                                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                          {project.stats.map((stat, statIndex) => (
                                              <div key={statIndex} className="bg-white p-3 rounded-lg border border-concrete-200 shadow-sm focus-within:ring-2 focus-within:ring-construction-500/20 focus-within:border-construction-500 transition-all">
                                                  <div className="mb-1">
                                                    <input
                                                        type="text"
                                                        value={stat.label}
                                                        onChange={(e) => {
                                                            const newStats = [...project.stats];
                                                            newStats[statIndex] = { ...stat, label: e.target.value };
                                                            updateLocalProject({ ...project, stats: newStats });
                                                        }}
                                                        className="w-full text-[10px] text-concrete-400 uppercase font-bold border-none p-0 focus:ring-0 bg-transparent placeholder-concrete-300 tracking-wider"
                                                        placeholder="NHÃN"
                                                    />
                                                  </div>
                                                  <input
                                                      type="text"
                                                      value={stat.value}
                                                      onChange={(e) => {
                                                          const newStats = [...project.stats];
                                                          newStats[statIndex] = { ...stat, value: e.target.value };
                                                          updateLocalProject({ ...project, stats: newStats });
                                                      }}
                                                      className="w-full text-sm font-bold text-construction-800 border-none p-0 focus:ring-0 bg-transparent placeholder-concrete-300"
                                                      placeholder="Giá trị..."
                                                  />
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                   </div>
                ))}
                
                <div className="sticky bottom-6 flex justify-center pt-4 pointer-events-none">
                   <button 
                     onClick={handleSaveProjects}
                     className="pointer-events-auto flex items-center gap-2 bg-construction-600 text-white px-10 py-4 rounded-full font-bold hover:bg-construction-700 shadow-xl shadow-construction-600/40 transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 border-2 border-white/20 backdrop-blur-md"
                   >
                     <Save size={20} /> LƯU TẤT CẢ
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;