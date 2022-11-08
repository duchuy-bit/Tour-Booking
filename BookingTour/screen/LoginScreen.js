import React, { Component, useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity, Animated, Easing,Modal,Alert } from 'react-native';
import Lottie from 'lottie-react-native';
import Svg, { ClipPath, Ellipse, Image } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage  from '@react-native-async-storage/async-storage';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Entypo';
Icon.loadFont();
Octicons.loadFont();
// import Animated,{useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withSpring} from 'react-native-reanimated';

import ipconfig from '../ipconfig';
import LoadingComponent from '../components/LoadingComponent';

const {height, width} = Dimensions.get('window');

import { connect } from "react-redux";

// import React, { Component } from 'react';
// import { View, Text } from 'react-native';


class LoginScreen extends Component {
constructor(props) {
    super(props);
    this.state = {
        heightAnim: new Animated.Value(0),
        translateYButtonAnim: new Animated.Value(height*2/3+20),
        opacityButton: new Animated.Value(1),
        opacityForm: new Animated.Value(0),
        checkAnimatedSlider: true,
        isLoading: false,
        email: '',
        pass: '',
        repass: '',
        IsModalVisible: false,
        listCustomer:[],
        listCart:[],
        lengthListCart: 0,
    };
}

    UNSAFE_componentWillMount(){
        fetch(ipconfig+'/khachhang')
        .then((res)=> res.json())
        .then((res)=> {
            this.setState({listCustomer: res.khachhang});
            console.log(res.khachhang)
        })
        .catch(err=>console.log(err))
    }

    async _storageDataLogin (id) {
        try {
            await AsyncStorage.setItem(
                'login:key',
                id.toString()
            );
            console.log('Storage Success')
        } catch (error) {
          // Error saving data
        }
    };


    changeHeightSliderSmaller(){
        Animated.parallel([
            Animated.timing(
                this.state.opacityForm,
                {
                    duration: 1500,
                    toValue: 1,
                    useNativeDriver:false
                }
            ),
            Animated.timing(
                this.state.opacityButton,
                {
                    duration: 500,
                    toValue: 0,
                    useNativeDriver: false
                }
            ),
            Animated.timing(
                this.state.heightAnim,
                {
                    duration: 900,
                    toValue: -height*2/3,
                    useNativeDriver: false,
                    easing: Easing.bezier(0.5, 1, 0.89, 1)
                }
            ),
            Animated.timing(
                this.state.translateYButtonAnim,
                {
                    duration: 1000,
                    toValue: height,
                    useNativeDriver: false
                }
            )
        ]).start();
    }

    changeHeightSliderBigger(){
        Animated.parallel([
            Animated.timing(
                this.state.opacityForm,
                {
                    duration: 500,
                    toValue: 0,
                    useNativeDriver:false
                }
            ),
            Animated.timing(
                this.state.opacityButton,
                {
                    duration: 500,
                    toValue: 1,
                    useNativeDriver: false
                }
            ),
            Animated.timing(
                this.state.heightAnim,
                {
                    duration: 1000,
                    toValue: 0,
                    useNativeDriver: false,
                    easing: Easing.bezier(0.5, 1, 0.89, 1)
                }
            ),
            Animated.timing(
                this.state.translateYButtonAnim,
                {
                    duration: 1000,
                    toValue: height*2/3+20,
                    useNativeDriver: false
                }
            )
        ]).start();
    }

