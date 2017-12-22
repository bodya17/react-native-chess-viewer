import React from 'react'
import { View } from 'react-native'

import Autoplay from './Autoplay'
import SpeedChooser from './SpeedChooser'
import ForwardBack from './ForwardBack'

const Controls = () => (
  <View style={{alignItems: 'center'}}>
    <Autoplay />
    <SpeedChooser />
    <ForwardBack />
  </View>
)

export default Controls
