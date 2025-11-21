import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for professional feel
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        onLogin();
      } else {
        setError('Thông tin đăng nhập không chính xác.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-concrete-100 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-construction-900 transform -skew-y-6 origin-top-left -translate-y-20 z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-concrete-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full relative z-10 animate-fade-in-up border border-concrete-100">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-construction-50 rounded-2xl flex items-center justify-center text-construction-600 mx-auto mb-6 shadow-inner transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-bold text-construction-900 tracking-tight">Cổng Quản Trị</h2>
          <p className="text-concrete-500 mt-2 text-sm">Hệ thống dành riêng cho quản trị viên</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded flex items-center animate-fade-in">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="block text-xs font-bold text-concrete-500 uppercase tracking-wider ml-1">Tài khoản</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-concrete-400 group-focus-within:text-construction-600 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-concrete-200 rounded-xl text-construction-900 placeholder-concrete-400 focus:outline-none focus:ring-2 focus:ring-construction-500/20 focus:border-construction-500 transition-all bg-concrete-50 focus:bg-white"
                placeholder="Nhập tài khoản..."
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-concrete-500 uppercase tracking-wider ml-1">Mật khẩu</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-concrete-400 group-focus-within:text-construction-600 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-concrete-200 rounded-xl text-construction-900 placeholder-concrete-400 focus:outline-none focus:ring-2 focus:ring-construction-500/20 focus:border-construction-500 transition-all bg-concrete-50 focus:bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-construction-600 hover:bg-construction-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-construction-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-construction-600/30 transition-all transform hover:-translate-y-0.5 mt-4"
          >
            {isLoading ? (
              <span className="animate-pulse">Đang xác thực...</span>
            ) : (
              <>
                Đăng Nhập <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-concrete-100 flex justify-center">
           <button onClick={onCancel} className="text-sm text-concrete-500 hover:text-construction-600 transition-colors font-medium">
             ← Quay về trang chủ
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;