import styled from 'styled-components/native'
import { TextInput } from 'react-native'
TextInput

export const Container = styled.View`
  width: 100%;
  height: 56px;
  border: 1px solid grey;
  border-radius: 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  background-color: white;
`

export const Size = styled.View`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-color: grey;
  margin-right: 18px;
`

export const Label = styled.Text`
  font-size: 14px;
`

export const LabelUnique = styled.Text`
  font-size: 14px;
  margin-left: 10px;
`

export const Input = styled(TextInput)`
  flex: 1;
  height: 100%;
  margin-left: 7px;
`
