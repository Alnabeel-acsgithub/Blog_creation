import React from 'react';

interface LogoutModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl px-8 py-6 max-w-sm w-full flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Log out?</h2>
        <p className="text-gray-600 mb-6 text-center">Are you sure you want to log out?</p>
        <div className="flex gap-4 w-full justify-center">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition shadow">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
