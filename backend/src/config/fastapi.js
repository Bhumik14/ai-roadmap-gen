import axios from 'axios';

export const fastapiClient = axios.create({
    baseURL: process.env.FASTAPI_URL,
    headers: {
        "content-type": "application/json",
        Accept: "application/json"
    }
})