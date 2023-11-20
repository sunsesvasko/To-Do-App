import axios from 'axios';

export const signup = async(data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/users/signup',
            data
        });

        if(res.data.status === 'success') {
            alert('User updated successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch(err) {
        console.log(err.response.data.message);
    } 
}