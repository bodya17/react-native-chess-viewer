import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native'

import Board from './components/Board.js'
import GamePicker from './components/GamePicker.js'
import Controls from './components/Controls'

const App = () => (
  <ScrollView>
    <View style={styles.container}>
      <GamePicker />
      <Board />
      <Controls />
    </View>
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

export default App
