import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '@/_services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

<<<<<<< HEAD
=======
        ;debugger
        console.log({...props});

>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7
        // authorised so return component
        return <Component {...props} />
    }} />
)