import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

const SquareContainer = styled.View`
    width: 37;
    height: 37;
`

class Square extends Component {
    render() {
        return (
            <SquareContainer style={{
                backgroundColor: this.props.color === 'white' ? '#fff' : 'rgba(0, 0, 0, .3)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{fontSize: 35}}>{this.props.piece}</Text>
            </SquareContainer>
        )
    }
}

Square.propTypes = {
    piece: PropTypes.string,
    color: PropTypes.oneOf(['white', 'black'])
}

export default Square