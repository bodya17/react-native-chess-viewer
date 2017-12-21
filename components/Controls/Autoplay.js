import React from 'react'
import { Text, View, Switch } from 'react-native'
import {observer, inject} from 'mobx-react'

const Autoplay = props => (
  <View>
    <Text>Autoplay: </Text>
    <Switch
      onTintColor="#00ff00"
      thumbTintColor="#0000ff"
      tintColor="#888"
      value={props.store.autoplay}
      onValueChange={props.store.changeAutoplay}
    />
  </View>
)

export default inject('store')(observer(Autoplay))
