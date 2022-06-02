import axios from 'axios'

let config = {

    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    }
};
export const GetService = (url, pathz, tokens) => {
    if (jwtKey != '') {
        axios.defaults.headers.common['Authorization'] = 'token ' + tokens;
    }

    try {
        return axios.get(`https://${url}/api/resource/${pathz}`, config);
    } catch (error) {
        console.warn(error);
    }
}    