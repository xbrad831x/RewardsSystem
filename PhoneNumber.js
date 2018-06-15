import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {phonenumber: '',
                  numErr: ''}
  }

  checkNumber(text) {
    if(text.length != 10)
    {
      this.setState({numErr: 'Invalid Phone Number.'})
    }
    else
    {
      this.setState({numErr: ''})
      axios.post("localhost:5001", {number: text})
      .then(() => Alert.alert("Success!"))
      .catch((error) => console.log(error.message));
    }
  }

  formatNumber(phonenumber) {
    len = phonenumber.length;
    if(len > 0 && len < 4)
    {
      return '(' + phonenumber.slice(0, len + 1) + ') ';
    }
    else if(len >= 4 && len < 7)
    {
      return '(' + phonenumber.slice(0, 3) + ') ' + phonenumber.slice(3, len + 1);
    }
    else if(len >= 7)
    {
      return '(' + phonenumber.slice(0, 3) + ') ' + phonenumber.slice(3, 6) + '-' + phonenumber.slice(6, len + 1);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textnumber}>{this.formatNumber(this.state.phonenumber)}</Text>
        <TextInput
        style={styles.textinput}
        keyboardType = 'numeric'
        onKeyPress = {this.onButtonPressed}
        onChangeText={(phonenumber) => this.setState({phonenumber})}
        placeholder = "Enter in phone number."
        value={this.state.phonenumber}
        onSubmitEditing={(e) => this.checkNumber(e.nativeEvent.text)}
        maxLength={10}
      />
      <Text style={styles.texterror}>{this.state.numErr}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  },

  textinput: {
    height: 70,
    width: 380,
    fontSize: 35,
    textAlign: 'center',
    alignSelf: 'center'
  },

  textnumber: {
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 40
  },

  texterror: {
    color: 'red',
    textAlign: 'center',
    fontSize: 25
  }
});