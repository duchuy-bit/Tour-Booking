import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';
import colors from '../assets/colors/color';

import moment from "moment";

import { connect } from "react-redux";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ThreeDotLoading from '../components/ThreeDotLoading';
import ipconfig from '../ipconfig';

Icon.loadFont();
Ioni.loadFont();
Octicon.loadFont();
Foundation.loadFont();
MaterialCommunityIcons.loadFont();


const {height, width} = Dimensions.get('window');


class BillScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bill:0,
            listCTHD:[],
            isLoad: true
        };
    }

    async fetchDelete(id_gia){
        console.log("delete: "+id_gia)
        await fetch(ipconfig+'/deletegiohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id_gia: id_gia,})
        }).catch((err)=> console.log('err'))
    }

    async fetchGetCTHD(){
        console.log("CTHD")
        const {bill} = this.props.route.params;

        await fetch(ipconfig+'/getcthd', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({id_khachhang:this.props.idCustomer[0], id_hd: bill.id,})
        })
        .then((res)=>res.json())
        .then((res)=>{
            // this.setState({listCTHD:res.cthd})
            console.log(this.state.listCTHD)
            this.setState({listCTHD:res.cthd})
            // Delete Cart
            res.cthd.forEach((element) => {
                console.log(element)
                this.fetchDelete(element.id_gia)
            });
            this.setState({isLoad: false})

        })
        .catch((err)=> console.log('err'))
        // .finally(()=>{
        //     this.setState({isLoad: false})
        // })
    }

    UNSAFE_componentWillMount(){
        const {bill} = this.props.route.params;
        this.setState({bill: bill})
        console.log("------------BILL SCREEN---------------")
        console.log(bill.id)
        this.fetchGetCTHD()
    }

    dateFormat(a){

        return a;
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

render() {
return (
    <View style={{flex: 1,backgroundColor:colors.background}}>
        { this.state.isLoad ? <View><Text>LOADING</Text></View>:
            <ScrollView style={{flex: 1}}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={()=>{
                        this.refreshCart();
                        this.props.navigation.goBack();
                    }}
                    style={{borderColor:'grey',borderWidth: 1, borderRadius:15,alignItems:'center',justifyContent:'center',height:40,width:40}}>
                        <Octicon name='arrow-left' size={20} color={'black'}/>
                    </TouchableOpacity>

                    <Text style={styles.txtScreen}>Bill Detail</Text>

                    <View style={{width:70}}></View>
                </View>

                {/* Notification */}
                <View style={styles.notificationContainer}>
                    <View style={{borderColor:'#26893D',height:60,width:60, borderWidth:2,borderRadius:75,alignItems:'center',justifyContent:'center'}}>
                        <Octicon name='check' size={40} color={"#26893D"}/>
                    </View>
                    <Text style={styles.notificationTitle}>Successful transaction</Text>
                </View>

                {/* Detai Bill */}
                <View style={styles.detailBillContainer}>
                    <View style={styles.rowDetailBill}>
                        <Text style={styles.txtDetail}>Bill code</Text>
                        <Text style={styles.txtDetail}>{this.state.bill.id}</Text>
                    </View>
                    <View style={styles.lineBetween}></View>
                    
                    <View style={styles.rowDetailBill}>
                        <Text style={styles.txtDetail}>Name</Text>
                        <Text style={styles.txtDetail}>{this.state.bill.ten_khachhang}</Text>
                    </View>
                    <View style={styles.lineBetween}></View>

                    <View style={styles.rowDetailBill}>
                        <Text style={styles.txtDetail}>Email</Text>
                        <Text style={styles.txtDetail}>{this.state.bill.email_khachhang}</Text>
                    </View>
                    <View style={styles.lineBetween}></View>

                    <View style={styles.rowDetailBill}>
                        <Text style={styles.txtDetail}>Date of payment</Text>
                        <Text style={styles.txtDetail}>
                            {moment(this.state.bill.ngaythanhtoan).utc().format('DD-MM-YYYY')}
                        </Text>
                    </View>
                    <View style={styles.lineBetween}></View>

                    {/* List Service */}
                    <View style={[styles.rowDetailBill,{marginBottom:7}]}>
                        <Text style={styles.txtDetail}>Services : </Text>
                        <Text style={styles.txtDetail}></Text>
                    </View>

                    {this.state.listCTHD.map((item)=>{
                        return(
                            <View key={item.id_gia} style={{marginLeft:20,marginBottom:15}}>
                                <Text style={styles.nameService}>   +  {item.ten}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:30}}>
                                    <Text style={styles.txtAmount}>
                                        {
                                            item.loaive === 1 ?"  Adult : ": "  Child : "
                                        }
                                        
                                    </Text>
                                    <Text style={styles.txtPrice}>
                                        {this.priceChange(parseInt(item.giatien)* parseInt(item.sl))} VND
                                    </Text>
                                    <Text style={styles.txtAmount}> x{item.sl}</Text>
                                </View>
                            </View>
                        )
                    })}

                    {/* <View style={{marginLeft:20,marginBottom:15}}>
                        <Text style={styles.nameService}>   - Vinpearl Condotel Beachfront Nha Trang</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:30}}>
                            <Text style={styles.txtAmount}>Adult : </Text>
                            <Text style={styles.txtPrice}>4.500.000 VND</Text>
                            <Text style={styles.txtAmount}> x1</Text>
                        </View>
                    </View>

                    <View style={{marginLeft:20,marginBottom:15}}>
                        <Text style={styles.nameService}>   - Vinpearl Condotel Beachfront Nha Trang</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:30}}>
                            <Text style={styles.txtAmount}>Adult :</Text>
                            <Text style={styles.txtPrice}>4.500.000 VND</Text>
                            <Text style={styles.txtAmount}> x1</Text>
                        </View>
                    </View> */}

                    <View style={styles.lineBetween}></View>

                    {/* Total Price */}
                    <View style={styles.rowDetailBill}>
                        <Text style={styles.txtDetailPrice}>Total Price</Text>
                        <Text style={styles.txtDetailPrice}>{this.priceChange(this.state.bill.tongtien)} VND</Text>
                    </View>

                </View>
                <View style={{height:100}}></View>
            </ScrollView>
        }

        {/* <ThreeDotLoading /> */}
    </View>
);
}
}

