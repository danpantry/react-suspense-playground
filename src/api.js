import Resource from './Resource';
import uuid from 'uuid';

function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

function encodeTodos(todos) {
  return todos
    .map(todo => [todo.id, todo.description].map(btoa).join(':'))
    .join(';');
}

function decodeTodos(str) {
  str = str ?? '';
  return str.split(';').reduce((acc, next) => {
    if (next === '') {
      return acc;
    }

    const [id, description] = next.split(':').map(atob);
    return [...acc, { id, description }];
  }, []);
}

function listTodos() {
  return timeout(1000).then(() => {
    return decodeTodos(localStorage.getItem('todos'));
  });
}

export function fetchTodos() {
  return new Resource(listTodos());
}

function createTodo(description) {
  return timeout(1000).then(() => {
    // A real implementation would call a remote API.
    // This example is pretty poor, because it requires us to serialize and deserialize the entire todo list just to add one.
    const id = uuid();
    const todos = decodeTodos(localStorage.getItem('todos'));
    const enc = encodeTodos([...todos, { id, description }]);
    localStorage.setItem('todos', enc);
  });
}

export function createAndRefreshTodos(todo) {
  return new Resource(createTodo(todo).then(listTodos));
}

export function attemptLogin() {
  return new Resource(
    timeout(5000).then({
      error: 'username in use'
    })
  );
}

export function fetchSlowResource() {
  return new Resource(timeout(3000).then(() => 'Hello, slow screen!'));
}

export function fetchUserProfile() {
  // Respresent some async method here and return the user after a few sceonds
  // Throw if a user has not been logged in
  return new Resource(
    timeout(1000).then(() => Promise.reject('not authenticated!'))
  );
}
