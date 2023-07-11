import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './src/navigations/BootomNavigation';
import {Provider} from 'react-redux';

import Store from './src/redux/Store';
export class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <BottomNavigation />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
