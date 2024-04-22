import axios from'axios'

const axiosInstance = () => {
    // create axios instance with default config settings
    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return axiosInstance
}

export const getOptionData = (ticker) => {
    return axiosInstance().get(`http://localhost:3000/options/${ticker}`)
    .then(response => response.data)
}

