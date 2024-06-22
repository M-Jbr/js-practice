// Container style
let container = document.querySelector(".container");
container.style.cssText = "display:flex; flex-direction:column; align-items:center; padding:20px; gap:10px";

// Form div
let form = document.querySelector(".form");
form.style.cssText = "display:flex; justify-content:center; background-color:#eee; width:600px; padding:20px; border-radius:5px; gap:10px";

// Input
let input = document.querySelector(".input");
input.style.cssText = "height:40px; width:300px; padding-left:10px; border:0px solid black; border-radius:5px;";

// Submit button
let submit = document.querySelector(".add");
submit.style.cssText = "border:0px solid black; cursor: pointer; width:100px; border-radius:5px; background-color:red; color:white";

// Tasks container
let taskDiv = document.querySelector(".tasks");
taskDiv.style.cssText = "display:flex; flex-direction:column; padding:20px; background-color:#eee; width:600px; border-radius:5px;";

// Empty message
let p = document.createElement('p');
p.style.cssText = "display:flex; justify-content:center";

// Task array
let arr = [];

// Initialize
getLocalStorage();
emptyMessage();

if (localStorage.getItem("task")) {
    arr = JSON.parse(localStorage.getItem("task"));
}

// Event listener for submit button
submit.addEventListener("click", function (e) {
    if (input.value.trim() !== "") {
        addToArr(input.value);
        input.value = '';
    } else {
        e.preventDefault();
        input.focus();
    }
});

// Add task to array and localStorage
function addToArr(textTask) {
    let task = {
        id: Date.now(),
        title: textTask,
    };
    arr.push(task);
    display(arr);
    localStorage.setItem("task", JSON.stringify(arr));
    emptyMessage();
}

// Display message if no tasks
function emptyMessage() {
    p.innerHTML = "";
    let tasks = localStorage.getItem("task");
    let taskArray = tasks ? JSON.parse(tasks) : [];
    let count = taskArray.length;
    if (count === 0) {
        let x = document.createTextNode("No Task");
        p.append(x);
        document.body.appendChild(p);
    } else {
        if (document.body.contains(p)) {
            p.remove();
        }
    }
}

// Display tasks
function display(addArr) {
    taskDiv.innerHTML = "";
    addArr.forEach((e) => {
        let div = document.createElement("div");
        div.style.cssText = "display:flex; justify-content:space-between; padding:20px; margin:10px; background-color:white; width:500px; gap:10px;";

        let taskTitle = document.createTextNode(e.title);
        div.appendChild(taskTitle);

        let btn = document.createElement("button");
        btn.style.cssText = "border:0px solid black; cursor: pointer; height:30px; width:70px; border-radius:5px; background-color:red; color:white";
        btn.appendChild(document.createTextNode("Delete"));
        btn.addEventListener("click", () => {
            div.remove();
            arr = removeTask(e.id);
            emptyMessage();
        });

        div.appendChild(btn);
        taskDiv.appendChild(div);
    });
}

// Remove task from localStorage
function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("task"));
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("task", JSON.stringify(tasks));
    return tasks;
}

// Get tasks from localStorage
function getLocalStorage() {
    let data = localStorage.getItem("task");
    if (data) {
        let tasks = JSON.parse(data);
        display(tasks);
    }
}