    async fetchCustomerToDatabase () {
        await fetch(ipconfig+ "/khachhang",{
            method :"POST",
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                email: this.state.email,
                matkhau: this.state.pass,
                name: "",
                sdt: "",
                diachi: "", 
                gioitinh: "",
                ngaysinh: "",
            })
        })
    }
    alertWarning(a,b){
        Alert.alert(
            a,      // title
            b,      //desciption
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }

    Register(){
        // ------------------------ INPUT ALL INFORMATION-------------------
        if ( this.state.email.trim() === "" 
        || this.state.pass.trim() === "" || this.state.repass.trim() === "" ) 
        {
            this.alertWarning("Warning","Please complete all information")
        }
        else{
            // -------------------PASS AND REPASS MUST BE SAME-------------------
            if(this.state.pass !== this.state.repass){
                this.alertWarning("Warning","Password and Confirm Password must be the same")
            }else{  
                //    -----------EMAIL DON'T HAVE '@'-------------------
                if(this.state.email.indexOf('@') === -1){
                    this.alertWarning("Warning","Incorrect Email")
                }
                else{
                    let checkEmail = true;
                    let idCus ;
                    this.state.listCustomer.forEach((element)=>{
                        if (this.state.email.toUpperCase() == element.email.toUpperCase())
                        { 
                            checkEmail=false; 
                            id =element.id
                            return;
                        }
                    })
                    //------------ EMAIL HAVE BEEN USED ---------------
                    if(checkEmail === false){
                        this.alertWarning("Warning","Email already used")
                    }else {
                    // ------------- REGISTER OK----------
                    this.setState({IsModalVisible: true})
                    this.fetchCustomerToDatabase().finally(()=>{
                        fetch(ipconfig+'/khachhang')
                        .then((res)=> res.json())
                        .then((res)=> {
                            this.setState({listCustomer: res.khachhang});
                            console.log(res.khachhang)
                        })
                        .catch(err=>console.log(err))
                    });
                    setTimeout(() => {
                        this.setState({...this.state,IsModalVisible: false,email: '',pass: '',repass: ''});
                        this.changeHeightSliderBigger();
                    }, 5000);
                    }
                }
            }
        } 
    }

    fetchCart (idCustomer){
        console.log('-------------------- FETCH CART ----------------')
        let lengthCart = 0;
        fetch(ipconfig+'/giohang', { method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ id: idCustomer,})
        })
        .then((response)=> response.json())
        .then((res)=>{
            // this.setState({lengthListCart: res.giohang.length})
            console.log(res)
            lengthCart  = res.giohang.length;
            console.log('Length Cart: '+res.giohang.length)
            console.log('------------------------------------------------')
        })
        .finally(()=>{
            this.props.dispatch({
                    type: 'ChangeCart',
                    amountCart: lengthCart,
                })
        })
        .catch((err)=> console.log(err))
    }

    touchButtonLogin(){
        fetch(ipconfig+'/khachhang')
        .then((res)=> res.json())
        .then((res)=> {
            this.setState({listCustomer: res.khachhang});
            // console.log(res.khachhang)
        })
        .catch(err=>console.log(err))
        // ------------------------ INPUT ALL INFORMATION-------------------
        console.log(this.state.email);
        console.log(this.state.pass);

        if ( this.state.email.trim() === "" || this.state.pass.trim() === "" ) 
        {
            this.alertWarning("Warning","Please complete all information")
        }
        else{
            //    -----------EMAIL DON'T HAVE '@'-------------------
            if(this.state.email.indexOf('@') === -1){
                this.alertWarning("Warning","Incorrect Email")
            }
            else{
                let checkEmail = false;
                let id=0;
                this.state.listCustomer.forEach((element)=>{
                    if (this.state.email.toUpperCase() === element.email.toUpperCase() 
                        &&this.state.pass === element.matkhau)
                    { checkEmail=true; id = element.id ;return;}
                })
                //------------ EMAIL HAVE BEEN USED ---------------
                if(checkEmail === false){
                    this.alertWarning("Warning","Email or password is not correct")
                }else {
                // ------------- LOGIN OK----------
                this.setState({IsModalVisible: true})

                //------REDUX-------
                this.props.dispatch({
                    type: 'LOGINSUCCESS',
                    id: id,
                })

                this.fetchCart(id);
                //------CREATE CART----------
                // let check=false;
                // fetch(ipconfig+'/giohang')
                // .then((res)=>res.json())
                // .then((res)=>{
                //     this.setState({listCart: res.giohang})
                //     console.log(listCart)
                //     listCart.forEach((element)=>{
                //         if (element.id_khachhang === id){
                //             check=true;
                //             return;
                //         }
                //     })
                // })
                // .catch((err)=>console.log("err"))
                // .finally(()=>
                //     {
                //         console.log("Check : "+check)
                //         if (check===false){
                //             // let today = new Date()
                //             console.log("Date creact Cart: "+new Date())
                //             fetch(ipconfig+ "/taogiohang",{
                //                 method :"POST",
                //                 headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
                //                 body: JSON.stringify({ 
                //                     id_khachhang: id,
                //                     ngaytao: new Date(),
                //                 })
                //             }).finally(()=>console.log("Create Cart Success"))
                //         }
                //     }
                // )
                //--------ASYNC STORAGE LOGIN -------------
                this._storageDataLogin(id);
                //DELAY
                setTimeout(() => {
                    this.setState({...this.state,IsModalVisible: false,email: '',pass: ''});
                    // this.changeHeightSliderBigger();
                    this.props.navigation.replace('HomeScreen')
                }, 5000);
                }
            }
        }        
    }

