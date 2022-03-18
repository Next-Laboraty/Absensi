import axios from 'axios'

export default function AxiosGetDataAction(data) {
    console.log(data)
    var config = {
        method: 'get',
        url: data.url,
        headers: { 
          'Authorization': 'token '+data.token, 
          'Accept': 'application/json', 
        },
      };
      
     
    return axios(config)
}