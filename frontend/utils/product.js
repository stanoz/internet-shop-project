import axios from "axios";
import {useSelector} from "react-redux";

export async function fetchProducts({signal}) {
    const response = await axios.get('http://localhost:3000/products/get-all', {signal})

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

export async function getSearchProducts() {
    const {category, minPrice, maxPrice, sizes} = useSelector((state) => state.product)
    let params = `?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sizes=${sizes}`
    const response = await axios.get(`http://localhost:3000/products/search${params}`)

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