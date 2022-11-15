import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { connect } from "react-redux";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ipconfig from '../ipconfig';
import LoadingComponent from '../components/LoadingComponent';
// import { ta } from 'date-fns/locale';
import colors from '../assets/colors/color';

import Swipeable from 'react-native-gesture-handler/Swipeable'
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

Icon.loadFont();
Ioni.loadFont();
Octicon.loadFont();
Foundation.loadFont();
MaterialCommunityIcons.loadFont();


const {height, width} = Dimensions.get('window');

class CartScreenV2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCart:[],
            isLoad: true,
            listCartSort:[],
            swipeableAnim: new Animated.Value(0)
        };
    }

    async fetchCart(){
        let check=false;
        // let sl=0;
        await fetch(ipconfig+'/giohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id: this.props.idCustomer[0],})
        })
        .then((response)=> response.json())
        .then((res)=>{
            // this.setState({listCart: res.giohang})
            // console.log(this.state.listCart);
            
            let listCartItem=[];

            //Get id service
            res.giohang.forEach(element => {
                listCartItem.push(element.id)
            });

            //Loc Array
            tam= new Set(listCartItem)
            listCartItem=[...tam]

            let listTam=[];
            // let obj={}
            listCartItem.forEach((element)=>{
                let arrPrice = []
                let objItem={}
                res.giohang.forEach((item)=>{
                    if (element === item.id){
                        arrPrice.push({id_gia: item.id_gia, giatien: item.giatien, sl: item.sl})
                        objItem={id: element,ten: item.ten, anh: item.anh}
                    }
                })
                // listTam.push({id: objItem.id,ten: objItem.ten, anh: objItem.anh,listPrice:[...arrPrice]})

                this.setState({
                    listCartSort: [...this.state.listCartSort, 
                        {id: objItem.id,ten: objItem.ten, anh: objItem.anh,listPrice:[...arrPrice]}
                    ]
                })
            })

            this.state.listCartSort.forEach((element)=>{
                console.log(element.id)
                console.log(element.ten)
                console.log(element.listPrice)
            })
            // console.log("List dichvu: "+listTam)
            

        }).catch((err)=> console.log(err))
        .finally(()=>{
            this.setState({isLoad: false})
            this.state.listCart.sort((a, b) => a.id_gia - b.id_gia);  
        })
    }

    touchDelete(item){
        let tam = this.state.listCartSort;
        console.log("  - item can xoa: "+item.id+" "+ item.ten)
        console.log('-------------------------')
        console.log("          - id_gia can xoa: " + item.listPrice[0].id_gia )

        if (item.listPrice.length===2){
            console.log("          - id_gia thu 2: " + item.listPrice[1].id_gia)
            // ---REDUX--------
            this.props.dispatch({
                type: 'ChangeCart',
                amountCart: this.props.amountCart-2,
            })
            //-----------Delete databse ----------
            this.fetchDelete(item.listPrice[0].id_gia)
            this.fetchDelete(item.listPrice[1].id_gia)
        }else{
            // ---REDUX--------
            this.props.dispatch({
                type: 'ChangeCart',
                amountCart: this.props.amountCart-2,
            })
            //-----------Delete databse ----------
            this.fetchDelete(item.listPrice[0].id_gia)
        }

        tam = tam.filter(function(el) { return el.id != item.id }); 
        this.setState({listCartSort:[...tam]})
    }


    async fetchDelete(id_gia){
        //------REDUX-------
        // this.props.dispatch({
        //     type: 'ChangeCart',
        //     amountCart: this.props.amountCart-1,
        // })

        await fetch(ipconfig+'/deletegiohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id_gia: id_gia,})
        }).catch((err)=> console.log('err'))
        
    }

    UNSAFE_componentWillMount(){
        console.log("--------CART SCREEN-------------------")
        this.fetchCart()
    }

    // swipeableToDelete (progress, dragX ){
    //     // Animated.timing(this.state.swipeableAnim,
    //     //     {
    //     //         duration: 3000,
    //     //         toValue: 100,
    //     //         useNativeDriver:false
    //     //     }
    //     // ).start()
    //     return <Animated.View style={{backgroundColor:'red'}}>
    //         <Text>Delete</Text>
    //     </Animated.View>
    // }


    // RightActions  (progress, dragX) { 
    //     return (
    //     <TouchableOpacity onPress={()=>{DeleteContact(i)}}>
    //       <View style={[ContactsStyles.rightAction]}>
    //         <Text style={ContactsStyles.actionText}>Delete</Text>
    //       </View>
    //     </TouchableOpacity>
    //     ) 
    //     }

