import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity,Alert, Image } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();
Ioni.loadFont();
Octicon.loadFont();
Foundation.loadFont();
MaterialCommunityIcons.loadFont();

import colors from '../assets/colors/color';

import { connect } from "react-redux";
import MenuComponent from '../components/MenuComponent';
import ProfileMenu from '../components/ProfileMenu';
import ProfileEdit from '../components/ProfileEdit';
import ProgressCircleComponent from '../components/ProgressCircleComponent';
import CartComponent from '../components/CartComponent';

const {height, width} = Dimensions.get('window');

export default class Developer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
        <View style={{flex: 1, backgroundColor:colors.background}}>
            <View style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:30,marginTop:30,alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}
                style={{borderColor:'grey',borderWidth: 1, borderRadius:15,alignItems:'center',justifyContent:'center',height:40,width:40,marginRight:15}}>
                        <Octicon name='arrow-left' size={20} color={'black'}/>
                </TouchableOpacity>

                <Text style={styles.txtScreen}>Developer</Text>

                <View style={{width:40}}></View>
            </View>
            
            <View>

            <View style={{marginTop: 50}}>
                <Image source={{uri: 'https://raw.githubusercontent.com/duchuy-bit/Group_PHP/main/images/meme.jpg',}}
                style={styles.avatar}/>
            </View>

            <View style={{marginTop: 50,justifyContent: 'flex-start'}}>
                <Text style={[styles.txtScreen,{marginHorizontal:50,marginBottom:10}]}>Nguyễn Đức Huy</Text>
                <Text style={styles.txtDetail}> - Mobile Developer</Text>
                <Text style={styles.txtDetail}>   16 - 01 - 2001</Text>
                <Text style={styles.txtDetail}> - Quysunho123@gmail.com</Text>
                <Text style={styles.txtDetail}> - Using fluently frameworks like flutter and react native to build mobile apps and mobile games. there is also a website developed on PHP and ReactJS platforms.</Text>
            </View>
            </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    txtScreen:{
        fontSize: 18,
        color: 'black',
        fontFamily:'Montserrat-Bold'
    },
    avatar:{
        width:100,height:100,
        resizeMode:'cover',
        borderRadius: 75,
        alignSelf:'center',
        
    },
    txtDetail:{
        fontSize: 16,
        color: 'black',
        fontFamily:'Montserrat-SemiBold',
        marginHorizontal:35, marginTop:10
    },
})
