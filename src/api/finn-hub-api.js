import axios from 'axios'

const axiosInstance = () => {
    // create axios instance with default config settings
    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    // on request being made, intercept it and add on Authorization header automatically
    // axiosInstance.interceptors.request.use((config) => {
    //     const apiKey = process.env.FINN_HUB
    //     config.headers['X-Finnhub-Token'] =  apiKey
    //     return config;
    // });
    return axiosInstance
}

export const stockSearch = (name) => {
    const key = process.env.FINN_HUB
    return axiosInstance().get(`https://finnhub.io/api/v1/search`, {
        params: {
            q : name
        },
        headers : {
            'X-Finnhub-Token': key
        }
    })
    .then(response => response.data)
}