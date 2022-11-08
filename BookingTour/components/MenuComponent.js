import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

render() {
return (
<View style={{ width: this.props.size,}}>
    <View style={{width: this.props.size*2/3, height: 1.5,borderRadius:50,backgroundColor: 'black'}}></View>
    <View style={{width: this.props.size, height: 1.5,borderRadius:50,backgroundColor: 'black',marginVertical:3.75}}></View>
    <View style={{width: this.props.size*2/3, height: 1.5,borderRadius:50,backgroundColor: 'black',alignSelf: 'flex-end'}}></View>
</View>
);
}
}
// const styles= StyleSheet.create({
//     line1:{
//         width: this.props.size,
//         height: 5,
//         borderRadius:25
//     },
//     lineMiddle:{
//         width: this.props.size/2,
//         height: 5,
//         borderRadius:25
//     }
// })
