import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import { AsyncCalls, Colors } from 'react_app/src/commons'

export default class HousesList extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            list: [],
            selected: null
        }
    }

    componentWillMount() {
        AsyncCalls.fetchHousesList()
        .then((response) => {
            //console.log("axios get response: ", response);
            const newList = response.data && response.data.records ? response.data.records : []
            this.setState({ list: newList })
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
        const cellStyle = isSelected ? 
            { backgroundColor: Colors.cellSelected } : { backgroundColor: Colors.cell }
        const titleStyle = isSelected ? { color: Colors.titleSelected} : { color: Colors.titleDefault }
        const buttonColor = isSelected ? Colors.titleSelected : Colors.titleDefault
        const imagen = item.image_dir
        return(
            <View style={ [styles.cell, cellStyle] }>
                <Text style={ titleStyle }>{ item.nombre }</Text>
                <Image
                    style={{ width: 150, height: 150 }}
                    source={{ uri: imagen }}
                />
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
            <View style={{ flex: 1 }}>
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