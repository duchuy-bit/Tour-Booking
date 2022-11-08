import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import Lottie from 'lottie-react-native';

const {height, width} = Dimensions.get('window');

export default class ProgressCircleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                <View style={{marginHorizontal: 0,marginTop:30 ,width: 50,height:50}}>
                    <Lottie source={require('../assets/lotties/loading.json')} 
                        autoPlay 
                        resizeMode='contain'
                        loop />
                </View>            
            </View>
        );
    }
}
