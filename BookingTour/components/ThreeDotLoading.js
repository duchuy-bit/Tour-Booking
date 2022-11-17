import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';

import Octicon from "react-native-vector-icons/Octicons";
Octicon.loadFont();

const {height, width} = Dimensions.get('window');

import Lottie from 'lottie-react-native';

export default class ThreeDotLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            // marginTopAnim: new Animated.Value(height/2),
        };
    }
    UNSAFE_componentWillMount(){
        
    }

    render() {
        return (
        // <View style={{height:height,width:width,position:'absolute',backgroundColor:'rgba(0, 0, 0, 0.5)',justifyContent:'center',alignItems:'center'}}>
            <View style={[styles.loaddingContainer]}>
                <Lottie
                    style={{height: '100%', width: '100%'}} 
                    source={require('../assets/lotties/loadingBlue.json')} autoPlay loop
                />
            </View>
        // </View>
        );
    }
}

const styles = StyleSheet.create({
    loaddingContainer:{
        flexDirection:'row',
        width: width /2,
        height:width /2,
        backgroundColor:'white',
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius:25
    }
})
