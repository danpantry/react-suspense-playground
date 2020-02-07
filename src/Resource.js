export default class Resource {
  #value;
  #status = 'pending';
  #task;

  constructor(task) {
    this.#task = task
      .then(value => {
        this.#value = value;
        this.#status = 'success';
      })
      .catch(error => {
        this.#value = error;
        this.#status = 'error';
      });
  }

  read() {
    switch (this.#status) {
      case 'pending':
        throw this.#task;
      case 'success':
        return this.#value;
      case 'error':
        throw this.#value;
    }
  }
}
