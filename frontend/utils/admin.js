import axios from "axios";

export async function fetchReport() {
    return (await axios.get('http://localhost:3000/report/generate', {withCredentials: true})).data
}

export async function getAllProducts() {
    return (await axios.get('http://localhost:3000/products/get-all')).data
}

export async function deleteProduct(productId) {
    return (await axios.delete(`http://localhost:3000/admin/delete-product/${productId}`, {withCredentials: true})).data
}

export async function addProduct(product) {
    return axios.post('http://localhost:3000/admin/add-product', product, {withCredentials: true})
}

export async function getProductById(id) {
    return (await axios.get(`http://localhost:3000/products/get-product/${id}`, {withCredentials: true})).data
}

export async function editProduct(id, product) {
    return await axios.put(`http://localhost:3000/admin/edit-product/${id}`, product, {withCredentials: true})
}

export async function deleteCategory(id) {
    return (await axios.delete(`http://localhost:3000/admin/delete-category/${id}`, {withCredentials: true})).data
}

export async function addCategory(category) {
    return (await axios.post('http://localhost:3000/admin/add-category', category, {withCredentials: true})).data
}

export async function editCategory(id, category) {
    return (await axios.put(`http://localhost:3000/admin/edit-category/${id}`, category, {withCredentials: true})).data
}

export async function getCategoryById(id) {
    return (await axios.get(`http://localhost:3000/category/get-category/${id}`, {withCredentials: true})).data
}