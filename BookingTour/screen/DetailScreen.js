import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, Image,Dimensions, StyleSheet, TouchableOpacity, ScrollView, Modal, Animated, Pressable} from 'react-native';
import Lottie from 'lottie-react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import {
//     SharedElement,
//     SharedElementTransition,
//     nodeFromRef
// } from 'react-native-shared-element';
import {SharedElement} from "react-navigation-shared-element";
// import FontAwe5 from "react-native-vector-icons/FontAwesome5";

// import MenuComponent from '../components/MenuComponent';
// import ipconfig from '../ipconfig';

// FontAwe5.loadFont();
Icon.loadFont();
Ioni.loadFont();
Octicon.loadFont();
Foundation.loadFont();
MaterialCommunityIcons.loadFont();

import colors from '../assets/colors/color';
import ipconfig from '../ipconfig';

const {height, width} = Dimensions.get('window');

import { useSelector, useDispatch } from 'react-redux'
import CartComponent from '../components/CartComponent';
// import BottomSlider from '../components/BottomSlider';

// import { connect } from "react-redux";

// import React, { Component } from 'react';
// import { View, Text } from 'react-native';

import {connect} from "react-redux";
import FormAddToCart from '../components/FormAddToCart';

export default function DetailScreen ({route ,navigation}){
    const {item} = route.params;

    const timeDurationSlider= 300;

    const [tam,setTam]= useState(100);

    // const animation = useRef(null);
    // const [isLove,setIsLove] = useState(false);
    const [isLoadPrice, setIsLoadPrice]= useState(false);
    const [isActiveService, setIsActiveService] = useState(false);
    const [listPrice,setListPrice]= useState([]);

    const [openBottomSlider, setOpenBottomSlider]= useState(false);
    const bottomSliderAnim = useRef(new Animated.Value(0)).current;
    // const [listCart,setListCart]= useState([]);

    const [price, setPrice] = useState(0);
    const [idPrice, setIdPrice] = useState(0);

    const [idCustomer,setIdCustomer] = useState(0);


    const notes = useSelector(state => state)

    // const touchLove = ()=>{
        
    //     // setIsLove(!isLove);
    //     // console.log(isLove)
    // }

    priceChange=(a)=>{
        let text= a.toString();
        let tam="";

        let d=-1;
        for (i = text.length-1 ; i>=0 ;i--){
            d++;
            if (d%3 === 0 && d !== 0 ) tam= text[i] + "." + tam;
            else tam = text[i] + tam;
        }
        return tam;
    }

    const fetchData = async () =>{
        await fetch(ipconfig+'/gia', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id: item.id,})
        })
        .then((response)=> response.json())
        .then((res)=>{
            setListPrice(res.gia);
            res.gia.forEach((element)=>{
                if (element.loaive == '1') {
                    setPrice(element.giatien)
                    setIdPrice(element.id)
                }
            })
        })
        .catch((err)=> console.log(err));
    };

    const refreshCart = async ()=>{
        await fetch(ipconfig+'/giohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id: notes.idCustomer[0],})
        })
        .then((response)=> response.json())
        .then((res)=>{
            console.log('Length Cart: '+res.giohang.length)

            dispatch({
                type: 'ChangeCart',
                amountCart: res.giohang.length,
            })
            console.log('------------------------------------------------')
        })
        .catch((err)=> console.log(err))
    }

    // const changeBottomSlider = ()=>{
    //     setOpenBottomSlider(!openBottomSlider);
    // }

    // const updateCart = async (sl_Service)=>{
    //     fetch(ipconfig+'/updateslgiohang', { method: 'POST',
    //         headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    //         body: JSON.stringify({ id_khachhang: idCustomer, id_gia: idPrice, sl: sl_Service+ 1,ngaythem: new Date()})
    //     })
    //     // .then((response)=> response.json())
    //     // .then((res)=>{
    //     //     console.log(res.giohang)

    //     //     res.giohang.forEach((element)=>{
    //     //         if(element.id_gia === idPrice && element.id_khachhang === idCustomer){

    //     //         }
    //     //     })
    //     // })
    //     .catch((err)=> console.log(err));
    // }

    // const checkService = async()=>{
    //     let check= false;
    //     await fetch(ipconfig+'/giohang', { method: 'POST',
    //         headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    //         body: JSON.stringify({ id: idCustomer,})
    //     })
    //     .then((response)=> response.json())
    //     .then((res)=>{
    //         console.log(res.giohang)

    //         res.giohang.forEach((element)=>{
    //             if(element.id_gia === idPrice && element.id_khachhang === idCustomer){ 
    //                 console.log('--------Update service------------')   
                                        
    //                 updateCart(element.sl);
    //                 // setIsActiveService(true);
    //                 check= true;

    //                 return;
    //             }
    //         })
    //     })
    //     .catch((err)=> console.log(err))
    //     .finally(()=>{
    //         if (check=== false){
    //             console.log("---------insert new-----------");
    //             dispatch({ type: 'ChangeCart', amountCart: parseInt(notes.cartAmount) + 1, })
    //             insertCart();
    //         }
    //     })
    //     ;
    // }

    // const insertCart = async ()=>{
    //     await fetch(ipconfig+ "/insertgiohang",{
    //         method :"POST",
    //         headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    //         body: JSON.stringify({ 
    //             id_khachhang: idCustomer,
    //             id_gia: idPrice,
    //             sl: 1,
    //             ngaythem: new Date(),
    //         })
    //     })
    // }

    const openSlider = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(bottomSliderAnim, {
            toValue: height/2-60,
            duration: timeDurationSlider,
            useNativeDriver: false
        }).start();
    };
    
    const closeSlider = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(bottomSliderAnim, {
            toValue: 0,
            duration: timeDurationSlider,
            useNativeDriver: false
        }).start();
    };

    useEffect(()=>{
        // console.log('effect')
        // if(isLove) animation.current.play(0,19); 
        // else animation.current.play(0,0);
        setIdCustomer(notes.idCustomer[0]);
        console.log('Cart : '+ notes.cartAmount)
        console.log("Redux:"+notes.idCustomer[0])   

        fetchData().finally((res)=>{
            setIsLoadPrice(true);
        });

        console.log("Bottom Slider: "+ notes.bottomSlider)


    },[])


    const dispatch = useDispatch()
    // const addItemToCart = item => dispatch({ type: 'ChangeCart', amountCart: notes.cartAmount + 1, })


    // touchAddToCart = ()=>{
    //     console.log('touch ADD')
    //     // setIdCustomer(notes.idCustomer[0]);
    //     console.log("Redux touch:"+idCustomer);


        
    //     // setOpenBottomSlider(true);
    //     // checkService();

        
    // }

