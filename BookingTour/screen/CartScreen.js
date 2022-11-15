import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCart:[],
            isLoad: true,
            listCartSort:[],
            swipeableAnim: new Animated.Value(0),
            slAdult:1,
            slChild: 1,
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

    async fetchUpdateAmountCart(isCus, idPrice, sl, date){
        await fetch(ipconfig+'/updateslgiohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                id_khachhang: isCus,
                id_gia: idPrice, 
                sl:sl,
                ngaythem: date
            })
        })
    }

    totalPrice(){
        let tam = 0;
        this.state.listCartSort.forEach((element)=>{
            element.listPrice.forEach((item)=>{
                tam = tam + item.sl * item.giatien;
            })
        })
        return tam;
    }

    touchButtonAmount(id , id_gia, typeButton){
        let tam = this.state.listCartSort;

        console.log('-------Touch Add Amount ------')
        tam = tam.map((el)=> {             
            if (el.id === id){
                // console.log("tam map: "+el.ten)

                el.listPrice.map((element)=>{
                    if (element.id_gia === id_gia){
                        if (typeButton ) element.sl++;
                            else element.sl--;
                        // console.log('check ok: '+ el.ten+" "+ id_gia+" "+element.giatien+" "+element.sl)
                        // console.log("IdCus: "+this.props.idCustomer[0])
                        this.fetchUpdateAmountCart(this.props.idCustomer[0],id_gia,element.sl,new Date())
                        return element;
                    }
                    return element;                    
                })
                return el;
            }
            return el;
        })
        this.setState({listCartSort:[...tam]})

        // console.log('Tam : ')
        // for (i=0;i<tam.length;i++)
        // {
        //     console.log(tam[i])
        // }
        // console.log('----------------')
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
            <TouchableOpacity  onPress={()=>this.touchDelete(item)} style={{justifyContent:'center',alignItems:'center'}}>
                <View style={styles.rightActionStyle}>
                    <Octicon name="trash" size={20} color={'white'} style={{paddingHorizontal:20}} />
                </View>
            </TouchableOpacity>
        );
    };
