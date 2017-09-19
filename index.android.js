import React, { Component } from 'react';
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
} from 'react-native';


// import { CheckBox } from 'react-native-elements'

import Board from './components/Board.js'
import { Chess } from 'chess.js'

var game1 = `1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Bd2 O-O
5. e3 d5 6. Bd3 c5 7. Nf3 Nc6 8. dxc5 Bxc5
9. Qe2 Nb4 10. Bb1 dxc4 11. Qxc4 b6 12. Qh4 Ba6
13. Ne4 Nd3+ 14. Bxd3 Qxd3 15. Nxf6+ gxf6 16. O-O-O Ba3
17. bxa3 Rac8+ 18. Kb2 Qc2+ 19. Ka1 Bc4`

var game2 = `1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6
5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6
9. Qe2 Na5 10. Nbd2 c5 11. Nxe4 dxe4 12. Bxe6 exf3
13. Bxf7+ Kxf7 14. Qxf3+ Ke8 15. Rd1 Qc8 16. e6 Qb7
17. Rd5 Qe7 18. Bg5 Qxe6 19. Kf1`

var game3 = `1. e4 c5 2. Nc3 Nc6 3. g3 e6 4. Bg2 g6
5. Nge2 Bg7 6. O-O Nge7 7. d3 a6 8. Be3 b6
9. Qd2 d5 10. exd5 exd5 11. Bh6 O-O 12. Bxg7 Kxg7
13. Nf4 d4 14. Ncd5 Ra7 15. Rae1 Re8 16. h4 Rd7
17. Nf6 Kxf6 18. Nh5+ gxh5 19. Qg5#`

var games = [game1, game2, game3]
const initialSetup = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

export default class newappbew extends Component {
  constructor(props) {
    super(props);

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

  move = (dir, autoplay=false) => {
    pgnParser((err, parser) => {
        const [result] = parser.parse(game);
        console.log(result);
    })
    var withoutMoveNumbers = games[this.state.game].replace(/\d+\./g, ' ')
    var moves = withoutMoveNumbers.split(/\s+/).filter(move => move !== '')
    
    dir === 1
      ? this.chess.move(moves[this.state.currentMoveIndex + dir].move)
      : this.chess.undo()

    this.setState({
      currentMoveIndex: this.state.currentMoveIndex + dir,
      fen: this.chess.fen().replace(/\s.+/, ''),
      autoplay
    })
    if (autoplay) {
      setInterval(() => this.move(1, true), this.state.timeout)
    }
  }

  play = () => {
    // const chess = new Chess()
    // var withoutMoveNumbers = games[this.state.game].replace(/\d+\./g, ' ')
    // var moves = withoutMoveNumbers.split(/\s+/).filter(move => move !== '')

    // if (this.state.intervalID) {
    //   clearInterval(this.state.intervalID)
    // }
    // var id = setInterval(() => {
    //   if (moves.length === 1) {
    //     clearInterval(id)
    //   }
    //   chess.move(moves.shift())
    //   this.setState({
    //     fen: chess.fen().replace(/\s.+/, '')
    //   })
    // }, this.state.timeout);
    // this.setState({ intervalID: id })
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
            {games.map((game, i) => <Picker.Item label={`game ${i}`} value={i} />)}
          </Picker>

          <Board fen={this.state.fen} />

          <Switch
            onValueChange={autoplay => {
              {/*this.setState({ autoplay })*/}
              this.move(1, autoplay)
            }}
            onTintColor="#00ff00"
            thumbTintColor="#0000ff"
            tintColor="#888"
            value={this.state.autoplay}
          />
          
          <View style={{height: 50, padding: 10, alignItems: 'center'}}>
            <Slider
              style={{width: 300}}
              minimumValue={1}
              maximumValue={5}
              onValueChange={value => {
                this.setState({ timeout: Math.round(value * 100) })
                this.move()
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
