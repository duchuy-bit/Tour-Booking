import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        fetch("https://nodejs-duchuy-bit.herokuapp.com/khachhang")
        .then((response) => response.json())
        .then((res)=>{
            console.log(res);
        }).catch((err)=> console.log(err));
    }

    render() {
        return (
        <View>
            <Text> LoginScreen </Text>
        </View>
        );
    }
}
