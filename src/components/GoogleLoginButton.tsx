import React from 'react';

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
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.68 1.22 9.17 3.23l6.85-6.85C36.89 2.36 30.84 0 24 0 14.61 0 6.44 5.82 2.45 14.19l7.98 6.2C12.44 13.06 17.78 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.09 24.55c0-1.63-.15-3.22-.42-4.74H24v9.09h12.41c-.54 2.91-2.16 5.38-4.62 7.04l7.19 5.59C43.95 37.32 46.09 31.41 46.09 24.55z"/>
              <path fill="#FBBC05" d="M10.43 28.38c-1.08-3.21-1.08-6.67 0-9.88l-7.98-6.2C.82 16.13 0 19.01 0 22c0 2.99.82 5.87 2.45 8.7l7.98-6.2z"/>
              <path fill="#EA4335" d="M24 44c6.84 0 12.89-2.36 17.02-6.43l-7.19-5.59c-2.01 1.35-4.59 2.13-7.83 2.13-6.22 0-11.56-3.56-13.57-8.69l-7.98 6.2C6.44 42.18 14.61 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
