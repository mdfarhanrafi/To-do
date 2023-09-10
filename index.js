
var todos = document.getElementById('Todos');
var add = document.getElementById('Submit');
var todo = document.getElementById('todo');

const getTodosFromLocalStorage = () => {
    return localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
};
class Todos{
    constructor(id, title, State) {
        this.id = id;
        this.title = title;
        this.State=State
      }      
};


function creatTodo(item) {
              
    const p = document.createElement('p');
    p.innerHTML = item.title;
    const div = document.createElement('div');
    const block = document.createElement('div');
    block.id = item.id;
    let statsbtn = document.createElement('button');
    
    statsbtn.id = item.State;
    if (statsbtn.id === '0') {
        statsbtn.innerHTML = 'To-do';
        statsbtn.style.backgroundColor = 'rgb(89, 183, 186)';
    }
    else if (statsbtn.id === '1') {
        statsbtn.innerHTML = 'Doing';
        statsbtn.style.backgroundColor = 'blue';
    }
    else if (statsbtn.id === '2') {
        statsbtn.innerHTML = 'Done';
        statsbtn.style.backgroundColor = 'green';
    }

    const deletebtn = document.createElement('button');
    deletebtn.innerHTML = "Delete";
    statsbtn.className = 'Task';
    deletebtn.className = 'Delete';
    div.className = 'buttons';
    div.append(statsbtn, deletebtn);
    block.append(p, div);
    todo.append(block);  
    statsbtn.addEventListener("click", statsTodo);

    

    deletebtn.addEventListener("click", deleteTodo);
 
}
const statsTodo = (e) => {
    let state = e.target;
    const situation = e.target.parentElement.parentElement;
   
    let todo_list = getTodosFromLocalStorage();
    todo_list = todo_list.filter((item) => {
        if (item.id === situation.id) {
            if (item.State === '0') {
                item.State = '1';
                state.innerHTML = 'Doing';
                state.style.backgroundColor = 'blue';

            }
            else if (item.State === '1') {
                item.State = '2';
                state.innerHTML = 'Done';
                state.style.backgroundColor = 'green';

            }
            else if (item.State === '2') {
                item.State = '0';
                state.innerHTML = 'To-do';
                state.style.backgroundColor = 'rgb(89, 183, 186)';

            }
            localStorage.setItem('items', JSON.stringify(todo_list));
        }
    });
}


const deleteTodo = (e) => {
    const selectTodo = e.target.parentElement.parentElement;  
   
    todo.removeChild(selectTodo);
    let todo_list = getTodosFromLocalStorage();
   
    todo_list = todo_list.filter((items) => {
     return items.id !== selectTodo.id; 
    
    });
    localStorage.setItem('items', JSON.stringify(todo_list));
    
 
}
function LoadContext() {
    let todo_list = getTodosFromLocalStorage();
    todo_list.map((item) => creatTodo(item)); 
}



add.addEventListener("click", ()=> {
    const value = todos.value;
    const id = Date.now().toString();
    const title = value;
    let State = '0';
    let item = new Todos(id, title, State);
    creatTodo(item);

    let todo_list = getTodosFromLocalStorage();
    todo_list.push(item);
    localStorage.setItem('items', JSON.stringify(todo_list));
    todos.value='';
  
    
});

window.addEventListener('DOMContentLoaded', LoadContext);