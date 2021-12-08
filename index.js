// Local Storage

const localStoragePasw = 'TODOLIST';

function getLocalStorage() {
    let list = JSON.parse(localStorage.getItem(localStoragePasw));
    if(list){
        return list;
    }else {
        return [];
    }
}

function setLocalStorage() {
    localStorage.setItem(localStoragePasw,JSON.stringify(todo));
}

//New to do
const newButton =document.querySelector('.add__text-button');

newButton.addEventListener('click', addNewItem);
const newTodo = document.querySelector('.add__text-input');

function addNewItem () {
    
    let newtext= newTodo.value;
    if (!newtext) return; 
    todo.push({
        item: newtext,
        done: false,
    });
    newTodo.value='';
    setLocalStorage();
    cleanTodo();
    
}

const listContainer = document.querySelector('.list');

function cleanTodo() {
    listContainer.innerHTML='';
    for (const[i,item] of todo.entries()){

         //Done button
         let donebutt = document.createElement('input');
         donebutt.type="checkbox";
         donebutt.className='done_button';
 
         //Done event
         donebutt.onchange = function (){
             if(this.checked){
                 todo[i].done=true;
             }else {
                 todo[i].done=false;
             }
             setLocalStorage(todo);
             cleanTodo();
         }

        //Delete button
        let delbutt = document.createElement('a');
        delbutt.innerHTML='&times';
        delbutt.className='del';
        delbutt.href='';

        //Delete Event
        delbutt.onclick = (ev) => {
            ev.preventDefault();
            todo.splice(i,1);
            setLocalStorage();
            cleanTodo();
        }

        //Edit button
        let editbutt = document.createElement('button');
        editbutt.textContent='Edit';
        editbutt.className='edit_button';

        //Edit event
        editbutt.onclick = (ev) => {
            newTodo.value=item.item;
            ev.preventDefault();
            todo.splice(i,1);
            setLocalStorage(todo);
            cleanTodo();
        }

       

        //DOM
        let text = document.createElement("span");
        text.textContent = item.item;
        
        const li = document.createElement("li");
        li.className='list__item';
        if (item.done) {
            donebutt.checked = true;
            text.classList.add("done");
        }
        li.appendChild(donebutt);
        li.appendChild(text);
        li.appendChild(editbutt);
        li.appendChild(delbutt);
        listContainer.appendChild(li);
        
    }
}


todo= getLocalStorage();
cleanTodo();

