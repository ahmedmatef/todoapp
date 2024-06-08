import React from "react";

const TodoInput = ({ task, setTask, addTask }) => {
  return (
    <form className="p-5 d-flex justify-content-center" onSubmit={addTask}>
      <input
        className="form-control w-50 me-3"
        placeholder="Add a new task"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="btn btn-cre">
        Create
      </button>
    </form>
  );
};

export default TodoInput;
