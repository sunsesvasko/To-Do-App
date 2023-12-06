import axios from 'axios';

export const createTask = async(data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/tasks',
            data
        })
        
        if(res.data.status === 'success') {
            alert('Task created successfully!');
            const listName = window.location.search.split('=')[1];
            const newLocation = `/overview/list?name=${listName}`;
            location.assign(newLocation)
        }
    } catch(err) {
        console.log(err.response.data.message);
    }
}