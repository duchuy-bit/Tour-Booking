import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../assets/colors/color';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// import {SharedElement} from "react-navigation-shared-element";
import {
    SharedElement,
    SharedElementTransition,
    nodeFromRef
} from 'react-native-shared-element';


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



class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            imageFetch : '',
            isLoad: true,
            idRedux: '',
        };
    }

    UNSAFE_componentWillMount(){
        // this.setState({idRedux: this.props.idCustomer})
        const idCustomer = this.props.idCustomer;
        console.log('redux: '+ idCustomer)
        fetch(ipconfig + '/dichvu')
        .then((res)=> res.json())
        .then((res)=> {
            console.log('Fetch ---dichvu--- success');  
            this.setState({item: res.dichvu})
            // this.state.item.sort((a,b)=> a.xeploai > b.xeploai)
        })
        .catch((err)=> console.log(err))
        .finally(()=> this.setState({isLoad: false}))
    }

    addressChange(a){
        if (a.length>15) {
            s='';
            return s=a.slice(0,15)+'...';
        }
        return a;
    }

render() {
return (

<View style={styles.container}>
{
    this.state.isLoad? <ProgressCircleComponent/>: 
    <ScrollView>
    {/* Menu and Account */}
    <View style={styles.menuContainer}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('AccountScreen')}>
            <Icon name="account-circle" size={40} color='black'/>
        </TouchableOpacity>

        <TouchableOpacity>
            <CartComponent />
        </TouchableOpacity>
    </View>

    <Text style={styles.title}>VINPEARL</Text>
    <Text style={styles.test}>Booking your tour</Text>

    {/* Search And Cart */}
    <View style={styles.searchContainer}>
        <View style={styles.searchBorder}>
            <Icon name='search' size={30} style={styles.iconSearch}/>
            <TextInput placeholder='Search' placeholderTextColor={"grey"} style={styles.txtSearch} />
        </View>

    </View>
    {/* Categories */}
    {/* Resort  -  Gastronomy - Explore & activity - Golf */}
    <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <TouchableOpacity>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.menuItemContainer}>
                        <Octicon name='organization' size={30} style={styles.iconCategories}/>
                    </View>
                    <Text style={styles.textCategories}>Resort</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.menuItemContainer}>
                        <Ioni name='restaurant' size={30} style={styles.iconCategories}/>
                    </View>
                    <Text style={styles.textCategories}>Food</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
            // onPress={()=>this.props.navigation.navigate('DetaiScreen')}
            >
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.menuItemContainer}>
                        <Ioni name='ios-golf' size={30} style={styles.iconCategories}/>
                    </View>
                    <Text style={styles.textCategories}>Golf</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.menuItemContainer}>
                        <Foundation name='mountains' size={30} style={styles.iconCategories}/>
                    </View>
                    <Text style={styles.textCategories}>Explore</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    </View>

    {/* -----------POPULAR------------ */}
    <View style={styles.popularContainer}>
        <Text style={styles.titlePopular}>Popular</Text>
            {this.state.item.map((item)=>{
                return(
                <TouchableOpacity key={item.id}   onPress={()=>this.props.navigation.navigate('DetailScreen',{item})}>
                    <View style={styles.itemPopularContainer}>
                        <View style={{width: '45%',marginHorizontal:20}}>
                            <Text style={{marginTop:15,fontSize: 14, color: colors.textDrak,fontFamily:'Montserrat-SemiBold'}}>
                                {item.ten}
                            </Text>

                            <View style={{flexDirection:'row',alignItems:'center',marginTop:10,marginBottom:7}}>
                                <Foundation name='telephone' color={'black'} size={15}/>
                                <Text style={{marginLeft:5,fontSize: 14, color: 'black',fontFamily:'Montserrat-Regular'}}>
                                    {item.sdt}
                                </Text>
                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                                <MaterialCommunityIcons name='map-marker' color={'black'} size={15}/>
                                <Text style={{marginLeft:5,fontSize: 14, color: 'black',fontFamily:'Montserrat-Regular'}}>
                                    {this.addressChange(item.diachi)}
                                </Text>
                            </View>

                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <TouchableOpacity 
                                    style={styles.buttonAdd}
                                    onPress={()=>{}}
                                >
                                    <Text style={{fontSize: 16, color: colors.textDrak,fontFamily:'Montserrat-Bold'}}>+</Text>
                                </TouchableOpacity>

                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',left:-10}}>
                                    <Icon name='star' size={15} color={'black'}/>
                                    <Text style={{marginLeft:1,fontSize: 12, color: colors.textDrak,fontFamily:'Montserrat-SemiBold'}}>{item.xeploai}</Text>
                                </View>
                            </View>
                        </View>
                        {/* <SharedElement id={`item.${item.id}.anh`} style={{ width: "45%", height: '100%' ,borderRadius:25,left:-4}}> */}
                        <SharedElement  id={`item.${item.id}.anh`}
                            style={{ width: "45%", height: '100%' ,borderRadius:25}}>
                            <Image source={{uri: 'https://raw.githubusercontent.com/duchuy-bit/Group_PHP/main/images/'+item.anh,}}
                                style={{ flex: 1,borderRadius:25}}/>
                        </SharedElement>
                        {/* </SharedElement> */}
                    </View>
                </TouchableOpacity>
                )
            })
        }
    </View>
</ScrollView>
}
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

export default connect(mapStateToProp)(HomeScreen);
//-------------------------------------------------------------------------------

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    title:{
        marginTop: 20,
        marginHorizontal:20,
        fontSize:30,
        fontFamily: 'Montserrat-Bold',
        color: '#E4723C',
        // fontWeight: 'bold'
    },
    test:{
        marginTop: 5,
        marginHorizontal:20,
        fontSize:16,
        fontFamily: 'Montserrat-Regular',
        color: 'colors.textDrak',
        // fontWeight: 'bold'
    },
    menuContainer:{
        marginHorizontal: 20,
        marginTop: 60,
        // backgroundColor: 'pink',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    searchContainer:{
        marginHorizontal: 20,
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
        width:'80%'
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
    
    categoriesContainer:{
        marginTop: 30,
        marginHorizontal: 20,
    },
    categoriesTitle:{
        fontSize: 16,
        color: colors.textDrak,
        fontFamily:'Montserrat-Bold'
    },

    menuItemContainer:{
        backgroundColor: 'white',
        borderRadius:15,
        padding:20,
        marginTop:15,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 15
    },

    buttonAdd:{
        height:50,width:'50%', backgroundColor: '#F5CA48',
        left:-20,borderTopRightRadius:25,
        borderBottomLeftRadius:25,
        alignItems:'center',justifyContent:'center'
    },

    textCategories:{
        marginTop:10,
        fontSize: 14,
        color: colors.textDrak,
        fontFamily:'Montserrat-Bold'
    },
    iconCategories:{
        color: colors.textDrak
    },
    popularContainer:{
        marginHorizontal:20,
        marginTop:30,
        marginBottom:20
    },
    titlePopular:{
        fontSize: 16,
        color: colors.textDrak,
        fontFamily:'Montserrat-Bold',
        marginBottom:20
    },
    itemPopularContainer:{
        backgroundColor: 'white',
        borderRadius:25,
        flexDirection:'row',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 15,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10
    },
})
