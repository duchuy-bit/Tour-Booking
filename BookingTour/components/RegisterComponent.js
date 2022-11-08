import React, { Component } from 'react';
import { View, Text ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');


import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Entypo';
Icon.loadFont();
Octicons.loadFont();

export default class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
        <View>
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
                    placeholder='Email' 
                    placeholderTextColor="#576CD6" 
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
                    placeholder='Password' 
                    secureTextEntry={true} 
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
                    placeholder='Confirm Password' 
                    secureTextEntry={true} 
                    placeholderTextColor="#576CD6" 
                    style={styles.textInput}/>
        </View>
        </LinearGradient>
        <View style={{marginTop: 40}}></View>
        <TouchableOpacity >
            <View style={styles.buttonLogin}>
                <Text style={styles.textButtonLogin}>REGISTER</Text>
            </View>
        </TouchableOpacity>
        </View>
        );
    }
}
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