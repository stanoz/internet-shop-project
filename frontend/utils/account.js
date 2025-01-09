import axios from "axios";

export async function registerUser(user) {
    const url = 'http://localhost:3000/users/register'
    return await axios.post(url, user, {
        withCredentials: true,
    });
}

export async function loginUser (userCredentials) {
    const url = 'http://localhost:3000/users/login'
    return await axios.post(url, userCredentials, {
        withCredentials: true,
    })
}

export async function logout() {
    return await axios.post(
        "http://localhost:3000/users/logout",
        {},
        {
            withCredentials: true,
        },
    );
}