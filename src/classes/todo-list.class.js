import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        this.uploadItemsFromLocalStorage();
    }
    newTodo(todo) {
        this.todos.push(todo);
        this.saveInLocalStorage();
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveInLocalStorage();
    }
    toggleTodo(id) {
        for (let todo of this.todos) {
            if (todo.id == id) {
                todo.completed = !todo.completed;
                this.saveInLocalStorage();
                break;
            }
        }
    }
    deleteCompletedTodos() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.saveInLocalStorage();
    }
    saveInLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
    uploadItemsFromLocalStorage() {
        (localStorage.getItem('todo')) ? this.todos = JSON.parse(localStorage.getItem('todo')) : this.todos = [];
        this.todos = this.todos.map(object => Todo.fromJson(object));
    }
}