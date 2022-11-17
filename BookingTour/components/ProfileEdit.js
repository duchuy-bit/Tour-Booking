import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions,Image,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user[0].name,
      // name: 'Nguyen duc Huy',
      email: this.props.user[0].email,
      phone: this.props.user[0].sdt,
      gender: this.props.user[0].gioitinh,
      address: this.props.user[0].diachi,
      // dateofbirth: this.props.user[0].ngaysinh,
      dateofbirth: moment(this.props.user[0].ngaysinh).utc().format('YYYY-MM-DD'),
      // dateofbirth: this.changeDate(),
      password: this.props.user[0].matkhau,
      // indexGender: this.props.user[0].gioitinh===1?1:2
    };
  }

  changeDate(){
    const tt = new Date(this.props.user[0].ngaysinh);
    const date = tt.getUTCDate() + 1;
    const month = tt.getUTCMonth() +1;
    const year = tt.getUTCFullYear() ;

    // console.log("tt"+ tt)
    // console.log("tt"+ tt.getUTCFullYear())

    return year+" - "+month+" - "+date;
  }

  UNSAFE_componentWillMount(){
    // this.changeDate();
    // const tt= new Date(this.props.user[0].ngaysinh);
    // console.log("tt"+ tt)
    // console.log("tt"+ tt.getUTCDate())
    // console.log("date "+this.state.dateofbirth.date)
    // console.log('Edit Profile')
    const tam = this.props.redux;
    console.log("Name:"+ tam)
    // let  localTime = moment.utc('18:35', "HH:mm").tz('America/New_York').format("HH:mm");
    // console.log(localTime);

    // console.log(this.props.user[0])
  }

  async fetchCustomerToDatabase () {
    await fetch(ipconfig+ "/updatekhachhang",{
        method :"POST",
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            id: this.props.redux,
            email: this.state.email,
            matkhau: this.state.password,
            name: this.state.name,
            sdt: this.state.phone,
            diachi: this.state.address, 
            gioitinh: this.state.gender,
            ngaysinh: this.state.dateofbirth,
            indexGender: 1,
        })
    }).catch(err=>console.log('err'))
  }

  touchSave(){
    console.log('SaveData')
    this.fetchCustomerToDatabase();
  }


render() {
return<View>
  <View style={{top:-15}}>
        <Image source={{uri: 'https://raw.githubusercontent.com/duchuy-bit/Group_PHP/main/images/meme.jpg',}}
            style={styles.avatar}/>
            <View style={styles.changeAvatar}>
                <TouchableOpacity style={{padding:7,backgroundColor: '#27B382',borderRadius: 50}}>
                    <Ioni name='camera' size={20} color={'white'} />
                </TouchableOpacity>
            </View>
  </View>
  <View style={styles.formContainer}>
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Name: </Text>
      <TextInput 
        value={this.state.name}
        placeholderTextColor="#576CD6" 
        onChangeText={(text) => this.setState({...this.state,name: text})} 
        style={styles.inputField}/>
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Email: </Text>
      <TextInput 
        value={this.state.email}
        placeholderTextColor="#576CD6" 
        onChangeText={(text) => this.setState({...this.state,email: text})} 
        style={styles.inputField}/>
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Phone: </Text>
      <TextInput 
        value={this.state.phone}
        onChangeText={(text) => this.setState({...this.state,phone: text})} 
        style={styles.inputField}/>
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Address: </Text>
      <TextInput 
        value={this.state.address}
        onChangeText={(text) => this.setState({...this.state,address: text})} 
        style={styles.inputField}/>
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Gender: </Text>
      <View style={{flexDirection:'row',width:'70%'}}>
        <TouchableOpacity style={styles.genderContainer}
          onPress={()=>this.setState({gender:1})}
        >
          {this.state.gender === 1 ?<View style={styles.genderButtonActive}></View>: <></>}
        </TouchableOpacity>
        <Text style={{fontSize: 15,color: '#283747',fontFamily:'Montserrat-SemiBold',}}>Male</Text>

        <TouchableOpacity style={[styles.genderContainer,{marginLeft:10}]}
          onPress={()=>this.setState({gender:0})}
        >
          {this.state.gender === 0 ?<View style={styles.genderButtonActive}></View>: <></>}
        </TouchableOpacity>
        <Text style={{fontSize: 15,color: '#283747',fontFamily:'Montserrat-SemiBold',}}>Female</Text>
      </View>
      {/* <TextInput 
        value={this.state.gender}
        onChangeText={(text) => this.setState({...this.state,gender: text})} 
        style={styles.inputField}/> */}
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Date Of Birth: </Text>
      <TextInput 
        value={this.state.dateofbirth}
        onChangeText={(text) => this.setState({...this.state,dateofbirth: text})} 
        style={styles.inputField}/>
    </View>
  </View>
  <View style={{alignItems:'flex-end',marginHorizontal:50,marginTop:15}}>
    <TouchableOpacity onPress={()=>this.touchSave()}
      style={{width:100,height:50,backgroundColor:'#16202C',alignItems:'center',justifyContent:'center',borderRadius:75}}
    >
      <Text style={styles.nameScreen}>Save</Text>
    </TouchableOpacity>
  </View>
</View>
}
}

const styles= StyleSheet.create({
  avatar:{
    width:100,height:100,
    resizeMode:'cover',
    borderRadius: 75,
    alignSelf:'center'
  },
  nameScreen:{
    fontSize: 16,
    color: 'white',
    fontFamily:'Montserrat-Bold'
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
  formContainer:{
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    // backgroundColor:'pink',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'grey'
  },
  inputContainer:{
    flexDirection:'row',
    marginHorizontal:20,
    // backgroundColor:'#',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10
    // paddingHorizontal:20

  },
  inputTitle:{
    width:'30%',
    fontSize: 16,
    color: 'black',
    fontFamily:'Montserrat-Bold',
  },
  inputField:{
    height:'100%',
    width:'70%',
    fontSize: 16,
    color: 'black',
    fontFamily:'Montserrat-SemiBold',
    backgroundColor: 'pink',
    borderRadius:50,
    paddingLeft: 15
    // borderBottomWidth:1,
    // borderColor:'grey'
    // borderRadius: 15,
    // borderWidth: 2,
    // borderColor: '#16202C',
    // paddingLeft:10,
  },

  genderContainer:{
    height:20,width:20,
    borderWidth:2,
    borderColor:'#16202C',
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
    marginRight:5
  },

  genderButtonActive:{
    height:10,width:10,
    backgroundColor:'#16202C',
    borderRadius:25
  }
})