render() {
return (
<View style={styles.container}>
<Modal
    animationType="fade"
    style={{flex: 1,alignSelf: 'center',height:100,width:100}}
    transparent={true}
    visible={this.state.IsModalVisible}
    onRequestClose={() => this.setState({IsModalVisible: false})}
>
    <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)',width:width,height:height,alignItems:'center',justifyContent:'center'}}>
    {/* <View> */}
        <View style={{backgroundColor: 'white', justifyContent: 'center',opacity: 1, alignItems: 'center',alignSelf: 'center', height: 200, width: 200,borderRadius:25}}>
            <Lottie style={{height: '100%', width: '100%'}} source={require('../assets/lotties/success.json')} autoPlay loop />
        </View>
    {/* </View> */}
    </View>
</Modal>
{/* {this.state.isLoading ? <LoadingComponent/> : <></>} */}
    {/* ---------------------------Slider Picture --------------------------*/}
    <Animated.View style={[styles.slider,{transform:[{translateY: this.state.heightAnim}] }] }>
        <Svg  height={height + 50} width={width} >
                <ClipPath id='clipPathId'>
                    <Ellipse cx={width/2} rx={height} ry={height + 50}/>
                </ClipPath>
                <Image href={require('../assets/images/hotel.jpg')} 
                    width={width + 50}
                    height={height + 50}
                    preserveAspectRatio="xMidyMid slice"
                    clipPath='url(#clipPathId)'
                />
            </Svg>

            <View style= {styles.closeSliderContainer}>
                <View style={styles.wrapperCloseSlider}>
                <TouchableOpacity onPress={()=> this.changeHeightSliderBigger()}>
                    <View style={styles.buttonCloseSlider}>
                        <Octicons name='chevron-down' size={20} color='black'></Octicons>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        
    </Animated.View>

    {/* -----------------------------FORM INPUT------------------------------- */}
    <Animated.View style={[styles.formContainer,{opacity: this.state.opacityForm} ]}>
    {this.state.checkAnimatedSlider ? 
        <>
        {/* ----------------FORM LOGIN ------------------- */}
        <View style={{alignItems: 'center',marginBottom: 40}}>
            <Text style={{color: 'white', fontSize: 40,fontFamily: 'Montserrat-Bold',marginBottom:10}}>Welcome Back</Text>
            <Text style={{color: 'white', fontSize: 18,fontFamily: 'Montserrat-Regular',}}>Login your account</Text>
        </View>
        <LinearGradient colors={['#C7CEF1', '#94A2E5']} 
                                start={{ x: 0, y: 0 }} 
                                end={{ x: 1, y: 0 }} 
                                style={styles.linerTextFiled}>
            <View style={styles.textInputContainer}>
                <Icon name="person" size={30}></Icon>
                <TextInput 
                    value={this.state.email}
                    placeholder='Email' 
                    placeholderTextColor="#576CD6" 
                    onChangeText={(text) => this.setState({...this.state,email: text})} 
                    style={styles.textInput} />
            </View>
        </LinearGradient>

        <LinearGradient colors={['#C7CEF1', '#94A2E5']} 
                                start={{ x: 0, y: 0 }} 
                                end={{ x: 1, y: 0 }} 
                                style={styles.linerTextFiled}>
            <View style={styles.textInputContainer}>
                <Octicons name='lock'  size={30}></Octicons>
                <TextInput 
                    value={this.state.pass}                
                    placeholder='Password' 
                    secureTextEntry={true} 
                    placeholderTextColor="#576CD6" 
                    onChangeText={(text) => this.setState({...this.state,pass: text})} 
                    style={styles.textInput}/>
        </View>
        </LinearGradient>
        <View style = {styles.formHelper}>
            <TouchableOpacity>
                <Text style={styles.txtHelper}>Forgot Password ?</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>this.touchButtonLogin()} >
            <View style={styles.buttonLogin}>
                <Text style={styles.textButtonLogin}>LOGIN</Text>
            </View>
        </TouchableOpacity>
        </>
        
    :       
        <>
        {/* -------------------FORM REGISTER---------------------- */}
        <View style={{alignItems: 'center',marginBottom: 40}}>
            <Text style={{color: 'white', fontSize: 40,fontFamily: 'Montserrat-Bold',marginBottom:10}}>
                Register
            </Text>
            <Text style={{color: 'white', fontSize: 18,fontFamily: 'Montserrat-Regular',}}>
                Create your account
            </Text>
        </View>
        <LinearGradient colors={['#C7CEF1', '#94A2E5']} 
                                start={{ x: 0, y: 0 }} 
                                end={{ x: 1, y: 0 }} 
                                style={styles.linerTextFiled}>
            <View style={styles.textInputContainer}>
                <Icon name="person" size={20}></Icon>
                <TextInput 
                    value={this.state.email}
                    placeholder='Email' 
                    placeholderTextColor="#576CD6"
                    onChangeText={(text) => this.setState({...this.state,email: text})} 
                    style={styles.textInput} />
            </View>
        </LinearGradient>

        <LinearGradient colors={['#C7CEF1', '#94A2E5']} 
                                start={{ x: 0, y: 0 }} 
                                end={{ x: 1, y: 0 }} 
                                style={styles.linerTextFiled}>
            <View style={styles.textInputContainer}>
                <Octicons name='lock'  size={20}></Octicons>
                <TextInput 
                    value={this.state.pass}
                    placeholder='Password' 
                    secureTextEntry={true} 
                    onChangeText={(text) => this.setState({...this.state,pass: text})}
                    placeholderTextColor="#576CD6" 
                    style={styles.textInput}/>
        </View>
        </LinearGradient>

        <LinearGradient colors={['#C7CEF1', '#94A2E5']} 
                                start={{ x: 0, y: 0 }} 
                                end={{ x: 1, y: 0 }} 
                                style={styles.linerTextFiled}>
            <View style={styles.textInputContainer}>
                <Octicons name='lock'  size={20}></Octicons>
                <TextInput 
                    value={this.state.repass}
                    placeholder='Confirm Password' 
                    secureTextEntry={true} 
                    onChangeText={(text) => this.setState({...this.state,repass: text})}
                    placeholderTextColor="#576CD6" 
                    style={styles.textInput}/>
        </View>
        </LinearGradient>
        <View style={{marginTop: 40}}></View>
        <TouchableOpacity onPress={()=> this.Register()} >
            <View style={styles.buttonLogin}>
                <Text style={styles.textButtonLogin}>REGISTER</Text>
            </View>
        </TouchableOpacity>
        </>
    }
        
    </Animated.View>

    {/* ------------------BUTTON LOGIN AND REGISTER------------------------ */}
    <Animated.View style={[styles.buttonContainer,{
                opacity: this.state.opacityButton,
                transform:[{
                    translateY: this.state.translateYButtonAnim
                }],
            }
        ]}>
        {/* ----------Button Login-------- */}
        <TouchableOpacity onPress={()=>{ 
                this.changeHeightSliderSmaller();
                this.setState({checkAnimatedSlider: true});
            }}>
            <View style={styles.buttonLogin}>
                <Text style={styles.textButtonLogin}>LOGIN</Text>
            </View>
        </TouchableOpacity>
        {/* --------Button Register-------- */}
        <TouchableOpacity onPress={()=> {
                this.changeHeightSliderSmaller();
                this.setState({checkAnimatedSlider: false})
            }}>
            <View style={styles.buttonLogin}>
                <Text style={styles.textButtonLogin}>REGISTER</Text>
            </View>
        </TouchableOpacity>
    </Animated.View>    
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

