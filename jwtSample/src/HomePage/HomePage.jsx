import React from 'react';

import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
<<<<<<< HEAD
=======
        console.log(this.state.users);
>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7
    }

    render() {
        const { currentUser, users } = this.state;
<<<<<<< HEAD
        return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
=======
       
        console.log('render'+users);    
;debugger
        return (
            <div>
                <h1>Hi {currentUser.username}! {currentUser}</h1>
>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                    <ul>
                        {users.map(user =>
<<<<<<< HEAD
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
=======
                            <li key={user.id}>{user.userName} / {user.password}</li>
>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { HomePage };