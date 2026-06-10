import axios from "axios";
const kitsuApi = axios.create({
    baseURL: 'https://kitsu.io/api/edge'
})
export default kitsuApi