import React, { Component } from 'react'
import { Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native'

export default class HousesCell extends Component {

    // Props por defecto que se usarán si no recibimos las Props de forma adecuada
    static defaultProps = {
        onSelect    : () => {},
        item        : {}
    }

    render() {
        //const item = this.props.item
        const { item, onSelect } = this.props
        const houseImage = item.image_dir ? { uri: item.image_dir } : null

        // resizeMode -> Contain, Cover, Stretch, Repeat (ésta es solo para iOS)
        return(
            <TouchableOpacity onPress={ () => onSelect(item) } style={ styles.container }>
               <Image source={ houseImage } style={ styles.image } resizeMode={'contain'}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // Se pueden usar porcentajes (string) en lugar de Dimensions
        // Sabemos que las imágenes son 857/600 (las hemos subido nosotros)
        // Le restamos el margin (izq y dch)
        margin: 10,
        width: (Dimensions.get('window').width / 2) - 20,
        height: ((Dimensions.get('window').width / 2) - 20) * (857/600),

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(255, 255, 255, 0.1)',
                shadowOpacity: 1,
                shadowOffset: { height: 4, width: 4 },
                shadowRadius: 2
            },
            android: {
                elevation: 4
            }
        })
    },
    image: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
})