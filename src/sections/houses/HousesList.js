import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios'

export default class HousesList extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            list: [],
            selected: null
        }
    }

    componentWillMount() {
        axios.get('http://146.185.137.85/got/web/casas')
        .then((response) => {
            //console.log("axios get response: ", response);
            const nuestraLista = response.data && response.data.records ? response.data.records : []
            this.setState({ list: nuestraLista })
        })
        .catch((error) => {
            console.log("axios get error: ", error);
        });
    }

    checkIsSelected(item) {
        return (this.state.selected && this.state.selected.id == item.id ) ? true : false
    }

    onSelectedItem(item) {
        this.setState({ selected: item })
    }

    renderItem(item, index) {
        const isSelected = this.checkIsSelected(item)
        const cellStyle = isSelected ? { backgroundColor: 'blue'} : { backgroundColor: 'grey' }
        const titleStyle = isSelected ? { color: 'white'} : { color: 'black' }
        const buttonColor = isSelected ? 'white' : 'black'
        return(
            <View style={ [styles.cell, cellStyle] }>
                <Text style={ titleStyle }>{ item.nombre }</Text>
                <Button
                    color={ buttonColor }
                    title='Pulsa para log'
                    onPress={ () => this.onSelectedItem(item) }
                />
            </View>
        )
    }
    
    render() {
        const name = this.state.selected ? this.state.selected.nombre : ''
        return (
            <View>
                <Text style={ styles.title }>{ name }</Text>
                <FlatList
                    data={ this.state.list }
                    renderItem={ ({item, index}) => this.renderItem(item, index) }
                    // Necesitamos añadirle una key a todo objeto iterable
                    keyExtractor={ (item, index) => item.id }
                    // Un observador para decirle cuándo repintar
                    extraData={ this.state }
                />
            </View>
        )
    }

    componentDidMount() {
        this.setState({ texto: 'Texto cambiado' })
    }
}

const styles = StyleSheet.create({
    cell: {
        height: 200,
        marginVertical: 10
    },
    title: {
        fontSize: 20, 
        textAlign: 'center', 
        marginVertical: 20 
    }
})