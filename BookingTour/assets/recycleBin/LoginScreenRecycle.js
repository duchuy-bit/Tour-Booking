
// // export default function LoginScreen({navigation}){

// //     useEffect(()=>{
// //         fetch('https://nodejs-duchuy-bit.herokuapp.com/khachhang')
// //         .then((res)=> res.json())
// //         .then((res)=>{
// //             console.log(res.KHACHHANG)
// //         }).catch((err)=> console.log(err))
// //     })

// //     const {height, width } =Dimensions.get('window');
// //     const [isLogin, setIsLongin] = useState(true);

// //     const imagePosition= useSharedValue(1);
// //     const formPosition= useSharedValue(1);
// //     const formButtonScale = useSharedValue(1);

// //     _storeData = async () => {
// //         try {
// //             await AsyncStorage.setItem(
// //             'Login',
// //             'I like to save it.'
// //             );
// //         } catch (error) {
// //           // Error saving data
// //         }
// //     };
    

// //     const imageAnimatedStyle = useAnimatedStyle(()=>{
// //         const interpolation = interpolate(imagePosition.value, [0,1], [-height/2, 0])
// //         return{
// //             transform: [{
// //                 translateY: withTiming(interpolation, {duration: 1000})
// //             }]
// //         }
// //     })

// //     const formAnimatedStyle = useAnimatedStyle(()=>{
// //         // const interpolation = interpolate(formPosition.value,  [0, 1],[250,0])
// //         return{
// //             opacity: imagePosition.value ==0? withDelay(400,  withTiming(1, {duration: 800})):
// //             withTiming(0, {duration: 300})
// //         }
// //     })

// //     const formButtonAnimatedStyle = useAnimatedStyle(()=>{
// //         return{
// //             transform: [{
// //                 scale: formButtonScale.value
// //             }]
// //         }
// //     })

// //     const buttonAnimatesStyle = useAnimatedStyle(()=>{
// //         const interpolation = interpolate(imagePosition.value, [0,1], [250,0])
// //         return{
// //             opacity: withTiming(imagePosition.value,{duration: 500}),
// //             transform:[{
// //                 translateY: withTiming(interpolation, {duration: 1000})
// //             }]
// //         }
// //     })

// //     const loginHander =()=>{
// //         imagePosition.value = 0;
// //         formPosition.value = 0;
// //         // console.log('Login : ',isLogin);
// //         setIsLongin(true);
// //         console.log('Login : ',isLogin);

// //     }

// //     const registerHander =()=>{
// //         imagePosition.value = 0;
// //         setIsLongin(false);
// //         console.log('Register : ',isLogin);
// //     }

// //     return (
// //     <View style={styles.container}>
// //         <Animated.View style={[StyleSheet.absoluteFill,imageAnimatedStyle]}>
// //             <Svg  height={height +50} width={width} >
// //                 <ClipPath id='clipPathId'>
// //                     <Ellipse cx={width/2} rx={height} ry={height + 50}/>
// //                 </ClipPath>
// //                 <Image href={require('../assets/images/vinpearl2.jpg')} 
// //                     width={width + 50}
// //                     height={height + 50}
// //                     preserveAspectRatio="xMidyMid slice"
// //                     clipPath='url(#clipPathId)'
// //                 />
// //             </Svg>
// //             <TouchableOpacity onPress={()=> {
// //                 imagePosition.value = 1,
// //                 formAnimatedStyle.value = 1
// //                 }}>
// //             <View style={styles.closeButtonContainer}>
// //                 <Text style={{color: 'black', fontSize: 18,fontFamily: 'Montserrat-Bold',}}>X</Text>
// //             </View>
// //             </TouchableOpacity>
// //         </Animated.View>

// //         <View style={styles.bottomContainer}>
// //         <Animated.View style={[buttonAnimatesStyle]}>
// //             <TouchableOpacity onPress={loginHander}>
// //                 <View style={styles.button}>
// //                     <Text style={styles.textButton}>LOGIN</Text>
// //                 </View>
// //             </TouchableOpacity>

// //             <TouchableOpacity onPress={registerHander}>
// //             <View style={styles.button}>
// //                     <Text style={styles.textButton}>REGISTER</Text>
// //                 </View>
// //             </TouchableOpacity>
                
// //         </Animated.View>
// //         </View>

// //         <Animated.View style={[styles.InputContainer, formAnimatedStyle]}>
// //         <View style={styles.formStyle}>
// //             <TextInput placeholder='Email' placeholderTextColor="#000" style={styles.textInput}/>
// //             <TextInput placeholder='Password' placeholderTextColor="black" style={styles.textInput}/>
// //             {isLogin? <></>: <TextInput placeholder='Confirm Password' placeholderTextColor="black" style={styles.textInput}/>}

