// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// Functions

function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    // Todo DIV
    const todoDIV = document.createElement("div");
    todoDIV.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDIV.appendChild(newTodo);
    // Add to local storage
    saveLocalTodos(todoInput.value);
    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="ri-check-fill"></i>';
    completedButton.classList.add("completed-btn");
    todoDIV.appendChild(completedButton);
    // Delete button
    const DeleteButton = document.createElement("button");
    DeleteButton.innerHTML = '<i class="ri-close-fill"></i>';
    DeleteButton.classList.add("delete-btn");
    todoDIV.appendChild(DeleteButton);
    // Append to list
    todoList.appendChild(todoDIV);
    // Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // DELETE todo
    if(item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }
    // CHECK todo
    if(item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos(todo) {
    // Check if anything is in there
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
    // Check if anything is in there
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        // Todo DIV
        const todoDIV = document.createElement("div");
        todoDIV.classList.add("todo");
        // Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDIV.appendChild(newTodo);

        // Check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="ri-check-fill"></i>';
        completedButton.classList.add("completed-btn");
        todoDIV.appendChild(completedButton);
        // Delete button
        const DeleteButton = document.createElement("button");
        DeleteButton.innerHTML = '<i class="ri-close-fill"></i>';
        DeleteButton.classList.add("delete-btn");
        todoDIV.appendChild(DeleteButton);
        // Append to list
        todoList.appendChild(todoDIV);
    });
}

function removeLocalTodos(todo) {
    // Check if anything is in there
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}