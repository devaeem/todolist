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
      onChange={handleEditInputChange}
    />
   
    <button type="submit">Update</button>

    <button onClick={() => setIsEditing(false)}>Cancel</button>
  </form>
) : (
 
  <form onSubmit={handleFormSubmit}>
   
    <h2>Add Todo</h2>
   
    <label htmlFor="todo">Add todo: </label>
   
    <input
      name="todo"
      type="text"
      placeholder="Create a new todo"
      value={todo}
      onChange={handleInputChange}
    />
   
    <button type="submit">Add</button>
  </form>
)}

<ul className="todo-list">
  {todos.map((todo) => (
    <li key={todo.id}>
      {todo.text}
     
      <button onClick={() => handleEditClick(todo)}>Edit</button>
      <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
    </li>
  ))}
</ul>
</div>