import React, { Component } from 'react';
import { View, Button } from 'react-native';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class ForwardBack extends Component {
  render() {
    return (
      <View style={{
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 10
      }}>

        <View style={{width: 100}}>
          <Button
            onPress={() => this.props.store.move(-1)}
            title="<"
            color="#841584"
            style={{width: 300}}
          />
        </View>

        <View style={{width: 100}}>
          <Button
            onPress={() => this.props.store.move(1)}
            title=">"
            color="#841584"
            style={{width: 300}}
          />
        </View>
      </View>
    );
  }
}

export default ForwardBack;