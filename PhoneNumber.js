import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Alert} from 'react-native';
import axios from 'axios';

export default class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {phonenumber: '',
                  numErr: '',
                  showNameInput: false,
                  name: '',
                  nameerr: ''}
  }

  checkNumber(text) {
    let headers = {
      'Content-Type': 'application/json'
    }

    if(text.length != 10)
    {
      this.setState({numErr: 'Invalid Phone Number.'})
    }
    else
    {
      axios.post("http://192.168.1.110:5001/number", {number: text}, headers)
      .then((response) => {
        if(response.data.msg == 'Please enter your name.')
        {
          this.setState({showNameInput: true, numErr: ''});
        }
        else if(response.data.msg == 'Welcome back! Please show this message to claim your free meal!')
        {
          Alert.alert('Congratulations', 'Welcome back! Please show this message to claim your free meal!',
           [{text: 'Ok', onPress: () => this.props.navigation.replace('Main')}]);
        }
        else
        {
          this.props.navigation.navigate('Stamps', {name: response.data.name, stamps: response.data.stamps});
        }
      })
      .catch((error) => Alert.alert(error.message));
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

  signup() {
    if(this.state.name.length == 0)
    {
      this.setState({nameerr: "Name is blank."})
    }
    else
    {
      let headers = {
        'Content-Type': 'application/json'
      }

      axios.post("http://192.168.1.110:5001/signup", {name: this.state.name, number: this.state.phonenumber}, headers)
      .then(() => Alert.alert("", "Account Created!", [{text: "Ok", 
                              onPress: () => this.props.navigation.navigate('Stamps', {name: this.state.name, stamps: 1})}]))
      .catch((error) => Alert.alert(error.message));
    }
  }

  render() {
    const input = <TextInput 
    style={styles.textinputName}
    maxLength={20}
    onChangeText={(name) => this.setState({name})}
    onSubmitEditing={() => this.signup()}
    placeholder= "Enter in your name."
    />; 
    const placeholder = <Text></Text>;
    return (
      <View style={styles.container}>
        <Text style={styles.textnumber}>{this.formatNumber(this.state.phonenumber)}</Text>
        <TextInput
        style={styles.textinputPhone}
        keyboardType = 'numeric'
        onKeyPress = {this.onButtonPressed}
        onChangeText={(phonenumber) => this.setState({phonenumber})}
        placeholder = "Enter in phone number."
        value={this.state.phonenumber}
        onSubmitEditing={(e) => this.checkNumber(e.nativeEvent.text)}
        maxLength={10}
      />
      <Text style={styles.texterror}>{this.state.numErr}</Text>

      {this.state.showNameInput ? input : placeholder}

      <Text style={styles.texterror}>{this.state.nameerr}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },

  textinputPhone: {
    height: 70,
    width: 380,
    fontSize: 35,
    textAlign: 'center',
    alignSelf: 'center'
  },

  textinputName: {
    height: 70,
    width: 380,
    fontSize: 35,
    marginTop: 60,
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