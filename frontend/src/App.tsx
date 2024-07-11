import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface todo {
  id: number;
  title: string;
  complete: boolean;
}
function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<todo[]>([]);
  useEffect(() => {
    async function getTodos() {
      const { data } = await axios.get("https://13.233.105.2:3000/");
      const todosReq = data.todos;
      setTodos([...todosReq]);
    }
    getTodos();
  }, []);
  const handleInput = (e: any) => {
    setTitle(e.target.value);
  };
  const handleAddClick = async () => {
    const { data } = await axios.post("https://13.233.105.2:3000/todo", {
      title,
    });
    setTodos([
      { id: data.todo.id, title: data.todo.title, complete: false },
      ...todos,
    ]);
    setTitle("");
  };
  return (
    <>
      <div className="flex justify-center items-center flex-col w-full h-screen">
        <div>
          <input value={title} onChange={handleInput} className="pl-2 border" />
          <button onClick={handleAddClick} className=" ml-4 border">
            Add
          </button>
        </div>
        <div>
          {todos &&
            todos.map((todo) => {
              return (
                <Todo
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                  todos={todos}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

function Todo({
  todo,
  setTodos,
  todos,
}: {
  todo: any;
  setTodos: any;
  todos: any;
}) {
  async function handleDeleteTodo() {
    await axios.delete(`https://13.233.105.2:3000/todo/${todo.id}`);
    setTodos(todos.filter((t: { id: number }) => t.id !== todo.id));
  }
  async function handleCompleteTodo() {
    //@ts-ignore
    const updateTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, complete: !t.complete };
      } else {
        return t;
      }
    });
    setTodos(updateTodos);
    await axios.put(`https://13.233.105.2:3000/todo/`, {
      id: todo.id,
      complete: !todo.complete,
    });
  }

  return (
    <>
      <div className="flex">
        <input type="checkbox" onClick={handleCompleteTodo} />
        <div className={todo.complete ? `line-through` : ``}>{todo.title}</div>
        <button onClick={handleDeleteTodo} className="ml-4 border rounder-full">
          Delete
        </button>
      </div>
    </>
  );
}

export default App;