//-------------------------------------------------------------------------
return (
<LinearGradient colors={['#729090', '#275052']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{flex: 1,backgroundColor:'#275052'}}>
    {/* *** Header *** */}
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}
        style={{borderColor:'grey',borderWidth: 1, borderRadius:15,alignItems:'center',justifyContent:'center',height:40,width:40}}>
            <Octicon name='arrow-left' size={20} color={'black'}/>
        </TouchableOpacity>

        <Text style={styles.txtScreen}>Cart</Text>

        <View style={styles.amountItemContainer}>
                <Text style={styles.textAmountItem}>Items: {this.props.amountCart}</Text>
        </View>
    </View>
    {/* *** List Item *** */}
    <ScrollView style={{flex: 1,backgroundColor:'white'}}>
        {
            this.state.listCartSort.map((item)=>{
                return (
                    <Swipeable
                        key={item.id}
                        overshootRight={false}
                        renderRightActions={(progress, dragX) => (<RightActions progress={progress} dragX={dragX} item={item}/>)}
                    >
                        <View style={styles.itemContainer}>
                            <View style={{width:'40%',alignItems:'center',justifyContent:'center'}}>
                                <Image source={{uri: 'https://raw.githubusercontent.com/duchuy-bit/Group_PHP/main/images/'+item.anh,}}
                                    style={{height:85,width:95,resizeMode:'cover',borderRadius: 15}}
                                />
                            </View>
                            <View style={{flex: 1, justifyContent:'center'}}>
                                <Text style={styles.txtTitleItem}>{item.ten}</Text>

                                <View style={{flexDirection:'row',marginTop:10}}>
                                    <Text style={styles.txtTypeService}> - Adult</Text>

                                    <View style={{width:'20%'}}></View>

                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity 
                                        onPress={()=>this.touchButtonAmount(item.id, item.listPrice[0].id_gia,false)}
                                        style={styles.buttonAmountContainer}>
                                            <Octicon name='dash' size={17} color={'black'}/>
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={[styles.txtAmount,{marginHorizontal:5}]}>
                                            {item.listPrice[0].sl}</Text>
                                        </View>
                                        <TouchableOpacity 
                                        onPress={()=>this.touchButtonAmount(item.id, item.listPrice[0].id_gia,true)}
                                        style={styles.buttonAmountContainer}>
                                            <Octicon name='plus' size={17} color={'black'}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.priceItem}>
                                    {this.priceChange(item.listPrice[0].sl * item.listPrice[0].giatien)} VND
                                </Text>

                                {
                                    
                                    item.listPrice.length === 2 ?
                                    <>
                                        {/* <View style={{backgroundColor:'grey',height:1, alignSelf:'center',width:'80%'}}></View> */}

                                        <View style={{flexDirection:'row',marginTop:15}}>
                                            <Text style={styles.txtTypeService}> - Child</Text>

                                            <View style={{width:'20%'}}></View>

                                            <View style={{flexDirection:'row'}}>
                                                <TouchableOpacity style={styles.buttonAmountContainer}
                                                onPress={()=>this.touchButtonAmount(item.id, item.listPrice[1].id_gia,false)}>
                                                    <Octicon name='dash' size={17} color={'black'}/>
                                                </TouchableOpacity>
                                                <View>
                                                    <Text style={[styles.txtAmount,{marginHorizontal:5}]}>
                                                        {item.listPrice[1].sl}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity  style={styles.buttonAmountContainer}
                                                onPress={()=>this.touchButtonAmount(item.id, item.listPrice[1].id_gia,true)}>
                                                    <Octicon name='plus' size={17} color={'black'}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <Text style={styles.priceItem}>
                                            {this.priceChange(item.listPrice[1].sl * item.listPrice[1].giatien)} VND
                                        </Text>
                                    </>

                                    :<></>
                                }
                                
                            </View>
                        </View>
                    </Swipeable>
                )
            })
        }
        <View style={{height:20}}></View>
    </ScrollView>
    <View style={{height:25, borderBottomLeftRadius:50, borderBottomRightRadius: 50,backgroundColor:'white'}}></View>
    {/* *** Buy Now *** */}
    <View style={{height:70,width:width,backgroundColor:'#275052',flexDirection:'row'}}>
        <View style={{width: "50%",height:"100%",backgroundColor:"#729090",alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.titleSubTotal}>Total Price</Text>
            <Text style={styles.subTotal}>
                {this.priceChange(this.totalPrice())} VND
            </Text>
        </View>

        <TouchableOpacity style={{flex: 1,backgroundColor:"#275052",alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.buttonBuy}>Buy Now</Text>
        </TouchableOpacity>
    </View>
</LinearGradient>
);
}
}

const styles= StyleSheet.create({
    rightActionStyle: {
        backgroundColor: '#d41359',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        marginVertical:15,
        borderRadius:25,
        marginRight:10,
        alignSelf:'center',
        width:70,
        height:70
    },
    headerContainer:{
        paddingHorizontal:30,paddingTop:40,
        paddingBottom:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white'
    },
    txtScreen:{
        fontSize:22,
        fontFamily: 'Montserrat-Bold',
        color: 'black',
    },
    amountItemContainer:{
        backgroundColor:"#CCCCCC",
        padding:5,
        paddingHorizontal:15,
        borderRadius:50
    },
    textAmountItem:{
        fontSize:15,
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
    },
    titleSubTotal:{
        fontSize:15,
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
    },
    subTotal:{
        fontSize:19,
        fontFamily: 'Montserrat-Bold',
        color: 'white',
    },
    buttonBuy:{
        fontSize:24,
        fontFamily: 'Montserrat-Bold',
        color: 'white',
    },
    itemContainer:{
        marginHorizontal:20,
        marginTop:15,
        backgroundColor:'#EFF0F2',
        borderRadius:25,
        flexDirection:'row',
        paddingVertical:20
    },
    txtTitleItem:{
        fontSize:16,
        width:'95%',
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
    },
    txtTypeService:{
        fontSize:14,
        fontFamily: 'Montserrat-SemiBold',
        color: '#275052',
    },
    buttonAmountContainer:{
        borderRadius:5,
        height:25,
        width:25,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    priceItem:{
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        color: colors.price,
        alignSelf:'center'
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

export default connect(mapStateToProp)(CartScreen);
//-------------------------------------------------------------------------------