/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, TouchableOpacity, Text } from 'react-native'
import { Actions, Scene, Router } from 'react-native-router-flux'
import { Colors } from 'react_app/src/commons'

/********************* COMPONENTS **********************/
import HousesList from 'react_app/src/sections/houses/HousesList'
import CharactersList from 'react_app/src/sections/characters/CharactersList'
import CharacterView from 'react_app/src/sections/characters/CharacterView'
import CharacterNew from 'react_app/src/sections/characters/CharacterNew'
/*******************************************************/

import * as webservices from 'react_app/src/webservices/webservices'

/************************ REDUX ************************/
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './redux/reducers'
const reducer = combineReducers(reducers)
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
/*******************************************************/

export default class App extends Component {

  componentWillMount() {
    // Configuramos la baseUrl de axios
    webservices.configureAxios()
    // Como tenemos un fondo gris, para que se vea bien la statusBar
    StatusBar.setBarStyle('light-content')
  }

  renderAddCharacterButton() {
    return(
        <TouchableOpacity style={ styles.addButton } onPress={ () => Actions.CharacterNew() }>
          <Text style={ styles.addButtonText }>{ 'Add' }</Text>
        </TouchableOpacity>
    )
  }

  render() {
    console.disableYellowBox = true

    return (
      <Provider store={ store }>
        <Router>
            <Scene key='root'>
              <Scene
                  key='HousesList'
                  component={ HousesList }
                  hideNavBar
              />
              <Scene
                  key='CharactersList'
                  component={ CharactersList }
                  navigationBarStyle={ styles.navBar }
                  navBarButtonColor={ 'white' }
                  renderRightButton={ () => this.renderAddCharacterButton() }
              />
              <Scene
                  key='CharacterView'
                  component={ CharacterView }
                  navigationBarStyle={ styles.navBar }
                  navBarButtonColor={ 'white' }
              />
              <Scene
                  key='CharacterNew'
                  component={ CharacterNew }
                  navigationBarStyle={ styles.navBar }
                  navBarButtonColor={ 'white' }
                  title={ 'New Character' }
              />
            </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: Colors.navBar
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    addButton: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
