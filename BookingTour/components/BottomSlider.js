import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, Image,Dimensions, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Lottie from 'lottie-react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Ioni from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    SharedElement,
    SharedElementTransition,
    nodeFromRef
} from 'react-native-shared-element';
// import {SharedElement} from "react-navigation-shared-element";
// import FontAwe5 from "react-native-vector-icons/FontAwesome5";

// import MenuComponent from '../components/MenuComponent';
// import ipconfig from '../ipconfig';

// FontAwe5.loadFont();
Icon.loadFont();
Ioni.loadFont();
Octicon.loadFont();
Foundation.loadFont();
MaterialCommunityIcons.loadFont();

import colors from '../assets/colors/color';
import ipconfig from '../ipconfig';

const {height, width} = Dimensions.get('window');

export default class BottomSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
        <View style={{flex: 1, backgroundColor: 'white' }}>
            <Text> BottomSlider </Text>
        </View>
        );
    }
}
