import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../assets/colors/color';

import Toast from "react-native-root-toast";

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

const {height, width} = Dimensions.get('window');
import { connect } from "react-redux";
import ipconfig from '../ipconfig';
import moment from 'moment';

class FormAddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slAdult:1,
            slChild:0,
            slCart:0
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
        return tam;
    }


    UNSAFE_componentWillMount(){
        console.log('-------------OPEN SLIDER-----------------')
        console.log("Item: "+this.props.item.id+" "+this.props.item.ten)
        this.props.listPrice.sort();
        console.log(this.props.listPrice)
        console.log(" Id Customer BottomSlider: "+this.props.idCustomer[0])
    }

    async fetchCheckCart(idPrice,sl){
        let check=false;
        // let sl=0;
        await fetch(ipconfig+'/giohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id: this.props.idCustomer[0],})
        })
        .then((response)=> response.json())
        .then((res)=>{
            // console.log(res.giohang)

            res.giohang.forEach((element)=>{
                if(element.id_gia === idPrice && element.id_khachhang === this.props.idCustomer[0]){ 
                    console.log('--------Update service------------ '+this.props.idCustomer[0]+" "+idPrice)   
                    
                    this.fetchUpdateCart(idPrice,sl);
                    // updateCart(element.sl);
                    // setIsActiveService(true);
                    check= true;

                    return;
                }
            })
        })
        .catch((err)=> console.log(err))
        .finally(()=>{
            if (check=== false){
                // if (this.state.slAdult > 0)
                console.log("---------insert new-----------");
                // let tam=1;
                // this.props.dispatch({ type: 'ChangeCart', amountCart: parseInt(this.props.amountCart) + 1, })
                // console.log("cart Length: "+ this.props.amountCart)
                // if(this.state.slChild !== 0) tam=2;
                this.fetchInsertCart(idPrice, sl)
            }
        })
        ;
    }

    async fetchInsertCart(id_gia,sl){
        console.log('chen ne')
        // this.props.dispatch({ type: 'ChangeCart', amountCart: parseInt(this.props.amountCart) + 1, })
        // .finally(()=> {console.log('dispatch Complete')})
        // data=[id_gia,  sl ]
        await fetch(ipconfig+'/insertgiohang',{
            method :"POST", headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                id_khachhang: this.props.idCustomer[0],
                id_gia: id_gia,
                sl: sl,
                ngaythem: moment(new Date()).utc().format('YYYY-MM-DD'),
            })
        })
    }

    async fetchUpdateCart(idPrice, sl ){
        await fetch(ipconfig+'/updateslgiohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                id_khachhang: this.props.idCustomer[0],
                id_gia: idPrice, 
                sl:sl,
                ngaythem: moment(new Date()).utc().format('YYYY-MM-DD')
            })
        })
    }

    touchAddToCart(){
        console.log("Touch ADD To Cart")

        this.props.dispatch({type: "BOTTOM_SLIDER"})

        if (this.state.slAdult> 0) {
            console.log("---ADULT----")
            if (this.props.listPrice.length===1) this.fetchCheckCart(this.props.listPrice[0].id ,this.state.slAdult)
            else  this.fetchCheckCart(this.props.listPrice[1].id ,this.state.slAdult);
        }
        if (this.state.slChild> 0) {
            console.log("---CHILD----")
            this.fetchCheckCart(this.props.listPrice[0].id ,this.state.slChild);
        }
        // DetailScreen.
        Toast.show('Added to Cart', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: false,
            animation: true,
            hideOnPress: true,
        })
    }

    render() {
        return (
        <View style={styles.bottomSlider}>
            <View style={{height:7,width:50,backgroundColor:'grey',borderRadius:50,marginTop:15}}></View>
            {/* <Text style={[styles.titleItem,{marginTop:15,marginHorizontal:20,alignSelf:'center'}]}>{this.props.item.ten}</Text> */}

            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                {/* ------ADULT--------- */}
                <Text style={[styles.titleItem,{marginTop:15,marginHorizontal:20,alignSelf:'center'}]}>{this.props.item.ten}</Text>

                <View style={[styles.formContainer,{marginTop:30}]}>
                    <View style={{width:'50%'}}>
                        <Text style={styles.titlePrice}>Adult </Text>
                        <Text style={[styles.titlePrice,{color:colors.price}]}>{
                            this.props.listPrice.length === 2 ? this.priceChange(this.props.listPrice[1].giatien):this.priceChange(this.props.listPrice[0].giatien)
                        } VND</Text>
                    </View>

                    <View style={{width:'30%',flexDirection:'row',justifyContent:'center'}}>
                        <View style={{borderColor:'grey',borderWidth:1,padding:5, borderRadius: 50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{
                                if (this.state.slAdult > 0 )this.setState({slAdult: this.state.slAdult-1})
                            }}
                            style={{marginHorizontal:9}}>
                                <Octicon name='dash' size={17} color={'black'}/>
                            </TouchableOpacity>
                            <View>
                                <Text style={[styles.txtAmount,{marginHorizontal:10}]}
                                >{this.state.slAdult}</Text>
                            </View>
                            <TouchableOpacity  onPress={()=>{this.setState({slAdult: this.state.slAdult+1})}}
                            style={{marginHorizontal:9}}>
                                <Octicon name='plus' size={17} color={'black'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* -----CHILD------ */}
                {this.props.listPrice.length===1?
                    <></>:
                    <View style={styles.formContainer}>
                    <View style={{width:'50%'}}>
                        <Text style={styles.titlePrice}>Child </Text>
                        <Text style={[styles.titlePrice,{color:colors.price}]}>{
                            this.props.listPrice.length === 2 ? this.priceChange(this.props.listPrice[0].giatien):""
                        } VND</Text>
                    </View>

                    <View style={{width:'30%',flexDirection:'row',justifyContent:'center'}}>
                        <View style={{borderColor:'grey',borderWidth:1,padding:5, borderRadius: 50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{
                                if (this.state.slChild > 0 )this.setState({slChild: this.state.slChild-1})
                            }}
                            style={{marginHorizontal:9}}>
                                <Octicon name='dash' size={17} color={'black'}/>
                            </TouchableOpacity>
                            <View>
                                <Text style={[styles.txtAmount,{marginHorizontal:10}]}
                                >{this.state.slChild}</Text>
                            </View>
                            <TouchableOpacity onPress={()=>{this.setState({slChild: this.state.slChild+1})}}
                            style={{marginHorizontal:9}}>
                                <Octicon name='plus' size={17} color={'black'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}

                <View style={{alignItems:'center',marginTop:40,marginBottom: 20}}>
                    <TouchableOpacity onPress={()=>this.touchAddToCart()}
                    style={styles.btnAdd}>
                        <Text style={styles.titleItem}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
        </View>
        );
    }
}

//----------------------------------REDUX----------------------------------------
function mapStateToProp(state){
    return {
        idCustomer: state.idCustomer,
        bottomSlider: state.bottomSlider,
        amountCart: state.cartAmount
    }
}

export default connect(mapStateToProp)(FormAddToCart);
//-------------------------------------------------------------------------------


const styles= StyleSheet.create({
    bottomSlider:{
        backgroundColor: 'white', 
        opacity: 1, 
        alignItems: 'center',
        alignSelf: 'center', 
        height: "100%",
        width: "100%",
        borderTopLeftRadius:50,
        borderTopRightRadius:50
    },
    titleItem:{
        fontSize: 20,
        color: 'black',
        fontFamily:'Montserrat-Bold'
    },

    titlePrice:{
        fontSize: 16,
        color: 'black',
        fontFamily:'Montserrat-SemiBold'
    },
    txtAmount:{
        fontSize: 16,
        color: 'black',
        fontFamily:'Montserrat-Bold'
    },

    formContainer:{
        // marginHorizontal:20,
        marginTop:20,
        width:'100%',
        // height:100,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    btnAdd:{
        borderRadius:75,
        marginHorizontal:30,
        paddingVertical:15,
        width:width/2+10,
        alignItems:'center',
        justifyContent:'center',
        // width:'80%',
        backgroundColor:colors.prmary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
