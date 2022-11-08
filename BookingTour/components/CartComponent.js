import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from "react-redux";

Icon.loadFont();
Ioni.loadFont();
Octicon.loadFont();
Foundation.loadFont();
MaterialCommunityIcons.loadFont();

class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        return (
            // <TouchableOpacity>
            <View style={{marginRight:10}}>
                <Icon name = 'shopping-cart' size={30} color='black' style={{marginTop:8,left:0}}/>
                <View style={styles.backgroundNumberCart}>
                    <Text style={styles.numberCart}>{this.props.amountCart}</Text>
                </View>
            </View>
        // </TouchableOpacity>
        );
    }
}

//----------------------------------REDUX----------------------------------------
function mapStateToProp(state){
    return {
        idCustomer: state.idCustomer,
        amountCart: state.cartAmount
    }
}

export default connect(mapStateToProp)(CartComponent);
//-------------------------------------------------------------------------------

const styles = StyleSheet.create({
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
})