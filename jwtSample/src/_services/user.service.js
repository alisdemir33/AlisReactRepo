import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`https://localhost:44384/sample/GetUserList`, requestOptions).then(handleResponse);
}