import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Slider
} from 'react-native';

import Board from './components/Board.js'
import { Chess } from 'chess.js'

var game1 = `1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Bd2 O-O
5. e3 d5 6. Bd3 c5 7. Nf3 Nc6 8. dxc5 Bxc5
9. Qe2 Nb4 10. Bb1 dxc4 11. Qxc4 b6 12. Qh4 Ba6
13. Ne4 Nd3+ 14. Bxd3 Qxd3 15. Nxf6+ gxf6 16. O-O-O Ba3
17. bxa3 Rac8+ 18. Kb2 Qc2+ 19. Ka1 Bc4`

var game2 = `1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6
5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6
9. Qe2 {An improvement on the castomary 9. c3} Na5 10. Nbd2 c5 11. Nxe4 dxe4 12. Bxe6 exf3
13. Bxf7+ Kxf7 14. Qxf3+ Ke8 15. Rd1 Qc8 16. e6 Qb7
17. Rd5 Qe7 18. Bg5 Qxe6 19. Kf1`

var games = [game1, game2]


export default class BoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fen: "8/8/8/8/8/8/8/8",
      intervalID: null,
      timeout: 1000,
      game: 0,
      currentMoveIndex: -1
    }
  }
  chess = new Chess()

  move = (dir) => {
    var withoutMoveNumbers = games[this.state.game].replace(/\d+\./g, ' ')
    var moves = withoutMoveNumbers.split(/\s+/).filter(move => move !== '')
    
    dir === 1
      ? this.chess.move(moves[this.state.currentMoveIndex + dir])
      : this.chess.undo()

    this.setState({
      currentMoveIndex: this.state.currentMoveIndex + dir,
      fen: this.chess.fen().replace(/\s.+/, '')
    })
  }

  play = () => {
    const chess = new Chess()
    var withoutMoveNumbers = games[this.state.game].replace(/\d+\./g, ' ')
    var moves = withoutMoveNumbers.split(/\s+/).filter(move => move !== '')

    if (this.state.intervalID) {
      clearInterval(this.state.intervalID)
    }
    var id = setInterval(() => {
      if (moves.length === 1) {
        clearInterval(id)
      }
      chess.move(moves.shift())
      this.setState({
        fen: chess.fen().replace(/\s.+/, '')
      })
    }, this.state.timeout);
    this.setState({ intervalID: id })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {/*<Text>Here is moves</Text>*/}
          {/*<Text>{moves.join(' ')}</Text>*/}
          <Slider
            style={{width: 300}}
            minimumValue={1}
            maximumValue={5}
            onValueChange={value => {
              this.setState({ timeout: Math.round(value * 100) })
              this.play()
            }}
          />
          <Button
            onPress={() => {
              this.setState({ game: 0 })
              this.play()
            }}
            title="Play game2"
            color="#841584"
          />
          <Button
            onPress={() => {
              this.setState({ game: 1 })
              this.play()
            }}
            title="Play game 1"
            color="#841584"
          />
          <Board fen={this.state.fen} />
          <View style={{height: 50}}></View>

          <View style={{
            flexDirection: 'row',
            width: 300, height: 50, backgroundColor: 'rgba(0,150,70,0.3)',
            borderWidth: 3,
            borderColor: '#feac32',
            alignItems: 'center'
          }}>
            <View style={{flex: 1, padding: 10}}>
              <Button
                onPress={() => this.move(-1)}
                title="<"
                color="#841584"
              />
            </View>
            <View style={{flex: 1, padding: 10}}>
              <Button
                onPress={() => this.move(1)}
                title=">"
                color="#841584"
              />
            </View>
          </View>
          <Text>Here is timeout</Text>
          <Text>{this.state.timeout}</Text>
          <Text>Current move index: {this.state.currentMoveIndex}</Text>
    
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('newappbew', () => newappbew);
