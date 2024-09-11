import { baseUrl } from "../../app/constant";

export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${baseUrl}/users`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        // TODO: on server it will only return some info of user (not password)
        resolve({ data });
    });
}

export function checkUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
        const email = loginInfo.email;
        const password = loginInfo.password;
        const response = await fetch(`${baseUrl}/users?email=` + email);
        const data = await response.json();
        // TODO: on server it will only return some info of user (not password)
        if (data.length) {
            if (password === data[0].password) {
                resolve({ data: data[0] });
            } else {
                reject({ message: 'wrong credentials' });
            }
        } else {
            reject({ message: 'user not found' });
        }
        // TODO: on server it will only return some info of user (not password)
    });
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
        resolve({ data:'sucess' });
    });
}
