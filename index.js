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
    if (!newtext) return; //newtext empty
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

//Event add new item
// const newTodo =document.querySelector('.add__text-button');

// newTodo.addEventListener('click', addNewItem);

// function addNewItem() {
//     let newItem = document.createElement('li');
//     let list = document.querySelector('.list');
//     let input = document.querySelector('.add__text-input');
//     newItem.textContent=input.value;
//     input.value='';
//     newItem.className='list__item';
//     list.appendChild(newItem);

//     addNewEditButton(newItem);
//     addNewDoneButton(newItem);
//     addNewDeleteButton(newItem);
// }

// function addNewEditButton(newItem) {
//     let butt = document.createElement('button');
//     butt.textContent='Edit';
//     butt.className='edit_button';
//     newItem.appendChild(butt);
// }

// function addNewDoneButton (newItem) {
//     let butt = document.createElement('button');
//     butt.textContent='Done';
//     butt.className='done_button';
//     newItem.appendChild(butt);
// }

// function addNewDeleteButton (newItem) {
//     let butt = document.createElement('button');
//     butt.textContent='Delete';
//     butt.className='del';
//     newItem.appendChild(butt);
// }


// //Event delete item
// let listLi = document.querySelectorAll('.del');

// for (item of listLi){
//         item.addEventListener('click',(event)=>{
//         event.path[0].parentNode.remove();
//     });
// }


// //Event item done
// const done = document.querySelectorAll('.done_button')

// for (item of done) {
//     item.addEventListener('click',(event)=>{
//         let i = event.path[0].parentNode;
//         if (i.classList[1]){
//             i.classList.remove('done')
//         }else{
//             i.classList.add('done');
//         }
        
//         console.log(i);
//     })
// }

