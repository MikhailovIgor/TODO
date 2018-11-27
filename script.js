var addButton = document.getElementById('add');
var when = document.getElementById('data')
var inputTask = document.getElementById('new-task');
var unfinishedTasks = document.getElementById('unfinished-tasks');
var finishedTasks = document.getElementById('finished-tasks');
var delButt = document.getElementById('delAll');

function createNewElement(task, finished) {
    var listItem = document.createElement('li');
    var checkbox = document.createElement('button');

    if(finished){
        checkbox.className = "checkbox";
        checkbox.innerHTML = "<i>Доделать</i>";
    }else {
        checkbox.className = "checkbox";
        checkbox.innerHTML = "<i>Сделано</i>";
    }


    var label = document.createElement('label');
    label.innerText = task;
    var input = document.createElement('input');
    input.type = "text";
    var deleteButton = document.createElement('button');
    deleteButton.className = "delete";
    deleteButton.innerHTML = "<i>Удалить</i>";

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    return listItem;
}

function addTask() {
    if (inputTask.value) {
        var listItem = createNewElement(inputTask.value + when.value, false);
        unfinishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, finishTask)
        inputTask.value = "";
    }
    save();
}
addButton.onclick = addTask;

function deleteTask() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
    save();
}

delButt.onclick = delAll;

function delAll() {

    var finishedTasks = document.getElementById('finished-tasks');
    var unfinishedTasks = document.getElementById('unfinished-tasks');
    finishedTasks.innerHTML = [];
    unfinishedTasks.innerHTML = [];
    save();
}

function finishTask() {
    var listItem = this.parentNode;
    var checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "checkbox";
    checkbox.innerHTML = "<i>Доделать</i>";
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
    save();
}

function unfinishTask() {
    var listItem = this.parentNode;
    var checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "checkbox";
    checkbox.innerHTML = "<i>Сделано</i>";

    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask)
    save();
}

function bindTaskEvents(listItem, checkboxEvent) {
    var checkbox = listItem.querySelector('button.checkbox');
    var deleteButton = listItem.querySelector('button.delete');
    checkbox.onclick = checkboxEvent;
    deleteButton.onclick = deleteTask;
}

function save() {

    var unfinishedTasksArr = [];
    for (var i = 0; i < unfinishedTasks.children.length; i++) {
        unfinishedTasksArr.push(unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    var finishedTasksArr = [];
    for (var i = 0; i < finishedTasks.children.length; i++) {
        finishedTasksArr.push(finishedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify({
        unfinishedTasks: unfinishedTasksArr,
        finishedTasks: finishedTasksArr
    }));

}

function load(){
    return JSON.parse(localStorage.getItem('todo'));
}

var data=load();

for(var i=0; i<data.unfinishedTasks.length;i++){
    var listItem=createNewElement(data.unfinishedTasks[i], false);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
}

for(var i=0; i<data.finishedTasks.length; i++){
    var listItem=createNewElement(data.finishedTasks[i], true);
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
}