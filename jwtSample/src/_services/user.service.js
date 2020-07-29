import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
<<<<<<< HEAD
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
=======
    return fetch(`https://localhost:44384/sample/GetUserList`, requestOptions).then(handleResponse);
>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7
}