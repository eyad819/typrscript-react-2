import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
type props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const SingleTodo = ({ todo, todos, setTodos }: props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (eo: React.FormEvent, id: number) => {
    eo.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  },[edit]
  )
  return (
    <form className="todos__single" onSubmit={(eo) => {
      handleEdit(eo,todo.id)
    }
    }>
      {edit ? (
        <input
        ref={inputRef}
          className="todos-single--text"
          value={editTodo}
          onChange={(eo) => {
            setEditTodo(eo.target.value);
          }}
        />
      ) : todo.isDone ? (
        <s className="todos-single--text">{todo.todo}</s>
      ) : (
        <span className="todos-single--text">{todo.todo}</span>
      )}

      <div>
        <span
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
          className="icon"
        >
          {" "}
          <AiFillEdit />
        </span>
        <span
          onClick={() => {
            handleDelete(todo.id);
          }}
          className="icon"
        >
          {" "}
          <AiFillDelete />
        </span>
        <span
          onClick={() => {
            handleDone(todo.id);
          }}
          className="icon"
        >
          {" "}
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
