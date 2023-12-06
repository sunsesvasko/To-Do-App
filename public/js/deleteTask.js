import axios from 'axios';

export const deleteTask = async(id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/tasks/${id}`
        })
        
        if(res.status === 204) {
            alert('Task deleted successfully!');
            window.setTimeout(() => {
                const listName = window.location.search.split('=')[1];
                const newLocation = `/overview/list?name=${listName}`;
                location.assign(newLocation)
            }, 1000);
        }
    } catch(err) {
        console.log(err.response.data.message);
    }
}