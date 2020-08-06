import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

<<<<<<< HEAD
    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
=======
    //return fetch(`${config.apiUrl}/sample/authenticate`, requestOptions)
    return fetch(`https://localhost:44384/sample/authenticate`, requestOptions)
>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
<<<<<<< HEAD
=======
            console.log(user);
>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}