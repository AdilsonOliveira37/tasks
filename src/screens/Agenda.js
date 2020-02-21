import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
 import moment from 'moment';
 import 'moment/locale/pt-br';
 import todayImage from '../../assets/imgs/today.jpg';

 import commonStyles from '../commonStyles';

 export default class Agenda extends Component{
     render(){
         return(
             <View style = {StyleSheet.container}>
                 <ImageBackground source={todayImage} style={StyleSheet.background}>
                     <View>
                         <Text>Hoje</Text>
                         <Text>{momment().locale('pt-br').format('ddd, D[de] MMMM') </Text>
                     </View>
                 </ImageBackground>
             </View>
         );
     }
 }