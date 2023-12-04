const lists = document.querySelectorAll('.lists--container');
const tasks = document.querySelectorAll('.task--container');
const closeTaskMenu = document.querySelector('#closeTask');
const openTaskMenus = document.querySelectorAll('.nextImage');
const addNewTaskBtns = document.querySelector('.addNewTask--container');

if(lists.length > 0) {
    lists.forEach(list => {
        list.addEventListener('click', (e) => {
            if(e.target.classList.contains('container')) {
                const nodeName = e.target.children[1].nodeName.toLowerCase();
                const listName = e.target.children[1].textContent.toLowerCase();
    
                if(nodeName === 'div') return;
                // console.log(window.location);
                location.assign(`/overview/list?name=${listName}`);
            } else {
                const nodeName = e.target.parentElement.children[1].nodeName.toLowerCase();
                const listName = e.target.parentElement.children[1].textContent.toLowerCase();
    
                if(nodeName === 'div') return;
                // console.log(window.location);
                location.assign(`/overview/list?name=${listName}`);
            }
        });
    })
}

if(tasks.length > 0) {
    tasks.forEach(task => {
        task.addEventListener('click', (e) => {
            // console.log(e.target);
            if(e.target.type === 'checkbox') {
                // console.log(e.target.nextElementSibling);
                if(e.target.checked) e.target.nextElementSibling.style.textDecoration = 'line-through';
                else e.target.nextElementSibling.style.textDecoration = '';
            } 
        });
    })
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

// Make this open a window where you create a new task
if(addNewTaskBtns) {
    addNewTaskBtns.addEventListener('click', (e) => {
        console.log(e.target);
    })
}