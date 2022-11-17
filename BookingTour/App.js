import React, { Component, useEffect,useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// import AsyncStorage from "@react-native-async-storage/async-storage";

import { Provider } from "react-redux";

import SplashScreen from 'react-native-splash-screen'
import ManagerScreen from './screen/ManagerScreen';


// import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

// import {NavigationContainer} from '@react-navigation/native';
// import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {enableScreens} from 'react-native-screens';

// LogBox.ignoreLogs([""]);


enableScreens();


// import {createAppContainer} from 'react-navigation';
// import {createSharedElementStackNavigator4} from 'react-navigation-shared-element';

// const Stack = createSharedElementStackNavigator();

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();
// const Stack = createNativeStackNavigator();

import LoginScreen from './screen/LoginScreen';
import HomeScreen from './screen/HomeScreen';
import WelcomeScreen from './screen/WelcomeScreen';
import DetailScreen from './screen/DetailScreen';
import store from './redux/reducer';
import AccountScreen from './screen/AccountScreen';
// import AddToCartScreen from './screen/AddToCartScreen';
import { LogBox, SafeAreaView } from 'react-native';
import CartScreen from './screen/CartScreen';
import BillScreen from './screen/BillScreen';



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
    SplashScreen.hide();
    // SplashScreen.hide();
  //   checkLogin().finally(()=>{
  //     setTimeout(() => {
  //       console.log('delay');
        // SplashScreen.hide();
  //     }, 1000);
  //   })
  })


return(
  // <SafeAreaView>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator  initialRouteName='WelcomeScreen'  screenOptions={{headerShown: false}} >
            <Stack.Screen name = "WelcomeScreen" component = {WelcomeScreen}  />
            <Stack.Screen  name = "LoginScreen" component = {LoginScreen}/>
            <Stack.Screen name = "ManagerScreen" component = {ManagerScreen}/>
            <Stack.Screen name = "HomeScreen" component = {HomeScreen} />
            <Stack.Screen  name = "DetailScreen"  component={DetailScreen}/>
            <Stack.Screen  name = "AccountScreen"  component={AccountScreen}/>
            {/* <Stack.Screen  name = "AddToCartScreen"  component={AddToCartScreen}/> */}
            <Stack.Screen name = "CartScreen" component={CartScreen}/>
            <Stack.Screen name = "BillScreen" component={BillScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  // </SafeAreaView>
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
