import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView, Modal,Animated, Pressable } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

import { connect } from "react-redux";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/color';
import CartComponent from '../../components/CartComponent';
import ipconfig from '../../ipconfig';

import {SharedElement} from 'react-navigation-shared-element';
// import ipconfig from '../ipconfig';
// import LoadingComponent from '../components/LoadingComponent';
// import { ta } from 'date-fns/locale';
// import colors from '../assets/colors/color';

// import Swipeable from 'react-native-gesture-handler/Swipeable'
// import { PanGestureHandler } from 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated';
// import ThreeDotLoading from '../components/ThreeDotLoading';
// import SuccessLoading from '../components/SuccessLoading';

Icon.loadFont();
Ioni.loadFont();
Octicon.loadFont();
Foundation.loadFont();
MaterialCommunityIcons.loadFont();


const {height, width} = Dimensions.get('window');

export default class ResortScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listService: [],
        };
    }

    async fetchService(){
        await fetch(ipconfig+"/dichvu",{ method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({id_loai: 1})
        }).then((res=> res.json()))
        .then((res)=>{
            this.setState({listService: res.dichvu});
            // res.dichvu.forEach(element => {
            //     console.log(element)
            // });
        })
        .catch((err)=> console.log(err))
    }

    UNSAFE_componentWillMount(){
        this.fetchService()
    }

render() {
    return (
    <View style={{flex: 1, backgroundColor:colors.background}}>

        {/* Header */}
        <View style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:30,marginTop:30,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}
            style={{borderColor:'grey',borderWidth: 1, borderRadius:15,alignItems:'center',justifyContent:'center',height:40,width:40}}>
                <Octicon name='arrow-left' size={20} color={'black'}/>
            </TouchableOpacity>

            <Text style={styles.txtScreen}>Resort Services</Text>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('CartScreen')}>
                    <CartComponent />
            </TouchableOpacity>
        </View>

        {/* List Service */}

        <View style={{flex: 1,marginTop:20,marginBottom:20}}>
            <ScrollView>
                {
                    this.state.listService.map((item)=>{
                        return(
                            <TouchableOpacity key={item.id} style={styles.itemContainer}
                            onPress={()=>this.props.navigation.navigate("DetailScreen",{item})}
                            >
                                <SharedElement  id={`item.${item.id}.anh`}
                                    style={{ width: "100%", height: 220 ,borderRadius:25}}>
                                    <Image source={{uri: 'https://duchuy-mobile.000webhostapp.com/dashboard/image_dichvu/'+item.anh,}}
                                        style={{ flex: 1,borderRadius:25, resizeMode:'cover'}}/>
                                </SharedElement>

                                {/* Name Title Item */}
                                <Text style={styles.itemTitle}>{item.ten}</Text>

                                {/* Detail Item */}
                                <View style={{marginHorizontal:20,marginRight:30}}>
                                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:10,justifyContent:'space-between'}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Foundation name='telephone' color={'black'} size={15}/>
                                            <Text style={{marginLeft:5,fontSize: 14, color: 'black',fontFamily:'Montserrat-Regular'}}>
                                                {item.sdt}
                                            </Text>
                                        </View>

                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginRight:40}}>
                                            <Text style={{marginLeft:1,fontSize: 12, color: colors.textDrak,fontFamily:'Montserrat-SemiBold'}}>{item.xeploai}</Text>
                                            <Icon name='star' size={15} color={'black'}/>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:20}}>
                                        <MaterialCommunityIcons name='map-marker' color={'black'} size={15}/>
                                        <View style={{width:7}}></View>
                                        <Text style={{marginLeft:7,fontSize: 14, color: 'black',fontFamily:'Montserrat-Regular'}}>
                                            {item.diachi}
                                        </Text>
                                    </View>
                                </View>
                                
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
            
    </View>
    );
}}
const styles=StyleSheet.create({
    txtScreen:{
        fontSize:20,
        fontFamily: 'Montserrat-Bold',
        color: 'black',
    },
    itemContainer:{
        marginHorizontal:20,
        marginTop:5,
        marginBottom:20,
        backgroundColor:"white",
        borderRadius:30,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10
    },
    itemTitle:{
        marginTop:15,
        marginLeft: 20,
        marginBottom:10,
        fontSize:15,
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
    }
})
