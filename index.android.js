import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Slider,
  Picker,
  Switch
} from 'react-native'

import Board from './components/Board.js'
import { Chess } from 'chess.js'
import games from './games'

const initialSetup = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

export default class newappbew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fen: initialSetup,
      intervalID: null,
      timeout: 1000,
      game: 1,
      currentMoveIndex: -1,
      autoplay: false
    }
  }
  chess = new Chess()
  intervalID = null

  move = (dir) => {

    const withoutMoveNumbers = games[this.state.game].replace(/\d+\./g, ' ')
    const moves = withoutMoveNumbers.split(/\s+/).filter(move => move !== '')
    const currentMoveIndex = this.state.currentMoveIndex

    if (
      (this.state.currentMoveIndex !== moves.length - 1 && dir === 1) ||
      (this.state.currentMoveIndex !== -1 && dir === -1)) {
      
      dir === 1
        ? this.chess.move(moves[currentMoveIndex + dir])
        : this.chess.undo()

      this.setState({
        currentMoveIndex: currentMoveIndex + dir,
        fen: this.chess.fen().replace(/\s.+/, '')
      })
    } 
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>

          <Picker
            style={{width: 100}} 
            selectedValue={this.state.game}
            onValueChange={game => {
              this.setState({ game, currentMoveIndex: -1, fen: initialSetup })
              this.chess.reset()
            }}>
            {games.map((game, i) => <Picker.Item key={i} label={`game ${i}`} value={i} />)}
          </Picker>

          <Board fen={this.state.fen} />
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Autoplay: </Text>
            <Switch
              onValueChange={autoplay => {
                this.setState({ autoplay })
                if (autoplay) {
                  this.intervalID = setInterval(() => this.move(1), this.state.timeout)
                } else if (this.intervalID) {
                  clearInterval(this.intervalID)
                  this.intervalID = null
                }
              }}
              onTintColor="#00ff00"
              thumbTintColor="#0000ff"
              tintColor="#888"
              value={this.state.autoplay}
            />
          </View>
          
          <View style={{height: 50, padding: 10, alignItems: 'center'}}>
            <Slider
              style={{width: 300}}
              minimumValue={1}
              maximumValue={20}
              onValueChange={value => {
                const timeout = Math.round(value * 100)
                this.setState({ timeout })
                if (this.state.autoplay) {
                  clearInterval(this.intervalID)
                  this.intervalID = setInterval(() => this.move(1), timeout)
                }
              }}
            />
          </View>
          <View style={{
            width: 300,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderWidth: 1,
            padding: 10
          }}>

            <View style={{width: 100}}>
              <Button
                onPress={() => this.move(-1)}
                title="<"
                color="#841584"
                style={{width: 300}}
              />
            </View>

            <View style={{width: 100}}>
              <Button
                onPress={() => this.move(1)}
                title=">"
                color="#841584"
                style={{width: 300}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

AppRegistry.registerComponent('newappbew', () => newappbew)
