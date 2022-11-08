import React, { Component, useEffect,useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from 'react-native-splash-screen'
import ManagerScreen from './screen/ManagerScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import LoginScreen from './screen/LoginScreen';
import HomeScreen from './screen/HomeScreen';



export default function App () {

  const [isLogin,setIsLogin] = useState(false);

  checkLogin = async () => {
    // try {
    //   const value = await AsyncStorage.getItem('Login')
    //   .finally(()=>{console.log('load storage thanh cong')});

    //   if (value !== null) {
    //     // We have data!!
    //     if (value === 'I like to save it.') 
    //       setIsLogin(true);
    //     console.log('islogin: '+ isLogin)
    //     console.log(value);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  };



  useEffect(()=>{
    // SplashScreen.hide();
    checkLogin().finally(()=>{
      setTimeout(() => {
        console.log('delay');
        SplashScreen.hide();
      }, 1000);
    })
  })


return(
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName='LoginScreen'
      screenOptions={{headerShown: false}} 
    >
        <Stack.Screen
          name = "LoginScreen"
          component = {LoginScreen}
        />
        <Stack.Screen
          name = "ManagerScreen"
          component = {ManagerScreen}
        />
        <Stack.Screen
          name = "HomeScreen"
          component = {HomeScreen}
        />
    </Stack.Navigator>
  </NavigationContainer>
  // <View>
  //   <ManagerScreen/>
  // </View>
)
}
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
      
//     };
//   }

//   getMoviesFromApi  () {
//     fetch('https://nodejs-duchuy-bit.herokuapp.com/data')
//       .then((response) => response.json())
//       .then((json) => {
//         // return json.movies;
//         console.log(json),
//         json.NHANVIEN.forEach(element => {
//           console.log(element)
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   render() {
//     return (
//       <View>
//         <Text> App </Text>
//         <TouchableOpacity onPress={()=> this.getMoviesFromApi()}>
//           <View style={{height:50,width:100,backgroundColor:'pink'}}>
//             <Text>Get data</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
