import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { observer, inject } from 'mobx-react'

import board64 from '../assets/boardBase64'
import * as fenToPiece from '../assets/images/pieces'
import SIDE_LEN from '../config/boardDimensions'
import Square from './Square'

function transform(fenRow) {
  let result = ''
  for (var i = 0; i < fenRow.length; i++) {
    if (Number.isInteger(+fenRow[i])) {
      for (let j = 0; j < +fenRow[i]; j++) {
        result += '#'
      }
    } else {
      result += fenRow[i]
    }
  }
  return result
}

@inject('store')
@observer
class Board extends Component {
  render() {
    const { fen } = this.props.store
    const board = []
    const rows = fen.split('/').map(transform)
    for (let i = 0; i < rows.length; i++) {
      const row = []
      for (let j = 0; j < rows[i].length; j++) {
        row.push(<Square
          key={`${i}${j}`}
          base64={fenToPiece[rows[i][j]]}
        />)
      }
      board.push(<View key={i} style={{flexDirection: 'row'}}>{row}</View>)
    }

    return (
      <View style={{width: SIDE_LEN, height: SIDE_LEN}}>
        <Image source={{uri: board64}}>
          {board}
        </Image>
      </View>
    )
  }
}

export default Board