// //             <TouchableOpacity onPress={()=> {
// //                 formButtonScale.value= withSequence(withSpring(1.5), withSpring(1))
// //                 console.log('touch');
// //                 if (isLogin){
// //                     console.log('LOGIN');
// //                     // _storeData();
// //                     navigation.navigate('HomeScreen')
// //                     }
// //                 }}>
// //                 <Animated.View style={[styles.button,formButtonAnimatedStyle]}>
// //                     <Text style={styles.textButton}>{isLogin? "LOGIN": "REGISTER"}</Text>
// //                 </Animated.View>
// //             </TouchableOpacity>
// //         </View>
// //         </Animated.View>
// //     </View>
// //     )
// // }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         justifyContent: 'flex-end',
//         // flexDirection: 'column',
//     },

//     closeButtonContainer:{
//         width:40,
//         height: 40,
//         top: -20,
//         alignSelf:'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//         alignItems:'center',
//         borderRadius: 25,
//         shadowColor: '#000',
//         shadowOffset:{
//             width: 0,
//             height: 5,
//         },
//         shadowOpacity: 0.34,
//         shadowRadius: 6.27,
//         elevation: 15,
        
//         // backgroundColor
//     },

//     button:{
//         // flex: 1,
//         backgroundColor: 'rgb(123,113,210)',
//         height: 50,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginHorizontal: 20,
//         marginBottom:20,
//         borderWidth: 1,
//         borderColor: 'white',
//         borderRadius: 35,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 7,
//         },
//         shadowOpacity: 0.5,
//         shadowRadius: 3.84,
//         elevation: 5
//     },

//     textButton:{
//         color: 'white',
//         fontSize: 17,
//         fontFamily: 'Montserrat-Bold',
//     },

//     bottomContainer:{
//         justifyContent: 'center',
//         height: height/3,
//     },

//     InputContainer:{
//         // bottom: 50,
//         // mar
        
//         ...StyleSheet.absoluteFill,
//         zIndex: -1,
//         justifyContent: 'flex-end',
//         // backgroundColor: 'blue',

//         // height: height/3,
//         // paddingTop: height/2
//     },
//     formStyle:{
//         justifyContent: 'center',
//         // marginBottom: 50,
//         // backgroundColor: 'pink',
//         height: height/2-50
//     },

//     textInput:{
//         height:50,
//         color: 'black',
//         borderWidth: 1,
//         borderColor: 'grey',
//         marginHorizontal: 20,
//         borderRadius: 25,
//         marginBottom:10,
//         paddingLeft: 15,
//     }
// })

// // export default class LoginScreen extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             user : [],
// //         };
// //     }

// //     // componentWillMount out of date, update ->
// //     UNSAFE_componentWillMount(){
// //         this.fetchAPI();
// //     }

// //     async fetchAPI (){
// //         await fetch("https://nodejs-duchuy-bit.herokuapp.com/khachhang")
// //         .then((response) => response.json())
// //         .then((res)=>{
// //             this.setState(
// //                 user = res.KHACHHANG
// //             )
// //             user.forEach(element => {
// //                 console.log(element)
// //             });
// //         }).catch((err)=> console.log(err));
// //     }


// //     render() {
// //         const MediaQueryWidth = Dimensions.get('window').width;
// //         const MediaQueryHeight = Dimensions.get('window').height;
// //         return (
// //         <View style={{flex: 1}}>
// //             {/* <Text> LoginScreen </Text> */}
// //             <View style={{marginHorizontal: 20,marginTop:30 ,width: MediaQueryWidth-40,height:MediaQueryWidth -150,backgroundColor: "pink"}}>
// //                 <Lottie source={require('../lotties/welcomeV2.json')} 
// //                     autoPlay 
// //                     resizeMode='contain'
// //                     loop />
// //             </View>
// //             <View >
// //                 <Text style={{alignSelf:'center',color: 'black',fontSize: 30,fontFamily: 'Montserrat-Bold'}} >Login</Text>
// //                 <Text style={{alignSelf:'center',color: 'black',fontSize: 30,fontFamily: 'Montserrat-Italic'}} >Login</Text>
// //             </View>
// //             <Text>Please Input Your Account And Password</Text>
// //         </View>
// //         );
// //     }
// // }

{/* <View style={{width: width,height: 400}}>
            <Lottie source={require('../assets/lotties/hello.json')} 
                    autoPlay 
                    resizeMode='contain'
                    loop />
        </View> */}
        {/* <View style={{height:75,width: 100}}></View> */}
