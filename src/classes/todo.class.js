export class Todo {

    static fromJson({id, task, completed, created}) {
        const temporalTodo = new Todo(task);
        temporalTodo.id = id;
        temporalTodo.completed = completed;
        temporalTodo.created = created;
        
        return temporalTodo;
    }

    constructor(task) {
        this.task = task;
        this.id = new Date().getTime();
        this.completed = false;
        this.created = new Date();
    }
}