export default connect(mapStateToProp)(LoginScreen);
//-------------------------------------------------------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#576CD6'
    },
    formHelper:{
        marginRight: 50,
        alignItems: 'flex-end',
        marginBottom: 30
    },
    txtHelper:{
        color: 'white',
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        fontWeight: "bold",
        marginBottom: 20
    },

    linerTextFiled:{
        height: 50,
        borderRadius: 50,
        height: 50,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 20
    },
    textInputContainer:{
        // justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, 
        paddingLeft: 10,
        borderColor: 'white',
        width: '100%',
        height: 50,
        borderRadius: 50,
        flexDirection: 'row',
    },
    textInput:{
        height:50,
        // backgroundColor:'white',
        color: '#576CD6',
        fontSize: 16,
        // fontWeight: "bold",
        // borderWidth: 1,
        width:"80%",
        // borderColor: 'grey',
        // marginHorizontal: 20,
        borderRadius: 50,
        // marginBottom:10,
        paddingLeft: 15,
    },

    slider:{
        width: width,
        height: height + 20,
        backgroundColor: '#576CD6',
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        // // borderRadius: 25,
        // shadowColor: '#000',
        // shadowOffset:{
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        // elevation: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeSliderContainer:{
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    wrapperCloseSlider:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 60,
        backgroundColor: '#576CD6',
        // backgroundColor: 'white',
        top: -30,
        borderRadius: 50,
    },
    buttonCloseSlider:{
        width:40,
        height: 40,
        // top: -20,
        alignSelf:'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems:'center',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 15,
    },

    buttonContainer:{
        transform:[{
            translateY: height*2/3+20
        }],
        alignSelf: 'center',
        position:'absolute',
        // backgroundColor: 'grey',
        width: width
    },
    buttonLogin:{
        backgroundColor: '#283854',
        // #3D529B
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom:20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5
    },

    textButtonLogin:{
        color: 'white',
        fontSize: 17,
        fontFamily: 'Montserrat-Bold',
    },
    formContainer:{
        width: width,
        height: height*2/3-50,
        transform:[{
            translateY: height/3+20
        }],
        position:'absolute',
        // backgroundColor:'purple',
        justifyContent: 'center'
    },
    
});


