import React, { useState, useEffect } from "react";
import TodoApp from "./TodoApp";
import Login from "./Login";

function App() {
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("nickname");
    if (saved) setNickname(saved);
  }, []);

  if (!nickname) {
    return <Login onLogin={setNickname} />;
  }

  return <TodoApp nickname={nickname} />;
}

export default App;
