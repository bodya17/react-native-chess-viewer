import React, { Component } from 'react';
import { View, Slider } from 'react-native';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class SpeedChooser extends Component {
  render() {
    return (
      <View style={{height: 50, padding: 10, alignItems: 'center'}}>
        <Slider
          style={{width: 300}}
          minimumValue={1}
          maximumValue={20}
          onValueChange={this.props.store.changeTimeout}
        />
        </View>
    );
  }
}

export default SpeedChooser;