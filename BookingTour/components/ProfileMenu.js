import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
// import { format } from "date-fns";
import moment from "moment";



import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/color';

Icon.loadFont();
Ioni.loadFont();
Octicon.loadFont();
Foundation.loadFont();
MaterialCommunityIcons.loadFont();


const {height, width} = Dimensions.get('window');

export default class ProfileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    UNSAFE_componentWillMount(){
        console.log(moment(this.props.ngaysinh).utc().format('YYYY-MM-DD'));
    }

render() {
return <View>
    <View style={styles.avatarContainer}>
        <View style={styles.avatarBorder}>
            <Image source={{uri: 'https://raw.githubusercontent.com/duchuy-bit/Group_PHP/main/images/meme.jpg',}}
                style={styles.avatar}/>
        </View>
    </View>

    <View style={{marginHorizontal:20, marginTop: 30,borderRadius:25, borderWidth:2, borderColor:colors.textGray,padding:20}}>
        <View style={styles.itemContainer} >
            <Text style={styles.titleItem}>Name:   </Text>
            <Text style={styles.txtItem}>{
                this.props.user[0].name === ''? "Not Set": this.props.user[0].name
            }</Text>
        </View>
        <View style={styles.itemContainer} >
            <Text style={styles.titleItem}>Email:   </Text>
            <Text style={styles.txtItem}>{this.props.user[0].email}</Text>
        </View>
        <View style={styles.itemContainer} >
            <Text style={styles.titleItem}>Gender:  </Text>
            <Text style={styles.txtItem}>{
                this.props.user[0].gioitinh === 1? "Male": 
                this.props.user[0].gioitinh === 0? "Female":"Not Set"
            }</Text>
        </View>
        <View style={styles.itemContainer} >
            <Text style={styles.titleItem}>Phone:   </Text>
            <Text style={styles.txtItem}>{
                this.props.user[0].sdt === '' ? "Not Set": this.props.user[0].sdt
            }</Text>
        </View>
        <View style={styles.itemContainer} >
            <Text style={styles.titleItem}>Address:   </Text>
            <Text style={styles.txtItem}>{
                this.props.user[0].diachi === ''? "Not Set" : this.props.user[0].diachi
            }</Text>
        </View>
        <View style={styles.itemContainer} >
            <Text style={styles.titleItem}>Date of birth:   </Text>
            <Text style={styles.txtItem}>{
                this.props.user[0].ngaysinh === '0000-00-00'? "Not Set": 
                    moment(this.props.user[0].ngaysinh).utc().format('DD-MM-YYYY')
            }</Text>
        </View>

        <View style={styles.itemContainer} >
            <Text style={styles.titleItem}>Password:   </Text>
            <Text style={styles.txtItem}>*****</Text>
        </View>
        
    </View>
    {/* <View style={styles.lineSpace}></View> */}
    {/* <Text style={styles.textInformation}>Email: {this.props.user[0].email}</Text> */}
</View>
}
}

const styles= StyleSheet.create({
    avatarContainer:{
        alignItems:'center',
        justifyContent:'center',
    }, 
    avatarBorder:{
        backgroundColor:'pink',
        borderRadius:100,
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 25,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 25,
    },
    avatar:{
        width:100,height:100,
        resizeMode:'cover',
        borderRadius: 75,
        alignSelf:'center',
        
    },
    changeAvatar:{
        position:'absolute',
        // alignSelf:'center',
        backgroundColor:'white',
        borderRadius:50,
        padding:3, 
        left: width/2 + 25,
        top:7
    },
    lineSpace:{
        marginTop:30,
        marginHorizontal:30,
        height:1,
        backgroundColor:colors.textGray,
        borderRadius: 25
    },
    textInformation:{
        marginTop: 20,
        fontSize: 16,
        color: 'black',
        fontFamily:'Montserrat-Bold',marginHorizontal:30
    },
    itemContainer:{
        flexDirection: 'row',
    },
    titleItem:{
        // marginTop: 15,
        fontSize: 16,
        color: 'black',
        fontFamily:'Montserrat-Bold',
    },
    txtItem:{
        fontSize: 15,
        color: '#283747',
        fontFamily:'Montserrat-SemiBold',
    }
})
