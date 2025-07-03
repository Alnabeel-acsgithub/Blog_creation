import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';

interface LoginPageProps {
  onLogin: () => void;
  user: { name?: string | null; email?: string | null } | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-gray-50 shadow-xl rounded-2xl px-6 py-8 w-full max-w-md flex flex-col items-center transition-all duration-300 ease-in-out">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Welcome to Multimodal content generation system</h1>
        <GoogleLoginButton onLogin={onLogin} user={user} />
      </div>
    </div>
  );
};

export default LoginPage;
