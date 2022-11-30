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

const {height, width} = Dimensions.get('window');

class AccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCustomer:[],
            indexMenu: 1,
            isLoading: true
        };
    }
    UNSAFE_componentWillMount(){
        this.fetchAPI();
    }
    fetchAPI(){
        console.log('----------ACCOUNT-------------')
        const idCustomer = this.props.idCustomer[0];
        console.log('redux idcustomer: '+idCustomer)
        fetch(ipconfig+'/khachhang')
        .then((res)=> res.json())
        .then((res)=> {
            res.khachhang.forEach(element => {
                if(parseInt(element.id) === parseInt(idCustomer)){
                    this.setState({...this.state,listCustomer : [element]})
                    console.log(this.state.listCustomer)
                }
            });
        })
        .catch(err=>console.log(err))
        .finally(()=> this.setState({isLoading: false}))
    }

    async _storageDataLogin () {
        try {
            await AsyncStorage.setItem(
                'login:key',
                'not set'
            );
            console.log('Storage Success')
        } catch (error) {
          // Error saving data
        }
    };

    touchLogout(){
        Alert.alert(
            "Warning",      // title
            "Do you want to Log Out?",      //desciption
            [
                { text: "Cancle", onPress: () => console.log("Cancle Pressed") },
                { text: "OK", onPress: () => {
                    this._storageDataLogin()
                    //------REDUX-------
                    this.props.dispatch({
                        type: 'LOGINSUCCESS',
                        id: '',
                    })
                    
                    this.props.navigation.replace('LoginScreen')
                } }
            ]
        )
        
    }



render() {
return (
<View style={{flex: 1, backgroundColor: '#F2F3F4'}}>
{
    this.state.isLoading ? <ProgressCircleComponent/>:
<>
<ScrollView>
    <View style={styles.goBackAndNameScreenContainer}>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <View style={{height:40,width:40,borderRadius: 10, borderWidth: 2, borderColor: "#CDCDCD",alignItems: 'center',justifyContent:'center'}}>
                <Octicon name='chevron-left' size={25} color={"black"}/>
            </View>
        </TouchableOpacity>
        <Text style={styles.nameScreen}>Profile</Text>
        <Text></Text>

        <TouchableOpacity>
            <CartComponent/>
            {/* <View style={{marginRight:10}}>
                <Icon name = 'shopping-cart' size={30} color='black' style={{marginTop:8,left:0}}/>
                <View style={styles.backgroundNumberCart}>
                    <Text style={styles.numberCart}>2</Text>
                </View>
            </View> */}
        </TouchableOpacity>
    </View>

    <View style={styles.menuTypeProfile}>
        <TouchableOpacity style={[styles.itemMenuTypeProfile,{
            backgroundColor: this.state.indexMenu === 1? '#16202C': colors.background,}]}
        onPress={()=> {
            this.setState({indexMenu:1})
            this.fetchAPI()
            }}
        >
            <Text style={[styles.nameScreen,{
                color: this.state.indexMenu === 1? 'white': 'black',
            }]}>Your Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.itemMenuTypeProfile,{
            backgroundColor: this.state.indexMenu === 2? '#16202C': colors.background
        }]}
        onPress={()=>{
            this.setState({indexMenu: 2})
            this.fetchAPI()
        }}
        >
            <Text style={[styles.nameScreen,{
                color: this.state.indexMenu === 2? 'white': 'black',
            }]}>Edit Your Profile</Text>
        </TouchableOpacity>
    </View>


    <View style={{marginTop: 40}}>
    {
        this.state.indexMenu ===1 ? <ProfileMenu user={this.state.listCustomer}  /> 
        : <ProfileEdit user={this.state.listCustomer} redux={this.props.idCustomer[0]}/>
    }
    </View>

    {this.state.indexMenu=== 2?<></>:
    <View style={{marginHorizontal:30,marginTop:45,}}>
        <TouchableOpacity style={{flexDirection:'row',paddingVertical:10}}
            onPress={()=>{this.touchLogout()}}
        >
            <Icon name='logout' size={25} color={'black'}/>
            <Text style={styles.nameScreen}>  Log Out</Text>
            <View style={{flex: 1,marginRight: 25,justifyContent:'flex-end',alignItems:'flex-end'}}>
                <Octicon name='chevron-right' size={20} color={'grey'}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection:'row',paddingVertical:10,marginTop:7}}
            onPress={()=>this.props.navigation.navigate('ListBill')}
        >
            <Foundation name='dollar-bill' size={29} color={'black'}/>
            <Text style={styles.nameScreen}>  Your Bill</Text>
            <View style={{flex: 1,marginRight: 25,justifyContent:'flex-end',alignItems:'flex-end'}}>
                <Octicon name='chevron-right' size={20} color={'grey'}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Developer')}
            style={{flexDirection:'row',paddingVertical:10,marginTop:7}}
        >
            <Ioni name='code-slash' size={25} color={'black'}/>
            <Text style={styles.nameScreen}>   About Developer</Text>
            <View style={{flex: 1,marginRight: 25,justifyContent:'flex-end',alignItems:'flex-end'}}>
                <Octicon name='chevron-right' size={20} color={'grey'}/>
            </View>
        </TouchableOpacity>
    </View>}
</ScrollView>
<View style={{alignItems:'center',flexDirection:'row',justifyContent:'center',marginBottom:15}}>
    <MaterialCommunityIcons name='copyright' color={'grey'} size={20}/>
    <Text style={{fontSize:14, color:'grey'}}>  Application developed by Nguyen Duc Huy</Text>
</View>
</>
}


</View>
);
}
}

const styles= StyleSheet.create({
    goBackAndNameScreenContainer:{
        // width: width,
        marginHorizontal: 35,
        // backgroundColor:'pink',
        // height:50,
        marginTop: 45,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    nameScreen:{
        fontSize: 16,
        color: 'black',
        fontFamily:'Montserrat-Bold'
    },
    backgroundNumberCart:{
        alignSelf: 'flex-end',
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius:50,
        width:18,
        height:18,
        alignItems:'center',
        justifyContent: 'center',
        left:20
    },
    numberCart:{
        color: 'white',
        padding:2,
        fontSize: 10,
        fontWeight: 'bold',
        // position: 'absolute',
        
    },
    menuTypeProfile:{
        marginTop: 40,
        marginHorizontal:30,
        height:50,
        borderRadius:75,
        backgroundColor:colors.background,
        flexDirection:'row',
        alignItems: 'center',
        // justifyContent:'spa'
    },
    itemMenuTypeProfile:{
        width:'50%',
        // backgroundColor:'pink',
        height:"100%",
        borderRadius:75,
        alignItems:'center',justifyContent:'center'
    }

})

//----------------------------------REDUX----------------------------------------
function mapStateToProp(state){
    return {
        idCustomer: state.idCustomer
    }
}

export default connect(mapStateToProp)(AccountScreen);
//-------------------------------------------------------------------------------
