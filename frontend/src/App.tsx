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
      const { data } = await axios.get("http://localhost:3000/");
      const todosReq = data.todos;
      setTodos([...todosReq]);
    }
    getTodos();
  }, []);
  const handleInput = (e: any) => {
    setTitle(e.target.value);
  };
  const handleAddClick = async () => {
    const { data } = await axios.post("http://localhost:3000/todo", { title });
    setTodos([
      ...todos,
      { id: data.todo.id, title: data.todo.title, complete: false },
    ]);
    setTitle("");
  };
  return (
    <>
      <input value={title} onChange={handleInput} />
      <button onClick={handleAddClick}>Add</button>
      <div>
        {todos &&
          todos.map((todo) => {
            return <Todo todo={todo} key={todo.id} />;
          })}
      </div>
    </>
  );
}

function Todo({ todo }: { todo: any }) {
  return (
    <>
      <div>
        <input type="checkbox" />
        {todo.title}
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </>
  );
}

export default App;
