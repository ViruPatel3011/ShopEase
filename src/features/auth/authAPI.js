import { baseUrl } from "../../app/constant";
import axiosInstance from "../../helpers/axiosInstance";

export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${baseUrl}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        resolve({ data });
    });
}

export async function checkUser(loginInfo) {

    const response = await axiosInstance.post('/auth/login', loginInfo, {
        headers: { 'content-type': 'application/json' },
    });
    return response;


}

export function updateUser(updatedData) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl}/users/` + updatedData.id, {
            method: 'PATCH',
            body: JSON.stringify(updatedData),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        resolve({ data });
    });
}


export function signOut(userId) {
    return new Promise(async (resolve, reject) => {
        resolve({ data: 'sucess' });
    });
}
