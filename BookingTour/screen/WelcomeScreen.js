import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native';

import  AsyncStorage  from '@react-native-async-storage/async-storage';


const {height, width} = Dimensions.get('window');
import { connect } from "react-redux";
// 
class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkLogined: false
        };
    }

    UNSAFE_componentWillMount(){
        this._retrieveData();

        setTimeout(() => {
            console.log('---- WelCome ----');
            //--------------------------------
            if( this.state.checkLogined === true ) this.props.navigation.replace('HomeScreen');
            else this.props.navigation.replace('LoginScreen');
        }, 4000);
    }

    fetchCart (idCustomer){
        console.log('-------------------- FETCH CART ----------------')
        let lengthCart = 0;
        fetch(ipconfig+'/giohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id: idCustomer,})
        })
        .then((response)=> response.json())
        .then((res)=>{
            // this.setState({lengthListCart: res.giohang.length})
            console.log(res)
            lengthCart  = res.giohang.length;
            console.log('Length Cart: '+res.giohang.length)
            console.log('------------------------------------------------')
        })
        .finally(()=>{
            this.props.dispatch({
                    type: 'ChangeCart',
                    amountCart: lengthCart,
                })
        })
        .catch((err)=> console.log(err))
    }

    async _retrieveData(){
        // console.log('load async storage')
        try {
            const value = await AsyncStorage.getItem('login:key');
            console.log("key login id: "+value);
            if (value !== null) {
                if (value !== "not set") {
                console.log('-----LOGINED IN THE LAST USE ------')
                this.setState({checkLogined: true})
                //------REDUX-------
                this.props.dispatch({
                    type: 'LOGINSUCCESS',
                    id: parseInt(value),
                })
                this.fetchCart(value);
                
                }
                console.log("key login id: "+value);
            }else console.log('------FIRST LOGIN-------')
        } catch (error) {
          // Error retrieving data
            console.log("err")
        }
    };

    render() {
        return (
        <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
            <View style={{marginHorizontal: 0,marginTop:30 ,width: width,height:height -150}}>
                <Lottie source={require('../assets/lotties/welcomeScreen.json')} 
                    autoPlay 
                    resizeMode='contain'
                    loop />
            </View>            
        </View>
        );
    }
}

//----------------------------------REDUX----------------------------------------
function mapStateToProp(state){
    return {
        idCustomer: state.idCustomer
    }
}

export default connect(mapStateToProp)(WelcomeScreen);
//-------------------------------------------------------------------------------
