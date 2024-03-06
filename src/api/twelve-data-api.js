import axios from 'axios'

const axiosInstance = () => {
    // create axios instance with default config settings
    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    // on request being made, intercept it and add on Authorization header automatically
    axiosInstance.interceptors.request.use((config) => {
        const apiKey = process.env.TWELVE_DATA
        config.headers.Authorization =  `apikey ${apiKey}`
        return config;
    });
    return axiosInstance
}

export const getNSDQData = () => {
    return axiosInstance().get('https://api.twelvedata.com/indices', {
        params: {
            symbol: 'IXIC'
        }
    })
    .then(response => response.data)
}

