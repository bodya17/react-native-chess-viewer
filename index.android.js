import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'mobx-react'

import App from './App';
import GameStore from './store'

const store = new GameStore()

const ConnectedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('newappbew', () => ConnectedApp)