let message = document.querySelector('.message'),
    todo = document.querySelector('.todo');
const addMessageBtn = document.querySelector('.add');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addMessageBtn.addEventListener('click', function () {  
    if (!message.value) return;
    let newTodo  = {
        todo: message.value,
        checked: false,
        important: false


    }
    

    todoList.push(newTodo);
    displayMessages();
    saveLocal();
    message.value = '';
    



  
});


todo.addEventListener('change', function(e) {
    let valueLabel = todo.querySelector(`[for=${e.target.getAttribute('id')}]`).innerHTML;
    todoList.forEach(function(item)  {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            saveLocal();
        }
    })
})

todo.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    todoList.forEach(function(item, i) {
        if (item.todo === e.target.innerHTML) {
            if (e.ctrlKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;

            }

            displayMessages();
            saveLocal();
        }
    })
})


function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i) {
        displayMessage += `
            <li>
                <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class=${item.important ? 'important' : ''}>${item.todo}</label>
            </li>
        `
        todo.innerHTML = displayMessage;
        
        })
}

function saveLocal() {
    localStorage.setItem('todo', JSON.stringify(todoList));
}
