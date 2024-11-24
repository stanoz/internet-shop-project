import axios from "axios";

export async function fetchCategories({signal}) {
    const response = await axios.get('http://localhost:3000/category/get-all', {signal})

    if (response.status === 200) {
        return await response.data.data;
    }

    if (response.status === 404) {
        return []
    }

    throw {
        status: response.status,
        message: response.statusText
    }
}