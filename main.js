let taskInput = document.getElementById ("task-input");
let addButton = document.getElementById ("add-button");
let tabs = document.querySelectorAll (".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
let firstTabs = document.querySelectorAll('.task-tabs div');
let underLine =document.querySelector("#under-line");
addButton.addEventListener("click",addTask);



let underLineIndicator = (e) => {
  underLine.style.left = e.currentTarget.offsetLeft + 'px';
  underLine.style.width = e.currentTarget.offsetWidth + 'px';
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
};

firstTabs.forEach((menu) =>
  menu.addEventListener('click', (e) => underLineIndicator(e))
);


for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)})
}
console.log(tabs)
function addTask () {
    let task = {
        id: randomIDG (),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task)
    console.log(taskList);
    render();
}

function render () {
    let list = []
    if(mode == "all"){
        list = taskList
    } else if (mode == "ongoing" || mode == "done") {
        list = filterList;
    }
    let resultHTML = "";
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task task-done" id="${list[i].id}">
            <span>${list[i].taskContent}</span>
            <div class ="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrows-rotate" style="color: #b3bac7;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
        }else {
            resultHTML += `<div class="task" id="${list[i].id}">
            <span>${list[i].taskContent}</span>
            <div class ="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
        }
        }


    document.getElementById("task-board").innerHTML = resultHTML;
}


function toggleComplete (id) {
    for(let i=0; i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList)
}

function deleteTask (id) {
    for(let i=0; i<taskList.length;i++) {
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
    if(mode == "all") {
        render();
    } else if (mode == "ongoing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        
        render();
    } else if(mode == "done") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }


 console.log(filterList);
}


function randomIDG (){
    return Math.random().toString(36).substr(2, 16);
}

let input = document.getElementById("task-input");

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
}
);




