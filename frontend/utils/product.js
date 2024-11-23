import axios from "axios";

export async function fetchProducts({signal}) {
    const response = await axios.get('http://localhost:3000/products/get-all', {signal})
    return await response.json();
}