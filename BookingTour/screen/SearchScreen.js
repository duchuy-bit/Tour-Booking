import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,Image, ScrollView, Animated } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../assets/colors/color';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SharedElement} from 'react-navigation-shared-element';
// import {SharedElement} from "react-navigation-shared-element";
// import {
//     SharedElement,
//     SharedElementTransition,
//     nodeFromRef
// } from 'react-native-shared-element';


// import FontAwe5 from "react-native-vector-icons/FontAwesome5";

import MenuComponent from '../components/MenuComponent';
import CartComponent from '../components/CartComponent';
import ipconfig from '../ipconfig';

// FontAwe5.loadFont();
Icon.loadFont();
Ioni.loadFont();
Octicon.loadFont();
Foundation.loadFont();
MaterialCommunityIcons.loadFont();

const {height, width} = Dimensions.get('window');


import { connect } from "react-redux";
import ProgressCircleComponent from '../components/ProgressCircleComponent';

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listService: [],
            txtSearch:'',
            checkFocusTextInput:false
        };
    }

    // async fetchService(){
    //     await fetch(ipconfig+"/dichvu",{ method: 'POST',
    //         headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    //         body: JSON.stringify({id_loai: 1})
    //     }).then((res=> res.json()))
    //     .then((res)=>{
    //         this.setState({listService: res.dichvu});
    //         // res.dichvu.forEach(element => {
    //         //     console.log(element)
    //         // });
    //     })
    //     .catch((err)=> console.log(err))
    // }
    async fetchSearchService(key){        
        await fetch(ipconfig+"/searchdichvu",{ method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({keySearch: key})
        }).then((res=> res.json()))
        .then((res)=>{
            console.log(res);
            this.setState({listService: res.dichvu});
        })
        .catch((err)=> console.log(err))
    }

    // async fetchSearch(){
    //     await 
    // }

    UNSAFE_componentWillMount(){
        const {textSearch}= this.props.route.params;
        this.fetchSearchService(textSearch);
        // const {textSearch}= this.props.route.params;
        // this.setState=({txtSearch: textSearch})
        // console.log("find: "+textSearch)
        // this.fetchService()
    }

render() {
    return (
    <View style={{flex: 1, backgroundColor:colors.background}}>

        {/* Header */}
        <View style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:30,marginTop:30,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}
            style={{borderColor:'grey',borderWidth: 1, borderRadius:15,alignItems:'center',justifyContent:'center',height:40,width:40,marginRight:15}}>
                <Octicon name='arrow-left' size={20} color={'black'}/>
            </TouchableOpacity>

            <View style={[styles.searchContainer,{top: -10}]}>
                <View style={styles.searchBorder}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('SearchScreen',{textSearch: this.state.txtSearch})
                    }}>
                        <Icon name='search' size={30} style={styles.iconSearch}/>
                    </TouchableOpacity>
                    <TextInput 
                        // placeholder = {this.props.route.params.textSearch} 
                        placeholderTextColor={"grey"} 
                        style={styles.txtSearch} 
                        returnKeyType="done"
                        value={this.state.txtSearch =="" && this.state.checkFocusTextInput ==false ? this.props.route.params.textSearch: this.state.txtSearch}
                        onChangeText={(text) => this.setState({txtSearch: text, checkFocusTextInput: true})} 
                        onSubmitEditing={()=>{
                            this.fetchSearchService(this.state.txtSearch)
                        }}
                    />
                </View>
            </View>

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
    },
    searchContainer:{
        // marginHorizontal: 3,
        // width: ",
        flex:1,
        marginTop: 30,
        // backgroundColor: 'pink',
        justifyContent: 'space-between',
        // backgroundColor: 'pink',
        flexDirection: 'row'
    },
    // searchContainer
    iconSearch:{
        marginLeft:15
    },
    txtSearch:{
        width:'80%',
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        color: 'grey',
    },
    searchBorder:{
        width: '90%',
        height:50,
        backgroundColor: 'white',
        borderRadius: 50,
        flexDirection:'row',
        alignItems:'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 15
    },
    inputSearch :{
        width: width*3/5,
        height: 40
    },
    searchForm: {
        flexDirection: 'row',
        backgroundColor: colors.item,
        borderRadius: 15,
        // borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5
    },
})
