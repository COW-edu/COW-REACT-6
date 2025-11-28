import React from 'react';

export default function AuthInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  id,
  onKeyDown,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-[#f1f3f5]">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#2c2c2c] dark:border-[#444] dark:text-white"
      />
    </div>
  );
}
