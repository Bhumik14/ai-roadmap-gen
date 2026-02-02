import axios from "axios";

const apiURL = "http://localhost:3000/api/"
// const apiURL = import.meta.env.VITE_EXPRESS_URL

export const api = axios.create({
    baseURL: apiURL,
    headers: {
        "content-type": "application/json",
        Accept: "application/json"
    }
});
