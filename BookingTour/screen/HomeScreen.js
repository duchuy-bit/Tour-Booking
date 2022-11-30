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



class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            imageFetch : '',
            isLoad: true,
            idRedux: '',
            eventTurnOnSlider: 13,
            heightSlider: 0,
            scrollY: new Animated.Value(0),
            scrollTam: new Animated.Value(100),
            txtSearch:''
        };
    }

    UNSAFE_componentWillMount(){
        this.refreshCart()
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

    async refreshCart(){
        await fetch(ipconfig+'/giohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id: this.props.idCustomer[0],})
        })
        .then((response)=> response.json())
        .then((res)=>{
            console.log('Length Cart: '+res.giohang.length)

            this.props.dispatch({
                type: 'ChangeCart',
                amountCart: res.giohang.length,
            })
            console.log('------------------------------------------------')
        })
        .catch((err)=> console.log(err))
    }

    addressChange(a){
        if (a.length>15) {
            s='';
            return s=a.slice(0,15)+'...';
        }
        return a;
    }

    checkTopSlider(y){
        console.log(y);
        return 1;

    }

render() {
    // const handleScroll = (e) =>{
        // {listener: (event) => {
                    //     console.log('alo')
                    //     console.log(event.nativeEvent.contentOffset.y)
                    // }},
    //     if (!e) return;

    //     const { nativeEvent } = e;
    //     if (nativeEvent && nativeEvent.contentOffset){
    //         const currentOffset = nativeEvent.contentOffset.y
    //         // console.log("SCREEN HEIGHT: "+height+" CURRENT OFFSET : "+currentOffset)
    //         // console.log("-------------"+ this.state.eventTurnOnSlider)
    //         if (currentOffset > this.state.eventTurnOnSlider) {
    //             // if (currentOffset - this.state.eventTurnOnSlider <= 76){
                    
    //                 console.log(currentOffset - this.state.eventTurnOnSlider)
    //                 // this.setState({heightSlider: currentOffset - this.state.eventTurnOnSlider})
    //             // }
    //         }
    //         else {
    //             console.log('0')
    //         }
    //     }
    // }
    // let y=0;
return (

<View style={styles.container}>
{/* TOP SLIDER */}
    <Animated.View style={
        [styles.topSLider,
            {
                transform:[{
                    translateY: this.state.scrollY.interpolate({
                        inputRange:  [330,400],
                        outputRange: [-75 ,0],
                        extrapolate:'clamp'
                    })
                }]
            }
        ]
    }>
        <View style={{flex: 1,backgroundColor:colors.background,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <TouchableOpacity>
                <Octicon name='organization' size={30}color='black'/>
            </TouchableOpacity>

            <TouchableOpacity>
                <Ioni name='restaurant' size={30}color='black' />
            </TouchableOpacity>

            <TouchableOpacity>
                <Ioni name='ios-golf' size={30}color='black' />
            </TouchableOpacity>

            <TouchableOpacity>
                <Foundation name='mountains' size={30} color='black'/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('CartScreen')}>
                <Icon name = 'shopping-cart' size={30} color='black' />
            </TouchableOpacity>
        </View>

    </Animated.View>


{
    this.state.isLoad? <ProgressCircleComponent/>: 
    <View>
        <Animated.ScrollView 
            onScroll={
                    
                    Animated.event(
                        [{nativeEvent : {contentOffset:  {y: this.state.scrollY}}}],                
                        {
                            useNativeDriver: false,
                            listener: event => {
                                
                                // const offsetY = event.nativeEvent.contentOffset.y;
                                // if (offsetY > 100 ) {
                                //     // this.setState({scrollY: this.state.scrollY.setValue(100)})
                                //     // Animated.timing(this.state.scrollY,{
                                //     //     duration: 1,
                                //     //     toValue:100,
                                //     //     useNativeDriver:false
                                //     // })
                                //     // this.state.scrollY.setValue(100)
                                //     let tam = 0;
                                //     // this.state.scrollY.addListener((event))
                                //     console.log("TEST "+ this.state.scrollTam._value )
                                // }
                                // y = event.nativeEvent.contentOffset.y;
                                // console.log("+ "+ y > 100)
                                // console.log(" Y: "+offsetY)
                                // do something special
                            },
                        },
                    )
                
                }
            scrollEventThrottle={16}
        >
            {/* Menu and Account */}
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('AccountScreen')}>
                    <Icon name="account-circle" size={40} color='black'/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('CartScreen')}>
                    <CartComponent />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>VINPEARL</Text>
            <Text style={styles.test}>Booking your tour</Text>

            {/* Search And Cart */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBorder}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('SearchScreen',{textSearch: this.state.txtSearch})
                    }}>
                        <Icon name='search' size={30} style={styles.iconSearch}/>
                    </TouchableOpacity>
                    
                    <TextInput 
                        placeholder='Search' 
                        placeholderTextColor={"grey"} 
                        style={styles.txtSearch} 
                        returnKeyType="done"
                        onChangeText={(text) => this.setState({txtSearch: text})} 
                        onSubmitEditing={()=>{
                            this.props.navigation.navigate('SearchScreen',{textSearch: this.state.txtSearch})
                        }}

                        // blurOnSubmit={false}


                        // onChangeText={(event) => {
                        //     // if (event.key === 'Enter') {
                        //     //call submit function here
                        //         // alert("enter")
                        //         // Keyboard.dismiss()
                        //     // return
                        //     // } else {
                        //     //do something here
                        //     console.log(event )
                        //     // }
                            
                        // }}

                        // onKeyPress={ (event) => {
                        //     if(event.nativeEvent.key == "Enter"){
                        //         alert(event.nativeEvent.key) //called when multiline is true
                        //         // this.signIn();
                        //     } 
                        //     // else {
                        //     //     alert('Something else Pressed') 
                        //     // }
                        // }}
                    />
                </View>

            </View>
            {/* Categories */}
            {/* Resort  -  Gastronomy - Explore & activity - Golf */}
            <View style={styles.categoriesContainer}
                // onLayout={event => {
                //     const layout = event.nativeEvent.layout;
                //     console.log('height:', layout.height);
                //     console.log('width:', layout.width);
                //     console.log('x:', layout.x);
                //     console.log('y:', layout.y);
                //     this.setState({eventTurnOnSlider: this.state.eventTurnOnSlider + layout.y})
                    // console.log("-------------"+ this.state.eventTurnOnSlider)
                // }}

            >
                <Text style={styles.categoriesTitle}>Categories</Text>
                <View 
                    // onLayout={event => {
                    //     const layout = event.nativeEvent.layout;
                    //     console.log('height text:', layout.height);
                    //     console.log('width text:', layout.width);
                    //     console.log('x text:', layout.x);
                    //     console.log('y text:', layout.y);
                    //     this.setState({eventTurnOnSlider: this.state.eventTurnOnSlider + layout.y})
                    //     // console.log("-------------"+ this.state.eventTurnOnSlider)
                    // }}
                    style={{flexDirection: 'row',justifyContent: 'space-between'}}
                >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("ResortScreen")} >
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <View style={styles.menuItemContainer}>
                                <Octicon name='organization' size={30} style={styles.iconCategories}/>
                            </View>
                            <Text style={styles.textCategories}>Resort</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("FoodScreen")}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <View style={styles.menuItemContainer}>
                                <Ioni name='restaurant' size={30} style={styles.iconCategories}/>
                            </View>
                            <Text style={styles.textCategories}>Food</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("GolfScreen")} >
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <View style={styles.menuItemContainer}>
                                <Ioni name='ios-golf' size={30} style={styles.iconCategories}/>
                            </View>
                            <Text style={styles.textCategories}>Golf</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("ExploreScreen")}>
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
                        <TouchableOpacity key={item.id}   
                        onPress={()=>this.props.navigation.navigate('DetailScreen',{item})}
                        >
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
                                    <Image source={{uri: 'https://duchuy-mobile.000webhostapp.com/dashboard/image_dichvu/'+item.anh,}}
                                        style={{ flex: 1,borderRadius:25, resizeMode:'cover'}}/>
                                </SharedElement>
                                {/* </SharedElement> */}
                            </View>
                        </TouchableOpacity>
                        )
                    })
                }
            </View>
        </Animated.ScrollView>
    </View>
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
    topSLider:{
        position:'absolute',
        width:width,
        height:75,
        backgroundColor:'pink',
        zIndex:9999
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
