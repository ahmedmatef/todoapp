import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = inputText;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, inputText]);
      }
      setInputText('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditTodo = (index: number) => {
    setInputText(todos[index]);
    setEditIndex(index);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Add Todo"
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {todo}
            <div>
              <button className="btn btn-warning me-2" onClick={() => handleEditTodo(index)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDeleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;



