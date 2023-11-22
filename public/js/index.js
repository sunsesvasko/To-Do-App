const firstListsRow = document.querySelector('.tasks--container');
const secondListsRow = document.querySelector('.lists--container');

if(firstListsRow) {
    firstListsRow.addEventListener('click', (e) => {
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
    })
}