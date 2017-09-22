import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Square from './Square'
import { r, n, b, q, k, p, P, K, Q, B, N, R } from '../images/pieces'

const fenToPiece = { r, n, b, q, k, p, P, K, Q, B, N, R }

// const fenToPiece = {
//     r: '♜',
//     n: '♞',
//     b: '♝',
//     q: '♛',
//     k: '♚',
//     p: '♟',
//     P: '♙',
//     K: '♔',
//     Q: '♕',
//     B: '♗',
//     N: '♘',
//     R: '♖',
//     '#': ''
// }

// const pieces = ['♜', '♞', '♝', '♛', '♚', '♟', '♖', '♘',	'♗', '♕', '♔', '♙', ]

const randomElement = arr => arr[Math.floor(Math.random() * arr.length)]

function transform(fenRow) {
    var result = ''
    for (var i = 0; i < fenRow.length; i++) {
        if (Number.isInteger(+fenRow[i])) {
            for (var j = 0; j < +fenRow[i]; j++) {
                result += '#'
            }
        } else {
            result += fenRow[i]
        }
    }
    return result
}

class Board extends Component {
    render() {
        const fen = this.props.fen
        const board = []
        const rows = fen.split('/').map(transform)
        for (let i = 0; i < rows.length; i++) {
            const row = []
            for (let j = 0; j < rows[i].length; j++) {
                row.push(<Square
                    key={i+j}
                    base64={fenToPiece[rows[i][j]]}
                    /* color={(i + j) % 2 ? 'black' : 'white'} */
                    /*piece={fenToPiece[rows[i][j]]}*/ 
                />)
            }
            board.push(<View key={i} style={{flexDirection: 'row'}}>{row}</View>)
        }

        return (
            <View>
                {board}
            </View>
        )
    }
}

export default Board
