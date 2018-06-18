import React, { Component } from 'react';
import { View, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

images = [{picture: require('./colonel.png')}, {picture: require('./kfcad1.jpg')}, {picture: require('./kfcad2.jpg')}];

export default class Ads extends Component {
    _renderItem ({item, index}) {
        return (
            <View>
                <Image style={{marginTop: 25, marginBottom: 25, height: 625, width: 625}} source={item.picture}/>
            </View>
        );
    }

    render() {
        return (
        <Carousel
            data={images}
            itemWidth={625}
            itemHeight={625}
            sliderHeight={625}
            sliderWidth={625}
            renderItem={this._renderItem}
            lockScrollWhileSnapping={true}
            autoplay={true}
            loop={true}
        />
        );
    }
}