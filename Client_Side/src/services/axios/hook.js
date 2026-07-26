// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_URL;

// const relayService = ({ url, method = 'GET', headers, data }) => {
//     const axios_instance = axios({ url, method, baseURL: BASE_URL, headers, data })
//     return axios_instance
//     // return [] // just a workaround
// }

// export default relayService



import axios from 'axios';

const relayService = ({ url, method = 'GET', headers, data }) => {
    const axios_instance = axios({ url, method, headers, data })
    return axios_instance
}

export default relayService

