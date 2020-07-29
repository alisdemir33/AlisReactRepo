import React from 'react';
import { render } from 'react-dom';

import { App } from './App';

// setup fake backend
<<<<<<< HEAD
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
=======
/* import { configureFakeBackend } from './_helpers';
configureFakeBackend(); */
>>>>>>> f4ade43ded49289c3463f654208bd7c9df04deb7

render(
    <App />,
    document.getElementById('app')
);