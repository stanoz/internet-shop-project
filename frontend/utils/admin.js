import axios from "axios";

export async function fetchReport() {
    return (await axios.get('http://localhost:3000/report/generate', {withCredentials: true})).data
}