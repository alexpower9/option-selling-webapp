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


export const getSPYData = () => {
    return axiosInstance().get(`https://api.marketdata.app/v1/indices/quotes/SPX`)
    .then(response => response.data)
}

export const getNasdaqData = () => {
    return axiosInstance().get(`https://api.marketdata.app/v1/indices/quotes/NDX`)
    .then(response => response.data)
}

export const stockData = (ticker) => {
    return axiosInstance().get(`https://api.marketdata.app/v1/stocks/quotes/${ticker}`, {
        params: {
            ['52week'] : true
        }
    })
    .then(response => response.data)
}

//lets just worry about daily data on a 5minute interval for now, but in the future,
//we can investigate how we can go about adding the stock graph bar for other things
export const stockGraphData = (ticker) => {
    const now = Math.floor(Date.now() / 1000); //unix time stamp
    const oneDayAgo = now - 86400; 

    return axiosInstance().get(`https://api.marketdata.app/v1/stocks/candles/15/${ticker}`, {
        params: {
            from : oneDayAgo,
            to : now
        }
    })
    .then(response => response.data)

}
