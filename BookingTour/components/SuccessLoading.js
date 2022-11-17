import React, { Component } from 'react';
import { View, Text ,StyleSheet, Dimensions, Animated, Easing} from 'react-native';

const {height, width} = Dimensions.get('window');


import Octicon from "react-native-vector-icons/Octicons";
Octicon.loadFont();

import Lottie from 'lottie-react-native';

export default class SuccessLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successAnim: new Animated.Value(0),
        };
    }
    UNSAFE_componentWillMount(){
        Animated.sequence([
            Animated.timing(this.state.successAnim,{
                toValue:1.3,
                duration:500,
                useNativeDriver:false,
                easing: Easing.bezier(0.12, 0, 0.39, 0), 
            }),
            Animated.spring(this.state.successAnim,{
                toValue:1,
                duration:2000,
                useNativeDriver:false
            }),
        ]).start()
    }

    render() {
        return (
        <View style={[styles.loaddingContainer]}>
            <Animated.View style={[styles.successContainer,
            // {
            //     width:this.state.successAnim,
            //     height:this.state.successAnim
            // }
            {
                transform:[{
                    scale: this.state.successAnim
                }]
            }
            ]}>
                <Octicon name='check' size={70} color={'#26893D'}/>
            </Animated.View>
        </View>
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
    },
    successContainer:{
        height:width/3 - 10,
        width:width/3 - 10,
        borderRadius: 70,
        borderWidth: 4,
        borderColor:'#26893D',
        alignItems:'center',
        justifyContent:'center'
    }
})
