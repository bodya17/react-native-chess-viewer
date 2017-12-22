import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Image } from 'react-native'

const SquareContainer = styled.View`
  width: 40;
  height: 40;
`

const Square = props => (
<SquareContainer>
  <Image
    style={{flex: 1}}
    source={{uri: props.base64}}
  />
  </SquareContainer>
)

Square.propTypes = {
  base64: PropTypes.string
}

export default Square
