import { v4 as uuidv4 } from 'uuid';

export class NotFoundError extends Error {
    constructor(message) {
        super(message); // <= ist ein Key Wort um den constructor aufzurufen vom Eltern-Objekt
        // super Call muss, bei Vererbung, als erstes im constructor aufgerufen werden, damit das Eltern Objekt initialisiert wird
        this.name = "NotFoundError";
    }
}

export class TodoService {
    // private variable, syntax für classes
    #todos = []
    constructor() {}

    add(todo) {
        const id = uuidv4()
        const newTodo = { ...todo, id }
        this.#todos.push(newTodo)
    }

    updateBy(id, todo) {
        const foundIndex = this.#todos.findIndex((todo) => todo.id === id);
        if(foundIndex === -1) throw new NotFoundError('Das Todo konnte nicht gefunden werden')
        const updatedTodo = { ...todo, id }
        this.#todos[foundIndex] = updatedTodo
        return updatedTodo
    }

    deleteBy(id) {
        const foundIndex = this.#todos.findIndex((todo) => todo.id === id);
        if(foundIndex === -1) throw new NotFoundError('Das Todo konnte nicht gefunden werden')
        this.#todos.splice(foundIndex, 1)
    }

    getAll() {
        return [ ...this.#todos ]
    }

    getBy(id) {
        const foundIndex = this.#todos.findIndex((todo) => todo.id === id);
        if(foundIndex === -1) throw new NotFoundError('Das Todo konnte nicht gefunden werden')
        return { ...this.#todos[foundIndex] }
    }

}