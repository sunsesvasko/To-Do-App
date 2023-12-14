import { createTask } from './createTask';
import { deleteTask } from './deleteTask';

const lists = document.querySelectorAll('.container');
const tasks = document.querySelectorAll('.task--container');
const createTaskBtn = document.querySelector('#createTask');
const deleteTaskBtn = document.querySelector('#deleteTask');
const closeTaskMenu = document.querySelector('#closeTask');
const openTaskMenus = document.querySelectorAll('.nextImage');
const addNewListBtn = document.querySelector('.addList--container');
const addNewTaskBtns = document.querySelector('.addNewTask--container');

if(lists.length > 0) {
    lists.forEach(list => {
        list.addEventListener('click', (e) => {
            let listName;
            if(e.target.classList.contains('container')) {
                listName = e.target.children[1].textContent.toLowerCase();
            } else {
                listName = e.target.parentElement.children[1].textContent.toLowerCase();
            }
            location.assign(`/overview/list?name=${listName}`);
        })
    });
}

if(tasks.length > 0) {
    tasks.forEach(task => {
        const taskName = task.firstChild.nextElementSibling.textContent;

        // check if there are any checked tasks
        if(localStorage.getItem(taskName)) {
            task.firstChild.checked = true;
            task.firstChild.nextSibling.style.textDecoration = 'line-through';
        } else {
            task.firstChild.nextSibling.style.textDecoration = '';
        }

        task.addEventListener('click', (e) => {
            if(e.target.type === 'checkbox') {
                // If the target is checked then save info to localStorage and mark it as checked | OR | remove it from localStorage and mark it as unchecked
                if(e.target.checked) {
                    localStorage.setItem(taskName, 'checked');
                    task.firstChild.nextSibling.style.textDecoration = 'line-through';
                } else {
                    localStorage.removeItem(taskName);
                    task.firstChild.nextSibling.style.textDecoration = '';
                }
            } 
        });
    })
}

if(createTaskBtn) {
    createTaskBtn.addEventListener('click', () => {
        const taskTitle = document.querySelector('#taskTitle').value;
        const taskContent = document.querySelector('.taskDescription').value;
        const listId = createTaskBtn.dataset.listid;

        const dataObj = {
            title: taskTitle,
            content: taskContent,
            list: listId
        }

        createTask(dataObj);
    })
}

if(deleteTaskBtn) {
    deleteTaskBtn.addEventListener('click', () => {
        const taskId = deleteTaskBtn.dataset.taskid;

        deleteTask(taskId);
    });
}

if(closeTaskMenu) {
    closeTaskMenu.addEventListener('click', () => {
        let listName = document.querySelector('.list--container').firstChild.textContent;
        listName = listName.slice(0, -1);

        location.assign(`/overview/list?name=${listName}`);
    })
}

if(openTaskMenus.length > 0) {
    openTaskMenus.forEach(task => {
        task.addEventListener('click', (e) => {
            let listName = document.querySelector('.list--container').firstChild.textContent;
            listName = listName.slice(0, -1);
            const taskName = e.target.previousSibling.textContent;

            location.assign(`/overview/list/task?listName=${listName}&taskName=${taskName}`);
        })
    })
}

if(addNewTaskBtns) {
    addNewTaskBtns.addEventListener('click', (e) => {
        let listName = document.querySelector('.list--container').firstChild.textContent;
        listName = listName.slice(0, -1);
        const newLocation = `/overview/list/newTask?listName=${listName}`;

        if(window.location.pathname === '/overview/list/newTask') return;

        location.assign(newLocation);
    })
}

if(addNewListBtn) {
    addNewListBtn.addEventListener('click', () => {
        const newLocation = `/overview/newList`;
        location.assign(newLocation);
    })
}