import React from 'react';
import { fetchTodos, createAndRefreshTodos } from '../api';
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

function Todos({ initialResource }) {
  // TODO: Mark rows as pending.
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: Infinity
  });

  const [todosResource, setTodoResource] = React.useState(initialResource);

  const onTodoAdded = todo => {
    startTransition(() => {
      setTodoResource(createAndRefreshTodos(todo));
    });
  };

  const todos = todosResource.read();

  return (
    <div>
      {todos.length === 0 && <h1>You have nothing to do.</h1>}
      {todos.length > 0 && (
        <ol>
          {todos.map(todo => (
            <li key={todo.id}>{todo.description}</li>
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
