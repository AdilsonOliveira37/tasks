import React, { Component } from 'react'
import { Modal, Text, View, Picker, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, Platform } from 'react-native'



export default class ConsultTask extends Component {

    render(){
        return(
            <Modal transparent={true}>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View>

                </View>                
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        backgroundColor:'#FFF'
    }
})
