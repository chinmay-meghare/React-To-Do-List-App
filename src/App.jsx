import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css";

const App = () => {
  // Load todos from localStorage when the app starts
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  // DARK MODE STATE (Check localStorage for saved theme)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Save todos to localStorage whenever `todos` state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Apply theme when darkMode state changes
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // FUNCTION: Add new todo with basic validation
  const addTodo = () => {
    if (input.trim()) {
      if (editingTodo) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === editingTodo.id ? { ...todo, text: input } : todo
          )
        );
        setEditingTodo(null);
      } else {
        setTodos((prevTodos) => [
          ...prevTodos,
          { id: Date.now(), text: input, completed: false, isPriority: false },
        ]);
      }
      setInput("");
    }
  };

  // FUNCTION: Toggle priority and sort by priority status
  const togglePriority = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isPriority: !todo.isPriority } : todo
      );
      return [...updatedTodos].sort((a, b) => b.isPriority - a.isPriority);
    });
  };

  // FUNCTION: Handle Edit Button Click
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setInput(todo.text);
  };

  return (
    // MAIN CONTAINER with Dark Mode Support
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-red-200 dark:from-blue-900 dark:to-blue-950">
      {/* DARK MODE TOGGLE BUTTON */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* TODO LIST CONTAINER */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-12 w-[70%] text-gray-900 dark:text-white">
        {/* HEADER */}
        <h1 className="text-3xl font-serif mb-4">React Todo List App ✅</h1>

        {/* INPUT SECTION */}
        <div className="mb-4 flex gap-[2%]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
            className="w-[85%] border border-black dark:border-white rounded-l-lg px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
            placeholder={editingTodo ? "Edit todo..." : "Add a new Task"}
          />
          <button
            onClick={addTodo}
            className="w-[13%] bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4"
          >
            {editingTodo ? "Update" : "Add"}
          </button>
        </div>

        {/* TODO ITEMS LIST */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center p-3 rounded-lg bg-slate-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-transform transform animate-slide-up"
            >
              {/* PRIORITY STAR */}
              <div className="mr-2" onClick={() => togglePriority(todo.id)}>
                <FontAwesomeIcon
                  icon={todo.isPriority ? solidStar : regularStar}
                  className={
                    todo.isPriority ? "text-yellow-500" : "text-gray-500"
                  }
                />
              </div>

              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
                className="mr-2 h-5 w-5"
              />

              {/* TODO TEXT */}
              <span
                className={`flex-grow ${
                  todo.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {todo.text}
              </span>

              {/* EDIT BUTTON */}
              <button
                onClick={() => handleEdit(todo)}
                className="ml-2 p-2 rounded-lg bg-blue-200 dark:bg-blue-600 hover:bg-blue-600"
              >
                Edit
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                className="ml-2 p-2 rounded-lg bg-red-200 text-white hover:bg-red-600"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* FOOTER */}
      <footer className="mt-5 mb-4 text-center w-full text-gray-800 dark:text-gray-200 font-medium text-sm md:text-base">
        Created with <span className="animate-pulse">💗</span> by Chinmay
        Meghare
      </footer>
    </div>
  );
};

export default App;
