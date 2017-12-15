/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import HousesList from 'react_app/src/sections/houses/HousesList'
import * as webservices from 'react_app/src/webservices/webservices'

export default class App extends Component {

  componentWillMount() {
    // Configuramos la baseUrl de axios
    webservices.configureAxios()
    // Como tenemos un fondo gris, para que se vea bien la statusBar
    StatusBar.setBarStyle('light-content')
  }

  render() {   
    return (
      <Router>
          <Scene key='root'>
            <Scene
                key='HousesList'
                component={ HousesList }
                hideNavBar
            />
          </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({

});
