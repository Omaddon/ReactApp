import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
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
        this.props.updateSelected(house)
    }

    renderFooter() {
        return <ActivityIndicator 
                    size='large' 
                    color='grey' 
                    animating={ this.props.isFetching }
                    style={{ marginVertical: 20 }}
                />
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
                    data={ this.props.list }
                    ListFooterComponent={ () => this.renderFooter() }
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
        list: state.houses.list,
        selected: state.houses.item,
        isFetching: state.houses.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchHousesList: () => {
            // Lanzamos la action
            dispatch(HousesAction.fetchHousesList())
        },
        updateSelected: (house) => {
            dispatch(HousesAction.updateHouseSelected(house))
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