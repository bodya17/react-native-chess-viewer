import React, { Component } from 'react';
import {View} from 'react-native';

import Autoplay from './Autoplay';
import SpeedChooser from './SpeedChooser';
import ForwardBack from './ForwardBack';

class Controls extends Component {
  render() {
    return (
      <View>
        <Autoplay />
        <SpeedChooser />
        <ForwardBack />
      </View>
    );
  }
}

export default Controls;