import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
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

    renderItem(item) {
        return(
            <View style={{ height: 200, backgroundColor: 'red', marginVertical: 10 }}>
                <Text>{ item.nombre }</Text>
                <Button
                    title='Pulsa para log'
                    onPress={ () => this.setState({ selected: item }) }
                />
            </View>
        )
    }
    
    render() {
        const name = this.state.selected ? this.state.selected.nombre : ''
        return (
            <View>
                <Text>{ name }</Text>
                <FlatList
                    data={ this.state.list }
                    renderItem={ ({item}) => this.renderItem(item) } 
                />
            </View>
        )
    }

    componentDidMount() {
        this.setState({ texto: 'Texto cambiado' })
    }
}