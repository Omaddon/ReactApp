import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AsyncCalls, Colors } from 'react_app/src/commons'
import { fetch } from 'react_app/src/webservices/webservices'
import HousesCell from './HousesCell'

export default class HousesList extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            list: [],
            selected: null
        }
    }

    componentWillMount() {
        fetch('/casas')
            .then((response) => {
                //console.log("axios get response: ", response);
                this.setState({ list: response.records })
            })
            .catch((error) => {
                console.log("axios get error: ", error);
            });
    }

    onSelect(house) {
        this.setState({ selected: house })
    }

    renderItem(item, index) {
        // De esta forma le metemos directamente los datos en las props de nuestro Component
        return( 
            <HousesCell 
                item={ item }
                onSelect={ (house) => this.onSelect(house) }
            />
        )
    }
    
    render() {
        return (
            <View style={ styles.container }>
                <FlatList
                    data={ this.state.list }
                    renderItem={ ({item, index}) => this.renderItem(item, index) }
                    numColumns={ 2 }
                    // Necesitamos añadirle una key a todo objeto iterable
                    keyExtractor={ (item, index) => item.id }
                    // Un observador para decirle cuándo repintar
                    extraData={ this.state }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(42, 42, 42)',
        paddingVertical: 20
    }
})