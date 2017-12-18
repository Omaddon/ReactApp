import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class CharacterCell extends Component {

    static defaultProps = {
        onSelect    : () => {},
        item        : {}
    }

    render() {

        const { item, onSelect } = this.props
        const charImage = item.image_dir ? { uri: item.image_dir } : null
        const name = item.nombre ? item.nombre : ''
        const age = item.edad ? item.edad : ''

        return (
            <TouchableOpacity onPress={ () => onSelect(item) }>
                <Image source={ charImage } resizeMode={ 'cover' } style={ styles.image }/>
                <View style={ styles.textContainer }>
                    <Text style={ styles.name }>{ name }</Text>
                    <Text style={ styles.age }>{ age }</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create ({
    image: {
        width: '100%',
        height: 200
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    name: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent'
    },
    age: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent'
    }
})