import React, { Component } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from 'react_app/src/commons'

import CharacterCell from './CharacterCell'

/************************ REDUX ************************/
import { connect } from 'react-redux'
import * as CharactersAction from 'react_app/src/redux/actions/characters'
/*******************************************************/

class CharactersList extends Component {

    componentWillMount() {
        const houseId = this.props.house ? this.props.house.id : null
        this.props.fetchCharactersList(houseId)
    }

    onSelect(character) {
        this.props.updateSelected(character)
    }

    renderItem(item, index) {
        return (
            <CharacterCell 
                item={ item } 
                onSelect={ (character) => { this.onSelect(character) } }
            />
        )
    }

    render() {
        return (
            <View style={ styles.container }>
                <FlatList
                    data={ this.props.list }
                    renderItem={ ({item, index}) => this.renderItem(item, index) }
                    keyExtractor={ (item, index) => item.id }
                    extraData={ this.props }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        house: state.houses.item,
        list: state.characters.list,
        character: state.characters.item
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: (houseId) => {
            dispatch(CharactersAction.fetchCharactersList(houseId))
        },
        updateSelected: (character) => {
            dispatch(CharactersAction.updateCharacterSelected(character))
            Actions.CharacterView({ title: character.nombre })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    }
})