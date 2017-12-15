import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AsyncCalls, Colors } from 'react_app/src/commons'
import HousesCell from './HousesCell'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as HousesAction from 'react_app/src/redux/actions/houses'
/*******************************************************/

class HousesList extends Component {

    componentWillMount() {
        this.props.fetchHousesList()
    }

    onSelect(house) {
        
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
        console.log('this.props.list: ', this.props.list)
        return (
            <View style={ styles.container }>
                <FlatList
                    data={ this.props.list }
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

const mapStateToProps = (state) => {
    return {
        // Creamos una prop para el estado global llamada list
        list: state.houses.list
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchHousesList: () => {
            // Lanzamos la action
            dispatch(HousesAction.fetchHousesList())
        },
        updateSelected: () => {
            
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(42, 42, 42)',
        paddingVertical: 20
    }
})