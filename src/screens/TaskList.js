import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Plataform, Alert } from 'react-native'
import formularioImage from '../../assets/imgs/formulario.png'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from "@react-native-community/async-storage"

import commonStyles from '../commonStyles'
import Task from '../components/Task' 
import AddTask from './AddTask'

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}
export default class TaskList extends Component{
state = {
        
    }
    componentDidMount = async() => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const state = JSON.parse(stateString) || initialState
        this.setState(state, this.filterTasks)
    }

    togleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }
    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks })
        AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
    } 
    togleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id == taskId)
                task.doneAt = task.doneAt ? null : new Date()
        })

        this.setState({ tasks }, this.filterTasks)
    }
    addTask = newTask =>  {
        if(!newTask.title || !newTask.title.trim()){
            Alert.alert('Dados Inválidos', 'Titulo não informado!')
            return
        }
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            title: newTask.title,
            priority: newTask.priority,
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null,
        })
        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }
    delTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({ tasks }, this.filterTasks)
    }


    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })} onSave={this.addTask} />
                <ImageBackground source={formularioImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.togleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={25} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style= {styles.title}>Formulario</Text>
                        <Text style= {styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`} renderItem={({item})=> 
                        <Task {...item} togleTask={this.togleTask} onDelete={this.delTask} />}>
                    </FlatList>
                </View>
                <TouchableOpacity onPress={ () => this.setState({ showAddTask: true })} style={styles.addButton}>
                    <Icon name="plus" size={30} color={commonStyles.colors.secondary}></Icon>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background:{
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        // marginTop: Plataform.OS === 'ios' ? 40 : 15,
    },
    addButton:{
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center',
    },

});