const taskText = document.getElementById('taskText');
let errors = [];

function templateTodos(task) {

    return `
    <div class="item" data-idtask=${task.idTodo}>
        <p class="${task.done == 1 ? 'finished' : '' }">${task.task}</p>
        <div class="controls">
            <div class="delete-container">
                <i class="far fa-trash-alt" id="deleteTask"></i>
            </div>
            <div class="edit-container">
                <i class="fas fa-pen" id="editTask"></i>
            </div>
            <div>
                <label>
                    <input type="checkbox" >
                    <span id="done"></span>
                </label>
            </div>
            
        </div>
    </div>
    `
}
taskText.addEventListener('keydown', (e) => handlerAddTask(e), false);
document.addEventListener('click', (e) => handlerDocumentClick(e), false);
document.addEventListener('DOMContentLoaded', (e) => handlerDocumentLoad(e), false);

async function handlerDocumentLoad(e) {
    let reqTasks = await fetch('controllers/tasks.controller.php');
    let resTasks = await reqTasks.json();
    // console.log(resTasks);
    renderTasks(resTasks.tasks)
}

async function handlerDocumentClick(e) {
    if(e.target.id == 'addTask') {
        addTask();
    }

    if(e.target.id == 'deleteTask') {
        if(confirm('Esta seguro que desea eliminar ésta tarea?')) {
            deleteTask(e);
        }
    }

    if(e.target.id == 'editTask') {
        let newTask = prompt('Editar todo', e.target.parentElement.parentElement.parentElement.children[0].textContent)
        if(!newTask || newTask != null) {
            updateTask(newTask, e.target.parentElement.parentElement.parentElement.dataset.idtask);
        }

    }

    if(e.target.id == 'done') {
        console.log(e.target);
        let newState
        let idTask = e.target.parentElement.parentElement.parentElement.parentElement.dataset.idtask;
        if(e.target.parentElement.children[0].checked == true) {
            newState = 0
        } else {
            newState = 1;
        }
        e.target.parentElement.parentElement.parentElement.parentElement.children[0].classList.toggle('finished');
        taskFinished(newState, idTask);
    }
}

async function handlerAddTask(e) {
    if(e.key === 'Enter') {
        addTask();
    }
}

async function addTask() {

    // if(!validateInputTask()) return;


    let reqAddTask = await fetch('controllers/addTask.controller.php', {
        method: 'POST',
        body: JSON.stringify({
            task: taskText.value,
        }),
        headers: {
            'Content-Type': 'json/application'
        }
    });
    let resAddTask = await reqAddTask.json();
    if(resAddTask.status == true) {
        // document.getElementById('items').innerHTML
        let task = {
            idTodo: resAddTask.id,
            task: taskText.value,
            done: 0
        }
        document.getElementById('items').innerHTML += templateTodos(task)
    }
    console.log(resAddTask);

} 

async function renderTasks(tasks) {

    tasks.forEach((task, index) => {
        document.getElementById('items').innerHTML += templateTodos(task)
    })
    tasks.forEach((task, index) => {
        document.querySelector(`[data-idtask='${task.idTodo}']`).children[1].lastElementChild.firstElementChild.firstElementChild.checked = task.done == 1 || task.done == "1" ? true : false;
    })

}

async function deleteTask(e) {
    let idTask = e.target.parentElement.parentElement.parentElement.dataset.idtask;
    let reqDeleteTask = await fetch('controllers/deleteTask.controller.php', {
        method: 'POST',
        body: JSON.stringify({
            idTask: idTask
        }),
        headers: {
            'Content-Type': 'json/application'
        }
    })
    let resDeleteTask = await reqDeleteTask.json();
    // console.log(resDeleteTask);
    if(resDeleteTask == true) {
        e.target.parentElement.parentElement.parentElement.remove();
    }
}

async function updateTask(task, id) {
    let reqDeleteTask = await fetch('controllers/updateTask.controller.php', {
        method: 'POST',
        body: JSON.stringify({
            idTask: id,
            task: task
        }),
        headers: {
            'Content-Type': 'json/application'
        }
    })
    let resDeleteTask = await reqDeleteTask.json();
    console.log(resDeleteTask);
    if(resDeleteTask == true) {
        document.querySelector(`[data-idtask="${id}"]`).children[0].textContent = task
    }
}

async function taskFinished(newState, idTask) {
    let reqDeleteTask = await fetch('controllers/taskFinished.controller.php', {
        method: 'POST',
        body: JSON.stringify({
            newState: newState,
            idTask: idTask
        }),
        headers: {
            'Content-Type': 'json/application'
        }
    })
    let resDeleteTask = await reqDeleteTask.json();
    console.log(resDeleteTask);
    // if(resDeleteTask == true) {
    //     document.querySelector(`[data-idtask="${id}"]`).children[0].textContent = task
    // }
}

function validateInputTask() {
    if(taskText.value == '') {
        errors.push('favor de agregar una tarea')
    }

    if(errors.length > 0) {
        let stringErrors = '';
        errors.forEach((error, index) => {
            stringErrors += `\n ${error}`
        })

        alert(stringErrors)
        errors = [];
        return false;
    } else {
        return true;
    }
}