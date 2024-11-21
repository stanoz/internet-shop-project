import axios from "axios";

export function fetchProducts({signal}) {
    const response = axios.get('.products/get-all', {signal})
    return response.data;
}