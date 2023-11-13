// /* dom */import d from './DOM/DOM.js';

// /* tasks */import {
//     Task,
//     TaskManager
// } from './model/tasks.js';
 

/* --------------------- */
let tasklist = new TaskManager();



window.addEventListener('load', () => {

    d('.popUp').forEach((popup) => {
        popup.style.bottom = `-${popup.offsetHeight}px`;
    });

    renderTasks();

    if (localStorage.hasOwnProperty('clicked')) {
        d("#alertContainer")[0].style.top = '-100%';
        
    } else {
        setTimeout(() => {
            d("#alertContainer")[0].style.top = '0px';
        }, 1500);
    }
    
});

/* ----------------------- */

d('#alertOk')[0].addEventListener('click', () => {
    d("#alertContainer")[0].style.top = '-100%';
    const clicked = 'Alert message showed.';
    localStorage.setItem('clicked', clicked);
}); 

d('#list-form')[0].addEventListener('submit', (event) => {
    event.preventDefault();


    if (
        d('#taskName')[0].value !== '' &&
        d('#taskName')[0].value !== null &&
        d('#taskDate')[0].value !== '' &&
        d('#taskDate')[0].value !== null
    ) {
        event.preventDefault();
        const task = new Task(
            d('#taskName')[0].value,
            d('#taskDate')[0].value
        );
        tasklist.addTask(task);
        tasklist.reloadWholeList();
        console.log(tasklist.getTasks());
        renderTasks();
        popUp(d('.popUp')[0]);
    } else {
        popUp(d('.popUp')[1]);
    }
    d('#taskName')[0].value = '';

    d('#taskDate')[0].value = '';

});

/* --------------------- */

/* functions---------------- */

function renderTasks() {
    d('#tasksContainer')[0].innerHTML = '';

    if (tasklist.getTasks().length === 0) {
        d('#tasksContainer')[0].innerHTML = '<h3>There are no added Taks.</h3>';
    } else {
        tasklist.getTasks().forEach((task, index) => {
            d('#tasksContainer')[0].innerHTML +=
                `<div class="list" >
                <div>${index + 1}.</div>
                <div class"taskGroup">
                    <p>${task.name}<br>
                        ${task.date}
                    </p>
                    <p>${task.completed}</p>
                </div>
                <div>
                    <button class="complete">Complete</button>
                </div>
                <div>
                    <button id="${index}" class="delete">X</button>
                </div>
            </div>
        `;
            d('.delete').forEach((btnDelete, i) => {
                btnDelete.addEventListener('click', () => {
                    tasklist.deleteTask(i);
                    console.log(tasklist.getTasks());
                    renderTasks();
                });
            });

            d('.complete').forEach((btnComplete, i) => {
                btnComplete.addEventListener('click', () => {
                    validate(i);    
                });
            });
        });
    }
};

function popUp(element) {
    element.style.bottom = '0px';
    setTimeout(() => {
        element.style.bottom = `-${element.offsetHeight}px`;
    }, 2000);
};

function validate(i) {
    tasklist.completeTask(i);
    console.log(i);
    if (tasklist.getTasks()[i].toggleComplete) {
        tasklist.getTasks()[i].completed = `<span style="color: green;">Completed</span>`;
    } else if (!tasklist.getTasks()[i].toggleComplete) {
        tasklist.getTasks()[i].completed = `<span style="color: red;">Pending</span>`;
    }
    tasklist.reloadWholeList();
    renderTasks();
}