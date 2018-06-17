import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Animated, View, Image, BackHandler, Alert } from 'react-native';
import axios from 'axios';

let num;

export default class StampsDetail extends Component {

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(0);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        Animated.sequence([
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 1000
            }),
            Animated.parallel([Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 1000
            }),
            Animated.timing(this.animatedValue2, {
                toValue: 1,
                duration: 1000
            })])
        ]).start()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    helperTop(animatedStyle, num) {
        let array = [];

        let faces;

        if(num > 5)
        {
            faces = 5
        }
        else
        {
            faces = num
        }

        let remaining = 5 - faces;

        for(i=0; i<faces-1;i++)
        {
            array.push(<View key={i}><Image style={styles.image} source={require('./colonel.png')} /></View>);
        }

        if(num <= 5)
        {
            array.push(<View key={num}><Animated.Image style={[styles.image, animatedStyle]} source={require('./colonel.png')} /></View>);
        }
        else
        {
            array.push(<View key={5}><Image style={styles.image} source={require('./colonel.png')} /></View>);
            remaining = 0;
        }

        for(j=0; j<remaining; j++)
        {
            array.push(<View key={j}style={styles.circle}></View>);
        }

        return array;
    }

    helperBottom(animatedStyle, num) {
        let array2 = [];
        let faces;
        let empty;

        if(num < 6)
        {
            faces = 0
            empty = 5
        }
        else
        {
            faces = num - 5
            empty = 5 - faces;
        }


        for(i=0; i<faces-1;i++)
        {
            array2.push(<View key={i}><Image style={styles.image} source={require('./colonel.png')} /></View>);
        }

        if(num > 5)
        {
            array2.push(<View key={num}><Animated.Image style={[styles.image, animatedStyle]} source={require('./colonel.png')} /></View>);
        }

        for(j=0; j<empty; j++)
        {
            array2.push(<View key={j} style={styles.circle}></View>);
        }

        return array2;
    }

    render() {
        const inter = this.animatedValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '40deg']
        })
        const inter2 = this.animatedValue2.interpolate({
            inputRange: [0,1],
            outputRange: [2, 1]
        })
        const animatedStyle = {
            transform: [{rotate: inter}, {scale: inter2}]
        }
        const {navigation} = this.props;
        const name = navigation.getParam('name', 'name');
        const num = navigation.getParam('stamps', '#');

        let message;

        if(num == 10)
        {
            message = <Text style={styles.text}>Congratulations! On your next visit, your meal is on us!</Text>
        }
        else
        {
            message = <Text style={styles.text}>Only {10 - num} More To Go!</Text>
        }
       
        return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome {name}!</Text>
            {message}
            <View style={styles.circleContainer}>
                {this.helperTop(animatedStyle, num)}
            </View>
            <View style={styles.circleContainer}>
                {this.helperBottom(animatedStyle, num)}
            </View>
            <Text>{setTimeout(() => this.props.navigation.replace('Main'), 5000)}</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        alignSelf: 'center'
    },

    container: {
        backgroundColor: 'white'
    },

    circleContainer: {
        height: 160,
        width: 800,
        margin: 40,
        flexDirection: 'row',
        alignSelf: 'center',
    },

    circle: {
        height: 170,
        width: 170,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 200
    },

    image: {
        height: 170,
        width: 170,
        borderRadius: 200
    }
});
