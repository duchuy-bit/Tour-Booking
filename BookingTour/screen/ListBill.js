import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity,Alert } from 'react-native';
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
import ipconfig from '../ipconfig';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

class ListBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBill:[],
            isLoad: true,
        };
    }

    priceChange(a){
        let text= a.toString();
        let tam="";

        let d=-1;
        for (i = text.length-1 ; i>=0 ;i--){
            d++;
            if (d%3 === 0 && d !== 0 ) tam= text[i] + "." + tam;
            else tam = text[i] + tam;
        }
        // console.log(tam)
        return tam;
    }


    async fetchListBill (){
        await fetch(ipconfig+ "/getallbill",
        {
            method :"POST",
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                id_khachhang: this.props.idCustomer[0],
            })
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            this.setState({listBill: res.cthd})
        }).catch((err)=> console.log('err'))
        .finally(()=>{this.setState({isLoad:false})})
    }

    UNSAFE_componentWillMount(){
        this.fetchListBill();
    }

    render() {
        return (
        <View style={{flex: 1, backgroundColor:colors.background}}>
            <View style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:30,marginTop:30,alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}
                style={{borderColor:'grey',borderWidth: 1, borderRadius:15,alignItems:'center',justifyContent:'center',height:40,width:40,marginRight:15}}>
                        <Octicon name='arrow-left' size={20} color={'black'}/>
                </TouchableOpacity>

                <Text style={styles.txtScreen}>Your Bills</Text>

                <View style={{width:40}}></View>
            </View>

            {
                this.state.listBill.map((item)=>{
                    let bill = item.id
                    return(
                        <TouchableOpacity 
                            // onPress={()=>this.props.navigation.navigate('BillScreen',{bill:bill})}
                            key={item.id} style={styles.listItemContainer}
                        >
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', marginHorizontal:20}}>
                                <Text style={styles.txtDetail}>Bill Code:    {item.id}</Text>
                                <Text  style={[styles.txtDetail,{color:colors.price}]}>{this.priceChange(item.tongtien)} VND</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:10,marginLeft: 20}}>
                                <Text style={styles.txtDetail}>Day of Payment:   </Text>
                                <Text style={styles.txtDetailV2}>{moment(item.ngaythanhtoan).utc().format('MMMM DD, yyyy')}</Text>
                            </View>
                            
                            <View style={{height:1,width: "70%",alignSelf:'center',backgroundColor:'grey',marginTop:20,marginBottom: 30}}></View>
                        </TouchableOpacity>
                    )
                })
            }


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
    },
    txtDetailV2:{
        fontSize: 16,
        color: 'black',
        fontFamily:'Montserrat-Regular',
    },
    listItemContainer:{
        marginHorizontal:20,
        marginTop:20,
    }
})


//----------------------------------REDUX----------------------------------------
function mapStateToProp(state){
    return {
        idCustomer: state.idCustomer
    }
}

export default connect(mapStateToProp)(ListBill);
//-------------------------------------------------------------------------------
