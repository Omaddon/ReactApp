import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class Screen1 extends Component {

    // Es buena práctica ponerle guión bajo para funciones internas, pero NO es necesario
    _goScreen2() {
        Actions.screen2({ texto: 'Texto de prueba' })
    }

    render() {
        return(
            <View>
                <Text>Esta es la Screen1</Text>
                <Button
                    onPress={ () => this._goScreen2() }
                    title='Ir a la Screen2'
                />
            </View>
        )
    }
}