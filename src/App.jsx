import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }

    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);

    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);

    setCurrentTodo({ ...todo });
  }

  return (
    <>
      <div className="container">
        <div className="row  align-self-center">
          <div className="col"></div>
          <div className="col">
            <div className="App">
              {isEditing ? (
                <form onSubmit={handleEditFormSubmit}>
                  <h2>Edit Todo</h2>

                  <label htmlFor="editTodo">Edit todo: </label>

                  <input
                    name="editTodo"
                    type="text"
                    placeholder="Edit todo"
                    value={currentTodo.text}
                    className="form-control"
                    onChange={handleEditInputChange}
                  />

                  <button className="btn btn-success mb-3" type="submit">Update</button>

                  <button className="btn btn-danger mb-3" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <h2>Add Todo</h2>

                  <label htmlFor="todo">Add todo: </label>

                  <input
                    className="form-control"
                    name="todo"
                    type="text"
                    placeholder="Create a new todo"
                    value={todo}
                    onChange={handleInputChange}
                  />
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">
                      Add
                    </button>
                  </div>
                </form>
              )}

              <ul className="todo-list">
              <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">NO.</th>
      <th scope="col">List</th>
      <th scope="col">action</th>
      
    </tr>
  </thead>
  
  <tbody>
  {todos.map((todo) => (
    <tr>
      <th scope="row">{todo.id}</th>
      <td key={todo.id}>{todo.text}</td>
   
      <td>

      <button  className="btn btn-warning mb-3" onClick={() => handleEditClick(todo)}>Edit</button>
                    <button  className="btn btn-danger mb-3" onClick={() => handleDeleteClick(todo.id)}>  Delete</button>
      </td>
    </tr>
   
    ))} 
  </tbody>
 
</table>




                {/* {todos.map((todo) => (
                  <li key={todo.id}>
                    {todo.text}

                    <button  className="btn btn-warning mb-3"onClick={() => handleEditClick(todo)}>Edit</button>
                    <button  className="btn btn-danger mb-3" onClick={() => handleDeleteClick(todo.id)}>
                      Delete
                    </button>
                  </li>
                ))} */}
              </ul>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}

export default App;
