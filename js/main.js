const LEVEL = [
    {level: 0, color: "bg-dark",name: "Small"},
    {level: 1, color: "bg-info", name: "Medium"},
    {level: 2, color: "bg-danger",name: "High"},
]

// const list = [
//     {
//         id: makeID(),
//         name: "Task 1",
//         level: 0,
//     },
//     {
//         id: makeID(),
//         name: "Task 2",
//         level: 1,
//     },
//     {
//         id: makeID(),
//         name: "Task 3",
//         level: 2,
//     },
// ]

//  saveStorage(list)
let list = loadStorage();

const list_todo = document.getElementById("area-list-task");
const inputValue = document.getElementById("input-name");
const selectOp = document.querySelector("#input-level");
const btnSubmit = document.getElementById("btn-submit");
const addTask = document.querySelector(".btn-block");
const areaForm = document.querySelector("#area-form");
const btnCancel = document.querySelector(".btn-cancel");

showTodo(list)

// =============================== EVENT ===================================== 

addTask.addEventListener('click',(e) => {
    let isShow = areaForm.classList.contains('d-none') ? 1 : 0;
    toggleForm(isShow);
})

btnCancel.addEventListener('click', (e) => {
    toggleForm(0)
})

document.addEventListener('click',(e) => {
    if(e.target.classList.contains('btn-delete')){
        let idValue = e.target.getAttribute('data-id');
        list = deleteItem(idValue);
        showTodo(list);
    }
})
  
var dataInput  
inputValue.addEventListener('change',(e) => {
    dataInput = e.target.value;
})

var level;
selectOp.addEventListener('change', (e) => {
    level = e.target.value;
})



btnSubmit.addEventListener('click',(e) => {
    const data = {
        id: makeID(),
        name: dataInput,
        level: Number(level) || 0,
    }
    console.log(data.level)
    list.push(data);
    showTodo(list);
    saveStorage(list)
})

// =============================== FUNCTION ==================================



function showTodo(list){
    let content = '';
    list.forEach((item,index) => {
    content += `
        <tr>
            <td>${index+1}</th>
            <td>${item.id}</th>
            <td>${item.name}</td>
            <td>${showLevel(item.level)}</td>
            <td>
                <button class="btn btn-warning">Edit</button>
                <button class="btn btn-danger btn-delete" data-id=${item.id}>Delete</button>
            </td>
        </tr>
    `
    })

    list_todo.innerHTML = content;
}

function makeID (length = 6) {
    return Math.random().toString(36).substring(2, length+2);
};

function showLevel(value){
    let item = LEVEL.find((element)=>{return element.level === value});

    return `<span class="badge ${item.color}">${item.name}</span>`
}

function saveStorage(list){
    localStorage.setItem("TODOS",JSON.stringify(list));
}

function loadStorage(){
    let items = JSON.parse(localStorage.getItem("TODOS"));
    if(items){
        return items;
    }
    return [];
}

function deleteItem(id){
        let list = loadStorage();
        list =  list.filter((element) => {
            return element.id !==  id;
        })
        saveStorage(list);      
        return list;
}


function toggleForm(isShow){
    if(isShow){
        addTask.textContent = "Close"
        addTask.classList.remove("bg-info")
        addTask.classList.add("bg-danger")
        areaForm.classList.remove("d-none")
    }else{
        areaForm.classList.add("d-none")
        addTask.textContent = "Add Task"
        addTask.classList.remove("bg-danger")
        addTask.classList.add("bg-info")
    }
}