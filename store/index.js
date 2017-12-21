import { observable, action } from 'mobx'
import { Chess } from 'chess.js'
import games from '../assets/games'

const initialSetup = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

export default class GameStore {
  @observable fen = initialSetup
  @observable timeout = 1000
  @observable game = 0
  @observable currentMoveIndex = -1
  @observable autoplay = false
  @observable games = games

  intervalID = null
  chess = new Chess()

  @action.bound changeAutoplay(mode) {
    this.autoplay = mode
    if (mode) {
      this.intervalID = setInterval(() => this.move(1), this.timeout)
    } else if (this.intervalID) {
      clearInterval(this.intervalID)
      this.intervalID = null
    }
  }

  @action.bound move(dir) {
    const withoutMoveNumbers = this.games[this.game].replace(/\d+\./g, ' ')
    const moves = withoutMoveNumbers.split(/\s+/).filter(move => move !== '')
    const {
      currentMoveIndex
    } = this

    if (
      (currentMoveIndex !== moves.length - 1 && dir === 1) ||
      (currentMoveIndex !== -1 && dir === -1)) {

      dir === 1
        ? this.chess.move(moves[currentMoveIndex + dir])
        : this.chess.undo()

      this.currentMoveIndex = currentMoveIndex + dir,
      this.fen = this.chess.fen().replace(/\s.+/, '')
    }
  }

  @action.bound changeTimeout(value) {
    const timeout = Math.round(value * 100)
    this.timeout = timeout
    if (this.autoplay) {
      clearInterval(this.intervalID)
      this.intervalID = setInterval(() => this.move(1), timeout)
    }
  }

  @action.bound changeCurrentGame(game) {
    this.game = game
    this.currentMoveIndex = -1
    this.fen = initialSetup
    this.chess.reset()
  }
}
