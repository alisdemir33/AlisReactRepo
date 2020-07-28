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
        console.log(this.state.users);
    }

    render() {
        const { currentUser, users } = this.state;
       
        console.log('render'+users);    
;debugger
        return (
            <div>
                <h1>Hi {currentUser.username}! {currentUser}</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.userName} / {user.password}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { HomePage };