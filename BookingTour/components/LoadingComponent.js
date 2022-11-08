import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';

import Lottie from 'lottie-react-native';

export default class LoadingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsModalVisible: false
        };
    }

    render() {
        return (
            <Modal
                animationType="fade"
                style={{flex: 1}}
                transparent={true}
                visible={this.state.IsModalVisible}
                onRequestClose={() => this.setState({IsModalVisible: false})}
            >
                <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: '40%', width: '90%'}}>
                    <Lottie style={{height: '50%', width: '50%'}} source={require('../assets/lotties/success.json')} autoPlay loop />
                </View>
            </Modal>
        );
    }
}
