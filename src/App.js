/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: 'Estoy cargando...',
      texto: 'Hola mundo'
    }
  }

  componentWillMount() {
    // Antes de que se ejecute el render
    console.log('componentWillMount this.state.title: ', this.state.title)
  }

  componentWillUpdate(nextProps, nextState) {
    // Antes de actualizar las propiedades o el estado, antes del render
    console.log('componentWillUpdate nextState: ', nextState.title)
    console.log('componentWillUpdate this.state: ', this.state.title)
  }

  render() {
    console.log('render this.state.title: ', this.state.title)
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          { this.state.title }
        </Text>

        <Text style={styles.welcome}>
          { this.state.texto }
        </Text>
      </View>
    );
  }

  componentDidMount() {
    // Después del render
    setTimeout(() => {
      this.setState({ title: 'Ya he terminado de cargar' })
    }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    // Después de que estén actualizadas las props y se haya renderizado
    console.log('componentDidUpdate prevState: ', prevState.title)
    console.log('componentDidUpdate this.state: ', this.state.title)

    if (prevState.title != this.state.title) {
      setTimeout(() => {
        this.setState({ texto: 'Hasta luego mundo!' })
      }, 2000);
    }
  }

  componentWillUnmount() {
    // Al destruir el componente
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