const styles= StyleSheet.create({
    headerContainer:{
        width: width,
        // backgroundColor:'pink',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginTop:30,
    },
    txtScreen:{
        fontSize:18,
        fontFamily: 'Montserrat-Bold',
        color: 'black',
    },
    notificationContainer:{
        marginTop: 30,
        alignItems:'center',
        justifyContent:'center'
    },
    notificationTitle:{
        marginTop: 15,
        fontSize:18,
        fontFamily: 'Montserrat-Bold',
        color: '#192027',
    },
    detailBillContainer:{
        marginHorizontal: 30,
        marginTop:30,
    },
    rowDetailBill:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    lineBetween:{
        height:1,
        width: width-60,
        alignSelf:'center',
        backgroundColor:'#CCCCCC',
        borderRadius:50,
        marginTop:10,
        marginBottom:15
    },
    txtDetail:{
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#2C3034',
    },
    txtDetailPrice:{
        fontSize:16,
        fontFamily: 'Montserrat-Bold',
        color: '#2C3034',
    },
    nameService:{
        fontSize:15,
        fontFamily: 'Montserrat-SemiBold',
        color: '#2C3034',
        // width:'90%',
    },
    txtPrice:{
        fontSize:15,
        fontFamily: 'Montserrat-SemiBold',
        color: colors.price,
    },
    txtAmount:{
        fontSize:15,
        fontFamily: 'Montserrat-SemiBold',
        color: '#2C3034',
    },
})

//----------------------------------REDUX----------------------------------------
function mapStateToProp(state){
    return {
        idCustomer: state.idCustomer,
        bottomSlider: state.bottomSlider,
        amountCart: state.cartAmount
    }
}

export default connect(mapStateToProp)(BillScreen);
//-------------------------------------------------------------------------------
