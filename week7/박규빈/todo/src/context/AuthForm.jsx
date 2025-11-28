import React from 'react';

export default function AuthForm({ title, children, onSubmit }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#121212]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl dark:bg-[#1e1e1e]">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">
          {title}
        </h1>
        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </div>
  );
}
