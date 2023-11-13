class Task {
    constructor(name, date) {
        this.name = name;
        this.date = date;
        this.completed = `<span style="color: red;">Pending</span>`;
        this.toggleComplete = false;
    }
}

class TaskManager {
    constructor() {
        this.tasklist = [];
        this.loadTasksFromLocalStorage();
    }

    addTask(task) {
        this.tasklist.push(task);
    }

    deleteTask(buttonID) {
        this.tasklist.forEach((task) => {
            if (this.tasklist.indexOf(task) === buttonID) {
                const index = this.tasklist.indexOf(task);
                this.tasklist.splice(index, 1);
                this.reloadWholeList();
            }
        });
    }
    completeTask(buttonID) {
            if (this.tasklist[buttonID].toggleComplete === true) {
                this.tasklist[buttonID].toggleComplete = false;
            } else if (this.tasklist[buttonID].toggleComplete === false) {
                this.tasklist[buttonID].toggleComplete = true;
        }
            
        this.reloadWholeList();
    }
    saveTasksToLocalStorage() {
        const taskString = JSON.stringify(this.tasklist);
        localStorage.setItem('tasklist', taskString);
    }
    loadTasksFromLocalStorage() {
        const taskString = localStorage.getItem('tasklist');
        if (taskString) {
            try {
                this.tasklist = JSON.parse(taskString);
            } catch (error) {
                console.log(error);
            }
        }
    }
    getTasks() {
        return this.tasklist;
    }
    reloadWholeList() {
        this.saveTasksToLocalStorage();
        this.loadTasksFromLocalStorage();
    }
}