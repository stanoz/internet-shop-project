import axios from "axios";

export async function fetchProducts() {
    const response = await axios.get('http://localhost:3000/products/get-all')

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

export async function getSearchProducts(category, minPrice, maxPrice, sizes, sort, title) {
    let params = `?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sizes=${sizes}&sort=${sort}&title=${title}`
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

export async function fetchProductNames() {
    const response = await axios.get('http://localhost:3000/products/get-names')
    return response.data.data;
}