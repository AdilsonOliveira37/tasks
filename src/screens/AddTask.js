import React, { Component, useState } from 'react'
import { Modal, Text, View, Picker, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, Platform } from 'react-native'
import commonStyles from '../commonStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'


const initState = {
    desc: '',
    date: new Date(),
    ShowDatePicker: false
}
export default function App() {
    const [selectedValue, setSelectedValue] = useState("java");
    return(
        <Picker selectedValue={selectedValue} style={styles.addPriority} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue) }>
            <Picker.Item label="Normal" value="normal" />
            <Pickericker.Item label="Alta" value="alta" />
            <Picker.Item label="Crítica" value="critica" />
        </Picker>
    );
}
export default class AddTask extends Component {
    state ={
        ...initState 
    }
    save = () => {
        const newTask = {
            title: this.state.title,
            desc: this.state.desc,
            priority: this.state.priority,
            date: this.state.date,
        }
        this.props.onSave && this.props.onSave(newTask)
        this.setState({...initState})
    }
    getDatePicker = () => {
        let datePicker = <DateTimePicker value ={ this.state.date } onChange={(_, date) => this.setState({date, ShowDatePicker: false})} mode='date'></DateTimePicker>
        const dateString = moment(this.state.date).format('D [/] MMMM [/] YYYY')
        if (Platform.OS == 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={()=> this.setState({ShowDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.ShowDatePicker && datePicker}
                </View>
            )
            
        }
        return datePicker
    }
    
    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.inputTitle} 
                        value={this.state.title} onChangeText={title => this.setState({title})}
                        placeholder="Insira um nome para tarefa!"></TextInput>
                    <View style={styles.lineRow}>
                        {this.getDatePicker()}
                    </View>

                    <TextInput style={styles.inputDesc} 
                        value={this.state.desc} onChangeText={desc => this.setState({desc})}
                        placeholder="Dê uma descrição à tarefa!"></TextInput>
                    <View style={styles.buttons}>
                        <TouchableOpacity>
                            <Text style={styles.button} onPress={this.props.onCancel}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.button} onPress={this.save}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
        backgroundColor: '#FFF',
        borderBottomEndRadius: 50,
    },
    header: {

        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 12,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttons:{
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today,
    },
    inputTitle:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.today,
        textAlign: 'center',
        width: '90%',
        height: 40,
        marginTop: 10,
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: commonStyles.colors.today,
        borderRadius: 50,
    },
    inputDesc:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.today,
        textAlign: 'center',
        width: '90%',
        height: 80,
        marginTop: 10,
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: commonStyles.colors.today,
        borderRadius: 10,
    },
    lineRow:{
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addPriority:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.today,
        width: '30%',
        height: 50,
        marginTop: 20,
        marginHorizontal: 10,
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.today,
        fontWeight: 'bold', 
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 17,
        width: '100%',
        height: 50,
        marginTop: 20,
        marginHorizontal: 10,
        textDecorationLine: 'underline',
    },
    
})