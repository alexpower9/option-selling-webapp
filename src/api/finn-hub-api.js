import axios from 'axios'

const axiosInstance = () => {
    // create axios instance with default config settings
    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        }
    })
    axiosInstance.interceptors.request.use((config) => {
        const apiKey = process.env.VUE_APP_FINN_HUB
        config.params = {
            token: apiKey
        }
        return config;
    });
    return axiosInstance
}

export const stockSearch = (name) => {
    const key = process.env.VUE_APP_FINN_HUB
    return axiosInstance().get(`https://finnhub.io/api/v1/search?q=${name}&token=${key}`)
    .then(response => response.data)
}


// export const otherStockSearch = (name) => {
//     const key = process.env.FINN_HUB
//     return axiosInstance().get(`https://finnhub.io/api/v1/search`)
//     .then(response => response.data)
// }