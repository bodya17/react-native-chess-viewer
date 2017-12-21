import React from 'react'
import { Picker } from 'react-native'
import { observer, inject } from 'mobx-react'

const GamePicker = props => (
  <Picker
    style={{width: 100}} 
    selectedValue={props.store.game}
    onValueChange={props.store.changeCurrentGame}
  >
    {props.store.games.map((game, i) => (
      <Picker.Item key={i} label={`game ${i}`} value={i} />
    ))}
  </Picker>
)

export default inject('store')(observer(GamePicker))
