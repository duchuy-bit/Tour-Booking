import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../assets/colors/color';

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const {height, width} = Dimensions.get('window');


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    UNSAFE_componentWillMount(){
        fetch('https://nodejs-duchuy-bit.herokuapp.com/dichvu')
        .then((res)=> res.json())
        .then((res)=> {
            console.log(res.dichvu)
        })
        .catch((err)=> console.log(err))
    }

render() {
return (
<View style={styles.container}>
    {/* Menu and Account */}
    <View style={styles.menuContainer}>
        <Text>Menu</Text>
        <Icon
            name="shopping-cart"
        />
        <Text>Acc</Text>
    </View>

    {/* Search And Cart */}
    <View style={styles.searchContainer}>
        <View style={styles.searchForm}>
            {/* <Text>Icon</Text> */}
            <Icon name='magnifying-glass'/>
            <TextInput
                placeholder='Search'
                placeholderTextColor={'grey'}
                style={styles.inputSearch}
            />
        </View>

        <Text>Cart</Text>
    </View>
</View>
);
}
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    menuContainer:{
        marginHorizontal: 20,
        marginTop: 40,
        backgroundColor: 'pink',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    searchContainer:{
        marginHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-between',
        // backgroundColor: 'pink',
        flexDirection: 'row'
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
    }
})
