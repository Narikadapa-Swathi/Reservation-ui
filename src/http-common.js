import axios from 'axios'
export default axios.create({

    baseURL: 'http://localhost:9001/reservation',
    headers:{
        'content-type':'application/json'
    }
})