render() {
    //------------------------------SWIPEABLE---------------------
    const RightActions = ({dragX, onPress,item}) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity  onPress={()=>this.touchDelete(item)}>
                <View style={styles.rightActionStyle}>
                    <Animated.Text style={{color:'white', fontFamily:'Montserrat-Bold',fontSize:18,paddingHorizontal:20}} >
                        Delete
                    </Animated.Text>
                </View>
            </TouchableOpacity>
        );
    };
//-------------------------------------------------------------------------
return (
<View style={{flex: 1, backgroundColor:'#003D60'}}>
{/* Header */}
    <View style={styles.header}>
            <View style={styles.gobackContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <Octicon name='arrow-left' size={28} color={'#FEFA36'}/>
                </TouchableOpacity>                
                <Text style={styles.nameScreen}>Cart</Text>
            </View>
            
            <View style={styles.amountItemContainer}>
                <Text style={styles.textAmountItem}>Items: {this.props.amountCart}</Text>
            </View>
    </View>

{/* List Item */}
<ScrollView>
        {
            this.state.listCartSort.map((item)=>{
                return(
                    <Swipeable key={item.id}
                        overshootRight={false}
                        renderRightActions={(progress, dragX) => (
                            <RightActions progress={progress} dragX={dragX} item={item}
                                // onPress={() => {
                                //     // styles.rightActionStyle.display ='none';
                                //     // // onRightPress(index);
                                //     // styles.rightActionStyle.display ='flex';
                                // }}

                            />
                        )}
                    >
                        <View  style={styles.itemContainer}>
                            {/* <View style={{width:140, height: 120}}>
                                <Image source={{uri: 'https://raw.githubusercontent.com/duchuy-bit/Group_PHP/main/images/'+item.anh,}}
                                    style={{ flex: 1,borderRadius:25, resizeMode:'cover'}}/>
                            </View> */}
                            <View style={{flexDirection: 'row', alignItems:'center',}}>
                                <MaterialCommunityIcons name='store' size={30} color={'#003D60'}/>
                                <Text style={styles.itemName}>{item.ten}</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:15}}>
                                <View style={{width:120, height: 100}}>
                                    <Image source={{uri: 'https://raw.githubusercontent.com/duchuy-bit/Group_PHP/main/images/'+item.anh,}}
                                        style={{ flex: 1,borderRadius:25, resizeMode:'cover'}}/>
                                </View>
                                <View style={{flex:1,marginLeft:5, justifyContent:'center'}}>
                                {/* Adult Amount and price */}
                                    <View>
                                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                            <Text style={styles.itemTypePrice}>Adult:</Text>
                                            <Text style={styles.itemPrice}>2.000.000 VND</Text>
                                        </View>
                                        <View style={[styles.amountContainer,{marginBottom:7}]}>
                                            <TouchableOpacity style={{marginHorizontal:9}}>
                                                <Octicon name='dash' size={17} color={'black'}/>
                                            </TouchableOpacity>
                                            <View>
                                                <Text style={[styles.txtAmount,{marginHorizontal:10}]}
                                                >{item.listPrice[0].sl}</Text>
                                            </View>
                                            <TouchableOpacity  style={{marginHorizontal:9}}>
                                                <Octicon name='plus' size={17} color={'black'}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* Child Amount and Price */}
                                    { item.listPrice.length === 2 ?
                                        <View>
                                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                            <Text style={styles.itemTypePrice}>Child:</Text>
                                            <Text style={styles.itemPrice}>1.500.000 VND</Text>
                                        </View>

                                        <View style={styles.amountContainer}>
                                            <TouchableOpacity style={{marginHorizontal:9}}>
                                                <Octicon name='dash' size={17} color={'black'}/>
                                            </TouchableOpacity>
                                            <View>
                                                <Text style={[styles.txtAmount,{marginHorizontal:10}]}
                                                >1</Text>
                                            </View>
                                            <TouchableOpacity  style={{marginHorizontal:9}}>
                                                <Octicon name='plus' size={17} color={'black'}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>:<></>}

                                    
                                </View>                            
                            </View>

                            <View style={styles.itemTotal}>
                                <Text style={styles.txtTotal}>Total: 3.500.000 VND</Text>
                            </View>
                        </View>
                    </Swipeable>
                )
            })
        }
        <View style={{height:100}}></View>
