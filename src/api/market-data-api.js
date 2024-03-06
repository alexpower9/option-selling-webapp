import axios from 'axios';


const axiosInstance = () => {
    // create axios instance with default config settings
    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    // on request being made, intercept it and add on Authorization header automatically
    axiosInstance.interceptors.request.use((config) => {
        const apiKey = process.env.VUE_APP_API_KEY
        config.headers.Authorization =  `Bearer ${apiKey}`
        return config;
    });
    return axiosInstance
}

export const getOptionData = (ticker, strikeLimit) => {
    return axiosInstance().get(`https://api.marketdata.app/v1/options/chain/${ticker}`, {
        params: {
            strikeLimit
        }
    })
    .then(response => response.data)
}

export const getDJIData = () => {
    return axiosInstance().get(`https://api.marketdata.app/v1/indices/quotes/DJI`)
    .then(response => response.data)
}

export const getVIXData = () => {
    return axiosInstance().get(`https://api.marketdata.app/v1/indices/quotes/VIX`)
    .then(response => response.data)
}


