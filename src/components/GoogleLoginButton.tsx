import React from 'react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginButtonProps {
  onLogin: () => void;
  user?: { name?: string | null; email?: string | null } | null;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLogin, user }) => {
  return (
    <div className="w-full flex justify-center">
      {user ? (
        <div className="text-green-700 font-semibold text-lg">Welcome, {user.name || user.email}!</div>
      ) : (
        <button
          onClick={onLogin}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg shadow hover:bg-blue-50 hover:shadow-md transition font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FcGoogle className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
