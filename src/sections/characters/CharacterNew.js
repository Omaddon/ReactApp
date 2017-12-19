import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';

import { Colors } from 'react_app/src/commons'
import { Input, Button } from 'react_app/src/widgets'

import ImagePicker from 'react-native-image-picker'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as CharactersAction from 'react_app/src/redux/actions/characters'
/*******************************************************/

class CharacterNew extends Component {

    constructor(props) {
        super(props)

        // Creamos un estado interno del componente y no usamos redux, pues
        // estas propiedades no las vamos a necesitar fuera del componente
        this.state = {
            name: '',
            nameError: '',

            age: '',
            ageError: '',

            image: null
        }
    }

    validateForm() {
        let valid = true
        let errors = {}

        if (!this.state.name) {
            errors.name = 'Choose a valid name.'
            valid = false
        }

        if (!this.state.age) {
            errors.age = 'Choose a valid age.'
            valid = false
        }

        this.setState({
            nameError: errors.name ? errors.name : '',
            ageError: errors.age ? errors.age : ''
        })

        return valid
    }

    onSubmit() {
        if( this.validateForm() ) {
            const characterData = {
                nombre: this.state.name,
                edad: this.state.age ? this.state.age : null,
                image: this.state.image ? 'data:image/jpeg;base64,' + this.state.image.data : null,
                casa : this.props.house.id,
            }
            this.props.postCharacter(characterData)  
        }
    }

    onSelectImageTapped() {
        const options = {
            title: 'Select char image',
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)
          
            if (response.didCancel) {
              console.log('User cancelled image picker')
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error)
            }
            else {
              //let source = { uri: response.uri }
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                image: response
              });
            }
          })
    }
    
    render() {

        const imageUri = this.state.image ? { uri: this.state.image.uri } : null
        const imageButtonText = this.state.image ? this.state.image.fileName : 'Choose Image'

        return (
            <View style={ styles.container }>
                <View style={ styles.imageContainer }>
                    <Image 
                        source={ imageUri } 
                        style={ styles.imageContainerBackground }
                        resizeMode={ 'cover' }
                    />
                    <TouchableOpacity onPress={ () => this.onSelectImageTapped() } style={ styles.button }>
                        <Text style={ styles.textButton }>{ imageButtonText }</Text>
                    </TouchableOpacity>
                </View>
                <View style={ styles.inputContainer }>
                    <Input 
                        onChangeText    = { (value) => this.setState({ name: value }) }
                        value           = { this.state.name }
                        error           = { this.state.nameError }
                        label           = { 'Name:' }
                        placeholder     = { 'Eddard Stark' }
                    />
                </View>
                <View style={ styles.inputContainer }>
                    <Input 
                        onChangeText    = { (value) => this.setState({ age: value }) }
                        value           = { this.state.age }
                        error           = { this.state.ageError }
                        label           = { 'Age:' }
                        placeholder     = { '42' }
                    />
                </View>
                <View style={ styles.buttonContainer }>
                    <Button
                        label       = { 'Create' }
                        onPress     = { () => this.onSubmit() }
                        isFetching  = { this.props.isFetching }
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.characters.isFetching,
        house: state.houses.item
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        postCharacter: (data) => {
            dispatch(CharactersAction.postCharacter(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        backgroundColor: 'grey'
    },
    imageContainerBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    button: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    inputContainer: {
        margin: 20
    },
    buttonContainer: {
        margin: 20
    }
})