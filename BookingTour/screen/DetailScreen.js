import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, Image,Dimensions, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Lottie from 'lottie-react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    SharedElement,
    SharedElementTransition,
    nodeFromRef
} from 'react-native-shared-element';
// import {SharedElement} from "react-navigation-shared-element";
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

// import { connect } from "react-redux";


export default function DetailScreen ({route ,navigation}){
    const {item} = route.params;

    // const animation = useRef(null);
    // const [isLove,setIsLove] = useState(false);
    const [isLoadPrice, setIsLoadPrice]= useState(false);
    const [isActiveService, setIsActiveService] = useState(false);
    const [listPrice,setListPrice]= useState([]);
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
        let start=0;let end=0;
        for (let i=0; i< Math.floor(text.length/3) ;i++)
        {
            start = text.length - 3 - i*3; end = text.length - i*3;
            tam= "."+ text.substr(text.length - 3 - i*3, 3)+ tam;
            // console.log(tam);
        }
        // tam = '.'+tam;
        tam = text.substr(0, text.length - Math.floor(text.length/3)*3)+ tam;
        
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

    const updateCart = async (sl_Service)=>{
        fetch(ipconfig+'/updateslgiohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id_khachhang: idCustomer, id_gia: idPrice, sl: sl_Service+ 1,ngaythem: new Date()})
        })
        // .then((response)=> response.json())
        // .then((res)=>{
        //     console.log(res.giohang)

        //     res.giohang.forEach((element)=>{
        //         if(element.id_gia === idPrice && element.id_khachhang === idCustomer){

        //         }
        //     })
        // })
        .catch((err)=> console.log(err));
    }

    const checkService = async()=>{
        let check= false;
        await fetch(ipconfig+'/giohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id: idCustomer,})
        })
        .then((response)=> response.json())
        .then((res)=>{
            console.log(res.giohang)

            res.giohang.forEach((element)=>{
                if(element.id_gia === idPrice && element.id_khachhang === idCustomer){ 
                    console.log('--------Update service------------')   
                                    
                    updateCart(element.sl);
                    // setIsActiveService(true);
                    check= true;

                    return;
                }
            })
        })
        .catch((err)=> console.log(err))
        .finally(()=>{
            if (check=== false){
                console.log("---------insert new-----------");
                dispatch({ type: 'ChangeCart', amountCart: parseInt(notes.cartAmount) + 1, })
                insertCart();
            }
        })
        ;
    }

    const insertCart = async ()=>{
        await fetch(ipconfig+ "/insertgiohang",{
            method :"POST",
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                id_khachhang: idCustomer,
                id_gia: idPrice,
                sl: 1,
                ngaythem: new Date(),
            })
        })
    }

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
    },[])


    const dispatch = useDispatch()
    // const addItemToCart = item => dispatch({ type: 'ChangeCart', amountCart: notes.cartAmount + 1, })


    touchAddToCart = ()=>{
        console.log('touch ADD')
        // setIdCustomer(notes.idCustomer[0]);
        console.log("Redux touch:"+idCustomer),
        
        

        // this.props.dispatch({
        //     type: 'ChangeCart',
        //     amountCart: this.props.amountCart + 1,
        // })

        // insertCart();
        checkService();

        
    }

return(
<View style={{flex:1, backgroundColor: colors.background}}>

<ScrollView>
    <View>
        <SharedElement  id={`item.${item.id}.anh`}>
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
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <View>
                <Octicon name='arrow-left' size={30} color={'white'}/>
            </View>
        </TouchableOpacity>

        <Text style={{fontSize: 16,color: 'white',fontFamily:'Montserrat-Bold'}}>Product</Text>
        <TouchableOpacity>
            <CartComponent color={'white'}/>
        </TouchableOpacity>
    </View>
    {/* Add to Cart */}
    {/* <TouchableOpacity></TouchableOpacity> */}
    <View style={styles.addToCartContainer}>
        <TouchableOpacity onPress={()=>touchAddToCart()}>
            <View style={styles.buttonAddtoCart}>
                <Text style={styles.textAddtoCart}>Add to Cart</Text>
                <Octicon name='chevron-right' size={20} color={'black'}/>
            </View>
        </TouchableOpacity>
    </View>

</View>

)
}

// //----------------------------------REDUX----------------------------------------
// function mapStateToProp(state){
//     return {
//         idCustomer: state.idCustomer,
//         amountCart: state.cartAmount
//     }
// }

// export default connect(mapStateToProp)(DetailScreen);
// //-------------------------------------------------------------------------------

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
    }
})