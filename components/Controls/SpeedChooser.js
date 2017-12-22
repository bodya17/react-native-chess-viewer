import React from 'react'
import { View, Slider, Text } from 'react-native'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components/native'

const Container = styled.View`
  height: 50;
  padding: 10%;
  align-items: center;
  flex-direction: row
`
const SpeedChooser = props => (
  <Container>
    <Text>Speed:</Text>
    <Slider
      style={{width: 300}}
      minimumValue={1}
      maximumValue={20}
      onValueChange={props.store.changeTimeout}
    />
  </Container>
)

export default inject('store')(observer(SpeedChooser))
