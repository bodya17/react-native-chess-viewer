import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import board64 from '../boardBase64'

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

const SquareContainer = styled.View`
    width: 37;
    height: 37;
`

class Square extends Component {
    render() {
        return (
            <SquareContainer style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 50, height: 50

            }}>
                <Image
                    style={{width: 50, height: 50, flex: 1}}
                    source={{uri: this.props.base64}}
                >
                </Image>
                {/*<Text style={{fontSize: 34}}>{this.props.piece}</Text>*/}
            </SquareContainer>
        )
    }
}


Square.propTypes = {
    piece: PropTypes.string,
    color: PropTypes.oneOf(['white', 'black'])
}

export default Square