return(
<View style={{flex:1, backgroundColor: colors.background}}>

    <Modal
    animationType="fade"
    style={{flex: 1,alignSelf: 'center',height:100,width:100}}
    transparent={true}
    visible={notes.bottomSlider}
    onRequestClose={() => {}}
>
    <Pressable onPress={()=>{
        closeSlider();
        setTimeout(() => {
            dispatch({ type: 'BOTTOM_SLIDER', })
            // setOpenBottomSlider(false)
        }, timeDurationSlider);
    }}
        style={{backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,height:height,alignItems:'center',justifyContent:'flex-end'}}
    >
        <Animated.View style={[styles.bottomSliderBackground,{height: bottomSliderAnim}]}>
            <Pressable style={styles.bottomSlider}>
                <FormAddToCart item={item} listPrice={listPrice}/>
            </Pressable>
        </Animated.View>
    </Pressable>
</Modal>

<ScrollView>
    <View>
        <SharedElement  id={`item.${item.id}.anh`} >
        <Image source={{uri: 'https://raw.githubusercontent.com/duchuy-bit/Group_PHP/main/images/'+item.anh,}}
            style={{width:"100%",height:height/3,resizeMode:'cover',borderBottomLeftRadius:40}}
        />
        </SharedElement>    

        {/* <View style={{width:width,justifyContent:'flex-end',alignItems:'flex-end'}}>
            <TouchableOpacity onPress={touchLove}>
                <View style={styles.heartContainer}>
                    <View style={{width: '100%',height:'100%'}}>
                        <Lottie source={require('../assets/lotties/heart.json')} 
                            // autoPlay 
                            resizeMode='contain'
                            ref={animation}
                            loop={false}
                        />
                    </View>  
                </View>
            </TouchableOpacity>
        </View> */}
    </View>

    <View style={{top:20,marginHorizontal:30,}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15}}>
            {   isLoadPrice ? <Text style={styles.price}>{priceChange(price)} vnd</Text>:
                <Text style={styles.price}>...</Text>
            }            
            <View style={{flexDirection:'row'}}>
                <Icon name='star' size={20} color={'#E4723C'}/>
                <Text style={{marginLeft:1,fontSize: 17, color: colors.textDrak,
                    fontFamily:'Montserrat-SemiBold'}}
                >{item.xeploai}</Text>
            </View>
        </View>
        <Text style={styles.titleItem}>{item.ten}</Text>

        <View style={{flexDirection:'row',alignItems:'center',marginTop:15,marginBottom:7}}>
            <Foundation name='telephone' color={'black'} size={15}/>
            <Text style={{marginLeft:7,fontSize: 16, color: 'black',fontFamily:'Montserrat-Regular'}}>
                {item.sdt}
            </Text>
        </View>

        <View style={{flexDirection:'row',alignItems:'flex-start',marginBottom:15}}>
            <MaterialCommunityIcons name='map-marker' color={'black'} size={15}/>
            <Text style={{marginLeft:7,fontSize: 16, color: 'black',fontFamily:'Montserrat-Regular'}}>
                {item.diachi}
            </Text>
        </View>
    </View>

    <View style={{marginHorizontal:20,marginTop:20,marginBottom:15}}>
        <Text style={styles.textDescription}>Description</Text>
        <Text style={styles.description}>{item.mota}</Text>
    </View>
    <View style={{height:50}}></View>

