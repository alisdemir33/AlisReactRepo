import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          
        </Layout>
      </div>
    );
  }
}

export default App;
