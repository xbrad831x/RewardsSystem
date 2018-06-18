import React, { Component } from 'react';
import PhoneNumber from './PhoneNumber';
import StampsDetails from './StampsDetail';
import Ads from './Ads';
import { AppRegistry, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class template extends Component {

  render() {
    return (
    <View style={{flex: 500, flexDirection: 'row', backgroundColor: 'white'}}>
      <View style={{flex: 300}}><Ads /></View>
      <View style={{flex: 1,backgroundColor: 'dimgray'}}></View>
      <View style={{flex: 190}}><PhoneNumber navigation={this.props.navigation}/></View>
    </View>
    );
  }
}

export default createStackNavigator(
  {
    Main: template,
    Stamps: StampsDetails,
    Phone: PhoneNumber
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      headerLeft: null
    }
  }
);