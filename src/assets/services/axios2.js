
import axios from "axios";
const aniListApi = axios.create({
    baseURL: 'https://graphql.anilist.co'
})
export default aniListApi