</ScrollView>

    {/* Go back and Title Screen */}
    <View style={{marginHorizontal:30,flexDirection:'row',width:width-60,position:'absolute',marginTop:30,justifyContent:'space-between'}}>
        <TouchableOpacity onPress={()=>{
            refreshCart();
            navigation.goBack()
        }}>
            <View>
                <Octicon name='arrow-left' size={30} color={'white'}/>
            </View>
        </TouchableOpacity>

        <Text style={{fontSize: 16,color: 'white',fontFamily:'Montserrat-Bold'}}>Product</Text>
        <Text></Text>
        {/* <TouchableOpacity onPress={()=>navigation.navigate('CartScreen')}>
            <CartComponent color={'white'}/>
        </TouchableOpacity> */}
    </View>
    {/* Add to Cart */}
    {/* <TouchableOpacity></TouchableOpacity> */}
    <View style={styles.addToCartContainer}>
        <TouchableOpacity onPress={()=>{
            dispatch({ type: 'BOTTOM_SLIDER', })
            // console.log("Detail: "+tam);
            // navigation.navigate('AddToCartScreen')
            // setOpenBottomSlider(true)
            openSlider();
        }}>
            <View style={styles.buttonAddtoCart}>
                <Text style={styles.textAddtoCart}>Add to Cart</Text>
                <Octicon name='chevron-right' size={20} color={'black'}/>
            </View>
        </TouchableOpacity>
    </View>

</View>

)
}

// export default connect(mapStateToProp)(DetailScreen);
//-------------------------------------------------------------------------------


// DetailScreen.sharedElements = (route, otherRoute, showing) => [
//     // const {item } = route.params;
//     // return [`item.${item.id}.anh`]
//     {id: 'item.${item.id}.anh',animation: 'fade'},
//     // {id: 'text', animation: 'fade'},
// ]
DetailScreen.sharedElements = (route, otherRoute, showing) => {
    const {item } = route.params;
    return [`item.${item.id}.anh`]
};

const styles=  StyleSheet.create({
    heartContainer:{
        backgroundColor:'white',
        width:50,
        height:50,
        borderRadius: 50,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'flex-end',
        right: + 40,
        top: -25,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 15
    },
    titleItem:{
        fontSize: 20,
        color: colors.textDrak,
        fontFamily:'Montserrat-Bold'
    },
    price:{
        fontSize: 20,
        color: colors.price,
        fontFamily:'Montserrat-Bold',
        marginBottom:10
    },
    textDescription:{
        fontSize: 18,
        color: colors.textDrak,
        fontFamily:'Montserrat-Bold',
        marginBottom:10
    },
    description:{
        fontSize: 16,
        color: colors.textDrak,
        fontFamily:'Montserrat-Regular',
        marginBottom:10
    },
    addToCartContainer:{
        position:'absolute',
        top: height-90,
        // left:-10,
        marginRight:5,
        alignItems:'center',
        justifyContent:'center',
        width:width,
        alignSelf:'center',
        // backgroundColor:'pink', 
    },
    buttonAddtoCart:{
        flexDirection:'row',
        height:55,
        width:width*2/3,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#F5CA48',
        borderRadius: 75,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 15,
    },
    textAddtoCart:{
        fontSize: 16,
        color: colors.textDrak,
        fontFamily:'Montserrat-Bold',
        marginRight:10
    },
    bottomSliderBackground:{
        backgroundColor: 'pink', justifyContent: 'center',
        opacity: 1, 
        alignItems: 'center',
        alignSelf: 'center', 
        height: 0,
        width: width,
        borderTopLeftRadius:50,
        borderTopRightRadius:50
    },
    bottomSlider:{
        backgroundColor: 'white', justifyContent: 'center',
        opacity: 1, 
        alignItems: 'center',
        alignSelf: 'center', 
        height: "100%",
        width: width,
        borderTopLeftRadius:50,
        borderTopRightRadius:50
    }
})



