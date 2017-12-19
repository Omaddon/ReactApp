import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import { Button } from 'react_app/src/widgets'
import { Colors } from 'react_app/src/commons'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as CharactersAction from 'react_app/src/redux/actions/characters'
/*******************************************************/

class CharacterView extends Component {

    onDelete(character) {
        this.props.deleteCharacter(character)
    }

    render() {

        const { character } = this.props
        const name = character ? character.nombre : ''
        const age = character ? character.edad : ''
        const charImage = character && character.image_dir ? 
            { uri: character.image_dir } : require('react_app/src/resources/placeholder.png')

        return (
            <View style={ styles.container }>
                <Image source={ charImage } resizeMode={ 'cover' } style={ styles.image }/>
                <View style={ styles.textContainer }>
                    <Text style={ styles.name }>{ name }</Text>
                    <Text style={ styles.age }>{ 'Edad: ' + age }</Text>
                </View>

                <View style={ styles.buttonContainer }>
                    <Button 
                        label={ 'Eliminar' } 
                        onPress={ () => this.onDelete(character) }
                        isFetching={ this.props.isFetching }/>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        character: state.characters.item
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        deleteCharacter: (character) => {
            // If (character) then...
            character && dispatch(CharactersAction.deleteCharacter(character))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    name: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    age: {
        fontSize: 16,
        color: 'white',
    },
    image: {
        width: '100%',
        height: 200,
    },
    buttonContainer: {
        margin: 20,
    }
})