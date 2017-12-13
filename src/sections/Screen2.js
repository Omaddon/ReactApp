import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class Screen2 extends Component {
    
    render() {
        return(
            <View>
                <Text>Esta es la Screen2</Text>
                <Text>{ this.props.texto }</Text>
                <Button
                    title='Volver atrás'
                    onPress={ () =>  Actions.pop() }
                />
            </View>
        )
    }
}