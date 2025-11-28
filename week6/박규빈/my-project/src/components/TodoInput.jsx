import React from 'react';

function TodoInput({ value, onChange, onSubmit, inputRef }) {
  return (
    <form className="flex gap-2.5 mb-6" onSubmit={onSubmit}>
      <input
        type="text"
        className="flex-grow p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500"
        placeholder="할 일을 입력하세요."
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
      />
      <button
        type="submit"
        className="px-5 py-3 border-none bg-teal-500 text-white text-base font-bold rounded-lg cursor-pointer transition hover:bg-teal-600"
      >
        추가
      </button>
    </form>
  );
}

export default TodoInput;
