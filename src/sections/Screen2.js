import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Screen2 extends Component {
    
    render() {
        return(
            <View>
                <Text>Esta es la Screen2</Text>
                <Text>{ this.props.texto }</Text>
            </View>
        )
    }
}