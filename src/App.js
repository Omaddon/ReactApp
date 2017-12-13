/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import HousesList from 'react_app/src/sections/houses/HousesList'
import * as webservices from 'react_app/src/webservices/webservices'

export default class App extends Component {

  componentWillMount() {
    // Configuramos la baseUrl de axios
    webservices.configureAxios()
  }

  render() {   
    return (
      <Router>
          <Scene key='root'>
            <Scene
                key='HousesList'
                component={ HousesList }
            />
          </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({

});
