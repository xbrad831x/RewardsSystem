import React, { Component } from 'react';
import PhoneNumber from './PhoneNumber';
import { AppRegistry, Text, View } from 'react-native';

export default class template extends Component {
  render() {
    return (
    <View style={{flex: 500, flexDirection: 'row'}}>
      <View style={{flex: 300}}></View>
      <View style={{flex: 1,backgroundColor: 'dimgray'}}></View>
      <View style={{flex: 190}}><PhoneNumber /></View>
    </View>
    );
  }
}
