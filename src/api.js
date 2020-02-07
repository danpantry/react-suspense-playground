import Resource from './Resource';

function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
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
