import React from 'react';
import uuid from 'uuid';
import { createAndRefreshTodos, fetchTodos } from '../api';
import withResources from '../withResources';

function TodosForm({ onTodoAdded, children }) {
  const [description, setDescription] = React.useState();

  const onSubmit = event => {
    event.preventDefault();
    onTodoAdded(description);
  };

  const onChange = event => {
    setDescription(event.target.value);
  };

  return (
    <section>
      <h1>What needs to be done?</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="todo" onChange={onChange} />
        {children}
      </form>
    </section>
  );
}

Todos.fetchResources = () => {
  return {
    initialResource: fetchTodos()
  };
};

// This is used to display pending todos and still have them sorted correctly.
function createPendingTodo(description) {
  return { id: uuid(), description };
}

function Todos({ initialResource }) {
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 3000
  });

  const [todosResource, setTodoResource] = React.useState(initialResource);
  const [pendingTodos, setPendingTodos] = React.useState([]);

  const onTodoAdded = todo => {
    // In this example we use arrays. If a user had a lot of pending todos this
    // might become a problem and a Set might be a better choice.
    const pending = createPendingTodo(todo);
    setPendingTodos(todos => [...todos, pending]);
    startTransition(() => {
      setTodoResource(createAndRefreshTodos(todo));
      setPendingTodos(todos => todos.filter(t => t.id !== pending.id));
    });
  };

  const todos = todosResource.read();
  const haveTodos = todos.length > 0 || pendingTodos.length > 0;

  return (
    <div>
      {!haveTodos && <h1>You have nothing to do.</h1>}
      {haveTodos && (
        <ol>
          {todos.map(todo => (
            <li key={todo.id}>{todo.description}</li>
          ))}
          {pendingTodos.map(todo => (
            <li key={todo.id}>
              {todo.description} <span>Pending!</span>
            </li>
          ))}
        </ol>
      )}
      <TodosForm onTodoAdded={onTodoAdded}>
        <button type="submit" disabled={isPending}>
          Save
        </button>
      </TodosForm>
    </div>
  );
}

export default withResources(Todos);
