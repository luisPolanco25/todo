// References to the HTML file
const divTodoList = document.querySelector('.todo-list');
const textInput = document.querySelector('.new-todo');
const deleteButton = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilter = document.querySelectorAll('.filtro');



import {Todo, TodoList} from '../classes';
import {todoList} from '../index';


export const createTodoHTML = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
							<label>${todo.task}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;

    const div = document.createElement('div');
    
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}


// Events

textInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && textInput.value.length > 0) {
        const newTodo = new Todo(textInput.value);
        todoList.newTodo(newTodo);
        createTodoHTML(newTodo);
        textInput.value = '';
    }

});

divTodoList.addEventListener('click', (event) => {
    const eventName = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoID = todoElement.getAttribute('data-id');
  
    if (eventName.includes('input')) {
        todoList.toggleTodo(todoID);
        todoElement.classList.toggle('completed');
    } else if (eventName.includes('button')) {
        todoList.deleteTodo(todoID);
        divTodoList.removeChild(todoElement);
    }

});

deleteButton.addEventListener('click', () => {
    todoList.deleteCompletedTodos();

    for (let x = divTodoList.children.length - 1; x >= 0; x--) {
        const element = divTodoList.children[x];

        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }
    }
});

ulFilters.addEventListener('click', (event) => {
    const filter = event.target.text;
    
    if (!filter) {return;}
    anchorFilter.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');


    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completedTask = element.classList.contains('completed');

        switch (filter) {
            case 'Pendientes': 
                if (completedTask) {
                    element.classList.add('hidden');
                }
                break;
                case 'Completados': 
                if (!completedTask) {
                    element.classList.add('hidden');
                }
                break;
        }

    }
})