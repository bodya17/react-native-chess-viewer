import React, { Component } from 'react'
import { Button } from 'react-native'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components/native'

const Container = styled.View`
  width: 300;
  flex-direction: row;
  justify-content: space-around;
  borderWidth: 1;
  padding: 2%;
`
const ButtonContainer = styled.View`
  width: 100;
`

@inject('store')
@observer
class ForwardBack extends Component {
  moveBack = () => {
    this.props.store.move(-1)
  }

  moveForward = () => {
    this.props.store.move(1)
  }

  render() {
    return (
      <Container>
        <ButtonContainer>
          <Button
            onPress={this.moveBack}
            title="<"
            color="#841584"
          />
        </ButtonContainer>

        <ButtonContainer>
          <Button
            onPress={this.moveForward}
            title=">"
            color="#841584"
          />
        </ButtonContainer>
      </Container>
    )
  }
}

export default ForwardBack
