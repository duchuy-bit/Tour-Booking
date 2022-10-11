import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

export default function App () {

  useEffect(()=>{
    SplashScreen.hide();
  })

return(
  <View>
    <Text>APP</Text>
  </View>
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