</ScrollView>

    <View style={styles.buttonPay}>
        <View>
            <Text style={{fontSize:16,fontFamily:'Montserrat-Regular'}}>SubTotal: </Text>
            <Text style={{color:'black',fontSize:18,fontFamily:'Montserrat-SemiBold'}}>10.000.000 VND</Text>
        </View>
        <TouchableOpacity style={{backgroundColor:"#003D60",borderRadius:50,width:140,height:50,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:20,fontFamily:'Montserrat-Bold'}}>Pay</Text>
        </TouchableOpacity>
    </View>
    

</View>
);
}
}

const styles= StyleSheet.create({
    rightActionStyle: {
        backgroundColor: '#d41359',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
        marginVertical:30,
        borderRadius:25,
        marginRight:10
    },

    header:{
        marginTop:45,
        // marginBottom:30,
        marginHorizontal:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    gobackContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    nameScreen:{
        marginLeft:30,
        fontSize:22,
        fontFamily: 'Montserrat-Bold',
        color: '#FEFA36',
    },
    amountItemContainer:{
        backgroundColor:"#206C8B",
        padding:5,
        paddingHorizontal:15,
        borderRadius:50
    },
    textAmountItem:{
        fontSize:17,
        fontFamily: 'Montserrat-SemiBold',
        color: '#ffffff',
    },
    itemContainer:{
        backgroundColor:'#ffffff',
        borderRadius:25,
        width:width-40,
        alignSelf:'center',
        marginTop:15,
        paddingHorizontal:20,paddingTop:20
        // padding:20,
        // paddingHorizontal: 35,
        // flexDirection:'row',
    },
    itemName:{
        marginLeft:15,
        marginRight:20,
        fontSize:16,
        fontFamily: 'Montserrat-Regular',
        color: '#003D60',
    },
    itemTypePrice:{
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#003D60',
    },
    itemPrice:{
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        color: colors.price,
    },
    amountContainer:{
        width:100,flexDirection:'row',
        // backgroundColor:'green',
        // alignSelf:'center',
        marginLeft: 20,
        borderWidth:1,
        borderColor:'grey',
        borderRadius:25,
        // marginBottom:7
    },
    itemTotal:{
        backgroundColor:'#FEFA36',
        height:40,
        paddingHorizontal: 20,
        // width:200,
        // top: 20,
        left:20,
        borderTopLeftRadius:25,
        borderBottomRightRadius:25,
        alignSelf:'flex-end',
        alignItems:'center',
        justifyContent:'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 25
    },
    txtTotal:{
        fontSize:15,
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
    },
    buttonPay:{
        width:width, height:100, 
        top: height-120,
        backgroundColor:colors.background, 
        position:'absolute',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    }
})

//----------------------------------REDUX----------------------------------------
function mapStateToProp(state){
    return {
        idCustomer: state.idCustomer,
        bottomSlider: state.bottomSlider,
        amountCart: state.cartAmount
    }
}

export default connect(mapStateToProp)(CartScreenV2);
//-------------------------------------------------------------------------------