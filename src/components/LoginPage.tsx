import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';

interface LoginPageProps {
  onLogin: () => void;
  user: { name?: string | null; email?: string | null } | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Welcome to Blog Creation</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">Sign in with Google to start generating content with AI-powered tools.</p>
        <GoogleLoginButton onLogin={onLogin} user={user} />
      </div>
    </div>
  );
};

export default LoginPage;
