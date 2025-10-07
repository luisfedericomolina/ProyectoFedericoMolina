// components/Toast.jsx
import React from "react";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg text-sm animate-fadeIn">
      {message}
    </div>
  );
}
